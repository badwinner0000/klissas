// Bot rápido: joga pela interface, escolhendo o assento que tem algo a fazer.
const {chromium}=require('playwright'); const fs=require('fs'), path=require('path');
const raiz=path.join(__dirname,'..'); const W=+process.argv[2]||390; const out=process.argv[3]||'/tmp/ckshots'; const PER=(process.argv[4]||'roz,wes').split(',');
fs.mkdirSync(out,{recursive:true});
fs.writeFileSync('/tmp/ck_teste_full.html','<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>'+fs.readFileSync(path.join(raiz,'teste.html'),'utf8').replace(/<link[^>]*>/g,'')+'</body></html>');
(async()=>{ const b=await chromium.launch(); const p=await b.newPage({viewport:{width:W,height:844}}); p.setDefaultTimeout(5000);
 const erros=[]; p.on('pageerror',e=>erros.push(e.message)); p.on('console',m=>{ if(m.type()==='error') erros.push(m.text()) });
 await p.goto('file:///tmp/ck_teste_full.html',{waitUntil:'domcontentloaded'}); await p.waitForTimeout(400);
 const foto=async n=>p.screenshot({path:`${out}/${n}.png`});
 const HIST=process.env.HIST||'fundadores'; await foto('00_hub'); await p.evaluate(h=>document.querySelector(`[data-a=obra][data-v=${h}]`).click(),HIST); await p.waitForTimeout(200); await foto('00b_obra'); await p.click(`[data-a=novoLocal][data-v=${HIST}]`); await foto('01_nova'); await p.click(`[data-a=laco][data-v=${process.env.LACO||(HIST==='fundadores2'?'ex':'estranhos')}]`); await p.click('[data-a=criarMesa]'); await p.waitForTimeout(300);
 for(const [seat,per] of [['a',PER[0]],['b',PER[1]]]){ await p.click(`[data-a=assento][data-v=${seat}]`); await p.click(`[data-a=escolherPer][data-v=${per}]`); await p.click('[data-a=salvarFicha]'); await p.waitForTimeout(100); await p.click('[data-a=pronto]'); await p.waitForTimeout(100) }
 await foto('02_lobby'); await p.click('[data-a=comecar]'); await p.waitForTimeout(300);
 const fotos={}; let passos=0, fimOk=false;
 while(passos<3000){ passos++;
  const vez=await p.evaluate(()=>{ const E=APP.E; if(E.fase==='fim') return 'fim'; const r=['a','b'].filter(s=>['solo','falar','agir','votar','continuar','puzzle','pend'].includes(oQueFalta(E,s))||(E.pend&&E.pend[outro(s)]&&E.pend[outro(s)].pedido)); return r });
  if(vez==='fim'){ fimOk=true; break } if(!vez.length){ console.log('ninguém pode agir', await p.evaluate(()=>JSON.stringify({pos:APP.E.pos,duo:APP.E.duo}))); break }
  if(passos%50===0){ const r=await p.evaluate(()=>{ const out={}; for(const s of ['a','b']){ try{ const E=JSON.parse(JSON.stringify(APP.E)); const f=oQueFalta(E,s); let a=null; if(f==='votar') a={k:'voto',no:E.pos[s],i:0}; if(a) agir(E,s,a); out[s]=f+' ok' }catch(e){ out[s]=e.stack.slice(0,400) } } return out }); console.log('DBG',JSON.stringify(r)) } const s=vez[Math.floor(Math.random()*vez.length)]; await p.click(`[data-a=assento][data-v=${s}]`); await p.waitForTimeout(40);
  if(await p.$('.st.anc')&&Math.random()<.3){ await p.evaluate(()=>document.querySelector('.st.anc').click()); await p.waitForTimeout(80); if(!fotos.anc){ fotos.anc=1; await foto('08_ancora') } }
  if(!fotos.acao&&await p.$('.cena.acao:last-of-type')){ fotos.acao=1; await p.evaluate(()=>{ const l=[...document.querySelectorAll('.cena.acao')].pop(); l&&l.scrollIntoView({block:'start'}) }); await p.waitForTimeout(100); await foto('09_acao') }
  if(await p.$('#pzIn')){ const r=await p.evaluate(()=>NOS[APP.E.pos[APP.seat]].puz.resp[0]); if(!fotos.puz){ fotos.puz=1; await p.evaluate(()=>document.querySelector('#pa').scrollIntoView({block:'end'})); await p.waitForTimeout(100); await foto('07_puzzle_'+s) } await p.fill('#pzIn',(Math.random()<.3?'zzz':r)); await p.press('#pzIn','Enter'); await p.waitForTimeout(80); continue }
  const bts=await p.$$('#pa button.op:not([disabled]), #pa button.bt-cont:not([disabled]), #pa .painel-ajuda button:not([disabled])'); if(await p.$('#pa [data-a=aceitar]')&&!fotos.pend){ fotos.pend=1; await p.evaluate(()=>document.querySelector('#pa').scrollIntoView({block:'end'})); await p.waitForTimeout(100); await foto('05_pend_'+s) } if(await p.$('#pa .painel-ajuda')&&!fotos.ajuda){ fotos.ajuda=1; await p.evaluate(()=>document.querySelector('#pa').scrollIntoView({block:'end'})); await p.waitForTimeout(100); await foto('05_ajuda_'+s) } if(!bts.length){ console.log('sem botão para',s,await p.$eval('#pa',e=>e.innerText)); break }
  const tit=(await p.$eval('#pa',e=>e.innerText)).slice(0,40); const tipo=tit.toUpperCase().includes('SUA VEZ DE FALAR')?'fala':tit.toUpperCase().includes('CADA UM FAZ')?'dividir':tit.toUpperCase().includes('DECISÃO')?'decisao':tit.toUpperCase().includes('FIM DO CAP')?'fimcap':null;
  if(tipo&&!fotos[tipo]){ fotos[tipo]=1; await p.evaluate(()=>document.querySelector('#pa').scrollIntoView({block:'end'})); await p.waitForTimeout(100); await foto('06_'+tipo+'_'+s) }
  if(process.env.V) console.log(passos,s,await p.evaluate(()=>APP.E.pos.a+'/'+APP.E.pos.b+' '+JSON.stringify(APP.E.duo&&{v:APP.E.duo.votos,d:APP.E.duo.divs,ok:APP.E.duo.ok})),tit.replace(/\n/g,' ').slice(0,30),bts.length); await bts[Math.floor(Math.random()*bts.length)].evaluate(el=>el.click()); await p.waitForTimeout(60) }
 console.log('passos',passos,'chegou ao fim:',fimOk,'erros:',erros.slice(0,5));
 for(const s of ['a','b']){ await p.click(`[data-a=assento][data-v=${s}]`); await p.waitForTimeout(150); fs.writeFileSync(`${out}/livro_${s}.txt`,await p.$eval('#ents',e=>e.innerText)) }
 await foto('07_fim'); await p.evaluate(()=>window.scrollTo(0,0)); await foto('08_topo');
 await p.click('[data-a=ficha]'); await p.waitForTimeout(150); await foto('09_ficha'); await p.click('[data-a=fechar]');
 await p.click('[data-a=sumario]'); await p.click('.sumario [data-a=historia]'); await p.waitForTimeout(200); await foto('10_historia');
 await b.close() })().catch(e=>{ console.log('X',e.message); process.exit(1) });
