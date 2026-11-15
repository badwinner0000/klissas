// Joga a versão de teste no navegador, os dois assentos no mesmo aparelho, e tira fotos.
const {chromium}=require('playwright'); const fs=require('fs'), path=require('path');
const raiz=path.join(__dirname,'..'); const W=+process.argv[2]||390; const out=process.argv[3]||'/tmp/ckshots';
fs.mkdirSync(out,{recursive:true});
const html='<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>'+fs.readFileSync(path.join(raiz,'teste.html'),'utf8').replace(/<link[^>]*>/g,'')+'</body></html>';
fs.writeFileSync('/tmp/ck_teste_full.html',html);
(async()=>{ const b=await chromium.launch(); const p=await b.newPage({viewport:{width:W,height:844}}); p.setDefaultTimeout(4000);
 const erros=[]; p.on('pageerror',e=>erros.push(e.message)); p.on('console',m=>{ if(m.type()==='error') erros.push(m.text()) });
 await p.goto('file:///tmp/ck_teste_full.html',{waitUntil:'domcontentloaded'}); console.log('carregou'); await p.waitForTimeout(800);
 const foto=async n=>{ await p.screenshot({path:`${out}/${n}.png`,fullPage:false}) };
 await foto('01_hub'); await p.screenshot({path:`${out}/01_hub_full.png`,fullPage:true});
 await p.click('[data-a=novoLocal]'); await p.click('[data-a=laco][data-v=estranhos]'); await foto('02_nova'); await p.click('[data-a=criarMesa]'); await p.waitForTimeout(400);
 await foto('03_lobby');
 for(const [seat,per] of [['a','roz'],['b','wes']]){ await p.click(`[data-a=assento][data-v=${seat}]`); await p.click(`[data-a=escolherPer][data-v=${per}]`); await p.waitForTimeout(200);
  if(seat==='a') await p.screenshot({path:`${out}/04_ficha.png`,fullPage:false});
  await p.click('[data-a=salvarFicha]'); await p.waitForTimeout(200); await p.click('[data-a=pronto]'); await p.waitForTimeout(200) }
 await p.click('[data-a=comecar]'); await p.waitForTimeout(500); await foto('05_inicio');
 const fotos={}; let passos=0;
 while(passos<400){ passos++;
  const fim=await p.$('[data-a=historia]'); if(fim&&await p.$('.fim-cap h3')&&(await p.textContent('.fim-cap h3')).includes('Fim da história')) break;
  // escolhe o assento que tem algo a fazer
  for(const s of (Math.random()<.5?['a','b']:['b','a'])){ await p.click(`[data-a=assento][data-v=${s}]`); await p.waitForTimeout(60);
   const bts=await p.$$('#pa button.op:not([disabled]), #pa button.bt-cont:not([disabled])'); if(!bts.length) continue;
   const tit=(await p.$eval('#pa',e=>e.innerText)).slice(0,60);
   const tipo=tit.includes('Sua vez de falar')?'fala':tit.includes('Cada um faz')?'dividir':tit.includes('Decisão')?'decisao':tit.includes('FIM DO CAP')?'fimcap':null;
   if(tipo&&!fotos[tipo]){ fotos[tipo]=1; await p.evaluate(()=>document.querySelector('#pa').scrollIntoView({block:'end'})); await p.waitForTimeout(150); await foto('06_'+tipo+'_'+s) }
   const op=bts[Math.floor(Math.random()*bts.length)]; await op.click({force:true}); if(process.env.V) console.log(passos,s,tit.replace(/\n/g,' ')); await p.waitForTimeout(120); break }
 }
 await p.waitForTimeout(400); await foto('07_fim');
 await p.evaluate(()=>window.scrollTo(0,0)); await p.screenshot({path:`${out}/08_livro_topo.png`});
 await p.click('[data-a=assento][data-v=a]'); await p.waitForTimeout(200);
 const txt=await p.$eval('#ents',e=>e.innerText); fs.writeFileSync(`${out}/livro_a.txt`,txt);
 await p.click('[data-a=assento][data-v=b]'); await p.waitForTimeout(200); fs.writeFileSync(`${out}/livro_b.txt`,await p.$eval('#ents',e=>e.innerText));
 await p.click('[data-a=ficha]'); await p.waitForTimeout(200); await foto('09_ficha'); await p.click('[data-a=fechar]');
 await p.click('[data-a=sumario]'); await p.click('.sumario [data-a=historia]'); await p.waitForTimeout(300); await foto('10_historia');
 console.log('passos',passos,'erros',erros.slice(0,5));
 await b.close() })();
