# Spec Delta

## ADDED Requirements

### Requirement: Choose any liturgical third
The system SHALL let the user open “Escolher um terço” from the home and start any third of the mystery set already selected there. Starting a third SHALL begin with that third’s opening prayers and continue through its five mysteries in order.

#### Scenario: Traditional set lists three thirds
- **GIVEN** o conjunto selecionado na home é o tradicional
- **WHEN** o usuário abre “Escolher um terço”
- **THEN** a tela mostra, nesta ordem, Mistérios Gozosos, Mistérios Dolorosos e Mistérios Gloriosos, cada um com os dias recomendados, os cinco nomes e “Rezar este terço”, e não mostra os Mistérios Luminosos

#### Scenario: Luminous set lists four thirds
- **GIVEN** o conjunto selecionado na home inclui os luminosos
- **WHEN** o usuário abre “Escolher um terço”
- **THEN** a tela mostra, nesta ordem, Mistérios Gozosos, Mistérios Luminosos, Mistérios Dolorosos e Mistérios Gloriosos, cada um com “Rezar este terço”

#### Scenario: Start a third that is not the day's
- **GIVEN** o terço do dia não é o dos Mistérios Dolorosos
- **WHEN** o usuário ativa “Rezar este terço” nos Mistérios Dolorosos
- **THEN** a sessão começa com as orações iniciais e os cinco mistérios dolorosos, nesta ordem, e não com o terço do dia

#### Scenario: The day's third can also start here
- **WHEN** o usuário ativa “Rezar este terço” no terço que a home mostra como o do dia
- **THEN** a sessão é a mesma de “Rezar este terço” na home: orações iniciais e os cinco mistérios daquele terço, nesta ordem

#### Scenario: Mystery name does not start a single mystery
- **WHEN** o usuário toca o nome de um mistério em “Escolher um terço”
- **THEN** a tela de oração não abre e nenhum mistério avulso começa

#### Scenario: Curation status is gone
- **WHEN** o usuário abre “Escolher um terço”
- **THEN** não aparecem “Curado”, “Pendente” nem o título “Conteúdo dos mistérios”

#### Scenario: Catalog unavailable
- **GIVEN** a lista remota de mistérios falha
- **WHEN** o usuário abre “Escolher um terço”
- **THEN** a tela mostra o catálogo local, um aviso discreto e “Rezar este terço” em cada terço do conjunto, sem ficar em branco

## MODIFIED Requirements

### Requirement: Contemplative selection presentation
The selection screen SHALL use a near-black ground, a large serif title “Rosário Meditativo”, gold only on small labels and the active state, and neither the native header nor the tab bar.

#### Scenario: Visible regions
- **WHEN** o usuário abre a seleção
- **THEN** aparecem, nesta ordem, o título, o subtítulo, o controle “Tradicional” / “Com Luminosos”, o card “Rosário completo”, a seção “Mistérios do dia” com o terço atual e “Rezar este terço”, a lista numerada dos mistérios, a entrada “Escolher um terço” e a frase “Permanecei em mim”

#### Scenario: Active segment
- **WHEN** um dos dois conjuntos está selecionado
- **THEN** só esse segmento fica destacado e o terço do dia corresponde a esse conjunto

#### Scenario: Type fails to load
- **GIVEN** a fonte serifada não carrega
- **WHEN** a seleção é mostrada
- **THEN** o título e as orações continuam legíveis com a fonte de reserva, sem tela vazia

### Requirement: Resume or start new when opening prayer
When the user starts any prayer from the home selection screen or from “Escolher um terço”, and an incomplete session exists on the device, the system SHALL show a clear choice to continue the saved session or start the newly chosen prayer from the beginning. Starting new SHALL discard the saved snapshot before navigation. Continue SHALL open the saved configuration at the saved step index and MUST NOT apply the parameters of the tap that triggered the dialog unless they match the saved session.

#### Scenario: Prompt before a new start
- **GIVEN** existe sessão incompleta salva
- **WHEN** o usuário toca para iniciar rosário completo, um terço ou um mistério avulso
- **THEN** um diálogo pergunta se deseja continuar a oração em andamento ou iniciar uma nova, antes de abrir a tela de oração

#### Scenario: Prompt before a third from the chooser
- **GIVEN** existe sessão incompleta salva
- **WHEN** o usuário ativa “Rezar este terço” em “Escolher um terço”
- **THEN** o mesmo diálogo aparece antes da tela de oração

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
- **WHEN** o usuário inicia qualquer oração a partir da home ou de “Escolher um terço”
- **THEN** a tela de oração abre direto, sem diálogo de retomada

#### Scenario: Resume describes context
- **GIVEN** o diálogo de retomada está visível
- **WHEN** é mostrado ao usuário
- **THEN** o texto indica de forma breve o que será retomado (por exemplo terço completo, um terço litúrgico ou um mistério) para que a escolha seja informada
