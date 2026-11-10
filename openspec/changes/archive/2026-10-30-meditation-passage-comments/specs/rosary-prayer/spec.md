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
- **GIVEN** o passo é o anúncio de um mistério e a passagem tem texto e comentários
- **WHEN** a tela de oração é mostrada
- **THEN** uma passagem e exatamente um comentário dela aparecem junto do título do mistério, o que não foi sorteado não aparece, não há controle para trocar passagem ou comentário, e o painel da oração continua visível

#### Scenario: Meditation absent
- **GIVEN** o passo é o anúncio de um mistério e não há passagem nem comentário
- **WHEN** a tela de oração é mostrada
- **THEN** a tela mostra o quadro, o título do mistério e o painel da oração, sem bloco vazio de meditação

#### Scenario: Passage still loading
- **GIVEN** a passagem do mistério ainda não terminou de carregar
- **WHEN** o passo de anúncio é mostrado
- **THEN** a área da meditação indica que está carregando e o painel da oração permanece visível

#### Scenario: Passage load fails
- **GIVEN** a leitura da passagem falha e não há passagem local
- **WHEN** o passo de anúncio é mostrado
- **THEN** não aparece um bloco vazio de meditação e o título e o texto da oração continuam visíveis

#### Scenario: Long meditation text expands
- **GIVEN** o texto da passagem ou de um comentário tem mais de 280 caracteres
- **WHEN** o bloco é mostrado
- **THEN** só o começo aparece, com “Toque para ver texto completo”
- **WHEN** o usuário toca esse bloco
- **THEN** o texto completo aparece, a indicação passa a “Toque para recolher” e o passo do terço não muda

#### Scenario: Long meditation text collapses
- **GIVEN** um bloco de passagem ou comentário está com o texto completo
- **WHEN** o usuário toca esse bloco de novo
- **THEN** o bloco volta ao começo e o passo do terço não muda

#### Scenario: Short meditation text
- **GIVEN** o texto da passagem ou de um comentário tem no máximo 280 caracteres
- **WHEN** o bloco é mostrado
- **THEN** o texto aparece inteiro, sem “Toque para ver texto completo”

#### Scenario: Image still loading
- **GIVEN** a imagem de fundo do passo ainda está a ser obtida
- **WHEN** a tela de oração é mostrada
- **THEN** a área do quadro indica que está carregando, o fundo permanece escuro até a imagem aparecer e o painel da oração continua legível

#### Scenario: Image load fails
- **GIVEN** a imagem de fundo do passo falha ao carregar
- **WHEN** a indicação de carregamento termina
- **THEN** ela desaparece, o fundo fica escuro e o painel da oração continua legível

### Requirement: Contemplative selection presentation
The selection screen SHALL use a near-black ground, a large serif title “Rosário Meditativo”, gold only on small labels and the active state, and neither the native header nor the tab bar.

#### Scenario: Visible regions
- **WHEN** o usuário abre a seleção
- **THEN** aparecem, nesta ordem, o título, o subtítulo, o controle “Tradicional” / “Com Luminosos”, o card “Rosário completo”, a seção “Mistérios do dia” com o terço atual e “Rezar este terço”, a lista numerada dos mistérios, a entrada “Conteúdo dos mistérios” e a frase “Permanecei em mim”

#### Scenario: Active segment
- **WHEN** um dos dois conjuntos está selecionado
- **THEN** só esse segmento fica destacado e o terço do dia corresponde a esse conjunto

#### Scenario: Type fails to load
- **GIVEN** a fonte serifada não carrega
- **WHEN** a seleção é mostrada
- **THEN** o título e as orações continuam legíveis com a fonte de reserva, sem tela vazia

## ADDED Requirements

### Requirement: Meditation coverage checklist
From the selection screen the user SHALL be able to open a checklist of every mystery in the active set. Each entry SHALL show the mystery name and whether its meditation package is curated or pending, using the status read with the content. The day’s third SHALL remain the only mystery list on the home screen.

#### Scenario: Open the checklist
- **WHEN** o usuário ativa “Conteúdo dos mistérios”
- **THEN** abre uma lista com todos os mistérios do conjunto selecionado, agrupados por terço, cada um marcado como curado ou pendente

#### Scenario: Set follows the selection
- **GIVEN** o conjunto selecionado é o tradicional
- **WHEN** o checklist abre
- **THEN** entram os quinze mistérios desse conjunto e não os luminosos
- **GIVEN** o conjunto selecionado inclui os luminosos
- **WHEN** o checklist abre
- **THEN** entram os vinte mistérios

#### Scenario: Home list unchanged
- **WHEN** o usuário está na home
- **THEN** a lista de mistérios da home continua a ser só o terço do dia

#### Scenario: Checklist unavailable
- **GIVEN** o estado remoto falha e não há cache
- **WHEN** o usuário abre o checklist
- **THEN** a lista aparece a partir do catálogo local, com um aviso discreto, sem tela em branco
