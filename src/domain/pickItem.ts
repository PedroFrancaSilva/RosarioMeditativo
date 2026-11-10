/** Escolhe um item pelo índice. Conjunto vazio não devolve nada. */
export function pickItem<T>(items: readonly T[], randomIndex: number): T | undefined {
  if (items.length === 0 || !Number.isFinite(randomIndex)) return undefined;
  const index = Math.abs(Math.trunc(randomIndex)) % items.length;
  return items[index];
}
