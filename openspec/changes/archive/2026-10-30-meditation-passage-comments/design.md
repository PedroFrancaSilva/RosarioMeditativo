# Design

## Context

Ver `proposal.md`. Hoje `commentaries` aponta só para `mysteries`; `MeditationBlock` mostra uma passagem e um comentário, com ciclo independente, e corta o texto por `numberOfLines` sem o gesto de `PrayerTextBlock`. A home lista apenas o terço do dia (`Home shows the day's third`). A change `meditation-content` já carregou o catálogo remoto com precedência sobre o embutido; esta change não reabre essa precedência.

## Goals / Non-Goals

**Goals:**

- Na oração, uma passagem sorteada e um comentário dela, sem controles de troca.
- Expansão no mesmo gesto das orações, com limiar fixo.
- Carregamento visível da passagem e da imagem, sem tapar a oração.
- Flag explícita de mistério curado, lida na lista de mistérios e mostrada num checklist fora da lista do dia.
- Seed da Anunciação igual ao pacote do spec, no remoto e no fallback embutido.

**Non-Goals:**

- Ver proposal, Fora do escopo. Em especial: não popular os outros mistérios e não alterar rotação, crédito ou “Quero me aprofundar”.

## Decisions

### 1. `passage_id` no comentário

**Escolha:** migration adiciona `commentaries.passage_id uuid not null references passages(id) on delete cascade`. `mystery_id` permanece, para a leitura anônima atual e para o comentário não ficar órfão de mistério. O repositório só entrega comentários cujo `passage_id` coincide com uma passagem carregada.

**Alternativa:** inferir o vínculo pela ordem — rejeitada; o spec exige identificador da passagem e proíbe comentário órfão na meditação.

### 2. Flag de cobertura

**Escolha:** `mysteries.meditation_ready boolean not null default false`. Entra no mesmo select de mistérios que a home já faz. `true` só no primeiro gozoso, depois do seed. Não derivar de “tem passagem”: os vinte mistérios já têm trechos.

**Alternativa:** tabela à parte — rejeitada; é um estado do mistério, e a leitura anônima de `mysteries` já existe.

### 3. Lista de oração da Anunciação

**Escolha:** no remoto, apagar as passagens `Lc 1, 26-38` e `Is 7, 14` desse mistério e os dois comentários de amostra; inserir a passagem `Lc 1, 26-27` e os nove comentários. O JSON `passages-matos-soares.json` continua a ser o corpus dos outros mistérios e não é reescrito. No fallback embutido, `joyful-1` deixa de usar as duas linhas desse JSON e passa a usar o mesmo pacote curado.

Texto da passagem (Matos Soares, só os vv. 26-27, já no início do trecho longo do JSON):

> Estando Isabel no sexto mês, foi enviado por Deus o anjo Gabriel a uma cidade da Galileia, chamada Nazaré, a uma virgem desposada com um varão, chamado José, da casa de David; o nome da virgem era Maria.

Referência gravada: `Lc 1, 26-27`.

**Alternativa:** esconder as passagens antigas com uma coluna `in_prayer` — rejeitada para este único caso; apagar da lista de oração é o que o spec pede, e os outros mistérios não precisam da coluna.

### 4. Textos e fontes do seed

Autor único para os dois textos de Tomás: `São Tomás de Aquino`. A fonte distingue os artigos. Não completar reticências.

| Ordem | Autor | Fonte | Texto |
| --- | --- | --- | --- |
| 0 | São Tomás de Aquino | Suma Teológica, III, q. 30, a. 1 | Era conveniente que fosse anunciado à bem-aventurada Virgem que ela havia de conceber Cristo. Primeiro, para que se guardasse a devida ordem na união do Filho de Deus com a Virgem, a saber, que primeiro sua mente fosse instruída acerca d’Ele, antes de O conceber na carne. Segundo, para que pudesse ser testemunha mais certa deste mistério… Terceiro, para que oferecesse a Deus os dons voluntários de sua obediência, para o que se mostrou pronta, dizendo: Eis a serva do Senhor. Em quarto lugar, para mostrar que existe um certo matrimônio espiritual entre o Filho de Deus e a natureza humana. E por isso, na Anunciação, era solicitado o consentimento da Virgem em lugar de toda a natureza humana. |
| 1 | São Tomás de Aquino | Suma Teológica, III, q. 30, a. 2 | Convinha que fosse anunciado à Mãe de Deus por um Anjo o mistério da divina encarnação, por três razões. Primeiro, para que também nisto se conservasse a ordenação divina, segundo a qual as coisas divinas chegam aos homens por meio dos Anjos. Segundo, isto foi conveniente à restauração da natureza humana… (porque a ruína começou pela serpente enviada à mulher, o reparo começa pelo anjo enviado à Virgem). Terceiro, porque isto convinha à virgindade da Mãe de Deus. Por isso Jerônimo diz: É conveniente que um anjo seja enviado à Virgem, porque a virgindade é sempre aparentada com os anjos. |
| 2 | Santo Agostinho | De sancta virginitate, 3 | Maria é mais bem-aventurada por receber a fé de Cristo do que por conceber a carne de Cristo |
| 3 | São João Paulo II | Audiências gerais de 4 e 18 de setembro de 1996 (texto condensado, não é citação verbal) | No mistério da Anunciação contemplamos a humildade e a obediência da Virgem, modelo da nossa resposta a Deus. |
| 4 | Bento XVI | Homilia nas Vésperas, Basílica da Anunciação, Nazaré, 14 de maio de 2009 (texto condensado) | Ao meditar este mistério, somos convidados a abrir-nos à ação do Espírito e a dar o nosso consentimento para que o Verbo habite em nós. |
| 5 | Catecismo da Igreja Católica | CIC 484 | A Anunciação a Maria inaugura a «plenitude dos tempos» (Gl 4, 4), isto é, o cumprimento das promessas e das preparações. Maria é convidada a conceber Aquele em quem habitará «corporalmente toda a plenitude da Divindade» (Cl 2, 9). A resposta divina ao seu «como será isto, se Eu não conheço homem?» (Lc 1, 34) é dada pelo poder do Espírito: «O Espírito Santo virá sobre ti» (Lc 1, 35). |
| 6 | Catecismo da Igreja Católica | CIC 490 | Para vir a ser Mãe do Salvador, Maria «foi adornada por Deus com dons dignos de uma tão grande missão». O anjo Gabriel, no momento da Anunciação, saúda-a como «cheia de graça». De facto, para poder dar o assentimento livre da sua fé ao anúncio da sua vocação, era necessário que Ela fosse totalmente movida pela graça de Deus. |
| 7 | Catecismo da Igreja Católica | CIC 494 | … Maria respondeu com «a obediência da fé»… «Eis a serva do Senhor; faça-se em mim segundo a tua palavra» (Lc 1, 38). Assim, dando o seu consentimento à palavra de Deus, Maria torna-se Mãe de Jesus. |
| 8 | São Bernardo de Claraval | In laudibus Virginis Matris, homilia 4, 8-9 (texto abreviado) | Ouviste, ó Virgem, que vais conceber e dar à luz um Filho… O Anjo aguarda a tua resposta… Nós também, miseravelmente oprimidos… esperamos a tua palavra de misericórdia. Em tuas mãos está o preço da nossa salvação. Dá, depressa, ó Virgem, a tua resposta. Responde sem demora ao Anjo, ou, para melhor dizer, ao Senhor por meio do Anjo. Pronuncia uma palavra e recebe a Palavra. Profere a tua palavra humana e concebe a divina. |

As fontes de Tomás (III, q. 30, a. 1 e a. 2), de Agostinho (*De sancta virginitate*, 3), do Catecismo (nn. 484, 490, 494) e de Bernardo (homilia 4, 8-9) foram conferidas. As frases de João Paulo II e de Bento XVI ficam como o pedido, com a fonte a declarar que são texto condensado e não citação verbal.

### 5. Um par sorteado, sem seleção

**Escolha:** função pura `pickItem(items, randomIndex)` devolve um item do conjunto, ou nenhum se ele é vazio. O índice é injetável. Ao entrar no mistério, o hook sorteia uma passagem entre as disponíveis e, em seguida, um comentário entre os dela. Guarda o par. Avançar Ave-Maria não sorteia de novo. Sair e voltar à oração sorteia de novo. `MeditationBlock` recebe só esse par: sem lista, sem “Outra passagem” e sem “Outro comentário”. Texto com mais de 280 caracteres começa pelos primeiros 140, cortados no último espaço anterior, com as frases de `PrayerTextBlock`. Com 280 ou menos, o texto inteiro, sem o convite. O toque fica no bloco, dentro do painel.

Na Anunciação o conjunto de passagens tem um item, então o sorteio da passagem é sempre Lc 1, 26-27. Passagens acrescentadas depois entram no mesmo sorteio, sem um seletor novo.

**Alternativa:** botão “Outra passagem” quando houver mais de uma — rejeitada junto com a lista de comentários; os dois controles distraem da meditação.

### 6. Carregamento

**Escolha:** enquanto a query da passagem não resolve, a área da meditação mostra `ActivityIndicator` na cor já usada na home (`contemplative.gold`) e o rótulo acessível “A carregar”. Se a query falha e o fallback não tem passagem, a área não renderiza bloco. Na imagem, o mesmo indicador sobre o fundo escuro até `onLoad`; em `onError`, o indicador sai e permanece o fundo escuro já especificado. O painel da oração não espera a imagem.

### 7. Checklist

**Escolha:** na home, depois da lista do dia e antes de “Permanecei em mim”, um controle “Conteúdo dos mistérios” abre a rota Expo Router `/meditation-coverage`. A tela agrupa o catálogo já carregado por terço e marca curado ou pendente com `meditationReady`. Não é a tab `two`. Se a query de mistérios falha, a tela usa o catálogo embutido e o aviso já previsto na home.

**Alternativa:** marcar curado na própria lista do dia — rejeitada; essa lista tem de continuar a ser só o terço do dia, e o controle precisa dos vinte (ou quinze) mistérios.

## Risks / Trade-offs

- **[Risco] Archive da change `meditation-content` repor “Outra passagem” ou “Outro comentário”** → Mitigação: o requisito removido aqui é o que sai do spec principal; não reintroduzir esses controles.
- **[Risco] Cliente antigo ignora `passage_id` e mostra um comentário solto** → Mitigação: `mystery_id` continua preenchido; o comportamento novo é o do app desta change. Rollback do app mostra os nove em ciclo, o que é degradado e ainda legível.
- **[Risco] Apagar Lc 1, 26-38 e Is 7, 14 só no banco, e o JSON continuar a alimentá-los no fallback** → Mitigação: o fallback de `joyful-1` deixa de ler essas duas linhas.
- **[Trade-off] 140/280 caracteres são corte mecânico** → O gesto é o das orações; um resumo redigido à mão fica para quando houver mais passagens.
- **[Trade-off] Um sorteio por visita não percorre todas as passagens nem os nove textos** → É o pedido: cada oração recebe um combustível, e outra visita pode trazer outro. O acervo continua no banco.
- **[Trade-off] Frases de João Paulo II e Bento XVI não são citação integral** → A fonte gravada diz isso, para não parecer referência falsa.

## Migration Plan

1. Aplicar no projeto remoto a migration: colunas, delete idempotente das duas passagens e dos dois comentários de amostra da Anunciação, insert da passagem e dos nove comentários, `meditation_ready = true` só nesse mistério.
2. Publicar o app que lê `passage_id` e a flag.
3. Rollback do app: a versão anterior ignora as colunas novas; os dados permanecem. Rollback do SQL só se o app novo ainda não tiver sido o único cliente — senão os comentários ficam sem `passage_id` e voltam a ser órfãos, o que o app novo não mostra.

## Open Questions

Nenhuma. O par sorteado uma vez por visita ao mistério, sem seletor de passagem ou de comentário, o limiar de 280 caracteres, o corte em 140 e o texto condensado dos dois papas estão fechados nos specs.
