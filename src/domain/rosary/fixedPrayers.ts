import type { FixedPrayer, FixedPrayerId, PrayerForm } from '@/domain/rosary/types';

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
  'concluding-prayer': {
    id: 'concluding-prayer',
    title: 'Oração conclusiva',
    summary: 'Oremos. Ó Deus, cujo Filho Unigênito, por sua vida, morte e ressurreição…',
    fullText:
      'Oremos. Ó Deus, cujo Filho Unigênito, por sua vida, morte e ressurreição, nos alcançou o prêmio da salvação eterna, concedei-nos, nós Vos pedimos, que, meditando estes mistérios do Santíssimo Rosário da Bem-aventurada Virgem Maria, imitemos o que contêm e alcancemos o que prometem. Pelo mesmo Cristo, Nosso Senhor. Amém.',
  },
};

type PrayerText = Pick<FixedPrayer, 'summary' | 'fullText'>;

/** Formas tradicionais em português; as demais orações não mudam. */
const traditionalTexts: Partial<Record<FixedPrayerId, PrayerText>> = {
  creed: {
    summary: prayers.creed.summary,
    fullText: prayers.creed.fullText.replace('desceu à mansão dos mortos', 'desceu aos infernos'),
  },
  'glory-be': {
    summary: prayers['glory-be'].summary,
    fullText:
      'Glória ao Pai, e ao Filho, e ao Espírito Santo. Assim como era no princípio, agora e sempre, e por todos os séculos dos séculos. Amém.',
  },
  'fatima-prayer': {
    summary: prayers['fatima-prayer'].summary,
    fullText:
      'Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o Céu e socorrei principalmente as que mais precisarem.',
  },
};

/** Oferecimento e Agradecimento são devoções em português, sem texto latino consagrado. */
const latinTexts: Partial<Record<FixedPrayerId, PrayerText & { title: string }>> = {
  'sign-of-cross': {
    title: 'Signum Crucis',
    summary: 'Per signum Crucis de inimicis nostris libera nos, Deus noster…',
    fullText:
      'Per signum Crucis de inimicis nostris libera nos, Deus noster. In nomine Patris, et Filii, et Spiritus Sancti. Amen.',
  },
  creed: {
    title: 'Credo',
    summary: 'Credo in Deum Patrem omnipotentem, Creatorem caeli et terrae…',
    fullText: `Credo in Deum Patrem omnipotentem, Creatorem caeli et terrae. Et in Iesum Christum, Filium eius unicum, Dominum nostrum, qui conceptus est de Spiritu Sancto, natus ex Maria Virgine, passus sub Pontio Pilato, crucifixus, mortuus, et sepultus, descendit ad inferos, tertia die resurrexit a mortuis, ascendit ad caelos, sedet ad dexteram Dei Patris omnipotentis, inde venturus est iudicare vivos et mortuos.

Credo in Spiritum Sanctum, sanctam Ecclesiam catholicam, sanctorum communionem, remissionem peccatorum, carnis resurrectionem, vitam aeternam. Amen.`,
  },
  'our-father': {
    title: 'Pater Noster',
    summary: 'Pater noster, qui es in caelis, sanctificetur nomen tuum…',
    fullText:
      'Pater noster, qui es in caelis, sanctificetur nomen tuum. Adveniat regnum tuum. Fiat voluntas tua, sicut in caelo et in terra. Panem nostrum quotidianum da nobis hodie, et dimitte nobis debita nostra, sicut et nos dimittimus debitoribus nostris. Et ne nos inducas in tentationem, sed libera nos a malo. Amen.',
  },
  'hail-mary': {
    title: 'Ave Maria',
    summary: 'Ave Maria, gratia plena, Dominus tecum…',
    fullText:
      'Ave Maria, gratia plena, Dominus tecum. Benedicta tu in mulieribus, et benedictus fructus ventris tui, Iesus. Sancta Maria, Mater Dei, ora pro nobis peccatoribus, nunc et in hora mortis nostrae. Amen.',
  },
  'glory-be': {
    title: 'Gloria Patri',
    summary: 'Gloria Patri, et Filio, et Spiritui Sancto…',
    fullText:
      'Gloria Patri, et Filio, et Spiritui Sancto. Sicut erat in principio, et nunc et semper, et in saecula saeculorum. Amen.',
  },
  'fatima-prayer': {
    title: 'Oratio Fatimae',
    summary: 'Domine Iesu, dimitte nobis debita nostra, salva nos ab igne inferni…',
    fullText:
      'Domine Iesu, dimitte nobis debita nostra, salva nos ab igne inferni, perduc in caelum omnes animas, praesertim eas quae misericordiae tuae maxime indigent.',
  },
  'hail-holy-queen': {
    title: 'Salve Regina',
    summary: 'Salve, Regina, mater misericordiae; vita, dulcedo et spes nostra, salve…',
    fullText:
      'Salve, Regina, mater misericordiae; vita, dulcedo et spes nostra, salve. Ad te clamamus, exsules filii Hevae. Ad te suspiramus, gementes et flentes in hac lacrimarum valle. Eia ergo, advocata nostra, illos tuos misericordes oculos ad nos converte. Et Iesum, benedictum fructum ventris tui, nobis post hoc exsilium ostende. O clemens, o pia, o dulcis Virgo Maria. Ora pro nobis, sancta Dei Genetrix, ut digni efficiamur promissionibus Christi. Amen.',
  },
  'concluding-prayer': {
    title: 'Oremus',
    summary: 'Oremus. Deus, cuius Unigenitus per vitam, mortem et resurrectionem suam…',
    fullText:
      'Oremus. Deus, cuius Unigenitus per vitam, mortem et resurrectionem suam nobis salutis aeternae praemia comparavit: concede, quaesumus, ut haec mysteria sacratissimo beatae Mariae Virginis Rosario recolentes, et imitemur quod continent, et quod promittunt assequamur. Per eundem Christum Dominum nostrum. Amen.',
  },
};

export function getFixedPrayer(id: FixedPrayerId, form?: PrayerForm): FixedPrayer {
  const base = prayers[id];
  const portuguese = form?.traditional ? { ...base, ...traditionalTexts[id] } : base;
  const latin = form?.language === 'la' ? latinTexts[id] : undefined;
  return latin ? { ...portuguese, ...latin, translation: portuguese.fullText } : portuguese;
}

export function listFixedPrayerIds(): FixedPrayerId[] {
  return Object.keys(prayers) as FixedPrayerId[];
}
