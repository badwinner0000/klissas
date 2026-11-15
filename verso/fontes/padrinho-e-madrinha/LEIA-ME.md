# Padrinho e Madrinha · material para o Verso

- `padrinho-e-madrinha-historia-completa.md`: texto lido de ponta a ponta (caminho em que os dois aceitam), para leitura humana e conferência da migração.
- `codigo-historia/`: o livro inteiro como código (cap1.js a cap21.js + base.js). Cada `no('id',{...})` é um nó: tipos segue, solo, dialogo, dividir, decisao, puzzle, fim, final. Textos são funções `c=>` que usam helpers de nome e gênero (pda, pdb, pdgA, pdgB...). Nós definidos depois sobrescrevem os de mesmo id: capítulos 11 a 21 substituem versões antigas dos capítulos 1 a 10. Na migração, resolva isso gerando um único nó final por id.
- `motor-referencia/`: motor.js, personagens.js e love/base.js, para entender regras de dados, nervosismo, flags e votos secretos.
- `ferramentas/`: lint, simulação, trilha e exportação que já validam o livro (referência para recriar os testes do Verso).

Estado: lint 0 problemas, 300 partidas simuladas sem erro, 4 políticas de consentimento chegam ao fim, ~26,6 mil palavras. Meta original era 30 mil.
