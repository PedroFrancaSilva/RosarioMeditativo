# Spec Delta

## ADDED Requirements

### Requirement: Mystery fruit
The mystery announcement SHALL state the mystery's position, its type, and its spiritual fruit, and the fruit SHALL remain visible during that decade.

#### Scenario: Announcement with fruit
- **WHEN** o anúncio da Assunção é mostrado
- **THEN** o texto diz “Quarto mistério glorioso. Fruto: a graça de uma boa morte.”

#### Scenario: Fruit during the decade
- **GIVEN** o usuário está numa Ave-Maria de um mistério
- **WHEN** o painel é mostrado
- **THEN** o fruto desse mistério continua visível

#### Scenario: Mystery without a known fruit
- **GIVEN** o mistério não corresponde a um dos vinte conhecidos
- **WHEN** o anúncio é mostrado
- **THEN** o texto volta ao convite genérico de meditação, sem fruto vazio

### Requirement: Concluding rosary prayer
After the Hail Holy Queen of a full rosary or of one third, and before the completion screen, the system SHALL show the concluding prayer. A single-mystery session MUST NOT include it.

#### Scenario: Concluding order
- **WHEN** o usuário avança depois da Salve Rainha
- **THEN** aparece a oração conclusiva, rotulada como encerramento, e só depois a tela de conclusão

#### Scenario: Single mystery
- **WHEN** o usuário termina um único mistério
- **THEN** a oração conclusiva não aparece

### Requirement: Traditional prayer form
When the traditional set is selected, the session SHALL use the traditional Creed, Glory Be, and Fatima Prayer, and SHALL let the user choose Portuguese or Latin and turn the Fatima Prayer off. Sessions with the Luminous set MUST keep the current texts.

#### Scenario: Traditional texts
- **GIVEN** o modo tradicional em português
- **WHEN** o Credo e o Glória são mostrados
- **THEN** o Credo diz “desceu aos infernos” e o Glória termina em “por todos os séculos dos séculos. Amém.”

#### Scenario: Latin with translation
- **GIVEN** o modo tradicional em latim
- **WHEN** o usuário expande a Ave-Maria
- **THEN** o texto latino aparece com a tradução em português abaixo

#### Scenario: Prayer without a Latin text
- **GIVEN** o modo tradicional em latim
- **WHEN** o Oferecimento ou o Agradecimento é mostrado
- **THEN** o texto permanece em português

#### Scenario: Fatima Prayer off
- **GIVEN** a Oração de Fátima está desligada no modo tradicional
- **WHEN** a dezena termina
- **THEN** o passo depois do Glória é o próximo mistério ou o encerramento

#### Scenario: Luminous set ignores traditional options
- **GIVEN** o latim está escolhido e o conjunto é “Com Luminosos”
- **WHEN** a oração começa
- **THEN** as orações aparecem nos textos atuais em português, com a Oração de Fátima

### Requirement: Saved prayer form
The selected mystery set SHALL persist across launches, and a resumed session SHALL keep the prayer form it started with.

#### Scenario: Set persists
- **GIVEN** o usuário escolheu “Tradicional”
- **WHEN** reabre o app
- **THEN** a home continua em “Tradicional”

#### Scenario: Resume after changing options
- **GIVEN** uma sessão salva sem a Oração de Fátima
- **WHEN** o usuário liga a Oração de Fátima e retoma a sessão
- **THEN** a sessão volta ao mesmo passo, sem a Oração de Fátima

#### Scenario: Session saved by an older version
- **GIVEN** uma sessão salva sem forma de oração
- **WHEN** o usuário a retoma
- **THEN** ela continua no mesmo passo, em português e com a Oração de Fátima

## MODIFIED Requirements

### Requirement: Home shows the day's third
The home screen SHALL present only the liturgical third for the current day and the selected mystery set, and SHALL offer the full rosary, that third, and each mystery in it. With the traditional set, Sundays of Advent SHALL suggest the Joyful Mysteries and Sundays of Lent SHALL suggest the Sorrowful Mysteries.

#### Scenario: Traditional weekdays
- **GIVEN** o conjunto selecionado é o tradicional e a data está fora dos domingos do Advento e da Quaresma
- **WHEN** o dia é segunda ou quinta
- **THEN** a seção mostra os Mistérios Gozosos
- **WHEN** o dia é terça ou sexta
- **THEN** a seção mostra os Mistérios Dolorosos
- **WHEN** o dia é quarta, sábado ou domingo
- **THEN** a seção mostra os Mistérios Gloriosos

#### Scenario: Traditional Sunday of Advent
- **GIVEN** o conjunto é o tradicional e a data é 29 de novembro de 2026
- **WHEN** a home é mostrada
- **THEN** a seção mostra os Mistérios Gozosos e indica “Domingo do Advento”

#### Scenario: Traditional Sunday of Lent
- **GIVEN** o conjunto é o tradicional e a data é 1º de março de 2026
- **WHEN** a home é mostrada
- **THEN** a seção mostra os Mistérios Dolorosos e indica “Domingo da Quaresma”

#### Scenario: Christmas on a Sunday
- **GIVEN** o conjunto é o tradicional e 25 de dezembro cai num domingo
- **WHEN** a home é mostrada
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
