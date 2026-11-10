import { getFixedPrayer } from '@/domain/rosary/fixedPrayers';

const offering =
  'Divino Jesus, nós Vos oferecemos este terço que vamos rezar, meditando nos mistérios da Vossa Redenção. Concedei-nos, por intercessão da Virgem Maria, Mãe de Deus e nossa Mãe, as virtudes que nos são necessárias para bem rezá-lo e a graça de ganharmos as indulgências desta santa devoção.';

const thanksgiving =
  'Infinitas graças vos damos, soberana Rainha, pelos benefícios que todos os dias recebemos de vossas mãos liberais. Dignai-vos, agora e para sempre, tomar-nos debaixo do vosso poderoso amparo e, para mais vos agradecer, vos saudamos com uma Salve Rainha.';

const salve =
  'Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós bradamos, os degredados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei. E, depois deste desterro, mostrai-nos Jesus, bendito fruto do vosso ventre, ó clemente, ó piedosa, ó doce sempre Virgem Maria. Rogai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém.';

describe('getFixedPrayer', () => {
  it('devolve oferecimento, agradecimento e Salve Rainha sem rede', () => {
    const opening = getFixedPrayer('opening-offering');
    const closing = getFixedPrayer('closing-thanksgiving');
    const queen = getFixedPrayer('hail-holy-queen');

    expect(opening.fullText).toBe(offering);
    expect(opening.summary.length).toBeGreaterThan(0);
    expect(closing.fullText).toBe(thanksgiving);
    expect(closing.summary.length).toBeGreaterThan(0);
    expect(queen.fullText).toBe(salve);
    expect(queen.summary.length).toBeGreaterThan(0);
    expect(getFixedPrayer('sign-of-cross').fullText.startsWith('Pelo sinal da Santa Cruz')).toBe(
      true,
    );
  });
});
