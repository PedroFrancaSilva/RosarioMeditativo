import { BUNDLED_CHANT_IDS, type BundledChantId } from '@/domain/chant/chantCredits';

export const chantSources = {
  salve: require('../../../assets/audio/salve-regina.mp3'),
  alma: require('../../../assets/audio/alma-redemptoris-mater.mp3'),
  'regina-caeli': require('../../../assets/audio/regina-caeli.mp3'),
} as const satisfies Record<BundledChantId, number>;

const sourceIds = Object.keys(chantSources);
for (const id of BUNDLED_CHANT_IDS) {
  if (!sourceIds.includes(id)) {
    throw new Error(`Faixa do catálogo sem arquivo: ${id}`);
  }
}
