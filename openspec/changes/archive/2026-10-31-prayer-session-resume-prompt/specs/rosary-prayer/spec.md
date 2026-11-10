# Spec Delta

## ADDED Requirements

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
