# Spec Delta

## MODIFIED Requirements

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
The system SHALL advance one prayer step when the user taps the central area outside the prayer panel or swipes left, and SHALL go back one step when the user swipes right. The top back control SHALL leave the prayer and return to selection. Tapping the prayer panel MUST NOT change the step.

#### Scenario: Advance
- **GIVEN** o usuário não está no passo de conclusão
- **WHEN** toca a área central fora do painel de texto ou desliza para a esquerda
- **THEN** o próximo passo aparece

#### Scenario: Advance by tap
- **GIVEN** o usuário não está no passo de conclusão
- **WHEN** toca a área central fora do painel de texto
- **THEN** o próximo passo aparece

#### Scenario: Advance by swipe
- **WHEN** o usuário desliza para a esquerda
- **THEN** o próximo passo aparece

#### Scenario: Go back
- **WHEN** o usuário desliza para a direita
- **THEN** o passo anterior aparece

#### Scenario: Text tap does not advance
- **GIVEN** o usuário não está no último passo
- **WHEN** toca o painel de texto para expandir ou recolher
- **THEN** o índice do passo permanece o mesmo

#### Scenario: Leave prayer
- **WHEN** o usuário ativa o controle de voltar no topo da oração
- **THEN** a sessão de oração fecha e a tela de seleção volta a aparecer

#### Scenario: No forward past the end
- **GIVEN** o usuário está no passo de conclusão
- **WHEN** a tela de oração é mostrada
- **THEN** o toque na área central e o deslize não seguem além desse passo, e uma ação separada volta ao início

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

## REMOVED Requirements

### Requirement: Home grouped by third
**Reason**: A seleção passa a mostrar só o terço do dia litúrgico, no lugar de uma seção para cada terço.
**Migration**: O requirement “Home shows the day's third” cobre a home. Os demais mistérios do conjunto continuam no rosário completo.

## ADDED Requirements

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
