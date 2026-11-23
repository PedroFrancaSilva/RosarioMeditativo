import {
  addDays,
  adventSunday,
  dateKey,
  easterSunday,
  type CivilDate,
} from '@/domain/chant/marianAntiphon';

export type IndulgenceDay = {
  id: string;
  title: string;
  start: CivilDate;
  end: CivilDate;
  /** Obra prescrita, além das condições gerais. */
  work: string;
  source: string;
};

const MANUAL = 'Manual das Indulgências';

/** Texto conferido no Manual das Indulgências (4.ª ed., 1999), concessões e normas citadas. */
export const INDULGENCE_GUIDE = {
  what: 'A indulgência é a remissão, diante de Deus, da pena temporal devida aos pecados já perdoados quanto à culpa (CIC 1471). É parcial ou plenária, conforme livre de parte ou de toda essa pena, e pode ser obtida para si mesmo ou aplicada aos defuntos.',
  conditions: [
    { title: 'A obra prescrita', text: 'Realizar a oração ou a ação à qual a indulgência está ligada.' },
    { title: 'Desapego do pecado', text: 'Excluir todo apego ao pecado, mesmo venial.' },
    { title: 'Confissão sacramental', text: 'Uma só confissão basta para várias indulgências plenárias.' },
    { title: 'Comunhão eucarística', text: 'Uma Comunhão para cada indulgência plenária.' },
    {
      title: 'Oração pelas intenções do Papa',
      text: 'Um Pai-Nosso e uma Ave-Maria bastam, ou outra oração de sua devoção.',
    },
  ],
  notes: [
    'As condições podem ser cumpridas alguns dias antes ou depois da obra. Convém comungar e rezar pelo Papa no mesmo dia.',
    'Só se pode obter uma indulgência plenária por dia, salvo na hora da morte.',
    'Faltando a disposição plena ou alguma condição, a indulgência será parcial.',
  ],
  rosaryPlaces: [
    'Na igreja ou num oratório',
    'Em família, em comunidade religiosa ou em associação de fiéis',
    'Quando vários fiéis se reúnem com um fim honesto',
    'Unindo-se ao Rosário rezado pelo Papa, ao vivo por rádio ou televisão',
  ],
  rosaryRequirements: [
    'Cinco dezenas rezadas sem interrupção',
    'Meditação dos mistérios junto com a oração vocal',
    'Na recitação pública, anúncio dos mistérios segundo o costume local',
  ],
  rosaryAlone: 'Em outras circunstâncias, como rezando sozinho, a indulgência é parcial.',
  everyDay: [
    'O Rosário, nas condições acima',
    'Adoração ao Santíssimo por ao menos meia hora',
    'A Via-Sacra',
    'Leitura ou escuta da Sagrada Escritura por ao menos meia hora',
  ],
  disclaimer:
    'O app ajuda a rezar, mas não registra nem confirma indulgências. Em caso de dúvida, procure um sacerdote.',
  sources:
    'Fontes: Manual das Indulgências (Enchiridion Indulgentiarum, 4.ª ed., 1999), normas 18 a 22 e concessões citadas; Penitenciaria Apostólica, decreto de 29/6/2002; Catecismo da Igreja Católica, 1471.',
} as const;

function singleDay(
  id: string,
  title: string,
  date: CivilDate,
  work: string,
  source: string,
): IndulgenceDay {
  return { id, title, start: date, end: date, work, source };
}

export function indulgenceDaysForYear(year: number): IndulgenceDay[] {
  const easter = easterSunday(year);
  const fixed = (month: number, day: number): CivilDate => ({ year, month, day });
  const days: IndulgenceDay[] = [
    singleDay(
      'new-year',
      'Primeiro dia do ano',
      fixed(1, 1),
      'Assistir à recitação ou ao canto solene do Veni Creator.',
      `${MANUAL}, conc. 26 §1, 1°`,
    ),
    singleDay(
      'holy-thursday',
      'Quinta-feira Santa',
      addDays(easter, -3),
      'Rezar o Tantum ergo depois da Missa da Ceia do Senhor, na reposição solene do Santíssimo.',
      `${MANUAL}, conc. 7 §1, 2°`,
    ),
    singleDay(
      'good-friday',
      'Sexta-feira Santa',
      addDays(easter, -2),
      'Participar devotamente da adoração da Cruz na ação litúrgica solene.',
      `${MANUAL}, conc. 13 §1`,
    ),
    singleDay(
      'easter-vigil',
      'Vigília Pascal',
      addDays(easter, -1),
      'Renovar as promessas do Batismo. Vale também no aniversário do próprio Batismo.',
      `${MANUAL}, conc. 28 §1`,
    ),
    singleDay(
      'divine-mercy',
      'Domingo da Divina Misericórdia',
      addDays(easter, 7),
      'Na igreja, participar das orações à Divina Misericórdia ou, diante do Santíssimo, rezar Pai-Nosso, Credo e uma invocação a Jesus misericordioso.',
      'Penitenciaria Apostólica, decreto de 29/6/2002',
    ),
    singleDay(
      'pentecost',
      'Pentecostes',
      addDays(easter, 49),
      'Assistir à recitação ou ao canto solene do Veni Creator.',
      `${MANUAL}, conc. 26 §1, 1°`,
    ),
    singleDay(
      'corpus-christi',
      'Corpus Christi',
      addDays(easter, 60),
      'Participar devotamente da procissão eucarística solene.',
      `${MANUAL}, conc. 7 §1, 3°`,
    ),
    singleDay(
      'sacred-heart',
      'Sagrado Coração de Jesus',
      addDays(easter, 68),
      'Rezar publicamente o ato de reparação (Iesu dulcissime).',
      `${MANUAL}, conc. 3`,
    ),
    singleDay(
      'portiuncula',
      'Porciúncula',
      fixed(8, 2),
      'Visitar a igreja paroquial, a catedral ou uma basílica menor e rezar Pai-Nosso e Credo.',
      `${MANUAL}, conc. 33 §1`,
    ),
    {
      id: 'faithful-departed-cemetery',
      title: 'Oitava dos fiéis defuntos',
      start: fixed(11, 1),
      end: fixed(11, 8),
      work: 'Em cada dia, visitar um cemitério e rezar pelos defuntos, ao menos mentalmente. Aplicável só às almas do purgatório.',
      source: `${MANUAL}, conc. 29 §1, 1°`,
    },
    singleDay(
      'all-souls-church',
      'Dia de Finados',
      fixed(11, 2),
      'Visitar uma igreja ou um oratório e rezar Pai-Nosso e Credo. Aplicável só às almas do purgatório.',
      `${MANUAL}, conc. 29 §1, 2°`,
    ),
    singleDay(
      'christ-the-king',
      'Cristo Rei',
      addDays(adventSunday(year), -7),
      'Rezar publicamente o ato de consagração do gênero humano a Cristo Rei.',
      `${MANUAL}, conc. 2`,
    ),
    singleDay(
      'te-deum',
      'Último dia do ano',
      fixed(12, 31),
      'Assistir à recitação ou ao canto solene do Te Deum, em ação de graças pelo ano.',
      `${MANUAL}, conc. 26 §1, 2°`,
    ),
  ];
  return days.sort((a, b) => dateKey(a.start) - dateKey(b.start));
}

/** As concessões de hoje ou, se não houver, a próxima data do calendário. */
export function currentOrNextIndulgenceDays(today: CivilDate): {
  isToday: boolean;
  days: IndulgenceDay[];
} {
  const key = dateKey(today);
  const year = indulgenceDaysForYear(today.year);
  const active = year.filter((day) => dateKey(day.start) <= key && key <= dateKey(day.end));
  if (active.length > 0) return { isToday: true, days: active };
  const next =
    year.find((day) => dateKey(day.start) > key) ?? indulgenceDaysForYear(today.year + 1)[0];
  return { isToday: false, days: next ? [next] : [] };
}

/** Datas de hoje até um ano à frente, em ordem, sem as que já passaram. */
export function upcomingIndulgenceDays(today: CivilDate): IndulgenceDay[] {
  const key = dateKey(today);
  const sameDayNextYear = dateKey({ ...today, year: today.year + 1 });
  return [
    ...indulgenceDaysForYear(today.year).filter((day) => dateKey(day.end) >= key),
    ...indulgenceDaysForYear(today.year + 1).filter((day) => dateKey(day.start) < sameDayNextYear),
  ];
}

const MONTHS = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
] as const;

export function formatIndulgenceDate(
  day: Pick<IndulgenceDay, 'start' | 'end'>,
  currentYear: number = day.start.year,
): string {
  const { start, end } = day;
  const month = MONTHS[start.month - 1];
  const year = start.year === currentYear ? '' : ` de ${start.year}`;
  if (dateKey(start) === dateKey(end)) return `${start.day} de ${month}${year}`;
  return `${start.day} a ${end.day} de ${month}${year}`;
}
