export const MEDITATION_FULL_LIMIT = 280;
export const MEDITATION_EXCERPT_LIMIT = 140;

/** `null` quando o texto cabe inteiro e não deve oferecer expansão. */
export function meditationExcerpt(text: string): string | null {
  if (text.length <= MEDITATION_FULL_LIMIT) return null;
  const slice = text.slice(0, MEDITATION_EXCERPT_LIMIT);
  const space = slice.lastIndexOf(' ');
  const cut = space > 0 ? slice.slice(0, space) : slice;
  return `${cut}…`;
}
