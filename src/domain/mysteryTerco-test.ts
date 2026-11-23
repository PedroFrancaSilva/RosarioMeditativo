import { getEmbeddedCatalog } from '@/data/repositories/mysteryRepository';
import {
  getRecommendedDaysLabel,
  groupMysteriesByTerco,
  mysteryTypesForSet,
  liturgicalSundayNote,
  tercoTypeForDate,
  TERCO_TITLES,
} from '@/domain/mysteryTerco';
import { buildPrayerSteps } from '@/domain/rosary/buildPrayerSteps';

describe('groupMysteriesByTerco', () => {
  it('agrupa o conjunto clássico em três terços com cinco mistérios cada', () => {
    const catalog = getEmbeddedCatalog('classic');
    const sections = groupMysteriesByTerco(catalog, 'classic');
    expect(sections).toHaveLength(3);
    expect(sections.map((s) => s.title)).toEqual([
      TERCO_TITLES.joyful,
      TERCO_TITLES.sorrowful,
      TERCO_TITLES.glorious,
    ]);
    sections.forEach((section) => {
      expect(section.mysteries).toHaveLength(5);
    });
  });

  it('inclui mistérios luminosos no rosário atual (4 terços)', () => {
    const catalog = getEmbeddedCatalog('jp2');
    const sections = groupMysteriesByTerco(catalog, 'jp2');
    expect(sections).toHaveLength(4);
    expect(sections[1]?.type).toBe('luminous');
    expect(mysteryTypesForSet('jp2')).toContain('luminous');
  });
});

describe('buildPrayerSteps modo tercio', () => {
  it('gera abertura e cinco décadas do terço gozoso', () => {
    const catalog = getEmbeddedCatalog('classic');
    const joyful = catalog.filter((m) => m.type === 'joyful');
    const steps = buildPrayerSteps({ mode: 'tercio', set: 'classic', mysteries: joyful });
    expect(steps[0]?.label).toBe('Sinal da Cruz');
    const announces = steps.filter((s) => s.kind === 'mystery-announcement');
    expect(announces).toHaveLength(5);
    expect(steps.at(-1)?.kind).toBe('completion');
  });
});

describe('tercoTypeForDate', () => {
  const day = (date: number) => new Date(2026, 9, date);

  it('segue o calendário tradicional, com gozosos na quinta', () => {
    expect(tercoTypeForDate('classic', day(26))).toBe('joyful');
    expect(tercoTypeForDate('classic', day(27))).toBe('sorrowful');
    expect(tercoTypeForDate('classic', day(28))).toBe('glorious');
    expect(tercoTypeForDate('classic', day(29))).toBe('joyful');
    expect(tercoTypeForDate('classic', day(30))).toBe('sorrowful');
    expect(tercoTypeForDate('classic', day(31))).toBe('glorious');
    expect(tercoTypeForDate('classic', day(25))).toBe('glorious');
  });

  it('segue o calendário com luminosos, quinta inclusa', () => {
    expect(tercoTypeForDate('jp2', day(26))).toBe('joyful');
    expect(tercoTypeForDate('jp2', day(27))).toBe('sorrowful');
    expect(tercoTypeForDate('jp2', day(28))).toBe('glorious');
    expect(tercoTypeForDate('jp2', day(29))).toBe('luminous');
    expect(tercoTypeForDate('jp2', day(30))).toBe('sorrowful');
    expect(tercoTypeForDate('jp2', day(31))).toBe('joyful');
    expect(tercoTypeForDate('jp2', day(25))).toBe('glorious');
  });
});

describe('tempo litúrgico no conjunto tradicional', () => {
  it('domingos do Advento sugerem os Gozosos', () => {
    const sunday = new Date(2026, 10, 29);
    expect(tercoTypeForDate('classic', sunday)).toBe('joyful');
    expect(liturgicalSundayNote('classic', sunday)).toBe('Domingo do Advento');
  });

  it('domingos da Quaresma sugerem os Dolorosos, até o de Ramos', () => {
    for (const sunday of [new Date(2026, 2, 1), new Date(2026, 2, 29)]) {
      expect(tercoTypeForDate('classic', sunday)).toBe('sorrowful');
      expect(liturgicalSundayNote('classic', sunday)).toBe('Domingo da Quaresma');
    }
  });

  it('Natal e Páscoa no domingo voltam aos Gloriosos', () => {
    for (const sunday of [new Date(2022, 11, 25), new Date(2026, 3, 5)]) {
      expect(tercoTypeForDate('classic', sunday)).toBe('glorious');
      expect(liturgicalSundayNote('classic', sunday)).toBeNull();
    }
  });

  it('não altera os dias de semana nem o conjunto com Luminosos', () => {
    expect(tercoTypeForDate('classic', new Date(2026, 11, 2))).toBe('glorious');
    expect(tercoTypeForDate('jp2', new Date(2026, 10, 29))).toBe('glorious');
    expect(liturgicalSundayNote('jp2', new Date(2026, 10, 29))).toBeNull();
  });
});

describe('getRecommendedDaysLabel', () => {
  it('usa calendário do rosário tradicional', () => {
    expect(getRecommendedDaysLabel('classic', 'joyful')).toBe('Segunda e quinta');
    expect(getRecommendedDaysLabel('classic', 'glorious')).toBe('Quarta, sábado e domingo');
  });

  it('usa calendário do rosário atual com luminosos na quinta', () => {
    expect(getRecommendedDaysLabel('jp2', 'luminous')).toBe('Quinta-feira');
    expect(getRecommendedDaysLabel('jp2', 'joyful')).toBe('Segunda e sábado');
    expect(getRecommendedDaysLabel('jp2', 'glorious')).toBe('Quarta e domingo');
  });

  it('expõe dias recomendados em cada seção da home', () => {
    const catalog = getEmbeddedCatalog('jp2');
    const sections = groupMysteriesByTerco(catalog, 'jp2');
    expect(sections.find((s) => s.type === 'luminous')?.recommendedDays).toBe('Quinta-feira');
  });
});
