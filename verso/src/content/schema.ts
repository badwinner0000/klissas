import { z } from 'zod';

export const SEATS = ['A', 'B'] as const;
export type Seat = (typeof SEATS)[number];
export const TONS = ['abre', 'seco', 'flerte', 'cuida', 'fere'] as const;
export type Tom = (typeof TONS)[number];

export const Efeitos = z
  .object({
    flag: z.union([z.string(), z.array(z.string())]).optional(),
    vinculo: z.number().int().optional(),
    abalo: z.number().int().optional(),
    pista: z.string().optional(),
  })
  .strict();
export type Efeitos = z.infer<typeof Efeitos>;

export const Clausula = z
  .object({
    flag: z.string().optional(),
    naoFlag: z.string().optional(),
    vinculoMin: z.number().optional(),
    vinculoMax: z.number().optional(),
  })
  .strict();
export type Clausula = z.infer<typeof Clausula>;

const Res = z.object({ texto: z.string(), efeitos: Efeitos.optional() }).strict();
const Teste = z
  .object({ attr: z.string(), mod: z.number().default(0), ok: Res, parcial: Res, falha: Res })
  .strict();
export type Teste = z.infer<typeof Teste>;

export const Acao = z
  .object({
    id: z.string(),
    seat: z.enum(SEATS).optional(), // quando a ação só faz sentido para um assento
    texto: z.string(), // rótulo do botão (escolhido pelo jogador)
    resultado: z.string().optional(),
    efeitos: Efeitos.optional(),
    teste: Teste.optional(),
  })
  .strict()
  .refine((a) => !!a.resultado !== !!a.teste, { message: 'ação precisa de resultado OU teste' });
export type Acao = z.infer<typeof Acao>;

export const OpDialogo = z
  .object({ tom: z.enum(TONS), texto: z.string(), tag: z.string(), efeitos: Efeitos.optional() })
  .strict();
export type OpDialogo = z.infer<typeof OpDialogo>;

const Dest = z.union([z.string(), z.object({ A: z.string(), B: z.string() }).strict()]);
export type Dest = z.infer<typeof Dest>;

const Base = {
  cap: z.number().int().min(1),
  lugar: z.string().optional(),
  hora: z.string().optional(),
  requer: z.array(z.string()).optional(), // só alcançável se a flag for true
  exclui: z.array(z.string()).optional(), // só alcançável se a flag for false
};

export const No = z.discriminatedUnion('tipo', [
  z.object({ ...Base, tipo: z.literal('segue'), texto: z.string(), ir: Dest, efeitos: Efeitos.optional() }).strict(),
  z
    .object({ ...Base, tipo: z.literal('solo'), seat: z.enum(SEATS), texto: z.string(), acoes: z.array(Acao).min(1), ir: z.string() })
    .strict(),
  z
    .object({
      ...Base,
      tipo: z.literal('dialogo'),
      texto: z.string(),
      turnos: z
        .array(
          z
            .object({
              p: z.enum(SEATS),
              opcoes: z.array(OpDialogo),
              porTom: z.record(z.enum(TONS), z.array(OpDialogo)).optional(),
            })
            .strict(),
        )
        .min(1),
      pool: z.array(OpDialogo).default([]),
      fecho: z.string().optional(),
      ir: z.string(),
    })
    .strict(),
  z
    .object({ ...Base, tipo: z.literal('dividir'), texto: z.string(), acoes: z.array(Acao).min(2), desfecho: z.string(), ir: z.string() })
    .strict(),
  z
    .object({ ...Base, tipo: z.literal('decisao'), texto: z.string(), acoes: z.array(Acao).min(2), desfecho: z.string().optional(), ir: z.string() })
    .strict(),
  z
    .object({
      ...Base,
      tipo: z.literal('consentimento'),
      texto: z.string(),
      pergunta: z.string(),
      avancar: z.string(),
      ficar: z.string(),
      flag: z.string(),
      irAvancou: z.string(),
      irSem: z.string(),
    })
    .strict(),
  z.object({ ...Base, tipo: z.literal('fim'), texto: z.string(), gancho: z.string(), ir: z.string() }).strict(),
  z
    .object({
      ...Base,
      tipo: z.literal('final'),
      finais: z.array(z.object({ se: z.array(Clausula), texto: z.string() }).strict()).min(1),
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
    atributos: z.array(z.string()).min(1),
    linhaDoTempo: z.array(z.object({ quando: z.string(), evento: z.string() }).strict()).min(1),
    npcs: z.record(z.object({ nome: z.string(), voz: z.string() }).strict()).default({}),
    nomesProibidos: z.array(z.string()).default([]),
    inicio: z.string(),
    nos: z.record(No),
  })
  .strict();
export type Livro = z.infer<typeof Livro>;
