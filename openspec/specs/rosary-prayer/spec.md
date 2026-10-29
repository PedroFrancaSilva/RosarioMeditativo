# Rosary Prayer Specification

## Purpose

Define how users choose mystery sets, navigate the step-by-step prayer flow, and see decade bead progress on the prayer screen. Android-first; no authentication in MVP.

## Requirements

### Requirement: Mystery selection modes
The system SHALL let the user start prayer from a single mystery or a full rosary, and SHALL offer a clear choice between classic mysteries (Joyful, Sorrowful, Glorious) and the John Paul II set including Luminous.

#### Scenario: Single mystery
- **WHEN** the user selects one mystery from the catalog
- **THEN** the prayer flow starts at that mystery's opening prayers and continues through its decade

#### Scenario: Full rosary
- **WHEN** the user chooses to pray the full rosary for a selected mystery set
- **THEN** the flow covers all mysteries in that set in order until completion

#### Scenario: Classic vs JP II sets
- **WHEN** the user opens mystery set selection
- **THEN** both classic three-set grouping and the four-set grouping including Luminous are available with clear labels

### Requirement: Guided prayer without memorization
The system SHALL display the current prayer text so users who do not know prayers by heart can follow along step by step.

#### Scenario: Current step visible
- **WHEN** the user is on any step in the flow
- **THEN** the app shows which prayer is active and its text (summary or full per expand rule)

### Requirement: Prayer screen layout
The prayer screen SHALL show a full-bleed background image related to the current mystery, a dark gradient or semi-transparent panel for readability, expandable prayer text, and a bead counter for the current decade.

#### Scenario: Background image
- **WHEN** the user is praying a mystery step
- **THEN** a classic Catholic artwork image for that mystery is visible as the background

#### Scenario: Text summary default
- **WHEN** the prayer step loads
- **THEN** only the beginning of the prayer is shown until the user taps the text

#### Scenario: Text expand
- **WHEN** the user taps the prayer text
- **THEN** the full prayer text is shown

### Requirement: Navigation gestures
The system SHALL advance to the next prayer when the user taps the central area or swipes left, and SHOULD go back one step when the user swipes right.

#### Scenario: Advance
- **WHEN** the user taps the main prayer area or swipes left
- **THEN** the next prayer step is shown with a smooth transition

#### Scenario: Go back
- **WHEN** the user swipes right
- **THEN** the previous prayer step is shown

### Requirement: Decade bead counter
The system SHALL render a large touch-friendly bead row for the current decade, highlighting the active decade's beads, marking the current bead, and filling completed beads.

#### Scenario: Progress within decade
- **WHEN** the user advances through Hail Marys in a decade
- **THEN** the bead counter reflects current position and completed beads in that decade

### Requirement: Fixed prayers offline
Standard prayers (Our Father, Hail Mary, Glory Be, Creed, etc.) SHALL ship in the app with short and full text variants and SHALL be available without network access.

#### Scenario: Offline fixed prayers
- **WHEN** the device has no network
- **THEN** fixed prayer texts remain available for the prayer flow
