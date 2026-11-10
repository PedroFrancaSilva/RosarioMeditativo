import type { Commentary, Passage } from '@/domain/mystery';

/** Comentário sem passagem, ou de outra passagem, fica de fora da meditação. */
export function commentariesForPassages(
  passages: readonly Passage[],
  commentaries: readonly Commentary[],
): Commentary[] {
  const ids = new Set(passages.map((passage) => passage.id));
  return commentaries.filter((commentary) => ids.has(commentary.passageId));
}
