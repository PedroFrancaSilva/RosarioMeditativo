import type { RosaryProgressModel } from '@/domain/rosary/rosaryProgress';
import type { PrayerStep } from '@/domain/rosary/types';

import {
  buildDecadeBeadView,
  mysteryProgressLabel,
  prayerPanelKicker,
} from '@/features/rosary-prayer/session/decadeBeadView';

describe('prayerPanelKicker', () => {
  it('identifica o anúncio do mistério', () => {
    expect(
      prayerPanelKicker(step({ id: 'a', kind: 'mystery-announcement', label: 'A', mysteryId: 'm' })),
    ).toBe('Anúncio do mistério');
  });
});

describe('mysteryProgressLabel', () => {
  it('no mistério avulso mostra a posição real e o tipo, sem contagem', () => {
    expect(mysteryProgressLabel(['current'], true, { type: 'glorious', sortOrder: 2 })).toEqual({
      kicker: '2º mistério glorioso',
      detail: '',
    });
  });

  it('no terço completo mantém a posição na sessão', () => {
    const states = ['completed', 'current', 'upcoming', 'upcoming', 'upcoming'] as const;
    expect(mysteryProgressLabel([...states], true, { type: 'glorious', sortOrder: 2 })).toEqual({
      kicker: '2º mistério',
      detail: '2 de 5',
    });
  });
});

function step(partial: Partial<PrayerStep> & Pick<PrayerStep, 'id' | 'kind' | 'label'>): PrayerStep {
  return {
    hailMaryIndex: null,
    lead: null,
    ...partial,
  };
}

function progress(hailMarys: RosaryProgressModel['hailMarys']): RosaryProgressModel {
  return { mysteries: ['current'], hailMarys };
}

const upcoming = () => Array.from({ length: 10 }, () => 'upcoming' as const);

describe('buildDecadeBeadView', () => {
  it('destaca a Ave-Maria atual e preenche as anteriores', () => {
    const hailMarys = Array.from({ length: 10 }, (_, i) => {
      const number = i + 1;
      if (number < 7) return 'completed' as const;
      if (number === 7) return 'current' as const;
      return 'upcoming' as const;
    });
    const view = buildDecadeBeadView(
      step({
        id: 'hm',
        kind: 'fixed-prayer',
        prayerId: 'hail-mary',
        mysteryId: 'm1',
        hailMaryIndex: 7,
        label: 'Ave-Maria',
      }),
      progress(hailMarys),
    );

    expect(view.beads.filter((bead) => bead === 'completed')).toHaveLength(6);
    expect(view.beads[6]).toBe('current');
    expect(view.caption).toBe('7 de 10');
  });

  it('no Pai-Nosso destaca a primeira conta e não conclui nenhuma Ave-Maria', () => {
    const view = buildDecadeBeadView(
      step({
        id: 'of',
        kind: 'fixed-prayer',
        prayerId: 'our-father',
        mysteryId: 'm1',
        hailMaryIndex: 0,
        label: 'Pai-Nosso',
      }),
      progress(upcoming()),
    );

    expect(view.beads[0]).toBe('current');
    expect(view.beads.slice(1).every((bead) => bead === 'upcoming')).toBe(true);
    expect(view.beads).not.toContain('completed');
    expect(view.caption).toBe('Pai-Nosso');
  });

  it('no Glória e na oração de Fátima marca as dez contas concluídas', () => {
    for (const prayerId of ['glory-be', 'fatima-prayer'] as const) {
      const view = buildDecadeBeadView(
        step({
          id: prayerId,
          kind: 'fixed-prayer',
          prayerId,
          mysteryId: 'm1',
          label: prayerId,
        }),
        progress(upcoming()),
      );
      expect(view.beads.every((bead) => bead === 'completed')).toBe(true);
      expect(view.beads).not.toContain('current');
    }
  });

  it('na abertura não destaca nem conclui contas', () => {
    const view = buildDecadeBeadView(
      step({
        id: 'creed',
        kind: 'fixed-prayer',
        prayerId: 'creed',
        label: 'Credo',
      }),
      progress(Array.from({ length: 10 }, () => 'completed')),
    );

    expect(view.beads.every((bead) => bead === 'upcoming')).toBe(true);
    expect(view.caption).toBe('Credo');
  });
});
