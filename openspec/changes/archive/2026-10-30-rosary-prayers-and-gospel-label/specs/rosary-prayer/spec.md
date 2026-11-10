# Spec Delta

## ADDED Requirements

### Requirement: Gospel and commentary labels
On a mystery announcement that shows a passage, the system SHALL label that passage Evangelho and, when a commentary is shown with it, SHALL label the commentary Comentário. Both labels MUST use the same gold small-cap style as the biblical reference. The system MUST NOT add a new color, card, or commentary list.

#### Scenario: Passage and commentary are distinct
- **GIVEN** o anúncio do mistério mostra uma passagem e um comentário
- **WHEN** a tela de oração é mostrada
- **THEN** a passagem aparece sob o rótulo “Evangelho”, com a referência bíblica, e o comentário sob o rótulo “Comentário”, com autor e fonte
- **AND** os dois rótulos usam o mesmo dourado e o mesmo tipo da referência bíblica, sem cartão nem cor nova
- **AND** o painel da oração continua visível

#### Scenario: No commentary label when there is no commentary
- **GIVEN** o anúncio mostra uma passagem e nenhum comentário
- **WHEN** a tela de oração é mostrada
- **THEN** o rótulo “Evangelho” aparece com a passagem e o rótulo “Comentário” não aparece

#### Scenario: Label tap does not advance
- **GIVEN** o anúncio mostra passagem e comentário e existe um passo seguinte
- **WHEN** o usuário toca o rótulo ou o texto do evangelho ou do comentário
- **THEN** o passo do terço permanece o mesmo

### Requirement: Rosary opening order
For a full rosary and for one liturgical third, the system SHALL start with one Sign of the Cross step that uses the existing long text, then the opening offering, the Creed, one Our Father, three Hail Marys, and the Glory Be, before the first mystery. It MUST NOT add a second Sign of the Cross step. A single-mystery session MUST NOT include this opening.

#### Scenario: Opening order of a third
- **WHEN** o usuário começa o terço do dia ou o rosário completo
- **THEN** os passos iniciais são, nesta ordem: Sinal da Cruz, Oferecimento, Credo, Pai-Nosso, três Ave-Marias e Glória, e só então o primeiro mistério
- **AND** existe um único passo de Sinal da Cruz, com o texto que começa por “Pelo sinal da Santa Cruz”

#### Scenario: Opening offering text
- **WHEN** o passo de Oferecimento é mostrado
- **THEN** o texto completo é “Divino Jesus, nós Vos oferecemos este terço que vamos rezar, meditando nos mistérios da Vossa Redenção. Concedei-nos, por intercessão da Virgem Maria, Mãe de Deus e nossa Mãe, as virtudes que nos são necessárias para bem rezá-lo e a graça de ganharmos as indulgências desta santa devoção.”

#### Scenario: Single mystery skips the opening
- **WHEN** o usuário começa um único mistério
- **THEN** o primeiro passo é o anúncio desse mistério e o Oferecimento não aparece

### Requirement: Angelus lines before the opening Hail Marys
Each of the three Hail Marys in that opening SHALL show one Angelus citation in the same step, before the Hail Mary text. Advancing MUST move to the next prayer, not to a separate citation step. The ten Hail Marys of a mystery MUST NOT show these citations.

#### Scenario: Three citations, one per opening Hail Mary
- **WHEN** o usuário percorre as três Ave-Marias da abertura
- **THEN** a primeira mostra, antes da Ave-Maria, “O Anjo do Senhor anunciou a Maria, e ela concebeu do Espírito Santo.”
- **AND** a segunda mostra “Eis aqui a serva do Senhor; faça-se em mim segundo a vossa palavra.”
- **AND** a terceira mostra “A Palavra se fez carne e habitou entre nós.”
- **AND** cada citação está no mesmo passo da Ave-Maria correspondente

#### Scenario: Decade Hail Marys have no Angelus line
- **WHEN** o usuário está numa Ave-Maria de um mistério
- **THEN** o painel mostra a Ave-Maria sem essas três citações

### Requirement: Closing thanksgiving and Hail Holy Queen
After the last mystery of a full rosary or of one third, and before the completion screen, the system SHALL show the closing thanksgiving and then the Hail Holy Queen. A single-mystery session MUST NOT include them. These steps MUST be labeled as the closing, not as the opening, and MUST NOT mark a decade bead as completed.

#### Scenario: Closing order
- **GIVEN** o usuário terminou o último mistério de um terço ou do rosário completo
- **WHEN** avança
- **THEN** o passo seguinte é o agradecimento e o próximo é a Salve Rainha, e só depois vem a tela de conclusão

#### Scenario: Closing texts
- **WHEN** o agradecimento é mostrado
- **THEN** o texto completo é “Infinitas graças vos damos, soberana Rainha, pelos benefícios que todos os dias recebemos de vossas mãos liberais. Dignai-vos, agora e para sempre, tomar-nos debaixo do vosso poderoso amparo e, para mais vos agradecer, vos saudamos com uma Salve Rainha.”
- **WHEN** a Salve Rainha é mostrada
- **THEN** o texto completo é “Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós bradamos, os degredados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei. E, depois deste desterro, mostrai-nos Jesus, bendito fruto do vosso ventre, ó clemente, ó piedosa, ó doce sempre Virgem Maria. Rogai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém.”

#### Scenario: Closing is not the opening
- **WHEN** o agradecimento ou a Salve Rainha é mostrada
- **THEN** o rótulo persistente indica o encerramento e não diz “Abertura”
- **AND** nenhuma conta da dezena aparece concluída

#### Scenario: Single mystery has no closing prayers
- **WHEN** o usuário termina a década de um único mistério
- **THEN** o passo seguinte é a tela de conclusão, sem agradecimento e sem Salve Rainha

### Requirement: New fixed prayers offline
The opening offering, the closing thanksgiving, and the Hail Holy Queen SHALL ship in the app with a short summary and a full text, and SHALL remain available when the device has no network.

#### Scenario: Offline closing prayers
- **GIVEN** o aparelho está sem rede
- **WHEN** o usuário chega ao Oferecimento ou à Salve Rainha
- **THEN** o resumo e o texto completo dessa oração continuam disponíveis
