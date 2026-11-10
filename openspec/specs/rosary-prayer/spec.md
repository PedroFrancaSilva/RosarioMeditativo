# Rosary Prayer Specification

## Purpose

Define how users choose mystery sets, navigate the step-by-step prayer flow, and see decade bead progress on the prayer screen. Android-first; no authentication in MVP.

## Requirements

### Requirement: Mystery selection modes
The system SHALL let the user start prayer from a single mystery, a full rosary, or one liturgical third (terço) of five mysteries, and SHALL offer a clear choice between classic mysteries (Joyful, Sorrowful, Glorious) and the John Paul II set including Luminous.

#### Scenario: Single mystery
- **WHEN** the user selects one mystery from the catalog
- **THEN** the prayer flow starts at that mystery's opening prayers and continues through its decade

#### Scenario: Full rosary
- **WHEN** the user chooses to pray the full rosary for a selected mystery set
- **THEN** the flow covers all mysteries in that set in order until completion

#### Scenario: Classic vs JP II sets
- **WHEN** the user opens mystery set selection
- **THEN** both classic three-set grouping and the four-set grouping including Luminous are available with clear labels

#### Scenario: One third from home
- **WHEN** the user chooses to pray one third (terço) from the home screen
- **THEN** the flow includes the standard opening prayers and the five mysteries of that third in order

### Requirement: Guided prayer without memorization
The system SHALL display the current prayer text so users who do not know prayers by heart can follow along step by step.

#### Scenario: Current step visible
- **WHEN** the user is on any step in the flow
- **THEN** the app shows which prayer is active and its text (summary or full per expand rule)

### Requirement: Prayer screen layout
The prayer screen SHALL show a full-bleed artwork of the current mystery under a dark lower gradient, the mystery-set name and the mystery title, a semi-transparent panel with the current prayer, and ten decade beads along the bottom. A missing image MUST NOT hide the prayer text.

#### Scenario: Background image
- **WHEN** o usuário está num passo de um mistério
- **THEN** um quadro clássico desse mistério ocupa o fundo, com escurecimento na parte inferior para o texto continuar legível

#### Scenario: Text summary default
- **WHEN** o passo de oração abre
- **THEN** o painel mostra só o começo do texto e a indicação “Toque para ver texto completo”

#### Scenario: Text expand
- **WHEN** o usuário toca o painel do texto
- **THEN** o texto completo aparece, a indicação passa a “Toque para recolher” e o passo não muda

#### Scenario: Text collapse
- **GIVEN** o painel está com o texto completo
- **WHEN** o usuário toca o painel de novo
- **THEN** o painel volta ao começo do texto e o passo não muda

#### Scenario: Mystery name always visible
- **GIVEN** o usuário está num passo que pertence a um mistério, inclusive uma Ave-Maria
- **WHEN** a tela de oração é mostrada
- **THEN** o nome do conjunto e o nome desse mistério permanecem visíveis, distintos do título da oração atual

#### Scenario: Opening has no mystery name
- **GIVEN** o usuário reza o rosário completo e ainda está nas orações iniciais
- **WHEN** a tela de oração é mostrada
- **THEN** o rótulo persistente indica a abertura e ainda não nomeia um mistério

#### Scenario: Advance hint
- **GIVEN** o passo não é o de conclusão
- **WHEN** a tela de oração é mostrada
- **THEN** a área central, fora do painel, indica de forma discreta “Toque para avançar”

#### Scenario: Missing artwork
- **GIVEN** não há imagem disponível para o mistério atual
- **WHEN** a tela de oração é mostrada
- **THEN** o fundo permanece escuro e o painel continua mostrando o título e o texto da oração

#### Scenario: Meditation stays with the prayer
- **GIVEN** o passo é o anúncio de um mistério e há passagem ou comentário
- **WHEN** a tela de oração é mostrada
- **THEN** esse conteúdo aparece junto do título do mistério e o painel da oração continua visível

#### Scenario: Meditation absent
- **GIVEN** o passo é o anúncio de um mistério e não há passagem nem comentário
- **WHEN** a tela de oração é mostrada
- **THEN** a tela mostra o quadro, o título do mistério e o painel da oração, sem bloco vazio de meditação

### Requirement: Navigation gestures
The system SHALL advance one prayer step when the user taps the right half of the artwork area outside the prayer panel or swipes left, and SHALL go back one step when the user taps the left half of that area or swipes right. Hints for those taps MUST sit in the upper part of the artwork area, below the header. The top back control SHALL leave the prayer and return to selection. Tapping the prayer panel MUST NOT change the step. Side taps on the completion step MUST NOT leave it.

#### Scenario: Advance
- **GIVEN** o usuário não está no passo de conclusão e existe um passo seguinte
- **WHEN** toca a metade direita da área do quadro, fora do painel, ou desliza para a esquerda
- **THEN** o próximo passo aparece

#### Scenario: Advance by tap
- **GIVEN** o usuário não está no passo de conclusão
- **WHEN** toca a metade direita da área do quadro, fora do painel de texto
- **THEN** o próximo passo aparece

#### Scenario: Advance by swipe
- **WHEN** o usuário desliza para a esquerda
- **THEN** o próximo passo aparece

#### Scenario: Go back
- **GIVEN** existe um passo anterior
- **WHEN** o usuário toca a metade esquerda da área do quadro, fora do painel, ou desliza para a direita
- **THEN** o passo anterior aparece

#### Scenario: No back before the start
- **GIVEN** o usuário está no primeiro passo
- **WHEN** toca a metade esquerda da área do quadro
- **THEN** o passo permanece o mesmo

#### Scenario: Text tap does not advance
- **GIVEN** o usuário não está no último passo
- **WHEN** toca o painel de texto para expandir ou recolher
- **THEN** o índice do passo permanece o mesmo

#### Scenario: Leave prayer
- **WHEN** o usuário ativa o controle de voltar no topo da oração
- **THEN** a sessão de oração fecha e a tela de seleção volta a aparecer

#### Scenario: Hints sit high
- **GIVEN** o passo não é o de conclusão
- **WHEN** a tela de oração é mostrada
- **THEN** as indicações de voltar e avançar aparecem na parte de cima da área do quadro, à esquerda e à direita, e não no meio vertical da tela

#### Scenario: No forward past the end
- **GIVEN** o usuário está no passo de conclusão
- **WHEN** toca a metade esquerda ou a metade direita da área do quadro, ou desliza
- **THEN** o passo de conclusão permanece, e uma ação separada volta ao início

### Requirement: Decade bead counter
The system SHALL show the current mystery as an index in the prayer header and SHALL show ten beads for the Hail Marys of the current decade. Transition prayers (Our Father, Glory Be, Fatima) MUST NOT mark an additional Hail Mary as completed.

#### Scenario: Progress within decade
- **WHEN** o usuário avança pelas Ave-Marias de uma dezena
- **THEN** as contas anteriores à atual ficam preenchidas, a atual se destaca em dourado e o rótulo indica a posição de 1 a 10

#### Scenario: Other mysteries stay visible
- **GIVEN** a sessão tem mais de um mistério
- **WHEN** o usuário está dentro de uma dezena
- **THEN** o cabeçalho conta todos os mistérios da sessão, de modo que a posição atual revela quantos já ficaram para trás e quantos ainda vêm

#### Scenario: Hail Mary panel kicker
- **WHEN** o passo atual é uma Ave-Maria
- **THEN** o painel indica a conta da dezena, por exemplo “1ª conta da dezena”

#### Scenario: Our Father does not consume a bead
- **GIVEN** o passo atual é o Pai-Nosso de um mistério, antes das Ave-Marias
- **WHEN** o contador é mostrado
- **THEN** nenhuma Ave-Maria aparece como concluída, o destaque repousa na primeira conta e o rótulo sob as contas é o nome da oração

#### Scenario: Glory and Fatima close the decade
- **GIVEN** o passo atual é o Glória ou a oração de Fátima, depois das dez Ave-Marias
- **WHEN** o contador é mostrado
- **THEN** as dez contas aparecem concluídas e o rótulo sob as contas é o nome da oração, sem uma undécima conta

#### Scenario: Mystery index in the header
- **GIVEN** a sessão tem mais de um mistério e o usuário está dentro de um deles
- **WHEN** a tela de oração é mostrada
- **THEN** o cabeçalho indica a posição desse mistério entre os mistérios da sessão, e não uma fileira extra de contas

#### Scenario: Single mystery session
- **GIVEN** o usuário começou um único mistério
- **WHEN** a tela de oração é mostrada durante a dezena
- **THEN** o cabeçalho indica 1 de 1 e a fileira inferior tem dez contas de Ave-Maria

#### Scenario: Full rosary fits on screen
- **GIVEN** o usuário reza um rosário completo, com 15 ou 20 mistérios
- **WHEN** o contador é mostrado
- **THEN** as dez contas da dezena cabem na largura da tela e o cabeçalho conta todos os mistérios da sessão

#### Scenario: Opening has no decade highlight
- **GIVEN** o usuário ainda está nas orações iniciais, sem mistério anunciado
- **WHEN** a tela de oração é mostrada
- **THEN** o cabeçalho não apresenta um mistério como atual e nenhuma conta da dezena aparece concluída

### Requirement: Fixed prayers offline
Standard prayers (Our Father, Hail Mary, Glory Be, Creed, etc.) SHALL ship in the app with short and full text variants and SHALL be available without network access.

#### Scenario: Offline fixed prayers
- **WHEN** the device has no network
- **THEN** fixed prayer texts remain available for the prayer flow

### Requirement: Skip to next mystery
The system SHALL offer a control that jumps to the announcement of the next mystery, skipping the remaining steps of the current stretch. The control MUST NOT appear when no later mystery exists in the session.

#### Scenario: Jump from the middle of a decade
- **GIVEN** the user is on a step of a mystery that is not the last in the session
- **WHEN** the user activates skip to the next mystery
- **THEN** the flow shows the announcement of the following mystery and does not require the remaining prayers of the current decade

#### Scenario: Jump from the opening
- **GIVEN** the user is on the opening prayers of a full rosary
- **WHEN** the user activates skip to the next mystery
- **THEN** the flow shows the announcement of the first mystery

#### Scenario: No skip on the last mystery
- **GIVEN** the user is on the last mystery of the session, or on a single-mystery session
- **WHEN** the prayer screen is shown
- **THEN** the skip-to-next-mystery control is not shown

#### Scenario: Skip does not expand or collapse text
- **WHEN** the user activates skip to the next mystery
- **THEN** the destination step loads with the prayer text collapsed to its summary

### Requirement: Home shows the day's third
The home screen SHALL present only the liturgical third for the current weekday and the selected mystery set, and SHALL offer the full rosary, that third, and each mystery in it.

#### Scenario: Traditional weekdays
- **GIVEN** o conjunto selecionado é o tradicional
- **WHEN** o dia é segunda ou quinta
- **THEN** a seção mostra os Mistérios Gozosos
- **WHEN** o dia é terça ou sexta
- **THEN** a seção mostra os Mistérios Dolorosos
- **WHEN** o dia é quarta, sábado ou domingo
- **THEN** a seção mostra os Mistérios Gloriosos

#### Scenario: Weekdays with Luminous
- **GIVEN** o conjunto selecionado inclui os luminosos
- **WHEN** o dia é segunda ou sábado
- **THEN** a seção mostra os Mistérios Gozosos
- **WHEN** o dia é terça ou sexta
- **THEN** a seção mostra os Mistérios Dolorosos
- **WHEN** o dia é quarta ou domingo
- **THEN** a seção mostra os Mistérios Gloriosos
- **WHEN** o dia é quinta
- **THEN** a seção mostra os Mistérios Luminosos

#### Scenario: Thursday without Luminous
- **GIVEN** o dia é quinta e o conjunto selecionado é o tradicional
- **WHEN** a home é mostrada
- **THEN** a seção mostra os Mistérios Gozosos e não os Luminosos

#### Scenario: Other thirds stay off the home list
- **WHEN** o usuário vê a home
- **THEN** só o terço do dia aparece na lista, sem seções dos outros terços

#### Scenario: Start the day's third
- **WHEN** o usuário ativa “Rezar este terço”
- **THEN** a sessão começa com as orações iniciais e os cinco mistérios daquele terço, nesta ordem

#### Scenario: Start one mystery of the day
- **WHEN** o usuário escolhe um mistério da lista do dia
- **THEN** a sessão começa nesse mistério e segue só a dezena dele

#### Scenario: Start the full rosary
- **WHEN** o usuário ativa o card “Rosário completo”
- **THEN** a sessão percorre todos os mistérios do conjunto selecionado, não só o terço do dia

#### Scenario: Catalog unavailable
- **GIVEN** a lista remota de mistérios falha
- **WHEN** a home é mostrada
- **THEN** a seleção continua utilizável com o catálogo local e um aviso discreto, sem tela em branco

### Requirement: Contemplative selection presentation
The selection screen SHALL use a near-black ground, a large serif title “Rosário Meditativo”, gold only on small labels and the active state, and neither the native header nor the tab bar.

#### Scenario: Visible regions
- **WHEN** o usuário abre a seleção
- **THEN** aparecem, nesta ordem, o título, o subtítulo, o controle “Tradicional” / “Com Luminosos”, o card “Rosário completo”, a seção “Mistérios do dia” com o terço atual e “Rezar este terço”, a lista numerada dos mistérios e a frase “Permanecei em mim”

#### Scenario: Active segment
- **WHEN** um dos dois conjuntos está selecionado
- **THEN** só esse segmento fica destacado e o terço do dia corresponde a esse conjunto

#### Scenario: Type fails to load
- **GIVEN** a fonte serifada não carrega
- **WHEN** a seleção é mostrada
- **THEN** o título e as orações continuam legíveis com a fonte de reserva, sem tela vazia

### Requirement: Contemplative prayer motion
The system SHALL animate prayer-panel height, the current decade bead, and the transition between selection and prayer. Each of these motions MUST settle within 200–300 ms. A second advance during that motion MUST NOT skip an extra step.

#### Scenario: Panel height
- **WHEN** o usuário expande ou recolhe o texto da oração
- **THEN** a altura do painel muda de forma contínua e o passo permanece o mesmo

#### Scenario: Bead emphasis moves
- **WHEN** o usuário avança de uma Ave-Maria para a seguinte
- **THEN** o destaque dourado passa para a conta seguinte, com mudança de tamanho e de preenchimento

#### Scenario: Screen transition
- **WHEN** o usuário entra na oração a partir da seleção, ou volta à seleção
- **THEN** a troca de tela é um fade ou um deslize curto

#### Scenario: Advance during motion
- **GIVEN** a animação de avanço ainda não terminou
- **WHEN** o usuário toca de novo a área central
- **THEN** a sessão avança só um passo

### Requirement: Artwork credit placement
The prayer screen SHALL show the artwork title and artist in the lower-left corner. The credit MUST be hidden on steps that belong to a mystery and MUST remain available on opening steps and on the completion step.

#### Scenario: Credit on the opening
- **GIVEN** o usuário está nas orações iniciais e a imagem tem título e artista
- **WHEN** a tela de oração é mostrada
- **THEN** o crédito aparece no canto inferior esquerdo, em uma linha, sem ocupar o centro do quadro

#### Scenario: Credit hidden during a mystery
- **GIVEN** o passo pertence a um mistério, inclusive anúncio ou Ave-Maria
- **WHEN** a tela de oração é mostrada
- **THEN** o crédito da obra não é exibido

#### Scenario: Credit on completion
- **GIVEN** o usuário está no passo de conclusão e a última imagem tem título e artista
- **WHEN** a tela de oração é mostrada
- **THEN** o crédito volta a aparecer no canto inferior esquerdo

#### Scenario: Credit tap does not change the step
- **GIVEN** o crédito está visível e existe um passo seguinte
- **WHEN** o usuário toca o crédito
- **THEN** o índice do passo permanece o mesmo

#### Scenario: Missing credit
- **GIVEN** a imagem atual não tem título nem artista
- **WHEN** a tela de oração é mostrada
- **THEN** nenhum crédito vazio é renderizado

### Requirement: Contemplative artwork motion
The prayer background SHALL cover the screen without letterboxing and SHALL breathe from scale 1 to about 1.045. An image MAY set its own focal point and a small drift. It MUST NOT set a larger zoom. A stored lateral crop percent MUST NOT change the scale. An image without a focal point MUST use the shared default. The motion MUST hold a still frame when the system requests reduced motion. A failed image MUST leave the prayer text readable on a dark ground.

#### Scenario: Default path covers the screen
- **GIVEN** a imagem do passo não traz caminho próprio
- **WHEN** a tela de oração é mostrada
- **THEN** o quadro cobre a tela inteira e se move devagar entre dois enquadramentos próximos, sem faixas vazias nas bordas

#### Scenario: Custom path
- **GIVEN** a imagem define foco e deriva
- **WHEN** essa imagem entra no fundo
- **THEN** o enquadramento segue esse foco e essa deriva, e a escala continua o fôlego de cerca de 4,5%

#### Scenario: Legacy crop does not zoom
- **GIVEN** a imagem tem um percentual de crop lateral gravado de antes
- **WHEN** ela entra no fundo da oração
- **THEN** esse percentual não aumenta a escala, e o quadro só cobre a tela com o fôlego comum

#### Scenario: Motion follows the image, not the prayer step
- **GIVEN** a mesma imagem permanece no fundo
- **WHEN** o usuário avança para o próximo passo sem trocar a obra
- **THEN** o caminho não recomeça do zero

#### Scenario: New image starts its own path
- **WHEN** a obra de fundo é substituída por outra
- **THEN** o caminho recomeça no foco da imagem nova

#### Scenario: Reduced motion
- **GIVEN** o sistema pede movimento reduzido
- **WHEN** a tela de oração é mostrada
- **THEN** o quadro permanece no enquadramento inicial, ainda cobrindo a tela

#### Scenario: Image fails to load
- **GIVEN** a imagem do passo não carrega
- **WHEN** a tela de oração é mostrada
- **THEN** o fundo fica escuro e o painel da oração continua legível

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

### Requirement: Incomplete prayer session persistence
The system SHALL persist locally on the device exactly one incomplete rosary session, including enough data to rebuild the same prayer flow and restore the current step index. The system SHALL update that snapshot when the step index changes and when the user leaves the prayer screen before completion. The system SHALL NOT persist a session after the user reaches the completion step.

#### Scenario: Progress saved while praying
- **GIVEN** o usuário está num passo que não é o de conclusão
- **WHEN** avança ou recua um passo
- **THEN** o índice atual e a configuração da sessão ficam salvos no dispositivo

#### Scenario: Progress saved on exit
- **GIVEN** o usuário está num passo que não é o de conclusão
- **WHEN** usa o controle de voltar à seleção ou conclui a animação de saída da oração
- **THEN** o snapshot incompleto permanece disponível para retomada

#### Scenario: Completed session clears snapshot
- **GIVEN** o usuário chegou ao passo de conclusão
- **WHEN** a tela de conclusão é mostrada
- **THEN** não resta sessão incompleta salva para retomada

#### Scenario: Invalid snapshot ignored
- **GIVEN** o armazenamento local contém dados ilegíveis ou incompatíveis com a versão atual
- **WHEN** o app tenta ler a sessão salva
- **THEN** trata como se não houvesse sessão e remove ou ignora o valor corrompido sem bloquear a seleção

### Requirement: Resume or start new when opening prayer
When the user starts any prayer from the selection screen and an incomplete session exists on the device, the system SHALL show a clear choice to continue the saved session or start the newly chosen prayer from the beginning. Starting new SHALL discard the saved snapshot before navigation. Continue SHALL open the saved configuration at the saved step index and MUST NOT apply the parameters of the tap that triggered the dialog unless they match the saved session.

#### Scenario: Prompt before a new start
- **GIVEN** existe sessão incompleta salva
- **WHEN** o usuário toca para iniciar rosário completo, um terço ou um mistério avulso
- **THEN** um diálogo pergunta se deseja continuar a oração em andamento ou iniciar uma nova, antes de abrir a tela de oração

#### Scenario: Continue restores step
- **GIVEN** o diálogo de retomada está visível
- **WHEN** o usuário escolhe continuar
- **THEN** a oração abre no passo salvo, com o mesmo modo e conjunto de mistérios da sessão salva

#### Scenario: Start new discards draft
- **GIVEN** o diálogo de retomada está visível
- **WHEN** o usuário escolhe iniciar uma nova oração
- **THEN** o snapshot é apagado e a oração escolhida começa do primeiro passo

#### Scenario: No prompt without saved session
- **GIVEN** não há sessão incompleta salva
- **WHEN** o usuário inicia qualquer oração a partir da seleção
- **THEN** a tela de oração abre direto, sem diálogo de retomada

#### Scenario: Resume describes context
- **GIVEN** o diálogo de retomada está visível
- **WHEN** é mostrado ao usuário
- **THEN** o texto indica de forma breve o que será retomado (por exemplo terço completo, um terço litúrgico ou um mistério) para que a escolha seja informada
