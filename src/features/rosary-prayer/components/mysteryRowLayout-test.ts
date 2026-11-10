import {
  computeMysteryRowLayout,
  mysteryRowTotalWidth,
} from '@/features/rosary-prayer/components/mysteryRowLayout';

describe('computeMysteryRowLayout', () => {
  it('cabe 15 mistérios em largura típica de celular (360dp)', () => {
    const available = 360 - 16;
    const layout = computeMysteryRowLayout(15, available);
    expect(mysteryRowTotalWidth(15, layout)).toBeLessThanOrEqual(available);
  });

  it('cabe 20 mistérios em largura estreita (320dp)', () => {
    const available = 320 - 16;
    const layout = computeMysteryRowLayout(20, available);
    expect(mysteryRowTotalWidth(20, layout)).toBeLessThanOrEqual(available);
  });
});
