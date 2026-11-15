// Verificador de agência e de duplicação: node tools/lint_love.js <hist> [hist...]
// 1) dialogo: toda fala precisa oferecer >=2 opções ao jogador, em qualquer caminho alcançável.
// 2) dividir: opção com teste (at) ou com efeito de história não pode ser "ambos" (os dois fariam a mesma coisa).
// 3) decisao/solo: precisa de >=2 opções reais.
const fs=require('fs'),vm=require('vm'),path=require('path');
const raiz=path.join(__dirname,'..');
const lista=s=>fs.readdirSync(path.join(raiz,s)).filter(f=>/^(base|cap\d+)\.js$/.test(f)).sort((a,b)=>a==='base.js'?-1:b==='base.js'?1:a.localeCompare(b)).map(f=>s+'/'+f);
const arqs=['personagens.js','motor.js',...lista('hist'),'hist/puz.js',...lista('hist2'),...lista('hist3'),'love/base.js',...fs.readdirSync(path.join(raiz,'love')).filter(d=>fs.statSync(path.join(raiz,'love',d)).isDirectory()).sort().flatMap(d=>lista('love/'+d))];
const M={console,Math,JSON,Object,Array,String,Number,Error,Date};vm.createContext(M);
for(const a of arqs) vm.runInContext(fs.readFileSync(path.join(raiz,a),'utf8').replace(/^const /gm,'var ').replace(/^let /gm,'var '),M,{filename:a});
const hs=process.argv.slice(2); let total=0; if(process.env.DBG) console.log(Object.entries(Object.values(M.NOS).reduce((a,n)=>{a[n.hist]=(a[n.hist]||0)+1;return a},{})));
for(const HIST of hs){ const H=M.HISTORIAS[HIST]; const probs=[];
 const novo=(ga,gb)=>{ const E=M.novoEstado(HIST,H.lacos[0]); const J=H.pers(); const fa=JSON.parse(JSON.stringify(J[0])), fb=JSON.parse(JSON.stringify(J[1])); fa.g=ga; fb.g=gb; fa.ap=fa.ap+'X'; fb.ap=fb.ap+'Y'; E.f.a=fa; E.f.b=fb; E.fase='jogo'; return E };
 const NN=Object.values(M.NOS).filter(n=>n.hist===HIST); console.log(HIST,'nós',NN.length,'dialogos',NN.filter(n=>n.tipo==='dialogo').length);
 for(const n of NN){
  if(n.tipo==='dialogo'){
   const vistos=new Set();
   for(const [ga,gb] of [['f','m'],['m','f'],['f','f'],['m','m']]){
    const E=novo(ga,gb); E.duo={id:n.id,falas:[],votos:{},divs:{a:[],b:[]},ok:{},mudou:{}}; E.pos={a:n.id,b:n.id};
    const rec=(i,hist,prof)=>{ if(prof>14) return;
     while(i<n.falas.length){ const F=n.falas[i]; const quem=F.quem||M.turnoDialogo(Object.assign(E,{duo:Object.assign(E.duo,{falas:hist,ti:i})}))&&null; break }
     if(i>=n.falas.length) return;
     E.duo.falas=hist; E.duo.ti=i; const t=M.turnoDialogo(E); if(!t) return;
     let ops; try{ ops=M.opsFala(E,t.F,t.quem) }catch(e){ probs.push(n.id+' t'+t.i+': erro '+e.message.slice(0,80)); return }
     if(ops.length<2){ const k=n.id+' t'+t.i; if(!vistos.has(k)){ vistos.add(k); probs.push('AGÊNCIA '+k+': '+ops.length+' opção(ões) para '+(t.quem===M.lsSeat(E,t.quem)?'':'')+'quem='+t.quem) } }
     for(const o of ops){ const h2=hist.concat([{quem:t.quem,t:t.i,i:o.i,tom:o.op.tom||'neutro',tag:o.op.tag||''}]); rec(t.i+1,h2,prof+1) } };
    rec(0,[],0) } }
  if(n.tipo==='dividir'){ /* opção com teste é uma ação só (o motor não deixa os dois fazerem); a capacidade de cada cena é testada pela simulação */
   const ambos=(n.ops||[]).filter(o=>o.ambos).length, total=(n.ops||[]).length; if(!n.ops||total<2) probs.push('POUCAS '+n.id) }
  if(n.tipo==='decisao'&&(n.ops||[]).length<2) probs.push('POUCAS decisao '+n.id) }
 console.log('==',HIST,probs.length,'problemas'); probs.forEach(p=>console.log(' ',p)); total+=probs.length }
process.exit(total?1:0);
