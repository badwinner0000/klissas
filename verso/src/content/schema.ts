import { z } from 'zod';

export const SEATS = ['A', 'B'] as const;
export type Seat = (typeof SEATS)[number];
export const TONS = ['abre', 'seco', 'flerte', 'cuida', 'fere'] as const;
export type Tom = (typeof TONS)[number];

/** Condição na gramática segura de `engine/cond.ts` (string vazia/ausente = sempre). */
const Expr = z.string();

export const Efeitos = z
  .object({
    flag: z.union([z.string(), z.array(z.string())]).optional(),
    nflag: z.union([z.string(), z.array(z.string())]).optional(),
    vinculo: z.number().int().optional(),
    fa: z.number().int().optional(), // faísca (química)
    abalo: z.number().int().optional(), // nervosismo de quem age
    abaloPar: z.number().int().optional(), // do outro
    abaloAmbos: z.number().int().optional(),
    pista: z.string().optional(),
    motivo: z.string().optional(), // rótulo para a interface ("o preço de conseguir")
    motivoV: z.string().optional(),
  })
  .strict();
export type Efeitos = z.infer<typeof Efeitos>;

const Variante = z.object({ se: Expr, resultado: z.string(), efeitos: Efeitos.optional() }).strict();
export type Variante = z.infer<typeof Variante>;

export const Acao = z
  .object({
    id: z.string(),
    seat: z.enum(SEATS).optional(), // ação que só faz sentido para um assento
    se: Expr.optional(), // elegibilidade (avaliada com `eu` = quem escolhe)
    texto: z.string(), // rótulo do botão (escolhido pelo jogador)
    resultado: z.string().optional(), // narrado em 2ª pessoa de quem agiu
    /** Resultado condicional ao estado, sem dados: a primeira cujo `se` vale. Vem depois de `resultado`. */
    variantes: z.array(Variante).min(1).optional(),
    efeitos: Efeitos.optional(),
    compartilhada: z.boolean().optional(), // em `dividir`: os dois podem escolher a mesma
    repete: z.boolean().optional(), // em `solo`: pode ser escolhida de novo
    ir: z.string().optional(), // em `solo`: sai da cena para este nó
  })
  .strict()
  .refine((a) => a.resultado !== undefined || a.variantes !== undefined, { message: 'ação precisa de resultado ou variantes' });
export type Acao = z.infer<typeof Acao>;

export const OpDialogo = z
  .object({
    tom: z.enum(TONS),
    texto: z.string(),
    tag: z.string(),
    se: Expr.optional(), // pode olhar hist[i]:tag, tom[i]:tom, flags, vínculo
    acao: z.boolean().optional(), // opção é ação ("vira as costas"), não fala
    depois: z.string().optional(), // narração logo após a fala/ação
    efeitos: Efeitos.optional(),
  })
  .strict();
export type OpDialogo = z.infer<typeof OpDialogo>;

const Destino = z.union([z.string(), z.object({ A: z.string(), B: z.string() }).strict()]);
/** Destino fixo, por assento, ou condicional (primeiro cujo `se` vale). */
const Dest = z.union([Destino, z.array(z.object({ se: Expr.optional(), ir: Destino }).strict()).min(1)]);
export type Dest = z.infer<typeof Dest>;

const Base = {
  cap: z.number().int().min(1),
  lugar: z.string().optional(),
  hora: z.string().optional(),
  npcs: z.array(z.string()).optional(),
  requer: z.array(z.string()).optional(), // só alcançável se a flag for true
  exclui: z.array(z.string()).optional(), // só alcançável se a flag for false
};

export const No = z.discriminatedUnion('tipo', [
  z
    .object({ ...Base, tipo: z.literal('segue'), texto: z.string(), ir: Dest, efeitos: Efeitos.optional(), efeitosSe: z.array(z.object({ se: Expr, efeitos: Efeitos }).strict()).optional() })
    .strict(),
  // cena de UM jogador. Sem `acoes`: só "continuar". Com `acoes`: escolhe até sair por uma ação com `ir`.
  z
    .object({ ...Base, tipo: z.literal('solo'), seat: z.enum(SEATS), texto: z.string(), acoes: z.array(Acao).default([]), ir: Dest.optional(), efeitos: Efeitos.optional() })
    .strict(),
  z
    .object({
      ...Base,
      tipo: z.literal('dialogo'),
      texto: z.string(),
      comeca: z.enum(SEATS),
      turnos: z.array(z.object({ prompt: z.string().optional(), opcoes: z.array(OpDialogo) }).strict()).min(1),
      pool: z.array(OpDialogo).default([]),
      fecho: z.string().optional(),
      ir: Dest,
    })
    .strict(),
  z
    .object({
      ...Base,
      tipo: z.literal('dividir'),
      texto: z.string(),
      pergunta: z.string().optional(),
      cada: z.number().int().min(1).default(1), // ações por jogador
      acoes: z.array(Acao).min(2),
      desfecho: z.string().optional(),
      ir: Dest,
    })
    .strict(),
  // os dois votam; só vale quando coincidem
  z
    .object({ ...Base, tipo: z.literal('decisao'), texto: z.string(), pergunta: z.string().optional(), acoes: z.array(Acao).min(2), desfecho: z.string().optional(), ir: Dest })
    .strict(),
  z
    .object({
      ...Base,
      tipo: z.literal('consentimento'),
      texto: z.string(),
      pergunta: z.string(),
      avancar: z.string(),
      ficar: z.string(),
      flag: z.string(), // true só se os dois avançarem; também grava flag_A / flag_B (privadas)
      irAvancou: z.string(),
      irSem: z.string(),
    })
    .strict(),
  z.object({ ...Base, tipo: z.literal('fim'), texto: z.string(), gancho: z.string().optional(), ir: Dest }).strict(),
  z
    .object({
      ...Base,
      tipo: z.literal('final'),
      texto: z.string().optional(),
      finais: z.array(z.object({ se: Expr.optional(), texto: z.string() }).strict()).optional(),
    })
    .strict(),
]);
export type No = z.infer<typeof No>;

export const Livro = z
  .object({
    id: z.string(),
    titulo: z.string(),
    secao: z.enum(['love-sparks', 'k-vibes', 'dark-deals', 'bitter-sweet']),
    adulto: z.boolean().default(false),
    tropes: z.array(z.string()).min(1),
    linhaDoTempo: z.array(z.object({ quando: z.string(), evento: z.string() }).strict()).min(1),
    /** quanto o vínculo pode SUBIR por capítulo (original: 1) */
    vinculoPorCapitulo: z.number().int().min(1).default(2),
    /** idades padrão dos personagens A e B, usadas por {{A.idade}} */
    idades: z.object({ A: z.number().int(), B: z.number().int() }).optional(),
    npcs: z.record(z.object({ nome: z.string(), voz: z.string() }).strict()).default({}),
    nomesProibidos: z.array(z.string()).default([]),
    inicio: z.string(),
    nos: z.record(No),
  })
  .strict();
export type Livro = z.infer<typeof Livro>;
