# Capas ilustradas

**Estilo atual (referência: colagem de capas de comédia romântica):** ilustração gráfica de cores chapadas, paleta viva e saturada, formas simples e grão de papel. Composição de **cenário estilizado** (não retrato realista, não casal em close): as pessoas, quando aparecem, são figuras minúsculas dentro da cena. O **título em letras grandes e brincalhonas é o elemento dominante**, integrado à arte como num cartaz retrô.

**Os personagens e o lugar da capa têm que bater com o livro** (cenário, estação do ano, figurino, objetos).

Geradas com o modelo gratuito `recraft/recraft-v4.1-flash-v2:free` da OpenRouter (`POST https://openrouter.ai/api/v1/images`, `896x1280`, proporção 7:10). A chave nunca vai para o repositório. O plano gratuito permite 50 imagens por dia (renova à meia-noite UTC); gere uma por vez, em série (em paralelo dá erro 429).

**Regra do texto:** o gerador inventa texto (autor, slogans, "Livro 1", legendas de cidade) e às vezes duplica ou perde palavras do título. O prompt exige que o ÚNICO texto seja o título, escrito uma só vez, **sem linha pequena acima ou abaixo** (pedir "linha de topo" faz o modelo errar o número do livro). **Cada capa é conferida a olho**: gere 2 variantes e escolha a que tem o título correto e nenhum texto extra.

Salve em `verso/public/capas/<slug>.jpg` (JPG, qualidade ~86); o site usa sozinho. Sem imagem, o site mostra um degradê com o título.

## Prompt-base (cole antes da cena)
```
Contemporary women's fiction / romantic comedy book cover in the style of a trendy illustrated bestseller cover: a bold, graphic, flat-color illustration with a vivid saturated palette, simple shapes, subtle paper grain, a stylized scenic composition (NOT a realistic portrait, NOT a close-up couple; people, if any, are tiny stylized figures within the scene), and large, playful, expressive display typography as the dominant design element, with the title lettering integrated into the artwork like a retro poster. Polished professional publishing quality. Vertical 7:10.
STRICT TEXT RULES: the ONLY text on the cover is the title exactly as written, complete and spelled once only (no repeated or duplicated words, no extra small line above or below), with correct Portuguese accents. No author name, no publisher, no tagline, no quotes, no signs, no extra words anywhere, no text on any prop.
```

## Cenas por livro
- **padrinhos** · Padrinho e Madrinha: casamento numa ilha ventosa, azul-cobalto e rosa; tenda listrada, hortênsias, farol branco, folhas do caderno da cerimonialista voando; duas figuras minúsculas (mulher de vestido azul-marinho, homem de smoking bordô).
- **pisca-pisca** · Pisca-Pisca: rua de brownstones no Brooklyn à noite, vermelho-cereja e dourado, fachadas cobertas de pisca-pisca, árvore de luzes com estrela ao fundo, neve, duas figuras de gorro e cachecol em escadarias opostas.
- **ultima-promocao** · A Última Promoção: colagem azul-petróleo e dourado com a torre de Chicago de um lado, as cúpulas de Viena do outro, avião, taça de champanhe, cama de hotel e duas figuras de terno costas com costas.
- **refrao-de-verao** · Refrão de Verão: pôr do sol coral, telhado de cabana sob pinheiros, violão encostado na chaminé, notas musicais como vaga-lumes, um riacho e duas figuras numa manta.
- **sob-o-sol-da-toscana** · Sob o Sol da Toscana: hora dourada nas colinas perto de Siena, ciprestes, torre de tijolo e telhados de terracota, sol enorme, girassóis e vinhedo, uma lambreta e duas figuras num piquenique.
- **a-reclamacao-de-barulho** · corte de um prédio colorido, vermelho-tomate e amarelo: caixa de som e fones de um lado, vizinho cansado com vassoura no teto do andar de baixo.
- **o-teste-de-visto** · cozinha amarelo-mostarda: canecas, papéis, caderneta sem texto, prancheta, planta e duas figuras de mãos dadas no sofá.
- **a-aposta-do-escritorio** · escritório laranja visto de cima: mesas, plantas, balões, copos e duas figuras de mãos dadas debaixo da mesa.
- **o-casamento-do-ex** · jardim lilás com arco de flores brancas e rosa, corredor, bolo e duas figuras espiando atrás do arco.
- **a-viagem-de-onibus** · estrada à noite em azul-petróleo: ônibus retrô sob estrelas e lua, colinas, passageiros minúsculos.

Os títulos vão sempre entre aspas no prompt, em tipografia grande e brincalhona (ex.: `Title: "Pisca-Pisca" in big bouncy hand-lettered display type, cream with golden glow`).

## Referências de aparência
Quando o livro mostrar os protagonistas na capa, descreva só os traços (pele, cabelo, barba, roupa) no prompt, sem nomes de pessoas reais.
