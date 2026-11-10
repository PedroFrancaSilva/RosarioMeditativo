# Spec Delta

## MODIFIED Requirements

### Requirement: Gregorian background audio
The app SHALL provide a simple toggle on the selection screen, off by default, for optional low-volume looping playback of one seasonal Gregorian Marian antiphon during prayer. Each bundled recording MUST be distributable in the app under a license that permits that use with attribution and without a non-commercial restriction.

#### Scenario: Audio toggle on
- **GIVEN** o canto está ligado no menu e a faixa da data carregou
- **WHEN** o usuário abre a oração
- **THEN** a antífona dessa data local toca em loop, em volume baixo, enquanto a oração permanece em primeiro plano

#### Scenario: Selection stays silent
- **GIVEN** o canto está ligado no menu
- **WHEN** o usuário permanece na seleção
- **THEN** nenhum canto toca

#### Scenario: Leaving prayer pauses the chant
- **GIVEN** o canto está tocando na oração
- **WHEN** o usuário volta à seleção
- **THEN** a reprodução para e o interruptor do menu continua ligado

#### Scenario: Audio toggle off
- **GIVEN** o canto está desligado no menu
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

## ADDED Requirements

### Requirement: Seasonal Marian antiphon
The app SHALL select the background chant from the device's local calendar date on the Roman Catholic calendar: Alma Redemptoris Mater from the First Sunday of Advent through 2 February, Ave Regina caelorum from 3 February through Holy Saturday, Regina caeli from Easter Sunday through Pentecost Sunday, and Salve Regina from the day after Pentecost through the day before the First Sunday of Advent.

#### Scenario: Ordinary time uses Salve Regina
- **GIVEN** a data local é 30 de outubro de 2026 e a Salve Regina está no pacote
- **WHEN** o usuário liga o canto
- **THEN** toca a Salve Regina

#### Scenario: Advent uses Alma Redemptoris Mater
- **GIVEN** a data local é 29 de novembro de 2026 e a Alma Redemptoris Mater está no pacote
- **WHEN** o usuário liga o canto
- **THEN** toca a Alma Redemptoris Mater

#### Scenario: Candlemas still uses Alma
- **GIVEN** a data local é 2 de fevereiro e a Alma Redemptoris Mater está no pacote
- **WHEN** o usuário liga o canto
- **THEN** toca a Alma Redemptoris Mater

#### Scenario: Day after Candlemas uses Ave Regina
- **GIVEN** a data local é 3 de fevereiro e a Ave Regina caelorum está no pacote
- **WHEN** o usuário liga o canto
- **THEN** toca a Ave Regina caelorum

#### Scenario: Holy Saturday stays before Easter
- **GIVEN** a data local é 4 de abril de 2026 e a Ave Regina caelorum está no pacote
- **WHEN** o usuário liga o canto
- **THEN** toca a Ave Regina caelorum

#### Scenario: Easter uses Regina caeli
- **GIVEN** a data local é 5 de abril de 2026 e a Regina caeli está no pacote
- **WHEN** o usuário liga o canto
- **THEN** toca a Regina caeli

#### Scenario: Pentecost still uses Regina caeli
- **GIVEN** a data local é 24 de maio de 2026 e a Regina caeli está no pacote
- **WHEN** o usuário liga o canto
- **THEN** toca a Regina caeli

#### Scenario: Day after Pentecost uses Salve Regina
- **GIVEN** a data local é 25 de maio de 2026 e a Salve Regina está no pacote
- **WHEN** o usuário liga o canto
- **THEN** toca a Salve Regina

#### Scenario: Date change swaps the chant
- **GIVEN** o canto está ligado e a data local passa para uma antífona diferente
- **WHEN** a nova data começa
- **THEN** a faixa e o crédito passam a ser os da antífona dessa data, e o interruptor continua ligado

### Requirement: Missing antiphon recording
When the antiphon for the local date has no bundled recording, the app MUST play the Salve Regina recording and MUST show that recording in the credit.

#### Scenario: Easter without a Regina caeli file
- **GIVEN** a data local é 5 de abril de 2026 e o pacote não tem Regina caeli
- **WHEN** o usuário liga o canto
- **THEN** toca a Salve Regina e o crédito nomeia a Salve Regina

#### Scenario: February without an Ave Regina file
- **GIVEN** a data local é 3 de fevereiro e o pacote não tem Ave Regina caelorum
- **WHEN** o usuário liga o canto
- **THEN** toca a Salve Regina e o crédito nomeia a Salve Regina

### Requirement: Chant preference persistence
The app SHALL persist the chant toggle across restarts. Playback after a restart SHALL start only when the saved value is on and the prayer screen is open.

#### Scenario: Preference survives restart
- **GIVEN** o usuário ligou o canto
- **WHEN** fecha o app e abre de novo na seleção
- **THEN** o interruptor continua ligado e nenhum canto toca até ele entrar na oração

#### Scenario: Off stays off
- **GIVEN** o usuário desligou o canto depois de tê-lo usado
- **WHEN** fecha o app e abre de novo
- **THEN** o interruptor continua desligado e nenhum canto toca

### Requirement: Foreground-only chant
The app SHALL play the chant only while the prayer screen is in the foreground and SHALL pause it when the app leaves the foreground or the user leaves prayer, without turning the toggle off.

#### Scenario: Pause when leaving the app
- **GIVEN** o canto está tocando
- **WHEN** o app vai para segundo plano ou a tela bloqueia
- **THEN** o canto pausa e o interruptor permanece ligado

#### Scenario: Resume when returning
- **GIVEN** o canto estava ligado, pausou porque o app saiu de primeiro plano, e a oração continua aberta
- **WHEN** o usuário volta ao app
- **THEN** a antífona da data local retoma o loop em volume baixo

### Requirement: Chant attribution
The app SHALL show, on the selection screen next to the chant toggle, the performer, the work title, and the license name of the recording for the local date. The prayer screen MUST NOT show the chant toggle or that credit.

#### Scenario: Credit matches the playing recording
- **GIVEN** a Alma Redemptoris Mater está tocando
- **WHEN** o usuário vê o interruptor na seleção
- **THEN** o crédito nomeia Rick Dechance, a Alma Redemptoris Mater e a licença dessa gravação

#### Scenario: Credit follows the Salve Regina fallback
- **GIVEN** a data pediria a Regina caeli e o pacote não a tem, então a Salve Regina está tocando
- **WHEN** o usuário vê o interruptor
- **THEN** o crédito nomeia Les Petits Chanteurs de Passy, a Salve Regina e a licença dessa gravação
