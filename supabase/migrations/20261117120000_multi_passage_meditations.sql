-- Pacotes curados com várias passagens por mistério; cada comentário ligado à sua passagem.
-- Gerado a partir de src/data/content/*Meditation.json (mesmo conteúdo do fallback offline).
-- Substitui passagens e comentários dos 20 mistérios; imagens e referências de estudo não mudam.

delete from public.passages;
delete from public.commentaries;

-- joyful-1 · Lc 1, 26-27
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $joyful_1_p0t$Estando Isabel no sexto mês, foi enviado por Deus o anjo Gabriel a uma cidade da Galileia, chamada Nazaré, a uma virgem desposada com um varão, chamado José, da casa de David; o nome da virgem era Maria.$joyful_1_p0t$, $joyful_1_p0r$Lc 1, 26-27$joyful_1_p0r$, 0
from public.mysteries m where m.type = 'joyful' and m.sort_order = 1;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $joyful_1_p0c0a$São Tomás de Aquino$joyful_1_p0c0a$, $joyful_1_p0c0s$Suma Teológica, III, q. 30, a. 1$joyful_1_p0c0s$, $joyful_1_p0c0t$Era conveniente que fosse anunciado à bem-aventurada Virgem que ela havia de conceber Cristo. Primeiro, para que se guardasse a devida ordem na união do Filho de Deus com a Virgem, a saber, que primeiro sua mente fosse instruída acerca d’Ele, antes de O conceber na carne. Segundo, para que pudesse ser testemunha mais certa deste mistério… Terceiro, para que oferecesse a Deus os dons voluntários de sua obediência, para o que se mostrou pronta, dizendo: Eis a serva do Senhor. Em quarto lugar, para mostrar que existe um certo matrimônio espiritual entre o Filho de Deus e a natureza humana. E por isso, na Anunciação, era solicitado o consentimento da Virgem em lugar de toda a natureza humana.$joyful_1_p0c0t$),
  (1, $joyful_1_p0c1a$São Tomás de Aquino$joyful_1_p0c1a$, $joyful_1_p0c1s$Suma Teológica, III, q. 30, a. 2$joyful_1_p0c1s$, $joyful_1_p0c1t$Convinha que fosse anunciado à Mãe de Deus por um Anjo o mistério da divina encarnação, por três razões. Primeiro, para que também nisto se conservasse a ordenação divina, segundo a qual as coisas divinas chegam aos homens por meio dos Anjos. Segundo, isto foi conveniente à restauração da natureza humana… (porque a ruína começou pela serpente enviada à mulher, o reparo começa pelo anjo enviado à Virgem). Terceiro, porque isto convinha à virgindade da Mãe de Deus. Por isso Jerônimo diz: É conveniente que um anjo seja enviado à Virgem, porque a virgindade é sempre aparentada com os anjos.$joyful_1_p0c1t$),
  (2, $joyful_1_p0c2a$Santo Agostinho$joyful_1_p0c2a$, $joyful_1_p0c2s$De sancta virginitate, 3$joyful_1_p0c2s$, $joyful_1_p0c2t$Maria é mais bem-aventurada por receber a fé de Cristo do que por conceber a carne de Cristo$joyful_1_p0c2t$)
) as v(sort_order, author, source, text) on true
where m.type = 'joyful' and m.sort_order = 1;

-- joyful-1 · Lc 1, 28-38
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $joyful_1_p1t$Entrando o anjo onde ela estava, disse-lhe: «Deus te salve, cheia de graça; o Senhor é contigo.» … O anjo disse-lhe: «Não temas, Maria, pois achaste graça diante de Deus; eis que conceberás no teu ventre, e darás à luz um filho, a quem porás o nome de Jesus.» … Maria disse ao anjo: «Como se fará isso, pois eu não conheço varão?» O anjo respondeu-lhe: «O Espírito Santo descerá sobre ti, e a virtude do Altíssimo te cobrirá com a sua sombra; por isso mesmo o Menino que há-de nascer de ti, será santo e será chamado Filho de Deus.» … Então Maria disse: «Eis aqui a serva do Senhor, faça-se em mim a tua palavra.» E o anjo afastou-se dela.$joyful_1_p1t$, $joyful_1_p1r$Lc 1, 28-38$joyful_1_p1r$, 1
from public.mysteries m where m.type = 'joyful' and m.sort_order = 1;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 1
join (values
  (0, $joyful_1_p1c0a$Catecismo da Igreja Católica$joyful_1_p1c0a$, $joyful_1_p1c0s$CIC 484$joyful_1_p1c0s$, $joyful_1_p1c0t$A Anunciação a Maria inaugura a «plenitude dos tempos» (Gl 4, 4), isto é, o cumprimento das promessas e das preparações. Maria é convidada a conceber Aquele em quem habitará «corporalmente toda a plenitude da Divindade» (Cl 2, 9). A resposta divina ao seu «como será isto, se Eu não conheço homem?» (Lc 1, 34) é dada pelo poder do Espírito: «O Espírito Santo virá sobre ti» (Lc 1, 35).$joyful_1_p1c0t$),
  (1, $joyful_1_p1c1a$Catecismo da Igreja Católica$joyful_1_p1c1a$, $joyful_1_p1c1s$CIC 490$joyful_1_p1c1s$, $joyful_1_p1c1t$Para vir a ser Mãe do Salvador, Maria «foi adornada por Deus com dons dignos de uma tão grande missão». O anjo Gabriel, no momento da Anunciação, saúda-a como «cheia de graça». De facto, para poder dar o assentimento livre da sua fé ao anúncio da sua vocação, era necessário que Ela fosse totalmente movida pela graça de Deus.$joyful_1_p1c1t$),
  (2, $joyful_1_p1c2a$Catecismo da Igreja Católica$joyful_1_p1c2a$, $joyful_1_p1c2s$CIC 494$joyful_1_p1c2s$, $joyful_1_p1c2t$… Maria respondeu com «a obediência da fé»… «Eis a serva do Senhor; faça-se em mim segundo a tua palavra» (Lc 1, 38). Assim, dando o seu consentimento à palavra de Deus, Maria torna-se Mãe de Jesus.$joyful_1_p1c2t$),
  (3, $joyful_1_p1c3a$São Bernardo de Claraval$joyful_1_p1c3a$, $joyful_1_p1c3s$In laudibus Virginis Matris, homilia 4, 8-9 (texto abreviado)$joyful_1_p1c3s$, $joyful_1_p1c3t$Ouviste, ó Virgem, que vais conceber e dar à luz um Filho… O Anjo aguarda a tua resposta… Nós também, miseravelmente oprimidos… esperamos a tua palavra de misericórdia. Em tuas mãos está o preço da nossa salvação. Dá, depressa, ó Virgem, a tua resposta. Responde sem demora ao Anjo, ou, para melhor dizer, ao Senhor por meio do Anjo. Pronuncia uma palavra e recebe a Palavra. Profere a tua palavra humana e concebe a divina.$joyful_1_p1c3t$)
) as v(sort_order, author, source, text) on true
where m.type = 'joyful' and m.sort_order = 1;

-- joyful-2 · Lc 1, 39-45
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $joyful_2_p0t$Naqueles dias, levantando-se Maria, foi com pressa às montanhas, a uma cidade de Judá. Entrou em casa de Zacarias, e saudou Isabel. Aconteceu que, apenas Isabel ouviu a saudação de Maria, o menino saltou no seu ventre, e Isabel ficou cheia do Espírito Santo; e exclamou em alta voz: «Bendita és tu entre todas as mulheres, e bendito é o fruto do teu ventre. Donde a mim esta dita, que a mãe do meu Senhor venha ter comigo? Porque, logo que a voz da tua saudação chegou aos meus ouvidos, o menino saltou de alegria no meu ventre. Bem-aventurada a que acreditou, porque se hão-de cumprir as coisas que da parte do Senhor foram ditas.»$joyful_2_p0t$, $joyful_2_p0r$Lc 1, 39-45$joyful_2_p0r$, 0
from public.mysteries m where m.type = 'joyful' and m.sort_order = 2;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $joyful_2_p0c0a$Catecismo da Igreja Católica$joyful_2_p0c0a$, $joyful_2_p0c0s$CIC 717$joyful_2_p0c0s$, $joyful_2_p0c0t$«Apareceu um homem, enviado por Deus, que tinha o nome de João» (Jo 1, 6). João é «cheio do Espírito Santo já desde o seio materno» (Lc 1, 15) (81), pelo próprio Cristo que a Virgem acabava de conceber por obra e graça do Espírito Santo. A « visitação» de Maria a Isabel tornou-se, assim, «visita de Deus ao seu povo» (82).$joyful_2_p0c0t$),
  (1, $joyful_2_p0c1a$Santo Ambrósio$joyful_2_p0c1a$, $joyful_2_p0c1s$Expositio Evangelii secundum Lucam, livro II, 19 (texto abreviado). Tradução do Ofício das Leituras de 21 de dezembro, Liturgia das Horas (CNBB), conferida com o latim. O número começa por «Morale est omnibus…», aqui omitido.$joyful_2_p0c1s$, $joyful_2_p0c1t$… O Anjo anunciara à Virgem Maria coisas misteriosas. Para fortalecer sua fé com um exemplo, anunciou-lhe a maternidade de uma mulher idosa e estéril, como prova de que é possível a Deus tudo que ele quer. Logo ao ouvir a notícia, Maria dirigiu-se às montanhas, não por falta de fé na profecia ou falta de confiança na mensagem, nem por duvidar do exemplo dado, mas guiada pela felicidade de ver cumprida a promessa, levada pela vontade de prestar um serviço, movida pelo impulso interior de sua alegria. Já plena de Deus, aonde ir depressa senão às alturas? A graça do Espírito Santo ignora a lentidão.$joyful_2_p0c1t$),
  (2, $joyful_2_p0c2a$Santo Ambrósio$joyful_2_p0c2a$, $joyful_2_p0c2s$Expositio Evangelii secundum Lucam, livro II, 23 (texto abreviado). Mesma tradução do Ofício das Leituras, 21 de dezembro (CNBB), conferida com o latim de II, 23 («Vocem prior Elizabeth audivit, sed Ioannes prior gratiam sensit»).$joyful_2_p0c2s$, $joyful_2_p0c2t$Notai como cada palavra está escolhida com perfeita precisão e propriedade: Isabel foi a primeira a ouvir a voz, mas João foi o primeiro a pressentir a graça; aquela ouviu segundo a ordem da natureza, este exultou em virtude do mistério. Ela percebeu a chegada de Maria, ele, a do Senhor; a mulher ouviu a voz da mulher, o menino sentiu a presença do Filho; elas proclamam a graça de Deus, eles realizam-na interiormente, iniciando no seio de suas mães o mistério de misericórdia; e, por um duplo milagre, as mães profetizam sob a inspiração de seus filhos. A criança exultou, a mãe ficou cheia do Espírito Santo. A mãe não se antecipou ao filho; mas estando o filho cheio do Espírito Santo, comunicou-o a sua mãe. …$joyful_2_p0c2t$),
  (3, $joyful_2_p0c3a$Catecismo da Igreja Católica$joyful_2_p0c3a$, $joyful_2_p0c3s$CIC 2676 (texto abreviado). Omitidas as secções da saudação do anjo («Ave, Maria» e «Cheia de graça»); fica a saudação de Isabel.$joyful_2_p0c3s$, $joyful_2_p0c3t$… «Bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus». Depois da saudação do anjo, fazemos nossa a de Isabel. «Cheia [...] do Espírito Santo» (Lc 1, 41), Isabel é a primeira, na longa sequência das gerações, a declarar Maria bem-aventurada (26): «Feliz d'Aquela que acreditou...» (Lc 1, 45); Maria é «bendita entre as mulheres», porque acreditou no cumprimento da Palavra do Senhor. Abraão, pela sua fé, tornou-se uma bênção «para todas as nações da terra» (Gn 12, 3). Pela sua fé, Maria tornou-se a mãe dos crentes, graças a quem todas as nações da terra recebem Aquele que é a própria bênção de Deus: Jesus, «fruto bendito do vosso ventre».$joyful_2_p0c3t$),
  (4, $joyful_2_p0c4a$Catecismo da Igreja Católica$joyful_2_p0c4a$, $joyful_2_p0c4s$CIC 2677 (texto abreviado). O parágrafo continua com o «rogai por nós» e a hora da morte, aqui omitidos.$joyful_2_p0c4s$, $joyful_2_p0c4t$«Santa Maria, Mãe de Deus, rogai por nós...». Com Isabel, também nós ficamos maravilhados: «E de onde me é dado que venha ter comigo a Mãe do meu Senhor?» (Lc 1, 43). …$joyful_2_p0c4t$),
  (5, $joyful_2_p0c5a$São Tomás de Aquino$joyful_2_p0c5a$, $joyful_2_p0c5s$Suma Teológica, III, q. 27, a. 6, corpo do artigo (primeiro parágrafo do «Respondeo», sobre o salto de João; não é o artigo inteiro). Latim do Corpus Thomisticum. Tradução a partir desse latim, confrontada com a inglesa dos Dominican Fathers (New Advent) e com a portuguesa de permanencia.org.br; não é a do Lírio Católico. Permanência traduz «a maioribus» por «pelos pais» e traz o lapso «saltor»; aqui segue-se o latim: os maiores, e «exsultatio» (o salto / a exultação).$joyful_2_p0c5s$, $joyful_2_p0c5t$Agostinho, na carta a Dardano, parece falar com dúvida da santificação deles no ventre. A exultação de João no ventre, como ele diz, pôde ser o sinal de uma realidade tão grande, a saber, que a mulher era Mãe de Deus, a dar a conhecer aos maiores, sem que o menino a conhecesse. Por isso no Evangelho não se diz que o menino acreditou no ventre, mas que exultou. Vemos, porém, que a exultação não é só das crianças, mas também dos animais. Esta, contudo, foi insólita, porque foi no ventre. E assim, como costumam fazer-se os milagres, fez-se por ação divina no menino, não humanamente pelo menino. E ainda que neste menino o uso da razão e da vontade se tenha antecipado a tal ponto que, já nas entranhas da mãe, pudesse conhecer, crer e consentir, o que nos outros meninos se espera da idade, também isto julgo dever contar-se entre os milagres do poder divino.$joyful_2_p0c5t$),
  (6, $joyful_2_p0c6a$São João Paulo II$joyful_2_p0c6a$, $joyful_2_p0c6s$Carta encíclica Redemptoris Mater, n. 12 (texto abreviado). Cita-se o segundo parágrafo do número, por inteiro; o primeiro parágrafo do n. 12, sobre o caminho até Ain-Karim, fica de fora.$joyful_2_p0c6s$, $joyful_2_p0c6t$… Maria dirige-se, pois, impelida pela caridade, a casa da sua parente. Quando aí entrou, Isabel, ao responder à sua saudação, tendo sentido o menino estremecer de alegria no próprio seio, «cheia do Espírito Santo», saúda por sua vez Maria em alta voz: «Bendita és tu entre as mulheres e bendito o fruto do teu ventre» (cf. Lc 1, 40-42). Esta proclamação e aclamação de Isabel deveria vir a entrar na Ave Maria, como continuação da saudação do Anjo, tornando-se assim uma das orações mais frequentes da Igreja. Mas são ainda mais significativas as palavras de Isabel, na pergunta que se segue: «E donde me é dada a dita que venha ter comigo a mãe do meu Senhor?» (Lc 1, 43). Isabel dá testemunho acerca de Maria: reconhece e proclama que diante de si está a Mãe do Senhor, a Mãe do Messias. Neste testemunho participa também o filho que Isabel traz no seio: «estremeceu de alegria o menino no meu seio» (Lc 1, 44). O menino é o futuro João Baptista, que, nas margens do Jordão, indicará em Jesus o Messias.$joyful_2_p0c6t$),
  (7, $joyful_2_p0c7a$São João Paulo II$joyful_2_p0c7a$, $joyful_2_p0c7s$Carta apostólica Rosarium Virginis Mariae, n. 20 (texto abreviado). A frase seguinte do número passa a Belém e aos outros mistérios gozosos.$joyful_2_p0c7s$, $joyful_2_p0c7t$Sob o signo da exultação, aparece depois a cena do encontro com Isabel, onde a mesma voz de Maria e a presença de Cristo no seu ventre fazem « saltar de alegria » João (cf. Lc 1, 44). …$joyful_2_p0c7t$)
) as v(sort_order, author, source, text) on true
where m.type = 'joyful' and m.sort_order = 2;

-- joyful-2 · Lc 1, 46-49
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $joyful_2_p1t$Então Maria disse: «A minha alma glorifica o Senhor; e o meu espírito exulta em Deus meu Salvador, porque lançou os olhos para a baixeza da sua serva. Portanto, eis que, de hoje em diante, todas as gerações me chamarão bem-aventurada. Porque o Todo-poderoso fez em mim grandes coisas, o seu nome é santo.»$joyful_2_p1t$, $joyful_2_p1r$Lc 1, 46-49$joyful_2_p1r$, 1
from public.mysteries m where m.type = 'joyful' and m.sort_order = 2;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 1
join (values
  (0, $joyful_2_p1c0a$São Bernardo de Claraval$joyful_2_p1c0a$, $joyful_2_p1c0s$Sermo in dominica infra octavam Assumptionis B. V. Mariae (De duodecim praerogativis B. V. Mariae), n. 12 (texto abreviado). Tradução a partir do latim consultado em duas transcrições (colunas cerca de 436); não é o Lírio Católico nem uma edição portuguesa. As cópias online deturpam «dicta» («aicta» / «acta»); aqui segue-se o texto de Lc 1, 45 que Bernardo cita.$joyful_2_p1c0s$, $joyful_2_p1c0t$… Chegou-se então a Isabel, e logo a glória singular da Virgem lhe foi revelada pelo Espírito. Admirava-se também da pessoa que vinha, dizendo: Donde me vem isto, que a Mãe do meu Senhor venha a mim? Louvava também a voz da que saudava, acrescentando: Quando a voz da tua saudação chegou aos meus ouvidos, o menino exultou de alegria no meu ventre; e chamava bem-aventurada a fé da que acreditou: Bem-aventurada, dizia, a que acreditaste, porque se hão de cumprir em ti as coisas que te foram ditas da parte do Senhor. Grandes louvores, sem dúvida; mas a humildade devota não sofreu reter nada para si, e antes devolveu tudo àquele cujos benefícios nela eram louvados. Tu, diz ela, engrandeces a mãe do Senhor; mas a minha alma magnifica o Senhor. …$joyful_2_p1c0t$)
) as v(sort_order, author, source, text) on true
where m.type = 'joyful' and m.sort_order = 2;

-- joyful-3 · Lc 2, 6-7
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $joyful_3_p0t$Ora, estando ali, aconteceu completarem-se os dias em que devia dar à luz, e deu à luz o seu filho primogénito, e o enfaixou, e o reclinou numa manjedoura, porque não havia lugar para eles na estalagem.$joyful_3_p0t$, $joyful_3_p0r$Lc 2, 6-7$joyful_3_p0r$, 0
from public.mysteries m where m.type = 'joyful' and m.sort_order = 3;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $joyful_3_p0c0a$Catecismo da Igreja Católica$joyful_3_p0c0a$, $joyful_3_p0c0s$CIC 526$joyful_3_p0c0s$, $joyful_3_p0c0t$«Tornar-se criança» diante de Deus é a condição para entrar no Reino, e para isso, é preciso abaixar-se, tornar-se pequeno. Mais ainda: é preciso «nascer do Alto» (Jo 3, 7), «nascer de Deus» para se «tornar filho de Deus». O mistério do Natal cumpre-se em nós quando Cristo «Se forma» em nós. O Natal é o mistério desta «admirável permuta»: «O admirabile commercium! Creator generis humani, animatum corpus sumens de Virgine nasci dignatus est; et, procedens homo sine semine, largitus est nobis suam deitatem». – «Oh admirável permuta! O Criador do género humano, tomando corpo e alma, dignou-Se nascer duma Virgem; e, feito homem sem progenitor humano, tornou-nos participantes da sua divindade!»$joyful_3_p0c0t$),
  (1, $joyful_3_p0c1a$São Tomás de Aquino$joyful_3_p0c1a$, $joyful_3_p0c1s$Suma Teológica, III, q. 35, a. 7, solução (tradução consultada em permanencia.org.br; esta página do artigo não nomeia o tradutor)$joyful_3_p0c1s$, $joyful_3_p0c1t$Cristo quis nascer em Belém por duas razões. — Primeiro, porque foi feito da linhagem de Davi, segundo a carne, como diz o Apóstolo. Ora, a Davi foi feita uma promessa especial, sobre Cristo, como diz a Escritura: Disse o varão a favor do qual se decretou sobre o Cristo do Deus de Jacó. Por isso, em Belém, onde nasceu Davi, também quis nascer, para que se manifestasse, no lugar mesmo da sua natividade, o cumprimento da promessa feita. E é o que significa o Evangelista quando diz: Porque era da casa e da família de Davi. — Segundo, porque, como diz Gregório, Belém significa a casa do pão: E foi o próprio Cristo quem disse: Eu sou o pão vivo descido do céu.$joyful_3_p0c1t$),
  (2, $joyful_3_p0c2a$São Tomás de Aquino$joyful_3_p0c2a$, $joyful_3_p0c2s$Suma Teológica, III, q. 35, a. 8, ad 3 (tradução consultada em permanencia.org.br; esta página do artigo não nomeia o tradutor)$joyful_3_p0c2s$, $joyful_3_p0c2t$Como se disse, Cristo quis nascer quando começou a tomar incremento a luz do dia, para mostrar que vinha para fazer crescerem os homens na luz divina, como diz o Evangelho: Para alumiar os que vivem de assento nas trevas e na sombra da morte. — Semelhantemente, escolheu para tempo da sua natividade o rigor do inverno, a fim de sofrer por nós os padecimentos da carne.$joyful_3_p0c2t$),
  (3, $joyful_3_p0c3a$Santo Agostinho$joyful_3_p0c3a$, $joyful_3_p0c3s$Sermão 187, In Natali Domini, 1 (trad. Lírio Católico; texto abreviado). Numeração conferida com o Sermo CLXXXVII da edição de Migne (PL 38) em Wikisource, incipit «Laudem Domini loquetur os meum» e a frase «magnus dies Angelorum, parvus in die hominum».$joyful_3_p0c3s$, $joyful_3_p0c3t$A minha boca proclamará o louvor do Senhor: daquele Senhor por quem todas as coisas foram feitas, e que foi feito entre todas as coisas: … grande dia dos anjos, pequeno no dia dos homens: … fundador do sol, fundado sob o sol: … autor do céu e da terra, surgido sob o céu sobre a terra: … enchendo o mundo, jazendo numa manjedoura: … tão grande na forma de Deus, tão pequeno na forma de servo…$joyful_3_p0c3t$),
  (4, $joyful_3_p0c4a$Francisco$joyful_3_p0c4a$, $joyful_3_p0c4s$Carta apostólica Admirabile signum, 2 (texto abreviado)$joyful_3_p0c4s$, $joyful_3_p0c4t$A origem do Presépio fica-se a dever, antes de mais nada, a alguns pormenores do nascimento de Jesus em Belém, referidos no Evangelho. O evangelista Lucas limita-se a dizer que, tendo-se completado os dias de Maria dar à luz, «teve o seu filho primogénito, que envolveu em panos e recostou numa manjedoura, por não haver lugar para eles na hospedaria» (2, 7). Jesus é colocado numa manjedoura, que, em latim, se diz praesepium, donde vem a nossa palavra presépio. Ao entrar neste mundo, o Filho de Deus encontra lugar onde os animais vão comer. A palha torna-se a primeira enxerga para Aquele que Se há de revelar como «o pão vivo, o que desceu do céu» (Jo 6, 51). Uma simbologia, que já Santo Agostinho, a par doutros Padres da Igreja, tinha entrevisto quando escreveu: «Deitado numa manjedoura, torna-Se nosso alimento». …$joyful_3_p0c4t$),
  (5, $joyful_3_p0c5a$Francisco$joyful_3_p0c5a$, $joyful_3_p0c5s$Carta apostólica Admirabile signum, 8$joyful_3_p0c5s$, $joyful_3_p0c5t$O coração do Presépio começa a palpitar, quando colocamos lá, no Natal, a figura do Menino Jesus. Assim Se nos apresenta Deus, num menino, para fazer-Se acolher nos nossos braços. Naquela fraqueza e fragilidade, esconde o seu poder que tudo cria e transforma. Parece impossível, mas é assim: em Jesus, Deus foi criança e, nesta condição, quis revelar a grandeza do seu amor, que se manifesta num sorriso e nas suas mãos estendidas para quem quer que seja.$joyful_3_p0c5t$)
) as v(sort_order, author, source, text) on true
where m.type = 'joyful' and m.sort_order = 3;

-- joyful-3 · Lc 2, 8-14
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $joyful_3_p1t$Naquela mesma região, havia uns pastores que velavam e faziam de noite a guarda ao seu rebanho. Apareceu-lhes um anjo do Senhor, e a glória do Senhor os envolveu com a sua luz, e tiveram grande temor. Porém o anjo disse-lhes: «Não temais, porque eis que vos anuncio uma boa nova, que será de grande alegria para todo o povo: Nasceu-vos hoje na cidade de David um Salvador, que é o Cristo, o Senhor.» … E subitamente apareceu com o anjo uma multidão da milícia celeste, louvando a Deus, e dizendo: «Glória a Deus no mais alto dos céus, e paz na terra aos homens, objecto da boa vontade (de Deus).»$joyful_3_p1t$, $joyful_3_p1r$Lc 2, 8-14$joyful_3_p1r$, 1
from public.mysteries m where m.type = 'joyful' and m.sort_order = 3;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 1
join (values
  (0, $joyful_3_p1c0a$Catecismo da Igreja Católica$joyful_3_p1c0a$, $joyful_3_p1c0s$CIC 525$joyful_3_p1c0s$, $joyful_3_p1c0t$Jesus nasceu na humildade dum estábulo, no seio duma família pobre. As primeiras testemunhas deste acontecimento são simples pastores. E é nesta pobreza que se manifesta a glória do céu. A Igreja não se cansa de cantar a glória desta noite: «Hoje a Virgem dá à luz o Eterno e a terra oferece uma gruta ao Inacessível. Cantam-n'O os anjos e os pastores, e com a estrela os magos põem-se a caminho, porque Tu nasceste para nós, pequeno Infante. Deus eterno!»$joyful_3_p1c0t$),
  (1, $joyful_3_p1c1a$Santo Agostinho$joyful_3_p1c1a$, $joyful_3_p1c1s$Sermão 185, In Natali Domini, 1 (trad. Lírio Católico; texto abreviado). Numeração conferida com o incipit latino «Natalis Domini dicitur» em augustinus.it e com o Sermo CLXXXV da edição de Migne (PL 38) em Wikisource.$joyful_3_p1c1s$, $joyful_3_p1c1t$Chama-se Natal do Senhor quando a Sabedoria de Deus se mostrou infante, e o Verbo de Deus, sem palavras, emitiu a voz da carne. Contudo, aquela divindade oculta foi tanto assinalada aos Magos pelo testemunho de uma estrela, quanto anunciada aos pastores pela voz de um anjo. Celebramos, pois, com solenidade anual este dia, no qual se cumpriu a profecia que diz: a Verdade brotou da terra, e a justiça olhou do céu. A Verdade, que está no seio do Pai, brotou da terra, para estar também no seio de uma mãe. A Verdade, pela qual o mundo é mantido, brotou da terra, para ser carregada por mãos de mulher. A Verdade, pela qual a bem-aventurança dos anjos é incorruptivelmente nutrida, brotou da terra, para ser amamentada por peitos carnais. A Verdade, para a qual o céu não basta, brotou da terra, para ser posta numa manjedoura. Para bem de quem veio tão grande sublimidade em tão grande humildade? Certamente para nenhum bem seu; mas para grande bem nosso, se cremos. Desperta, ó homem: por ti Deus se fez homem. …$joyful_3_p1c1t$)
) as v(sort_order, author, source, text) on true
where m.type = 'joyful' and m.sort_order = 3;

-- joyful-4 · Lc 2, 22-24
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $joyful_4_p0t$Depois que se completaram os dias da purificação de Maria, segundo a lei de Moisés, levaram-no a Jerusalém para o apresentar ao Senhor, segundo o que está escrito na lei do Senhor: Todo o varão primogênito será consagrado ao Senhor, e para oferecerem em sacrifício, conforme o que também está escrito na lei do Senhor, um par de rolas ou dois pombinhos.$joyful_4_p0t$, $joyful_4_p0r$Lc 2, 22-24$joyful_4_p0r$, 0
from public.mysteries m where m.type = 'joyful' and m.sort_order = 4;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $joyful_4_p0c0a$Catecismo da Igreja Católica$joyful_4_p0c0a$, $joyful_4_p0c0s$CIC 583 (texto abreviado)$joyful_4_p0c0s$, $joyful_4_p0c0t$Jesus, como antes d'Ele os profetas, professou pelo templo de Jerusalém o mais profundo respeito. Ali foi apresentado por José e Maria, quarenta dias depois do seu nascimento…$joyful_4_p0c0t$),
  (1, $joyful_4_p0c1a$São Tomás de Aquino$joyful_4_p0c1a$, $joyful_4_p0c1s$Suma Teológica, III, q. 37, a. 3, respondeo (texto abreviado; tradução do latim)$joyful_4_p0c1s$, $joyful_4_p0c1t$Cristo quis ser feito sob a Lei, para resgatar os que estavam sob a Lei e para que a justificação da Lei se cumprisse espiritualmente nos seus membros. … Uma vez que Cristo, nascido de mulher, era primogénito e quis ser feito sob a Lei, o evangelista Lucas mostra que estas duas coisas foram observadas a respeito d’Ele. Primeiro, o que toca aos primogénitos, quando diz que o levaram a Jerusalém para o apresentar ao Senhor… Segundo, o que toca em comum a todos, quando diz que dessem uma oferta… um par de rolas ou dois pombinhos.$joyful_4_p0c1t$),
  (2, $joyful_4_p0c2a$São Tomás de Aquino$joyful_4_p0c2a$, $joyful_4_p0c2s$Suma Teológica, III, q. 37, a. 4, respondeo (tradução integral do latim; não é texto original em português)$joyful_4_p0c2s$, $joyful_4_p0c2t$Assim como a plenitude da graça deriva de Cristo para a Mãe, assim convinha que a Mãe se conformasse à humildade do Filho, pois Deus dá a graça aos humildes, como se diz na carta de Tiago. Por isso, assim como Cristo, embora não estivesse sujeito à Lei, quis submeter-se à circuncisão e aos outros encargos da Lei, para dar exemplo de humildade e de obediência, para aprovar a Lei e para tirar aos judeus ocasião de calúnia, pelas mesmas razões quis que também a sua Mãe cumprisse as observâncias da Lei, às quais, contudo, não estava sujeita.$joyful_4_p0c2t$),
  (3, $joyful_4_p0c3a$São Bernardo de Claraval$joyful_4_p0c3a$, $joyful_4_p0c3s$In Purificatione Beatae Mariae, sermo III, 2 (PL 183, 370) (texto abreviado; tradução do latim)$joyful_4_p0c3s$, $joyful_4_p0c3t$Verdadeiramente, ó bem-aventurada Virgem, verdadeiramente não tens motivo, nem te é necessária a purificação. … Oferece o teu Filho, Virgem sagrada, e apresenta ao Senhor o fruto bendito do teu ventre. Oferece, para reconciliação de todos nós, uma vítima santa, agradável a Deus. … Mas esta oblação, irmãos, parece assaz delicada, quando apenas é apresentado ao Senhor, resgatado com aves e logo reconduzido. Virá quando não será oferecido no templo, nem entre os braços de Simeão, mas fora da cidade, entre os braços da cruz. … Aquela será o sacrifício vespertino; esta é o matutino.$joyful_4_p0c3t$)
) as v(sort_order, author, source, text) on true
where m.type = 'joyful' and m.sort_order = 4;

-- joyful-4 · Lc 2, 25-35
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $joyful_4_p1t$Havia então em Jerusalém um homem chamado Simeão. Este homem era justo e piedoso; esperava a consolação de Israel, e o Espírito Santo estava nele. … ele o tomou em seus braços, e louvou a Deus, dizendo: «Agora, Senhor, podes deixar partir o teu servo em paz, segundo a tua palavra; porque os meus olhos viram a tua salvação, a qual preparaste em favor de todos os povos; luz para iluminar as nações, e glória de Israel, teu povo.» … Simeão os abençoou, e disse a Maria, sua mãe: «Eis que este Menino está posto para ruína e ressurgimento de muitos em Israel, e para ser alvo de contradição. E uma espada trespassará a tua alma! Assim se descobrirão os pensamentos escondidos nos corações de muitos.»$joyful_4_p1t$, $joyful_4_p1r$Lc 2, 25-35$joyful_4_p1r$, 1
from public.mysteries m where m.type = 'joyful' and m.sort_order = 4;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 1
join (values
  (0, $joyful_4_p1c0a$Catecismo da Igreja Católica$joyful_4_p1c0a$, $joyful_4_p1c0s$CIC 529$joyful_4_p1c0s$, $joyful_4_p1c0t$A apresentação de Jesus no templo mostra-O como Primogénito que pertence ao Senhor. Com Simeão e Ana, é toda a expectativa de Israel que vem ao encontro do seu Salvador (a tradição bizantina designa por encontro este acontecimento). Jesus é reconhecido como o Messias tão longamente esperado, «luz das nações» e «glória de Israel», mas também como «sinal de contradição». A espada de dor, predita a Maria, anuncia essa outra oblação, perfeita e única, da cruz, que trará a salvação que Deus «preparou diante de todos os povos».$joyful_4_p1c0t$),
  (1, $joyful_4_p1c1a$São Sofrónio de Jerusalém$joyful_4_p1c1a$, $joyful_4_p1c1s$Orat. 3 de Hypapante, 6-7 (PG 87, 3, 3291-3293) (texto abreviado)$joyful_4_p1c1s$, $joyful_4_p1c1t$Todos nós que celebramos e veneramos com tanta piedade o mistério do Encontro do Senhor, corramos para Ele com todo o fervor do nosso espírito. Ninguém deixe de participar neste Encontro, ninguém se recuse a levar a sua luz. … Nenhum fique excluído deste esplendor, nenhum persista em continuar imerso na noite, mas avancemos todos resplandecentes; iluminados por este fulgor, vamos todos juntos ao seu encontro e com o velho Simeão recebamos a luz clara e eterna; associemo-nos à sua alegria e cantemos com ele um hino de ação de graças ao Pai da luz, que enviou a luz verdadeira e, afastando todas as trevas, nos fez participantes do seu esplendor. A salvação de Deus, com efeito, preparada diante de todos os povos, manifestou a glória que nos pertence a nós, que somos o novo Israel; e nós próprios, graças a Ele, vimos essa salvação e fomos absolvidos da antiga e tenebrosa culpa, tal como Simeão, depois de ver a Cristo, foi libertado dos laços da vida presente. …$joyful_4_p1c1t$),
  (2, $joyful_4_p1c2a$São João Paulo II$joyful_4_p1c2a$, $joyful_4_p1c2s$Rosarium Virginis Mariae, 20 (texto abreviado)$joyful_4_p1c2s$, $joyful_4_p1c2t$… Os dois últimos mistérios, porém, mesmo conservando o sabor da alegria antecipam já os sinais do drama. A apresentação no templo, de facto, enquanto exprime a alegria da consagração e extasia o velho Simeão, regista também a profecia do « sinal de contradição » que o Menino será para Israel e da espada que trespassará a alma da Mãe (cf. Lc 2, 34-35). …$joyful_4_p1c2t$),
  (3, $joyful_4_p1c3a$São João Paulo II$joyful_4_p1c3a$, $joyful_4_p1c3s$Redemptoris Mater, 16 (texto abreviado)$joyful_4_p1c3s$, $joyful_4_p1c3t$… Maria, um pouco mais tarde, ouve outras palavras: aquelas que foram pronunciadas por Simeão, no templo de Jerusalém. Estava-se já no quadragésimo dia depois do nascimento de Jesus, quando Maria e José, segundo a prescrição da Lei de Moisés, «levaram o menino a Jerusalém, para o oferecer ao Senhor» (Lc 2, 22). … Nessa mesma altura, porém, Simeão dirige-se a Maria com as seguintes palavras: «Ele é destinado a ser ocasião de queda e de ressurgimento para muitos em Israel e a ser um sinal de contradição... a fim de se revelarem os pensamentos de muitos corações»; e acrescenta, com referência directa a Maria: «E tu mesma terás a alma trespassada por uma espada» (Lc 2, 34-35). … Aquilo que Simeão diz apresenta-se como um segundo anúncio a Maria, uma vez que indica a dimensão histórica concreta em que o Filho realizará a sua missão, ou seja, na incompreensão e na dor. Se este outro anúncio confirma, por um lado, a sua fé no cumprimento das promessas divinas da salvação, por outro, também lhe revela que ela terá que viver a sua obediência de fé no sofrimento, ao lado do Salvador que sofre, e que a sua maternidade será obscura e marcada pela dor. …$joyful_4_p1c3t$)
) as v(sort_order, author, source, text) on true
where m.type = 'joyful' and m.sort_order = 4;

-- joyful-5 · Lc 2, 42-49
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $joyful_5_p0t$Quando chegou aos doze anos, indo eles a Jerusalém segundo o costume daquela festa, acabados os dias que ela durava, quando voltaram, ficou o Menino Jesus em Jerusalém, sem que seus pais o advertissem. … Aconteceu que, três dias depois, o encontraram no templo sentado no meio dos doutores, ouvindo-os e interrogando-os. … Quando o viram, admiraram-se. E sua mãe disse-lhe: «Filho, porque procedeste assim connosco? Eis que teu pai e eu te procurávamos cheios de aflição.» Ele disse-lhes: «Para que me buscáveis? Não sabíeis que devo ocupar-me nas coisas de meu Pai?»$joyful_5_p0t$, $joyful_5_p0r$Lc 2, 42-49$joyful_5_p0r$, 0
from public.mysteries m where m.type = 'joyful' and m.sort_order = 5;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $joyful_5_p0c0a$Catecismo da Igreja Católica$joyful_5_p0c0a$, $joyful_5_p0c0s$CIC 534$joyful_5_p0c0s$, $joyful_5_p0c0t$«O reencontro de Jesus no templo é o único acontecimento que quebra o silêncio dos evangelhos sobre os anos ocultos de Jesus. Nele, Jesus deixa entrever o mistério da sua consagração total à missão decorrente da sua filiação divina: "Não sabíeis que Eu tenho de estar na casa do meu Pai?". Maria e José "não compreenderam" esta palavra, mas acolheram-na na fé, e Maria "guardava no coração todas estas recordações", ao longo dos anos em que Jesus permaneceu oculto no silêncio duma vida normal.»$joyful_5_p0c0t$),
  (1, $joyful_5_p0c1a$São Tomás de Aquino$joyful_5_p0c1a$, $joyful_5_p0c1s$Suma Teológica, III, q. 12, a. 3$joyful_5_p0c1s$, $joyful_5_p0c1t$«Cristo foi constituído cabeça da Igreja … de modo que … todos recebessem dele a doutrina da Verdade. Donde ele mesmo diz … "Para isto nasci … para dar testemunho da verdade." E por isso não convinha à sua dignidade que fosse ensinado por qualquer homem.» … «Como Orígenes afirma … o Senhor interrogava, não para aprender algo, mas para ensinar ao interrogar.»$joyful_5_p0c1t$),
  (2, $joyful_5_p0c2a$Santo Agostinho$joyful_5_p0c2a$, $joyful_5_p0c2s$Sermão 51$joyful_5_p0c2s$, $joyful_5_p0c2t$«Quando o Senhor Jesus Cristo tinha doze anos … ficou … no templo, e discutia com os anciãos … A Palavra de Deus nunca se cala, mas nem sempre é ouvida.» … «Não sabíeis que devo estar nas coisas que são de meu Pai?» … «não aponta para Deus como Pai de tal modo que negue ser José pai … "Era-lhes submisso."»$joyful_5_p0c2t$),
  (3, $joyful_5_p0c3a$Orígenes de Alexandria$joyful_5_p0c3a$, $joyful_5_p0c3s$Homilias sobre Lucas, hom. 19 (Lc 2,40-46)$joyful_5_p0c3s$, $joyful_5_p0c3t$«Onde, pois, o encontram? No templo; pois aí se encontra o Filho de Deus. Se tu também … procurares o Filho de Deus, procura-o primeiro no templo.» … «Interrogava … os mestres, não para aprender algo, mas para instruí-los ao interrogar.»$joyful_5_p0c3t$)
) as v(sort_order, author, source, text) on true
where m.type = 'joyful' and m.sort_order = 5;

-- joyful-5 · Lc 2, 51-52
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $joyful_5_p1t$Depois desceu com eles, e foi a Nazaré; e era-lhes submisso. Sua mãe conservava todas estas coisas no seu coração. Jesus crescia em sabedoria, em estatura e em graça diante de Deus e dos homens.$joyful_5_p1t$, $joyful_5_p1r$Lc 2, 51-52$joyful_5_p1r$, 1
from public.mysteries m where m.type = 'joyful' and m.sort_order = 5;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 1
join (values
  (0, $joyful_5_p1c0a$São Bernardo de Claraval$joyful_5_p1c0a$, $joyful_5_p1c0s$Homilia I super Missus est, 7-8 (Lc 2,51)$joyful_5_p1c0s$, $joyful_5_p1c0t$«"E era submisso a eles." Quem, a quem? Deus, aos homens. … Deus … era submisso a Maria, e não somente a Maria, mas também a José, por causa de Maria. … Aprende, ó homem, a obedecer.»$joyful_5_p1c0t$),
  (1, $joyful_5_p1c1a$Catecismo da Igreja Católica$joyful_5_p1c1a$, $joyful_5_p1c1s$CIC 564$joyful_5_p1c1s$, $joyful_5_p1c1t$«Pela sua submissão a Maria e a José, assim como pelo seu trabalho humilde em Nazaré durante longos anos, Jesus dá-nos o exemplo da santidade na vida quotidiana da família e do trabalho.»$joyful_5_p1c1t$)
) as v(sort_order, author, source, text) on true
where m.type = 'joyful' and m.sort_order = 5;

-- luminous-1 · Mt 3, 16-17
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $luminous_1_p0t$Logo que foi baptizado, Jesus saiu da água. E eis que se abriram os céus, e viu o Espírito de Deus descer como pomba, e vir sobre ele. E eis (que se ouviu) uma voz do céu, que dizia: «Este é o meu Filho amado, no qual pus as minhas complacências.»$luminous_1_p0t$, $luminous_1_p0r$Mt 3, 16-17$luminous_1_p0r$, 0
from public.mysteries m where m.type = 'luminous' and m.sort_order = 1;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $luminous_1_p0c0a$São João Paulo II$luminous_1_p0c0a$, $luminous_1_p0c0s$*Rosarium Virginis Mariae*, n. 21 (texto abreviado; o n. 21 continua com os outros mistérios luminosos)$luminous_1_p0c0s$, $luminous_1_p0c0t$Primeiramente é mistério de luz o Baptismo no Jordão. Aqui, enquanto Cristo desce à água do rio, como inocente que Se faz pecado por nós (cf. 2 Cor 5, 21), o céu abre-se e a voz do Pai proclama-O Filho dilecto (cf. Mt 3, 17 par), ao mesmo tempo que o Espírito vem sobre Ele para investi-Lo na missão que O espera. …$luminous_1_p0c0t$),
  (1, $luminous_1_p0c1a$Catecismo da Igreja Católica$luminous_1_p0c1a$, $luminous_1_p0c1s$CIC 535$luminous_1_p0c1s$, $luminous_1_p0c1t$O início da vida pública de Jesus é o seu baptismo por João, no rio Jordão. João pregava «um baptismo de penitência, em ordem à remissão dos pecados» (Lc 3, 3). … «Então aparece Jesus». O Baptista hesita, Jesus insiste: e recebe o baptismo. Então o Espírito Santo, sob a forma de pomba, desce sobre Jesus e uma voz do céu proclama: «Este é o meu Filho muito amado» (Mt 3,13-17). Tal foi a manifestação («epifania») de Jesus como Messias de Israel e Filho de Deus.$luminous_1_p0c1t$),
  (2, $luminous_1_p0c2a$Catecismo da Igreja Católica$luminous_1_p0c2a$, $luminous_1_p0c2s$CIC 537 (texto abreviado; citação patrística completa no § 537)$luminous_1_p0c2s$, $luminous_1_p0c2t$Pelo Baptismo, o cristão é sacramentalmente assimilado a Jesus que, no seu baptismo, antecipa a sua morte e ressurreição. Deve entrar neste mistério de humilde abatimento e de penitência, descer à água com Jesus, para de lá subir com Ele, renascer da água e do Espírito para se tornar, no Filho, filho-amado do Pai e «viver numa vida nova» (Rm 6, 4): «Sepultemo-nos com Cristo pelo Baptismo, para com Ele ressuscitarmos…»$luminous_1_p0c2t$),
  (3, $luminous_1_p0c3a$São Tomás de Aquino$luminous_1_p0c3a$, $luminous_1_p0c3s$Suma Teológica, III, q. 39, a. 8$luminous_1_p0c3s$, $luminous_1_p0c3t$Como dissemos, pelo seu baptismo, que foi o exemplar do nosso, Cristo devia mostrar o que no nosso baptismo se realiza. Ora, o baptismo que os fiéis recebem é consagrado pela invocação e pela virtude da Trindade, segundo o Evangelho: «Ide e ensinai a todas as gentes, baptizando-as em nome do Padre e do Filho e do Espírito Santo» (Mt 28, 19). E assim, no baptismo de Cristo, como diz Jerónimo, manifesta-se o mistério da Trindade; pois é o próprio Senhor, revestido da natureza humana, o baptizado; o Espírito Santo desceu sob a forma de pomba; foi ouvida a palavra do Pai dando testemunho do seu Filho.$luminous_1_p0c3t$),
  (4, $luminous_1_p0c4a$Santo Ambrósio$luminous_1_p0c4a$, $luminous_1_p0c4s$*De mysteriis*, 4, 19-20 (tradução citada em estudo académico a partir do latim)$luminous_1_p0c4s$, $luminous_1_p0c4t$Vejo a água que eu via diariamente: esta pode me purificar, se já desci nela muitas vezes e nunca fui purificado? Portanto, saiba que a água não purifica sem o Espírito. … O que é, em efeito, a água sem a cruz de Cristo, senão um elemento comum, sem nenhuma eficácia sacramental? Mas tampouco há mistério de regeneração sem a água…$luminous_1_p0c4t$)
) as v(sort_order, author, source, text) on true
where m.type = 'luminous' and m.sort_order = 1;

-- luminous-1 · Mt 3, 13-15
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $luminous_1_p1t$Então foi Jesus da Galileia ao Jordão e apresentou-se a João, para ser baptizado por ele. Mas João opunha-se-lhe, dizendo: «Sou eu que devo ser baptizado por ti, e tu vens a mim!» Jesus respondeu-lhe: «Deixa por agora, pois convém que cumpramos assim toda a justiça.» Ele então concordou.$luminous_1_p1t$, $luminous_1_p1r$Mt 3, 13-15$luminous_1_p1r$, 1
from public.mysteries m where m.type = 'luminous' and m.sort_order = 1;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 1
join (values
  (0, $luminous_1_p1c0a$Catecismo da Igreja Católica$luminous_1_p1c0a$, $luminous_1_p1c0s$CIC 536$luminous_1_p1c0s$, $luminous_1_p1c0t$Da parte de Jesus, o seu baptismo é a aceitação e a inauguração da sua missão de Servo sofredor. Deixa-se contar entre o número dos pecadores. É já «o Cordeiro de Deus que tira o pecado do mundo» (Jo 1, 29), e antecipa já o «baptismo» da sua morte sangrenta. Vem, desde já, para «cumprir toda a justiça» (Mt 3, 15). … A esta aceitação responde a voz do Pai, que põe toda a sua complacência no Filho. … No baptismo de Cristo, «abriram-se os céus» (Mt 3, 16) que o pecado de Adão tinha fechado, e as águas são santificadas pela descida de Jesus e do Espírito, prelúdio da nova criação.$luminous_1_p1c0t$),
  (1, $luminous_1_p1c1a$São Tomás de Aquino$luminous_1_p1c1a$, $luminous_1_p1c1s$Suma Teológica, III, q. 39, a. 1$luminous_1_p1c1s$, $luminous_1_p1c1t$Cristo devia ser baptizado. Primeiro, porque, como diz Ambrósio, o Senhor foi baptizado, não por querer purificar-se; mas para purificar as águas que, purificadas assim pelo corpo de Cristo, isento de pecado, pudessem servir para o baptismo e a fim de deixar para o futuro as águas santificadas para os que devessem ser baptizados, como ensina Crisóstomo. … Terceiro, Cristo quis ser baptizado, porque, como diz Agostinho, quis fazer o que ordenou a todos fazerem … «Assim nos convém cumprir toda a justiça» (Mt 3, 15).$luminous_1_p1c1t$),
  (2, $luminous_1_p1c2a$São João Crisóstomo$luminous_1_p1c2a$, $luminous_1_p1c2s$Homilia sobre o Batismo de Nosso Senhor (Epifania), § 4 (trad. Via Bible)$luminous_1_p1c2s$, $luminous_1_p1c2t$Quando João disse: «É necessário que eu seja batizado por ti, e tu vens a mim?», ele respondeu: «Deixe assim; convém que cumpramos toda a justiça» (Mt 3, 14-15). … Todos deveriam cumprir essa justiça, mas ninguém … a cumpriu; portanto, Cristo aparece e cumpre essa justiça. … Se é justo obedecer a Deus, e se Deus enviou João para batizar o povo, então Nosso Senhor cumpriu este ponto da lei juntamente com todos os outros.$luminous_1_p1c2t$)
) as v(sort_order, author, source, text) on true
where m.type = 'luminous' and m.sort_order = 1;

-- luminous-2 · Jo 2, 1-5
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $luminous_2_p0t$Três dias depois, celebraram-se umas bodas em Caná da Galileia, e encontrava-se lá a Mãe de Jesus. Foi também convidado Jesus com seus discípulos para as bodas. Faltando o vinho, a Mãe de Jesus disse-lhe: «Não têm vinho.» Jesus respondeu-lhe: «Mulher, que nos importa a mim e a ti isso? Ainda não chegou a minha hora.» Disse sua Mãe aos que serviam: «Fazei tudo o que ele vos disser.»$luminous_2_p0t$, $luminous_2_p0r$Jo 2, 1-5$luminous_2_p0r$, 0
from public.mysteries m where m.type = 'luminous' and m.sort_order = 2;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $luminous_2_p0c0a$São João Paulo II$luminous_2_p0c0a$, $luminous_2_p0c0s$Carta apostólica *Rosarium Virginis Mariae*, § 21 (texto abreviado)$luminous_2_p0c0s$, $luminous_2_p0c0t$Mistério de luz é o início dos sinais em Caná (cf. Jo 2, 1-12), quando Cristo, transformando a água em vinho, abre à fé o coração dos discípulos graças à intervenção de Maria, a primeira entre os crentes. … A função que desempenha em Caná acompanha, de algum modo, todo o caminho de Cristo. … Torna-se a grande advertência materna que Ela dirige à Igreja de todos os tempos: «Fazei o que Ele vos disser» (Jo 2, 5). Advertência esta que … constitui o fundo mariano de todos os «mistérios da luz».$luminous_2_p0c0t$),
  (1, $luminous_2_p0c1a$Catecismo da Igreja Católica$luminous_2_p0c1a$, $luminous_2_p0c1s$CIC 1613$luminous_2_p0c1s$, $luminous_2_p0c1t$«No umbral da sua vida pública, Jesus realiza o seu primeiro sinal –a pedido da sua Mãe – por ocasião duma festa de casamento (118). A Igreja atribui uma grande importância à presença de Jesus nas bodas de Caná. Ela vê nesse facto a confirmação da bondade do matrimónio e o anúncio de que, doravante, o matrimónio seria um sinal eficaz da presença de Cristo.»$luminous_2_p0c1t$),
  (2, $luminous_2_p0c2a$Catecismo da Igreja Católica$luminous_2_p0c2a$, $luminous_2_p0c2s$CIC 2618$luminous_2_p0c2s$, $luminous_2_p0c2t$«O Evangelho revela-nos como é que Maria ora e intercede na fé: em Caná, a Mãe de Jesus roga a seu Filho pelas necessidades dum banquete de bodas, sinal dum outro banquete, o das bodas do Cordeiro que dá o seu corpo e o seu sangue a pedido da Igreja, sua esposa. E é na hora da Nova Aliança, ao pé da cruz, que Maria é atendida como a Mulher, a nova Eva, a verdadeira «mãe dos vivos».»$luminous_2_p0c2t$),
  (3, $luminous_2_p0c3a$São Bernardo de Claraval$luminous_2_p0c3a$, $luminous_2_p0c3s$Sermão para o 1.º domingo após a oitava da Epifania (sobre Jo 2,3-5) (texto abreviado)$luminous_2_p0c3s$, $luminous_2_p0c3t$«Faltando o vinho, a mãe de Jesus disse-lhe: Não têm vinho.» Ela teve piedade deles em sua bondade e tomou parte em seu constrangimento. O que pode resultar da fonte da Bondade, senão a bondade? … Talvez a resposta do Senhor pareça um pouco dura e severa; mas Ele sabia bem com quem estava falando, assim como ela não ignorava quem lhe falava. … Ouvi o que ela disse aos que serviam: «Fazei o que Ele vos disser.»$luminous_2_p0c3t$)
) as v(sort_order, author, source, text) on true
where m.type = 'luminous' and m.sort_order = 2;

-- luminous-2 · Jo 2, 6-11
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $luminous_2_p1t$Ora estavam ali seis talhas de pedra, preparadas para a purificação judaica, que levavam cada uma duas a três metretas. Jesus disse-lhes: Enchei as talhas de água. Encheram-nas até cima. … O arquitriclino, logo que provou a água convertida em vinho (ele não sabia donde viera, ainda que o sabiam os serventes, porque tinham tirado a água), o arquitriclino chamou o esposo, … Tal foi o primeiro milagre de Jesus; fê-lo em Caná da Galileia. Assim manifestou a sua glória, e os seus discípulos creram nele.$luminous_2_p1t$, $luminous_2_p1r$Jo 2, 6-11$luminous_2_p1r$, 1
from public.mysteries m where m.type = 'luminous' and m.sort_order = 2;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 1
join (values
  (0, $luminous_2_p1c0a$São Tomás de Aquino$luminous_2_p1c0a$, $luminous_2_p1c0s$Suma Teológica, III, q. 43, a. 3$luminous_2_p1c0s$, $luminous_2_p1c0t$Cristo fez milagres para confirmar a sua doutrina e para manifestar o seu poder divino. — Por isso, quanto à confirmação, não devia fazer milagres antes de começar a ensinar. … — Quanto à manifestação do seu poder, devia mostrar a sua divindade pelos seus milagres; de modo que acreditassem na sua humanidade verdadeira. Por isso, como diz Crisóstomo, fez bem não começando a fazer milagres desde a sua primeira idade; do contrário, pensariam que a sua Encarnação era fantástica … Em contrário, o Evangelho: «Com este milagre deu Jesus princípio aos seus, em Caná de Galileia.»$luminous_2_p1c0t$),
  (1, $luminous_2_p1c1a$Santo Agostinho$luminous_2_p1c1a$, $luminous_2_p1c1s$*Tractatus in Ioannem*, 8 (texto abreviado)$luminous_2_p1c1s$, $luminous_2_p1c1t$O milagre de nosso Senhor Jesus Cristo, pelo qual fez vinho da água, não é admirável para os que sabem que Deus o fez. Pois ele mesmo fez o vinho naquele dia, nas núpcias, naquelas seis talhas … ele que todos os anos faz isto nas videiras. … Também nós éramos água, e ele nos fez vinho, fez-nos sábios; pois temos gosto pela fé nele, nós que antes éramos insensatos.$luminous_2_p1c1t$),
  (2, $luminous_2_p1c2a$São João Crisóstomo$luminous_2_p1c2a$, $luminous_2_p1c2s$*Homiliae in Ioannem*, hom. 22 (Jo 2,4-10) (texto abreviado)$luminous_2_p1c2s$, $luminous_2_p1c2t$Não é sem razão que o Evangelista diz: «Segundo o rito da purificação dos judeus», … para mostrar que aqueles vasos nunca foram receptáculos de vinho. … Mas agora, para mostrar que é Ele quem transforma a água nas videiras, e converte a chuva em vinho … Ele efetuou naquele momento, nas bodas, o que na planta leva muito tempo. … Que era vinho então, e o melhor dos vinhos, … tinha os servos por testemunhas; … o mestre-sala e o noivo.$luminous_2_p1c2t$)
) as v(sort_order, author, source, text) on true
where m.type = 'luminous' and m.sort_order = 2;

-- luminous-3 · Mc 1, 14-15
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $luminous_3_p0t$Depois que João foi preso, foi Jesus para a Galileia, pregando o Evangelho de Deus, e dizendo: «Está completo o tempo e aproxima-se o reino de Deus; fazei penitência, crede no Evangelho.»$luminous_3_p0t$, $luminous_3_p0r$Mc 1, 14-15$luminous_3_p0r$, 0
from public.mysteries m where m.type = 'luminous' and m.sort_order = 3;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $luminous_3_p0c0a$São João Paulo II$luminous_3_p0c0a$, $luminous_3_p0c0s$*Rosarium Virginis Mariae*, 21 (texto abreviado)$luminous_3_p0c0s$, $luminous_3_p0c0t$Mistério de luz é a pregação com a qual Jesus anuncia o advento do Reino de Deus e convida à conversão (cf. Mc 1, 15), perdoando os pecados de quem a Ele se dirige com humilde confiança … início do ministério de misericórdia que Ele prosseguirá exercendo até ao fim do mundo, especialmente através do sacramento da Reconciliação confiado à sua Igreja (cf. Jo 20, 22-23).$luminous_3_p0c0t$),
  (1, $luminous_3_p0c1a$Catecismo da Igreja Católica$luminous_3_p0c1a$, $luminous_3_p0c1s$CIC 541$luminous_3_p0c1s$, $luminous_3_p0c1t$«Depois de João ter sido preso, Jesus partiu para a Galileia. Aí proclamava a Boa-Nova da vinda de Deus, nestes termos: "Completou-se o tempo e o Reino de Deus está próximo: convertei-vos e acreditai na Boa-Nova!"» (Mc 1, 14-15). «Por isso, Cristo, a fim de cumprir a vontade do Pai, deu começo na terra ao Reino dos céus». … Esta reunião é a Igreja, a qual é na terra «o germe e o princípio» do Reino de Deus.$luminous_3_p0c1t$),
  (2, $luminous_3_p0c2a$Catecismo da Igreja Católica$luminous_3_p0c2a$, $luminous_3_p0c2s$CIC 542$luminous_3_p0c2s$, $luminous_3_p0c2t$Cristo está no centro desta reunião dos homens na «família de Deus». Reúne-os à sua volta pela sua palavra, pelos seus sinais que manifestam o Reino de Deus, pelo envio dos discípulos. E realizará a vinda do seu Reino sobretudo pelo grande mistério da sua Páscoa: a sua morte de cruz e a sua ressurreição. «E Eu, uma vez elevado da Terra, atrairei todos a Mim» (Jo 12, 32). Todos os homens são chamados a esta união com Cristo.$luminous_3_p0c2t$),
  (3, $luminous_3_p0c3a$São João Crisóstomo$luminous_3_p0c3a$, $luminous_3_p0c3s$*Homiliae in Matthaeum*, hom. 14, 1-2 (texto abreviado)$luminous_3_p0c3s$, $luminous_3_p0c3t$Veja-se que nesta pregação nada diz de si mesmo … no princípio falou de coisas agradáveis evangelizando o reino dos céus.$luminous_3_p0c3t$)
) as v(sort_order, author, source, text) on true
where m.type = 'luminous' and m.sort_order = 3;

-- luminous-3 · Mc 4, 26-29
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $luminous_3_p1t$Dizia também: «O reino de Deus é como um homem que lança a semente à terra. Dorme e se levanta, noite e dia, e a semente brota e cresce sem ele saber como. Porque a terra por si mesma produz, primeiramente, a erva, depois a espiga, e por último o trigo grado na espiga. E, quando o fruto está maduro, mete logo a fouce, porque está chegado o tempo da ceifa.»$luminous_3_p1t$, $luminous_3_p1r$Mc 4, 26-29$luminous_3_p1r$, 1
from public.mysteries m where m.type = 'luminous' and m.sort_order = 3;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 1
join (values
  (0, $luminous_3_p1c0a$Catecismo da Igreja Católica$luminous_3_p1c0a$, $luminous_3_p1c0s$CIC 543$luminous_3_p1c0s$, $luminous_3_p1c0t$Todos os homens são chamados a entrar no Reino. Anunciado primeiro aos filhos de Israel, este Reino messiânico é destinado a acolher os homens de todas as nações. Para ter acesso a ele, é preciso acolher a Palavra de Jesus: «A Palavra do Senhor compara-se à semente lançada ao campo: aqueles que a ouvem com fé … já receberam o Reino …»$luminous_3_p1c0t$),
  (1, $luminous_3_p1c1a$São Tomás de Aquino$luminous_3_p1c1a$, $luminous_3_p1c1s$Suma Teológica, I-II, q. 108, a. 1, ad 1 (texto abreviado; tradução a partir do latim conferido em tomasdeaquino.org)$luminous_3_p1c1s$, $luminous_3_p1c1t$O reino de Deus consiste principalmente nos actos interiores, mas, por consequência, pertencem também ao reino de Deus todas aquelas coisas sem as quais os actos interiores não podem existir. … se o reino de Deus é justiça interior, e paz, e gozo espiritual, é necessário que todos os actos exteriores que repugnem à justiça, ou à paz, ou ao gozo espiritual, repugnem também ao reino de Deus, e por isso devam ser proibidos no Evangelho do reino.$luminous_3_p1c1t$)
) as v(sort_order, author, source, text) on true
where m.type = 'luminous' and m.sort_order = 3;

-- luminous-4 · Mt 17, 1-8
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $luminous_4_p0t$Seis dias depois, tomou Jesus consigo Pedro, Tiago e João, seu irmão, e levou-os aparte a um alto monte, e transfigurou-se diante deles. O seu rosto ficou refulgente como o sol, e as suas vestiduras tornaram-se luminosas de brancas que estavam. Eis que lhes apareceram Moisés e Elias, falando com ele. … Estando ele ainda a falar, eis que uma nuvem resplandecente os envolveu; e saiu da nuvem uma voz que dizia: «Este é o meu Filho dilecto em quem pus toda a minha complacência; ouvi-o.» … Eles, então, levantando os olhos, não viram ninguém, excepto só Jesus.$luminous_4_p0t$, $luminous_4_p0r$Mt 17, 1-8$luminous_4_p0r$, 0
from public.mysteries m where m.type = 'luminous' and m.sort_order = 4;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $luminous_4_p0c0a$São João Paulo II$luminous_4_p0c0a$, $luminous_4_p0c0s$Rosarium Virginis Mariae, n. 21 (16 de outubro de 2002)$luminous_4_p0c0s$, $luminous_4_p0c0t$Mistério de luz por excelência é a Transfiguração que, segundo a tradição, se deu no Monte Tabor. A glória da Divindade reluz no rosto de Cristo, enquanto o Pai O acredita aos Apóstolos extasiados para que O «escutem» (cf. Lc 9, 35 par) e se disponham a viver com Ele o momento doloroso da Paixão, a fim de chegarem com Ele à glória da Ressurreição e a uma vida transfigurada pelo Espírito Santo.$luminous_4_p0c0t$),
  (1, $luminous_4_p0c1a$Catecismo da Igreja Católica$luminous_4_p0c1a$, $luminous_4_p0c1s$CIC 556$luminous_4_p0c1s$, $luminous_4_p0c1t$No limiar da vida pública, o baptismo; no limiar da Páscoa, a transfiguração. Pelo baptismo de Jesus «declaratum fuit mysterium primae regenerationis – foi declarado o mistério da (nossa) primeira regeneração» – o nosso Baptismo; e a transfiguração «est sacramentum secundae regenerationis – é o sacramento da (nossa) segunda regeneração» – a nossa própria ressurreição (318). Desde agora, nós participamos na ressurreição do Senhor pelo Espírito Santo que actua nos sacramentos do Corpo de Cristo. A transfiguração dá-nos um antegozo da vinda gloriosa de Cristo, «que transfigurará o nosso corpo miserável para o conformar com o seu corpo glorioso» (Fl 3, 21). Mas lembra-nos também que temos de passar por muitas tribulações para entrar no Reino de Deus» (Act 14, 22)…$luminous_4_p0c1t$),
  (2, $luminous_4_p0c2a$São Tomás de Aquino$luminous_4_p0c2a$, $luminous_4_p0c2s$Suma Teológica, III, q. 45, a. 4, ad 2$luminous_4_p0c2s$, $luminous_4_p0c2t$… assim também na transfiguração, que é o sacramento da segunda regeneração, apareceu toda a Trindade: o Pai na voz, o Filho no homem, o Espírito Santo na nuvem luminosa; porque, assim como no Baptismo concede a inocência, simbolizada pela simplicidade da pomba, assim na ressurreição dará aos eleitos a claridade da glória e o refrigério de todo mal, simbolizados na nuvem luminosa.$luminous_4_p0c2t$),
  (3, $luminous_4_p0c3a$São João Paulo II$luminous_4_p0c3a$, $luminous_4_p0c3s$Rosarium Virginis Mariae, n. 9 (16 de outubro de 2002)$luminous_4_p0c3s$, $luminous_4_p0c3t$«Transfigurou-Se diante deles: o seu rosto resplandeceu como o sol» (Mt 17, 2). A cena evangélica da transfiguração de Cristo… pode ser tomada como ícone da contemplação cristã. Fixar os olhos no rosto de Cristo… até perceber o brilho divino definitivamente manifestado no Ressuscitado glorificado à direita do Pai, é a tarefa de cada discípulo de Cristo…$luminous_4_p0c3t$)
) as v(sort_order, author, source, text) on true
where m.type = 'luminous' and m.sort_order = 4;

-- luminous-4 · Lc 9, 28-31
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $luminous_4_p1t$Cerca de oito dias depois destas palavras, tomou consigo Pedro, Tiago e João, e subiu a um monte para orar. … E eis que dois homens falavam com ele: Moisés e Elias, os quais apareceram cheios de majestade, e falavam da morte que ele devia sofrer em Jerusalém.$luminous_4_p1t$, $luminous_4_p1r$Lc 9, 28-31$luminous_4_p1r$, 1
from public.mysteries m where m.type = 'luminous' and m.sort_order = 4;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 1
join (values
  (0, $luminous_4_p1c0a$Catecismo da Igreja Católica$luminous_4_p1c0a$, $luminous_4_p1c0s$CIC 554$luminous_4_p1c0s$, $luminous_4_p1c0t$A partir do dia em que Pedro confessou que Jesus era o Cristo, Filho do Deus vivo, o Mestre «começou a explicar aos seus discípulos que tinha de ir a Jerusalém e lá sofrer [...], que tinha de ser morto e ressuscitar ao terceiro dia» (Mt 16, 21). Pedro rejeita este anúncio e os outros também não o entendem (312). É neste contexto que se situa o episódio misterioso da transfiguração de Jesus (313), no cimo duma alta montanha, perante três testemunhas por Ele escolhidas: Pedro, Tiago e João. O rosto e as vestes de Jesus tornaram-se fulgurantes de luz, Moisés e Elias aparecem, «e falam da sua morte, que ia consumar-se em Jerusalém» (Lc 9, 31). Uma nuvem envolve-os e uma voz do céu diz: «Este é o meu Filho predilecto: escutai-O» (Lc 9, 35).$luminous_4_p1c0t$),
  (1, $luminous_4_p1c1a$Catecismo da Igreja Católica$luminous_4_p1c1a$, $luminous_4_p1c1s$CIC 555$luminous_4_p1c1s$, $luminous_4_p1c1t$Por um momento, Jesus mostra a sua glória divina, confirmando assim a confissão de Pedro. Mostra também que, para «entrar na sua glória» (Lc 24, 26), tem de passar pela cruz em Jerusalém. Moisés e Elias tinham visto a glória de Deus sobre a montanha; a Lei e os Profetas tinham anunciado os sofrimentos do Messias (314). A paixão de Jesus é da vontade do Pai: o Filho age como Servo de Deus (315). A nuvem indica a presença do Espírito Santo: «Tota Trinitas apparuit: Pater in voce; Filius in homine; Spiritus in nube clara – Apareceu toda a Trindade: o Pai na voz; o Filho na humanidade; o Espírito Santo na nuvem luminosa» (316):$luminous_4_p1c1t$),
  (2, $luminous_4_p1c2a$Liturgia bizantina$luminous_4_p1c2a$, $luminous_4_p1c2s$Kontakion na Festa da Transfiguração (Menaion; cf. CIC 555, nota 317)$luminous_4_p1c2s$, $luminous_4_p1c2t$«Transfiguraste-Te sobre a montanha e, na medida em que disso eram capazes, os teus discípulos contemplaram a tua glória, ó Cristo Deus; para que, quando Te vissem crucificado, compreendessem que a tua paixão era voluntária, e anunciassem ao mundo que Tu és verdadeiramente a irradiação do Pai»$luminous_4_p1c2t$)
) as v(sort_order, author, source, text) on true
where m.type = 'luminous' and m.sort_order = 4;

-- luminous-5 · Mt 26, 26-29
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $luminous_5_p0t$Enquanto comiam, Jesus tomou pão e o benzeu, e o partiu, e deu-o a seus discípulos, dizendo: «Tomai e comei, isto é o meu corpo.» Depois, tomando um cálice, deu graças, e deu-lho, dizendo: «Bebei dele todos. Porque isto é o meu sangue, o sangue da nova aliança, que será derramado por muitos para remissão dos pecados. Digo-vos: desta hora em diante não beberei mais deste fruto da videira até aquele dia, em que o beberei novo convosco no reino de meu Pai.»$luminous_5_p0t$, $luminous_5_p0r$Mt 26, 26-29$luminous_5_p0r$, 0
from public.mysteries m where m.type = 'luminous' and m.sort_order = 5;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $luminous_5_p0c0a$São João Paulo II$luminous_5_p0c0a$, $luminous_5_p0c0s$Rosarium Virginis Mariae, § 21 (texto abreviado)$luminous_5_p0c0s$, $luminous_5_p0c0t$«… 5.º na instituição da Eucaristia, expressão sacramental do mistério pascal. … Mistério de luz é, enfim, a instituição da Eucaristia, na qual Cristo Se faz alimento com o seu Corpo e o seu Sangue sob os sinais do pão e do vinho, testemunhando «até ao extremo» o seu amor pela humanidade (Jo 13, 1), por cuja salvação Se oferecerá em sacrifício.»$luminous_5_p0c0t$),
  (1, $luminous_5_p0c1a$Catecismo da Igreja Católica$luminous_5_p0c1a$, $luminous_5_p0c1s$CIC 1323$luminous_5_p0c1s$, $luminous_5_p0c1t$«O nosso Salvador instituiu na última ceia, na noite em que foi entregue, o sacrifício eucarístico do seu corpo e sangue, para perpetuar pelo decorrer dos séculos, até voltar, o sacrifício da cruz, confiando à Igreja, sua esposa amada, o memorial da sua morte e ressurreição: sacramento de piedade, sinal de unidade, vínculo de caridade, banquete pascal em que se recebe Cristo, a alma se enche de graça e nos é dado o penhor da glória futura».$luminous_5_p0c1t$),
  (2, $luminous_5_p0c2a$Catecismo da Igreja Católica$luminous_5_p0c2a$, $luminous_5_p0c2s$CIC 1324$luminous_5_p0c2s$, $luminous_5_p0c2t$A Eucaristia é «fonte e cume de toda a vida cristã». «Os restantes sacramentos, assim como todos os ministérios eclesiásticos e obras de apostolado, estão vinculados com a sagrada Eucaristia e a ela se ordenam. Com efeito, na santíssima Eucaristia está contido todo o tesouro espiritual da Igreja, isto é, o próprio Cristo, nossa Páscoa».$luminous_5_p0c2t$),
  (3, $luminous_5_p0c3a$São Tomás de Aquino$luminous_5_p0c3a$, $luminous_5_p0c3s$Suma Teológica, III, q. 73, a. 2$luminous_5_p0c3s$, $luminous_5_p0c3t$Pelo contrário, diz o Apóstolo em 1 Cor 10,17: ainda que sejamos muitos, somos um só pão e um só corpo, todos os que participamos de um só pão e de um só cálice. Donde se conclui que a Eucaristia é o sacramento da unidade eclesiástica. … Este sacramento está ordenado ao alimento espiritual … para a integridade deste sacramento concorrem o cibo espiritual e a bebida espiritual … Por isso este sacramento é materialmente múltiplo, mas um formal e perfeitivamente.$luminous_5_p0c3t$),
  (4, $luminous_5_p0c4a$São Tomás de Aquino$luminous_5_p0c4a$, $luminous_5_p0c4s$Suma Teológica, III, q. 73, a. 3$luminous_5_p0c4s$, $luminous_5_p0c4t$… Como o batismo se chama sacramento da fé, que é o fundamento da vida espiritual, assim a eucaristia se chama sacramento da caridade, que é o «vínculo da perfeição», como se diz em Cl 3,14.$luminous_5_p0c4t$)
) as v(sort_order, author, source, text) on true
where m.type = 'luminous' and m.sort_order = 5;

-- luminous-5 · 1 Co 11, 23-26
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $luminous_5_p1t$Porque eu recebi do Senhor o que vos transmiti: que o Senhor Jesus, na noite em que foi entregue, tomou o pão e, dando graças, o partiu e disse: Tomai e comei; isto é o meu corpo, que é (dado) para vós; fazei isto em memória de mim. Igualmente também, depois de ter ceado, tomou o cálice, dizendo: Este cálice é a nova Aliança no meu sangue; fazei isto em memória de mim, todas as vezes que o beberdes. Todas as vezes que comerdes este pão e beberdes este cálice, anunciareis a morte do Senhor, até que ele venha.$luminous_5_p1t$, $luminous_5_p1r$1 Co 11, 23-26$luminous_5_p1r$, 1
from public.mysteries m where m.type = 'luminous' and m.sort_order = 5;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 1
join (values
  (0, $luminous_5_p1c0a$Catecismo da Igreja Católica$luminous_5_p1c0a$, $luminous_5_p1c0s$CIC 1337$luminous_5_p1c0s$, $luminous_5_p1c0t$Tendo amado os seus, o Senhor amou-os até ao fim. Sabendo que era chegada a hora de partir deste mundo para regressar ao Pai, no decorrer duma refeição, lavou-lhes os pés e deu-lhes o mandamento do amor. Para lhes deixar uma garantia deste amor, para jamais se afastar dos seus e para os tornar participantes da sua Páscoa, instituiu a Eucaristia como memorial da sua morte e da sua ressurreição, e ordenou aos seus Apóstolos que a celebrassem até ao seu regresso, «constituindo-os, então, sacerdotes do Novo Testamento».$luminous_5_p1c0t$),
  (1, $luminous_5_p1c1a$Catecismo da Igreja Católica$luminous_5_p1c1a$, $luminous_5_p1c1s$CIC 611$luminous_5_p1c1s$, $luminous_5_p1c1t$A Eucaristia, que neste momento instituiu, será o «memorial» do seu sacrifício. Jesus incluiu os Apóstolos na sua própria oferenda e pediu-lhes que a perpetuassem. Desse modo, instituiu os Apóstolos como sacerdotes da Nova Aliança: «Eu consagro-me por eles, para que também eles sejam consagrados na verdade» (Jo 17, 19).$luminous_5_p1c1t$)
) as v(sort_order, author, source, text) on true
where m.type = 'luminous' and m.sort_order = 5;

-- sorrowful-1 · Mt 26, 36-41
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $sorrowful_1_p0t$Então foi Jesus com eles a um lugar chamado Getsemani, e disse-lhes: «Sentai-vos aqui, enquanto eu vou acolá orar.» E, tendo tomado consigo Pedro e os dois filhos de Zebedeu, começou a entristecer-se e angustiar-se. Disse-lhes então: «A minha alma está numa tristeza mortal; ficai aqui e vigiai comigo.» Adiantando-se um pouco, prostrou-se com o rosto em terra, e fez esta oração: «Meu Pai, se é possível, passe de mim este cálice! Todavia não se faça como eu quero, mas sim como tu queres.» … «Vigiai e orai, para que não entreis em tentação. O espírito na verdade está pronto, mas a carne é fraca.»$sorrowful_1_p0t$, $sorrowful_1_p0r$Mt 26, 36-41$sorrowful_1_p0r$, 0
from public.mysteries m where m.type = 'sorrowful' and m.sort_order = 1;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $sorrowful_1_p0c0a$Catecismo da Igreja Católica$sorrowful_1_p0c0a$, $sorrowful_1_p0c0s$CIC 612$sorrowful_1_p0c0s$, $sorrowful_1_p0c0t$O cálice da Nova Aliança, que Jesus antecipou na Ceia, oferecendo-Se a Si mesmo, é aceite seguidamente por Jesus das mãos do Pai, na agonia no Getsêmani, fazendo-Se «obediente até á morte» (Fl 2, 8). Na sua oração, Jesus diz: «Meu Pai, se é possível, que se afaste de Mim este cálice [...]» (Mt 26, 39). Exprime desse modo o horror que a morte representa para a sua natureza humana. … Aceitando, com a sua vontade humana, que se faça a vontade do Pai, aceita a sua morte enquanto redentora, para «suportar os nossos pecados no seu corpo, no madeiro da cruz» (1 Pe 2, 24).$sorrowful_1_p0c0t$),
  (1, $sorrowful_1_p0c1a$São Tomás de Aquino$sorrowful_1_p0c1a$, $sorrowful_1_p0c1s$Suma Teológica, III, q. 46, a. 6$sorrowful_1_p0c1s$, $sorrowful_1_p0c1t$… em Cristo padecente houve verdadeira dor sensível e dor interior, a que se chama tristeza. Ambas foram em Cristo as maiores entre as dores da vida presente. … A causa da dor interior foi, em primeiro lugar, todos os pecados do género humano, pelos quais, padecendo, dava satisfação … em segundo lugar, especialmente a ruína dos discípulos escandalizados na paixão … em terceiro, a perda da vida corporal, naturalmente horrível à natureza humana. … A alma captava de modo intenso todas as causas de tristeza …$sorrowful_1_p0c1t$)
) as v(sort_order, author, source, text) on true
where m.type = 'sorrowful' and m.sort_order = 1;

-- sorrowful-1 · Lc 22, 41-44
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $sorrowful_1_p1t$Afastou-se deles a distância de um tiro de pedra; e, posto de joelhos, orava, dizendo: «Pai, se é do teu agrado, afasta de mim este cálice; não se faça, contudo, a minha vontade, mas a tua.» Então apareceu-lhe um anjo do céu, que o confortava. Posto em agonia orava mais instantemente. O seu suor tornou-se como gotas de sangue, que corriam até à terra.$sorrowful_1_p1t$, $sorrowful_1_p1r$Lc 22, 41-44$sorrowful_1_p1r$, 1
from public.mysteries m where m.type = 'sorrowful' and m.sort_order = 1;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 1
join (values
  (0, $sorrowful_1_p1c0a$Santo Afonso Maria de Ligório$sorrowful_1_p1c0a$, $sorrowful_1_p1c0s$*A Paixão de Nosso Senhor Jesus Cristo*, meditação de segunda-feira — Do suor de sangue e agonia de Jesus no horto, §1-3 (texto abreviado)$sorrowful_1_p1c0s$, $sorrowful_1_p1c0t$… chegando ao jardim de Getsêmani, quis dar começo à sua dolorosa paixão, permitindo que o temor, o tédio e a tristeza viessem afligi-Lo … «Meu Pai, se for possível, afastai de mim este cálice?» … O que propriamente afligiu o Coração de Jesus no horto não foi tanto a previsão dos tormentos … como a previsão dos nossos pecados … reduziu-O à agonia e fez-O suar sangue … «Pai, se é possível, passe de mim este cálice; todavia não seja como eu quero, mas sim como tu.»$sorrowful_1_p1c0t$),
  (1, $sorrowful_1_p1c1a$São João Crisóstomo$sorrowful_1_p1c1a$, $sorrowful_1_p1c1s$*Homilias sobre São Mateus*, homilia 83 (Mt 26, 36-51) (texto abreviado)$sorrowful_1_p1c1s$, $sorrowful_1_p1c1t$… costumava orar separado deles, para nos ensinar silêncio e recolhimento na oração … «Se é possível, que este cálice passe de mim; contudo, não como eu quero, mas como tu.» … Ao dizer isto, mostrou o humano; ao acrescentar «não a minha vontade, mas a tua», a virtude … ensina-nos a seguir a Deus ainda quando a natureza recua … o suor como gotas de sangue e o anjo que O conforta, para que ninguém diga que a tristeza era fingida.$sorrowful_1_p1c1t$)
) as v(sort_order, author, source, text) on true
where m.type = 'sorrowful' and m.sort_order = 1;

-- sorrowful-2 · Mt 27, 26
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $sorrowful_2_p0t$Então soltou-lhes Barrabás. Quanto a Jesus, depois de o ter mandado flagelar, entregou-lho para ser crucificado.$sorrowful_2_p0t$, $sorrowful_2_p0r$Mt 27, 26$sorrowful_2_p0r$, 0
from public.mysteries m where m.type = 'sorrowful' and m.sort_order = 2;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $sorrowful_2_p0c0a$São Tomás de Aquino$sorrowful_2_p0c0a$, $sorrowful_2_p0c0s$Suma Teológica, III, q. 47, a. 4$sorrowful_2_p0c0s$, $sorrowful_2_p0c0t$Convinha que Cristo começasse a padecer por parte dos judeus e que, depois de ser entregue por eles, a sua paixão se concluísse por mãos dos gentios — como o Senhor disse que o entregariam «aos gentios para ser escarnecido, flagelado e crucificado» (Mt 20, 19).$sorrowful_2_p0c0t$)
) as v(sort_order, author, source, text) on true
where m.type = 'sorrowful' and m.sort_order = 2;

-- sorrowful-2 · Jo 19, 1
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $sorrowful_2_p1t$Pilatos tomou então Jesus e mandou-o flagelar.$sorrowful_2_p1t$, $sorrowful_2_p1r$Jo 19, 1$sorrowful_2_p1r$, 1
from public.mysteries m where m.type = 'sorrowful' and m.sort_order = 2;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 1
join (values
  (0, $sorrowful_2_p1c0a$São Tomás de Aquino$sorrowful_2_p1c0a$, $sorrowful_2_p1c0s$Comentário ao Evangelho de São João, cap. 19, lição 1, nn. 2372–2373$sorrowful_2_p1c0s$, $sorrowful_2_p1c0t$Pilatos tomou Jesus e o flagelou por meio dos soldados, esperando que os judeus, saciados com aquelas injúrias, deixassem de exigir a morte. … Estes, porém, moviam-se contra Cristo por ódio, e por isso a flagelação não bastava. … Será que esta intenção desculpa Pilatos? Não: afligir um inocente, e sobretudo o Filho de Deus, é sumamente mau por si; nenhuma intenção o desculpa.$sorrowful_2_p1c0t$),
  (1, $sorrowful_2_p1c1a$Santo Agostinho$sorrowful_2_p1c1a$, $sorrowful_2_p1c1s$Tratados sobre o Evangelho de João, Tratado 116, §1$sorrowful_2_p1c1s$, $sorrowful_2_p1c1t$Então Pilatos tomou a Jesus e açoitou-o… para que os judeus, saciados com as injúrias, cessassem de se enfurecer até à morte dele. … O reino que não era deste mundo vencia o soberbo mundo não pela atrocidade de pelejar, mas pela humildade de padecer; aquele grão, que se havia de multiplicar, era semeado em horrível ultraje, para brotar em admirável glória.$sorrowful_2_p1c1t$)
) as v(sort_order, author, source, text) on true
where m.type = 'sorrowful' and m.sort_order = 2;

-- sorrowful-2 · Is 53, 5
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $sorrowful_2_p2t$Mas foi ferido por causa das nossas iniquidades, foi despedaçado por causa dos nossos crimes; o castigo que nos devia trazer a paz, caiu sobre ele, e nós fomos sarados com os seus ferimentos.$sorrowful_2_p2t$, $sorrowful_2_p2r$Is 53, 5$sorrowful_2_p2r$, 2
from public.mysteries m where m.type = 'sorrowful' and m.sort_order = 2;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 2
join (values
  (0, $sorrowful_2_p2c0a$Santo Afonso Maria de Ligório$sorrowful_2_p2c0a$, $sorrowful_2_p2c0s$*Meditações para todos os dias e festas do ano*, Segunda Meditação para a Segunda-feira Santa («Jesus preso à coluna e flagelado»)$sorrowful_2_p2c0s$, $sorrowful_2_p2c0t$Contemplemos como os algozes começam a bater por toda a parte em nosso divino Redentor. Seu corpo virginal primeiro torna-se roxo; depois corre o sangue com tanta abundância… Pelo que o Senhor ficou transfigurado como um leproso, coberto de chagas desde a cabeça até aos pés. … Declara-O inocente, e depois manda-O castigar!$sorrowful_2_p2c0t$),
  (1, $sorrowful_2_p2c1a$Catecismo da Igreja Católica$sorrowful_2_p2c1a$, $sorrowful_2_p2c1s$CIC 1851$sorrowful_2_p2c1s$, $sorrowful_2_p2c1t$É precisamente na paixão, em que a misericórdia de Cristo o vai vencer, que o pecado manifesta melhor a sua violência e a sua multiplicidade: incredulidade, ódio assassino, rejeição e escárnio por parte dos chefes e do povo, cobardia de Pilatos e crueldade dos soldados, traição de Judas tão dura para Jesus, negação de Pedro e abandono dos discípulos. No entanto, mesmo na hora das trevas e do príncipe deste mundo, o sacrifício de Cristo torna-se secretamente a fonte de onde brotará, inesgotável, o perdão dos nossos pecados.$sorrowful_2_p2c1t$)
) as v(sort_order, author, source, text) on true
where m.type = 'sorrowful' and m.sort_order = 2;

-- sorrowful-3 · Mt 27, 27-31
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $sorrowful_3_p0t$Então os soldados do governador, conduzindo Jesus ao Pretório, juntaram em volta dele toda a coorte. Depois de o terem despido, lançaram sobre ele um manto carmezim. Em seguida, tecendo uma coroa de espinhos, puseram-lha sobre a cabeça, e na mão direita uma cana. E, dobrando o joelho diante dele, o escarneciam, dizendo: «Salve, ó rei dos Judeus.» Cuspindo-lhe, tomavam a cana e batiam-lhe com ela na cabeça. Depois que o escarneceram, tiraram-lhe o manto, revestiram-no com os seus vestidos, e levaram-no para o crucificarem.$sorrowful_3_p0t$, $sorrowful_3_p0r$Mt 27, 27-31$sorrowful_3_p0r$, 0
from public.mysteries m where m.type = 'sorrowful' and m.sort_order = 3;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $sorrowful_3_p0c0a$São João Crisóstomo$sorrowful_3_p0c0a$, $sorrowful_3_p0c0s$Homilias sobre o Evangelho de São Mateus, homilia 87 (Mt 27, 27–29)$sorrowful_3_p0c0s$, $sorrowful_3_p0c0t$Que desculpa teremos nós, depois disto, se nos deixamos mover por injúrias, quando Cristo padeceu estas coisas? … Não um membro apenas, mas todo o corpo foi objecto de insolência: a cabeça pela coroa e pelas bofetadas, o rosto cuspido, as faces feridas, todo o corpo pelos vergões… Que poderia ser mais grave?$sorrowful_3_p0c0t$),
  (1, $sorrowful_3_p0c1a$São Tomás de Aquino$sorrowful_3_p0c1a$, $sorrowful_3_p0c1s$Suma Teológica, III, q. 46, a. 5$sorrowful_3_p0c1s$, $sorrowful_3_p0c1t$… Cristo padeceu em honra e glória pelas zombarias e contumélias que lhe infligiram … Terceiro, quanto aos membros do corpo: padeceu na cabeça com a coroa de espinhos que a penetravam; nas mãos e nos pés com a fixação dos cravos; no rosto com as bofetadas e a saliva; e em todo o corpo com os azorragues. …$sorrowful_3_p0c1t$)
) as v(sort_order, author, source, text) on true
where m.type = 'sorrowful' and m.sort_order = 3;

-- sorrowful-3 · Jo 19, 2-5
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $sorrowful_3_p1t$Depois os soldados, tecendo uma coroa de espinhos, puseram-lha sobre a cabeça e revestiram-no com um manto de púrpura. Aproximavam-se dele e diziam-lhe: «Salve, rei dos Judeus» e davam-lhe bofetadas. Saiu Pilatos ainda outra vez fora e disse-lhes: «Eis que vo-lo trago fora, para que conheçais que não encontro nele crime algum.» Saiu, pois, Jesus, trazendo a coroa de espinhos e o manto de púrpura. Pilatos disse-lhes: «Eis aqui o homem.»$sorrowful_3_p1t$, $sorrowful_3_p1r$Jo 19, 2-5$sorrowful_3_p1r$, 1
from public.mysteries m where m.type = 'sorrowful' and m.sort_order = 3;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 1
join (values
  (0, $sorrowful_3_p1c0a$São Bernardo de Claraval$sorrowful_3_p1c0a$, $sorrowful_3_p1c0s$Sermão 2, Solenidade de Todos os Santos (Liturgia das Horas, v. IV; PL 183)$sorrowful_3_p1c0s$, $sorrowful_3_p1c0t$Enquanto isto não sucede, a nossa Cabeça não como é, mas como se fez por nós, se nos apresenta: não coroada de glória, mas com os espinhos dos nossos pecados. É uma vergonha fazer-se membro delicado sob uma cabeça coroada de espinhos. Por enquanto a púrpura não lhe é sinal de honra, mas de zombaria; será sinal de honra quando Cristo vier …$sorrowful_3_p1c0t$),
  (1, $sorrowful_3_p1c1a$Liturgia da Igreja (meditação Via-Sacra, Santa Sé)$sorrowful_3_p1c1a$, $sorrowful_3_p1c1s$Via-Sacra 2007, 6.ª estação — Jesus flagelado e coroado de espinhos (Jo 19, 2-3)$sorrowful_3_p1c1s$, $sorrowful_3_p1c1t$… Eis uma coroa cujos esplendores são ramos de espinhos; a púrpura real é substituída por um manto vermelho … Jesus é humilhado como rei do ridículo; mas, na realidade, é o verdadeiro soberano da história. …$sorrowful_3_p1c1t$)
) as v(sort_order, author, source, text) on true
where m.type = 'sorrowful' and m.sort_order = 3;

-- sorrowful-4 · Jo 19, 16-17
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $sorrowful_4_p0t$Então entregou-lho, para que fosse crucificado. Tomaram pois, Jesus, o qual, levando a sua cruz, saiu para o lugar chamado do Crânio (em hebraico Gólgotha) …$sorrowful_4_p0t$, $sorrowful_4_p0r$Jo 19, 16-17$sorrowful_4_p0r$, 0
from public.mysteries m where m.type = 'sorrowful' and m.sort_order = 4;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $sorrowful_4_p0c0a$Catecismo da Igreja Católica$sorrowful_4_p0c0a$, $sorrowful_4_p0c0s$CIC 618$sorrowful_4_p0c0s$, $sorrowful_4_p0c0t$A cruz é o único sacrifício de Cristo, mediador único entre Deus e os homens. Mas porque, na sua pessoa divina encarnada, «Ele Se uniu, de certo modo, a cada homem», «a todos dá a possibilidade de se associarem a este mistério pascal, por um modo só de Deus conhecido». Convida os discípulos a tomarem a sua cruz e a segui-Lo porque sofreu por nós, deixando-nos o exemplo, para que sigamos os seus passos. De facto, quer associar ao seu sacrifício redentor aqueles mesmos que são os primeiros beneficiários. Isto realiza-se, em sumo grau, em sua Mãe, associada, mais intimamente do que ninguém, ao mistério do seu sofrimento redentor: «Há uma só escada verdadeira fora do paraíso; fora da cruz, não há outra escada por onde se suba ao céu».$sorrowful_4_p0c0t$),
  (1, $sorrowful_4_p0c1a$São Tomás de Aquino$sorrowful_4_p0c1a$, $sorrowful_4_p0c1s$Suma Teológica, III, q. 46, a. 4$sorrowful_4_p0c1s$, $sorrowful_4_p0c1t$Respondo que foi convenientíssimo que Cristo padecesse a morte de cruz. Primeiro, para exemplo de virtude… para que nenhum género de morte fosse temido pelo homem que vive rectamente, mostrou-se-lhe, na cruz daquele homem, o género de morte mais execrável e formidável. Segundo, porque este género de morte convinha sobretudo à satisfação pelo pecado do primeiro pai, que tomou o fruto da árvore proibida; por isso convinha que Cristo, para satisfazer por aquele pecado, se deixasse pregar no madeiro, quasi restituindo o que Adão tomara… Terceiro, como diz Crisóstomo, padecendo «em madeiro elevado» e não debaixo de tecto, purificou também a natureza do ar…$sorrowful_4_p0c1t$),
  (2, $sorrowful_4_p0c2a$São Bernardo de Claraval$sorrowful_4_p0c2a$, $sorrowful_4_p0c2s$De duobus pertinentibus ad opus humanae redemptionis (sermo)$sorrowful_4_p0c2s$, $sorrowful_4_p0c2t$… Não foi simples ou ligeira aquela exinanição: esvaziou-Se até à carne, até à morte, até à cruz (cf. Fl 2,7-8). Quem poderá pesar dignamente quanta humildade, mansidão e condescendência foi a do Senhor da majestade vestir-Se de carne, ser castigado com a morte, desfigurar-Se na cruz? … Lembra-te agora: embora tenhas sido feito do nada, não foste redimido por nada.$sorrowful_4_p0c2t$),
  (3, $sorrowful_4_p0c3a$São João Paulo II$sorrowful_4_p0c3a$, $sorrowful_4_p0c3s$Rosarium Virginis Mariae, § 22 (texto abreviado)$sorrowful_4_p0c3s$, $sorrowful_4_p0c3t$… E o quanto Lhe deverá custar esta adesão à vontade do Pai, emerge dos mistérios seguintes, nos quais, com a flagelação, a coroação de espinhos, a subida ao Calvário, a morte na cruz, Ele é lançado no maior desprezo: Ecce homo! … Os mistérios da dor levam o crente a reviver a morte de Jesus pondo-se aos pés da cruz junto de Maria…$sorrowful_4_p0c3t$)
) as v(sort_order, author, source, text) on true
where m.type = 'sorrowful' and m.sort_order = 4;

-- sorrowful-4 · Lc 23, 26-28
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $sorrowful_4_p1t$Quando o iam conduzindo, agarraram um certo Simão Cireneu, que voltava do campo; e puseram a cruz sobre ele, para que a levasse após de Jesus. Seguia-o uma grande multidão de povo e de mulheres, que batiam no peito, e o lamentavam. Porém Jesus, voltando-se para elas, disse: «Filhas de Jerusalém, não choreis sobre mim, mas chorai sobre vós mesmas e sobre vossos filhos.»$sorrowful_4_p1t$, $sorrowful_4_p1r$Lc 23, 26-28$sorrowful_4_p1r$, 1
from public.mysteries m where m.type = 'sorrowful' and m.sort_order = 4;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 1
join (values
  (0, $sorrowful_4_p1c0a$Santo Agostinho$sorrowful_4_p1c0a$, $sorrowful_4_p1c0s$De consensu evangelistarum, lib. III, cap. 37$sorrowful_4_p1c0s$, $sorrowful_4_p1c0t$… João narra: «E, carregando ele mesmo a sua cruz, saiu para o lugar chamado Calvário…» Donde se entende que ele mesmo carregava a cruz quando saía para aquele lugar. Mas aquele Simão foi obrigado no caminho, ao qual depois foi dada a cruz para a levar até ao lugar. Assim encontramos que ambas as coisas aconteceram: primeiro o que João disse, depois o que os outros três disseram.$sorrowful_4_p1c0t$),
  (1, $sorrowful_4_p1c1a$Diretório sobre Piedade Popular e Liturgia$sorrowful_4_p1c1a$, $sorrowful_4_p1c1s$§ 133 (texto abreviado)$sorrowful_4_p1c1s$, $sorrowful_4_p1c1t$Na Via Crucis confluem também diversas expressões da espiritualidade cristã: … o desejo de nos conformarmos profundamente com a Paixão de Cristo; as exigências da sequela de Cristo, segundo a qual o discípulo deve caminhar atrás do Mestre, levando cada dia a sua própria cruz (cf. Lc 9, 23).$sorrowful_4_p1c1t$)
) as v(sort_order, author, source, text) on true
where m.type = 'sorrowful' and m.sort_order = 4;

-- sorrowful-5 · Lc 23, 33-46
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $sorrowful_5_p0t$Quando chegaram ao lugar que se chama Calvário, ali o crucificaram a ele e aos ladrões, um à direita e outro à esquerda. Jesus dizia: «Pai, perdoa-lhes, porque não sabem o que fazem.» Dividindo os seus vestidos, sortearam-nos. … E dizia a Jesus: «Senhor, lembra-te de mim, quando entrares no teu reino.» Jesus disse-lhe: «Em verdade te digo: Hoje estarás comigo no paraíso.» … Jesus, exclamando em alta voz, disse: «Pai, nas tuas mãos encomendo o meu espírito.» Dizendo isto, expirou.$sorrowful_5_p0t$, $sorrowful_5_p0r$Lc 23, 33-46$sorrowful_5_p0r$, 0
from public.mysteries m where m.type = 'sorrowful' and m.sort_order = 5;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $sorrowful_5_p0c0a$São Tomás de Aquino$sorrowful_5_p0c0a$, $sorrowful_5_p0c0s$Suma Teológica, III, q. 46, a. 3 (texto abreviado)$sorrowful_5_p0c0s$, $sorrowful_5_p0c0t$Respondo que tanto mais conveniente é um modo de alcançar o fim, quanto mais coisas convirjam que sejam úteis ao fim. Ora, pelo facto de o homem ser libertado pela paixão de Cristo, muitas coisas concorreram para a salvação do homem, para além da libertação do pecado. Primeiro, o homem conhece quanto Deus o ama, e disto é provocado a amá-Lo, em que consiste a perfeição da salvação humana … Segundo, deu-nos exemplo de obediência, humildade, constância, justiça … Terceiro … quarto … quinto … Por isso foi mais conveniente que fôssemos libertados pela paixão de Cristo do que só pela vontade de Deus.$sorrowful_5_p0c0t$),
  (1, $sorrowful_5_p0c1a$Santo Agostinho$sorrowful_5_p0c1a$, $sorrowful_5_p0c1s$Sermão 218, De passione Domini (texto abreviado)$sorrowful_5_p0c1s$, $sorrowful_5_p0c1t$A Paixão de nosso Senhor e Salvador Jesus Cristo é para nós penhor de glória e exemplo de paciência. … Portanto, de modo algum devemos envergonhar-nos da morte de nosso Deus e Senhor; pelo contrário, nela devemos confiar e gloriar-nos acima de tudo. … Reconheçamos corajosamente, irmãos, e proclamemos bem alto que Cristo foi crucificado por amor de nós … não com vergonha, mas com santo orgulho. … Quanto a mim, que eu me glorie somente na cruz do Senhor nosso, Jesus Cristo (Gl 6, 14).$sorrowful_5_p0c1t$),
  (2, $sorrowful_5_p0c2a$São Bernardo de Claraval$sorrowful_5_p0c2a$, $sorrowful_5_p0c2s$Sermo in feria IV hebdomadae sanctae, 8 (SBO 5)$sorrowful_5_p0c2s$, $sorrowful_5_p0c2t$… Flagelado, coroado de espinhos, trespassado de cravos, afixado ao patíbulo, saturado de opróbrios, no entanto esquecido de todos os dores, disse: «Perdoa-lhes»… Daí muitas misérias do corpo, daí muitas misericórdias do coração, daí dores, daí compaixões, daí óleo de exultação, daí gotas de sangue que correm sobre a terra.$sorrowful_5_p0c2t$)
) as v(sort_order, author, source, text) on true
where m.type = 'sorrowful' and m.sort_order = 5;

-- sorrowful-5 · Jo 19, 25-27
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $sorrowful_5_p1t$Junto à cruz de Jesus estavam sua Mãe, a irmã de sua Mãe, Maria, mulher de Cléofas, e Maria Madalena. Jesus, vendo sua Mãe, e, junto dela, o discípulo que amava, disse a sua Mãe: «Mulher, eis o teu filho.» Depois disse ao discípulo: «Eis a tua Mãe.» E, desta hora por diante, a levou o discípulo para sua casa.$sorrowful_5_p1t$, $sorrowful_5_p1r$Jo 19, 25-27$sorrowful_5_p1r$, 1
from public.mysteries m where m.type = 'sorrowful' and m.sort_order = 5;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 1
join (values
  (0, $sorrowful_5_p1c0a$Catecismo da Igreja Católica$sorrowful_5_p1c0a$, $sorrowful_5_p1c0s$CIC 964$sorrowful_5_p1c0s$, $sorrowful_5_p1c0t$O papel de Maria em relação à Igreja é inseparável da sua união com Cristo e decorre dela directamente. … É particularmente manifesta na hora da sua paixão: «A Bem-aventurada Virgem avançou na peregrinação de fé, e manteve fielmente a sua união com o seu Filho até à Cruz, junto da qual esteve de pé, não sem um desígnio divino; padeceu acerbamente com o seu Filho único e associou-se com coração de mãe ao seu sacrifício, consentindo amorosamente na imolação da vítima que d'Ela nascera; e, por fim, foi dada por mãe ao discípulo …: "Mulher, eis aí o teu filho" (Jo 19, 26-27)».$sorrowful_5_p1c0t$),
  (1, $sorrowful_5_p1c1a$São Bernardo de Claraval$sorrowful_5_p1c1a$, $sorrowful_5_p1c1s$Sermo in dom. infra oct. Assumptionis, 14-15 (texto abreviado)$sorrowful_5_p1c1s$, $sorrowful_5_p1c1t$Verdadeiramente, ó bem-aventurada Mãe, uma espada traspassou o teu coração. Pois só passando pelo teu coração a espada podia entrar na carne do teu Filho. … Assim a violência da dor traspassou o teu coração, e com razão te chamamos mais que mártir, pois o efeito da compaixão em ti ultrapassou a resistência ao sofrimento corporal. … Quem és tu … para te espantares mais com a compaixão de Maria do que com a paixão do Filho de Maria?$sorrowful_5_p1c1t$),
  (2, $sorrowful_5_p1c2a$São João Paulo II$sorrowful_5_p1c2a$, $sorrowful_5_p1c2s$Salvifici Doloris, § 25 (texto abreviado)$sorrowful_5_p1c2s$, $sorrowful_5_p1c2t$… Foi no Calvário que o sofrimento de Maria Santíssima, conjunto ao de Jesus, atingiu um ponto culminante… A sua subida ao Calvário e aquele seu «estar» aos pés da Cruz com o discípulo amado foram uma participação muito especial na morte redentora do Filho…$sorrowful_5_p1c2t$),
  (3, $sorrowful_5_p1c3a$São João Paulo II$sorrowful_5_p1c3a$, $sorrowful_5_p1c3s$Salvifici doloris, § 31 (texto abreviado)$sorrowful_5_p1c3s$, $sorrowful_5_p1c3t$Com Maria, Mãe de Cristo, que estava de pé junto à Cruz, nós detemo-nos junto a todas as cruzes do homem de hoje.$sorrowful_5_p1c3t$)
) as v(sort_order, author, source, text) on true
where m.type = 'sorrowful' and m.sort_order = 5;

-- sorrowful-5 · Jo 19, 33-34
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $sorrowful_5_p2t$Mas, quando chegaram a Jesus, vendo que já estava morto, não lhe quebraram as pernas, mas um dos soldados traspassou-lhe o lado com uma lança, e imediatamente saiu sangue e água.$sorrowful_5_p2t$, $sorrowful_5_p2r$Jo 19, 33-34$sorrowful_5_p2r$, 2
from public.mysteries m where m.type = 'sorrowful' and m.sort_order = 5;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 2
join (values
  (0, $sorrowful_5_p2c0a$São João Crisóstomo$sorrowful_5_p2c0a$, $sorrowful_5_p2c0s$Homilias sobre o Evangelho de São João, hom. 85 (Jo 19, 34) (texto abreviado)$sorrowful_5_p2c0s$, $sorrowful_5_p2c0t$Eis que saíram água e sangue. Não por acaso brotaram estas fontes, mas porque por estes dois juntos consiste a Igreja. … regenerados pela água e nutridos pelo Sangue e pela Carne. Daí têm origem os Mistérios; para que, quando te aproximares daquele cálice, te aproximes como bebendo do próprio lado.$sorrowful_5_p2c0t$)
) as v(sort_order, author, source, text) on true
where m.type = 'sorrowful' and m.sort_order = 5;

-- glorious-1 · Mt 28, 5-10
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $glorious_1_p0t$Mas o anjo, tomando a palavra, disse às mulheres: «Vós não temais, porque sei que procurais a Jesus, que foi crucificado. Ele já aqui não está, ressuscitou como tinha dito. Vinde e vede o lugar, onde o Senhor esteve depositado.» … E eis que Jesus lhes saiu ao encontro e lhes disse: «Eu vos saúdo.» Elas aproximaram-se, abraçaram os seus pés e prostraram-se diante dele. Então Jesus disse-lhes: «Não temais; ide, avisai meus irmãos, para que vão à Galileia; lá me verão.»$glorious_1_p0t$, $glorious_1_p0r$Mt 28, 5-10$glorious_1_p0r$, 0
from public.mysteries m where m.type = 'glorious' and m.sort_order = 1;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $glorious_1_p0c0a$Catecismo da Igreja Católica$glorious_1_p0c0a$, $glorious_1_p0c0s$CIC 652$glorious_1_p0c0s$, $glorious_1_p0c0t$A ressurreição de Cristo é o cumprimento das promessas do Antigo Testamento (578) e do próprio Jesus, durante a sua vida terrena (579). A expressão «segundo as Escrituras» (580) indica que a ressurreição de Cristo cumpriu essas predições.$glorious_1_p0c0t$),
  (1, $glorious_1_p0c1a$São Tomás de Aquino$glorious_1_p0c1a$, $glorious_1_p0c1s$Suma Teológica, III, q. 53, a. 1 (texto abreviado)$glorious_1_p0c1s$, $glorious_1_p0c1t$Respondo que foi necessário que Cristo ressuscitasse por cinco motivos. Primeiro, para recomendação da justiça divina, que é a encarregada de exaltar a quem se humilha por Deus … Por isso, tendo Cristo se humilhado até à morte de cruz, por caridade e obediência a Deus, era necessário que fosse exaltado por Deus até à ressurreição gloriosa. … Terceiro, para levantar a nossa esperança. Pois, ao ver que Cristo ressuscita, sendo Ele a nossa cabeça, esperamos que também nós ressuscitaremos. … Quinto, para complemento da nossa salvação. … assim também foi glorificado ressuscitando para nos conduzir aos bens.$glorious_1_p0c1t$),
  (2, $glorious_1_p0c2a$Santo Agostinho$glorious_1_p0c2a$, $glorious_1_p0c2s$Contra Fausto, o Maniqueu, livro 14, cap. 4 (texto abreviado)$glorious_1_p0c2s$, $glorious_1_p0c2t$Negue Cristo maldito quem nega também que morreu. Mas quem confessa que morreu … Cristo assumiu sem culpa o nosso suplício, para dali desatar a nossa culpa e pôr fim também ao nosso suplício.$glorious_1_p0c2t$),
  (3, $glorious_1_p0c3a$Santo Agostinho$glorious_1_p0c3a$, $glorious_1_p0c3s$Sermão «Sobre a Ressurreição de Cristo, segundo São Marcos» (PL 38, 1104-1107) (texto abreviado)$glorious_1_p0c3s$, $glorious_1_p0c3t$… posto no sepulcro; mas no terceiro dia ressurgiu, acabando-se o sofrimento, morrendo a morte. Eia, tende lá os vossos olhos na ressurreição de Cristo; porque tanto quis o Pai engrandecer o seu Santo, que o ressuscitou dos mortos e lhe deu a honra de se assentar no Céu à sua direita.$glorious_1_p0c3t$)
) as v(sort_order, author, source, text) on true
where m.type = 'glorious' and m.sort_order = 1;

-- glorious-1 · 1 Co 15, 14-22
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $glorious_1_p1t$E, se Cristo não ressuscitou, é vã a nossa pregação, é também vã a vossa fé. … Mas Cristo ressuscitou dos mortos, sendo ele as primícias dos que dormem, porque, assim como a morte veio por um homem, também por um homem vem a ressurreição dos mortos. Assim como todos morrem em Adão, assim também todos serão vivificados em Cristo.$glorious_1_p1t$, $glorious_1_p1r$1 Co 15, 14-22$glorious_1_p1r$, 1
from public.mysteries m where m.type = 'glorious' and m.sort_order = 1;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 1
join (values
  (0, $glorious_1_p1c0a$Catecismo da Igreja Católica$glorious_1_p1c0a$, $glorious_1_p1c0s$CIC 651$glorious_1_p1c0s$, $glorious_1_p1c0t$«Se Cristo não ressuscitou, então a nossa pregação é vã e também é vã a vossa fé» (1 Cor 15, 14). A ressurreição constitui, antes de mais, a confirmação de tudo quanto Cristo em pessoa fez e ensinou. Todas as verdades, mesmo as mais inacessíveis ao espírito humano, encontram a sua justificação se, ressuscitando, Cristo deu a prova definitiva, que tinha prometido, da sua autoridade divina.$glorious_1_p1c0t$),
  (1, $glorious_1_p1c1a$Catecismo da Igreja Católica$glorious_1_p1c1a$, $glorious_1_p1c1s$CIC 655$glorious_1_p1c1s$, $glorious_1_p1c1t$Finalmente, a ressurreição de Cristo – e o próprio Cristo Ressuscitado – é princípio e fonte da nossa ressurreição futura: «Cristo ressuscitou dos mortos como primícias dos que morreram [...]. Do mesmo modo que em Adão todos morreram, assim também em Cristo serão todos restituídos à vida» (1 Cor 15, 20-22). … «para que os vivos deixem de viver para si próprios, mas vivam para Aquele que morreu e ressuscitou por eles» (2 Cor 5, 15).$glorious_1_p1c1t$),
  (2, $glorious_1_p1c2a$São Tomás de Aquino$glorious_1_p1c2a$, $glorious_1_p1c2s$Suma Teológica, III, q. 56, a. 1 (texto abreviado)$glorious_1_p1c2s$, $glorious_1_p1c2t$Respondo que, como se escreve no II Metafís., o que é primeiro num género qualquer é causa de todos os que vêm depois. Ora, no género da nossa ressurreição, o primeiro foi a ressurreição de Cristo … Por isso é necessário que a ressurreição de Cristo seja causa da nossa ressurreição. E isto é o que diz o Apóstolo em 1 Cor 15, 20-21 … O Verbo de Deus dá primeiro a vida ao corpo que lhe está naturalmente unido, e por meio dele causa a ressurreição em todos os demais.$glorious_1_p1c2t$),
  (3, $glorious_1_p1c3a$São João Paulo II$glorious_1_p1c3a$, $glorious_1_p1c3s$Rosarium Virginis Mariae, § 23 (texto abreviado)$glorious_1_p1c3s$, $glorious_1_p1c3t$A contemplação do rosto de Cristo não pode deter-se na imagem do crucificado. Ele é o Ressuscitado! … Contemplando o Ressuscitado, o cristão descobre novamente as razões da própria fé (cf. 1 Cor 15, 14), e revive não só a alegria daqueles a quem Cristo Se manifestou – os Apóstolos, a Madalena, os discípulos de Emaús –, mas também a alegria de Maria …$glorious_1_p1c3t$)
) as v(sort_order, author, source, text) on true
where m.type = 'glorious' and m.sort_order = 1;

-- glorious-2 · At 1, 9-11
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $glorious_2_p0t$Tendo dito isto, elevou-se à vista deles, e uma nuvem o ocultou aos seus olhos. Como estivessem olhando para o céu, quando ele ia subindo, eis que se apresentaram junto deles dois personagens vestidos de branco, os quais lhes disseram: «Homens da Galileia, por que estais aí parados olhando para o céu? Esse Jesus que, separando-se de vós, foi arrebatado ao céu, virá do mesmo modo que o vistes ir para o céu.»$glorious_2_p0t$, $glorious_2_p0r$At 1, 9-11$glorious_2_p0r$, 0
from public.mysteries m where m.type = 'glorious' and m.sort_order = 2;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $glorious_2_p0c0a$Catecismo da Igreja Católica$glorious_2_p0c0a$, $glorious_2_p0c0s$CIC 661$glorious_2_p0c0s$, $glorious_2_p0c0t$Esta última etapa continua intimamente unida à primeira, isto é, à descida do céu realizada na Encarnação. Só Aquele que «saiu do Pai» pode «voltar para o Pai»: Cristo (596). «Ninguém subiu ao céu senão Aquele que desceu do céu: o Filho do Homem» (Jo 3, 13) (597). … Só Cristo pôde abrir ao homem este acesso: «subindo aos céus, como nossa cabeça e primogénito, deu-nos a esperança de irmos um dia ao seu encontro, como membros do seu corpo» (599).$glorious_2_p0c0t$),
  (1, $glorious_2_p0c1a$Catecismo da Igreja Católica$glorious_2_p0c1a$, $glorious_2_p0c1s$CIC 666$glorious_2_p0c1s$, $glorious_2_p0c1t$Jesus Cristo, cabeça da Igreja, precede-nos no Reino glorioso do Pai, para que nós, membros do seu corpo, vivamos na esperança de estarmos um dia eternamente com Ele.$glorious_2_p0c1t$),
  (2, $glorious_2_p0c2a$São Tomás de Aquino$glorious_2_p0c2a$, $glorious_2_p0c2s$Suma Teológica, III, q. 57, a. 1$glorious_2_p0c2s$, $glorious_2_p0c2t$Respondo que deve haver proporção entre o lugar e o que o ocupa. Cristo, pela ressurreição, deu começo a uma vida imortal e incorruptível. … Não foi conveniente que Cristo, depois da ressurreição, permanecesse na terra, mas que subisse aos céus. … A ascensão foi mais útil do que a presença corporal: primeiro, para o aumento da fé; segundo, para a elevação da esperança — «quando eu me haja ido e vos haja preparado o lugar, volverei de novo e vos tomarei comigo» (Jo 14, 3); terceiro, para erguer a caridade às coisas do céu (cf. Col 3, 1-2).$glorious_2_p0c2t$),
  (3, $glorious_2_p0c3a$Santo Agostinho$glorious_2_p0c3a$, $glorious_2_p0c3s$Sermão 261, In Ascensionem Domini, 1-2 (texto abreviado)$glorious_2_p0c3s$, $glorious_2_p0c3t$Hoje o nosso Senhor Jesus Cristo subiu ao céu; suba também connosco o nosso coração. … Cristo desceu só, mas já não subiu só: nós subimos também nele pela graça. … Ele, quando desceu até nós, não deixou o céu; tampouco nos deixou, ao voltar ao céu.$glorious_2_p0c3t$),
  (4, $glorious_2_p0c4a$São João Paulo II$glorious_2_p0c4a$, $glorious_2_p0c4s$Rosarium Virginis Mariae, § 23 (texto abreviado)$glorious_2_p0c4s$, $glorious_2_p0c4t$O Rosário convida o crente a ultrapassar as trevas da Paixão, para fixar o olhar na glória de Cristo com a Ressurreição e a Ascensão. … A esta glória, onde com a Ascensão Cristo se senta à direita do Pai, [Maria] será elevada com a Assunção, chegando, por especialíssimo privilégio, a antecipar o destino reservado a todos os justos com a ressurreição da carne. … Os mistérios gloriosos alimentam nos crentes a esperança da meta escatológica.$glorious_2_p0c4t$)
) as v(sort_order, author, source, text) on true
where m.type = 'glorious' and m.sort_order = 2;

-- glorious-2 · Mc 16, 19
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $glorious_2_p1t$O Senhor, depois que assim lhes falou, elevou-se ao céu, e foi sentar-se à direita de Deus.$glorious_2_p1t$, $glorious_2_p1r$Mc 16, 19$glorious_2_p1r$, 1
from public.mysteries m where m.type = 'glorious' and m.sort_order = 2;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 1
join (values
  (0, $glorious_2_p1c0a$Catecismo da Igreja Católica$glorious_2_p1c0a$, $glorious_2_p1c0s$CIC 659$glorious_2_p1c0s$, $glorious_2_p1c0t$«Então, o Senhor Jesus, depois de lhes ter falado, foi elevado ao céu e sentou-se à direita de Deus» (Mc 16, 19). … A última aparição de Jesus termina com a entrada irreversível da sua humanidade na glória divina, simbolizada pela nuvem (cf. At 1, 9) e pelo céu, onde a partir de então está sentado à direita de Deus.$glorious_2_p1c0t$),
  (1, $glorious_2_p1c1a$Catecismo da Igreja Católica$glorious_2_p1c1a$, $glorious_2_p1c1s$CIC 662$glorious_2_p1c1s$, $glorious_2_p1c1t$«E Eu, uma vez elevado da terra, atrairei todos a Mim» (Jo 12, 32). … Nos céus, Cristo exerce permanentemente o seu sacerdócio, «sempre vivo para interceder a favor daqueles que, por seu intermédio, se aproximam de Deus» (Heb 7, 25).$glorious_2_p1c1t$),
  (2, $glorious_2_p1c2a$São Leão Magno$glorious_2_p1c2a$, $glorious_2_p1c2s$Sermo 1 de Ascensione, 4$glorious_2_p1c2s$, $glorious_2_p1c2t$… Grande e inefável motivo de júbilo era elevar-se, na presença de uma santa multidão, a natureza humana acima da dignidade de todas as criaturas celestes … até ser assentada junto do eterno Pai. A ascensão de Cristo, portanto, é a nossa exaltação e para lá onde precedeu a glória da Cabeça, é atraída também a esperança do Corpo.$glorious_2_p1c2t$)
) as v(sort_order, author, source, text) on true
where m.type = 'glorious' and m.sort_order = 2;

-- glorious-3 · At 2, 1-4
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $glorious_3_p0t$Quando se completaram os dias do Pentecostes, estavam todos juntos no mesmo lugar. De repente, veio do céu um estrondo, como de vento que soprava impetuoso, que encheu toda a casa onde estavam sentados. E apareceram-lhes repartidas umas como línguas de fogo, das quais pousou uma sobre cada um deles. Ficaram todos cheios do Espírito Santo e começaram a falar várias línguas, conforme o Espírito Santo lhes concedia que falassem.$glorious_3_p0t$, $glorious_3_p0r$At 2, 1-4$glorious_3_p0r$, 0
from public.mysteries m where m.type = 'glorious' and m.sort_order = 3;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $glorious_3_p0c0a$Catecismo da Igreja Católica$glorious_3_p0c0a$, $glorious_3_p0c0s$CIC 731$glorious_3_p0c0s$, $glorious_3_p0c0t$No dia de Pentecostes (no termo das sete semanas pascais), a Páscoa de Cristo completou-se com a efusão do Espírito Santo que Se manifestou, Se deu e Se comunicou como Pessoa divina: da sua plenitude, Cristo Senhor derrama em profusão o Espírito (109).$glorious_3_p0c0t$),
  (1, $glorious_3_p0c1a$Catecismo da Igreja Católica$glorious_3_p0c1a$, $glorious_3_p0c1s$CIC 767$glorious_3_p0c1s$, $glorious_3_p0c1t$«Consumada a obra que o Pai confiou ao Filho para cumprir na terra, no dia de Pentecostes foi enviado o Espírito Santo para que santificasse continuamente a Igreja» (180). Foi então que «a Igreja foi publicamente manifestada diante duma grande multidão» e «teve o seu início a difusão do Evangelho entre os gentios, por meio da pregação» (181). Porque é «convocação» de todos os homens à salvação, a Igreja é, por sua própria natureza, missionária, enviada por Cristo a todas as nações, para de todas fazer discípulos (182).$glorious_3_p0c1t$),
  (2, $glorious_3_p0c2a$Catecismo da Igreja Católica$glorious_3_p0c2a$, $glorious_3_p0c2s$CIC 732 (texto abreviado)$glorious_3_p0c2s$, $glorious_3_p0c2t$Neste dia, revelou-Se plenamente a Santíssima Trindade. A partir deste dia, o Reino anunciado por Cristo abre-se aos que n'Ele crêem. … Pela sua vinda, que não cessará jamais, o Espírito Santo faz entrar no mundo nos «últimos tempos», no tempo da Igreja, no Reino já herdado mas ainda não consumado$glorious_3_p0c2t$),
  (3, $glorious_3_p0c3a$Catecismo da Igreja Católica$glorious_3_p0c3a$, $glorious_3_p0c3s$CIC 736$glorious_3_p0c3s$, $glorious_3_p0c3t$É graças a esta força do Espírito que os filhos de Deus podem dar fruto. Aquele que nos enxertou na verdadeira Vide far-nos-á dar «os frutos do Espírito: caridade, alegria, paz, paciência, benignidade, bondade, fidelidade, mansidão, auto-domínio» (Gl 5, 22-23).$glorious_3_p0c3t$),
  (4, $glorious_3_p0c4a$Catecismo da Igreja Católica$glorious_3_p0c4a$, $glorious_3_p0c4s$CIC 737 (texto abreviado)$glorious_3_p0c4s$, $glorious_3_p0c4t$A missão de Cristo e do Espírito Santo completa-se na Igreja, corpo de Cristo e templo do Espírito Santo. … Torna-lhes presente o mistério de Cristo, principalmente na Eucaristia, com o fim de os reconciliar, de os pôr em comunhão com Deus, para os fazer dar «muito fruto» (116)$glorious_3_p0c4t$),
  (5, $glorious_3_p0c5a$São Tomás de Aquino$glorious_3_p0c5a$, $glorious_3_p0c5s$Suma Teológica, I, q. 37, a. 1 (texto abreviado)$glorious_3_p0c5s$, $glorious_3_p0c5t$O nome de amor, em Deus, pode ser tomado em sentido essencial e pessoalmente. Pessoalmente, é o nome próprio do Espírito Santo, como o Verbo é o do Filho. … Quando pois dizemos que o Espírito Santo é o amor do Pai para com o Filho … exprimimos somente a relação do amor com a coisa amada. … O Espírito Santo se chama nexo entre o Pai e o Filho, enquanto amor … é necessário que de ambos proceda o Espírito Santo, que é o mútuo Amor$glorious_3_p0c5t$),
  (6, $glorious_3_p0c6a$São Tomás de Aquino$glorious_3_p0c6a$, $glorious_3_p0c6s$Suma Teológica, I, q. 43, a. 7 (texto abreviado)$glorious_3_p0c6s$, $glorious_3_p0c6t$A este, enquanto procede como Amor, compete ser o dom da santificação … Por isso foi necessária a missão visível do Espírito Santo a Cristo, aos Apóstolos e aos outros primitivos santos, nos quais, de algum modo, estava fundada a Igreja. … Sob a figura de línguas de fogo ainda, para significar o dever de ensinarem; por isso, foi dito (At 2, 4) que começaram a falar em várias línguas$glorious_3_p0c6t$)
) as v(sort_order, author, source, text) on true
where m.type = 'glorious' and m.sort_order = 3;

-- glorious-3 · At 1, 14
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $glorious_3_p1t$Todos estes perseveravam unânimemente em oração, com as mulheres e com Maria, Mãe de Jesus, e com os irmãos dele.$glorious_3_p1t$, $glorious_3_p1r$At 1, 14$glorious_3_p1r$, 1
from public.mysteries m where m.type = 'glorious' and m.sort_order = 3;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 1
join (values
  (0, $glorious_3_p1c0a$São João Paulo II$glorious_3_p1c0a$, $glorious_3_p1c0s$Rosarium Virginis Mariae, § 23 (texto abreviado)$glorious_3_p1c0s$, $glorious_3_p1c0t$No terceiro mistério glorioso, o Pentecostes, que mostra o rosto da Igreja como família reunida com Maria, fortalecida pela poderosa efusão do Espírito, pronta para a missão evangelizadora. … O Pentecostes constitui o grande «ícone» da nova existência em Cristo$glorious_3_p1c0t$),
  (1, $glorious_3_p1c1a$Catecismo da Igreja Católica$glorious_3_p1c1a$, $glorious_3_p1c1s$CIC 965$glorious_3_p1c1s$, $glorious_3_p1c1t$Depois da Ascensão do seu Filho, Maria «assistiu com suas orações aos começos da Igreja» (529). E, reunida com os Apóstolos e algumas mulheres, vemos «Maria implorando com as suas orações o dom daquele Espírito, que já na Anunciação a cobrira com a Sua sombra» (530).$glorious_3_p1c1t$)
) as v(sort_order, author, source, text) on true
where m.type = 'glorious' and m.sort_order = 3;

-- glorious-4 · Ap 12, 1
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $glorious_4_p0t$Depois apareceu no céu um grande sinal: uma Mulher vestida de sol, com a lua debaixo de seus pés, e uma coroa de doze estrelas sobre a sua cabeça.$glorious_4_p0t$, $glorious_4_p0r$Ap 12, 1$glorious_4_p0r$, 0
from public.mysteries m where m.type = 'glorious' and m.sort_order = 4;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $glorious_4_p0c0a$Pio XII$glorious_4_p0c0a$, $glorious_4_p0c0s$*Munificentissimus Deus*, §44 (Definição solene do dogma)$glorious_4_p0c0s$, $glorious_4_p0c0t$«… pronunciamos, declaramos e definimos ser dogma divinamente revelado que: a imaculada Mãe de Deus, a sempre virgem Maria, terminado o curso da vida terrestre, foi assunta em corpo e alma à glória celestial».$glorious_4_p0c0t$),
  (1, $glorious_4_p0c1a$Pio XII$glorious_4_p0c1a$, $glorious_4_p0c1s$*Munificentissimus Deus*, §40$glorious_4_p0c1s$, $glorious_4_p0c1t$… alcançou por fim, como suprema coroa dos seus privilégios, que fosse preservada da corrupção do sepulcro, e que, à semelhança do seu divino Filho, vencida a morte, fosse levada em corpo e alma ao céu, onde refulge como Rainha à direita do seu Filho, Rei imortal dos séculos (cf. 1Tm 1,17).$glorious_4_p0c1t$),
  (2, $glorious_4_p0c2a$São Bernardo de Claraval$glorious_4_p0c2a$, $glorious_4_p0c2s$1.º Sermão para a Assunção (trad. Pain de Cîteaux 32, p. 63 rev.; texto abreviado)$glorious_4_p0c2s$, $glorious_4_p0c2t$Hoje a Virgem Maria sobe, gloriosa, ao céu. … Sim, Ela precedeu-nos, a nossa Rainha, precedeu-nos e foi recebida com tanta glória que nós, seus humildes servos, podemos seguir a nossa Rainha com toda confiança gritando … «Arrasta-me atrás de ti. Corramos ao odor dos teus perfumes!» (Ct 1, 3-4) Viajantes sobre a terra, enviamos à frente a nossa advogada … a Mãe de misericórdia, para defender eficazmente a nossa salvação.$glorious_4_p0c2t$),
  (3, $glorious_4_p0c3a$São João Damasceno$glorious_4_p0c3a$, $glorious_4_p0c3s$1.ª Homilia sobre a Dormição, 11-14 (texto abreviado)$glorious_4_p0c3s$, $glorious_4_p0c3t$… O teu corpo puríssimo, sem mácula, não foi abandonado à terra, antes foste elevada até à morada do Reino dos Céus, tu, a Rainha, a Soberana, a Senhora, a Mãe de Deus … Lança os teus olhos sobre nós, ó Rainha, Mãe do nosso bom Soberano; guia o nosso caminho até ao porto sem tempestades do desejo bom de Deus.$glorious_4_p0c3t$),
  (4, $glorious_4_p0c4a$Catecismo da Igreja Católica$glorious_4_p0c4a$, $glorious_4_p0c4s$CIC 975$glorious_4_p0c4s$, $glorious_4_p0c4t$«Nós cremos que a santíssima Mãe de Deus, a nova Eva, a Mãe da Igreja, continua a desempenhar no céu o seu papel maternal para com os membros de Cristo».$glorious_4_p0c4t$)
) as v(sort_order, author, source, text) on true
where m.type = 'glorious' and m.sort_order = 4;

-- glorious-4 · 1 Co 15, 20-23
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $glorious_4_p1t$Mas Cristo ressuscitou dos mortos, sendo ele as primícias dos que dormem, porque, assim como a morte veio por um homem, também por um homem vem a ressurreição dos mortos. Assim como todos morrem em Adão, assim também todos serão vivificados em Cristo. Mas, cada um em sua ordem: como primícias, Cristo; depois, os que são de Cristo, que creram na sua vinda.$glorious_4_p1t$, $glorious_4_p1r$1 Co 15, 20-23$glorious_4_p1r$, 1
from public.mysteries m where m.type = 'glorious' and m.sort_order = 4;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 1
join (values
  (0, $glorious_4_p1c0a$Catecismo da Igreja Católica$glorious_4_p1c0a$, $glorious_4_p1c0s$CIC 966 (texto abreviado)$glorious_4_p1c0s$, $glorious_4_p1c0t$«Finalmente, a Virgem Imaculada, preservada imune de toda a mancha da culpa original, terminado o curso da vida terrena, foi elevada ao céu em corpo e alma e exaltada pelo Senhor como rainha, para assim se conformar mais plenamente com o seu Filho, Senhor dos senhores e vencedor do pecado e da morte». A Assunção da santíssima Virgem é uma singular participação na ressurreição do seu Filho e uma antecipação da ressurreição dos outros cristãos: «No teu parto guardaste a virgindade e na tua dormição não abandonaste a mundo, ó Mãe de Deus…»$glorious_4_p1c0t$),
  (1, $glorious_4_p1c1a$Catecismo da Igreja Católica$glorious_4_p1c1a$, $glorious_4_p1c1s$CIC 974$glorious_4_p1c1s$, $glorious_4_p1c1t$«Terminado o curso da sua vida terrena, a santíssima Virgem Maria foi elevada em corpo e alma para a glória do céu, onde participa já na glória da ressurreição do seu Filho, antecipando a ressurreição de todos os membros do Seu Corpo».$glorious_4_p1c1t$),
  (2, $glorious_4_p1c2a$São João Paulo II$glorious_4_p1c2a$, $glorious_4_p1c2s$*Rosarium Virginis Mariae*, §23 (texto abreviado)$glorious_4_p1c2s$, $glorious_4_p1c2t$… A esta glória, onde com a Ascensão Cristo Se senta à direita do Pai, Ela mesma será elevada com a Assunção, chegando, por especialíssimo privilégio, a antecipar o destino reservado a todos os justos com a ressurreição da carne. Enfim, coroada de glória — como aparece no último mistério glorioso — Ela resplandece como Rainha dos Anjos e dos Santos…$glorious_4_p1c2t$)
) as v(sort_order, author, source, text) on true
where m.type = 'glorious' and m.sort_order = 4;

-- glorious-5 · Ap 12, 1
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $glorious_5_p0t$Depois apareceu no céu um grande sinal: uma Mulher vestida de sol, com a lua debaixo de seus pés, e uma coroa de doze estrelas sobre a sua cabeça.$glorious_5_p0t$, $glorious_5_p0r$Ap 12, 1$glorious_5_p0r$, 0
from public.mysteries m where m.type = 'glorious' and m.sort_order = 5;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $glorious_5_p0c0a$Catecismo da Igreja Católica$glorious_5_p0c0a$, $glorious_5_p0c0s$CIC 972$glorious_5_p0c0s$, $glorious_5_p0c0t$«Assim como, glorificada já em corpo e alma, a Mãe de Jesus é imagem e início da igreja que se há-de consumar no século futuro, assim também, brilha na terra como sinal de esperança segura e de consolação, para o povo de Deus ainda peregrino.»$glorious_5_p0c0t$),
  (1, $glorious_5_p0c1a$São João Paulo II$glorious_5_p0c1a$, $glorious_5_p0c1s$Rosarium Virginis Mariae, § 23 (texto abreviado)$glorious_5_p0c1s$, $glorious_5_p0c1t$«Enfim, coroada de glória – como aparece no último mistério glorioso – Ela resplandece como Rainha dos Anjos e dos Santos, antecipação e ponto culminante da condição escatológica da Igreja.»$glorious_5_p0c1t$),
  (2, $glorious_5_p0c2a$Pio XII$glorious_5_p0c2a$, $glorious_5_p0c2s$Encíclica Ad caeli reginam, § 31 (texto abreviado)$glorious_5_p0c2s$, $glorious_5_p0c2t$«Finalmente a arte cristã … desde o concílio de Éfeso … chegando até a figurar o divino Redentor no ato de cingir com brilhante coroa a cabeça da própria Mãe.» … «no santo rosário … do quinto mistério glorioso, o reino de Maria, que abraça o céu e a terra.»$glorious_5_p0c2t$)
) as v(sort_order, author, source, text) on true
where m.type = 'glorious' and m.sort_order = 5;

-- glorious-5 · Lc 1, 48-50
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $glorious_5_p1t$… porque lançou os olhos para a baixeza da sua serva. Portanto, eis que, de hoje em diante, todas as gerações me chamarão bem-aventurada. Porque o Todo-poderoso fez em mim grandes coisas, o seu nome é santo. E a sua misericórdia se estende de geração em geração sobre aqueles que o temem.$glorious_5_p1t$, $glorious_5_p1r$Lc 1, 48-50$glorious_5_p1r$, 1
from public.mysteries m where m.type = 'glorious' and m.sort_order = 5;
insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 1
join (values
  (0, $glorious_5_p1c0a$Catecismo da Igreja Católica$glorious_5_p1c0a$, $glorious_5_p1c0s$CIC 969$glorious_5_p1c0s$, $glorious_5_p1c0t$«Esta maternidade de Maria na economia da graça perdura sem interrupção … depois de elevada ao céu, não abandonou esta missão salvadora, mas, com a sua multiforme intercessão, continua a alcançar-nos os dons da salvação eterna … Por isso, a Virgem é invocada na Igreja com os títulos de advogada, auxiliadora, socorro e medianeira.»$glorious_5_p1c0t$),
  (1, $glorious_5_p1c1a$Catecismo da Igreja Católica$glorious_5_p1c1a$, $glorious_5_p1c1s$CIC 2677$glorious_5_p1c1s$, $glorious_5_p1c1t$«Santa Maria, Mãe de Deus, rogai por nós …» … «Pedindo a Maria que rogue por nós, reconhecemo-nos pobres pecadores e recorremos à «Mãe de misericórdia», à «Santíssima». Confiamo-nos a Ela «agora», no hoje das nossas vidas.»$glorious_5_p1c1t$),
  (2, $glorious_5_p1c2a$Pio XII$glorious_5_p1c2a$, $glorious_5_p1c2s$Encíclica Ad caeli reginam, § 40 (texto abreviado)$glorious_5_p1c2s$, $glorious_5_p1c2t$«Com ânimo verdadeiramente materno para conosco … ela, que pelo Senhor foi constituída rainha do céu e da terra, toma cuidado de todo o gênero humano … com as suas súplicas maternas impetra com eficácia, obtém quanto pede, nem pode deixar de ser ouvida.»$glorious_5_p1c2t$),
  (3, $glorious_5_p1c3a$São Bernardo de Claraval$glorious_5_p1c3a$, $glorious_5_p1c3s$In laudibus Virginis Matris (Super Missus est), homilia II, 17 (texto abreviado)$glorious_5_p1c3s$, $glorious_5_p1c3t$«Ó tu, que na instabilidade deste mundo sentes que és mais sacudido pelas tormentas … não desvies o olhar do fulgor desta estrela … olha para a estrela, invoca Maria.» … «Nos perigos, nas angústias e nas incertezas, pensa em Maria, invoca Maria.» … «Seguindo-a, não te desviarás; invocando-a, não desesperarás … se te é propícia chegarás ao fim.»$glorious_5_p1c3t$)
) as v(sort_order, author, source, text) on true
where m.type = 'glorious' and m.sort_order = 5;

