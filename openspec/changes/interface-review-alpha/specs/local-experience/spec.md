# Spec Delta

## MODIFIED Requirements

### Requirement: Gregorian background audio
The app SHALL provide a simple toggle in the settings screen, off by default, for optional low-volume looping playback of one seasonal Gregorian Marian antiphon during prayer. Each bundled recording MUST be distributable in the app under a license that permits that use with attribution and without a non-commercial restriction.

#### Scenario: Audio toggle on
- **GIVEN** o canto está ligado nos ajustes e a faixa da data carregou
- **WHEN** o usuário abre a oração
- **THEN** a antífona dessa data local toca em loop, em volume baixo, enquanto a oração permanece em primeiro plano

#### Scenario: Selection stays silent
- **GIVEN** o canto está ligado nos ajustes
- **WHEN** o usuário permanece na seleção ou nos ajustes
- **THEN** nenhum canto toca

#### Scenario: Leaving prayer pauses the chant
- **GIVEN** o canto está tocando na oração
- **WHEN** o usuário volta à seleção
- **THEN** a reprodução para e o interruptor dos ajustes continua ligado

#### Scenario: Audio toggle off
- **GIVEN** o canto está desligado nos ajustes
- **WHEN** o usuário abre a oração
- **THEN** nenhum canto toca

#### Scenario: First launch is silent
- **GIVEN** o app abre pela primeira vez, sem preferência salva
- **WHEN** a seleção ou a oração aparece
- **THEN** nenhum canto toca e o interruptor fica desligado

#### Scenario: Prayer text stays in front
- **GIVEN** o canto está ligado durante um passo de oração
- **WHEN** o usuário lê o texto desse passo
- **THEN** o texto da oração continua visível e o canto não substitui nem recita Pai-Nosso, Ave-Maria ou Glória

#### Scenario: Playback failure leaves prayer usable
- **GIVEN** a faixa não carrega ou o player falha
- **WHEN** o usuário liga o canto ou entra na oração com o canto ligado
- **THEN** a oração segue em silêncio e o interruptor indica que o canto não está disponível

### Requirement: Chant attribution
The app SHALL show, in the settings screen next to the chant toggle, the performer, the work title, and the license name of the recording for the local date. The prayer screen MUST NOT show the chant toggle or that credit.

#### Scenario: Credit matches the playing recording
- **GIVEN** a Alma Redemptoris Mater está tocando
- **WHEN** o usuário vê o interruptor nos ajustes
- **THEN** o crédito nomeia Rick Dechance, a Alma Redemptoris Mater e a licença dessa gravação

#### Scenario: Credit follows the Salve Regina fallback
- **GIVEN** a data pediria a Regina caeli e o pacote não a tem, então a Salve Regina está tocando
- **WHEN** o usuário vê o interruptor
- **THEN** o crédito nomeia Les Petits Chanteurs de Passy, a Salve Regina e a licença dessa gravação

## ADDED Requirements

### Requirement: Reminder notification icon
On Android the daily reminder notification SHALL use a monochrome small icon: the rosary silhouette in white on a transparent background, tinted with the app's gold. It MUST NOT use the opaque launcher icon.

#### Scenario: Icon in the status bar
- **GIVEN** o lembrete diário está ligado num build Android
- **WHEN** a notificação chega
- **THEN** a barra de status e a notificação mostram a silhueta do terço, e não um quadrado ou círculo branco cheio
