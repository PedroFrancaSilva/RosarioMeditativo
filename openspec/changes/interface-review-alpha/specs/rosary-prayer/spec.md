# Spec Delta

## REMOVED Requirements

### Requirement: Artwork credit placement
**Reason**: O crédito ficava oculto nos passos dos mistérios, e só a obra das orações iniciais tinha referência visível. O dono do produto pediu a referência de todos os quadros.
**Migration**: O requirement “Artwork credit on every step” mostra o crédito em todos os passos e acrescenta a ficha da obra.

## MODIFIED Requirements

### Requirement: Contemplative selection presentation
The selection screen SHALL use a near-black ground, a large serif title, gold only on small labels and the active state, and neither the native header nor the tab bar. A settings button with a gear icon SHALL sit at the top right of the selection screen.

#### Scenario: Visible regions
- **WHEN** o usuário abre a seleção
- **THEN** aparecem, nesta ordem, o rótulo com o botão de ajustes, o título, o subtítulo, o controle “Tradicional” / “Com Luminosos”, o card “Rosário completo”, a seção “Mistérios do dia” com o terço atual e “Rezar este terço”, a lista numerada dos mistérios, o card “Escolher um terço” e a frase “Permanecei em mim”

#### Scenario: Active segment
- **WHEN** um dos dois conjuntos está selecionado
- **THEN** só esse segmento fica destacado e o terço do dia corresponde a esse conjunto

#### Scenario: Type fails to load
- **GIVEN** a fonte serifada não carrega
- **WHEN** a seleção é mostrada
- **THEN** o título e as orações continuam legíveis com a fonte de reserva, sem tela vazia

### Requirement: Settings screen
The home SHALL offer a gear button labelled “Ajustes” that opens a settings screen with: the Gregorian chant toggle and its credit, text size, haptic feedback, the opening Hail Mary lines, the daily reminder (where the platform supports notifications), the count of thirds prayed and an “Sobre” section. The home MUST NOT show the chant toggle.

#### Scenario: Open settings
- **WHEN** o usuário toca o botão de engrenagem na home
- **THEN** a tela de ajustes abre com essas opções e um botão para voltar

#### Scenario: Chant lives in settings
- **WHEN** o usuário procura o canto gregoriano
- **THEN** o interruptor e o crédito da gravação estão na seção “Canto gregoriano” dos ajustes, e não na home

### Requirement: Contemplative artwork motion
The prayer background SHALL cover the screen without letterboxing and SHALL breathe from scale 1 to about 1.045. When the covered image overflows the screen on one axis by more than 8% of the screen, the motion SHALL travel that axis from one edge of the image to the other and back, so the whole artwork is seen. The speed along that path MUST NOT be constant: near the edges it SHALL be about 36 px/s, and around the image's focal point (the centre by default) it SHALL drop to about 30% of that, easing slightly before each turn. Each way SHALL take between 18 and 90 seconds. An image MAY set its own focal point and drift; the drift sign sets where the sweep starts. It MUST NOT set a larger zoom, and a stored lateral crop percent MUST NOT change the scale. With reduced motion the background MUST hold still on the image's focal point. A failed image MUST leave the prayer text readable on a dark ground.

#### Scenario: Default path covers the screen
- **GIVEN** a imagem do passo não traz caminho próprio e quase cabe na tela
- **WHEN** a tela de oração é mostrada
- **THEN** o quadro cobre a tela inteira e se move devagar entre dois enquadramentos próximos, sem faixas vazias nas bordas

#### Scenario: Wide artwork is seen whole
- **GIVEN** a obra é muito mais larga que a tela em pé
- **WHEN** ela fica no fundo durante a dezena
- **THEN** o enquadramento vai de uma borda lateral da obra à outra e volta, sem faixa vazia, de modo que toda a largura aparece

#### Scenario: Slower over the heart of the scene
- **GIVEN** uma obra larga sem foco próprio
- **WHEN** o enquadramento atravessa a obra
- **THEN** perto das bordas ele anda na velocidade de antes e, quando o centro da obra está no centro da tela, anda a cerca de um terço disso

#### Scenario: Slow zone follows the curated focus
- **GIVEN** a imagem define foco horizontal à esquerda do centro
- **WHEN** a obra é percorrida
- **THEN** o trecho mais lento acontece quando esse foco passa pelo centro da tela

#### Scenario: Custom path
- **GIVEN** a imagem define foco e deriva
- **WHEN** essa imagem entra no fundo
- **THEN** o enquadramento segue esse foco no eixo que não é percorrido, a deriva define o lado de partida, e a escala continua o fôlego de cerca de 4,5%

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
- **THEN** o caminho recomeça no ponto de partida da imagem nova

#### Scenario: Reduced motion
- **GIVEN** o sistema pede movimento reduzido
- **WHEN** a tela de oração é mostrada
- **THEN** o quadro fica parado no foco da imagem, ainda cobrindo a tela

#### Scenario: Image fails to load
- **GIVEN** a imagem do passo não carrega
- **WHEN** a tela de oração é mostrada
- **THEN** o fundo fica escuro e o painel da oração continua legível

### Requirement: Gospel and commentary labels
On a mystery announcement that shows a passage, the system SHALL label that passage Evangelho when it comes from one of the four Gospels and Sagrada Escritura otherwise, followed by the biblical reference. When a commentary is shown with it, the system SHALL label the commentary Comentário. All labels MUST use the same gold small-cap style as the biblical reference. The system MUST NOT add a new color, card, or commentary list.

#### Scenario: Passage and commentary are distinct
- **GIVEN** o anúncio do mistério mostra uma passagem de um evangelho e um comentário
- **WHEN** a tela de oração é mostrada
- **THEN** a passagem aparece sob o rótulo “Evangelho”, com a referência bíblica, e o comentário sob o rótulo “Comentário”, com autor e fonte
- **AND** os rótulos usam o mesmo dourado e o mesmo tipo da referência bíblica, sem cartão nem cor nova
- **AND** o painel da oração continua visível

#### Scenario: Passage outside the Gospels
- **GIVEN** a passagem sorteada é Is 53, 5
- **WHEN** a tela de oração é mostrada
- **THEN** o rótulo é “Sagrada Escritura”, e não “Evangelho”

#### Scenario: No commentary label when there is no commentary
- **GIVEN** o anúncio mostra uma passagem e nenhum comentário
- **WHEN** a tela de oração é mostrada
- **THEN** o rótulo da passagem aparece e o rótulo “Comentário” não aparece

#### Scenario: Label tap does not advance
- **GIVEN** o anúncio mostra passagem e comentário e existe um passo seguinte
- **WHEN** o usuário toca o rótulo, o texto ou o link de fonte do evangelho ou do comentário
- **THEN** o passo do terço permanece o mesmo

## ADDED Requirements

### Requirement: Artwork credit on every step
The prayer screen SHALL show the artwork title and artist in the lower-left corner of the artwork area on every step that has a credited image, including steps of a mystery. Tapping the credit SHALL open a sheet with the title, the artist, the description and, when known, a link to the source of the image. Tapping the credit MUST NOT change the step.

#### Scenario: Credit during a mystery
- **GIVEN** o passo pertence a um mistério e a imagem tem título e artista
- **WHEN** a tela de oração é mostrada
- **THEN** o crédito aparece no canto inferior esquerdo da área da obra, numa linha

#### Scenario: Credit opens the artwork sheet
- **GIVEN** o crédito está visível e a obra tem link de fonte
- **WHEN** o usuário toca o crédito
- **THEN** abre a ficha da obra com título, artista, acervo e o botão “Ver a obra no acervo”
- **AND** o índice do passo permanece o mesmo

#### Scenario: Missing credit
- **GIVEN** a imagem atual não tem título nem artista
- **WHEN** a tela de oração é mostrada
- **THEN** nenhum crédito vazio é renderizado

#### Scenario: Image without source link
- **GIVEN** a obra não tem link de fonte
- **WHEN** o usuário abre a ficha
- **THEN** a ficha mostra título e artista, sem botão de link

#### Scenario: Credit on the opening and on completion
- **GIVEN** o usuário está nas orações iniciais ou na conclusão, e a imagem tem título e artista
- **WHEN** a tela de oração é mostrada
- **THEN** o crédito aparece no canto inferior esquerdo, numa linha, sem ocupar o centro do quadro
