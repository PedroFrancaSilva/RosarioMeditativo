# Spec Delta

## MODIFIED Requirements

### Requirement: Rosary completion counter
The system SHALL keep a local count of thirds prayed, without user accounts. Reaching the completion step SHALL add one third for a one-third session and one third per mystery set for a full rosary (three in the traditional set, four with the Luminous). A single-mystery session MUST NOT change the count. A session MUST be counted once, even if the completion step is shown again. The count SHALL persist across restarts and SHALL be shown on the home (when greater than zero), on the completion step and in the settings.

#### Scenario: Increment on completion
- **WHEN** o usuário conclui um terço
- **THEN** o contador aumenta em um e continua assim depois de reiniciar o app

#### Scenario: Full rosary with Luminous
- **WHEN** o usuário conclui o rosário completo com os mistérios luminosos
- **THEN** o contador aumenta em quatro

#### Scenario: Single mystery does not count
- **WHEN** o usuário conclui um mistério avulso
- **THEN** o contador não muda

#### Scenario: First use
- **GIVEN** nenhum terço foi concluído
- **WHEN** a home aparece
- **THEN** a home não mostra o contador e os ajustes mostram “Nenhum terço rezado ainda”

## ADDED Requirements

### Requirement: Daily prayer reminder
The settings SHALL offer an optional daily reminder, off by default, at a local time the user chooses in 15-minute steps (20:00 until changed). Turning it on SHALL ask for notification permission when needed and SHALL schedule one local notification per day. Turning it off SHALL cancel it. Changing the time while it is on SHALL reschedule it. Without permission the switch MUST return to off and the screen MUST explain how to allow notifications. Tapping the notification SHALL open the app.

#### Scenario: Turn on
- **GIVEN** o usuário permite notificações
- **WHEN** liga “Lembrar de rezar” com a hora 06:30
- **THEN** uma notificação “Hora do terço” fica agendada todos os dias às 06:30

#### Scenario: Permission denied
- **GIVEN** o usuário recusa a permissão de notificações
- **WHEN** tenta ligar o lembrete
- **THEN** o interruptor volta a desligado e a tela explica como ativar as notificações no aparelho

#### Scenario: Turn off
- **GIVEN** o lembrete está ligado
- **WHEN** o usuário o desliga
- **THEN** nenhuma notificação diária fica agendada

#### Scenario: Change the time
- **GIVEN** o lembrete está ligado às 20:00
- **WHEN** o usuário avança 15 minutos
- **THEN** o lembrete passa a ser às 20:15, e não fica outro às 20:00
