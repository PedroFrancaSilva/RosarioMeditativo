# Spec Delta

## ADDED Requirements

### Requirement: Indulgence guide
The app SHALL offer an offline page that explains what an indulgence is, the conditions for a plenary indulgence, and how the Rosary qualifies. The page MUST NOT state or imply that the user has obtained an indulgence.

#### Scenario: Conditions are shown
- **WHEN** o usuário abre a página de indulgências
- **THEN** ela mostra a obra prescrita, a confissão sacramental, a Comunhão, a oração pelas intenções do Papa e o desapego de todo pecado, mesmo venial

#### Scenario: Rosary prayed alone
- **WHEN** o usuário lê a seção sobre o Rosário
- **THEN** ela informa que a indulgência é plenária na igreja, no oratório, em família, em comunidade ou em grupo, com cinco dezenas sem interrupção e meditação, e parcial nos demais casos

#### Scenario: Missing condition
- **WHEN** o usuário lê as condições
- **THEN** a página informa que, faltando a disposição plena ou alguma condição, a indulgência é apenas parcial

#### Scenario: No network
- **GIVEN** o aparelho está sem rede
- **WHEN** o usuário abre a página
- **THEN** todo o conteúdo continua disponível

### Requirement: Indulgence calendar
The guide SHALL list the plenary indulgence days of the next twelve months in date order, without past dates, computing movable dates locally, and SHALL highlight the current or next day.

#### Scenario: Movable dates
- **GIVEN** o ano é 2027
- **WHEN** o calendário é calculado
- **THEN** o Domingo da Divina Misericórdia é 4 de abril e Pentecostes é 16 de maio

#### Scenario: Multi-day period
- **GIVEN** a data é 5 de novembro
- **WHEN** o calendário é mostrado
- **THEN** o período de 1 a 8 de novembro aparece como atual

#### Scenario: Dates across the new year
- **GIVEN** a data é 23 de novembro de 2026
- **WHEN** o calendário é mostrado
- **THEN** a lista começa em 31 de dezembro, segue por 2027 e mostra o ano nas datas de 2027
