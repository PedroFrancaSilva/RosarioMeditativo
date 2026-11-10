import { getEmbeddedMysteryById } from '@/data/repositories/mysteryRepository';
import type { MysteryType } from '@/domain/mystery';
import { MYSTERY_SET_LABELS, TERCO_TITLES } from '@/domain/mysteryTerco';
import type { IncompleteRosarySession } from '@/domain/rosary/incompleteRosarySession';

export function describeIncompleteSession(session: IncompleteRosarySession): string {
  if (session.mode === 'full') {
    return `o ${MYSTERY_SET_LABELS[session.set].toLowerCase()} completo`;
  }
  if (session.mode === 'single') {
    const id = session.mysteryId ?? session.mysteryIds[0];
    const mystery = id ? getEmbeddedMysteryById(id) : undefined;
    if (mystery) return `o mistério “${mystery.name}”`;
    return 'um mistério';
  }
  if (session.mode === 'tercio' && session.mysteryType) {
    return `o terço dos ${TERCO_TITLES[session.mysteryType].toLowerCase()}`;
  }
  return 'uma oração';
}

export type PrayerStartIntent = {
  mode: IncompleteRosarySession['mode'];
  set: IncompleteRosarySession['set'];
  mysteryId?: string;
  mysteryType?: MysteryType;
};
