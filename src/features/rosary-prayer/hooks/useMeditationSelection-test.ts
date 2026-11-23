import { act, renderHook } from '@testing-library/react-native';

import type { Commentary, Passage } from '@/domain/mystery';
import {
  drawAnotherMeditationPair,
  drawMeditationPair,
  meditationPairs,
  nextDrawPool,
  pairKey,
  useMeditationSelection,
} from '@/features/rosary-prayer/hooks/useMeditationSelection';

const passages: Passage[] = [
  { id: 'p1', mysteryId: 'm', text: 'primeira', reference: 'Lc 1', sortOrder: 0 },
  { id: 'p2', mysteryId: 'm', text: 'segunda', reference: 'Lc 2', sortOrder: 1 },
];

const commentaries: Commentary[] = [
  {
    id: 'c1',
    mysteryId: 'm',
    passageId: 'p1',
    text: 'da primeira',
    author: 'A',
    source: 's1',
    sortOrder: 0,
  },
  {
    id: 'c2',
    mysteryId: 'm',
    passageId: 'p1',
    text: 'também da primeira',
    author: 'B',
    source: 's2',
    sortOrder: 1,
  },
  {
    id: 'c3',
    mysteryId: 'm',
    passageId: 'p2',
    text: 'da segunda',
    author: 'C',
    source: 's3',
    sortOrder: 0,
  },
];

function queue(values: number[]) {
  const pending = [...values];
  return () => pending.shift() ?? 0;
}

describe('drawMeditationPair', () => {
  it('com uma passagem mostra essa, e o comentário sai só dela', () => {
    const pair = drawMeditationPair([passages[0]!], commentaries, queue([0, 0.6]));
    expect(pair.passage?.id).toBe('p1');
    expect(pair.commentary?.id).toBe('c2');
  });

  it('não pega comentário de outra passagem', () => {
    const pair = drawMeditationPair(passages, commentaries, queue([0, 0]));
    expect(pair.passage?.id).toBe('p1');
    expect(pair.commentary?.passageId).toBe('p1');
  });
});

describe('drawAnotherMeditationPair', () => {
  it('nunca devolve o par atual e mantém o comentário na sua passagem', () => {
    const current = { passage: passages[0], commentary: commentaries[0] };
    for (const value of [0, 0.4, 0.99]) {
      const { pair: next } = drawAnotherMeditationPair(passages, commentaries, current, () => value);
      expect(next.commentary?.id).not.toBe('c1');
      expect(next.commentary?.passageId).toBe(next.passage?.id);
    }
  });

  it('com um só par possível fica no atual', () => {
    const only = { passage: passages[1], commentary: commentaries[2] };
    expect(drawAnotherMeditationPair([passages[1]!], commentaries, only, () => 0.5).pair).toBe(only);
  });

  it('passagem sem comentário também entra no sorteio', () => {
    expect(meditationPairs(passages, [commentaries[0]!])).toHaveLength(2);
  });
});

describe('nextDrawPool', () => {
  const pairs = meditationPairs(passages, commentaries);
  const [first, second] = pairs;

  it('deixa de fora o que já saiu e o par atual', () => {
    const { pool } = nextDrawPool(pairs, new Set([pairKey(second!)]), first!);
    expect(pool).toHaveLength(pairs.length - 2);
    expect(pool.map(pairKey)).not.toContain(pairKey(first!));
    expect(pool.map(pairKey)).not.toContain(pairKey(second!));
  });

  it('ao esgotar recomeça o ciclo sem repetir o par atual', () => {
    const everyone = new Set(pairs.map(pairKey));
    const { pool, seen } = nextDrawPool(pairs, everyone, first!);
    expect(pool).toHaveLength(pairs.length - 1);
    expect(pool.map(pairKey)).not.toContain(pairKey(first!));
    expect([...seen]).toEqual([pairKey(first!)]);
  });
});

describe('useMeditationSelection', () => {
  const content = { passages, commentaries, deeperReferences: [] };

  it('"Outra meditação" percorre todos os pares antes de repetir', async () => {
    const { result } = await renderHook(() => useMeditationSelection(content, () => 0));
    const shown = [result.current.commentary?.id];
    for (let i = 1; i < meditationPairs(passages, commentaries).length; i += 1) {
      await act(() => result.current.drawAnother());
      shown.push(result.current.commentary?.id);
    }
    expect(new Set(shown).size).toBe(shown.length);
  });

  it('avançar o passo não troca o par', async () => {
    const random = queue([0.6, 0, 0, 0]);
    const { result, rerender } = await renderHook(() => useMeditationSelection(content, random));
    const first = result.current.commentary?.id;
    await rerender({});
    expect(result.current.passage?.id).toBe('p2');
    expect(result.current.commentary?.id).toBe(first);
    expect(result.current.commentary?.id).toBe('c3');
  });

  it('remontar a sessão sorteia de novo', async () => {
    const random = queue([0, 0, 0.6, 0]);
    const first = await renderHook(() => useMeditationSelection(content, random));
    expect(first.result.current.passage?.id).toBe('p1');
    await first.unmount();
    const second = await renderHook(() => useMeditationSelection(content, random));
    expect(second.result.current.passage?.id).toBe('p2');
    expect(second.result.current.commentary?.id).toBe('c3');
    await second.unmount();
  });

  it('«Outra meditação» troca o par e só aparece com mais de um par', async () => {
    const random = queue([0, 0, 0.99]);
    const { result } = await renderHook(() => useMeditationSelection(content, random));
    expect(result.current.canDrawAnother).toBe(true);
    expect(result.current.commentary?.id).toBe('c1');
    await act(() => result.current.drawAnother());
    expect(result.current.commentary?.id).toBe('c3');
    expect(result.current.passage?.id).toBe('p2');

    const single = { passages: [passages[1]!], commentaries, deeperReferences: [] };
    const alone = await renderHook(() => useMeditationSelection(single, random));
    expect(alone.result.current.canDrawAnother).toBe(false);
  });
});
