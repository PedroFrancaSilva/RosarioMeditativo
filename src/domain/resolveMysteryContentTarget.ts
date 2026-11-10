import type { Mystery, MysteryType } from '@/domain/mystery';
import { resolveEmbeddedMysteryContentKey } from '@/domain/resolveEmbeddedMysteryContentKey';

export type MysteryContentTarget = {
  /** Slug offline `type-sortOrder` (ex. joyful-1). */
  contentSlug: string;
  /** Id usado nas queries Supabase (UUID remoto ou slug embutido). */
  supabaseMysteryId: string;
  type: MysteryType;
  sortOrder: number;
};

export function mysteryContentSlug(type: MysteryType, sortOrder: number): string {
  return `${type}-${sortOrder}`;
}

export function resolveMysteryContentTarget(
  mysteryId: string | null | undefined,
  hints?: { type?: MysteryType; sortOrder?: number },
): MysteryContentTarget | null {
  if (!mysteryId || hints?.type == null || hints.sortOrder == null) return null;

  const contentSlug =
    resolveEmbeddedMysteryContentKey(mysteryId, hints) ?? mysteryContentSlug(hints.type, hints.sortOrder);

  return {
    contentSlug,
    supabaseMysteryId: mysteryId,
    type: hints.type,
    sortOrder: hints.sortOrder,
  };
}

export function resolveMysteryContentTargetFromMystery(mystery: Mystery | undefined): MysteryContentTarget | null {
  if (!mystery) return null;
  return resolveMysteryContentTarget(mystery.id, {
    type: mystery.type,
    sortOrder: mystery.sortOrder,
  });
}
