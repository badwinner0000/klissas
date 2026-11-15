// Capa tipográfica (sem ilustração gerada): gradiente do tema do livro, grão suave e título em letras grandes.
// É o substituto até existir arte de capa; a arte entra por `imagem` quando houver.
import type { CSSProperties } from 'react';
import { ARTES } from './ArteCapa';

export interface DadosCapa {
  titulo: string;
  serie?: string;
  tema?: { a: string; b: string; destaque: string };
  imagem?: string;
  slug?: string; // livro com ilustração própria (ArteCapa)
  embreve?: boolean;
}
const PADRAO = { a: '#2b3a4a', b: '#7a8fa3', destaque: '#a9c4d6' };

export default function Capa({ c, tamanho = 'm', inclinacao = 0 }: { c: DadosCapa; tamanho?: 'p' | 'm' | 'g'; inclinacao?: number }) {
  const t = c.tema ?? PADRAO;
  const estilo = { '--ca': t.a, '--cb': t.b, '--cd': t.destaque, transform: inclinacao ? `rotate(${inclinacao}deg)` : undefined } as CSSProperties;
  const Arte = !c.imagem && c.slug ? ARTES[c.slug] : undefined;
  const palavras = c.titulo.split(' ');
  // o título cabe na largura da capa: o tamanho da letra segue a palavra mais longa
  const maior = Math.max(...palavras.map((p) => p.length), 4);
  const tam = `${Math.min(17, 80 / (maior * 0.72)).toFixed(1)}cqw`;
  return (
    <div className={`capa capa-${tamanho}${c.embreve ? ' capa-embreve' : ''}${Arte ? ' capa-arte' : ''}`} style={estilo} role="img" aria-label={`Capa de ${c.titulo}${c.embreve ? ' (em breve)' : ''}`}>
      {c.imagem && <img src={c.imagem} alt="" />}
      {Arte && <div className="capa-ilustracao">{Arte()}</div>}
      {!c.imagem && !Arte && (
        <div className="capa-corpo">
          {c.serie && <span className="capa-serie">{c.serie}</span>}
          <span className="capa-titulo" style={{ fontSize: tam }}>{palavras.map((p, i) => <span key={i}>{p}</span>)}</span>
          <span className="capa-faixa" />
        </div>
      )}
      {c.embreve && <span className="capa-selo">em breve</span>}
    </div>
  );
}
