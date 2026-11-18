import type { RosarySessionConfig } from '@/domain/rosary/types';

/**
 * Quantos terços uma sessão concluída soma ao contador.
 * Rosário completo: um por conjunto de mistérios (3 ou 4). Terço: 1. Mistério avulso: 0.
 */
export function tercosInCompletedSession(config: Pick<RosarySessionConfig, 'mode' | 'mysteries'>): number {
  if (config.mode === 'single') return 0;
  if (config.mode === 'tercio') return config.mysteries.length > 0 ? 1 : 0;
  return new Set(config.mysteries.map((mystery) => mystery.type)).size;
}

export function parseCompletedCount(raw: string | null | undefined): number {
  if (!raw) return 0;
  const value = Number.parseInt(raw, 10);
  return Number.isFinite(value) && value > 0 ? value : 0;
}

export function completedCountLabel(count: number): string {
  if (count === 0) return 'Nenhum terço rezado ainda';
  return count === 1 ? '1 terço rezado' : `${count} terços rezados`;
}
