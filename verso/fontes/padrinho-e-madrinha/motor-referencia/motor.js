/* ================= MOTOR · COOL KIDS =================
   Estado único e puro. Toda ação passa por agir(E, assento, ação) e devolve as entradas novas do livro.
   Tipos de nó:
     segue    · texto e "Continuar" (em dupla, os dois precisam tocar)
     escolha  · solo: ações exploratórias (somem depois de usadas) e saídas (ir)
     dialogo  · dupla: falas alternadas; cada jogador escolhe o que o próprio personagem diz
     decisao  · dupla: os dois precisam escolher a mesma opção
     dividir  · dupla: cada um faz uma ação diferente; os dois leem os dois resultados
     fim      · fim de capítulo (dupla)          final · fim da história
*/
const NOS={}, CAPS={}, PISTAS={}, INICIO={}, HISTORIAS={};
let NO_HIST='fundadores';
function no(id,d){ d.id=id; d.hist=d.hist||NO_HIST; NOS[id]=d; return d }
const outro=s=>s==='a'?'b':'a';
const AT={coragem:'Coragem',cabeca:'Cabeça',labia:'Lábia',agilidade:'Agilidade',forca:'Força'};

/* ---------- Abalo: 0 a 6, com efeito claro ---------- */
const ABALO=[
 {min:0,n:'Firme',d:'Sem efeito.',cls:'firme'},
 {min:2,n:'Inquieto',d:'−1 em Cabeça e Lábia.',cls:'inquieto'},
 {min:4,n:'Em pânico',d:'−1 em todos os testes e −2 em Cabeça e Lábia. As mãos não obedecem.',cls:'panico'},
 {min:6,n:'Em choque',d:'−2 em todos os testes. Ações arriscadas ficam fora de alcance até alguém te acalmar.',cls:'choque'}
];
function tabAbalo(h){ if(!h&&typeof APP!=='undefined'&&APP.E) h=APP.E.hist; const H=h&&HISTORIAS[h]; return (H&&H.abaloTab)||ABALO }
function nomeAbalo(h){ if(!h&&typeof APP!=='undefined'&&APP.E) h=APP.E.hist; const H=h&&HISTORIAS[h]; return (H&&H.abaloNome)||'Abalo' }
function nivelAbalo(v,h){ const T0=tabAbalo(h); let r=T0[0]; T0.forEach(x=>{ if(v>=x.min) r=x }); return r }
function modAbalo(v,at){ const m=at==='cabeca'||at==='labia'; if(v>=6) return -2; if(v>=4) return m?-2:-1; if(v>=2) return m?-1:0; return 0 }

/* ---------- Vínculo: 0 a 10, no máximo +2 por capítulo ---------- */
const VINC=[[0,'Estranhos'],[1,'Conhecidos'],[3,'Aliados'],[5,'Amigos'],[7,'Cúmplices'],[9,'Inseparáveis']];
function nomeVinc(v){ let n=VINC[0][1]; VINC.forEach(([m,x])=>{ if(v>=m) n=x }); return n }
const LACOS={
 estranhos:{v:0,n:'Estranhos',d:'Estudam na mesma escola e nunca trocaram uma palavra.'},
 vista:{v:1,n:'Conhecidos de vista',d:'Sabem o nome um do outro. Já dividiram uma mesa no refeitório, uma vez, sem conversar.'},
 afastados:{v:3,n:'Amigos que se afastaram',d:'Foram muito próximos quando crianças. Alguma coisa aconteceu e vocês pararam de se falar.'},
 ex:{v:3,fa:1,n:'Ex-casados',d:'Foram casados por oito anos e têm uma filha de dezessete. Estão separados há dez.'}
};
const VINC_CAP=2;
const FAISCA=['','Um olhar que demora','Vontade de ficar perto','Coração na boca','Quase','Sem volta'];

/* ---------- ficha ---------- */
function prepFicha(f){ const g=f.g==='f'; return Object.assign({},f,{o:g?'a':'o',um:g?'uma':'um',ele:g?'ela':'ele',Ele:g?'Ela':'Ele',dele:g?'dela':'dele',lo:g?'la':'lo'}) }

/* ---------- contexto de texto ----------
   c.eu / c.par: quem lê e o parceiro.  c.Q / c.q: "Você" ou o nome de quem age (para textos lidos pelos dois). */
function ctx(E,s,ator){
 const o=outro(s), F=E.f||{};
 const eu=prepFicha(F[s]||{}), par=prepFicha(F[o]||{});
 const c={E,s,o,eu,par,cap:E.cap,vinc:E.vinc,fa:E.fa,nv:nomeVinc(E.vinc),laco:E.laco,
  f:k=>!!(E.flags&&E.flags[k]), ab:x=>E.abalo[x||s]||0, tem:id=>(E.pistas[s]||[]).includes(id)||(E.pistas[o]||[]).includes(id),
  g:(p,m,f)=>p&&p.g==='f'?f:m,
  N:k=>nomeNpc(k,F[s]),
  fam:k=>!!(F[s]&&F[s].fam&&F[s].fam[k]), parFam:k=>!!(F[o]&&F[o].fam&&F[o].fam[k]),
  afastados:E.laco==='afastados', estranhos:E.laco==='estranhos',
  virEu:!!(E.vir&&E.vir[s]), virPar:!!(E.vir&&E.vir[o]), mordEu:!!(E.inf&&E.inf[s]), mordPar:!!(E.inf&&E.inf[o]),
  ferEu:E.fer?E.fer[s]||0:0, ferPar:E.fer?E.fer[o]||0:0, rec:k=>E.rec?E.rec[k]||0:0, fac:k=>E.fac?E.fac[k]||0:0
 };
 if(ator){ const a=prepFicha(F[ator]||{}); c.ator=a; c.euAtor=ator===s; c.Q=ator===s?'Você':a.ap; c.q=ator===s?'você':a.ap;
  c.outroAtor=ator===s?par:eu; c.oQ=ator===s?par.ap:'Você'; c.oq=ator===s?par.ap:'você';
  c.ga=(m,f)=>a.g==='f'?f:m;
  const pos=(eh,nome)=>(n,f,pl)=>eh?(f?'sua':'seu')+(pl?'s ':' ')+n:n+' de '+nome;
  c.Pq=pos(ator===s,a.ap); c.Po=pos(ator!==s,ator===s?par.ap:eu.ap) }
 return c
}
function nomeNpc(k,f){ const P=(typeof PESSOAS!=='undefined'&&PESSOAS[k])||{}; const fam=f&&f.fam&&f.fam[k]; return fam||P.curto||P.nome||k }
/* "a mão de você" → "a sua mão": conserta o possessivo quando quem lê é quem age */
const ART={o:'seu',no:'seu',do:'seu',pelo:'seu',ao:'seu',a:'sua',na:'sua',da:'sua',pela:'sua',os:'seus',nos:'seus',dos:'seus',pelos:'seus',as:'suas',nas:'suas',das:'suas',pelas:'suas'};
function posse(s){ if(typeof s!=='string'||s.indexOf(' de você')<0) return s;
 return s.replace(/\b(o|a|os|as|no|na|nos|nas|do|da|dos|das|pelo|pela|pelos|pelas|ao)\s+([a-zà-ú]+(?:\s+[a-zà-ú]+)?)\s+de você(?![a-zà-ú])/gi,(t,art,nome)=>{ const p=ART[art.toLowerCase()]; return p?art+' '+p+' '+nome:t }) }
function T(v,c){ return posse(typeof v==='function'?v(c):(v||'')) }
/* Perspectiva: o resultado de uma ação é escrito do ponto de vista de quem age ("Você liga...").
   O parceiro lê o mesmo trecho em terceira pessoa ("Ivy liga..."), e onde o texto cita o nome dele, lê "você".
   Só a narração muda: o que está entre travessões (falas) e em itálico (bilhetes, mensagens) fica como foi escrito. */
const LET='a-zà-úA-ZÀ-Ú';
function narracao(t,fn){ const fora=s=>s.split(/(\*[^*\n]+\*)/).map((x,i)=>i%2?x:fn(x)).join('');
 return t.split('\n').map(par=>{ if(!par.trim()) return par; const fala=par.startsWith('— '); return par.split(' — ').map((sg,i)=>((i%2===1)===fala)?fora(sg):sg).join(' — ') }).join('\n') }
function terceira(t,nome){
 const ARTP={seu:'o',sua:'a',seus:'os',suas:'as'};
 return narracao(t,s=>{
  s=s.replace(new RegExp('(^|[^'+LET+'])(d|n|pel|a)?(o|a|os|as)\\s+(seu|sua|seus|suas)\\s+([a-zà-ú]+(?:-[a-zà-ú]+)?)','gi'),(m,p,pre,art,pos,sub)=>p+(pre||'')+art+' '+sub+' de '+nome);
  s=s.replace(new RegExp('(^|[^'+LET+'])(de |em |por |com |para )?(seu|sua|seus|suas)\\s+([a-zà-ú]+(?:-[a-zà-ú]+)?)','gi'),(m,p,prep,pos,sub)=>{ const art=ARTP[pos.toLowerCase()]; const mai=pos[0]!==pos[0].toLowerCase();
   const pr=(prep||'').trim().toLowerCase(); let ini=pr==='de'?'d'+art:pr==='em'?'n'+art:pr==='por'?'pel'+art:pr?pr+' '+art:art;
   if((prep&&prep[0]!==prep[0].toLowerCase())||(!prep&&mai)) ini=ini[0].toUpperCase()+ini.slice(1);
   return p+ini+' '+sub+' de '+nome });
  return s.replace(new RegExp('(^|[^'+LET+'])você(?!['+LET+'])','gi'),(m,p)=>p+nome) }) }
function vistaDoPar(ta,nomeAtor,nomeLeitor){ let t=terceira(ta,nomeAtor);
 if(!nomeLeitor||nomeLeitor===nomeAtor) return t;
 const rx=new RegExp('(^|[^'+LET+'])'+nomeLeitor.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?!['+LET+'])','g');
 return posse(narracao(t,s=>s.replace(rx,(m,p,off)=>{ const antes=s.slice(0,off+p.length).trimEnd(); const ini=!antes||/[.!?…:]$/.test(antes); return p+(ini?'Você':'você') }))) }
function persp(E,v,x,s){ if(x===s||(s!=='a'&&s!=='b')) return T(v,ctx(E,x,s));
 return vistaDoPar(T(v,ctx(E,s,s)),nomeF(E,s),nomeF(E,x)) }

/* ---------- estado ---------- */
function novoEstado0(hist,laco){ const H=HISTORIAS[hist]; if(H&&H.lacos&&!H.lacos.includes(laco)) laco=H.lacos[0]; const L=LACOS[laco]||LACOS.estranhos;
 return {v:2,hist,anc:{},fase:'lobby',cap:1,laco:laco in LACOS?laco:'estranhos',f:{},pronto:{},pos:{},solo:{a:null,b:null},duo:null,usados:{a:{},b:{}},
  flags:{},pistas:{a:[],b:[]},abalo:{a:0,b:0},vinc:L.v,vg:{},fa:L.fa||0,truque:{},seq:0,slots:{},jogadores:[]} }

function novoEstado(hist,laco){ const E=novoEstado0(hist,laco); const H=HISTORIAS[hist];
 if(H&&H.npcIni) E.npcs=H.npcIni.slice();
 if(H&&H.sobrev) Object.assign(E,{rec:Object.assign({},H.recIni),fer:{a:0,b:0},inf:{a:0,b:0},vir:{},fac:{}}); return E }
/* ---------- sobrevivência (Livro 3): recursos, ferimentos, infecção, facções ---------- */
const RECN={comida:'Comida',agua:'Água',remedio:'Remédio',municao:'Munição',k7:'Soro K-7'};
const FER=['Inteiro','Ferido','Grave','Caído'];
const INF=['Limpo','Mordido','Febre','Delírio','Virado'];
const FACN={represa:'Represa',catadores:'Catadores',cordeiro:'Sargento Cordeiro'};
function mudaRec(E,k,d,out,vis){ if(!E.rec||!d) return; const a=E.rec[k]||0; const v=Math.max(0,a+d); E.rec[k]=v; if(v!==a) ent(E,out,{t:'sist',s:vis||'ab',txt:`${RECN[k]||k} ${v>a?'+':'−'}${Math.abs(v-a)} · agora ${v}`}) }
function mudaFer(E,s,d,out,motivo,vis){ if(!E.fer||!d) return; const a=E.fer[s]||0; const v=Math.max(0,Math.min(3,a+d)); E.fer[s]=v; if(v===a) return;
 ent(E,out,{t:'sist',s:vis||'ab',quem:s,txt:porAssento(E,vis||'ab',x=>`${x===s?'Você':nomeF(E,s)}: ${FER[v]}${motivo?` (${motivo})`:''}`)}) }
function nomeF(E,s){ return (E.f[s]&&E.f[s].ap)||'?' }
function morder(E,s,out,vis){ if(!E.inf||E.vir[s]) return; if(E.inf[s]>0) return; E.inf[s]=1;
 ent(E,out,{t:'sist',s:vis||'ab',quem:s,grave:true,txt:porAssento(E,vis||'ab',x=>`${x===s?'Você foi mordid'+(E.f[s].g==='f'?'a':'o'):nomeF(E,s)+' foi mordid'+(E.f[s].g==='f'?'a':'o')}. Infecção: Mordido. Sem soro, vira em quatro capítulos.`)}) }
function curar(E,s,out){ if(!E.inf) return; if(E.inf[s]===0&&!E.vir[s]) return; const era=E.vir[s]; E.inf[s]=0; delete E.vir[s];
 ent(E,out,{t:'sist',s:'ab',quem:s,txt:porAssento(E,'ab',x=>`${x===s?'Você':nomeF(E,s)}: ${era?'o soro começa a trazer de volta. Infecção: Limpo.':'a febre cede. Infecção: Limpo.'}`)}) }
function virar(E,s,out){ if(!E.inf) return; E.inf[s]=4; E.vir[s]=true;
 ent(E,out,{t:'sist',s:'ab',quem:s,grave:true,txt:porAssento(E,'ab',x=>x===s?'Você virou. O corpo não é mais seu. Você ainda está aqui dentro.':nomeF(E,s)+' virou.')}) }
function infAvanca(E,s,out){ if(!E.inf||!E.inf[s]||E.vir[s]) return; E.inf[s]++;
 if(E.inf[s]>=4) virar(E,s,out); else { ent(E,out,{t:'sist',s:'ab',quem:s,grave:true,txt:porAssento(E,'ab',x=>`${x===s?'Você':nomeF(E,s)}: infecção avança para ${INF[E.inf[s]]}.`)}); if(E.inf[s]===3) mudaAbalo(E,s,1,out,'o delírio') } }
function manutencao(E,out){ if(!E.rec) return; const CN=(HISTORIAS[E.hist]&&HISTORIAS[E.hist].consumo)||2;
 ['comida','agua'].forEach(k=>{ const tem=E.rec[k]||0; const falta=Math.max(0,CN-tem); E.rec[k]=Math.max(0,tem-CN);
  ent(E,out,{t:'sist',s:'ab',txt:`Fim do dia: a dupla consome ${CN} de ${RECN[k]}. Sobram ${E.rec[k]}.`});
  if(falta){ if(k==='comida') ['a','b'].forEach(x=>mudaFer(E,x,1,out,'fome')); else ['a','b'].forEach(x=>mudaAbalo(E,x,2,out,'sede')) } });
 ['a','b'].forEach(x=>infAvanca(E,x,out)) }
function modCorpo(E,s,at){ const fis=at==='forca'||at==='agilidade'; let m=0; const f=E.fer?E.fer[s]||0:0, i=E.inf?E.inf[s]||0:0;
 if(f===1&&fis) m-=1; if(f===2) m-=fis?2:1; if(f===3) m-=fis?3:2; if(i===2&&fis) m-=1; if(i===3) m-=fis?2:0; return m }
function bloqRec(E,op){ if(!op.usa||!E.rec) return null; for(const k in op.usa){ if((E.rec[k]||0)<op.usa[k]) return `Falta ${RECN[k]||k}.` } return null }
function ent(E,out,o){ o.n=++E.seq; o.cap=E.cap; out.push(o); return o }
function porAssento(E,s,fn){ if(s==='ab') return {a:fn('a'),b:fn('b')}; return fn(s) }

/* ---------- efeitos ---------- */
function mudaAbalo(E,s,d,out,motivo,vis){ if(!d) return; const antes=E.abalo[s]||0; const v=Math.max(0,Math.min(6,antes+d)); if(v===antes) return; E.abalo[s]=v;
 const n0=nivelAbalo(antes,E.hist), n1=nivelAbalo(v,E.hist);
 ent(E,out,{t:'abalo',s:vis||'ab',quem:s,de:antes,para:v,niv:n1.n,mudou:n0.n!==n1.n,d:n1.d,m:motivo||''}) }
function mudaVinc(E,d,out,motivo){ if(!d) return; let v=d;
 if(d>0){ const g=E.vg[E.cap]||0; const VC=(HISTORIAS[E.hist]&&HISTORIAS[E.hist].vincCap)||VINC_CAP; v=Math.min(d,VC-g); if(v<=0) return; E.vg[E.cap]=g+v }
 const antes=E.vinc; E.vinc=Math.max(0,Math.min(10,E.vinc+v)); if(E.vinc===antes) return;
 ent(E,out,{t:'vinc',s:'ab',de:antes,para:E.vinc,nome:nomeVinc(E.vinc),mudou:nomeVinc(antes)!==nomeVinc(E.vinc),m:motivo||''}) }
function mudaFa(E,d,out){ if(!d) return; const a=E.fa; E.fa=Math.max(0,Math.min(5,E.fa+d)); if(E.fa!==a) ent(E,out,{t:'fa',s:'ab',para:E.fa,nome:FAISCA[E.fa]||''}) }
function darPista(E,s,id,out){ const lst=s==='ab'?['a','b']:[s]; let novo=false; lst.forEach(x=>{ if(!E.pistas[x].includes(id)){ E.pistas[x].push(id); novo=true } });
 if(novo&&PISTAS[id]) ent(E,out,{t:'pista',s,id,nome:PISTAS[id].n}) }
function aplicarEf(E,ef,ator,vis,out){ if(!ef) return; const c=ctx(E,ator==='ab'?'a':ator);
 if(typeof ef==='function') ef=ef(c)||{};
 const flags=[].concat(ef.flag||[]); flags.forEach(k=>E.flags[k]=true); [].concat(ef.nflag||[]).forEach(k=>delete E.flags[k]);
 const quem=ator==='ab'?['a','b']:[ator];
 if(ef.abalo) quem.forEach(x=>mudaAbalo(E,x,ef.abalo,out,ef.motivo,vis));
 if(ef.abaloPar&&ator!=='ab') mudaAbalo(E,outro(ator),ef.abaloPar,out,ef.motivo);
 if(ef.abaloAmbos) ['a','b'].forEach(x=>mudaAbalo(E,x,ef.abaloAmbos,out,ef.motivo));
 if(ef.vinc) mudaVinc(E,ef.vinc,out,ef.motivoV);
 if(ef.fa) mudaFa(E,ef.fa,out);
 if(ef.rec) Object.keys(ef.rec).forEach(k=>mudaRec(E,k,ef.rec[k],out,'ab'));
 if(ef.fer) quem.forEach(x=>mudaFer(E,x,ef.fer,out,ef.motivoF));
 if(ef.ferPar&&ator!=='ab') mudaFer(E,outro(ator),ef.ferPar,out,ef.motivoF);
 if(ef.ferAmbos) ['a','b'].forEach(x=>mudaFer(E,x,ef.ferAmbos,out,ef.motivoF));
 if(ef.mordida) quem.forEach(x=>morder(E,x,out));
 if(ef.mordidaPar&&ator!=='ab') morder(E,outro(ator),out);
 if(ef.soro){ const alvo=ef.soro==='par'&&ator!=='ab'?[outro(ator)]:ef.soro==='ambos'?['a','b']:quem; alvo.forEach(x=>curar(E,x,out)) }
 if(ef.virar) quem.forEach(x=>virar(E,x,out));
 if(ef.fac&&E.fac) Object.keys(ef.fac).forEach(k=>{ E.fac[k]=(E.fac[k]||0)+ef.fac[k]; ent(E,out,{t:'sist',s:'ab',txt:`${FACN[k]||k}: ${ef.fac[k]>0?'confiam mais em vocês':'confiam menos em vocês'}.`}) });
 [].concat(ef.pista||[]).forEach(p=>darPista(E,vis,p,out)) }

/* ---------- dados: 2d6 + atributo ± abalo. 10+ sucesso, 7-9 com custo, 6- falha ---------- */
function d6(){ return 1+Math.floor(Math.random()*6) }
function rolar(E,s,at,dif){ if(E.rolFixa&&E.rolFixa[s]){ const r=E.rolFixa[s]; delete E.rolFixa[s]; return r }
 const f=E.f[s]; const base=(f.at&&f.at[at])||0, ma=modAbalo(E.abalo[s]||0,at), mc=modCorpo(E,s,at); const van=dif>0?1:dif<0?-1:0;
 const um=()=>{ let d=[d6(),d6()], dx=null; if(van){ const t=[d[0],d[1],d6()].sort((x,y)=>x-y); if(van>0){ dx=t[0]; d=[t[1],t[2]] } else { dx=t[2]; d=[t[0],t[1]] } }
  const tot=d[0]+d[1]+base+ma+mc; return {d,dx,van,tot,res:tot>=10?'ok':tot>=7?'parcial':'falha'} };
 let r=um(), truque=false;
 const k=E.cap+':'+s; if(r.res!=='ok'&&f.truque&&f.truque.at===at&&!E.truque[k]){ E.truque[k]=1; const r2=um(); truque={antes:r}; r=r2 }
 return Object.assign(r,{at,base,ma,mc,dif:0,truque:truque?{n:f.truque.n,antes:truque.antes}:null}) }

/* ---------- forçar a sorte / ajuda do parceiro ---------- */
function podeForcar(E,s){ return (E.abalo[s]||0)<5&&!(E.fer&&E.fer[s]>=3)&&!(E.vir&&E.vir[s]) }
const resDe=t=>t>=10?'ok':t>=7?'parcial':'falha';
function sondar(E,s,a,op,vis,out){ /* rola antes; se falhar, a decisão fica pendente */
 if(!op.at||a.forcado) return false; const dif=typeof op.dif==='function'?op.dif(ctx(E,s)):op.dif; const r=rolar(E,s,op.at,dif);
 if(r.res!=='falha'){ E.rolFixa=E.rolFixa||{}; E.rolFixa[s]=r; return false }
 E.pend=E.pend||{}; E.pend[s]={a:Object.assign({},a),r,dif,vis,t:T(op.t,ctx(E,s)),semAjuda:vis!=='ab'};
 ent(E,out,Object.assign({t:'dado',s:vis,quem:s,pend:true},r)); return true }
function resolverPend(E,s,r,out){ const p=E.pend[s]; delete E.pend[s]; E.rolFixa=E.rolFixa||{}; E.rolFixa[s]=r;
 return out.concat(agir(E,s,Object.assign({},p.a,{forcado:true}))) }

/* ---------- resolver uma opção ----------
   vis: quem lê ('a','b','ab'); ator: quem fez. */
function resolverOp(E,s,op,vis,out,nid){
 const txt=v=>v?porAssento(E,vis,x=>persp(E,v,x,s)):null;
 if(op.x){ ent(E,out,{t:'txt',s:vis,quem:s,txt:txt(op.x)}) }
 let ramo=null;
 if(op.usa&&E.rec) Object.keys(op.usa).forEach(k=>mudaRec(E,k,-op.usa[k],out,'ab'));
 if(op.at){ const r=rolar(E,s,op.at,typeof op.dif==='function'?op.dif(ctx(E,s)):op.dif); ent(E,out,Object.assign({t:'dado',s:vis,quem:s},r));
  ramo=r.res==='ok'?(op.ok||{}):r.res==='parcial'?(op.parcial||Object.assign({},op.ok||{},{custo:true})):(op.falha||{});
  if(ramo.x) ent(E,out,{t:'txt',s:vis,quem:s,txt:txt(ramo.x)});
  if(ramo.custo&&!op.parcial) mudaAbalo(E,s,1,out,'o preço de conseguir',vis) }
 aplicarEf(E,op.ef,s,vis,out); if(ramo) aplicarEf(E,ramo.ef,s,vis,out);
 return (ramo&&ramo.ir)||op.ir||null }

/* ---------- entrar em nós ---------- */
function npcNovo(E,n,vis,out){ if(!n.npcs) return; E.npcs=E.npcs||[]; const nv=n.npcs.filter(k=>!E.npcs.includes(k)); if(!nv.length) return; E.npcs.push(...nv); ent(E,out,{t:'npc',s:'ab',ids:nv}) }
function abrirSolo(E,s,id,out){ const n=NOS[id]; npcNovo(E,n,s,out); E.solo[s]={id,u:[]};
 ent(E,out,{t:'cena',s,id,acao:!!n.acao,lugar:T(n.lugar,ctx(E,s)),hora:T(n.hora,ctx(E,s)),img:n.img||'',trilha:n.trilha||'',txt:T(n.texto,ctx(E,s))});
 if(n.ef) aplicarEf(E,n.ef,s,s,out) }
function abrirDuo(E,id,out){ const n=NOS[id]; npcNovo(E,n,'ab',out); E.duo={id,falas:[],votos:{},divs:{a:[],b:[]},ok:{},mudou:{}}; E.solo={a:null,b:null};
 ent(E,out,{t:'cena',s:'ab',id,acao:!!n.acao,lugar:T(n.lugar,ctx(E,'a')),hora:T(n.hora,ctx(E,'a')),img:n.img||'',trilha:n.trilha||'',txt:porAssento(E,'ab',x=>T(n.texto,ctx(E,x)))});
 /* juntar as pistas que cada um achou sozinho */
 ['a','b'].forEach(s=>{ const o=outro(s); (E.pistas[o]||[]).forEach(p=>{ if(!E.pistas[s].includes(p)) { E.pistas[s].push(p); ent(E,out,{t:'pista',s,id:p,nome:PISTAS[p]?PISTAS[p].n:p,de:o}) } }) });
 if(n.tipo==='puzzle'){ E.duo.puz={er:0,fim:false,ult:{}}; const P=n.puz;
  ent(E,out,{t:'puzzle',s:'ab',tit:P.tit,kind:P.kind,enun:P.enun,txt:porAssento(E,'ab',x=>T(P.peca[x],ctx(E,x))),max:P.max||4}) }
 if(n.ef) aplicarEf(E,n.ef,'ab','ab',out) }
function ir(E,s,dest,out){
 if(typeof dest==='function') dest=dest(ctx(E,s));
 if(!dest) return;
 if(typeof dest==='object'){ const juntos=E.duo&&E.pos.a===E.pos.b; E.duo=null; ['a','b'].forEach(x=>{ if(dest[x]) entrar(E,x,dest[x],out) }); return }
 const n=NOS[dest]; if(!n) throw new Error('nó inexistente: '+dest);
 if(n.quem==='ab'){
  if(E.duo&&E.pos.a===E.pos.b&&E.duo.id===E.pos[s]){ E.pos.a=E.pos.b=dest; abrirDuo(E,dest,out); return }
  entrar(E,s,dest,out) }
 else { if(E.duo&&E.duo.id===E.pos[s]){ E.duo=null } E.pos[s]=dest; abrirSolo(E,s,dest,out) } }
function entrar(E,s,dest,out){ const n=NOS[dest]; if(!n) throw new Error('nó inexistente: '+dest);
 E.pos[s]=dest;
 if(n.quem==='ab'){ E.solo[s]=null; if(E.pos[outro(s)]===dest) abrirDuo(E,dest,out); else ent(E,out,{t:'espera',s,id:dest,lugar:T(n.lugar,ctx(E,s))}) }
 else abrirSolo(E,s,dest,out) }

/* ---------- o que cada um pode fazer agora ---------- */
function opsSolo(E,s){ const n=NOS[E.pos[s]]; if(!n||!n.ops||!E.solo[s]) return []; const c=ctx(E,s); const u=E.solo[s].u;
 const marca=o=>Object.assign(o,{op:difOp(o.op,c),bloq:o.op.bravo&&(E.abalo[s]>=6||(E.fer&&E.fer[s]>=3))?'Em choque ou caído, você não consegue.':bloqRec(E,o.op)});
 const l=n.ops.map((op,i)=>({op,i})).filter(({op,i})=>(op.repete||op.ir||!u.includes(i))&&(!op.se||op.se(c))&&(!op.req||E.flags[op.req])&&(!op.nao||!E.flags[op.nao])).map(marca);
 if(l.some(o=>!o.bloq)) return l;
 /* rede de segurança: se tudo se fechou, a saída da cena aparece mesmo sem a condição */
 const sa=n.ops.map((op,i)=>({op,i})).filter(({op})=>op.ir&&!op.at&&!op.usa).map(marca); return sa.length?l.concat(sa.filter(o=>!l.some(x=>x.i===o.i))):l }
function difOp(op,c){ return typeof op.dif==='function'?Object.assign({},op,{dif:op.dif(c)}):op }
function turnoDialogo(E){ const d=E.duo, n=NOS[d.id]; let i=d.ti||0; const hist=d.falas;
 while(i<n.falas.length){ const F=n.falas[i]; const quem=F.quem||falante(E,n,i); if(!F.se||F.se(ctx(E,quem),hist)) return {i,F,quem}; i++ } return null }
function falante(E,n,i){ const c0=typeof n.comeca==='function'?n.comeca(E):(n.comeca||'a'); return i%2===0?c0:outro(c0) }
function opsFala(E,F,quem){ if(E.vir&&E.vir[quem]) return [{op:{t:'(Um som que já foi uma palavra. Talvez o nome de alguém.)',tom:'neutro',acao:true},i:0}];
 const c=ctx(E,quem,quem); const h=E.duo.falas; const n=NOS[E.duo.id];
 let ops=(typeof F.ops==='function'?F.ops(c,h):F.ops).map((op,i)=>({op,i})).filter(({op})=>(!op.se||op.se(c,h)));
 /* Agência: quem fala nunca tem uma única opção. Se a fala escrita para este momento oferece menos de três,
    a cena completa com a sua reserva (n.pool): falas que cabem em qualquer ponto da conversa, de tons diferentes. */
 if(ops.length<3&&n&&n.pool){ const P=(typeof n.pool==='function'?n.pool(c,h):n.pool).map((op,j)=>({op,i:100+j})).filter(({op})=>(!op.se||op.se(c,h)));
  const usados=new Set(h.map(x=>x.tag)); let livres=P.filter(x=>!x.op.tag||!usados.has(x.op.tag)); if(livres.length<3-ops.length) livres=P;
  const ini=h.length%Math.max(1,livres.length); const rot=livres.slice(ini).concat(livres.slice(0,ini));
  ops=ops.concat(rot.slice(0,3-ops.length)) }
 return ops }
const compartilha=op=>!!op.ambos&&!op.at; /* os dois podem escolher a mesma opção, salvo se ela tem teste (aí é uma ação só) */
function opsVirado(E,n){ const H=HISTORIAS[E.hist]; return ((H&&H.viradoOps)||[]).map((op,j)=>({op,i:-1-j})) }
function opsDuo(E,s){ const n=NOS[E.duo.id]; const c=ctx(E,s);
 if(E.vir&&E.vir[s]&&n.tipo==='dividir') return opsVirado(E,n);
 return (n.ops||[]).map((op,i)=>({op,i})).filter(({op})=>(!op.se||op.se(c))&&(!op.req||E.flags[op.req])&&(!op.nao||!E.flags[op.nao])&&(!op.so||op.so===s))
  .map(o=>Object.assign(o,{op:difOp(o.op,c),bloq:o.op.bravo&&E.fer&&E.fer[s]>=3?'Caído, você não consegue.':bloqRec(E,o.op)})) }
function estagioDuo(E){ const d=E.duo; if(!d) return null; const n=NOS[d.id];
 if(n.tipo==='dialogo'){ const t=turnoDialogo(E); return t?'falando':'pronto' }
 if(n.tipo==='dividir'){ const cada=n.cada||1; return (d.divs.a.length>=cada&&d.divs.b.length>=cada&&!(E.pend&&(E.pend.a||E.pend.b)))?'pronto':'agindo' }
 if(n.tipo==='decisao') return 'votando';
 if(n.tipo==='puzzle') return d.puz&&d.puz.fim?'pronto':'puzzle';
 return 'pronto' }

/* ---------- ações ---------- */
function agir(E,s,a){ const out=[];
 if(a.k==='ficha'){ if(E.fase!=='lobby') return out; E.f[s]=a.f; E.pronto[s]=false; return out }
 if(a.k==='prontoLobby'){ if(E.fase!=='lobby'||!E.f[s]) return out; E.pronto[s]=!!a.v; return out }
 if(a.k==='comecar'){ if(E.fase!=='lobby'||!E.f.a||!E.f.b||!E.pronto.a||!E.pronto.b) return out; E.fase='jogo';
  if(E.rec) ['a','b'].forEach(x=>{ const b=E.f[x].bonus; if(!b) return; if(b.rec) Object.keys(b.rec).forEach(k=>{ E.rec[k]=(E.rec[k]||0)+b.rec[k] }); [].concat(b.flag||[]).forEach(k=>{ E.flags[k]=true; E.flags[k+'_'+x]=true }) });
  let ini=INICIO[E.hist]; if(typeof ini==='function') ini=ini(E); ent(E,out,{t:'capitulo',s:'ab',cap:1}); ['a','b'].forEach(x=>entrar(E,x,ini[x],out)); return out }
 if(E.fase!=='jogo') return out;
 /* âncora: uma vez por capítulo, cada um pode se recompor (−2 de abalo) */
 if(a.k==='ancora'){ E.anc=E.anc||{}; const k=E.cap+':'+s; if(E.anc[k]||!(E.abalo[s]>0)) return out; E.anc[k]=1;
  ent(E,out,{t:'ancora',s:'ab',quem:s,txt:porAssento(E,'ab',x=>{ const c=ctx(E,x,s); return c.Q+' '+(E.f[s].ancora||'fecha os olhos, conta até dez e lembra por que está aqui')+'.' })});
  mudaAbalo(E,s,-2,out,'a âncora','ab'); return out }
 E.pend=E.pend||{}; const o0=outro(s);
 if(a.k==='aceitar'){ const p=E.pend[s]; if(!p) return out; return resolverPend(E,s,Object.assign({},p.r,{aceito:true}),out) }
 if(a.k==='forcar'){ const p=E.pend[s]; if(!p||!podeForcar(E,s)) return out;
  mudaAbalo(E,s,2,out,'forçar a sorte',p.vis); const r=rolar(E,s,p.r.at,p.dif); r.forcado=true;
  if(r.res==='falha'){ r.pior=true; mudaAbalo(E,s,1,out,'forçar e falhar de novo',p.vis); if(E.fer) mudaFer(E,s,1,out,'forçar e falhar de novo',p.vis) }
  return resolverPend(E,s,r,out) }
 if(a.k==='pedirAjuda'){ const p=E.pend[s]; if(!p||p.pedido||p.semAjuda) return out; p.pedido=true;
  ent(E,out,{t:'sist',s:o0,txt:nomeF(E,s)+' pediu a sua ajuda: '+p.t}); return out }
 if(a.k==='ajudar'||a.k==='recusarAjuda'){ const p=E.pend[o0]; if(!p||!p.pedido) return out;
  if(a.k==='recusarAjuda'){ p.pedido=false; p.semAjuda=true; ent(E,out,{t:'sist',s:'ab',txt:nomeF(E,s)+' não pôde ajudar agora.'}); return out }
  mudaAbalo(E,s,1,out,'se arriscar junto','ab'); const r=Object.assign({},p.r); r.tot+=2; r.res=resDe(r.tot); r.ajuda=s;
  if(r.res==='falha'){ mudaAbalo(E,s,1,out,'falhar junto','ab'); mudaAbalo(E,o0,1,out,'falhar junto','ab') } else mudaVinc(E,1,out,'a ajuda na hora certa');
  return resolverPend(E,o0,r,out) }
 if(E.pend[s]&&!a.forcado) return out;
 const id=E.pos[s]; if(a.no&&a.no!==id) return out; const n=NOS[id]; if(!n) return out;
 /* solo */
 if(n.quem!=='ab'){
  if(a.k==='op'){ const disp=opsSolo(E,s).find(o=>o.i===a.i); if(!disp||disp.bloq) return out; const op=disp.op;
   if(sondar(E,s,a,op,s,out)) return out;
   if(!op.ir&&!op.repete) E.solo[s].u.push(a.i);
   ent(E,out,{t:'esc',s,quem:s,txt:T(op.t,ctx(E,s))});
   const dest=resolverOp(E,s,op,s,out,id); if(dest) ir(E,s,dest,out) }
  else if(a.k==='ok'&&n.tipo==='segue'){ ir(E,s,n.prox,out) }
  return out }
 /* dupla */
 const d=E.duo; if(!d||d.id!==id||E.pos.a!==E.pos.b) return out;
 if(a.k==='fala'&&n.tipo==='dialogo'){ const t=turnoDialogo(E); if(!t||t.quem!==s||a.t!==t.i) return out;
  const disp=opsFala(E,t.F,s).find(o=>o.i===a.i); if(!disp) return out; const op=disp.op; const c=ctx(E,s);
  d.falas.push({quem:s,t:t.i,i:a.i,tom:op.tom||'neutro',tag:op.tag||''}); d.ti=t.i+1;
  ent(E,out,{t:'fala',s:'ab',quem:s,acao:!!op.acao,txt:op.acao?porAssento(E,'ab',x=>T(op.t,ctx(E,x,s))):T(op.t,c)});
  if(op.apos) ent(E,out,{t:'txt',s:'ab',quem:s,txt:porAssento(E,'ab',x=>persp(E,op.apos,x,s))});
  aplicarEf(E,op.ef,s,'ab',out);
  /* reciprocidade: abrir-se só conta quando o outro também se abre */
  const h=d.falas, ult=h[h.length-1], ant=h[h.length-2];
  if(ant&&ant.quem!==ult.quem&&!d.vincDado){
   const abre=x=>x==='abre'||x==='cuida'||x==='flerte';
   if(abre(ult.tom)&&abre(ant.tom)){ d.vincDado=1; mudaVinc(E,1,out,'vocês se abriram um com o outro') } }
  if(ant&&ant.quem!==ult.quem&&ult.tom==='flerte'&&ant.tom==='flerte'&&!d.faDado){ d.faDado=1; mudaFa(E,1,out) }
  if(ult.tom==='cuida') mudaAbalo(E,outro(s),-1,out,'alguém se importou');
  if(ult.tom==='fere'&&!d.feriu){ d.feriu=1; mudaVinc(E,-1,out,'uma palavra que machucou') }
  return out }
 if(a.k==='voto'&&n.tipo==='decisao'){ const disp=opsDuo(E,s).find(o=>o.i===a.i); if(!disp||(E.vir&&E.vir[s]&&!E.vir[outro(s)])) return out;
  if(disp.bloq) return out;
  if(d.votos[s]!==undefined&&d.votos[s]!==a.i) d.mudou[s]=1; d.votos[s]=a.i; if(E.vir&&E.vir[outro(s)]&&!E.vir[s]) d.votos[outro(s)]=a.i;
  if(d.votos.a!==undefined&&d.votos.a===d.votos.b){ const op=disp.op;
   ent(E,out,{t:'decisao',s:'ab',txt:porAssento(E,'ab',x=>T(op.t,ctx(E,x))),cedeu:d.mudou.a&&!d.mudou.b?'a':d.mudou.b&&!d.mudou.a?'b':''});
   const dest=resolverOp(E,'ab',Object.assign({},op,{at:null}),'ab',out,id); if(dest) ir(E,s,dest,out); else ir(E,s,n.prox,out) }
  return out }
if(a.k==='puz'&&n.tipo==='puzzle'){ const P=n.puz, z=d.puz; if(!z||z.fim) return out;
  const norm=x=>String(x==null?'':x).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'');
  let certo, tent;
  if(P.kind==='escolha'){ if(!(a.i>=0&&a.i<P.opcoes.length)) return out; tent=P.opcoes[a.i]; certo=a.i===P.certa }
  else { tent=String(a.r||'').trim().slice(0,40); if(!norm(tent)) return out; certo=P.resp.map(norm).includes(norm(tent)) }
  ent(E,out,{t:'esc',s:'ab',quem:s,txt:'Tentar: '+tent});
  if(certo){ z.fim=true; ent(E,out,{t:'txt',s:'ab',quem:s,txt:porAssento(E,'ab',x=>T(P.ok.x,ctx(E,x)))}); aplicarEf(E,P.ok.ef,'ab','ab',out); return out }
  z.er++; const rest=(P.max||4)-z.er;
  if(rest>0){ ent(E,out,{t:'txt',s:'ab',quem:s,txt:P.kind==='escolha'?'Não é essa. Vocês ainda têm '+rest+' tentativa'+(rest>1?'s':'')+'.':'Não é isso. Vocês ainda têm '+rest+' tentativa'+(rest>1?'s':'')+'.'});
   mudaAbalo(E,s,1,out,'errar de novo','ab'); const dica=P.dicas&&P.dicas[z.er]; if(dica) ent(E,out,{t:'txt',s:'ab',quem:s,txt:'*Dica:* '+dica}) }
  else { z.fim=true; ent(E,out,{t:'txt',s:'ab',quem:s,txt:porAssento(E,'ab',x=>T(P.falha.x,ctx(E,x)))}); aplicarEf(E,P.falha.ef,'ab','ab',out) }
  return out }
 if(a.k==='div'&&n.tipo==='dividir'){ const cada=n.cada||1; if(d.divs[s].length>=cada&&!a.forcado) return out;
  const disp=opsDuo(E,s).find(o=>o.i===a.i); if(!disp) return out; const op=disp.op;
  const o=outro(s); const reserv=a.forcado&&d.divs[s].includes(a.i);
  if(!reserv){ if(!compartilha(op)&&(d.divs[o].includes(a.i)||d.divs[s].includes(a.i))) return out;
   if(op.bravo&&E.abalo[s]>=6) return out; if(disp.bloq) return out;
   if(op.at&&!a.forcado){ d.divs[s].push(a.i); if(sondar(E,s,a,op,'ab',out)) return out; d.divs[s].pop() } }
  if(!reserv) d.divs[s].push(a.i);
  if(n.secreto){ /* a escolha de cada um fica escondida até os dois terem escolhido */
   d.seg=d.seg||{a:[],b:[]}; d.seg[s].push(a.i);
   ent(E,out,{t:'esc',s,quem:s,txt:T(op.t,ctx(E,s))});
   aplicarEf(E,op.ef,s,'ab',out);
   if(d.divs.a.length>=(n.cada||1)&&d.divs.b.length>=(n.cada||1)){
    ['a','b'].forEach(x=>{ d.seg[x].forEach(i=>{ const o2=(n.ops||[])[i]; if(!o2) return; ent(E,out,{t:'esc',s:outro(x),quem:x,txt:T(o2.t,ctx(E,x))}); if(o2.x) ent(E,out,{t:'txt',s:'ab',quem:x,txt:porAssento(E,'ab',y=>persp(E,o2.x,y,x))}) }) });
    d.seg={a:[],b:[]} }
   return out }
  ent(E,out,{t:'esc',s:'ab',quem:s,txt:T(op.t,ctx(E,s))}); resolverOp(E,s,op,'ab',out,id);
  return out }
 if(a.k==='ok'){ const st=estagioDuo(E); if(st!=='pronto') return out; d.ok[s]=true;
  if(d.ok.a&&d.ok.b){
   if(n.tipo==='fim'){ const prox=n.prox; manutencao(E,out); E.cap++; ['a','b'].forEach(x=>{ E.abalo[x]=Math.max(0,(E.abalo[x]||0)-2) });
    let dest=typeof prox==='function'?prox(ctx(E,'a')):prox; const HV=HISTORIAS[E.hist];
    if(HV&&HV.ambosVirados&&E.vir&&E.vir.a&&E.vir.b&&NOS[HV.ambosVirados]){ dest=HV.ambosVirados; E.cap=NOS[dest].cap||E.cap }
    ent(E,out,{t:'capitulo',s:'ab',cap:E.cap}); E.duo=null; ['a','b'].forEach(x=>{ E.pos[x]=null }); if(typeof dest==='object'){ ['a','b'].forEach(x=>entrar(E,x,dest[x],out)) } else { E.pos.a=E.pos.b=dest; abrirDuo(E,dest,out) } return out }
   if(n.tipo==='final'){ E.fase='fim'; ent(E,out,{t:'final',s:'ab'}); return out }
   ir(E,s,n.prox,out) }
  return out }
 return out }

/* ---------- utilidades para a interface ---------- */
function oQueFalta(E,s){ /* devolve o que este assento precisa fazer agora (para avisos) */
 if(E.fase!=='jogo') return null; if(E.pend&&E.pend[s]) return 'pend'; const id=E.pos[s]; const n=NOS[id]; if(!n) return null;
 if(n.quem!=='ab') return 'solo';
 if(!E.duo||E.duo.id!==id||E.pos.a!==E.pos.b) return 'esperando';
 const st=estagioDuo(E);
 if(st==='falando'){ const t=turnoDialogo(E); return t.quem===s?'falar':'ouvir' }
 if(st==='agindo') return E.duo.divs[s].length>=(n.cada||1)?'esperando':'agir';
 if(st==='votando') return E.vir&&E.vir[s]&&!E.vir[outro(s)]?'esperando':'votar';
 if(st==='puzzle') return 'puzzle';
 return E.duo.ok[s]?'esperando':'continuar' }
if(typeof module!=='undefined') module.exports={podeForcar,RECN,FER,INF,NOS,CAPS,PISTAS,INICIO,HISTORIAS,no,agir,novoEstado,ctx,opsSolo,opsDuo,opsFala,turnoDialogo,estagioDuo,oQueFalta,terceira,vistaDoPar,persp,nivelAbalo,nomeVinc,LACOS,outro,AT,ABALO,VINC,FAISCA,prepFicha,T};
