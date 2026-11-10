# Spec Delta

## MODIFIED Requirements

### Requirement: Prayer screen layout
The prayer screen SHALL show a full-bleed background image related to the current mystery, a dark gradient or semi-transparent panel for readability, expandable prayer text, the name of the mystery in progress, and a rosary-shaped progress of the session's decades.

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

### Requirement: Navigation gestures
The system SHALL advance one prayer step when the user activates the forward control or swipes left, and SHALL go back one step when the user activates the back control or swipes right. Tapping the prayer text MUST NOT change the step.

#### Scenario: Advance
- **WHEN** the user activates the forward control or swipes left
- **THEN** the next prayer step is shown with a smooth transition

#### Scenario: Go back
- **WHEN** the user activates the back control or swipes right
- **THEN** the previous prayer step is shown

#### Scenario: Text tap does not advance
- **GIVEN** the user is on a prayer step that is not the last
- **WHEN** the user taps the prayer text to expand or collapse it
- **THEN** the step index stays the same

#### Scenario: No forward past the end
- **GIVEN** the user is on the completion step
- **WHEN** the prayer screen is shown
- **THEN** the forward and back step controls for the prayer sequence are not offered as a way to leave the completion content, and a separate action returns home

### Requirement: Decade bead counter
The system SHALL render the session as a rosary: one group of beads per mystery in the session, with the current decade distinguished, the current bead marked, and completed beads filled.

#### Scenario: Progress within decade
- **WHEN** the user advances through Hail Marys in a decade
- **THEN** the rosary shows that decade as current, marks the active bead, and fills beads already prayed in that decade

#### Scenario: Other decades stay visible
- **GIVEN** the session has more than one mystery
- **WHEN** the user is inside one decade
- **THEN** the other mysteries of the session remain visible as separate groups, with completed decades filled and upcoming decades not yet filled

#### Scenario: Single mystery session
- **GIVEN** the user started a single mystery
- **WHEN** the prayer screen is shown during that decade
- **THEN** the rosary shows only that mystery's decade

## ADDED Requirements

### Requirement: Skip to next mystery
The system SHALL offer a control that jumps to the announcement of the next mystery, skipping the remaining steps of the current stretch. The control MUST NOT appear when no later mystery exists in the session.

#### Scenario: Jump from the middle of a decade
- **GIVEN** the user is on a step of a mystery that is not the last in the session
- **WHEN** the user activates skip to the next mystery
- **THEN** the flow shows the announcement of the following mystery and does not require the remaining prayers of the current decade

#### Scenario: Jump from the opening
- **GIVEN** the user is on the opening prayers of a full rosary
- **WHEN** the user activates skip to the next mystery
- **THEN** the flow shows the announcement of the first mystery

#### Scenario: No skip on the last mystery
- **GIVEN** the user is on the last mystery of the session, or on a single-mystery session
- **WHEN** the prayer screen is shown
- **THEN** the skip-to-next-mystery control is not shown

#### Scenario: Skip does not expand or collapse text
- **WHEN** the user activates skip to the next mystery
- **THEN** the destination step loads with the prayer text collapsed to its summary
