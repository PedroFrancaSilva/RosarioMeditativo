# Spec Delta

## REMOVED Requirements

### Requirement: Angelus lines before the opening Hail Marys
**Reason**: As três Ave-Marias iniciais passam a ter, por padrão, o pedido tradicional pelo aumento da fé, da esperança e da caridade. Os versículos do Angelus continuam disponíveis como opção.
**Migration**: O requirement “Opening Hail Mary intentions” cobre as duas formas e a escolha nos ajustes.

## ADDED Requirements

### Requirement: Opening Hail Mary intentions
Each of the three opening Hail Marys SHALL show one line in the same step, before the prayer text: by default the requests for faith, hope and charity, or the three Angelus verses when the user chooses “Angelus” in the settings. The decade Hail Marys MUST NOT show these lines, and the choice MUST NOT change the number or order of the steps.

#### Scenario: Default asks for faith, hope and charity
- **GIVEN** o usuário nunca mudou a opção das Ave-Marias iniciais
- **WHEN** percorre as três Ave-Marias da abertura
- **THEN** a primeira mostra “Pelo aumento da fé.”, a segunda “Pelo aumento da esperança.” e a terceira “Pelo aumento da caridade.”, cada uma no mesmo passo da Ave-Maria

#### Scenario: Angelus option
- **GIVEN** o usuário escolheu “Angelus” nos ajustes
- **WHEN** começa uma nova oração e percorre as três Ave-Marias da abertura
- **THEN** a primeira mostra “O Anjo do Senhor anunciou a Maria, e ela concebeu do Espírito Santo.”, a segunda “Eis aqui a serva do Senhor; faça-se em mim segundo a vossa palavra.” e a terceira “A Palavra se fez carne e habitou entre nós.”

#### Scenario: Decade Hail Marys have no opening line
- **WHEN** o usuário está numa Ave-Maria de um mistério
- **THEN** o painel mostra a Ave-Maria sem nenhuma dessas linhas

#### Scenario: Resuming keeps the step position
- **GIVEN** existe uma sessão incompleta gravada e o usuário trocou a opção depois disso
- **WHEN** continua essa sessão
- **THEN** ela retoma no mesmo passo, porque a quantidade de passos não muda com a opção

### Requirement: Screen stays awake during prayer
While the prayer screen is open, the app SHALL keep the device screen from turning off by inactivity. Leaving the prayer screen MUST restore the normal screen timeout.

#### Scenario: Long decade without touching
- **GIVEN** a oração está aberta numa Ave-Maria
- **WHEN** o usuário fica mais tempo que o bloqueio automático do aparelho sem tocar na tela
- **THEN** a tela continua acesa

#### Scenario: Back at the selection
- **WHEN** o usuário volta da oração para a seleção
- **THEN** o aparelho volta a apagar a tela no tempo normal

### Requirement: Haptic feedback per bead
When haptic feedback is on (the default), advancing to a prayer step SHALL vibrate lightly, and advancing to the Glory Be that closes a decade SHALL use a distinct pattern. Going back, resuming or opening the prayer MUST NOT vibrate. The user SHALL be able to turn it off in the settings.

#### Scenario: Light cue per Hail Mary
- **GIVEN** a vibração está ligada
- **WHEN** o usuário avança de uma Ave-Maria para a seguinte
- **THEN** o aparelho vibra uma vez, de leve

#### Scenario: Decade end feels different
- **GIVEN** a vibração está ligada
- **WHEN** o usuário avança da décima Ave-Maria para o Glória
- **THEN** a vibração é distinta da vibração de uma conta

#### Scenario: Going back is silent
- **WHEN** o usuário volta para a oração anterior
- **THEN** o aparelho não vibra

#### Scenario: Turned off
- **GIVEN** o usuário desligou “Vibrar a cada conta” nos ajustes
- **WHEN** avança pela dezena
- **THEN** o aparelho não vibra

### Requirement: Prayer text size
The settings SHALL offer three text sizes for the prayer: “Normal”, “Grande” and “Muito grande”. The chosen size SHALL scale the prayer title, the prayer text, the opening line and the meditation passage and commentary. The choice SHALL persist across restarts.

#### Scenario: Larger text in prayer
- **GIVEN** o usuário escolheu “Muito grande”
- **WHEN** abre a oração
- **THEN** o texto da oração e da meditação aparece maior do que em “Normal”

#### Scenario: Preview in settings
- **WHEN** o usuário troca o tamanho nos ajustes
- **THEN** uma amostra da Ave-Maria nessa tela muda de tamanho na hora

### Requirement: Settings screen
The home SHALL offer an “Ajustes” entry that opens a settings screen with: text size, haptic feedback, the opening Hail Mary lines, the daily reminder (where the platform supports notifications) and the count of thirds prayed. The chant toggle MUST stay on the home, as already specified.

#### Scenario: Open settings
- **WHEN** o usuário toca “Ajustes” na home
- **THEN** a tela de ajustes abre com essas opções e um botão para voltar

## MODIFIED Requirements

### Requirement: Contemplative artwork motion
The prayer background SHALL cover the screen without letterboxing and SHALL breathe from scale 1 to about 1.045. When the covered image overflows the screen on one axis by more than 8% of the screen, the motion SHALL travel that axis from one edge of the image to the other and back, so the whole artwork is seen; each way SHALL take between 18 and 30 seconds, longer for wider overflow. An image MAY set its own focal point and drift; the drift sign sets where the sweep starts. It MUST NOT set a larger zoom, and a stored lateral crop percent MUST NOT change the scale. With reduced motion the background MUST hold still on the image's focal point. A failed image MUST leave the prayer text readable on a dark ground.

#### Scenario: Default path covers the screen
- **GIVEN** a imagem do passo não traz caminho próprio e quase cabe na tela
- **WHEN** a tela de oração é mostrada
- **THEN** o quadro cobre a tela inteira e se move devagar entre dois enquadramentos próximos, sem faixas vazias nas bordas

#### Scenario: Wide artwork is seen whole
- **GIVEN** a obra é muito mais larga que a tela em pé (por exemplo, só um terço da largura aparece)
- **WHEN** ela fica no fundo durante a dezena
- **THEN** o enquadramento vai devagar de uma borda lateral da obra à outra e volta, sem faixa vazia, de modo que toda a largura aparece

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
