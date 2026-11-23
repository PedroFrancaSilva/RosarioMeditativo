import type { Commentary, DeeperReference, Passage } from '@/domain/mystery';
import { pickItem } from '@/domain/pickItem';
import { useCallback, useState } from 'react';

type ContentSlice = {
  passages: Passage[];
  commentaries: Commentary[];
  deeperReferences: DeeperReference[];
};

export function drawMeditationPair(
  passages: readonly Passage[],
  commentaries: readonly Commentary[],
  random: () => number,
): { passage?: Passage; commentary?: Commentary } {
  const passage = pickItem(passages, Math.floor(random() * passages.length));
  if (!passage) return {};
  const own = commentaries.filter((commentary) => commentary.passageId === passage.id);
  return {
    passage,
    commentary: pickItem(own, Math.floor(random() * own.length)),
  };
}

type MeditationPair = { passage?: Passage; commentary?: Commentary };

/** Todos os pares possíveis: cada comentário com a sua passagem; passagem sem comentário vale sozinha. */
export function meditationPairs(
  passages: readonly Passage[],
  commentaries: readonly Commentary[],
): MeditationPair[] {
  return passages.flatMap((passage) => {
    const own = commentaries.filter((commentary) => commentary.passageId === passage.id);
    return own.length > 0 ? own.map((commentary) => ({ passage, commentary })) : [{ passage }];
  });
}

function samePair(a: MeditationPair, b: MeditationPair): boolean {
  return a.passage?.id === b.passage?.id && a.commentary?.id === b.commentary?.id;
}

export function pairKey(pair: MeditationPair): string {
  return `${pair.passage?.id ?? ''}|${pair.commentary?.id ?? ''}`;
}

/**
 * Candidatos ao próximo sorteio e o registro de pares já mostrados.
 * Só repete depois de esgotar todos, e nunca devolve o par atual.
 */
export function nextDrawPool(
  pairs: readonly MeditationPair[],
  seen: ReadonlySet<string>,
  current: MeditationPair,
): { pool: MeditationPair[]; seen: ReadonlySet<string> } {
  const others = pairs.filter((pair) => !samePair(pair, current));
  const unseen = others.filter((pair) => !seen.has(pairKey(pair)));
  if (unseen.length > 0) return { pool: unseen, seen };
  return { pool: others, seen: new Set([pairKey(current)]) };
}

/** Outro par, nunca o atual. Com um só par possível devolve o atual. */
export function drawAnotherMeditationPair(
  passages: readonly Passage[],
  commentaries: readonly Commentary[],
  current: MeditationPair,
  random: () => number,
  alreadySeen: ReadonlySet<string> = new Set(),
): { pair: MeditationPair; seen: ReadonlySet<string> } {
  const pairs = meditationPairs(passages, commentaries);
  const { pool, seen } = nextDrawPool(pairs, alreadySeen, current);
  const pair = pickItem(pool, Math.floor(random() * pool.length)) ?? current;
  return { pair, seen: new Set(seen).add(pairKey(current)).add(pairKey(pair)) };
}

function passageSignature(passages: readonly Passage[] | undefined): string {
  return passages?.map((passage) => passage.id).join('|') ?? '';
}

export function useMeditationSelection(
  content: ContentSlice | undefined,
  random: () => number = Math.random,
) {
  const signature = passageSignature(content?.passages);
  const [storedSignature, setStoredSignature] = useState(signature);
  const [pair, setPair] = useState<MeditationPair>(() =>
    drawMeditationPair(content?.passages ?? [], content?.commentaries ?? [], random),
  );

  const [seen, setSeen] = useState<ReadonlySet<string>>(() => new Set());

  if (storedSignature !== signature) {
    setStoredSignature(signature);
    setSeen(new Set());
    setPair(drawMeditationPair(content?.passages ?? [], content?.commentaries ?? [], random));
  }

  const passages = content?.passages ?? [];
  const commentaries = content?.commentaries ?? [];
  const canDrawAnother = meditationPairs(passages, commentaries).length > 1;

  const drawAnother = useCallback(() => {
    const next = drawAnotherMeditationPair(passages, commentaries, pair, random, seen);
    setPair(next.pair);
    setSeen(next.seen);
  }, [passages, commentaries, pair, random, seen]);

  const deeperReferences = content?.deeperReferences ?? [];

  return {
    passage: pair.passage,
    commentary: pair.commentary,
    deeperReferences,
    hasDeeperReferences: deeperReferences.length > 0,
    canDrawAnother,
    drawAnother,
  };
}
