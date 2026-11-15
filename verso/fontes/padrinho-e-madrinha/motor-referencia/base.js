/* ================= LOVE STORY · base comum da linha =================
   Regras: dois protagonistas fixos (A e B), nome e gênero livres, adultos, sexo só sugerido
   (a cena corta e volta de manhã) e só acontece se os dois jogadores escolherem. */
const LS_AT={forca:'Corpo',agilidade:'Jeito',coragem:'Coragem',cabeca:'Cabeça',labia:'Charme'};
/* quem é quem: por id do personagem */
const lsSeat=(E,id)=>(E.f.a&&E.f.a.id===id)?'a':'b';
const lsF=(c,id)=>prepFicha(c.E.f[lsSeat(c.E,id)]||{});
const lsEh=(c,id)=>c.eu.id===id;
/* nome de quem é o personagem X, do ponto de vista de quem lê: "você" ou o apelido */
const lsN=(c,id)=>lsEh(c,id)?'você':lsF(c,id).ap;
const lsNM=(c,id)=>lsEh(c,id)?'Você':lsF(c,id).ap;
/* destino separado por personagem */
const lsPor=(c,ida,idb,na,nb)=>{ const sa=lsSeat(c.E,ida); return {[sa]:na,[outro(sa)]:nb} };
/* gênero: palavra no masculino ou feminino conforme o personagem X */
const lsG=(c,id,m,f)=>lsF(c,id).g==='f'?f:m;
/* consentimento: cada um escolhe em segredo; a noite só acontece se os dois disserem sim */
const lsSim=(k)=>c=>({flag:k+'_'+c.s});
const lsNoite=(c,k)=>c.f(k+'_a')&&c.f(k+'_b');
/* capa tipográfica */
function lsCapa(o){ const ia=(typeof IMG!=='undefined'&&IMG&&o.id)?`<img class="capa-img" src="${IMG}/capa/${o.id}.jpg" alt="" loading="lazy" onload="this.closest('.capa').classList.add('ok-img')" onerror="this.remove()">`:'';
 return `<div class="capa capa-ls" style="--ls1:${o.c1};--ls2:${o.c2};--ls3:${o.c3||'#fff'}">${ia}<div class="capa-css">
 <div class="serie"><span>Love Story</span><span>Nº ${o.n}</span></div>
 <div class="ls-emb" aria-hidden="true">${o.svg||''}</div>
 <div class="titulo">${o.tit}<i>${o.sub}</i></div><div class="data">${o.data}</div></div></div>` }
LACOS.ls={v:1,fa:0,n:'Do jeito da história',d:'Vocês começam onde a história começa.'};

/* na linha Love Story o "abalo" vira nervosismo: mesma regra, outro nome */
const LS_NERVOS=[
 {min:0,n:'Tranquilo',d:'Sem efeito.',cls:'firme'},
 {min:2,n:'Inquieto',d:'−1 em Cabeça e Charme. A voz sai um pouco mais alta do que devia.',cls:'inquieto'},
 {min:4,n:'Nervoso',d:'−1 em todos os testes e −2 em Cabeça e Charme. O coração está na boca.',cls:'panico'},
 {min:6,n:'Travado',d:'−2 em todos os testes. Nada de ousadia até alguém te acalmar.',cls:'choque'}];
