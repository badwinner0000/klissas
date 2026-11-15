// Simula partidas de qualquer livro: node tools/sim2.js <hist> <N>
const fs=require('fs'),vm=require('vm'),path=require('path');
const raiz=path.join(__dirname,'..');
const lista=s=>fs.readdirSync(path.join(raiz,s)).filter(f=>/^(base|cap\d+)\.js$/.test(f)).sort((a,b)=>a==='base.js'?-1:b==='base.js'?1:a.localeCompare(b)).map(f=>s+'/'+f);
const arqs=['personagens.js','motor.js',...lista('hist'),'hist/puz.js',...lista('hist2'),...lista('hist3'),'love/base.js',...fs.readdirSync(path.join(raiz,'love')).filter(d=>fs.statSync(path.join(raiz,'love',d)).isDirectory()).sort().flatMap(d=>lista('love/'+d))];
const M={console,Math,JSON,Object,Array,String,Number,Error,Date};vm.createContext(M);
for(const a of arqs) vm.runInContext(fs.readFileSync(path.join(raiz,a),'utf8').replace(/^const /gm,'var ').replace(/^let /gm,'var '),M,{filename:a});
const HIST=process.argv[2]||'fundadores2', N=+process.argv[3]||200, H=M.HISTORIAS[HIST];
let NOMEFIXO=null; if(H.generoLivre){ const ns=H.pers().flatMap(j=>[j.ap,j.nome.split(' ')[0]]); NOMEFIXO=new RegExp('\\b('+ns.join('|')+')\\b(?![XY])') }
const pick=a=>a[Math.floor(Math.random()*a.length)];
const ruim=/undefined|\[object|NaN|\$\{|\*\*|\bnull\b|function|=>/;
let vir=0,mord=0,fins={},erros=0,visit=new Set(),maxv=0,dados=0,anc=0,ab6=0;
const strs=o=>typeof o==='string'?[o]:o&&typeof o==='object'?Object.values(o).flatMap(strs):typeof o==='function'?['function']:[];
const checa=(id,o)=>{ const t=strs(o).join(' | '); if(NOMEFIXO){ const m=t.match(NOMEFIXO); if(m) throw new Error('nome fixo em '+id+': ...'+t.slice(Math.max(0,m.index-100),m.index+40)) } if(ruim.test(t)){ const m=t.match(ruim); throw new Error("texto ruim em "+id+": ..."+t.slice(Math.max(0,m.index-120),m.index+60)) } };
for(let k=0;k<N;k++){
 const laco=pick(H.lacos); const E=M.novoEstado(HIST,laco); const J=H.pers();
 const ia=Math.floor(Math.random()*J.length); let ib; do{ ib=Math.floor(Math.random()*J.length) }while(ib===ia);
 const fa=JSON.parse(JSON.stringify(J[ia])), fb=JSON.parse(JSON.stringify(J[ib])); if(H.generoLivre){ fa.g=Math.random()<.5?'f':'m'; fb.g=Math.random()<.5?'f':'m'; fa.ap=fa.ap+'X'; fb.ap=fb.ap+'Y'; fa.nome=fa.ap+' Tal'; fb.nome=fb.ap+' Tal' } M.agir(E,'a',{k:'ficha',f:fa}); M.agir(E,'b',{k:'ficha',f:fb});
 M.agir(E,'a',{k:'prontoLobby',v:true}); M.agir(E,'b',{k:'prontoLobby',v:true}); M.agir(E,'a',{k:'comecar'});
 let passos=0;
 try{
 while(E.fase==='jogo'&&passos<4000){ passos++;
  const s=pick(['a','b']); const f=M.oQueFalta(E,s); const id=E.pos[s]; visit.add(id); let a=null;
  if(Math.random()<.05&&E.abalo[s]>0){ const o=M.agir(E,s,{k:'ancora'}); if(o.length) anc++; o.forEach(e=>checa(id,e)) }
  const po=E.pend&&E.pend[M.outro(s)]; if(po&&po.pedido&&Math.random()<.5){ const out=M.agir(E,s,{k:Math.random()<.6?'ajudar':'recusarAjuda'}); out.forEach(e=>checa(id,e)); if(out.length) globalThis.AJ=(globalThis.AJ||0)+1; continue }
  if(f==='pend'){ const p=E.pend[s]; const r=Math.random(); const k=p.pedido||p.semAjuda?(r<.5&&M.podeForcar(E,s)?'forcar':'aceitar'):(r<.35?'pedirAjuda':r<.65&&M.podeForcar(E,s)?'forcar':'aceitar'); const out=M.agir(E,s,{k}); out.forEach(e=>checa(id,e)); globalThis.PD=(globalThis.PD||{}); PD[k]=(PD[k]||0)+1; continue }
  if(f==='solo'){ const n=M.NOS[id]; if(n.tipo==='segue') a={k:'ok',no:id}; else { const o=M.opsSolo(E,s).filter(x=>!x.bloq); if(!o.length) throw new Error('sem saída em '+id); o.forEach(x=>checa(id+' op',M.T(x.op.t,M.ctx(E,s)))); a={k:'op',no:id,i:pick(o).i} } }
  else if(f==='falar'){ const t=M.turnoDialogo(E); const o=M.opsFala(E,t.F,s); if(!o.length) throw new Error('fala vazia '+id+' t'+t.i); checa(id+' p',M.T(t.F.p,M.ctx(E,s))); o.forEach(x=>checa(id+' fala',M.T(x.op.t,M.ctx(E,s,s)))); a={k:'fala',no:id,t:t.i,i:pick(o).i} }
  else if(f==='agir'){ const o=M.opsDuo(E,s).filter(x=>!x.bloq).filter(x=>{ const d=E.duo.divs; return M.compartilha(x.op)||!(d.a.includes(x.i)||d.b.includes(x.i)) }).filter(x=>!(x.op.bravo&&E.abalo[s]>=6)); if(!o.length) throw new Error('dividir sem opção '+id+' '+s+' '+E.f[s].id+' vir='+JSON.stringify(E.vir)+' divs='+JSON.stringify(E.duo.divs)+' ab='+E.abalo[s]+' fer='+JSON.stringify(E.fer)+' n='+M.opsDuo(E,s).map(x=>x.i+(x.bloq?'B':'')).join(',')); o.forEach(x=>checa(id+' op',M.T(x.op.t,M.ctx(E,s)))); a={k:'div',no:id,i:pick(o).i} }
  else if(f==='votar'){ const o=M.opsDuo(E,s).filter(x=>!x.bloq); if(!o.length) throw new Error('decisão sem opção '+id); o.forEach(x=>checa(id+' op',M.T(x.op.t,M.ctx(E,s)))); const ov=E.duo.votos[M.outro(s)]; const okv=o.some(x=>x.i===ov); a={k:'voto',no:id,i:(okv&&Math.random()<.6)?ov:pick(o).i} }
  else if(f==='puzzle'){ const P=M.NOS[id].puz; const r=Math.random(); if(P.kind==='escolha') a={k:'puz',no:id,i:r<.5?P.certa:Math.floor(Math.random()*P.opcoes.length)}; else a={k:'puz',no:id,r:r<.5?P.resp[0]:'x'+Math.floor(Math.random()*99)} }
  else if(f==='continuar') a={k:'ok',no:id};
  if(a){ const out=M.agir(E,s,a); out.forEach(e=>{ checa(id,e); if(e.t==='dado') dados++ }); }
  if(E.abalo.a>=6||E.abalo.b>=6) ab6++; if(E.vir&&(E.vir.a||E.vir.b)) vir++; if(E.inf&&(E.inf.a||E.inf.b)) mord++;
 }
 if(E.fase!=='fim') throw new Error('travou em '+JSON.stringify(E.pos)+' '+M.oQueFalta(E,'a')+'/'+M.oQueFalta(E,'b'));
 const fim=(E.vir&&(E.vir.a||E.vir.b)?'VIRADO ':'')+(Object.keys(E.flags).filter(k=>k.startsWith('final_')).join('+')||'?')+' v'+(E.vinc>=7?'7+':E.vinc>=4?'4-6':'0-3')+' fa'+E.fa; fins[fim]=(fins[fim]||0)+1; maxv=Math.max(maxv,E.vinc);
 }catch(e){ erros++; if(erros<5) console.log('ERRO',e.message.slice(0,500)) }
}
const nos=Object.values(M.NOS).filter(n=>n.hist===HIST).map(n=>n.id);
console.log({partidas:N,erros,passosVirado:vir,passosMordido:mord,fins,maxv,dadosPorPartida:+(dados/N).toFixed(1),ancoras:anc,naoVisitados:nos.filter(i=>!visit.has(i))});
