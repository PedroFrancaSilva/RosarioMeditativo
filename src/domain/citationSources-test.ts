import {
  catechismLink,
  commentaryLink,
  parseBibleReference,
  passageLabel,
  passageLink,
  shortCitationSource,
  summaLink,
} from '@/domain/citationSources';
import { CURATED_MEDITATIONS } from '@/data/content/curatedMeditations';

describe('citationSources', () => {
  it('lê a referência bíblica e aponta para o capítulo', () => {
    expect(parseBibleReference('Lc 1, 26-27')).toMatchObject({ book: 'Lc', chapter: 1, gospel: true });
    expect(parseBibleReference('1 Co 15, 14-22')).toMatchObject({ book: '1 Co', chapter: 15, gospel: false });
    expect(passageLink('Jo 19, 25-27').url).toBe('https://www.bibliacatolica.com.br/biblia-ave-maria/sao-joao/19/');
    expect(passageLink('Ap 12, 1').label).toBe('Ler Apocalipse, capítulo 12');
  });

  it('só chama de Evangelho os quatro evangelhos', () => {
    expect(passageLabel('Mt 28, 5-10')).toBe('Evangelho');
    expect(passageLabel('Is 53, 5')).toBe('Sagrada Escritura');
    expect(passageLabel('At 2, 1-4')).toBe('Sagrada Escritura');
  });

  it('encontra a página do Catecismo que contém o parágrafo', () => {
    expect(catechismLink(484)?.url).toMatch(/p1s2cap2_422-682_po\.html$/);
    expect(catechismLink(2677)?.url).toMatch(/p4s1cap2_2650-2696_po\.html$/);
    expect(catechismLink(9999)).toBeNull();
  });

  it('monta o endereço da Suma por parte, questão e artigo', () => {
    expect(summaLink('Suma Teológica, III, q. 30, a. 1')?.url).toBe('https://www.newadvent.org/summa/4030.htm#article1');
    expect(summaLink('Suma Teológica, I-II, q. 108, a. 1, ad 1')?.url).toBe('https://www.newadvent.org/summa/2108.htm#article1');
    expect(summaLink('Suma Teológica, I, q. 37, a. 1 (texto abreviado)')?.url).toBe('https://www.newadvent.org/summa/1037.htm#article1');
  });

  it('documentos do Magistério apontam para vatican.va; o resto vira busca', () => {
    expect(commentaryLink('São João Paulo II', '*Rosarium Virginis Mariae*, §23').url).toContain('rosarium-virginis-mariae');
    expect(commentaryLink('Catecismo da Igreja Católica', 'CIC 2676 (texto abreviado).').kind).toBe('source');
    const augustine = commentaryLink('Santo Agostinho', 'Sermão 51');
    expect(augustine.kind).toBe('search');
    expect(augustine.url).toContain(encodeURIComponent('Santo Agostinho Sermão 51'));
  });

  it('encurta a fonte sem as notas de tradução', () => {
    expect(shortCitationSource('*Munificentissimus Deus*, §44 (Definição solene do dogma)')).toBe('Munificentissimus Deus, §44');
    expect(shortCitationSource('Suma Teológica, III, q. 30, a. 1')).toBe('Suma Teológica, III, q. 30, a. 1');
    expect(shortCitationSource(null)).toBe('');
  });

  it('todo o conteúdo curado tem rótulo e link', () => {
    for (const meditation of Object.values(CURATED_MEDITATIONS)) {
      for (const passage of meditation.passages) {
        expect(passageLink(passage.reference).kind).toBe('source');
        for (const commentary of passage.commentaries) {
          expect(commentaryLink(commentary.author, commentary.source).url).toMatch(/^https:\/\//);
        }
      }
    }
  });
});
