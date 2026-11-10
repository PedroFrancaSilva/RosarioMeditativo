import type { Commentary, DeeperReference, Passage } from '@/domain/mystery';
import { pickItem } from '@/domain/pickItem';
import { useState } from 'react';

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

function passageSignature(passages: readonly Passage[] | undefined): string {
  return passages?.map((passage) => passage.id).join('|') ?? '';
}

export function useMeditationSelection(
  content: ContentSlice | undefined,
  random: () => number = Math.random,
) {
  const signature = passageSignature(content?.passages);
  const [storedSignature, setStoredSignature] = useState(signature);
  const [pair, setPair] = useState(() =>
    drawMeditationPair(content?.passages ?? [], content?.commentaries ?? [], random),
  );

  if (storedSignature !== signature) {
    setStoredSignature(signature);
    setPair(drawMeditationPair(content?.passages ?? [], content?.commentaries ?? [], random));
  }

  const deeperReferences = content?.deeperReferences ?? [];

  return {
    passage: pair.passage,
    commentary: pair.commentary,
    deeperReferences,
    hasDeeperReferences: deeperReferences.length > 0,
  };
}
