// Port da perspectiva do motor original: resultados são escritos em 2ª pessoa do ponto de vista de quem age;
// o parceiro lê o mesmo trecho em 3ª pessoa. Só a narração muda: falas entre travessões e *itálico* ficam como estão.
const LET = 'a-zà-úA-ZÀ-Ú';
const ART: Record<string, string> = { o: 'seu', no: 'seu', do: 'seu', pelo: 'seu', ao: 'seu', a: 'sua', na: 'sua', da: 'sua', pela: 'sua', os: 'seus', nos: 'seus', dos: 'seus', pelos: 'seus', as: 'suas', nas: 'suas', das: 'suas', pelas: 'suas' };

/** "a mão de você" → "a sua mão" */
export function posse(s: string): string {
  if (s.indexOf(' de você') < 0) return s;
  return s.replace(/\b(o|a|os|as|no|na|nos|nas|do|da|dos|das|pelo|pela|pelos|pelas|ao)\s+([a-zà-ú]+(?:\s+[a-zà-ú]+)?)\s+de você(?![a-zà-ú])/gi, (t, art: string, nome: string) => {
    const p = ART[art.toLowerCase()];
    return p ? `${art} ${p} ${nome}` : t;
  });
}

function narracao(t: string, fn: (s: string) => string): string {
  const fora = (s: string) => s.split(/(\*[^*\n]+\*)/).map((x, i) => (i % 2 ? x : fn(x))).join('');
  return t
    .split('\n')
    .map((par) => {
      if (!par.trim()) return par;
      const fala = par.startsWith('— ');
      return par.split(' — ').map((sg, i) => ((i % 2 === 1) === fala ? fora(sg) : sg)).join(' — ');
    })
    .join('\n');
}

export function terceira(t: string, nome: string): string {
  const ARTP: Record<string, string> = { seu: 'o', sua: 'a', seus: 'os', suas: 'as' };
  return narracao(t, (s0) => {
    let s = s0.replace(new RegExp(`(^|[^${LET}])(d|n|pel|a)?(o|a|os|as)\\s+(seu|sua|seus|suas)\\s+([a-zà-ú]+(?:-[a-zà-ú]+)?)`, 'gi'), (_m, p: string, pre: string | undefined, art: string, _pos: string, sub: string) => `${p}${pre || ''}${art} ${sub} de ${nome}`);
    s = s.replace(new RegExp(`(^|[^${LET}])(de |em |por |com |para )?(seu|sua|seus|suas)\\s+([a-zà-ú]+(?:-[a-zà-ú]+)?)`, 'gi'), (_m, p: string, prep: string | undefined, pos: string, sub: string) => {
      const art = ARTP[pos.toLowerCase()]!;
      const mai = pos[0] !== pos[0]!.toLowerCase();
      const pr = (prep || '').trim().toLowerCase();
      let ini = pr === 'de' ? `d${art}` : pr === 'em' ? `n${art}` : pr === 'por' ? `pel${art}` : pr ? `${pr} ${art}` : art;
      if ((prep && prep[0] !== prep[0]!.toLowerCase()) || (!prep && mai)) ini = ini[0]!.toUpperCase() + ini.slice(1);
      return `${p}${ini} ${sub} de ${nome}`;
    });
    return s.replace(new RegExp(`(^|[^${LET}])você(?![${LET}])`, 'gi'), (_m, p: string) => p + nome);
  });
}

export function vistaDoPar(ta: string, nomeAtor: string, nomeLeitor?: string): string {
  const t = terceira(ta, nomeAtor);
  if (!nomeLeitor || nomeLeitor === nomeAtor) return t;
  const rx = new RegExp(`(^|[^${LET}])${nomeLeitor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![${LET}])`, 'g');
  return posse(
    narracao(t, (s) =>
      s.replace(rx, (_m, p: string, off: number) => {
        const antes = s.slice(0, off + p.length).trimEnd();
        const ini = !antes || /[.!?…:]$/.test(antes);
        return p + (ini ? 'Você' : 'você');
      }),
    ),
  );
}
