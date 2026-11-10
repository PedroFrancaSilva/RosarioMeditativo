import type { Mystery, MysteryType } from '@/domain/mystery';
import type { MysterySet } from '@/domain/rosary/types';

type EmbeddedSeed = {
  id: string;
  name: string;
  type: MysteryType;
  sortOrder: number;
};

const EMBEDDED_MYSTERIES: EmbeddedSeed[] = [
  { id: 'joyful-1', name: 'A Anunciação', type: 'joyful', sortOrder: 1 },
  { id: 'joyful-2', name: 'A Visitação', type: 'joyful', sortOrder: 2 },
  { id: 'joyful-3', name: 'O Nascimento de Jesus', type: 'joyful', sortOrder: 3 },
  { id: 'joyful-4', name: 'A Apresentação no Templo', type: 'joyful', sortOrder: 4 },
  { id: 'joyful-5', name: 'A Perda e o Encontro de Jesus no Templo', type: 'joyful', sortOrder: 5 },
  { id: 'sorrowful-1', name: 'A Agonia de Jesus no Horto', type: 'sorrowful', sortOrder: 1 },
  { id: 'sorrowful-2', name: 'A Flagelação', type: 'sorrowful', sortOrder: 2 },
  { id: 'sorrowful-3', name: 'A Coroação de Espinhos', type: 'sorrowful', sortOrder: 3 },
  { id: 'sorrowful-4', name: 'Jesus Carrega a Cruz', type: 'sorrowful', sortOrder: 4 },
  { id: 'sorrowful-5', name: 'A Crucifixão', type: 'sorrowful', sortOrder: 5 },
  { id: 'glorious-1', name: 'A Ressurreição', type: 'glorious', sortOrder: 1 },
  { id: 'glorious-2', name: 'A Ascensão', type: 'glorious', sortOrder: 2 },
  { id: 'glorious-3', name: 'A Descida do Espírito Santo', type: 'glorious', sortOrder: 3 },
  { id: 'glorious-4', name: 'A Assunção de Nossa Senhora', type: 'glorious', sortOrder: 4 },
  { id: 'glorious-5', name: 'A Coroação de Nossa Senhora', type: 'glorious', sortOrder: 5 },
  { id: 'luminous-1', name: 'O Batismo de Jesus', type: 'luminous', sortOrder: 1 },
  { id: 'luminous-2', name: 'As Bodas de Caná', type: 'luminous', sortOrder: 2 },
  { id: 'luminous-3', name: 'O Anúncio do Reino de Deus', type: 'luminous', sortOrder: 3 },
  { id: 'luminous-4', name: 'A Transfiguração', type: 'luminous', sortOrder: 4 },
  { id: 'luminous-5', name: 'A Instituição da Eucaristia', type: 'luminous', sortOrder: 5 },
];

const CLASSIC_TYPES: MysteryType[] = ['joyful', 'sorrowful', 'glorious'];
const JP2_TYPES: MysteryType[] = ['joyful', 'luminous', 'sorrowful', 'glorious'];

function toMystery(seed: EmbeddedSeed): Mystery {
  return {
    id: seed.id,
    name: seed.name,
    type: seed.type,
    sortOrder: seed.sortOrder,
    description: null,
    meditationReady: true,
  };
}

function embeddedForSet(set: MysterySet): Mystery[] {
  const types = set === 'classic' ? CLASSIC_TYPES : JP2_TYPES;
  return EMBEDDED_MYSTERIES.filter((m) => types.includes(m.type))
    .sort((a, b) => {
      const typeOrder = types.indexOf(a.type) - types.indexOf(b.type);
      if (typeOrder !== 0) return typeOrder;
      return a.sortOrder - b.sortOrder;
    })
    .map(toMystery);
}

export async function fetchMysteriesBySet(set: MysterySet): Promise<Mystery[]> {
  const { supabase } = await import('@/data/api/supabaseClient');
  if (!supabase) {
    return embeddedForSet(set);
  }

  const types = set === 'classic' ? CLASSIC_TYPES : JP2_TYPES;
  const { data, error } = await supabase
    .from('mysteries')
    .select('id, name, type, sort_order, description, meditation_ready')
    .in('type', types)
    .order('type')
    .order('sort_order');

  if (error || !data?.length) {
    console.warn('[mysteryRepository] Supabase fetch failed, using embedded catalog.', error);
    throw error ?? new Error('Catálogo de mistérios indisponível.');
  }

  const mapped: Mystery[] = data.map((row) => ({
    id: row.id,
    name: row.name,
    type: row.type as MysteryType,
    sortOrder: row.sort_order,
    description: row.description,
    meditationReady: row.meditation_ready,
  }));

  return mapped.sort((a, b) => {
    const typeOrder = types.indexOf(a.type) - types.indexOf(b.type);
    if (typeOrder !== 0) return typeOrder;
    return a.sortOrder - b.sortOrder;
  });
}

export function getEmbeddedMysteryById(id: string): Mystery | undefined {
  const seed = EMBEDDED_MYSTERIES.find((m) => m.id === id);
  return seed ? toMystery(seed) : undefined;
}

export function getEmbeddedCatalog(set: MysterySet): Mystery[] {
  return embeddedForSet(set);
}
