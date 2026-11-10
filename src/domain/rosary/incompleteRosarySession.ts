import { getEmbeddedCatalog, getEmbeddedMysteryById } from '@/data/repositories/mysteryRepository';
import type { Mystery, MysteryType } from '@/domain/mystery';
import { buildPrayerSteps } from '@/domain/rosary/buildPrayerSteps';
import type { MysterySet, RosaryMode, RosarySessionConfig } from '@/domain/rosary/types';

export const INCOMPLETE_SESSION_SCHEMA_VERSION = 1 as const;

export type IncompleteRosarySession = {
  schemaVersion: typeof INCOMPLETE_SESSION_SCHEMA_VERSION;
  mode: RosaryMode;
  set: MysterySet;
  mysteryIds: string[];
  stepIndex: number;
  mysteryId?: string;
  mysteryType?: MysteryType;
};

function isRosaryMode(value: unknown): value is RosaryMode {
  return value === 'full' || value === 'single' || value === 'tercio';
}

function isMysterySet(value: unknown): value is MysterySet {
  return value === 'classic' || value === 'jp2';
}

function isMysteryType(value: unknown): value is MysteryType {
  return (
    value === 'joyful' ||
    value === 'sorrowful' ||
    value === 'glorious' ||
    value === 'luminous'
  );
}

/** Slug estável (`joyful-1`), mesmo quando o catálogo remoto usa UUID. */
export function embeddedMysterySlug(mystery: Pick<Mystery, 'id' | 'type' | 'sortOrder'>): string | null {
  if (getEmbeddedMysteryById(mystery.id)) return mystery.id;
  const slug = `${mystery.type}-${mystery.sortOrder}`;
  return getEmbeddedMysteryById(slug) ? slug : null;
}

export function snapshotFromConfig(
  config: RosarySessionConfig,
  stepIndex: number,
): IncompleteRosarySession {
  const mysteryIds = config.mysteries.map((mystery) => embeddedMysterySlug(mystery) ?? mystery.id);
  const base: IncompleteRosarySession = {
    schemaVersion: INCOMPLETE_SESSION_SCHEMA_VERSION,
    mode: config.mode,
    set: config.set,
    mysteryIds,
    stepIndex,
  };
  if (config.mode === 'single' && mysteryIds[0]) {
    return { ...base, mysteryId: mysteryIds[0] };
  }
  if (config.mode === 'tercio' && config.mysteries[0]) {
    return { ...base, mysteryType: config.mysteries[0].type };
  }
  return base;
}

export function configFromIncompleteSession(
  session: IncompleteRosarySession,
): RosarySessionConfig | null {
  const catalog = getEmbeddedCatalog(session.set);
  const mysteries: Mystery[] = [];
  for (const id of session.mysteryIds) {
    const mystery = catalog.find((m) => m.id === id);
    if (!mystery) return null;
    mysteries.push(mystery);
  }
  if (session.mode === 'single') {
    if (mysteries.length !== 1) return null;
    if (session.mysteryId && session.mysteryId !== mysteries[0]?.id) return null;
  }
  if (session.mode === 'tercio') {
    if (!session.mysteryType) return null;
    if (mysteries.some((m) => m.type !== session.mysteryType)) return null;
  }
  return { mode: session.mode, set: session.set, mysteries };
}

export function validateIncompleteSession(
  session: IncompleteRosarySession,
): IncompleteRosarySession | null {
  const config = configFromIncompleteSession(session);
  if (!config) return null;
  const steps = buildPrayerSteps(config);
  if (session.stepIndex >= steps.length) return null;
  const step = steps[session.stepIndex];
  if (!step || step.kind === 'completion') return null;
  return session;
}

export function normalizeIncompleteSession(data: unknown): IncompleteRosarySession | null {
  if (!data || typeof data !== 'object') return null;
  const record = data as Record<string, unknown>;
  if (record.schemaVersion !== INCOMPLETE_SESSION_SCHEMA_VERSION) return null;
  if (!isRosaryMode(record.mode) || !isMysterySet(record.set)) return null;
  if (
    !Array.isArray(record.mysteryIds) ||
    record.mysteryIds.length === 0 ||
    record.mysteryIds.some((id) => typeof id !== 'string')
  ) {
    return null;
  }
  if (
    typeof record.stepIndex !== 'number' ||
    !Number.isInteger(record.stepIndex) ||
    record.stepIndex < 0
  ) {
    return null;
  }
  const session: IncompleteRosarySession = {
    schemaVersion: INCOMPLETE_SESSION_SCHEMA_VERSION,
    mode: record.mode,
    set: record.set,
    mysteryIds: record.mysteryIds as string[],
    stepIndex: record.stepIndex,
  };
  if (record.mysteryId !== undefined) {
    if (typeof record.mysteryId !== 'string') return null;
    session.mysteryId = record.mysteryId;
  }
  if (record.mysteryType !== undefined) {
    if (!isMysteryType(record.mysteryType)) return null;
    session.mysteryType = record.mysteryType;
  }
  return session;
}

export function serializeIncompleteSession(session: IncompleteRosarySession): string {
  return JSON.stringify(session);
}

export function parseIncompleteSession(raw: string | null | undefined): IncompleteRosarySession | null {
  if (raw == null || raw === '') return null;
  let data: unknown;
  try {
    data = JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
  const normalized = normalizeIncompleteSession(data);
  if (!normalized) return null;
  return validateIncompleteSession(normalized);
}
