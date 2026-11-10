import { renderHook } from '@testing-library/react-native';

import type { Commentary, Passage } from '@/domain/mystery';
import {
  drawMeditationPair,
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

describe('useMeditationSelection', () => {
  const content = { passages, commentaries, deeperReferences: [] };

  it('avançar o passo não troca o par', async () => {
    const random = queue([0.6, 0, 0, 0]);
    const { result, rerender } = await renderHook(() => useMeditationSelection(content, random));
    const first = result.current.commentary?.id;
    rerender({});
    expect(result.current.passage?.id).toBe('p2');
    expect(result.current.commentary?.id).toBe(first);
    expect(result.current.commentary?.id).toBe('c3');
  });

  it('remontar a sessão sorteia de novo', async () => {
    const random = queue([0, 0, 0.6, 0]);
    const first = await renderHook(() => useMeditationSelection(content, random));
    expect(first.result.current.passage?.id).toBe('p1');
    first.unmount();
    const second = await renderHook(() => useMeditationSelection(content, random));
    expect(second.result.current.passage?.id).toBe('p2');
    expect(second.result.current.commentary?.id).toBe('c3');
  });
});
