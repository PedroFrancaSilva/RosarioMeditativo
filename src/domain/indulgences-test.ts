import {
  currentOrNextIndulgenceDays,
  formatIndulgenceDate,
  indulgenceDaysForYear,
  INDULGENCE_GUIDE,
  upcomingIndulgenceDays,
} from '@/domain/indulgences';

const byId = (year: number, id: string) =>
  indulgenceDaysForYear(year).find((day) => day.id === id)!;

describe('indulgenceDaysForYear', () => {
  it('calcula as datas móveis', () => {
    expect(byId(2027, 'divine-mercy').start).toEqual({ year: 2027, month: 4, day: 4 });
    expect(byId(2027, 'pentecost').start).toEqual({ year: 2027, month: 5, day: 16 });
    expect(byId(2027, 'corpus-christi').start).toEqual({ year: 2027, month: 5, day: 27 });
    expect(byId(2027, 'sacred-heart').start).toEqual({ year: 2027, month: 6, day: 4 });
    expect(byId(2026, 'christ-the-king').start).toEqual({ year: 2026, month: 11, day: 22 });
  });

  it('fica em ordem de data', () => {
    const keys = indulgenceDaysForYear(2026).map(
      ({ start }) => start.year * 10000 + start.month * 100 + start.day,
    );
    expect(keys).toEqual([...keys].sort((a, b) => a - b));
  });

  it('cada dia informa a obra e a fonte', () => {
    for (const day of indulgenceDaysForYear(2026)) {
      expect(day.work.length).toBeGreaterThan(10);
      expect(day.source.length).toBeGreaterThan(3);
    }
  });
});

describe('currentOrNextIndulgenceDays', () => {
  it('reconhece um período de vários dias', () => {
    const result = currentOrNextIndulgenceDays({ year: 2026, month: 11, day: 5 });
    expect(result.isToday).toBe(true);
    expect(result.days.map((day) => day.id)).toEqual(['faithful-departed-cemetery']);
  });

  it('mostra juntas as concessões do mesmo dia', () => {
    const result = currentOrNextIndulgenceDays({ year: 2026, month: 11, day: 2 });
    expect(result.days.map((day) => day.id)).toEqual([
      'faithful-departed-cemetery',
      'all-souls-church',
    ]);
  });

  it('sem data hoje, aponta a próxima', () => {
    const result = currentOrNextIndulgenceDays({ year: 2026, month: 11, day: 23 });
    expect(result.isToday).toBe(false);
    expect(result.days[0]?.id).toBe('te-deum');
  });

  it('depois do último dia, passa para o ano seguinte', () => {
    const result = currentOrNextIndulgenceDays({ year: 2026, month: 12, day: 31 });
    expect(result.isToday).toBe(true);
    const after = currentOrNextIndulgenceDays({ year: 2027, month: 1, day: 2 });
    expect(after.days[0]?.start.year).toBe(2027);
  });
});

describe('INDULGENCE_GUIDE', () => {
  const text = JSON.stringify(INDULGENCE_GUIDE);

  it('explica as condições e o Rosário rezado sozinho', () => {
    expect(text).toContain('Confissão sacramental');
    expect(text).toContain('mesmo venial');
    expect(text).toContain('sem interrupção');
    expect(text).toContain('parcial');
  });
});

describe('upcomingIndulgenceDays', () => {
  const today = { year: 2026, month: 11, day: 23 };

  it('começa na próxima data e cobre doze meses', () => {
    const days = upcomingIndulgenceDays(today);
    expect(days[0]?.id).toBe('te-deum');
    expect(days[1]?.id).toBe('new-year');
    expect(days[1]?.start.year).toBe(2027);
    expect(days.at(-1)?.id).toBe('christ-the-king');
    expect(days.at(-1)?.start).toEqual({ year: 2027, month: 11, day: 21 });
  });

  it('mantém um período que já começou', () => {
    const days = upcomingIndulgenceDays({ year: 2026, month: 11, day: 5 });
    expect(days[0]?.id).toBe('faithful-departed-cemetery');
    expect(days[0]?.start.year).toBe(2026);
  });

  it('mostra o ano só nas datas de outro ano', () => {
    const [last, next] = upcomingIndulgenceDays(today);
    expect(formatIndulgenceDate(last!, 2026)).toBe('31 de dezembro');
    expect(formatIndulgenceDate(next!, 2026)).toBe('1 de janeiro de 2027');
  });
});
