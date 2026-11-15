// Simula partidas inteiras com escolhas aleatórias nos dois assentos.
const fs=require('fs'),vm=require('vm'),path=require('path');
const raiz=path.join(__dirname,'..');
const arqs=['personagens.js','motor.js','hist/base.js',...(process.env.CAPS||'cap1').split(',').map(c=>'hist/'+c+'.js'),...(process.env.PUZ?['hist/puz.js']:[])];
const ctxv={console,Math,JSON,Object,Array,String,Number,Error};vm.createContext(ctxv);
for(const a of arqs) vm.runInContext(fs.readFileSync(path.join(raiz,a),'utf8').replace(/^const /gm,'var ').replace(/^let /gm,'var '),ctxv,{filename:a});
const M=ctxv; const N=+process.argv[2]||200; let fins={},maxv=0,erros=0,visit=new Set();
const pick=a=>a[Math.floor(Math.random()*a.length)];
for(let k=0;k<N;k++){
 const laco=pick(Object.keys(M.LACOS)); const E=M.novoEstado('fundadores',laco); const J=M.JOGAVEIS;
 const ia=Math.floor(Math.random()*J.length); let ib; do{ ib=Math.floor(Math.random()*J.length) }while(ib===ia);
 M.agir(E,'a',{k:'ficha',f:JSON.parse(JSON.stringify(J[ia]))}); M.agir(E,'b',{k:'ficha',f:JSON.parse(JSON.stringify(J[ib]))});
 M.agir(E,'a',{k:'prontoLobby',v:true}); M.agir(E,'b',{k:'prontoLobby',v:true}); M.agir(E,'a',{k:'comecar'});
 let passos=0, log=[];
 try{
 while(E.fase==='jogo'&&passos<3000){ passos++;
  const s=pick(['a','b']); const f=M.oQueFalta(E,s); const id=E.pos[s]; visit.add(id); let a=null;
  if(f==='solo'){ const n=M.NOS[id]; if(n.tipo==='segue') a={k:'ok',no:id}; else { const o=M.opsSolo(E,s).filter(x=>!x.bloq); if(!o.length) throw new Error('sem saída em '+id); a={k:'op',no:id,i:pick(o).i} } }
  else if(f==='falar'){ const t=M.turnoDialogo(E); const o=M.opsFala(E,t.F,s); if(!o.length) throw new Error('fala vazia '+id+' t'+t.i); a={k:'fala',no:id,t:t.i,i:pick(o).i} }
  else if(f==='agir'){ const o=M.opsDuo(E,s).filter(x=>{ const d=E.duo.divs; return M.compartilha(x.op)||!(d.a.includes(x.i)||d.b.includes(x.i)) }).filter(x=>!(x.op.bravo&&E.abalo[s]>=6)); if(!o.length) throw new Error('dividir sem opção '+id); a={k:'div',no:id,i:pick(o).i} }
  else if(f==='votar'){ const o=M.opsDuo(E,s); const ov=E.duo.votos[M.outro(s)]; a={k:'voto',no:id,i:(ov!==undefined&&Math.random()<.6)?ov:pick(o).i} }
  else if(f==='puzzle'){ const P=M.NOS[id].puz; const r=Math.random(); if(P.kind==='escolha') a={k:'puz',no:id,i:r<.5?P.certa:Math.floor(Math.random()*P.opcoes.length)}; else a={k:'puz',no:id,r:r<.5?P.resp[0]:'x'+Math.floor(Math.random()*99)} }
  else if(f==='continuar') a={k:'ok',no:id};
  if(a){ const out=M.agir(E,s,a); out.forEach(e=>{ if(e.t==='txt'||e.t==='cena'||e.t==='puzzle'){ const tx=typeof e.txt==='object'?e.txt.a+e.txt.b:e.txt; if(/undefined|\[object|NaN|\$\{/.test(tx)) throw new Error('texto ruim em '+id+': '+tx.slice(0,200)) } if(e.t==='fala'&&/undefined|\[object/.test(typeof e.txt==='object'?e.txt.a+e.txt.b:e.txt)) throw new Error('fala ruim '+id+' '+e.txt) }); log.push(...out) }
 }
 if(E.fase!=='fim') throw new Error('travou em '+JSON.stringify(E.pos)+' '+M.oQueFalta(E,'a')+'/'+M.oQueFalta(E,'b'));
 const fim=['final_aurora','final_gelo','final_entrega'].find(k=>E.flags[k])+' v'+(E.vinc>=7?'7+':E.vinc>=4?'4-6':'0-3')+' fa'+E.fa; fins[fim]=(fins[fim]||0)+1; maxv=Math.max(maxv,E.vinc);
 if(k===0&&process.env.SHOW){ console.log(JSON.stringify(log.slice(0,400),null,0).slice(0,3000)) }
 }catch(e){ erros++; if(erros<4) console.log('ERRO',e.message) }
}
const todos=Object.keys(M.NOS); const nao=todos.filter(x=>!visit.has(x));
console.log({partidas:N,erros,fins,maxVinc:maxv,naoVisitados:nao});
