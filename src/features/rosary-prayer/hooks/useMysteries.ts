import { useQuery } from '@tanstack/react-query';

import { fetchMysteriesBySet, getEmbeddedCatalog } from '@/data/repositories/mysteryRepository';
import type { MysterySet } from '@/domain/rosary/types';

export function mysteriesQueryKey(set: MysterySet) {
  return ['mysteries', set] as const;
}

export function useMysteries(set: MysterySet) {
  const query = useQuery({
    queryKey: mysteriesQueryKey(set),
    queryFn: () => fetchMysteriesBySet(set),
    placeholderData: getEmbeddedCatalog(set),
  });

  return {
    ...query,
    data: query.data ?? getEmbeddedCatalog(set),
  };
}
