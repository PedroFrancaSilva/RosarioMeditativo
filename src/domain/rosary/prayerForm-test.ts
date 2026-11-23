import { getEmbeddedCatalog } from '@/data/repositories/mysteryRepository';
import { buildPrayerSteps } from '@/domain/rosary/buildPrayerSteps';
import { getFixedPrayer, listFixedPrayerIds } from '@/domain/rosary/fixedPrayers';
import {
  parseIncompleteSession,
  serializeIncompleteSession,
  snapshotFromConfig,
} from '@/domain/rosary/incompleteRosarySession';
import { mysteryAnnouncement, mysteryFruit } from '@/domain/rosary/mysteryFruits';
import {
  MODERN_PRAYER_FORM,
  prayerFormFromParams,
  prayerFormToParams,
  resolvePrayerForm,
} from '@/domain/rosary/prayerForm';
import { singleMysterySession, twoMysterySession } from '@/domain/rosary/testFixtures';
import type { PrayerForm } from '@/domain/rosary/types';
import { presentPrayerStep } from '@/features/rosary-prayer/session/stepPresentation';

const traditionalPt: PrayerForm = { traditional: true, language: 'pt', fatima: true };
const traditionalLa: PrayerForm = { traditional: true, language: 'la', fatima: true };

describe('resolvePrayerForm', () => {
  it('só o conjunto tradicional usa as opções escolhidas', () => {
    const options = { language: 'la', fatima: false } as const;
    expect(resolvePrayerForm('classic', options)).toEqual({
      traditional: true,
      language: 'la',
      fatima: false,
    });
    expect(resolvePrayerForm('jp2', options)).toEqual(MODERN_PRAYER_FORM);
  });

  it('a forma sobrevive à ida e volta pela rota', () => {
    const form: PrayerForm = { traditional: true, language: 'la', fatima: false };
    expect(prayerFormFromParams(prayerFormToParams(form))).toEqual(form);
    expect(prayerFormFromParams({})).toBeNull();
  });
});

describe('getFixedPrayer com forma', () => {
  it('mantém os textos atuais sem forma', () => {
    expect(getFixedPrayer('creed').fullText).toContain('desceu à mansão dos mortos');
  });

  it('usa os textos tradicionais em português', () => {
    expect(getFixedPrayer('creed', traditionalPt).fullText).toContain('desceu aos infernos');
    expect(getFixedPrayer('glory-be', traditionalPt).fullText).toMatch(
      /por todos os séculos dos séculos\. Amém\.$/,
    );
    expect(getFixedPrayer('fatima-prayer', traditionalPt).fullText).toContain(
      'principalmente as que mais precisarem',
    );
  });

  it('em latim traz a tradução em português da forma tradicional', () => {
    const ave = getFixedPrayer('hail-mary', traditionalLa);
    expect(ave.fullText.startsWith('Ave Maria, gratia plena')).toBe(true);
    expect(ave.translation).toBe(getFixedPrayer('hail-mary').fullText);
    expect(getFixedPrayer('creed', traditionalLa).translation).toContain('desceu aos infernos');
  });

  it('Oferecimento e Agradecimento ficam em português', () => {
    for (const id of ['opening-offering', 'closing-thanksgiving'] as const) {
      expect(getFixedPrayer(id, traditionalLa)).toEqual(getFixedPrayer(id));
    }
  });

  it('todas as demais orações têm texto latino', () => {
    const portugueseOnly = ['opening-offering', 'closing-thanksgiving'];
    for (const id of listFixedPrayerIds().filter((item) => !portugueseOnly.includes(item))) {
      expect(getFixedPrayer(id, traditionalLa).translation).toBeTruthy();
    }
  });
});

describe('mysteryFruit', () => {
  it('cobre os vinte mistérios', () => {
    for (const type of ['joyful', 'luminous', 'sorrowful', 'glorious'] as const) {
      for (let order = 1; order <= 5; order += 1) {
        expect(mysteryFruit(type, order)).toBeTruthy();
      }
    }
    expect(mysteryFruit('joyful', 6)).toBeNull();
  });

  it('anuncia posição, tipo e fruto', () => {
    expect(mysteryAnnouncement({ type: 'glorious', sortOrder: 4 })).toBe(
      'Quarto mistério glorioso. Fruto: a graça de uma boa morte.',
    );
    expect(mysteryAnnouncement({ type: 'glorious', sortOrder: 9 })).toBeNull();
  });
});

describe('buildPrayerSteps com forma', () => {
  it('fecha com Agradecimento, Salve Rainha e oração conclusiva', () => {
    const steps = buildPrayerSteps(twoMysterySession);
    expect(steps.slice(-4).map((step) => step.prayerId ?? step.kind)).toEqual([
      'closing-thanksgiving',
      'hail-holy-queen',
      'concluding-prayer',
      'completion',
    ]);
    expect(presentPrayerStep(steps.at(-2)!).frameLabel).toBe('Encerramento');
  });

  it('mistério avulso não tem oração conclusiva', () => {
    const steps = buildPrayerSteps(singleMysterySession);
    expect(steps.some((step) => step.prayerId === 'concluding-prayer')).toBe(false);
  });

  it('sem Fátima, a dezena termina no Glória', () => {
    const steps = buildPrayerSteps({
      ...twoMysterySession,
      form: { traditional: true, language: 'pt', fatima: false },
    });
    expect(steps.some((step) => step.prayerId === 'fatima-prayer')).toBe(false);
  });

  it('o latim não altera a quantidade de passos', () => {
    expect(buildPrayerSteps({ ...twoMysterySession, form: traditionalLa })).toHaveLength(
      buildPrayerSteps(twoMysterySession).length,
    );
  });

  it('o anúncio mostra o fruto', () => {
    const announce = buildPrayerSteps(singleMysterySession)[0]!;
    expect(presentPrayerStep(announce).bodySummary).toBe(
      'Primeiro mistério gozoso. Fruto: a humildade.',
    );
  });

  it('em latim, título e tradução acompanham o passo', () => {
    const steps = buildPrayerSteps({ ...singleMysterySession, form: traditionalLa });
    const hail = steps.find((step) => step.id === 'single-hail-3')!;
    const presented = presentPrayerStep(hail, traditionalLa);
    expect(presented.title).toBe('Ave Maria 3');
    expect(presented.bodyFull.startsWith('Ave Maria')).toBe(true);
    expect(presented.translation).toBe(getFixedPrayer('hail-mary').fullText);
  });
});

describe('sessão salva com forma', () => {
  const catalog = getEmbeddedCatalog('classic');
  const config = {
    mode: 'full' as const,
    set: 'classic' as const,
    mysteries: catalog,
    form: { traditional: true, language: 'la', fatima: false } as PrayerForm,
  };

  it('guarda e recupera a forma', () => {
    const parsed = parseIncompleteSession(serializeIncompleteSession(snapshotFromConfig(config, 40)));
    expect(parsed?.form).toEqual(config.form);
  });

  it('valida o índice com a forma salva', () => {
    const lastWithoutFatima = buildPrayerSteps(config).length - 2;
    const raw = serializeIncompleteSession(snapshotFromConfig(config, lastWithoutFatima));
    expect(parseIncompleteSession(raw)?.stepIndex).toBe(lastWithoutFatima);
  });

  it('descarta forma inválida sem perder a sessão', () => {
    const snapshot = snapshotFromConfig(config, 12);
    const raw = JSON.stringify({ ...snapshot, form: { language: 'grego' } });
    const parsed = parseIncompleteSession(raw);
    expect(parsed?.stepIndex).toBe(12);
    expect(parsed?.form).toBeUndefined();
  });
});
