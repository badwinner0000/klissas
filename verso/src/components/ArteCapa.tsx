// Ilustrações de capa em SVG (vetoriais, desenhadas à mão no código). Uma por livro, chaveada pelo slug.
// Quando existir arte gerada/encomendada, `imagem` em <Capa> tem prioridade sobre estas.
import type { ReactNode } from 'react';

function rng(seed: number) {
  let a = seed >>> 0;
  return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

/** Moita de hortênsias: muitas flores (círculos de 4 pétalas) em tons de azul sobre folhas. */
function Hortensias({ x, y, w, h, seed, flip = false }: { x: number; y: number; w: number; h: number; seed: number; flip?: boolean }) {
  const r = rng(seed);
  const azuis = ['#3f63b5', '#5b7fd0', '#7c9be3', '#a7bdf0', '#6a5fb8', '#93a8e8'];
  const folhas: ReactNode[] = [];
  for (let i = 0; i < 16; i++) folhas.push(<ellipse key={`f${i}`} cx={x + r() * w} cy={y + h * (0.35 + r() * 0.65)} rx={26 + r() * 22} ry={12 + r() * 10} transform={`rotate(${-50 + r() * 100} ${x + r() * w} ${y + h * 0.7})`} fill={['#2f5a46', '#3b6b52', '#27493a'][Math.floor(r() * 3)]} />);
  const flores: ReactNode[] = [];
  for (let i = 0; i < 34; i++) {
    const cx = x + (flip ? w - r() * w : r() * w), cy = y + r() * h * 0.9, R = 20 + r() * 18, cor = azuis[Math.floor(r() * azuis.length)];
    flores.push(
      <g key={`g${i}`}>
        {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([dx, dy], k) => <circle key={k} cx={cx + dx! * R * 0.42} cy={cy + dy! * R * 0.42} r={R * 0.52} fill={cor} />)}
        <circle cx={cx} cy={cy} r={R * 0.22} fill="#ffffff" opacity=".35" />
      </g>,
    );
  }
  return <g>{folhas}{flores}</g>;
}

function Padrinhos() {
  const luzes = Array.from({ length: 15 }, (_, i) => { const t = i / 14; return { x: 20 + t * 560, y: 300 + Math.sin(t * Math.PI) * 54 }; });
  return (
    <svg viewBox="0 0 600 900" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Ilustração: dois padrinhos num cais de Nantucket ao entardecer, com farol, névoa e hortênsias azuis">
      <defs>
        <linearGradient id="pc-ceu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1f3f55" /><stop offset=".38" stopColor="#5f87a0" /><stop offset=".62" stopColor="#e9b79c" /><stop offset=".74" stopColor="#f6d8b0" /></linearGradient>
        <radialGradient id="pc-sol" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#fff5d9" stopOpacity="1" /><stop offset=".5" stopColor="#ffe3b0" stopOpacity=".65" /><stop offset="1" stopColor="#ffd9a0" stopOpacity="0" /></radialGradient>
        <linearGradient id="pc-mar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7e9fb2" /><stop offset=".4" stopColor="#3f6680" /><stop offset="1" stopColor="#1b3a4f" /></linearGradient>
        <linearGradient id="pc-base" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0b1b14" stopOpacity="0" /><stop offset="1" stopColor="#0b1b14" stopOpacity=".78" /></linearGradient>
        <filter id="pc-sombra" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#0b1b2a" floodOpacity=".55" /></filter>
        <filter id="pc-brilho" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" /></filter>
      </defs>
      <rect width="600" height="900" fill="url(#pc-ceu)" />
      <circle cx="300" cy="500" r="190" fill="url(#pc-sol)" />
      <circle cx="300" cy="500" r="70" fill="#fff1d2" opacity=".95" />
      {/* nuvens finas */}
      {[[80, 215, 170, 9], [360, 240, 210, 8], [190, 395, 250, 7], [10, 470, 190, 6]].map(([x, y, w, h], i) => <ellipse key={i} cx={(x as number) + (w as number) / 2} cy={y} rx={(w as number) / 2} ry={h} fill="#fff" opacity=".22" />)}
      {/* mar */}
      <rect y="560" width="600" height="340" fill="url(#pc-mar)" />
      {[575, 596, 622, 652, 690].map((y, i) => <path key={i} d={`M0 ${y} Q 75 ${y - 7} 150 ${y} T 300 ${y} T 450 ${y} T 600 ${y}`} stroke="#fff" strokeOpacity={0.2 - i * 0.025} strokeWidth="2.2" fill="none" />)}
      <ellipse cx="300" cy="585" rx="150" ry="14" fill="#fff1d2" opacity=".45" />
      {/* névoa */}
      <rect y="515" width="600" height="70" fill="#f3e6d6" opacity=".35" filter="url(#pc-brilho)" />
      {/* balsa na névoa */}
      <g opacity=".72" fill="#3b5568"><path d="M80 566 h150 l-14 -16 h-122 z" /><rect x="110" y="540" width="96" height="14" rx="2" /><rect x="128" y="528" width="58" height="12" rx="2" /><rect x="150" y="512" width="6" height="16" /></g>
      {/* farol de Brant Point */}
      <g>
        <polygon points="428,566 470,566 462,440 436,440" fill="#f4efe6" />
        <polygon points="440,566 470,566 462,440 452,440" fill="#d9d1c3" opacity=".7" />
        <rect x="432" y="478" width="34" height="9" fill="#c0453a" opacity=".9" /><rect x="436" y="520" width="26" height="9" fill="#c0453a" opacity=".9" />
        <rect x="432" y="430" width="34" height="10" fill="#2b2a2a" />
        <rect x="438" y="410" width="22" height="20" fill="#ffe9a8" /><polygon points="434,410 464,410 449,392" fill="#c0453a" />
        <circle cx="449" cy="420" r="26" fill="#ffe9a8" opacity=".35" filter="url(#pc-brilho)" />
      </g>
      {/* lâmpadas da tenda */}
      <path d={`M${luzes.map((l, i) => `${i ? 'L' : 'M'}${l.x} ${l.y}`).join(' ')}`} stroke="#3a2a22" strokeOpacity=".55" strokeWidth="1.5" fill="none" />
      {luzes.map((l, i) => <g key={i}><circle cx={l.x} cy={l.y + 6} r="9" fill="#ffd98a" opacity=".4" filter="url(#pc-brilho)" /><circle cx={l.x} cy={l.y + 6} r="4" fill="#ffe9b8" /></g>)}
      {/* cais */}
      <polygon points="0,715 600,715 600,760 0,760" fill="#8a6a52" /><rect y="715" width="600" height="8" fill="#a98467" />
      {Array.from({ length: 13 }, (_, i) => <line key={i} x1={i * 50} y1="723" x2={i * 50 - 14} y2="760" stroke="#5e4533" strokeWidth="2" opacity=".6" />)}
      {[40, 190, 340, 500].map((x, i) => <g key={i}><rect x={x} y="690" width="12" height="40" fill="#5e4533" /></g>)}
      {/* ELA — a cerimonialista, com a pasta */}
      <g filter="url(#pc-sombra)">
        <path d="M186 590 Q200 578 214 590 L240 712 H160 Z" fill="#1f3550" />
        <path d="M186 590 Q200 578 214 590 L218 612 H182 Z" fill="#2a4668" />
        <circle cx="200" cy="558" r="21" fill="#e4ad8e" />
        <path d="M178 556 Q176 528 202 528 Q226 530 222 556 Q214 540 200 540 Q186 540 178 556 Z" fill="#3a2418" /><circle cx="214" cy="527" r="11" fill="#3a2418" />
        <rect x="150" y="610" width="48" height="62" rx="4" fill="#7a5238" transform="rotate(-7 174 640)" />
        <g transform="rotate(-7 174 640)"><rect x="150" y="618" width="9" height="10" fill="#4c7fd0" /><rect x="150" y="632" width="9" height="10" fill="#5a9a6a" /><rect x="150" y="646" width="9" height="10" fill="#e7b64a" /></g>
        <path d="M200 612 q-6 22 -26 28" stroke="#e4ad8e" strokeWidth="8" strokeLinecap="round" fill="none" />
        <rect x="180" y="712" width="9" height="10" fill="#e4ad8e" /><rect x="212" y="712" width="9" height="10" fill="#e4ad8e" />
      </g>
      {/* ELE — o professor, com o caderno */}
      <g filter="url(#pc-sombra)">
        <rect x="378" y="590" width="50" height="78" rx="9" fill="#2b323a" />
        <rect x="383" y="660" width="17" height="56" fill="#23282e" /><rect x="406" y="660" width="17" height="56" fill="#23282e" />
        <rect x="381" y="714" width="22" height="8" rx="2" fill="#111" /><rect x="404" y="714" width="22" height="8" rx="2" fill="#111" />
        <polygon points="395,590 412,590 403,620" fill="#eef3f6" />
        <circle cx="404" cy="565" r="21" fill="#a8704e" />
        <path d="M383 562 Q384 540 405 540 Q425 541 425 562 Q420 550 404 549 Q390 549 383 562 Z" fill="#1d1511" />
        <rect x="428" y="618" width="26" height="36" rx="2" fill="#181818" transform="rotate(8 441 636)" /><rect x="428" y="618" width="4" height="36" fill="#b8423a" transform="rotate(8 441 636)" />
        <path d="M424 610 q14 6 18 22" stroke="#a8704e" strokeWidth="8" strokeLinecap="round" fill="none" />
      </g>
      {/* hortênsias */}
      <rect y="720" width="600" height="180" fill="url(#pc-base)" />
      <Hortensias x={-40} y={740} w={250} h={170} seed={11} />
      <Hortensias x={400} y={750} w={240} h={160} seed={29} flip />
      {/* título */}
      <g textAnchor="middle" fill="#fff4e0" filter="url(#pc-sombra)">
        <text x="300" y="62" fontSize="19" letterSpacing="7" fill="#f2d7a8" fontFamily="Lexend, Inter, Arial, sans-serif">LOVE STORY · Nº 5</text>
        <text x="300" y="150" fontSize="104" fontWeight="700" fontFamily="Georgia, 'Playfair Display', 'Times New Roman', serif" textLength="500" lengthAdjust="spacingAndGlyphs">Padrinho</text>
        <text x="300" y="212" fontSize="62" fontStyle="italic" fill="#f2b987" fontFamily="Georgia, 'Times New Roman', serif">&amp;</text>
        <text x="300" y="300" fontSize="104" fontWeight="700" fontFamily="Georgia, 'Playfair Display', 'Times New Roman', serif" textLength="500" lengthAdjust="spacingAndGlyphs">Madrinha</text>
      </g>
      <g textAnchor="middle" fill="#fdf3df" fontFamily="Georgia, serif" fontStyle="italic">
        <text x="300" y="846" fontSize="21">Uma pasta, sete dias e um encontro às cegas</text>
        <text x="300" y="873" fontSize="21">que cada um conta de um jeito.</text>
      </g>
    </svg>
  );
}

export const ARTES: Record<string, () => ReactNode> = { padrinhos: Padrinhos };
