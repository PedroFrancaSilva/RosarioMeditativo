import { EMBEDDED_MYSTERY_GALLERIES } from '@/shared/constants/prayerAssets';
import type { MysteryType } from '@/domain/mystery';

/**
 * Chaves embutidas usam slug `{type}-{sortOrder}` (ex. `joyful-1`).
 * Mistérios vindos do Supabase usam UUID — resolve para o mesmo slug offline.
 */
export function resolveEmbeddedMysteryContentKey(
  mysteryId: string | null | undefined,
  hints?: { type?: MysteryType; sortOrder?: number },
): string | null {
  if (!mysteryId) return null;
  if (EMBEDDED_MYSTERY_GALLERIES[mysteryId]) return mysteryId;
  if (hints?.type != null && hints?.sortOrder != null) {
    const slug = `${hints.type}-${hints.sortOrder}`;
    if (EMBEDDED_MYSTERY_GALLERIES[slug]) return slug;
  }
  return mysteryId;
}

export function hasEmbeddedMysteryGallery(contentKey: string | null): boolean {
  if (!contentKey) return false;
  return Boolean(EMBEDDED_MYSTERY_GALLERIES[contentKey]?.images.length);
}
