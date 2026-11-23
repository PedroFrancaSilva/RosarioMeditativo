import { CHANT_CREDITS } from '@/domain/chant/chantCredits';
import {
  marianAntiphonForDate,
  resolveChant,
  type CivilDate,
} from '@/domain/chant/marianAntiphon';

const date = (year: number, month: number, day: number): CivilDate => ({ year, month, day });

const salveAndAlma = ['salve', 'alma'] as const;

describe('marianAntiphonForDate', () => {
  it.each([
    [date(2026, 2, 2), 'alma'],
    [date(2026, 2, 3), 'ave-regina'],
    [date(2026, 4, 4), 'ave-regina'],
    [date(2026, 4, 5), 'regina-caeli'],
    [date(2026, 5, 24), 'regina-caeli'],
    [date(2026, 5, 25), 'regina-caeli'],
    [date(2026, 5, 30), 'regina-caeli'],
    [date(2026, 5, 31), 'salve'],
    [date(2026, 11, 28), 'salve'],
    [date(2026, 11, 29), 'alma'],
    [date(2022, 11, 27), 'alma'],
    [date(2028, 12, 2), 'salve'],
    [date(2028, 12, 3), 'alma'],
  ] as const)('%j → %s', (civil, antiphon) => {
    expect(marianAntiphonForDate(civil)).toBe(antiphon);
  });
});

describe('resolveChant', () => {
  it('cai na Salve Regina quando Ave Regina ou Regina caeli não estão no catálogo', () => {
    expect(resolveChant('ave-regina', salveAndAlma)).toEqual(CHANT_CREDITS.salve);
    expect(resolveChant('regina-caeli', salveAndAlma)).toEqual(CHANT_CREDITS.salve);
    expect(resolveChant('ave-regina', salveAndAlma).performer).toBe('Les Petits Chanteurs de Passy');
    expect(resolveChant('regina-caeli', salveAndAlma).title).toBe('Salve Regina');
  });

  it('devolve a faixa pedida quando ela está no catálogo', () => {
    const catalog = ['salve', 'alma', 'regina-caeli'] as const;
    expect(resolveChant('regina-caeli', catalog).performer).toBe('Ferdinando Traversa');
    expect(resolveChant('alma', catalog).performer).toBe('Rick Dechance');
    expect(resolveChant('salve', catalog).licenseName).toBe('CC BY-SA 3.0');
  });
});
