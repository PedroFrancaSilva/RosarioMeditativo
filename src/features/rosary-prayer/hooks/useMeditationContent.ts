import { useQuery } from '@tanstack/react-query';

import { fetchMysteryMeditationBundle } from '@/data/repositories/meditationContentRepository';
import type { MysteryMeditationBundle, MysteryType } from '@/domain/mystery';
import { resolveMysteryContentTarget } from '@/domain/resolveMysteryContentTarget';

export function useMeditationContent(
  mysteryId: string | null | undefined,
  hints?: { type?: MysteryType; sortOrder?: number },
) {
  const target = resolveMysteryContentTarget(mysteryId ?? null, hints);

  return useQuery<MysteryMeditationBundle>({
    queryKey: ['meditation', target?.supabaseMysteryId ?? 'none', target?.contentSlug ?? 'none', 'bundle'],
    queryFn: () => fetchMysteryMeditationBundle(target!),
    enabled: Boolean(target),
    staleTime: 1000 * 60 * 10,
  });
}
