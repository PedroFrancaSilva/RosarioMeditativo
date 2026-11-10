export const MYSTERY_ROW_PADDING_X = 8;
export const MAX_MYSTERY_BEAD = 26;
export const MIN_MYSTERY_BEAD = 9;
export const MYSTERY_GAP_MAX = 4;
export const MYSTERY_GAP_MIN = 1;

/** Espaço extra por conta (slot > diâmetro) + margem do scale 1.1. */
export function mysteryBeadSlotExtra(diameter: number): number {
  return Math.max(4, Math.ceil(diameter * 0.12) + 2);
}

export type MysteryRowLayout = {
  beadSize: number;
  gap: number;
  slotExtra: number;
};

/**
 * Largura total: count * (beadSize + slotExtra) + (count - 1) * gap ≤ availableWidth
 */
export function computeMysteryRowLayout(
  count: number,
  availableWidth: number,
): MysteryRowLayout {
  if (count <= 0 || availableWidth <= 0) {
    return { beadSize: MAX_MYSTERY_BEAD, gap: MYSTERY_GAP_MAX, slotExtra: 6 };
  }

  const tryGap = (gap: number): MysteryRowLayout | null => {
    const slotExtra = mysteryBeadSlotExtra(MAX_MYSTERY_BEAD);
    let beadSize =
      (availableWidth - (count - 1) * gap) / count - slotExtra;

    if (beadSize >= MIN_MYSTERY_BEAD) {
      beadSize = Math.min(MAX_MYSTERY_BEAD, beadSize);
      return {
        beadSize,
        gap,
        slotExtra: mysteryBeadSlotExtra(beadSize),
      };
    }

    const tightExtra = mysteryBeadSlotExtra(MIN_MYSTERY_BEAD);
    beadSize = (availableWidth - (count - 1) * gap) / count - tightExtra;
    beadSize = Math.min(MAX_MYSTERY_BEAD, Math.max(MIN_MYSTERY_BEAD, beadSize));
    const finalExtra = mysteryBeadSlotExtra(beadSize);

    const totalWidth = count * (beadSize + finalExtra) + (count - 1) * gap;
    if (totalWidth <= availableWidth + 0.5) {
      return { beadSize, gap, slotExtra: finalExtra };
    }
    return null;
  };

  for (const gap of [MYSTERY_GAP_MAX, MYSTERY_GAP_MIN]) {
    const layout = tryGap(gap);
    if (layout) return layout;
  }

  const gap = MYSTERY_GAP_MIN;
  const slotExtra = mysteryBeadSlotExtra(MIN_MYSTERY_BEAD);
  const beadSize = Math.max(
    MIN_MYSTERY_BEAD,
    (availableWidth - (count - 1) * gap) / count - slotExtra,
  );
  return { beadSize, gap, slotExtra: mysteryBeadSlotExtra(beadSize) };
}

export function mysteryRowTotalWidth(
  count: number,
  layout: MysteryRowLayout,
): number {
  return count * (layout.beadSize + layout.slotExtra) + (count - 1) * layout.gap;
}
