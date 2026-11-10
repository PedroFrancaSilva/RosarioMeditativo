# Spec Delta

## MODIFIED Requirements

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

## ADDED Requirements

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
