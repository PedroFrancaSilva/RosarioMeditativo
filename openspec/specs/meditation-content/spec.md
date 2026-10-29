# Meditation Content Specification

## Purpose

Describe dynamic meditation material per mystery (Scripture passages, saint and papal commentaries, images, and optional deeper references) loaded from Supabase and composed in the prayer experience.

## Requirements

### Requirement: Content per mystery
For each mystery, the backend SHALL provide multiple short biblical passages, multiple commentaries with author and source, one or more images with title and artist, and optional deeper reference entries.

#### Scenario: Passage fields
- **WHEN** content is fetched for a mystery
- **THEN** each passage includes text, scriptural reference, and display order

#### Scenario: Commentary fields
- **WHEN** content is fetched for a mystery
- **THEN** each commentary includes text, author, source, and display order

#### Scenario: Image metadata
- **WHEN** an image is associated with a mystery
- **THEN** the app receives URL, title, artist, and optional description suitable for background display

### Requirement: Dynamic combination at prayer time
The app SHALL present a combination of passage, commentary, and image during prayer and SHALL allow the user to request another passage or another commentary without leaving the flow.

#### Scenario: Another passage
- **WHEN** the user asks for another passage during a mystery
- **THEN** a different passage for that mystery is shown if available

#### Scenario: Another commentary
- **WHEN** the user asks for another commentary during a mystery
- **THEN** a different commentary for that mystery is shown if available

### Requirement: Deeper study entry
The system SHALL offer a "Quero me aprofundar" action that shows deeper references (titles, descriptions, URLs or bibliographic references) for the current mystery when data exists.

#### Scenario: Open deeper references
- **WHEN** the user selects deeper study
- **THEN** the list of deeper references for that mystery is displayed

### Requirement: Anonymous read of content
Supabase content tables SHALL allow read access to anonymous clients via RLS policies; MVP SHALL NOT require user login to read meditation content.

#### Scenario: Anon fetch
- **WHEN** the app queries content with the anon key
- **THEN** mysteries, passages, commentaries, images, and deeper references are readable
