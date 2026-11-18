# Spec Delta

## ADDED Requirements

### Requirement: Citation sources
For each passage and commentary shown in the meditation, the system SHALL offer “Ler no contexto” or “Ver a fonte”, which opens a sheet with the full reference and a link to the full text. Translation notes stored with a source MUST appear in the sheet, not in the line under the commentary.

#### Scenario: Biblical passage
- **GIVEN** a passagem é “Lc 1, 26-27”
- **WHEN** o usuário toca “Ler no contexto”
- **THEN** a ficha mostra a referência, a tradução usada e um botão para ler São Lucas, capítulo 1

#### Scenario: Long translation note
- **GIVEN** a fonte do comentário traz uma nota de tradução entre parênteses
- **WHEN** o comentário aparece
- **THEN** a linha sob o comentário mostra só autor e obra, e a nota aparece por inteiro na ficha

### Requirement: Citation link targets
The citation link SHALL point to the official or reference edition when one is known: for the Catechism, the Portuguese page on vatican.va that contains the paragraph; for the Summa Theologiae, the cited question and article; for documents of the Magisterium, the text on vatican.va. Otherwise it SHALL be a web search for the author and the work, labelled as a search.

#### Scenario: Catechism paragraph
- **GIVEN** o comentário é do Catecismo, “CIC 652”
- **WHEN** o usuário toca “Ver a fonte”
- **THEN** a ficha mostra “Catecismo da Igreja Católica”, “CIC 652” e um botão que abre a página do Catecismo em vatican.va que contém o § 652

#### Scenario: Summa article
- **GIVEN** o comentário cita “Suma Teológica, III, q. 30, a. 1”
- **WHEN** o usuário abre a fonte
- **THEN** o link abre a questão 30 da terceira parte, no artigo 1

#### Scenario: No online edition
- **GIVEN** o comentário é um sermão sem edição online conhecida
- **WHEN** o usuário abre a fonte
- **THEN** o botão diz “Procurar o texto completo” e abre uma busca pelo autor e pela obra
