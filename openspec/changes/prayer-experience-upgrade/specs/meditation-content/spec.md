# Spec Delta

## MODIFIED Requirements

### Requirement: Content per mystery
For each mystery, the content SHALL provide at least two biblical passages, each with at least one commentary bound to it, plus one or more images with title and artist, and optional deeper reference entries. Every passage MUST be the verbatim text of the Pe. Manuel de Matos Soares translation, with “…” marking each omitted part. Editorial notes MUST NOT appear inside a passage or a commentary text. A commentary MUST be a quotation of its author, never a paraphrase presented under the author's name. A commentary SHALL keep the spelling of the edition it was taken from (Portuguese of Portugal or of Brazil); only typing errors are corrected.

#### Scenario: Passage fields
- **WHEN** content is fetched for a mystery
- **THEN** each passage includes text, scriptural reference, and display order

#### Scenario: Commentary fields
- **WHEN** content is fetched for a mystery
- **THEN** each commentary includes text, author, source, display order and the passage it belongs to

#### Scenario: Several passages per mystery
- **WHEN** o pacote de qualquer um dos vinte mistérios é carregado, remoto ou embutido
- **THEN** há pelo menos duas passagens e cada passagem tem pelo menos um comentário seu

#### Scenario: Omissions are marked
- **GIVEN** uma passagem pula versículos ou parte de um versículo
- **WHEN** ela aparece na oração
- **THEN** cada corte está marcado com “…” e nenhuma glosa editorial aparece dentro do texto bíblico

#### Scenario: Image metadata
- **WHEN** an image is associated with a mystery
- **THEN** the app receives URL, title, artist, and optional description suitable for background display

### Requirement: Dynamic combination at prayer time
At each mystery announcement the app SHALL draw one passage at random and one commentary bound to that passage. When the mystery has more than one possible pair, the meditation SHALL offer a discreet “Outra meditação” control that draws a different pair of passage and commentary, never the pair already shown, without leaving the step. The control MUST NOT appear when only one pair exists. A commentary MUST NOT be shown with a passage it does not belong to.

#### Scenario: Another passage
- **GIVEN** o mistério tem mais de uma passagem
- **WHEN** o usuário toca “Outra meditação” uma ou mais vezes
- **THEN** pode aparecer outra passagem desse mistério, com um comentário dela, e o passo da oração não muda

#### Scenario: Another commentary
- **GIVEN** a passagem mostrada tem mais de um comentário
- **WHEN** o usuário toca “Outra meditação”
- **THEN** aparece um par diferente do atual, que pode ser a mesma passagem com outro comentário

#### Scenario: Only one pair
- **GIVEN** o mistério tem uma só passagem com um só comentário
- **WHEN** o anúncio do mistério aparece
- **THEN** não há “Outra meditação”

#### Scenario: Commentary stays with its passage
- **WHEN** um par é sorteado, no anúncio ou em “Outra meditação”
- **THEN** o comentário mostrado pertence à passagem mostrada
