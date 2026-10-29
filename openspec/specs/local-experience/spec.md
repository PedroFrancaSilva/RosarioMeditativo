# Local Experience Specification

## Purpose

Cover on-device persistence: rosary completion counter, optional Gregorian audio, React Query cache, and basic offline content behavior.

## Requirements

### Requirement: Rosary completion counter
The system SHALL maintain a local count of completed full rosaries, incrementing when a full rosary session finishes, without user accounts.

#### Scenario: Increment on completion
- **WHEN** the user completes all mysteries in a full rosary session
- **THEN** the local counter increases by one and persists across app restarts

### Requirement: Gregorian background audio
The app SHALL provide a simple toggle for optional low-volume looping Gregorian chant background audio using tracks suitable for public-domain or free use.

#### Scenario: Audio toggle on
- **WHEN** the user enables background chant
- **THEN** audio plays in a loop at low volume until disabled

#### Scenario: Audio toggle off
- **WHEN** the user disables background chant
- **THEN** playback stops

### Requirement: Remote data caching
The app SHALL use TanStack Query for Supabase-backed content and SHALL cache previously fetched data for reuse.

#### Scenario: Cached replay
- **WHEN** the user revisits content already loaded in the session or cache
- **THEN** the app may serve cached data while optionally refreshing in the background

### Requirement: Basic offline packages
The app SHALL download a base content package on first launch (mysteries plus minimum content), cache viewed dynamic content, expose an action to download available content for offline use, and keep fixed prayers available offline at all times.

#### Scenario: First launch bootstrap
- **WHEN** the app opens for the first time with network
- **THEN** it initiates download of the base mystery and minimum content package

#### Scenario: Explicit offline download
- **WHEN** the user chooses to download content for offline
- **THEN** currently available remote content is persisted locally for later offline use
