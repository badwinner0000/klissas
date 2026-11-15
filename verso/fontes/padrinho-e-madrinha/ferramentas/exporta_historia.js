// Joga um livro inteiro com política fixa nas escolhas de consentimento e grava o texto lido por um dos assentos.
// node tools/trilha.js <hist> <sim|nao|meio|meio2> <saida.txt> [seed]   (meio: A diz sim e B diz não; meio2: o contrário)
const fs=require('fs'),vm=require('vm'),path=require('path');
const raiz=path.join(__dirname,'..');
const lista=s=>fs.readdirSync(path.join(raiz,s)).filter(f=>/^(base|cap\d+)\.js$/.test(f)).sort((a,b)=>a==='base.js'?-1:b==='base.js'?1:a.localeCompare(b)).map(f=>s+'/'+f);
const arqs=['personagens.js','motor.js',...lista('hist'),'hist/puz.js',...lista('hist2'),...lista('hist3'),'love/base.js',...fs.readdirSync(path.join(raiz,'love')).filter(d=>fs.statSync(path.join(raiz,'love',d)).isDirectory()).sort().flatMap(d=>lista('love/'+d))];
const M={console,Math,JSON,Object,Array,String,Number,Error,Date};vm.createContext(M);
for(const a of arqs) vm.runInContext(fs.readFileSync(path.join(raiz,a),'utf8').replace(/^const /gm,'var ').replace(/^let /gm,'var '),M,{filename:a});
const [HIST,MODO,SAIDA,SEED]=[process.argv[2],process.argv[3],process.argv[4],+process.argv[5]||7];
let st=SEED; const rnd=()=>{ st|=0; st=st+0x6D2B79F5|0; let t=Math.imul(st^st>>>15,1|st); t=t+Math.imul(t^t>>>7,61|t)^t; return((t^t>>>14)>>>0)/4294967296 };
const pick=a=>a[Math.floor(rnd()*a.length)];
const H=M.HISTORIAS[HIST]; const E=M.novoEstado(HIST,H.lacos[0]); const J=H.pers();
const fa=JSON.parse(JSON.stringify(J[0])), fb=JSON.parse(JSON.stringify(J[1])); fa.g='f'; fb.g='m'; fa.ap=fa.ap; fb.ap=fb.ap; E.f.a=fa; E.f.b=fb;
M.agir(E,'a',{k:'prontoLobby',v:true}); M.agir(E,'b',{k:'prontoLobby',v:true});
const LOG=[]; const col=o=>o.forEach(e=>LOG.push(e)); col(M.agir(E,'a',{k:'comecar'}));
const ehSim=op=>{ try{ const r=typeof op.ef==='function'?op.ef({s:'a'}):op.ef; return [].concat((r&&r.flag)||[]).some(k=>/^(noite|beijo)\d*_a$/.test(k)) }catch(e){ return false } };
const diz=s=>MODO==='sim'?true:MODO==='nao'?false:MODO==='meio'?s==='a':s==='b';
let passos=0;
while(E.fase==='jogo'&&passos<5000){ passos++; const s=pick(['a','b']); const f=M.oQueFalta(E,s); const id=E.pos[s]; let a=null;
 const po=E.pend&&E.pend[M.outro(s)]; if(po&&po.pedido){ col(M.agir(E,s,{k:'recusarAjuda'})); continue }
 if(f==='pend'){ col(M.agir(E,s,{k:'aceitar'})); continue }
 if(f==='solo'){ const n=M.NOS[id]; if(n.tipo==='segue') a={k:'ok',no:id}; else { const o=M.opsSolo(E,s).filter(x=>!x.bloq); a={k:'op',no:id,i:pick(o).i} } }
 else if(f==='falar'){ const t=M.turnoDialogo(E); const o=M.opsFala(E,t.F,s); a={k:'fala',no:id,t:t.i,i:pick(o).i} }
 else if(f==='agir'){ const n=M.NOS[id]; let o=M.opsDuo(E,s).filter(x=>!x.bloq).filter(x=>{ const d=E.duo.divs; return M.compartilha(x.op)||!(d.a.includes(x.i)||d.b.includes(x.i)) });
  if(o.some(x=>ehSim(x.op))){ const q=diz(s); const o2=o.filter(x=>ehSim(x.op)===q); if(o2.length) o=o2 } a={k:'div',no:id,i:pick(o).i} }
 else if(f==='votar'){ const o=M.opsDuo(E,s).filter(x=>!x.bloq); const ov=E.duo.votos[M.outro(s)]; const okv=o.some(x=>x.i===ov); a={k:'voto',no:id,i:okv?ov:o[0].i} }
 else if(f==='puzzle'){ const P=M.NOS[id].puz; a=P.kind==='escolha'?{k:'puz',no:id,i:P.certa}:{k:'puz',no:id,r:P.resp[0]} }
 else if(f==='continuar') a={k:'ok',no:id};
 if(a) col(M.agir(E,s,a)) }
if(E.fase!=='fim'){ console.log('TRAVOU',JSON.stringify(E.pos)); }
const Rs=(x,sd)=>x&&typeof x==='object'?(x[sd]!==undefined?x[sd]:x.a):x; const linhas=[]; const NM={a:'Ivy',b:'Sam'};
for(const e0 of LOG){ const sd=e0.s==='b'?'b':'a'; const e=Object.assign({},e0,{txt:Rs(e0.txt,sd),lugar:Rs(e0.lugar,sd),hora:Rs(e0.hora,sd)});
 if(e.t==='cena') linhas.push('\n@@CENA|'+e.id+'|'+e0.s+'|'+(e.lugar||'')+' · '+(e.hora||'')+'\n'+(e.txt||''));
 else if(e.t==='capitulo') linhas.push('\n@@CAP|'+e.cap);
 else if(e.t==='fala') linhas.push('@@FALA|'+(NM[e.quem]||e.quem)+'|'+(e.acao?'a':'f')+'|'+e.txt);
 else if(e.t==='esc') linhas.push('@@ESC|'+(NM[e.quem]||e.quem)+'|'+e.txt);
 else if(e.txt) linhas.push('@@'+(e.t==='txt'?'TXT':e.t.toUpperCase())+'|'+(e0.quem||e0.s)+'|'+e0.s+'|'+e.txt); }
fs.writeFileSync(SAIDA,linhas.join('\n')); console.log('ok',passos,E.fase);
