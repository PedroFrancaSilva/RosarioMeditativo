# Spec Delta

## ADDED Requirements

### Requirement: Meditation block on the prayer screen
The prayer screen SHALL show meditation content (passage and commentary when available) in the same layout as the guided prayer text, preserving the mystery label, decade progress map, navigation gestures, and background artwork.

#### Scenario: Meditation visible at mystery announcement
- **GIVEN** meditation content exists for the current mystery
- **WHEN** the user is on the mystery announcement step (before the decade prayers)
- **THEN** passage and/or commentary are visible with the announcement text so the user can reflect before the decade

#### Scenario: Meditation hidden during decade prayers
- **GIVEN** the user has advanced past the mystery announcement into Pai-Nosso, Ave-Marias, or Glória
- **WHEN** the prayer screen is shown
- **THEN** the meditation block is not shown so the artwork and prayer text remain the focus

#### Scenario: Gestures unchanged
- **GIVEN** the meditation block is visible
- **WHEN** the user swipes to advance or go back a prayer step
- **THEN** rosary navigation behaves as defined in navigation requirements; swapping passage or commentary alone does not trigger step change

## MODIFIED Requirements

### Requirement: Prayer screen layout
The prayer screen SHALL show a full-bleed background image related to the current mystery, a dark gradient or semi-transparent panel for readability, expandable prayer text, the name of the mystery in progress, a rosary-shaped progress of the session's decades, and when meditation content exists, a visible passage/commentary area and artwork credit for the active image.

#### Scenario: Background image
- **WHEN** the user is praying a mystery step
- **THEN** a classic Catholic artwork image for that mystery is visible as the background

#### Scenario: Text summary default
- **WHEN** the prayer step loads
- **THEN** only the beginning of the prayer is shown until the user taps the text

#### Scenario: Text expand
- **WHEN** the user taps the prayer text
- **THEN** the full prayer text is shown and the current step does not change

#### Scenario: Mystery name always visible
- **GIVEN** the user is on any step that belongs to a mystery, including a Hail Mary
- **WHEN** the prayer screen is shown
- **THEN** the name of that mystery stays visible, distinct from the title of the current prayer

#### Scenario: Opening has no mystery name
- **GIVEN** the user is praying the full rosary and is still on the opening prayers
- **WHEN** the prayer screen is shown
- **THEN** the persistent label indicates the opening and does not name a mystery yet

#### Scenario: Artwork credit
- **GIVEN** the active background has title and artist metadata
- **WHEN** the prayer screen is shown during a mystery step
- **THEN** a concise credit line for the current artwork is visible
