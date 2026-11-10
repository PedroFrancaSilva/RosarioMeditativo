-- Idempotent seed: mysteries, passages (Matos Soares), Anunciação images + sample commentaries/deeper refs

insert into public.mysteries (name, type, sort_order)
values ('A Anunciação', 'joyful', 1)
on conflict (type, sort_order) do update set name = excluded.name, updated_at = now();

insert into public.mysteries (name, type, sort_order)
values ('A Visitação', 'joyful', 2)
on conflict (type, sort_order) do update set name = excluded.name, updated_at = now();

insert into public.mysteries (name, type, sort_order)
values ('O Nascimento de Jesus', 'joyful', 3)
on conflict (type, sort_order) do update set name = excluded.name, updated_at = now();

insert into public.mysteries (name, type, sort_order)
values ('A Apresentação no Templo', 'joyful', 4)
on conflict (type, sort_order) do update set name = excluded.name, updated_at = now();

insert into public.mysteries (name, type, sort_order)
values ('A Perda e o Encontro de Jesus no Templo', 'joyful', 5)
on conflict (type, sort_order) do update set name = excluded.name, updated_at = now();

insert into public.mysteries (name, type, sort_order)
values ('A Agonia de Jesus no Horto', 'sorrowful', 1)
on conflict (type, sort_order) do update set name = excluded.name, updated_at = now();

insert into public.mysteries (name, type, sort_order)
values ('A Flagelação', 'sorrowful', 2)
on conflict (type, sort_order) do update set name = excluded.name, updated_at = now();

insert into public.mysteries (name, type, sort_order)
values ('A Coroação de Espinhos', 'sorrowful', 3)
on conflict (type, sort_order) do update set name = excluded.name, updated_at = now();

insert into public.mysteries (name, type, sort_order)
values ('Jesus Carrega a Cruz', 'sorrowful', 4)
on conflict (type, sort_order) do update set name = excluded.name, updated_at = now();

insert into public.mysteries (name, type, sort_order)
values ('A Crucifixão', 'sorrowful', 5)
on conflict (type, sort_order) do update set name = excluded.name, updated_at = now();

insert into public.mysteries (name, type, sort_order)
values ('A Ressurreição', 'glorious', 1)
on conflict (type, sort_order) do update set name = excluded.name, updated_at = now();

insert into public.mysteries (name, type, sort_order)
values ('A Ascensão', 'glorious', 2)
on conflict (type, sort_order) do update set name = excluded.name, updated_at = now();

insert into public.mysteries (name, type, sort_order)
values ('A Descida do Espírito Santo', 'glorious', 3)
on conflict (type, sort_order) do update set name = excluded.name, updated_at = now();

insert into public.mysteries (name, type, sort_order)
values ('A Assunção de Nossa Senhora', 'glorious', 4)
on conflict (type, sort_order) do update set name = excluded.name, updated_at = now();

insert into public.mysteries (name, type, sort_order)
values ('A Coroação de Nossa Senhora', 'glorious', 5)
on conflict (type, sort_order) do update set name = excluded.name, updated_at = now();

insert into public.mysteries (name, type, sort_order)
values ('O Batismo de Jesus', 'luminous', 1)
on conflict (type, sort_order) do update set name = excluded.name, updated_at = now();

insert into public.mysteries (name, type, sort_order)
values ('As Bodas de Caná', 'luminous', 2)
on conflict (type, sort_order) do update set name = excluded.name, updated_at = now();

insert into public.mysteries (name, type, sort_order)
values ('O Anúncio do Reino de Deus', 'luminous', 3)
on conflict (type, sort_order) do update set name = excluded.name, updated_at = now();

insert into public.mysteries (name, type, sort_order)
values ('A Transfiguração', 'luminous', 4)
on conflict (type, sort_order) do update set name = excluded.name, updated_at = now();

insert into public.mysteries (name, type, sort_order)
values ('A Instituição da Eucaristia', 'luminous', 5)
on conflict (type, sort_order) do update set name = excluded.name, updated_at = now();

-- Passages (skip if already present for mystery+sort_order)
insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Estando Isabel no sexto mês, foi enviado por Deus o anjo Gabriel a uma cidade da Galileia, chamada Nazaré, a uma virgem desposada com um varão, chamado José, da casa de David; o nome da virgem era Maria. Entrando o anjo onde ela estava, disse-lhe: "Deus te salve, cheia de graça; o Senhor é contigo." O anjo disse-lhe: "Não temas, Maria, pois achaste graça diante de Deus; eis que conceberás no teu ventre, e darás à luz um filho, a quem porás o nome de Jesus. Será grande, será chamado Filho do Altíssimo." Maria disse: "Eis aqui a serva do Senhor, faça-se em mim a tua palavra."', 'Lc 1, 26-38', 0
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 1
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 0
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Pois por isso o mesmo Senhor vos dará este sinal: Eis que a virgem concebeu e dá à luz um filho, e o chama Emanuel.', 'Is 7, 14', 1
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 1
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 1
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Naqueles dias, levantando-se Maria, foi com pressa às montanhas, a uma cidade de Judá. Entrou em casa de Zacarias, e saudou Isabel. Aconteceu que, apenas Isabel ouviu a saudação de Maria, o menino saltou no seu ventre, e Isabel ficou cheia do Espírito Santo; e exclamou em alta voz: "Bendita és tu entre todas as mulheres, e bendito é o fruto do teu ventre. Bem-aventurada a que acreditou, porque se hão-de cumprir as coisas que da parte do Senhor foram ditas."', 'Lc 1, 39-45', 0
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 2
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 0
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Então Maria disse: "A minha alma glorifica o Senhor; e o meu espírito exulta em Deus meu Salvador, porque lançou os olhos para a baixeza da sua serva. O Todo-poderoso fez em mim grandes coisas, o seu nome é santo."', 'Lc 1, 46-55', 1
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 2
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 1
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Deu à luz o seu filho primogénito, e o enfaixou, e o reclinou numa manjedoura. Apareceu-lhes um anjo do Senhor: "Nasceu-vos hoje na cidade de David um Salvador, que é o Cristo, o Senhor." Subitamente apareceu com o anjo uma multidão da milícia celeste, louvando a Deus: "Glória a Deus no mais alto dos céus, e paz na terra aos homens."', 'Lc 2, 1-20', 0
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 3
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 0
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Maria conservava todas estas coisas, meditando-as no seu coração.', 'Lc 2, 19', 1
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 3
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 1
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Levaram-no a Jerusalém para o apresentar ao Senhor. Simeão tomou o Menino em seus braços: "Agora, Senhor, podes deixar partir o teu servo em paz, porque os meus olhos viram a tua salvação." Disse a Maria: "Eis que este Menino está posto para ruína e ressurgimento de muitos em Israel; e uma espada trespassará a tua alma!"', 'Lc 2, 22-35', 0
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 4
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 0
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Ana, profetiza, louvava a Deus, e falava de Jesus a todos os de Jerusalém que esperavam a redenção.', 'Lc 2, 36-38', 1
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 4
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 1
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Ficou o Menino Jesus em Jerusalém. Três dias depois, encontraram-no no templo sentado no meio dos doutores. Sua mãe disse-lhe: "Filho, porque procedeste assim connosco?" Ele disse-lhes: "Não sabíeis que devo ocupar-me nas coisas de meu Pai?"', 'Lc 2, 41-50', 0
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 5
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 0
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Desceu com eles, e foi a Nazaré; e era-lhes submisso. Sua mãe conservava todas estas coisas no seu coração.', 'Lc 2, 51-52', 1
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 5
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 1
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Logo que saiu da água, eis que se lhe abriram os céus, e viu o Espírito de Deus descer como pomba, e vir sobre ele. E eis uma voz dos céus, que dizia: "Este é o meu Filho amado, em quem me comprazo."', 'Mt 3, 16-17', 0
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 1
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 0
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Jesus, vindo da Galileia ao Jordão, apresentou-se a João para ser batizado. João opunha-se, mas Jesus respondeu: "Deixa por agora, porque assim nos convém cumprir toda a justiça."', 'Mt 3, 13-15', 1
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 1
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 1
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Celebraram-se umas bodas em Caná. Faltando o vinho, a Mãe de Jesus disse-lhe: "Não têm vinho." Disse sua Mãe aos que serviam: "Fazei tudo o que ele vos disser." Jesus converteu a água em vinho. Tal foi o primeiro milagre de Jesus; manifestou a sua glória, e os seus discípulos creram nele.', 'Jo 2, 1-11', 0
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 2
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 0
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Disse sua Mãe aos que serviam: "Fazei tudo o que ele vos disser."', 'Jo 2, 5', 1
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 2
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 1
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Depois que João foi preso, Jesus foi para a Galileia, pregando o Evangelho de Deus, e dizendo: "Completou-se o tempo, e está próximo o reino de Deus; fazei penitência, e crede no Evangelho."', 'Mc 1, 14-15', 0
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 3
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 0
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'O Espírito do Senhor está sobre mim, porque me ungiu para evangelizar os pobres; enviou-me a anunciar aos captivos a redenção, e aos cegos a vista.', 'Lc 4, 18-19', 1
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 3
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 1
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Jesus tomou consigo Pedro, Tiago e João, seu irmão, e os levou a um alto monte. Transfigurou-se diante deles; o seu rosto resplandeceu como o sol. Eis que lhes apareceram Moisés e Elias. Uma voz dos céus disse: "Este é o meu Filho amado, em quem me comprazo; ouvi-o."', 'Mt 17, 1-8', 0
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 4
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 0
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Levantando eles os olhos, não viram mais ninguém, senão só Jesus.', 'Mt 17, 8', 1
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 4
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 1
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Jesus tomou pão, o benzeu, e o partiu: "Tomai e comei, isto é o meu corpo." Tomando um cálice: "Bebei dele todos; porque isto é o meu sangue, o sangue da nova aliança, que será derramado por muitos para remissão dos pecados."', 'Mt 26, 26-29', 0
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 5
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 0
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Isto é o meu sangue, o sangue da nova aliança, que será derramado por muitos para remissão dos pecados.', 'Mt 26, 28', 1
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 5
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 1
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Foi Jesus com eles a Getsemani. Prostrou-se com o rosto em terra: "Meu Pai, se é possível, passe de mim este cálice! Todavia não se faça como eu quero, mas sim como tu queres." Disse aos discípulos: "Vigiai e orai, para que não entreis em tentação."', 'Mt 26, 36-46', 0
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 1
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 0
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Pai, se queres, afasta de mim este cálice! Contudo não se faça a minha vontade, mas a tua.', 'Lc 22, 42', 1
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 1
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 1
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Então Pilatos mandou flagelar a Jesus, e o entregou para ser crucificado.', 'Mt 27, 26', 0
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 2
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 0
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Ele foi traspassado por causa das nossas iniquidades, esmagado por causa dos nossos crimes; o castigo que nos traz a paz estava sobre ele, e pelas suas chagas fomos nós curados.', 'Is 53, 5', 1
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 2
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 1
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Os soldados conduziram Jesus ao pretório, puseram-lhe uma veste de escarlata, teceram uma coroa de espinhos, puseram-na na sua cabeça, e zombavam dele: "Salve, rei dos Judeus!"', 'Mt 27, 27-31', 0
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 3
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 0
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Os soldados teceram uma coroa de espinhos, puseram-na na sua cabeça, e vestiram-no com uma veste de púrpura. Aproximavam-se dele e diziam: "Salve, rei dos Judeus!"', 'Jo 19, 2-3', 1
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 3
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 1
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Quando o levavam, agarraram um certo Simão de Cirene, que vinha do campo, e puseram-lhe a cruz às costas, para a levar atrás de Jesus. Seguia-o uma grande multidão de povo e de mulheres, que batiam no peito e o lamentavam.', 'Lc 23, 26-32', 0
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 4
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 0
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Ele saiu, levando a sua cruz, para o lugar chamado Calvário, em hebraico Gólgota.', 'Jo 19, 17', 1
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 4
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 1
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Quando chegaram ao lugar chamado Calvário, crucificaram-no ali. Jesus dizia: "Pai, perdoa-lhes, porque não sabem o que fazem." Um dos malfeitores: "Lembra-te de mim, quando entrares no teu reino." Jesus respondeu: "Hoje estarás comigo no paraíso." Jesus clamou: "Pai, entrego-te o meu espírito."', 'Lc 23, 33-46', 0
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 5
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 0
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Vendo o centurião o que acontecera, glorificou a Deus, dizendo: "Realmente este homem era justo."', 'Lc 23, 47', 1
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 5
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 1
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'O anjo disse às mulheres: "Não temais; sei que buscais Jesus crucificado. Não está aqui, ressuscitou, como tinha dito. Ide depressa anunciar aos seus discípulos que ressuscitou." Jesus, encontrando-as, disse: "Salve." Elas se aproximaram, abraçaram-lhe os pés, e o adoraram.', 'Mt 28, 5-10', 0
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 1
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 0
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Disse-lhes Jesus: "Não me retenhas, porque ainda não subi para meu Pai; mas vai ter com meus irmãos, e dize-lhes que subo para meu Pai e vosso Pai."', 'Jo 20, 17', 1
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 1
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 1
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Tendo dito isto, foi elevado à vista deles, e uma nuvem o recebeu, ocultando-o aos seus olhos. Eis que dois varões vestidos de branco lhes disseram: "Este Jesus, que de entre vós subiu ao céu, virá do mesmo modo como o vistes subir ao céu."', 'At 1, 9-11', 0
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 2
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 0
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'O Senhor, depois de lhes ter falado, foi elevado ao céu, e sentou-se à direita de Deus.', 'Mc 16, 19', 1
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 2
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 1
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Quando se completaram os dias do Pentecostes, estavam todos juntos no mesmo lugar. De repente, veio do céu um estrondo; ficaram todos cheios do Espírito Santo e começaram a falar várias línguas, conforme o Espírito Santo lhes concedia.', 'At 2, 1-4', 0
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 3
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 0
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Todos os ouvimos falar nas nossas línguas das maravilhas de Deus.', 'At 2, 11', 1
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 3
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 1
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Apareceu no céu um grande sinal: uma mulher revestida do sol, tendo a lua debaixo dos pés, e uma coroa de doze estrelas na cabeça.', 'Ap 12, 1', 0
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 4
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 0
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Quando isto, que é corruptível, se revestir da incorruptibilidade, cumprir-se-á a palavra que está escrita: Absorvida foi a morte na vitória. Onde está, ó morte, a tua vitória?', '1 Co 15, 54-55', 1
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 4
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 1
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Apareceu no céu um grande sinal: uma mulher revestida do sol, com coroa de doze estrelas — figura da Mãe do Messias glorificada.', 'Ap 12, 1', 0
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 5
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 0
);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, 'Porque o Todo-poderoso fez em mim grandes coisas, e santo é o seu nome.', 'Lc 1, 48', 1
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 5
and not exists (
  select 1 from public.passages p
  where p.mystery_id = m.id and p.sort_order = 1
);

-- Anunciação images (replace set)
delete from public.images
where mystery_id = (select id from public.mysteries where type = 'joyful' and sort_order = 1);

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, 'https://images.metmuseum.org/CRDImages/ep/original/DT5656.jpg', 'A Anunciação', 'Philippe de Champaigne', 'Óleo sobre carvalho, ca. 1644. The Metropolitan Museum of Art, Nova York.', 0, 'contain', 2
from public.mysteries m where m.type = 'joyful' and m.sort_order = 1;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, 'https://images.metmuseum.org/CRDImages/ep/original/DP-22842-001.jpg', 'A Anunciação', 'Luca Giordano', 'The Metropolitan Museum of Art, Nova York (domínio público).', 1, 'contain', 2
from public.mysteries m where m.type = 'joyful' and m.sort_order = 1;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, 'https://images.metmuseum.org/CRDImages/ep/original/DP-974-001.jpg', 'A Anunciação', 'Peter Candid (Pietro Candido)', 'The Metropolitan Museum of Art, Nova York (domínio público).', 2, 'contain', 2
from public.mysteries m where m.type = 'joyful' and m.sort_order = 1;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, 'https://images.metmuseum.org/CRDImages/ep/original/DP240360.jpg', 'A Anunciação', 'Hans Memling', 'The Metropolitan Museum of Art, Nova York (domínio público).', 3, 'contain', 2
from public.mysteries m where m.type = 'joyful' and m.sort_order = 1;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, 'https://images.metmuseum.org/CRDImages/dp/original/DP874043.jpg', 'A Anunciação', 'Jean Audran', 'The Metropolitan Museum of Art, Nova York (domínio público).', 4, 'contain', 2
from public.mysteries m where m.type = 'joyful' and m.sort_order = 1;

-- Commentaries joyful-1
insert into public.commentaries (mystery_id, text, author, source, sort_order)
select m.id, 'Maria é a tabernáculo vivo onde o Verbo se fez carne. Contemplá-la na Anunciação é aprender a dizer sim à vontade de Deus com confiança filial.', 'São Bernardo de Claraval', 'Sermões sobre Maria', 0
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 1
and not exists (
  select 1 from public.commentaries c
  where c.mystery_id = m.id and c.sort_order = 0
);

insert into public.commentaries (mystery_id, text, author, source, sort_order)
select m.id, 'O anjo não traz mandamento, mas proposta de amor. Deus respeita a liberdade da Virgem e espera o seu fiat.', 'Bento XVI', 'Exortação Verbum Domini (2010)', 1
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 1
and not exists (
  select 1 from public.commentaries c
  where c.mystery_id = m.id and c.sort_order = 1
);

insert into public.deeper_references (mystery_id, title, description, url_or_reference, sort_order)
select m.id, 'Catechism of the Catholic Church — Anunciação', 'Números 484–486 sobre a encarnação e o papel de Maria.', 'https://www.vatican.va/archive/ENG0015/__P1A.HTM', 0
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 1
and not exists (
  select 1 from public.deeper_references d where d.mystery_id = m.id and d.sort_order = 0
);
