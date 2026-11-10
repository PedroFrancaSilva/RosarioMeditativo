import type { FixedPrayer, FixedPrayerId } from '@/domain/rosary/types';

const prayers: Record<FixedPrayerId, FixedPrayer> = {
  'sign-of-cross': {
    id: 'sign-of-cross',
    title: 'Sinal da Cruz',
    summary: 'Pelo sinal da Santa Cruz, livrai-nos, Deus, nosso Senhor, dos nossos inimigos…',
    fullText:
      'Pelo sinal da Santa Cruz, livrai-nos, Deus, nosso Senhor, dos nossos inimigos. Em nome do Pai, e do Filho, e do Espírito Santo. Amém.',
  },
  'opening-offering': {
    id: 'opening-offering',
    title: 'Oferecimento',
    summary: 'Divino Jesus, nós Vos oferecemos este terço que vamos rezar…',
    fullText:
      'Divino Jesus, nós Vos oferecemos este terço que vamos rezar, meditando nos mistérios da Vossa Redenção. Concedei-nos, por intercessão da Virgem Maria, Mãe de Deus e nossa Mãe, as virtudes que nos são necessárias para bem rezá-lo e a graça de ganharmos as indulgências desta santa devoção.',
  },
  creed: {
    id: 'creed',
    title: 'Credo',
    summary:
      'Creio em Deus Pai todo-poderoso, Criador do céu e da terra, e em Jesus Cristo, seu único Filho, nosso Senhor…',
    fullText: `Creio em Deus Pai todo-poderoso, Criador do céu e da terra, e em Jesus Cristo, seu único Filho, nosso Senhor, que foi concebido pelo poder do Espírito Santo, nasceu da Virgem Maria, padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado, desceu à mansão dos mortos, ressuscitou ao terceiro dia, subiu aos céus, está sentado à direita de Deus Pai todo-poderoso, de onde há de vir a julgar os vivos e os mortos.

Creio no Espírito Santo, na Santa Igreja Católica, na comunhão dos santos, na remissão dos pecados, na ressurreição da carne, na vida eterna. Amém.`,
  },
  'our-father': {
    id: 'our-father',
    title: 'Pai-Nosso',
    summary: 'Pai-Nosso que estais nos céus, santificado seja o vosso nome…',
    fullText:
      'Pai-Nosso que estais nos céus, santificado seja o vosso nome, venha a nós o vosso Reino, seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje, perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido, e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.',
  },
  'hail-mary': {
    id: 'hail-mary',
    title: 'Ave-Maria',
    summary: 'Ave, Maria, cheia de graça, o Senhor é convosco…',
    fullText:
      'Ave, Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora da nossa morte. Amém.',
  },
  'glory-be': {
    id: 'glory-be',
    title: 'Glória',
    summary: 'Glória ao Pai, e ao Filho, e ao Espírito Santo…',
    fullText:
      'Glória ao Pai, e ao Filho, e ao Espírito Santo. Como era no princípio, agora e sempre. Amém.',
  },
  'fatima-prayer': {
    id: 'fatima-prayer',
    title: 'Oração de Fátima',
    summary: 'Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno…',
    fullText:
      'Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o Céu, especialmente aquelas que mais precisarem.',
  },
  'closing-thanksgiving': {
    id: 'closing-thanksgiving',
    title: 'Agradecimento',
    summary: 'Infinitas graças vos damos, soberana Rainha…',
    fullText:
      'Infinitas graças vos damos, soberana Rainha, pelos benefícios que todos os dias recebemos de vossas mãos liberais. Dignai-vos, agora e para sempre, tomar-nos debaixo do vosso poderoso amparo e, para mais vos agradecer, vos saudamos com uma Salve Rainha.',
  },
  'hail-holy-queen': {
    id: 'hail-holy-queen',
    title: 'Salve Rainha',
    summary: 'Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve!…',
    fullText:
      'Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós bradamos, os degredados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei. E, depois deste desterro, mostrai-nos Jesus, bendito fruto do vosso ventre, ó clemente, ó piedosa, ó doce sempre Virgem Maria. Rogai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém.',
  },
};

export function getFixedPrayer(id: FixedPrayerId): FixedPrayer {
  return prayers[id];
}

export function listFixedPrayerIds(): FixedPrayerId[] {
  return Object.keys(prayers) as FixedPrayerId[];
}
