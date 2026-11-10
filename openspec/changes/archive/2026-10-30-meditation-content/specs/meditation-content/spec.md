# Spec Delta

## ADDED Requirements

### Requirement: Remote content takes precedence over embedded fallback
When Supabase is configured and returns meditation content for a mystery, the app SHALL use that remote content for passages, commentaries, images, and deeper references. Embedded assets and catalogs SHALL be used only when remote data is unavailable, empty for the requested facet, or the fetch fails.

#### Scenario: Remote images used when present
- **GIVEN** the device has network access and Supabase returns one or more image rows for the current mystery
- **WHEN** the user prays that mystery
- **THEN** background images and credits come from the remote rows, not from embedded gallery files

#### Scenario: Embedded fallback on fetch failure
- **GIVEN** Supabase is configured but the content query fails or returns no rows for the mystery
- **WHEN** the user prays that mystery
- **THEN** the app falls back to embedded content for that facet if available, without blocking the prayer flow

#### Scenario: Offline without remote cache
- **GIVEN** the device has no network and there is no cached remote content for the mystery
- **WHEN** the user prays that mystery
- **THEN** embedded fallback is used where defined; fixed prayers remain available per `rosary-prayer`

### Requirement: Stable mystery identity for content lookup
The system SHALL resolve meditation content for a mystery whether the session uses an embedded slug id (e.g. `joyful-1`) or a Supabase UUID, using stable keys (`type` + `sort_order` within the active mystery set, or an equivalent canonical field stored in Supabase).

#### Scenario: UUID mystery loads same content as slug
- **GIVEN** Supabase stores mysteries with UUID ids and the embedded slug `joyful-1` maps to type `joyful` and sort order `1`
- **WHEN** the user prays that mystery from either id source
- **THEN** the same passages, commentaries, and images are loaded

#### Scenario: Unknown mystery id without mapping
- **GIVEN** a mystery id cannot be mapped to content keys
- **WHEN** remote and embedded content are requested
- **THEN** the app uses only generic fallbacks (e.g. default background) and does not crash

### Requirement: Image rotation during the decade
When multiple images exist for a mystery, the app SHALL advance the background image during the decade according to a configured interval of Hail Mary steps (default: change every two completed Hail Mary indices within the current decade).

#### Scenario: Two Hail Marys per image
- **GIVEN** five images ordered for the mystery and interval two
- **WHEN** the user is on Hail Mary indices 1–2, 3–4, 5–6, 7–8, and 9–10 respectively
- **THEN** the background shows image slots 0 through 4 in order

#### Scenario: Announcement and Our Father
- **GIVEN** multiple images exist for the mystery
- **WHEN** the user is on the mystery announcement or the decade Our Father (index 0)
- **THEN** the first image in the ordered set is shown

#### Scenario: Single remote image
- **GIVEN** only one image row exists for the mystery
- **WHEN** the user advances through the decade
- **THEN** that image remains the background

### Requirement: Per-image presentation metadata
Each image entry SHALL support presentation metadata sufficient for full-bleed display without a single global crop rule (e.g. resize mode and optionally pre-cropped asset URL or documented lateral crop applied to that artwork only).

#### Scenario: Mixed aspect artworks
- **GIVEN** one mystery has both wide and tall artworks with different presentation metadata
- **WHEN** the background switches between them during the decade
- **THEN** each image is displayed according to its own metadata so figures are not cropped identically by a shared percentage

#### Scenario: Credit follows active image
- **WHEN** the background image changes during the decade
- **THEN** the visible credit reflects title and artist of the active image

### Requirement: Meditation panel in the prayer flow
During mystery steps, the app SHALL show the current passage and commentary (when data exists) alongside the fixed prayer text, without advancing the rosary step when the user requests another passage or commentary.

#### Scenario: Initial meditation bundle
- **WHEN** the user enters a mystery step with at least one passage and one commentary
- **THEN** one passage and one commentary are shown with their references and attribution

#### Scenario: Another passage
- **WHEN** the user requests another passage and more than one exists
- **THEN** a different passage for that mystery is shown and the current prayer step index is unchanged

#### Scenario: Another commentary
- **WHEN** the user requests another commentary and more than one exists
- **THEN** a different commentary is shown and the current prayer step index is unchanged

#### Scenario: No extra passages
- **GIVEN** only one passage exists
- **WHEN** the user requests another passage
- **THEN** the app keeps showing the same passage or disables the control with clear feedback

### Requirement: Deeper study from prayer
When deeper references exist for the current mystery, the app SHALL offer “Quero me aprofundar” and list titles, descriptions, and URLs or bibliographic references without leaving the rosary session.

#### Scenario: Open deeper list
- **WHEN** the user selects deeper study and references exist
- **THEN** the list for that mystery is displayed in an overlay or modal

#### Scenario: No deeper references
- **GIVEN** no deeper rows exist for the mystery
- **WHEN** the prayer screen is shown
- **THEN** the deeper study action is hidden or disabled

## MODIFIED Requirements

### Requirement: Dynamic combination at prayer time
The app SHALL present a combination of passage, commentary, and image during prayer, SHALL rotate images during the decade when multiple images exist (per image rotation requirement), and SHALL allow the user to request another passage or another commentary without leaving the flow.

#### Scenario: Another passage
- **WHEN** the user asks for another passage during a mystery
- **THEN** a different passage for that mystery is shown if available

#### Scenario: Another commentary
- **WHEN** the user asks for another commentary during a mystery
- **THEN** a different commentary for that mystery is shown if available

#### Scenario: Image changes while swapping text
- **GIVEN** multiple images and multiple passages exist
- **WHEN** the user requests another passage without advancing the Hail Mary step
- **THEN** the background image remains tied to the current Hail Mary interval, not to the passage index
