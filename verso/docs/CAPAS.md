# Capas ilustradas

**Estilo atual (referência: capas da Ali Hazelwood):** ilustração semi-realista de um casal grande e próximo (quase beijo / abraço), rostos expressivos, fundo de uma cor viva com poucos adereços, título misturando letra grossa sem serifa com letra manuscrita a pincel.

**Os personagens da capa têm que bater com o livro.** Antes de gerar, escreva no prompt a aparência exata de cada protagonista conforme a história (etnia, tom de pele, cabelo, idade, roupa, objeto que carregam). Exemplo: Sam Okoro (Padrinho e Madrinha) é de origem nigeriana, então é um homem negro de pele escura; Ivy Castellano é ítalo-americana. Capas de livros ainda não escritos (as "em breve") são provisórias: refaça quando os personagens forem definidos.

Geradas com o modelo gratuito `recraft/recraft-v4.1-flash-v2:free` da OpenRouter (`POST /api/v1/images`, `896x1280`, proporção 7:10). A chave nunca é guardada no repositório.

**Regra do texto:** o gerador inventa texto (autor, slogans, placas) e às vezes perde palavras do título. Todo prompt exige que o ÚNICO texto seja o título completo, e **cada capa é conferida a olho**. Gere 2 variantes e escolha.

Salve em `verso/public/capas/<slug>.jpg`; o site usa sozinho.

## Prompt-base (cole antes da cena)
```
Contemporary romance novel cover illustration in the style of current bestselling rom-com paperbacks: a semi-realistic digital illustration of a couple in a close, intimate embrace, large in the frame (about two thirds of the cover), expressive detailed faces with warm natural skin tones and soft shading over clean line art, hair and clothing with texture and folds. Behind them a saturated solid color background with a few simple props. The title lettering mixes a bold clean sans-serif with a hand-lettered brush script. Polished professional publishing quality. Vertical 7:10.
STRICT TEXT RULES: the ONLY text on the cover is the title exactly as written, complete, with correct Portuguese accents (and the small top line when given). No author name, no publisher, no tagline, no quotes, no signs, no extra words anywhere.
```

## padrinhos.jpg · Padrinho e Madrinha (Love Story Nº 5)
```
Background: deep cobalt blue with a few pale blue hydrangea blooms and a tiny white lighthouse far behind. Small top line in cream: "LOVE STORY · Nº 5". Title: "Padrinho" in bold cream sans-serif and "& Madrinha" in peach brush script. Characters (be precise): a Black man in his early thirties of Nigerian descent, warm medium-brown skin, short curly black hair in a tapered cut with a little volume on top, a neatly groomed short beard with a mustache, strong defined eyebrows, full lips, a small stud earring, calm confident half-smile, deep burgundy tuxedo jacket with black satin lapels, white shirt and black bow tie; and a woman in her early thirties of Italian-American descent, light warm olive skin, long wavy dark brown hair nearly black with subtle caramel highlights (NOT red), side part, dark brown eyes, strong straight dark eyebrows, soft warm smile, black satin dress with deep V neckline and a small crystal brooch on one shoulder. They stand very close, foreheads almost touching, on the verge of a kiss, both a little flustered.
```

## a-reclamacao-de-barulho.jpg · A Reclamação de Barulho
```
Background: bright tomato red with small white musical notes. Title: "A Reclamação" in bold cream sans-serif and "de Barulho" in white brush script. Characters: a Brazilian woman with brown skin and long curly dark hair in a high ponytail, in a bright yellow workout top with headphones around her neck; and a tired man with warm light-brown skin, dark messy hair, stubble and a rumpled gray t-shirt, one earplug in. They lean toward each other, arguing with their faces very close, hands on her shoulders.
```

## o-teste-de-visto.jpg · O Teste de Visto
```
Background: sunny mustard yellow with a few small kitchen props. Title: "O Teste" in bold navy sans-serif and "de Visto" in deep blue brush script. Characters: a young woman of South Asian descent with light brown skin, long black hair and a green cardigan; and a man with fair skin and curly auburn hair in a flannel shirt. They sit pressed together pretending to be a couple, hands clasped, looking at each other with nervous half-smiles.
```

## a-aposta-do-escritorio.jpg · A Aposta do Escritório
```
Background: bold orange with small office plant and balloon props. Title: "A Aposta" in bold cream sans-serif and "do Escritório" in white brush script. Characters: a Black woman with short natural curls, in a white blouse; and a man with light skin and dark hair in a blue shirt with rolled sleeves. They hold hands under a desk and look at each other with conspiratorial smiles, faces close.
```

## o-casamento-do-ex.jpg · O Casamento do Ex
```
Background: soft lilac violet with white wedding flowers. Title: "O Casamento" in bold deep-plum sans-serif and "do Ex" in pink brush script. Characters: a woman with medium-brown skin and wavy dark hair in an emerald green bridesmaid dress; and a man with olive skin, dark hair and a rumpled white suit jacket. They embrace behind a floral arch, her hand on his lapel, about to kiss, glancing guiltily aside.
```

## a-viagem-de-onibus.jpg · A Viagem de Ônibus
```
Background: vivid teal with a few stars. Title: "A Viagem" in bold cream sans-serif and "de Ônibus" in coral brush script. Characters: a backpacker woman with light brown skin, freckles and a messy braid, travel scarf; and a man in a loosened tie and white shirt with dark skin and short hair. They are squeezed together in a bus seat, shoulders touching, looking at each other with reluctant smiles.
```


## Referências de aparência
O usuário passa fotos de referência para a aparência dos protagonistas; descrevemos só os traços (pele, cabelo, barba, roupa) no prompt, sem nomes de pessoas reais.
