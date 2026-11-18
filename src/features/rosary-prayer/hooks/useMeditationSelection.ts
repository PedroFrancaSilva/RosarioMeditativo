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

/** Outro par, nunca o atual. Com um só par possível devolve o atual. */
export function drawAnotherMeditationPair(
  passages: readonly Passage[],
  commentaries: readonly Commentary[],
  current: MeditationPair,
  random: () => number,
): MeditationPair {
  const others = meditationPairs(passages, commentaries).filter((pair) => !samePair(pair, current));
  return pickItem(others, Math.floor(random() * others.length)) ?? current;
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

  if (storedSignature !== signature) {
    setStoredSignature(signature);
    setPair(drawMeditationPair(content?.passages ?? [], content?.commentaries ?? [], random));
  }

  const passages = content?.passages ?? [];
  const commentaries = content?.commentaries ?? [];
  const canDrawAnother = meditationPairs(passages, commentaries).length > 1;

  const drawAnother = useCallback(() => {
    setPair((current) => drawAnotherMeditationPair(passages, commentaries, current, random));
  }, [passages, commentaries, random]);

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
