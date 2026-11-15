// Capa: usa a ilustração /capas/<slug>.jpg quando existir. Sem ela, mostra um espaço provisório simples
// (gradiente do tema + título) até a arte chegar. Não desenhamos capas em vetor.
import { type CSSProperties, useState } from 'react';

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
  // arte de verdade: se existir /capas/<slug>.jpg ela cobre tudo; se não existir (404), some e fica o desenho/gradiente
  const [semImagem, setSemImagem] = useState(false);
  const t = c.tema ?? PADRAO;
  const estilo = { '--ca': t.a, '--cb': t.b, '--cd': t.destaque, transform: inclinacao ? `rotate(${inclinacao}deg)` : undefined } as CSSProperties;
  const palavras = c.titulo.split(' ');
  // o título cabe na largura da capa: o tamanho da letra segue a palavra mais longa
  const maior = Math.max(...palavras.map((p) => p.length), 4);
  const tam = `${Math.min(17, 80 / (maior * 0.72)).toFixed(1)}cqw`;
  return (
    <div className={`capa capa-${tamanho}${c.embreve ? ' capa-embreve' : ''}`} style={estilo} role="img" aria-label={`Capa de ${c.titulo}${c.embreve ? ' (em breve)' : ''}`}>
      {c.imagem && <img src={c.imagem} alt="" />}
      {!c.imagem && c.slug && !semImagem && <img className="capa-foto" src={`/capas/${c.slug}.jpg`} alt="" onError={() => setSemImagem(true)} />}
      {!c.imagem && (
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
