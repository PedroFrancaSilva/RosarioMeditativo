# Spec Delta

## MODIFIED Requirements

### Requirement: Mystery selection modes
The system SHALL let the user start prayer from a single mystery, a full rosary, or one liturgical third (terço) of five mysteries, and SHALL offer a clear choice between classic mysteries (Joyful, Sorrowful, Glorious) and the John Paul II set including Luminous.

#### Scenario: Single mystery
- **WHEN** the user selects one mystery from the catalog
- **THEN** the prayer flow starts at that mystery's opening prayers and continues through its decade

#### Scenario: Full rosary
- **WHEN** the user chooses to pray the full rosary for a selected mystery set
- **THEN** the flow covers all mysteries in that set in order until completion

#### Scenario: Classic vs JP II sets
- **WHEN** the user opens mystery set selection
- **THEN** both classic three-set grouping and the four-set grouping including Luminous are available with clear labels

#### Scenario: One third from home
- **WHEN** the user chooses to pray one third (terço) from the home screen
- **THEN** the flow includes the standard opening prayers and the five mysteries of that third in order

## ADDED Requirements

### Requirement: Home grouped by third
The home screen SHALL present mysteries grouped by liturgical third with a visible section title, and SHALL offer starting the full rosary, one third, or a single mystery within each section.

#### Scenario: Third sections visible
- **WHEN** the user views the home catalog for a selected set
- **THEN** mysteries appear under headings for each third (e.g. Joyful, Sorrowful, Glorious, and Luminous when applicable)

#### Scenario: Start one third
- **WHEN** the user activates pray this third within a section
- **THEN** navigation starts a session with opening prayers and only that section's five mysteries
