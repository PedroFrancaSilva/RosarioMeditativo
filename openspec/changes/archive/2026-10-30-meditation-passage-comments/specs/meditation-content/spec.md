# Spec Delta

## MODIFIED Requirements

### Requirement: Content per mystery
For each mystery, the backend SHALL provide biblical passages, commentaries that each belong to exactly one passage, one or more images with title and artist, and optional deeper reference entries. Two different texts by the same author SHALL be two commentaries.

#### Scenario: Passage fields
- **WHEN** o conteúdo de um mistério é lido
- **THEN** cada passagem inclui texto, referência bíblica e ordem de exibição

#### Scenario: Commentary fields
- **WHEN** o conteúdo de um mistério é lido
- **THEN** cada comentário inclui o identificador da passagem a que pertence, texto, autor, fonte não vazia e ordem de exibição

#### Scenario: Distinct texts stay separate
- **GIVEN** o mesmo autor tem dois textos diferentes sobre a mesma passagem
- **WHEN** o conteúdo dessa passagem é lido
- **THEN** os dois textos chegam como comentários distintos, na ordem gravada, e não como um único bloco

#### Scenario: Orphan commentary
- **GIVEN** existe um comentário sem passagem
- **WHEN** o app compõe a meditação
- **THEN** esse comentário não aparece debaixo de nenhuma passagem

#### Scenario: Image metadata
- **WHEN** uma imagem está associada a um mistério
- **THEN** o app recebe URL, título, artista e descrição opcional, adequados ao fundo

### Requirement: Anonymous read of content
Supabase content tables SHALL allow read access to anonymous clients via RLS policies; MVP SHALL NOT require user login to read meditation content.

#### Scenario: Anon fetch
- **WHEN** o app consulta o conteúdo com a chave anônima
- **THEN** mistérios — inclusive se a meditação está curada ou pendente —, passagens, comentários, imagens e referências de aprofundamento são legíveis

#### Scenario: No login required
- **GIVEN** o cliente não tem sessão de usuário
- **WHEN** consulta o checklist de cobertura e o pacote da Anunciação
- **THEN** a leitura sucede

## REMOVED Requirements

### Requirement: Dynamic combination at prayer time
**Reason**: Trocar de passagem ou de comentário tira a pessoa da meditação. O que aparece passa a ser um sorteio, sem seleção.
**Migration**: O requisito “Single meditation draw” cobre o par mostrado. Não há “Outra passagem” nem “Outro comentário”.

## ADDED Requirements

### Requirement: Single meditation draw
During prayer the app SHALL draw one passage at random from those available for the mystery and exactly one commentary at random from the commentaries that belong to that passage, and SHALL show that pair with an image. The draw SHALL stay fixed while the user remains in the mystery, including across rosary steps. A new entry SHALL draw again. The app MUST NOT offer a control to choose another passage or commentary, and MUST NOT list the ones that were not drawn.

#### Scenario: One pair on screen
- **GIVEN** o sorteio escolhe a segunda passagem e, dela, o segundo comentário
- **WHEN** o usuário está num passo desse mistério
- **THEN** aparecem só essa passagem e esse comentário, com autor e fonte, e os demais não aparecem

#### Scenario: Commentary belongs to the drawn passage
- **GIVEN** uma passagem tem dois comentários e outra tem um terceiro
- **WHEN** o sorteio escolhe a primeira passagem
- **THEN** o comentário mostrado é um dos dois dela, e não o terceiro

#### Scenario: Only one passage
- **GIVEN** o mistério tem uma única passagem
- **WHEN** a meditação é mostrada
- **THEN** essa passagem é a mostrada

#### Scenario: Stable through the decade
- **GIVEN** um par já foi sorteado
- **WHEN** o usuário avança de uma Ave-Maria para a seguinte
- **THEN** a mesma passagem e o mesmo comentário continuam

#### Scenario: New entry draws again
- **GIVEN** o usuário saiu da oração depois de um sorteio
- **WHEN** entra de novo nesse mistério
- **THEN** passagem e comentário são sorteados de novo, sem conservar o par anterior

#### Scenario: No browsers
- **GIVEN** o mistério tem várias passagens e a passagem sorteada tem vários comentários
- **WHEN** a meditação é mostrada
- **THEN** não há lista do que ficou de fora nem controle “Outra passagem” ou “Outro comentário”

#### Scenario: Drawn passage without commentary
- **GIVEN** a passagem sorteada não tem comentário
- **WHEN** a meditação é mostrada
- **THEN** a passagem aparece e não há bloco de comentário

#### Scenario: No passage available
- **GIVEN** o mistério não tem passagem
- **WHEN** a meditação é pedida
- **THEN** não há bloco de passagem nem de comentário

### Requirement: Meditation coverage checklist
Each mystery SHALL have an explicit curated-or-pending status stored with the mystery and readable with the rest of the content. The status MUST NOT be inferred only from the presence of a biblical passage. Mysteries without a curated package SHALL remain pending.

#### Scenario: Annunciation curated
- **WHEN** o checklist é lido depois do pacote inicial
- **THEN** o primeiro mistério gozoso está curado e os outros mistérios do catálogo estão pendentes

#### Scenario: Passages do not imply curated
- **GIVEN** um mistério tem trechos bíblicos e não foi marcado como curado
- **WHEN** o checklist é lido
- **THEN** esse mistério continua pendente

#### Scenario: Remote status wins
- **GIVEN** o estado remoto de um mistério difere do valor embutido
- **WHEN** a leitura remota sucede
- **THEN** o checklist mostra o estado remoto

#### Scenario: Checklist falls back
- **GIVEN** a leitura remota do estado falha e não há cache
- **WHEN** o checklist é pedido
- **THEN** o app usa o catálogo embutido, em que só o primeiro mistério gozoso está curado, sem deixar a lista em branco

### Requirement: Annunciation curated package
The first joyful mystery SHALL offer, as its prayer passage, Luke 1:26-27 in the Matos Soares translation, with exactly the nine commentaries below, in this order, each with the stated author and source. The previous prayer passages Luke 1:26-38 and Isaiah 7:14, and the two sample commentaries without these sources, MUST NOT be part of that prayer list.

#### Scenario: Passage shown
- **WHEN** o conteúdo de oração do primeiro mistério gozoso é lido
- **THEN** a única passagem oferecida tem a referência “Lc 1, 26-27” e o texto “Estando Isabel no sexto mês, foi enviado por Deus o anjo Gabriel a uma cidade da Galileia, chamada Nazaré, a uma virgem desposada com um varão, chamado José, da casa de David; o nome da virgem era Maria.”

#### Scenario: Nine commentaries in order
- **WHEN** os comentários dessa passagem são lidos
- **THEN** aparecem, nesta ordem: São Tomás de Aquino, “Suma Teológica, III, q. 30, a. 1”; São Tomás de Aquino, “Suma Teológica, III, q. 30, a. 2”; Santo Agostinho, “De sancta virginitate, 3”; São João Paulo II, “Audiências gerais de 4 e 18 de setembro de 1996 (texto condensado, não é citação verbal)”; Bento XVI, “Homilia nas Vésperas, Basílica da Anunciação, Nazaré, 14 de maio de 2009 (texto condensado)”; Catecismo da Igreja Católica, “CIC 484”; Catecismo da Igreja Católica, “CIC 490”; Catecismo da Igreja Católica, “CIC 494”; São Bernardo de Claraval, “In laudibus Virginis Matris, homilia 4, 8-9 (texto abreviado)”

#### Scenario: Aquinas texts stay separate
- **WHEN** os dois comentários de São Tomás de Aquino são lidos
- **THEN** o primeiro começa por “Era conveniente que fosse anunciado à bem-aventurada Virgem” e o segundo por “Convinha que fosse anunciado à Mãe de Deus por um Anjo”, e nenhum dos dois absorve o outro

#### Scenario: Excerpt wording is kept
- **WHEN** os comentários dessa passagem são lidos
- **THEN** o texto de cada um é o trecho pedido, sem completar o que a reticência já omitia
- **AND** o de Santo Agostinho é “Maria é mais bem-aventurada por receber a fé de Cristo do que por conceber a carne de Cristo”
- **AND** o de São João Paulo II é “No mistério da Anunciação contemplamos a humildade e a obediência da Virgem, modelo da nossa resposta a Deus.”
- **AND** o de Bento XVI é “Ao meditar este mistério, somos convidados a abrir-nos à ação do Espírito e a dar o nosso consentimento para que o Verbo habite em nós.”
- **AND** o CIC 484 começa por “A Anunciação a Maria inaugura a «plenitude dos tempos»” e termina em “(Lc 1, 35).”
- **AND** o CIC 490 começa por “Para vir a ser Mãe do Salvador” e termina em “totalmente movida pela graça de Deus.”
- **AND** o CIC 494 começa por “…” e termina em “Maria torna-se Mãe de Jesus.”
- **AND** o de São Bernardo começa por “Ouviste, ó Virgem, que vais conceber e dar à luz um Filho” e termina em “Profere a tua palavra humana e concebe a divina.”
- **AND** o segundo comentário de São Tomás conserva a reticência em “restauração da natureza humana…”

#### Scenario: Retired excerpts stay out
- **WHEN** a lista de oração da Anunciação é lida
- **THEN** ela não inclui a referência “Lc 1, 26-38”, a referência “Is 7, 14”, nem os comentários de amostra cujo texto começa por “Maria é a tabernáculo vivo” ou “O anjo não traz mandamento”
