-- Pacotes curados dos 19 mistérios (a Anunciação já está na migration anterior).
delete from public.passages p
using public.mysteries m
where p.mystery_id = m.id
  and not (m.type = 'joyful' and m.sort_order = 1);

delete from public.images i
using public.mysteries m
where i.mystery_id = m.id
  and not (m.type = 'joyful' and m.sort_order = 1);

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $glorious_1_txt$O anjo disse às mulheres: «Não temais; sei que buscais Jesus crucificado. Não está aqui, ressuscitou, como tinha dito.» … Jesus, encontrando-as, disse: «Salve.» Elas se aproximaram, abraçaram-lhe os pés, e o adoraram.$glorious_1_txt$, $glorious_1_ref$Mt 28, 5-10$glorious_1_ref$, 0
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 1;

insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $glorious_1_c0a$Catecismo da Igreja Católica$glorious_1_c0a$, $glorious_1_c0s$CIC 652$glorious_1_c0s$, $glorious_1_c0t$A ressurreição de Cristo é o cumprimento das promessas do Antigo Testamento (578) e do próprio Jesus, durante a sua vida terrena (579). A expressão «segundo as Escrituras» (580) indica que a ressurreição de Cristo cumpriu essas predições.$glorious_1_c0t$),
  (1, $glorious_1_c1a$Catecismo da Igreja Católica$glorious_1_c1a$, $glorious_1_c1s$CIC 651$glorious_1_c1s$, $glorious_1_c1t$«Se Cristo não ressuscitou, então a nossa pregação é vã e também é vã a vossa fé» (1 Cor 15, 14). A ressurreição constitui, antes de mais, a confirmação de tudo quanto Cristo em pessoa fez e ensinou. Todas as verdades, mesmo as mais inacessíveis ao espírito humano, encontram a sua justificação se, ressuscitando, Cristo deu a prova definitiva, que tinha prometido, da sua autoridade divina.$glorious_1_c1t$),
  (2, $glorious_1_c2a$Catecismo da Igreja Católica$glorious_1_c2a$, $glorious_1_c2s$CIC 655$glorious_1_c2s$, $glorious_1_c2t$Finalmente, a ressurreição de Cristo – e o próprio Cristo Ressuscitado – é princípio e fonte da nossa ressurreição futura: «Cristo ressuscitou dos mortos como primícias dos que morreram [...]. Do mesmo modo que em Adão todos morreram, assim também em Cristo serão todos restituídos à vida» (1 Cor 15, 20-22). … «para que os vivos deixem de viver para si próprios, mas vivam para Aquele que morreu e ressuscitou por eles» (2 Cor 5, 15).$glorious_1_c2t$),
  (3, $glorious_1_c3a$São Tomás de Aquino$glorious_1_c3a$, $glorious_1_c3s$Suma Teológica, III, q. 53, a. 1 (texto abreviado)$glorious_1_c3s$, $glorious_1_c3t$Respondo que foi necessário que Cristo ressuscitasse por cinco motivos. Primeiro, para recomendação da justiça divina, que é a encarregada de exaltar a quem se humilha por Deus … Por isso, tendo Cristo se humilhado até à morte de cruz, por caridade e obediência a Deus, era necessário que fosse exaltado por Deus até à ressurreição gloriosa. … Terceiro, para levantar a nossa esperança. Pois, ao ver que Cristo ressuscita, sendo Ele a nossa cabeça, esperamos que também nós ressuscitaremos. … Quinto, para complemento da nossa salvação. … assim também foi glorificado ressuscitando para nos conduzir aos bens.$glorious_1_c3t$),
  (4, $glorious_1_c4a$São Tomás de Aquino$glorious_1_c4a$, $glorious_1_c4s$Suma Teológica, III, q. 56, a. 1 (texto abreviado)$glorious_1_c4s$, $glorious_1_c4t$Respondo que, como se escreve no II Metafís., o que é primeiro num género qualquer é causa de todos os que vêm depois. Ora, no género da nossa ressurreição, o primeiro foi a ressurreição de Cristo … Por isso é necessário que a ressurreição de Cristo seja causa da nossa ressurreição. E isto é o que diz o Apóstolo em 1 Cor 15, 20-21 … O Verbo de Deus dá primeiro a vida ao corpo que lhe está naturalmente unido, e por meio dele causa a ressurreição em todos os demais.$glorious_1_c4t$),
  (5, $glorious_1_c5a$Santo Agostinho$glorious_1_c5a$, $glorious_1_c5s$Contra Fausto, o Maniqueu, livro 14, cap. 4 (texto abreviado)$glorious_1_c5s$, $glorious_1_c5t$Negue Cristo maldito quem nega também que morreu. Mas quem confessa que morreu … Cristo assumiu sem culpa o nosso suplício, para dali desatar a nossa culpa e pôr fim também ao nosso suplício.$glorious_1_c5t$),
  (6, $glorious_1_c6a$Santo Agostinho$glorious_1_c6a$, $glorious_1_c6s$Sermão «Sobre a Ressurreição de Cristo, segundo São Marcos» (PL 38, 1104-1107) (texto abreviado)$glorious_1_c6s$, $glorious_1_c6t$… posto no sepulcro; mas no terceiro dia ressurgiu, acabando-se o sofrimento, morrendo a morte. Eia, tende lá os vossos olhos na ressurreição de Cristo; porque tanto quis o Pai engrandecer o seu Santo, que o ressuscitou dos mortos e lhe deu a honra de se assentar no Céu à sua direita.$glorious_1_c6t$),
  (7, $glorious_1_c7a$São João Paulo II$glorious_1_c7a$, $glorious_1_c7s$Rosarium Virginis Mariae, § 23 (texto abreviado)$glorious_1_c7s$, $glorious_1_c7t$A contemplação do rosto de Cristo não pode deter-se na imagem do crucificado. Ele é o Ressuscitado! … Contemplando o Ressuscitado, o cristão descobre novamente as razões da própria fé (cf. 1 Cor 15, 14), e revive não só a alegria daqueles a quem Cristo Se manifestou – os Apóstolos, a Madalena, os discípulos de Emaús –, mas também a alegria de Maria …$glorious_1_c7t$)
) as v(sort_order, author, source, text) on true
where m.type = 'glorious' and m.sort_order = 1;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $glorious_1_i0u$https://upload.wikimedia.org/wikipedia/commons/e/eb/Piero_della_Francesca_-_Resurrection_-_WGA17609.jpg$glorious_1_i0u$, $glorious_1_i0ti$The Resurrection of Jesus Christ$glorious_1_i0ti$, $glorious_1_i0ar$Piero della Francesca$glorious_1_i0ar$, $glorious_1_i0d$Museo Civico, Sansepolcro. Domínio público (PD-Art; reprodução fotográfica PD na Commons)$glorious_1_i0d$, 0, 'contain', 2
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 1;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $glorious_1_i1u$https://upload.wikimedia.org/wikipedia/commons/4/40/Matthias_Gr%C3%BCnewald_-_Resurrection.jpg$glorious_1_i1u$, $glorious_1_i1ti$Resurrection$glorious_1_i1ti$, $glorious_1_i1ar$Matthias Grünewald$glorious_1_i1ar$, $glorious_1_i1d$Musée d'Unterlinden, Colmar. Domínio público (PD-Art; Commons)$glorious_1_i1d$, 1, 'contain', 2
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 1;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $glorious_1_i2u$https://upload.wikimedia.org/wikipedia/commons/0/07/Rembrandt_van_Rijn_178.jpg$glorious_1_i2u$, $glorious_1_i2ti$The Resurrection$glorious_1_i2ti$, $glorious_1_i2ar$Rembrandt van Rijn$glorious_1_i2ar$, $glorious_1_i2d$Alte Pinakothek, Munique. Domínio público (PD-Art; Commons)$glorious_1_i2d$, 2, 'contain', 2
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 1;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $glorious_1_i3u$https://images.metmuseum.org/CRDImages/ep/original/DP-24050-001.jpg$glorious_1_i3u$, $glorious_1_i3ti$The Resurrection$glorious_1_i3ti$, $glorious_1_i3ar$Perugino (Pietro di Cristoforo Vannucci)$glorious_1_i3ar$, $glorious_1_i3d$The Metropolitan Museum of Art, New York (11.65). CC0 / domínio público (Met Open Access)$glorious_1_i3d$, 3, 'contain', 2
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 1;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $glorious_1_i4u$https://images.metmuseum.org/CRDImages/ep/original/DT8870.jpg$glorious_1_i4u$, $glorious_1_i4ti$The Resurrection$glorious_1_i4ti$, $glorious_1_i4ar$Spanish (Aragonese) Painter (anónimo, séc. XV)$glorious_1_i4ar$, $glorious_1_i4d$The Metropolitan Museum of Art, New York (1982.60.40). CC0 / domínio público (Met Open Access)$glorious_1_i4d$, 4, 'contain', 2
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 1;

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $glorious_2_txt$Tendo dito isto, foi elevado à vista deles, e uma nuvem o recebeu, ocultando-o aos seus olhos. … Eis que dois varões vestidos de branco lhes disseram: «Este Jesus, que de entre vós subiu ao céu, virá do mesmo modo como o vistes subir ao céu.»$glorious_2_txt$, $glorious_2_ref$At 1, 9-11$glorious_2_ref$, 0
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 2;

insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $glorious_2_c0a$Catecismo da Igreja Católica$glorious_2_c0a$, $glorious_2_c0s$CIC 659$glorious_2_c0s$, $glorious_2_c0t$«Então, o Senhor Jesus, depois de lhes ter falado, foi elevado ao céu e sentou-se à direita de Deus» (Mc 16, 19). … A última aparição de Jesus termina com a entrada irreversível da sua humanidade na glória divina, simbolizada pela nuvem (cf. At 1, 9) e pelo céu, onde a partir de então está sentado à direita de Deus.$glorious_2_c0t$),
  (1, $glorious_2_c1a$Catecismo da Igreja Católica$glorious_2_c1a$, $glorious_2_c1s$CIC 661$glorious_2_c1s$, $glorious_2_c1t$Esta última etapa continua intimamente unida à primeira, isto é, à descida do céu realizada na Encarnação. Só Aquele que «saiu do Pai» pode «voltar para o Pai»: Cristo (596). «Ninguém subiu ao céu senão Aquele que desceu do céu: o Filho do Homem» (Jo 3, 13) (597). … Só Cristo pôde abrir ao homem este acesso: «subindo aos céus, como nossa cabeça e primogénito, deu-nos a esperança de irmos um dia ao seu encontro, como membros do seu corpo» (599).$glorious_2_c1t$),
  (2, $glorious_2_c2a$Catecismo da Igreja Católica$glorious_2_c2a$, $glorious_2_c2s$CIC 662$glorious_2_c2s$, $glorious_2_c2t$«E Eu, uma vez elevado da terra, atrairei todos a Mim» (Jo 12, 32). … Nos céus, Cristo exerce permanentemente o seu sacerdócio, «sempre vivo para interceder a favor daqueles que, por seu intermédio, se aproximam de Deus» (Heb 7, 25).$glorious_2_c2t$),
  (3, $glorious_2_c3a$Catecismo da Igreja Católica$glorious_2_c3a$, $glorious_2_c3s$CIC 666$glorious_2_c3s$, $glorious_2_c3t$Jesus Cristo, cabeça da Igreja, precede-nos no Reino glorioso do Pai, para que nós, membros do seu corpo, vivamos na esperança de estarmos um dia eternamente com Ele.$glorious_2_c3t$),
  (4, $glorious_2_c4a$São Tomás de Aquino$glorious_2_c4a$, $glorious_2_c4s$Suma Teológica, III, q. 57, a. 1$glorious_2_c4s$, $glorious_2_c4t$Respondo que deve haver proporção entre o lugar e o que o ocupa. Cristo, pela ressurreição, deu começo a uma vida imortal e incorruptível. … Não foi conveniente que Cristo, depois da ressurreição, permanecesse na terra, mas que subisse aos céus. … A ascensão foi mais útil do que a presença corporal: primeiro, para o aumento da fé; segundo, para a elevação da esperança — «quando eu me haja ido e vos haja preparado o lugar, volverei de novo e vos tomarei comigo» (Jo 14, 3); terceiro, para erguer a caridade às coisas do céu (cf. Col 3, 1-2).$glorious_2_c4t$),
  (5, $glorious_2_c5a$Santo Agostinho$glorious_2_c5a$, $glorious_2_c5s$Sermão 261, In Ascensionem Domini, 1-2 (texto abreviado)$glorious_2_c5s$, $glorious_2_c5t$Hoje o nosso Senhor Jesus Cristo subiu ao céu; suba também connosco o nosso coração. … Cristo desceu só, mas já não subiu só: nós subimos também nele pela graça. … Ele, quando desceu até nós, não deixou o céu; tampouco nos deixou, ao voltar ao céu.$glorious_2_c5t$),
  (6, $glorious_2_c6a$São Leão Magno$glorious_2_c6a$, $glorious_2_c6s$Sermo 1 de Ascensione, 4$glorious_2_c6s$, $glorious_2_c6t$… Grande e inefável motivo de júbilo era elevar-se, na presença de uma santa multidão, a natureza humana acima da dignidade de todas as criaturas celestes … até ser assentada junto do eterno Pai. A ascensão de Cristo, portanto, é a nossa exaltação e para lá onde precedeu a glória da Cabeça, é atraída também a esperança do Corpo.$glorious_2_c6t$),
  (7, $glorious_2_c7a$São João Paulo II$glorious_2_c7a$, $glorious_2_c7s$Rosarium Virginis Mariae, § 23 (texto abreviado)$glorious_2_c7s$, $glorious_2_c7t$O Rosário convida o crente a ultrapassar as trevas da Paixão, para fixar o olhar na glória de Cristo com a Ressurreição e a Ascensão. … A esta glória, onde com a Ascensão Cristo se senta à direita do Pai, [Maria] será elevada com a Assunção, chegando, por especialíssimo privilégio, a antecipar o destino reservado a todos os justos com a ressurreição da carne. … Os mistérios gloriosos alimentam nos crentes a esperança da meta escatológica.$glorious_2_c7t$)
) as v(sort_order, author, source, text) on true
where m.type = 'glorious' and m.sort_order = 2;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $glorious_2_i0u$https://upload.wikimedia.org/wikipedia/commons/2/27/Giotto_-_Scrovegni_-_-38-_-_Ascension.jpg$glorious_2_i0u$, $glorious_2_i0ti$The Ascension (Scenes from the Life of Christ)$glorious_2_i0ti$, $glorious_2_i0ar$Giotto di Bondone$glorious_2_i0ar$, $glorious_2_i0d$Cappella degli Scrovegni / Civic Museums of Padua. Obra em domínio público; reprodução fotográfica PD (Commons)$glorious_2_i0d$, 0, 'contain', 2
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 2;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $glorious_2_i1u$https://images.metmuseum.org/CRDImages/ep/original/DP-17612-001.jpg$glorious_2_i1u$, $glorious_2_i1ti$The Ascension of Christ$glorious_2_i1ti$, $glorious_2_i1ar$Hans Süss von Kulmbach$glorious_2_i1ar$, $glorious_2_i1d$The Metropolitan Museum of Art, Nova Iorque (21.84). Met Open Access / domínio público (CC0 na reprodução Commons: https://commons.wikimedia.org/wiki/File:Hans_s%C3%BCss_von_kulmbach,_ascensione_di_cristo,_1513.JPG)$glorious_2_i1d$, 1, 'contain', 2
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 2;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $glorious_2_i2u$https://upload.wikimedia.org/wikipedia/commons/1/1f/Pietro_Perugino_-_The_Ascension_of_Christ_-_WGA17257.jpg$glorious_2_i2u$, $glorious_2_i2ti$L'Ascension du Christ$glorious_2_i2ti$, $glorious_2_i2ar$Pietro Perugino$glorious_2_i2ar$, $glorious_2_i2d$Musée des Beaux-Arts de Lyon. PD-Art (Perugino, †1523); «Reproduction libre de droit» (MBA Lyon)$glorious_2_i2d$, 2, 'contain', 2
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 2;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $glorious_2_i3u$https://upload.wikimedia.org/wikipedia/commons/7/75/Ascen%C3%A7%C3%A3o_de_Cristo_Charola_Tomar_2.jpg$glorious_2_i3u$, $glorious_2_i3ti$Ascension of Christ (Charola, Convento de Cristo)$glorious_2_i3ti$, $glorious_2_i3ar$Jorge Afonso$glorious_2_i3ar$, $glorious_2_i3d$Convento de Cristo, Tomar. Domínio público (séc. XVI; Commons)$glorious_2_i3d$, 3, 'contain', 2
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 2;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $glorious_2_i4u$https://upload.wikimedia.org/wikipedia/commons/4/4a/The_Ascension_of_Christ_MET_62.93.2.jpg$glorious_2_i4u$, $glorious_2_i4ti$The Ascension of Christ$glorious_2_i4ti$, $glorious_2_i4ar$Ventura Salimbeni (atrib.)$glorious_2_i4ar$, $glorious_2_i4d$The Metropolitan Museum of Art (62.93.2). Met Open Access (CC0)$glorious_2_i4d$, 4, 'contain', 2
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 2;

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $glorious_3_txt$Quando se completaram os dias do Pentecostes, estavam todos juntos no mesmo lugar. De repente, veio do céu um estrondo; ficaram todos cheios do Espírito Santo e começaram a falar várias línguas, conforme o Espírito Santo lhes concedia.$glorious_3_txt$, $glorious_3_ref$At 2, 1-4$glorious_3_ref$, 0
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 3;

insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $glorious_3_c0a$Catecismo da Igreja Católica$glorious_3_c0a$, $glorious_3_c0s$CIC 731$glorious_3_c0s$, $glorious_3_c0t$No dia de Pentecostes (no termo das sete semanas pascais), a Páscoa de Cristo completou-se com a efusão do Espírito Santo que Se manifestou, Se deu e Se comunicou como Pessoa divina: da sua plenitude, Cristo Senhor derrama em profusão o Espírito (109).$glorious_3_c0t$),
  (1, $glorious_3_c1a$Catecismo da Igreja Católica$glorious_3_c1a$, $glorious_3_c1s$CIC 767$glorious_3_c1s$, $glorious_3_c1t$«Consumada a obra que o Pai confiou ao Filho para cumprir na terra, no dia de Pentecostes foi enviado o Espírito Santo para que santificasse continuamente a Igreja» (180). Foi então que «a Igreja foi publicamente manifestada diante duma grande multidão» e «teve o seu início a difusão do Evangelho entre os gentios, por meio da pregação» (181). Porque é «convocação» de todos os homens à salvação, a Igreja é, por sua própria natureza, missionária, enviada por Cristo a todas as nações, para de todas fazer discípulos (182).$glorious_3_c1t$),
  (2, $glorious_3_c2a$Catecismo da Igreja Católica$glorious_3_c2a$, $glorious_3_c2s$CIC 732$glorious_3_c2s$, $glorious_3_c2t$Neste dia, revelou-Se plenamente a Santíssima Trindade. A partir deste dia, o Reino anunciado por Cristo abre-se aos que n'Ele crêem. … Pela sua vinda, que não cessará jamais, o Espírito Santo faz entrar no mundo nos «últimos tempos», no tempo da Igreja, no Reino já herdado mas ainda não consumado (texto abreviado).$glorious_3_c2t$),
  (3, $glorious_3_c3a$Catecismo da Igreja Católica$glorious_3_c3a$, $glorious_3_c3s$CIC 736$glorious_3_c3s$, $glorious_3_c3t$É graças a esta força do Espírito que os filhos de Deus podem dar fruto. Aquele que nos enxertou na verdadeira Vide far-nos-á dar «os frutos do Espírito: caridade, alegria, paz, paciência, benignidade, bondade, fidelidade, mansidão, auto-domínio» (Gl 5, 22-23).$glorious_3_c3t$),
  (4, $glorious_3_c4a$Catecismo da Igreja Católica$glorious_3_c4a$, $glorious_3_c4s$CIC 737$glorious_3_c4s$, $glorious_3_c4t$A missão de Cristo e do Espírito Santo completa-se na Igreja, corpo de Cristo e templo do Espírito Santo. … Torna-lhes presente o mistério de Cristo, principalmente na Eucaristia, com o fim de os reconciliar, de os pôr em comunhão com Deus, para os fazer dar «muito fruto» (116) (texto abreviado).$glorious_3_c4t$),
  (5, $glorious_3_c5a$São Tomás de Aquino$glorious_3_c5a$, $glorious_3_c5s$Suma Teológica, I, q. 37, a. 1$glorious_3_c5s$, $glorious_3_c5t$O nome de amor, em Deus, pode ser tomado em sentido essencial e pessoalmente. Pessoalmente, é o nome próprio do Espírito Santo, como o Verbo é o do Filho. … Quando pois dizemos que o Espírito Santo é o amor do Pai para com o Filho … exprimimos somente a relação do amor com a coisa amada. … O Espírito Santo se chama nexo entre o Pai e o Filho, enquanto amor … é necessário que de ambos proceda o Espírito Santo, que é o mútuo Amor (texto abreviado).$glorious_3_c5t$),
  (6, $glorious_3_c6a$São Tomás de Aquino$glorious_3_c6a$, $glorious_3_c6s$Suma Teológica, I, q. 43, a. 7$glorious_3_c6s$, $glorious_3_c6t$A este, enquanto procede como Amor, compete ser o dom da santificação … Por isso foi necessária a missão visível do Espírito Santo a Cristo, aos Apóstolos e aos outros primitivos santos, nos quais, de algum modo, estava fundada a Igreja. … Sob a figura de línguas de fogo ainda, para significar o dever de ensinarem; por isso, foi dito (At 2, 4) que começaram a falar em várias línguas (texto abreviado).$glorious_3_c6t$),
  (7, $glorious_3_c7a$São João Paulo II$glorious_3_c7a$, $glorious_3_c7s$Rosarium Virginis Mariae, § 23$glorious_3_c7s$, $glorious_3_c7t$No terceiro mistério glorioso, o Pentecostes, que mostra o rosto da Igreja como família reunida com Maria, fortalecida pela poderosa efusão do Espírito, pronta para a missão evangelizadora. … O Pentecostes constitui o grande «ícone» da nova existência em Cristo (texto abreviado).$glorious_3_c7t$),
  (8, $glorious_3_c8a$Catecismo da Igreja Católica$glorious_3_c8a$, $glorious_3_c8s$CIC 965$glorious_3_c8s$, $glorious_3_c8t$Depois da Ascensão do seu Filho, Maria «assistiu com suas orações aos começos da Igreja» (529). E, reunida com os Apóstolos e algumas mulheres, vemos «Maria implorando com as suas orações o dom daquele Espírito, que já na Anunciação a cobrira com a Sua sombra» (530).$glorious_3_c8t$)
) as v(sort_order, author, source, text) on true
where m.type = 'glorious' and m.sort_order = 3;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $glorious_3_i0u$https://upload.wikimedia.org/wikipedia/commons/1/19/El_Greco_006.jpg$glorious_3_i0u$, $glorious_3_i0ti$The Pentecost$glorious_3_i0ti$, $glorious_3_i0ar$El Greco (Domenikos Theotokopoulos)$glorious_3_i0ar$, $glorious_3_i0d$Museo Nacional del Prado, Madrid (P00828). Obra em domínio público; reprodução fotográfica PD (Commons)$glorious_3_i0d$, 0, 'contain', 2
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 3;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $glorious_3_i1u$https://upload.wikimedia.org/wikipedia/commons/5/5e/Santa_Maria_della_Salute_(Venice)_-_Discesa_dello_Spirito_Santo_di_Tiziano_(1555).jpg$glorious_3_i1u$, $glorious_3_i1ti$The Descent of the Holy Spirit$glorious_3_i1ti$, $glorious_3_i1ar$Titian (Tiziano Vecellio)$glorious_3_i1ar$, $glorious_3_i1d$Basilica di Santa Maria della Salute, Venice. PD-Art / domínio público (Commons)$glorious_3_i1d$, 1, 'contain', 2
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 3;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $glorious_3_i2u$https://upload.wikimedia.org/wikipedia/commons/3/3f/Jean_II_Restout_-_Pentecost_-_WGA19318.jpg$glorious_3_i2u$, $glorious_3_i2ti$Pentecost (La Pentecôte)$glorious_3_i2ti$, $glorious_3_i2ar$Jean II Restout$glorious_3_i2ar$, $glorious_3_i2d$Musée du Louvre, Paris (INV 20303). PD-Art (Commons)$glorious_3_i2d$, 2, 'contain', 2
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 3;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $glorious_3_i3u$https://upload.wikimedia.org/wikipedia/commons/1/15/The_Pentecost%2C_from_Life_of_the_Virgin_and_Christ_MET_DP833940.jpg$glorious_3_i3u$, $glorious_3_i3ti$The Pentecost, from «Life of the Virgin and Christ»$glorious_3_i3ti$, $glorious_3_i3ar$Francesco Rosselli$glorious_3_i3ar$, $glorious_3_i3d$The Metropolitan Museum of Art, New York (17.60.4). CC0 (Met Open Access, domínio público)$glorious_3_i3d$, 3, 'contain', 2
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 3;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $glorious_3_i4u$https://upload.wikimedia.org/wikipedia/commons/2/21/Duccio_di_Buoninsegna_-_Pentecost_-_WGA06739.jpg$glorious_3_i4u$, $glorious_3_i4ti$Pentecost (panel from the Maestà)$glorious_3_i4ti$, $glorious_3_i4ar$Duccio di Buoninsegna$glorious_3_i4ar$, $glorious_3_i4d$Museo dell'Opera del Duomo, Siena. PD-Art (Commons / Web Gallery of Art)$glorious_3_i4d$, 4, 'contain', 2
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 3;

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $glorious_4_txt$Apareceu no céu um grande sinal: uma mulher revestida do sol, tendo a lua debaixo dos pés, e uma coroa de doze estrelas na cabeça.$glorious_4_txt$, $glorious_4_ref$Ap 12, 1$glorious_4_ref$, 0
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 4;

insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $glorious_4_c0a$Catecismo da Igreja Católica$glorious_4_c0a$, $glorious_4_c0s$CIC 966$glorious_4_c0s$, $glorious_4_c0t$«Finalmente, a Virgem Imaculada, preservada imune de toda a mancha da culpa original, terminado o curso da vida terrena, foi elevada ao céu em corpo e alma e exaltada pelo Senhor como rainha, para assim se conformar mais plenamente com o seu Filho, Senhor dos senhores e vencedor do pecado e da morte». A Assunção da santíssima Virgem é uma singular participação na ressurreição do seu Filho e uma antecipação da ressurreição dos outros cristãos: «No teu parto guardaste a virgindade e na tua dormição não abandonaste a mundo, ó Mãe de Deus…» (texto abreviado).$glorious_4_c0t$),
  (1, $glorious_4_c1a$Catecismo da Igreja Católica$glorious_4_c1a$, $glorious_4_c1s$CIC 974$glorious_4_c1s$, $glorious_4_c1t$«Terminado o curso da sua vida terrena, a santíssima Virgem Maria foi elevada em corpo e alma para a glória do céu, onde participa já na glória da ressurreição do seu Filho, antecipando a ressurreição de todos os membros do Seu Corpo».$glorious_4_c1t$),
  (2, $glorious_4_c2a$Pio XII$glorious_4_c2a$, $glorious_4_c2s$*Munificentissimus Deus*, §44 (Definição solene do dogma)$glorious_4_c2s$, $glorious_4_c2t$«… pronunciamos, declaramos e definimos ser dogma divinamente revelado que: a imaculada Mãe de Deus, a sempre virgem Maria, terminado o curso da vida terrestre, foi assunta em corpo e alma à glória celestial».$glorious_4_c2t$),
  (3, $glorious_4_c3a$Pio XII$glorious_4_c3a$, $glorious_4_c3s$*Munificentissimus Deus*, §40$glorious_4_c3s$, $glorious_4_c3t$… alcançou por fim, como suprema coroa dos seus privilégios, que fosse preservada da corrupção do sepulcro, e que, à semelhança do seu divino Filho, vencida a morte, fosse levada em corpo e alma ao céu, onde refulge como Rainha à direita do seu Filho, Rei imortal dos séculos (cf. 1Tm 1,17).$glorious_4_c3t$),
  (4, $glorious_4_c4a$São João Paulo II$glorious_4_c4a$, $glorious_4_c4s$*Rosarium Virginis Mariae*, §23 (texto abreviado)$glorious_4_c4s$, $glorious_4_c4t$… A esta glória, onde com a Ascensão Cristo Se senta à direita do Pai, Ela mesma será elevada com a Assunção, chegando, por especialíssimo privilégio, a antecipar o destino reservado a todos os justos com a ressurreição da carne. Enfim, coroada de glória — como aparece no último mistério glorioso — Ela resplandece como Rainha dos Anjos e dos Santos…$glorious_4_c4t$),
  (5, $glorious_4_c5a$São Bernardo de Claraval$glorious_4_c5a$, $glorious_4_c5s$1.º Sermão para a Assunção (trad. Pain de Cîteaux 32, p. 63 rev.; texto abreviado)$glorious_4_c5s$, $glorious_4_c5t$Hoje a Virgem Maria sobe, gloriosa, ao céu. … Sim, Ela precedeu-nos, a nossa Rainha, precedeu-nos e foi recebida com tanta glória que nós, seus humildes servos, podemos seguir a nossa Rainha com toda confiança gritando … «Arrasta-me atrás de ti. Corramos ao odor dos teus perfumes!» (Ct 1, 3-4) Viajantes sobre a terra, enviamos à frente a nossa advogada … a Mãe de misericórdia, para defender eficazmente a nossa salvação.$glorious_4_c5t$),
  (6, $glorious_4_c6a$São João Damasceno$glorious_4_c6a$, $glorious_4_c6s$1.ª Homilia sobre a Dormição, 11-14 (texto abreviado)$glorious_4_c6s$, $glorious_4_c6t$… O teu corpo puríssimo, sem mácula, não foi abandonado à terra, antes foste elevada até à morada do Reino dos Céus, tu, a Rainha, a Soberana, a Senhora, a Mãe de Deus … Lança os teus olhos sobre nós, ó Rainha, Mãe do nosso bom Soberano; guia o nosso caminho até ao porto sem tempestades do desejo bom de Deus.$glorious_4_c6t$),
  (7, $glorious_4_c7a$Catecismo da Igreja Católica$glorious_4_c7a$, $glorious_4_c7s$CIC 975$glorious_4_c7s$, $glorious_4_c7t$«Nós cremos que a santíssima Mãe de Deus, a nova Eva, a Mãe da Igreja, continua a desempenhar no céu o seu papel maternal para com os membros de Cristo».$glorious_4_c7t$)
) as v(sort_order, author, source, text) on true
where m.type = 'glorious' and m.sort_order = 4;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $glorious_4_i0u$https://images.metmuseum.org/CRDImages/es/original/DP-45819-001.jpg$glorious_4_i0u$, $glorious_4_i0ti$The Assumption of the Virgin (The Marquand Altarpiece)$glorious_4_i0ti$, $glorious_4_i0ar$Andrea della Robbia (e oficina)$glorious_4_i0ar$, $glorious_4_i0d$The Metropolitan Museum of Art, Nova Iorque. Domínio público / Met Open Access (CC0)$glorious_4_i0d$, 0, 'contain', 2
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 4;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $glorious_4_i1u$https://images.metmuseum.org/CRDImages/ep/original/DT11757.jpg$glorious_4_i1u$, $glorious_4_i1ti$The Assumption of the Virgin$glorious_4_i1ti$, $glorious_4_i1ar$Bergognone (Ambrogio di Stefano da Fossano)$glorious_4_i1ar$, $glorious_4_i1d$The Metropolitan Museum of Art, Nova Iorque. Domínio público / Met Open Access (CC0)$glorious_4_i1d$, 1, 'contain', 2
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 4;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $glorious_4_i2u$https://images.metmuseum.org/CRDImages/rl/original/DP-13487-001.jpg$glorious_4_i2u$, $glorious_4_i2ti$The Assumption of the Virgin$glorious_4_i2ti$, $glorious_4_i2ar$Bernardo Daddi (possivelmente com oficina)$glorious_4_i2ar$, $glorious_4_i2d$The Metropolitan Museum of Art (Robert Lehman Collection). Domínio público / Met Open Access (CC0)$glorious_4_i2d$, 2, 'contain', 2
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 4;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $glorious_4_i3u$https://images.metmuseum.org/CRDImages/dp/original/DP816293.jpg$glorious_4_i3u$, $glorious_4_i3ti$The Assumption and Coronation of the Virgin (da série *The Life of the Virgin*)$glorious_4_i3ti$, $glorious_4_i3ar$Albrecht Dürer$glorious_4_i3ar$, $glorious_4_i3d$The Metropolitan Museum of Art, Nova Iorque. Domínio público / Met Open Access (CC0)$glorious_4_i3d$, 3, 'contain', 2
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 4;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $glorious_4_i4u$https://upload.wikimedia.org/wikipedia/commons/9/9e/Tizian_041.jpg$glorious_4_i4u$, $glorious_4_i4ti$Assumption of the Virgin$glorious_4_i4ti$, $glorious_4_i4ar$Titian (Tiziano Vecellio)$glorious_4_i4ar$, $glorious_4_i4d$Basilica di Santa Maria Gloriosa dei Frari, Veneza. Obra em domínio público; reprodução PD-Art (Commons)$glorious_4_i4d$, 4, 'contain', 2
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 4;

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $glorious_5_txt$Apareceu no céu um grande sinal: uma mulher revestida do sol, com coroa de doze estrelas — figura da Mãe do Messias glorificada.$glorious_5_txt$, $glorious_5_ref$Ap 12, 1$glorious_5_ref$, 0
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 5;

insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $glorious_5_c0a$Catecismo da Igreja Católica$glorious_5_c0a$, $glorious_5_c0s$CIC 966$glorious_5_c0s$, $glorious_5_c0t$«Finalmente, a Virgem Imaculada, preservada imune de toda a mancha da culpa original, terminado o curso da vida terrena, foi elevada ao céu em corpo e alma e exaltada pelo Senhor como rainha, para assim se conformar mais plenamente com o seu Filho, Senhor dos senhores e vencedor do pecado e da morte.»$glorious_5_c0t$),
  (1, $glorious_5_c1a$Catecismo da Igreja Católica$glorious_5_c1a$, $glorious_5_c1s$CIC 972$glorious_5_c1s$, $glorious_5_c1t$«Assim como, glorificada já em corpo e alma, a Mãe de Jesus é imagem e início da igreja que se há-de consumar no século futuro, assim também, brilha na terra como sinal de esperança segura e de consolação, para o povo de Deus ainda peregrino.»$glorious_5_c1t$),
  (2, $glorious_5_c2a$Catecismo da Igreja Católica$glorious_5_c2a$, $glorious_5_c2s$CIC 969$glorious_5_c2s$, $glorious_5_c2t$«Esta maternidade de Maria na economia da graça perdura sem interrupção … depois de elevada ao céu, não abandonou esta missão salvadora, mas, com a sua multiforme intercessão, continua a alcançar-nos os dons da salvação eterna … Por isso, a Virgem é invocada na Igreja com os títulos de advogada, auxiliadora, socorro e medianeira.»$glorious_5_c2t$),
  (3, $glorious_5_c3a$Catecismo da Igreja Católica$glorious_5_c3a$, $glorious_5_c3s$CIC 2677$glorious_5_c3s$, $glorious_5_c3t$«Santa Maria, Mãe de Deus, rogai por nós …» … «Pedindo a Maria que rogue por nós, reconhecemo-nos pobres pecadores e recorremos à «Mãe de misericórdia», à «Santíssima». Confiamo-nos a Ela «agora», no hoje das nossas vidas.»$glorious_5_c3t$),
  (4, $glorious_5_c4a$São João Paulo II$glorious_5_c4a$, $glorious_5_c4s$Rosarium Virginis Mariae, § 23 (texto abreviado)$glorious_5_c4s$, $glorious_5_c4t$«Enfim, coroada de glória – como aparece no último mistério glorioso – Ela resplandece como Rainha dos Anjos e dos Santos, antecipação e ponto culminante da condição escatológica da Igreja.»$glorious_5_c4t$),
  (5, $glorious_5_c5a$Pio XII$glorious_5_c5a$, $glorious_5_c5s$Encíclica Ad caeli reginam, § 31 (texto abreviado)$glorious_5_c5s$, $glorious_5_c5t$«Finalmente a arte cristã … desde o concílio de Éfeso … chegando até a figurar o divino Redentor no ato de cingir com brilhante coroa a cabeça da própria Mãe.» … «no santo rosário … do quinto mistério glorioso, o reino de Maria, que abraça o céu e a terra.»$glorious_5_c5t$),
  (6, $glorious_5_c6a$Pio XII$glorious_5_c6a$, $glorious_5_c6s$Encíclica Ad caeli reginam, § 40 (texto abreviado)$glorious_5_c6s$, $glorious_5_c6t$«Com ânimo verdadeiramente materno para conosco … ela, que pelo Senhor foi constituída rainha do céu e da terra, toma cuidado de todo o gênero humano … com as suas súplicas maternas impetra com eficácia, obtém quanto pede, nem pode deixar de ser ouvida.»$glorious_5_c6t$),
  (7, $glorious_5_c7a$São Bernardo de Claraval$glorious_5_c7a$, $glorious_5_c7s$In laudibus Virginis Matris (Super Missus est), homilia II, 17 (texto abreviado)$glorious_5_c7s$, $glorious_5_c7t$«Ó tu, que na instabilidade deste mundo sentes que és mais sacudido pelas tormentas … não desvies o olhar do fulgor desta estrela … olha para a estrela, invoca Maria.» … «Nos perigos, nas angústias e nas incertezas, pensa em Maria, invoca Maria.» … «Seguindo-a, não te desviarás; invocando-a, não desesperarás … se te é propícia chegarás ao fim.»$glorious_5_c7t$)
) as v(sort_order, author, source, text) on true
where m.type = 'glorious' and m.sort_order = 5;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $glorious_5_i0u$https://upload.wikimedia.org/wikipedia/commons/2/21/Le_Couronnement_de_la_Vierge_-_Fra_Angelico_-_Mus%C3%A9e_du_Louvre_Peintures_INV_314_%3B_MR_220.jpg$glorious_5_i0u$, $glorious_5_i0ti$Le Couronnement de la Vierge (Coroação da Virgem)$glorious_5_i0ti$, $glorious_5_i0ar$Fra Angelico$glorious_5_i0ar$, $glorious_5_i0d$Musée du Louvre, Paris. Domínio público (PD-Art; autor f. 1455)$glorious_5_i0d$, 0, 'contain', 2
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 5;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $glorious_5_i1u$https://upload.wikimedia.org/wikipedia/commons/8/80/Filippo_Lippi_-_Incoronazione_della_Vergine_-_Google_Art_Project.jpg$glorious_5_i1u$, $glorious_5_i1ti$Incoronazione della Vergine (Coroação da Virgem)$glorious_5_i1ti$, $glorious_5_i1ar$Filippo Lippi$glorious_5_i1ar$, $glorious_5_i1d$Galleria degli Uffizi, Florença. Domínio público (PD-Art; Lippi f. 1469)$glorious_5_i1d$, 1, 'contain', 2
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 5;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $glorious_5_i2u$https://images.metmuseum.org/CRDImages/rl/original/DT708.jpg$glorious_5_i2u$, $glorious_5_i2ti$Coronation of the Virgin$glorious_5_i2ti$, $glorious_5_i2ar$Giovanni di Paolo (Giovanni di Paolo di Grazia)$glorious_5_i2ar$, $glorious_5_i2d$The Metropolitan Museum of Art, Nova Iorque. CC0 / Open Access (Met)$glorious_5_i2d$, 2, 'contain', 2
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 5;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $glorious_5_i3u$https://upload.wikimedia.org/wikipedia/commons/b/b5/Diego_Vel%C3%A1zquez_-_Coronation_of_the_Virgin_-_Prado.jpg$glorious_5_i3u$, $glorious_5_i3ti$Coronation of the Virgin$glorious_5_i3ti$, $glorious_5_i3ar$Diego Velázquez$glorious_5_i3ar$, $glorious_5_i3d$Museo del Prado, Madrid. Domínio público (PD-Art; Velázquez f. 1660)$glorious_5_i3d$, 3, 'contain', 2
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 5;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $glorious_5_i4u$https://upload.wikimedia.org/wikipedia/commons/7/7e/Lorenzo_Monaco_-_Incoronazione_della_Vergine_-_Google_Art_Project.jpg$glorious_5_i4u$, $glorious_5_i4ti$Incoronazione della Vergine (Coroação da Virgem)$glorious_5_i4ti$, $glorious_5_i4ar$Lorenzo Monaco$glorious_5_i4ar$, $glorious_5_i4d$Galleria degli Uffizi, Florença. Domínio público (PD-Art; Monaco f. c. 1425)$glorious_5_i4d$, 4, 'contain', 2
from public.mysteries m
where m.type = 'glorious' and m.sort_order = 5;

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $joyful_2_txt$Naqueles dias, levantando-se Maria, foi com pressa às montanhas, a uma cidade de Judá. Entrou em casa de Zacarias, e saudou Isabel. Aconteceu que, apenas Isabel ouviu a saudação de Maria, o menino saltou no seu ventre, e Isabel ficou cheia do Espírito Santo; e exclamou em alta voz: "Bendita és tu entre todas as mulheres, e bendito é o fruto do teu ventre. Bem-aventurada a que acreditou, porque se hão-de cumprir as coisas que da parte do Senhor foram ditas."$joyful_2_txt$, $joyful_2_ref$Lc 1, 39-45$joyful_2_ref$, 0
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 2;

insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $joyful_2_c0a$Catecismo da Igreja Católica$joyful_2_c0a$, $joyful_2_c0s$CIC 717$joyful_2_c0s$, $joyful_2_c0t$«Apareceu um homem, enviado por Deus, que tinha o nome de João» (Jo 1, 6). João é «cheio do Espírito Santo já desde o seio materno» (Lc 1, 15) (81), pelo próprio Cristo que a Virgem acabava de conceber por obra e graça do Espírito Santo. A « visitação» de Maria a Isabel tornou-se, assim, «visita de Deus ao seu povo» (82).$joyful_2_c0t$),
  (1, $joyful_2_c1a$Santo Ambrósio$joyful_2_c1a$, $joyful_2_c1s$Expositio Evangelii secundum Lucam, livro II, 19 (texto abreviado). Tradução do Ofício das Leituras de 21 de dezembro, Liturgia das Horas (CNBB), conferida com o latim. O número começa por «Morale est omnibus…», aqui omitido.$joyful_2_c1s$, $joyful_2_c1t$… O Anjo anunciara à Virgem Maria coisas misteriosas. Para fortalecer sua fé com um exemplo, anunciou-lhe a maternidade de uma mulher idosa e estéril, como prova de que é possível a Deus tudo que ele quer. Logo ao ouvir a notícia, Maria dirigiu-se às montanhas, não por falta de fé na profecia ou falta de confiança na mensagem, nem por duvidar do exemplo dado, mas guiada pela felicidade de ver cumprida a promessa, levada pela vontade de prestar um serviço, movida pelo impulso interior de sua alegria. Já plena de Deus, aonde ir depressa senão às alturas? A graça do Espírito Santo ignora a lentidão.$joyful_2_c1t$),
  (2, $joyful_2_c2a$Santo Ambrósio$joyful_2_c2a$, $joyful_2_c2s$Expositio Evangelii secundum Lucam, livro II, 23 (texto abreviado). Mesma tradução do Ofício das Leituras, 21 de dezembro (CNBB), conferida com o latim de II, 23 («Vocem prior Elizabeth audivit, sed Ioannes prior gratiam sensit»).$joyful_2_c2s$, $joyful_2_c2t$Notai como cada palavra está escolhida com perfeita precisão e propriedade: Isabel foi a primeira a ouvir a voz, mas João foi o primeiro a pressentir a graça; aquela ouviu segundo a ordem da natureza, este exultou em virtude do mistério. Ela percebeu a chegada de Maria, ele, a do Senhor; a mulher ouviu a voz da mulher, o menino sentiu a presença do Filho; elas proclamam a graça de Deus, eles realizam-na interiormente, iniciando no seio de suas mães o mistério de misericórdia; e, por um duplo milagre, as mães profetizam sob a inspiração de seus filhos. A criança exultou, a mãe ficou cheia do Espírito Santo. A mãe não se antecipou ao filho; mas estando o filho cheio do Espírito Santo, comunicou-o a sua mãe. …$joyful_2_c2t$),
  (3, $joyful_2_c3a$Catecismo da Igreja Católica$joyful_2_c3a$, $joyful_2_c3s$CIC 2676 (texto abreviado). Omitidas as secções da saudação do anjo («Ave, Maria» e «Cheia de graça»); fica a saudação de Isabel.$joyful_2_c3s$, $joyful_2_c3t$… «Bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus». Depois da saudação do anjo, fazemos nossa a de Isabel. «Cheia [...] do Espírito Santo» (Lc 1, 41), Isabel é a primeira, na longa sequência das gerações, a declarar Maria bem-aventurada (26): «Feliz d'Aquela que acreditou...» (Lc 1, 45); Maria é «bendita entre as mulheres», porque acreditou no cumprimento da Palavra do Senhor. Abraão, pela sua fé, tornou-se uma bênção «para todas as nações da terra» (Gn 12, 3). Pela sua fé, Maria tornou-se a mãe dos crentes, graças a quem todas as nações da terra recebem Aquele que é a própria bênção de Deus: Jesus, «fruto bendito do vosso ventre».$joyful_2_c3t$),
  (4, $joyful_2_c4a$Catecismo da Igreja Católica$joyful_2_c4a$, $joyful_2_c4s$CIC 2677 (texto abreviado). O parágrafo continua com o «rogai por nós» e a hora da morte, aqui omitidos.$joyful_2_c4s$, $joyful_2_c4t$«Santa Maria, Mãe de Deus, rogai por nós...». Com Isabel, também nós ficamos maravilhados: «E de onde me é dado que venha ter comigo a Mãe do meu Senhor?» (Lc 1, 43). …$joyful_2_c4t$),
  (5, $joyful_2_c5a$São Bernardo de Claraval$joyful_2_c5a$, $joyful_2_c5s$Sermo in dominica infra octavam Assumptionis B. V. Mariae (De duodecim praerogativis B. V. Mariae), n. 12 (texto abreviado). Tradução a partir do latim consultado em duas transcrições (colunas cerca de 436); não é o Lírio Católico nem uma edição portuguesa. As cópias online deturpam «dicta» («aicta» / «acta»); aqui segue-se o texto de Lc 1, 45 que Bernardo cita.$joyful_2_c5s$, $joyful_2_c5t$… Chegou-se então a Isabel, e logo a glória singular da Virgem lhe foi revelada pelo Espírito. Admirava-se também da pessoa que vinha, dizendo: Donde me vem isto, que a Mãe do meu Senhor venha a mim? Louvava também a voz da que saudava, acrescentando: Quando a voz da tua saudação chegou aos meus ouvidos, o menino exultou de alegria no meu ventre; e chamava bem-aventurada a fé da que acreditou: Bem-aventurada, dizia, a que acreditaste, porque se hão de cumprir em ti as coisas que te foram ditas da parte do Senhor. Grandes louvores, sem dúvida; mas a humildade devota não sofreu reter nada para si, e antes devolveu tudo àquele cujos benefícios nela eram louvados. Tu, diz ela, engrandeces a mãe do Senhor; mas a minha alma magnifica o Senhor. …$joyful_2_c5t$),
  (6, $joyful_2_c6a$São Tomás de Aquino$joyful_2_c6a$, $joyful_2_c6s$Suma Teológica, III, q. 27, a. 6, corpo do artigo (primeiro parágrafo do «Respondeo», sobre o salto de João; não é o artigo inteiro). Latim do Corpus Thomisticum. Tradução a partir desse latim, confrontada com a inglesa dos Dominican Fathers (New Advent) e com a portuguesa de permanencia.org.br; não é a do Lírio Católico. Permanência traduz «a maioribus» por «pelos pais» e traz o lapso «saltor»; aqui segue-se o latim: os maiores, e «exsultatio» (o salto / a exultação).$joyful_2_c6s$, $joyful_2_c6t$Agostinho, na carta a Dardano, parece falar com dúvida da santificação deles no ventre. A exultação de João no ventre, como ele diz, pôde ser o sinal de uma realidade tão grande, a saber, que a mulher era Mãe de Deus, a dar a conhecer aos maiores, sem que o menino a conhecesse. Por isso no Evangelho não se diz que o menino acreditou no ventre, mas que exultou. Vemos, porém, que a exultação não é só das crianças, mas também dos animais. Esta, contudo, foi insólita, porque foi no ventre. E assim, como costumam fazer-se os milagres, fez-se por ação divina no menino, não humanamente pelo menino. E ainda que neste menino o uso da razão e da vontade se tenha antecipado a tal ponto que, já nas entranhas da mãe, pudesse conhecer, crer e consentir, o que nos outros meninos se espera da idade, também isto julgo dever contar-se entre os milagres do poder divino.$joyful_2_c6t$),
  (7, $joyful_2_c7a$São João Paulo II$joyful_2_c7a$, $joyful_2_c7s$Carta encíclica Redemptoris Mater, n. 12 (texto abreviado). Cita-se o segundo parágrafo do número, por inteiro; o primeiro parágrafo do n. 12, sobre o caminho até Ain-Karim, fica de fora.$joyful_2_c7s$, $joyful_2_c7t$… Maria dirige-se, pois, impelida pela caridade, a casa da sua parente. Quando aí entrou, Isabel, ao responder à sua saudação, tendo sentido o menino estremecer de alegria no próprio seio, «cheia do Espírito Santo», saúda por sua vez Maria em alta voz: «Bendita és tu entre as mulheres e bendito o fruto do teu ventre» (cf. Lc 1, 40-42). Esta proclamação e aclamação de Isabel deveria vir a entrar na Ave Maria, como continuação da saudação do Anjo, tornando-se assim uma das orações mais frequentes da Igreja. Mas são ainda mais significativas as palavras de Isabel, na pergunta que se segue: «E donde me é dada a dita que venha ter comigo a mãe do meu Senhor?» (Lc 1, 43). Isabel dá testemunho acerca de Maria: reconhece e proclama que diante de si está a Mãe do Senhor, a Mãe do Messias. Neste testemunho participa também o filho que Isabel traz no seio: «estremeceu de alegria o menino no meu seio» (Lc 1, 44). O menino é o futuro João Baptista, que, nas margens do Jordão, indicará em Jesus o Messias.$joyful_2_c7t$),
  (8, $joyful_2_c8a$São João Paulo II$joyful_2_c8a$, $joyful_2_c8s$Carta apostólica Rosarium Virginis Mariae, n. 20 (texto abreviado). A frase seguinte do número passa a Belém e aos outros mistérios gozosos.$joyful_2_c8s$, $joyful_2_c8t$Sob o signo da exultação, aparece depois a cena do encontro com Isabel, onde a mesma voz de Maria e a presença de Cristo no seu ventre fazem « saltar de alegria » João (cf. Lc 1, 44). …$joyful_2_c8t$)
) as v(sort_order, author, source, text) on true
where m.type = 'joyful' and m.sort_order = 2;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $joyful_2_i0u$https://images.metmuseum.org/CRDImages/md/original/DP344571.jpg$joyful_2_i0u$, $joyful_2_i0ti$The Visitation$joyful_2_i0ti$, $joyful_2_i0ar$Atribuído a Master Heinrich of Constance$joyful_2_i0ar$, $joyful_2_i0d$The Metropolitan Museum of Art, Nova Iorque (17.190.724). Domínio público. O registo da coleção do Met marca `isPublicDomain: true` e publica a imagem em Open Access (https://collectionapi.metmuseum.org/public/collection/v1/objects/464596).$joyful_2_i0d$, 0, 'contain', 2
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 2;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $joyful_2_i1u$https://images.metmuseum.org/CRDImages/dp/original/DP816162.jpg$joyful_2_i1u$, $joyful_2_i1ti$The Visitation, from "The Life of the Virgin"$joyful_2_i1ti$, $joyful_2_i1ar$Albrecht Dürer$joyful_2_i1ar$, $joyful_2_i1d$The Metropolitan Museum of Art, Nova Iorque (18.17.2-29). Public Domain, na ficha do Met.$joyful_2_i1d$, 1, 'contain', 2
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 2;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $joyful_2_i2u$https://images.metmuseum.org/CRDImages/dp/original/DP818939.jpg$joyful_2_i2u$, $joyful_2_i2ti$The Visitation$joyful_2_i2ti$, $joyful_2_i2ar$Lucas van Leyden$joyful_2_i2ar$, $joyful_2_i2d$The Metropolitan Museum of Art, Nova Iorque (56.630.21). Public Domain, na ficha do Met.$joyful_2_i2d$, 2, 'contain', 2
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 2;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $joyful_2_i3u$https://images.metmuseum.org/CRDImages/dp/original/DP836391.jpg$joyful_2_i3u$, $joyful_2_i3ti$The Visitation$joyful_2_i3ti$, $joyful_2_i3ar$Master ES$joyful_2_i3ar$, $joyful_2_i3d$The Metropolitan Museum of Art, Nova Iorque (37.3.3). Public Domain, na ficha do Met; a página indica uso livre, comercial ou não, sem autorização nem taxa.$joyful_2_i3d$, 3, 'contain', 2
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 2;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $joyful_2_i4u$https://images.metmuseum.org/CRDImages/dp/original/DP821538.jpg$joyful_2_i4u$, $joyful_2_i4ti$The Visitation$joyful_2_i4ti$, $joyful_2_i4ar$Giorgio Ghisi, segundo Francesco Salviati$joyful_2_i4ar$, $joyful_2_i4d$The Metropolitan Museum of Art, Nova Iorque (49.95.2319). Public Domain, na ficha do Met.$joyful_2_i4d$, 4, 'contain', 2
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 2;

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $joyful_3_txt$Deu à luz o seu filho primogénito, e o enfaixou, e o reclinou numa manjedoura.$joyful_3_txt$, $joyful_3_ref$Lc 2, 7$joyful_3_ref$, 0
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 3;

insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $joyful_3_c0a$Catecismo da Igreja Católica$joyful_3_c0a$, $joyful_3_c0s$CIC 525$joyful_3_c0s$, $joyful_3_c0t$Jesus nasceu na humildade dum estábulo, no seio duma família pobre. As primeiras testemunhas deste acontecimento são simples pastores. E é nesta pobreza que se manifesta a glória do céu. A Igreja não se cansa de cantar a glória desta noite: «Hoje a Virgem dá à luz o Eterno e a terra oferece uma gruta ao Inacessível. Cantam-n'O os anjos e os pastores, e com a estrela os magos põem-se a caminho, porque Tu nasceste para nós, pequeno Infante. Deus eterno!»$joyful_3_c0t$),
  (1, $joyful_3_c1a$Catecismo da Igreja Católica$joyful_3_c1a$, $joyful_3_c1s$CIC 526$joyful_3_c1s$, $joyful_3_c1t$«Tornar-se criança» diante de Deus é a condição para entrar no Reino, e para isso, é preciso abaixar-se, tornar-se pequeno. Mais ainda: é preciso «nascer do Alto» (Jo 3, 7), «nascer de Deus» para se «tornar filho de Deus». O mistério do Natal cumpre-se em nós quando Cristo «Se forma» em nós. O Natal é o mistério desta «admirável permuta»: «O admirabile commercium! Creator generis humani, animatum corpus sumens de Virgine nasci dignatus est; et, procedens homo sine semine, largitus est nobis suam deitatem». – «Oh admirável permuta! O Criador do género humano, tomando corpo e alma, dignou-Se nascer duma Virgem; e, feito homem sem progenitor humano, tornou-nos participantes da sua divindade!»$joyful_3_c1t$),
  (2, $joyful_3_c2a$São Tomás de Aquino$joyful_3_c2a$, $joyful_3_c2s$Suma Teológica, III, q. 35, a. 7, solução (tradução consultada em permanencia.org.br; esta página do artigo não nomeia o tradutor)$joyful_3_c2s$, $joyful_3_c2t$Cristo quis nascer em Belém por duas razões. — Primeiro, porque foi feito da linhagem de Davi, segundo a carne, como diz o Apóstolo. Ora, a Davi foi feita uma promessa especial, sobre Cristo, como diz a Escritura: Disse o varão a favor do qual se decretou sobre o Cristo do Deus de Jacó. Por isso, em Belém, onde nasceu Davi, também quis nascer, para que se manifestasse, no lugar mesmo da sua natividade, o cumprimento da promessa feita. E é o que significa o Evangelista quando diz: Porque era da casa e da família de Davi. — Segundo, porque, como diz Gregório, Belém significa a casa do pão: E foi o próprio Cristo quem disse: Eu sou o pão vivo descido do céu.$joyful_3_c2t$),
  (3, $joyful_3_c3a$São Tomás de Aquino$joyful_3_c3a$, $joyful_3_c3s$Suma Teológica, III, q. 35, a. 8, ad 3 (tradução consultada em permanencia.org.br; esta página do artigo não nomeia o tradutor)$joyful_3_c3s$, $joyful_3_c3t$Como se disse, Cristo quis nascer quando começou a tomar incremento a luz do dia, para mostrar que vinha para fazer crescerem os homens na luz divina, como diz o Evangelho: Para alumiar os que vivem de assento nas trevas e na sombra da morte. — Semelhantemente, escolheu para tempo da sua natividade o rigor do inverno, a fim de sofrer por nós os padecimentos da carne.$joyful_3_c3t$),
  (4, $joyful_3_c4a$Santo Agostinho$joyful_3_c4a$, $joyful_3_c4s$Sermão 185, In Natali Domini, 1 (trad. Lírio Católico; texto abreviado). Numeração conferida com o incipit latino «Natalis Domini dicitur» em augustinus.it e com o Sermo CLXXXV da edição de Migne (PL 38) em Wikisource.$joyful_3_c4s$, $joyful_3_c4t$Chama-se Natal do Senhor quando a Sabedoria de Deus se mostrou infante, e o Verbo de Deus, sem palavras, emitiu a voz da carne. Contudo, aquela divindade oculta foi tanto assinalada aos Magos pelo testemunho de uma estrela, quanto anunciada aos pastores pela voz de um anjo. Celebramos, pois, com solenidade anual este dia, no qual se cumpriu a profecia que diz: a Verdade brotou da terra, e a justiça olhou do céu. A Verdade, que está no seio do Pai, brotou da terra, para estar também no seio de uma mãe. A Verdade, pela qual o mundo é mantido, brotou da terra, para ser carregada por mãos de mulher. A Verdade, pela qual a bem-aventurança dos anjos é incorruptivelmente nutrida, brotou da terra, para ser amamentada por peitos carnais. A Verdade, para a qual o céu não basta, brotou da terra, para ser posta numa manjedoura. Para bem de quem veio tão grande sublimidade em tão grande humildade? Certamente para nenhum bem seu; mas para grande bem nosso, se cremos. Desperta, ó homem: por ti Deus se fez homem. …$joyful_3_c4t$),
  (5, $joyful_3_c5a$Santo Agostinho$joyful_3_c5a$, $joyful_3_c5s$Sermão 187, In Natali Domini, 1 (trad. Lírio Católico; texto abreviado). Numeração conferida com o Sermo CLXXXVII da edição de Migne (PL 38) em Wikisource, incipit «Laudem Domini loquetur os meum» e a frase «magnus dies Angelorum, parvus in die hominum».$joyful_3_c5s$, $joyful_3_c5t$A minha boca proclamará o louvor do Senhor: daquele Senhor por quem todas as coisas foram feitas, e que foi feito entre todas as coisas: … grande dia dos anjos, pequeno no dia dos homens: … fundador do sol, fundado sob o sol: … autor do céu e da terra, surgido sob o céu sobre a terra: … enchendo o mundo, jazendo numa manjedoura: … tão grande na forma de Deus, tão pequeno na forma de servo…$joyful_3_c5t$),
  (6, $joyful_3_c6a$Francisco$joyful_3_c6a$, $joyful_3_c6s$Carta apostólica Admirabile signum, 2 (texto abreviado)$joyful_3_c6s$, $joyful_3_c6t$A origem do Presépio fica-se a dever, antes de mais nada, a alguns pormenores do nascimento de Jesus em Belém, referidos no Evangelho. O evangelista Lucas limita-se a dizer que, tendo-se completado os dias de Maria dar à luz, «teve o seu filho primogénito, que envolveu em panos e recostou numa manjedoura, por não haver lugar para eles na hospedaria» (2, 7). Jesus é colocado numa manjedoura, que, em latim, se diz praesepium, donde vem a nossa palavra presépio. Ao entrar neste mundo, o Filho de Deus encontra lugar onde os animais vão comer. A palha torna-se a primeira enxerga para Aquele que Se há de revelar como «o pão vivo, o que desceu do céu» (Jo 6, 51). Uma simbologia, que já Santo Agostinho, a par doutros Padres da Igreja, tinha entrevisto quando escreveu: «Deitado numa manjedoura, torna-Se nosso alimento». …$joyful_3_c6t$),
  (7, $joyful_3_c7a$Francisco$joyful_3_c7a$, $joyful_3_c7s$Carta apostólica Admirabile signum, 8$joyful_3_c7s$, $joyful_3_c7t$O coração do Presépio começa a palpitar, quando colocamos lá, no Natal, a figura do Menino Jesus. Assim Se nos apresenta Deus, num menino, para fazer-Se acolher nos nossos braços. Naquela fraqueza e fragilidade, esconde o seu poder que tudo cria e transforma. Parece impossível, mas é assim: em Jesus, Deus foi criança e, nesta condição, quis revelar a grandeza do seu amor, que se manifesta num sorriso e nas suas mãos estendidas para quem quer que seja.$joyful_3_c7t$)
) as v(sort_order, author, source, text) on true
where m.type = 'joyful' and m.sort_order = 3;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $joyful_3_i0u$https://images.metmuseum.org/CRDImages/ep/original/DP-26498-001.jpg$joyful_3_i0u$, $joyful_3_i0ti$A Natividade (The Nativity)$joyful_3_i0ti$, $joyful_3_i0ar$Gerard David$joyful_3_i0ar$, $joyful_3_i0d$The Metropolitan Museum of Art, Nova Iorque. Domínio público (API da coleção do Met, isPublicDomain: true; óleo sobre madeira)$joyful_3_i0d$, 0, 'contain', 2
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 3;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $joyful_3_i1u$https://images.metmuseum.org/CRDImages/ep/original/DP123919.jpg$joyful_3_i1u$, $joyful_3_i1ti$A Adoração dos pastores (The Adoration of the Shepherds)$joyful_3_i1ti$, $joyful_3_i1ar$El Greco (Domenikos Theotokopoulos)$joyful_3_i1ar$, $joyful_3_i1d$The Metropolitan Museum of Art, Nova Iorque. Domínio público (ficha do Met: Public Domain e Open Access; API isPublicDomain: true; óleo sobre tela)$joyful_3_i1d$, 1, 'contain', 2
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 3;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $joyful_3_i2u$https://images.metmuseum.org/CRDImages/ep/original/ep71.162.bw.R.jpg$joyful_3_i2u$, $joyful_3_i2ti$A Adoração dos pastores (The Adoration of the Shepherds)$joyful_3_i2ti$, $joyful_3_i2ar$Christian Wilhelm Ernst Dietrich$joyful_3_i2ar$, $joyful_3_i2d$The Metropolitan Museum of Art, Nova Iorque. Domínio público (ficha do Met: Public Domain; API isPublicDomain: true; óleo sobre tela)$joyful_3_i2d$, 2, 'contain', 2
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 3;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $joyful_3_i3u$https://images.metmuseum.org/CRDImages/ep/original/DP164815.jpg$joyful_3_i3u$, $joyful_3_i3ti$A Natividade (The Nativity)$joyful_3_i3ti$, $joyful_3_i3ar$Pintor da Holanda do Sul (South Netherlandish Painter)$joyful_3_i3ar$, $joyful_3_i3d$The Metropolitan Museum of Art, Nova Iorque. Domínio público (ficha do Met: Public Domain; API isPublicDomain: true; óleo sobre madeira, fundo de ouro)$joyful_3_i3d$, 3, 'contain', 2
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 3;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $joyful_3_i4u$https://images.metmuseum.org/CRDImages/ep/original/DP-24223-007.jpg$joyful_3_i4u$, $joyful_3_i4ti$A Natividade com santos (The Nativity with Saints)$joyful_3_i4ti$, $joyful_3_i4ar$Ridolfo Ghirlandaio$joyful_3_i4ar$, $joyful_3_i4d$The Metropolitan Museum of Art, Nova Iorque. Domínio público (ficha do Met: Public Domain; API isPublicDomain: true; óleo sobre madeira)$joyful_3_i4d$, 4, 'contain', 2
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 3;

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $joyful_4_txt$Levaram-no a Jerusalém para o apresentar ao Senhor. Simeão tomou o Menino em seus braços: "Agora, Senhor, podes deixar partir o teu servo em paz, porque os meus olhos viram a tua salvação." Disse a Maria: "Eis que este Menino está posto para ruína e ressurgimento de muitos em Israel; e uma espada trespassará a tua alma!"$joyful_4_txt$, $joyful_4_ref$Lc 2, 22-35$joyful_4_ref$, 0
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 4;

insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $joyful_4_c0a$Catecismo da Igreja Católica$joyful_4_c0a$, $joyful_4_c0s$CIC 529$joyful_4_c0s$, $joyful_4_c0t$A apresentação de Jesus no templo mostra-O como Primogénito que pertence ao Senhor. Com Simeão e Ana, é toda a expectativa de Israel que vem ao encontro do seu Salvador (a tradição bizantina designa por encontro este acontecimento). Jesus é reconhecido como o Messias tão longamente esperado, «luz das nações» e «glória de Israel», mas também como «sinal de contradição». A espada de dor, predita a Maria, anuncia essa outra oblação, perfeita e única, da cruz, que trará a salvação que Deus «preparou diante de todos os povos».$joyful_4_c0t$),
  (1, $joyful_4_c1a$Catecismo da Igreja Católica$joyful_4_c1a$, $joyful_4_c1s$CIC 583 (texto abreviado)$joyful_4_c1s$, $joyful_4_c1t$Jesus, como antes d'Ele os profetas, professou pelo templo de Jerusalém o mais profundo respeito. Ali foi apresentado por José e Maria, quarenta dias depois do seu nascimento…$joyful_4_c1t$),
  (2, $joyful_4_c2a$São Tomás de Aquino$joyful_4_c2a$, $joyful_4_c2s$Suma Teológica, III, q. 37, a. 3, respondeo (texto abreviado; tradução do latim)$joyful_4_c2s$, $joyful_4_c2t$Cristo quis ser feito sob a Lei, para resgatar os que estavam sob a Lei e para que a justificação da Lei se cumprisse espiritualmente nos seus membros. … Uma vez que Cristo, nascido de mulher, era primogénito e quis ser feito sob a Lei, o evangelista Lucas mostra que estas duas coisas foram observadas a respeito d’Ele. Primeiro, o que toca aos primogénitos, quando diz que o levaram a Jerusalém para o apresentar ao Senhor… Segundo, o que toca em comum a todos, quando diz que dessem uma oferta… um par de rolas ou dois pombinhos.$joyful_4_c2t$),
  (3, $joyful_4_c3a$São Tomás de Aquino$joyful_4_c3a$, $joyful_4_c3s$Suma Teológica, III, q. 37, a. 4, respondeo (tradução integral do latim; não é texto original em português)$joyful_4_c3s$, $joyful_4_c3t$Assim como a plenitude da graça deriva de Cristo para a Mãe, assim convinha que a Mãe se conformasse à humildade do Filho, pois Deus dá a graça aos humildes, como se diz na carta de Tiago. Por isso, assim como Cristo, embora não estivesse sujeito à Lei, quis submeter-se à circuncisão e aos outros encargos da Lei, para dar exemplo de humildade e de obediência, para aprovar a Lei e para tirar aos judeus ocasião de calúnia, pelas mesmas razões quis que também a sua Mãe cumprisse as observâncias da Lei, às quais, contudo, não estava sujeita.$joyful_4_c3t$),
  (4, $joyful_4_c4a$São Sofrónio de Jerusalém$joyful_4_c4a$, $joyful_4_c4s$Orat. 3 de Hypapante, 6-7 (PG 87, 3, 3291-3293) (texto abreviado)$joyful_4_c4s$, $joyful_4_c4t$Todos nós que celebramos e veneramos com tanta piedade o mistério do Encontro do Senhor, corramos para Ele com todo o fervor do nosso espírito. Ninguém deixe de participar neste Encontro, ninguém se recuse a levar a sua luz. … Nenhum fique excluído deste esplendor, nenhum persista em continuar imerso na noite, mas avancemos todos resplandecentes; iluminados por este fulgor, vamos todos juntos ao seu encontro e com o velho Simeão recebamos a luz clara e eterna; associemo-nos à sua alegria e cantemos com ele um hino de ação de graças ao Pai da luz, que enviou a luz verdadeira e, afastando todas as trevas, nos fez participantes do seu esplendor. A salvação de Deus, com efeito, preparada diante de todos os povos, manifestou a glória que nos pertence a nós, que somos o novo Israel; e nós próprios, graças a Ele, vimos essa salvação e fomos absolvidos da antiga e tenebrosa culpa, tal como Simeão, depois de ver a Cristo, foi libertado dos laços da vida presente. …$joyful_4_c4t$),
  (5, $joyful_4_c5a$São Bernardo de Claraval$joyful_4_c5a$, $joyful_4_c5s$In Purificatione Beatae Mariae, sermo III, 2 (PL 183, 370) (texto abreviado; tradução do latim)$joyful_4_c5s$, $joyful_4_c5t$Verdadeiramente, ó bem-aventurada Virgem, verdadeiramente não tens motivo, nem te é necessária a purificação. … Oferece o teu Filho, Virgem sagrada, e apresenta ao Senhor o fruto bendito do teu ventre. Oferece, para reconciliação de todos nós, uma vítima santa, agradável a Deus. … Mas esta oblação, irmãos, parece assaz delicada, quando apenas é apresentado ao Senhor, resgatado com aves e logo reconduzido. Virá quando não será oferecido no templo, nem entre os braços de Simeão, mas fora da cidade, entre os braços da cruz. … Aquela será o sacrifício vespertino; esta é o matutino.$joyful_4_c5t$),
  (6, $joyful_4_c6a$São João Paulo II$joyful_4_c6a$, $joyful_4_c6s$Rosarium Virginis Mariae, 20 (texto abreviado)$joyful_4_c6s$, $joyful_4_c6t$… Os dois últimos mistérios, porém, mesmo conservando o sabor da alegria antecipam já os sinais do drama. A apresentação no templo, de facto, enquanto exprime a alegria da consagração e extasia o velho Simeão, regista também a profecia do « sinal de contradição » que o Menino será para Israel e da espada que trespassará a alma da Mãe (cf. Lc 2, 34-35). …$joyful_4_c6t$),
  (7, $joyful_4_c7a$São João Paulo II$joyful_4_c7a$, $joyful_4_c7s$Redemptoris Mater, 16 (texto abreviado)$joyful_4_c7s$, $joyful_4_c7t$… Maria, um pouco mais tarde, ouve outras palavras: aquelas que foram pronunciadas por Simeão, no templo de Jerusalém. Estava-se já no quadragésimo dia depois do nascimento de Jesus, quando Maria e José, segundo a prescrição da Lei de Moisés, «levaram o menino a Jerusalém, para o oferecer ao Senhor» (Lc 2, 22). … Nessa mesma altura, porém, Simeão dirige-se a Maria com as seguintes palavras: «Ele é destinado a ser ocasião de queda e de ressurgimento para muitos em Israel e a ser um sinal de contradição... a fim de se revelarem os pensamentos de muitos corações»; e acrescenta, com referência directa a Maria: «E tu mesma terás a alma trespassada por uma espada» (Lc 2, 34-35). … Aquilo que Simeão diz apresenta-se como um segundo anúncio a Maria, uma vez que indica a dimensão histórica concreta em que o Filho realizará a sua missão, ou seja, na incompreensão e na dor. Se este outro anúncio confirma, por um lado, a sua fé no cumprimento das promessas divinas da salvação, por outro, também lhe revela que ela terá que viver a sua obediência de fé no sofrimento, ao lado do Salvador que sofre, e que a sua maternidade será obscura e marcada pela dor. …$joyful_4_c7t$)
) as v(sort_order, author, source, text) on true
where m.type = 'joyful' and m.sort_order = 4;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $joyful_4_i0u$https://images.metmuseum.org/CRDImages/ep/original/DT242201.jpg$joyful_4_i0u$, $joyful_4_i0ti$The Presentation in the Temple$joyful_4_i0ti$, $joyful_4_i0ar$Pintor bizantino (século XV)$joyful_4_i0ar$, $joyful_4_i0d$The Metropolitan Museum of Art, Nova Iorque (n.º 31.67.8). Domínio público e Open Access do Met (a ficha diz as duas coisas; a API tem `isPublicDomain: true` e imagem). A mesma ficha também mostra o aviso de que o visor não amplia nem descarrega a imagem. A política de Open Access e a API é que autorizam o uso.$joyful_4_i0d$, 0, 'contain', 2
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 4;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $joyful_4_i1u$https://images.metmuseum.org/CRDImages/ep/original/DT8826.jpg$joyful_4_i1u$, $joyful_4_i1ti$The Presentation in the Temple$joyful_4_i1ti$, $joyful_4_i1ar$Álvaro Pires (português, activo em Itália, 1411–1434)$joyful_4_i1ar$, $joyful_4_i1d$The Metropolitan Museum of Art, Nova Iorque (n.º 1982.60.3). Domínio público na API do Met (`isPublicDomain: true`, imagem primária presente). O HTML da ficha é uma página vazia de aplicação e o extracto público não repetiu a palavra «Public Domain»; a licença apoia-se na API, não nesse extracto.$joyful_4_i1d$, 1, 'contain', 2
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 4;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $joyful_4_i2u$https://images.metmuseum.org/CRDImages/ep/original/DP-26503-001.jpg$joyful_4_i2u$, $joyful_4_i2ti$The Presentation of Christ in the Temple$joyful_4_i2ti$, $joyful_4_i2ar$Giovanni di Paolo (Siena, 1398–1482)$joyful_4_i2ar$, $joyful_4_i2d$The Metropolitan Museum of Art, Nova Iorque (n.º 41.100.4). Domínio público na API do Met (`isPublicDomain: true`, imagem primária presente). Mesma reserva do n.º 2 quanto ao HTML da ficha.$joyful_4_i2d$, 2, 'contain', 2
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 4;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $joyful_4_i3u$https://images.metmuseum.org/CRDImages/dp/original/DP816160.jpg$joyful_4_i3u$, $joyful_4_i3ti$The Presentation in the Temple, from "The Life of the Virgin"$joyful_4_i3ti$, $joyful_4_i3ar$Albrecht Dürer$joyful_4_i3ar$, $joyful_4_i3d$The Metropolitan Museum of Art, Nova Iorque (n.º 1975.653.7). A ficha do Met marca «Public Domain». A API confirma `isPublicDomain: true` e serve a imagem. É xilogravura, não pintura de cavalete.$joyful_4_i3d$, 3, 'contain', 2
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 4;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $joyful_4_i4u$https://upload.wikimedia.org/wikipedia/commons/d/d5/Fra_Angelico_-_Presentation_of_Jesus_in_the_Temple_(Cell_10)_-_WGA00544.jpg$joyful_4_i4u$, $joyful_4_i4ti$Presentation of Jesus in the Temple (cela 10)$joyful_4_i4ti$, $joyful_4_i4ar$Fra Angelico$joyful_4_i4ar$, $joyful_4_i4d$Museu de São Marcos, Florença. Domínio público da obra (autor morto em 1455). O ficheiro Commons está identificado como livre de restrições conhecidas (reprodução fiel de obra bidimensional em domínio público; Public Domain Mark). Nalgumas jurisdições, a fotografia de uma obra em domínio público pode ter regime próprio; aqui segue-se a marcação do ficheiro.$joyful_4_i4d$, 4, 'contain', 2
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 4;

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $joyful_5_txt$Ficou o Menino Jesus em Jerusalém. Três dias depois, encontraram-no no templo sentado no meio dos doutores. Sua mãe disse-lhe: «Filho, porque procedeste assim connosco?» Ele disse-lhes: «Não sabíeis que devo ocupar-me nas coisas de meu Pai?»$joyful_5_txt$, $joyful_5_ref$Lc 2, 43-49$joyful_5_ref$, 0
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 5;

insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $joyful_5_c0a$Catecismo da Igreja Católica$joyful_5_c0a$, $joyful_5_c0s$CIC 534$joyful_5_c0s$, $joyful_5_c0t$«O reencontro de Jesus no templo é o único acontecimento que quebra o silêncio dos evangelhos sobre os anos ocultos de Jesus. Nele, Jesus deixa entrever o mistério da sua consagração total à missão decorrente da sua filiação divina: "Não sabíeis que Eu tenho de estar na casa do meu Pai?". Maria e José "não compreenderam" esta palavra, mas acolheram-na na fé, e Maria "guardava no coração todas estas recordações", ao longo dos anos em que Jesus permaneceu oculto no silêncio duma vida normal.»$joyful_5_c0t$),
  (1, $joyful_5_c1a$São Tomás de Aquino$joyful_5_c1a$, $joyful_5_c1s$Suma Teológica, III, q. 12, a. 3$joyful_5_c1s$, $joyful_5_c1t$«Cristo foi constituído cabeça da Igreja … de modo que … todos recebessem dele a doutrina da Verdade. Donde ele mesmo diz … "Para isto nasci … para dar testemunho da verdade." E por isso não convinha à sua dignidade que fosse ensinado por qualquer homem.» … «Como Orígenes afirma … o Senhor interrogava, não para aprender algo, mas para ensinar ao interrogar.»$joyful_5_c1t$),
  (2, $joyful_5_c2a$Santo Agostinho$joyful_5_c2a$, $joyful_5_c2s$Sermão 51$joyful_5_c2s$, $joyful_5_c2t$«Quando o Senhor Jesus Cristo tinha doze anos … ficou … no templo, e discutia com os anciãos … A Palavra de Deus nunca se cala, mas nem sempre é ouvida.» … «Não sabíeis que devo estar nas coisas que são de meu Pai?» … «não aponta para Deus como Pai de tal modo que negue ser José pai … "Era-lhes submisso."»$joyful_5_c2t$),
  (3, $joyful_5_c3a$Orígenes de Alexandria$joyful_5_c3a$, $joyful_5_c3s$Homilias sobre Lucas, hom. 19 (Lc 2,40-46)$joyful_5_c3s$, $joyful_5_c3t$«Onde, pois, o encontram? No templo; pois aí se encontra o Filho de Deus. Se tu também … procurares o Filho de Deus, procura-o primeiro no templo.» … «Interrogava … os mestres, não para aprender algo, mas para instruí-los ao interrogar.»$joyful_5_c3t$),
  (4, $joyful_5_c4a$São Bernardo de Claraval$joyful_5_c4a$, $joyful_5_c4s$Homilia I super Missus est, 7-8 (Lc 2,51)$joyful_5_c4s$, $joyful_5_c4t$«"E era submisso a eles." Quem, a quem? Deus, aos homens. … Deus … era submisso a Maria, e não somente a Maria, mas também a José, por causa de Maria. … Aprende, ó homem, a obedecer.»$joyful_5_c4t$),
  (5, $joyful_5_c5a$São João Paulo II$joyful_5_c5a$, $joyful_5_c5s$Rosarium Virginis Mariae, § 20 (texto condensado, não é citação verbal)$joyful_5_c5s$, $joyful_5_c5t$Meditar o episódio de Jesus, aos doze anos, no templo: ele aparece na divina sabedoria, escuta e interroga, no papel de quem ensina; revela-se Filho dedicado às coisas do Pai; José e Maria, angustiados, «não entenderam» as suas palavras.$joyful_5_c5t$),
  (6, $joyful_5_c6a$Catecismo da Igreja Católica$joyful_5_c6a$, $joyful_5_c6s$CIC 564$joyful_5_c6s$, $joyful_5_c6t$«Pela sua submissão a Maria e a José, assim como pelo seu trabalho humilde em Nazaré durante longos anos, Jesus dá-nos o exemplo da santidade na vida quotidiana da família e do trabalho.»$joyful_5_c6t$)
) as v(sort_order, author, source, text) on true
where m.type = 'joyful' and m.sort_order = 5;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $joyful_5_i0u$https://upload.wikimedia.org/wikipedia/commons/5/59/Duccio_di_Buoninsegna_-_Disputation_with_the_Doctors_-_WGA06768.jpg$joyful_5_i0u$, $joyful_5_i0ti$Disputation with the Doctors (Disputa com os doutores)$joyful_5_i0ti$, $joyful_5_i0ar$Duccio di Buoninsegna$joyful_5_i0ar$, $joyful_5_i0d$Museo dell'Opera del Duomo, Siena. Domínio público (PD-Art; autor f. 1319)$joyful_5_i0d$, 0, 'contain', 2
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 5;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $joyful_5_i1u$https://upload.wikimedia.org/wikipedia/commons/4/41/Paolo_Veronese_-_Jesus_among_the_Doctors_-_WGA24816.jpg$joyful_5_i1u$, $joyful_5_i1ti$Christ Among the Doctors (Jesus entre os doutores)$joyful_5_i1ti$, $joyful_5_i1ar$Paolo Veronese$joyful_5_i1ar$, $joyful_5_i1d$Museo del Prado, Madrid. Domínio público (PD-Art; Veronese f. 1588)$joyful_5_i1d$, 1, 'contain', 2
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 5;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $joyful_5_i2u$https://images.metmuseum.org/CRDImages/ep/original/DP-30262-001.jpg$joyful_5_i2u$, $joyful_5_i2ti$Christ among the Doctors$joyful_5_i2ti$, $joyful_5_i2ar$Pintor espanhol (catalão) (séc. XV)$joyful_5_i2ar$, $joyful_5_i2d$The Metropolitan Museum of Art, Nova Iorque. CC0 / Open Access (Met)$joyful_5_i2d$, 2, 'contain', 2
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 5;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $joyful_5_i3u$https://iiif.micr.io/SPtdm/full/^1024,538/0/default.webp$joyful_5_i3u$, $joyful_5_i3ti$Christ Returning from the Temple with His Parents$joyful_5_i3ti$, $joyful_5_i3ar$Rembrandt van Rijn$joyful_5_i3ar$, $joyful_5_i3d$Rijksmuseum, Amesterdão. Domínio público (Rijksmuseum)$joyful_5_i3d$, 3, 'contain', 2
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 5;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $joyful_5_i4u$https://upload.wikimedia.org/wikipedia/commons/6/64/Albrecht_D%C3%BCrer_-_Jesus_among_the_Doctors_-_Google_Art_Project.jpg$joyful_5_i4u$, $joyful_5_i4ti$Jesus among the Doctors$joyful_5_i4ti$, $joyful_5_i4ar$Albrecht Dürer$joyful_5_i4ar$, $joyful_5_i4d$Museo Thyssen-Bornemisza, Madrid (obra); reprodução Commons. Domínio público (PD-Art; Dürer f. 1528)$joyful_5_i4d$, 4, 'contain', 2
from public.mysteries m
where m.type = 'joyful' and m.sort_order = 5;

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $luminous_1_txt$Logo que saiu da água, eis que se lhe abriram os céus, e viu o Espírito de Deus descer como pomba, e vir sobre ele. E eis uma voz dos céus, que dizia: «Este é o meu Filho amado, em quem me comprazo.»$luminous_1_txt$, $luminous_1_ref$Mt 3, 16-17$luminous_1_ref$, 0
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 1;

insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $luminous_1_c0a$São João Paulo II$luminous_1_c0a$, $luminous_1_c0s$*Rosarium Virginis Mariae*, n. 21$luminous_1_c0s$, $luminous_1_c0t$Primeiramente é mistério de luz o Baptismo no Jordão. Aqui, enquanto Cristo desce à água do rio, como inocente que Se faz pecado por nós (cf. 2 Cor 5, 21), o céu abre-se e a voz do Pai proclama-O Filho dilecto (cf. Mt 3, 17 par), ao mesmo tempo que o Espírito vem sobre Ele para investi-Lo na missão que O espera. … (texto abreviado; o n. 21 continua com os outros mistérios luminosos)$luminous_1_c0t$),
  (1, $luminous_1_c1a$Catecismo da Igreja Católica$luminous_1_c1a$, $luminous_1_c1s$CIC 535$luminous_1_c1s$, $luminous_1_c1t$O início da vida pública de Jesus é o seu baptismo por João, no rio Jordão. João pregava «um baptismo de penitência, em ordem à remissão dos pecados» (Lc 3, 3). … «Então aparece Jesus». O Baptista hesita, Jesus insiste: e recebe o baptismo. Então o Espírito Santo, sob a forma de pomba, desce sobre Jesus e uma voz do céu proclama: «Este é o meu Filho muito amado» (Mt 3,13-17). Tal foi a manifestação («epifania») de Jesus como Messias de Israel e Filho de Deus.$luminous_1_c1t$),
  (2, $luminous_1_c2a$Catecismo da Igreja Católica$luminous_1_c2a$, $luminous_1_c2s$CIC 536$luminous_1_c2s$, $luminous_1_c2t$Da parte de Jesus, o seu baptismo é a aceitação e a inauguração da sua missão de Servo sofredor. Deixa-se contar entre o número dos pecadores. É já «o Cordeiro de Deus que tira o pecado do mundo» (Jo 1, 29), e antecipa já o «baptismo» da sua morte sangrenta. Vem, desde já, para «cumprir toda a justiça» (Mt 3, 15). … A esta aceitação responde a voz do Pai, que põe toda a sua complacência no Filho. … No baptismo de Cristo, «abriram-se os céus» (Mt 3, 16) que o pecado de Adão tinha fechado, e as águas são santificadas pela descida de Jesus e do Espírito, prelúdio da nova criação.$luminous_1_c2t$),
  (3, $luminous_1_c3a$Catecismo da Igreja Católica$luminous_1_c3a$, $luminous_1_c3s$CIC 537$luminous_1_c3s$, $luminous_1_c3t$Pelo Baptismo, o cristão é sacramentalmente assimilado a Jesus que, no seu baptismo, antecipa a sua morte e ressurreição. Deve entrar neste mistério de humilde abatimento e de penitência, descer à água com Jesus, para de lá subir com Ele, renascer da água e do Espírito para se tornar, no Filho, filho-amado do Pai e «viver numa vida nova» (Rm 6, 4): «Sepultemo-nos com Cristo pelo Baptismo, para com Ele ressuscitarmos…» (texto abreviado; citação patrística completa no § 537)$luminous_1_c3t$),
  (4, $luminous_1_c4a$São Tomás de Aquino$luminous_1_c4a$, $luminous_1_c4s$Suma Teológica, III, q. 39, a. 1$luminous_1_c4s$, $luminous_1_c4t$Cristo devia ser baptizado. Primeiro, porque, como diz Ambrósio, o Senhor foi baptizado, não por querer purificar-se; mas para purificar as águas que, purificadas assim pelo corpo de Cristo, isento de pecado, pudessem servir para o baptismo e a fim de deixar para o futuro as águas santificadas para os que devessem ser baptizados, como ensina Crisóstomo. … Terceiro, Cristo quis ser baptizado, porque, como diz Agostinho, quis fazer o que ordenou a todos fazerem … «Assim nos convém cumprir toda a justiça» (Mt 3, 15).$luminous_1_c4t$),
  (5, $luminous_1_c5a$São Tomás de Aquino$luminous_1_c5a$, $luminous_1_c5s$Suma Teológica, III, q. 39, a. 8$luminous_1_c5s$, $luminous_1_c5t$Como dissemos, pelo seu baptismo, que foi o exemplar do nosso, Cristo devia mostrar o que no nosso baptismo se realiza. Ora, o baptismo que os fiéis recebem é consagrado pela invocação e pela virtude da Trindade, segundo o Evangelho: «Ide e ensinai a todas as gentes, baptizando-as em nome do Padre e do Filho e do Espírito Santo» (Mt 28, 19). E assim, no baptismo de Cristo, como diz Jerónimo, manifesta-se o mistério da Trindade; pois é o próprio Senhor, revestido da natureza humana, o baptizado; o Espírito Santo desceu sob a forma de pomba; foi ouvida a palavra do Pai dando testemunho do seu Filho.$luminous_1_c5t$),
  (6, $luminous_1_c6a$São João Crisóstomo$luminous_1_c6a$, $luminous_1_c6s$Homilia sobre o Batismo de Nosso Senhor (Epifania), § 4 (trad. Via Bible)$luminous_1_c6s$, $luminous_1_c6t$Quando João disse: «É necessário que eu seja batizado por ti, e tu vens a mim?», ele respondeu: «Deixe assim; convém que cumpramos toda a justiça» (Mt 3, 14-15). … Todos deveriam cumprir essa justiça, mas ninguém … a cumpriu; portanto, Cristo aparece e cumpre essa justiça. … Se é justo obedecer a Deus, e se Deus enviou João para batizar o povo, então Nosso Senhor cumpriu este ponto da lei juntamente com todos os outros.$luminous_1_c6t$),
  (7, $luminous_1_c7a$Santo Ambrósio$luminous_1_c7a$, $luminous_1_c7s$*De mysteriis*, 4, 19-20 (tradução citada em estudo académico a partir do latim)$luminous_1_c7s$, $luminous_1_c7t$Vejo a água que eu via diariamente: esta pode me purificar, se já desci nela muitas vezes e nunca fui purificado? Portanto, saiba que a água não purifica sem o Espírito. … O que é, em efeito, a água sem a cruz de Cristo, senão um elemento comum, sem nenhuma eficácia sacramental? Mas tampouco há mistério de regeneração sem a água…$luminous_1_c7t$)
) as v(sort_order, author, source, text) on true
where m.type = 'luminous' and m.sort_order = 1;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $luminous_1_i0u$https://images.metmuseum.org/CRDImages/dp/original/DP818934.jpg$luminous_1_i0u$, $luminous_1_i0ti$The Baptism of Christ in the River Jordan$luminous_1_i0ti$, $luminous_1_i0ar$Lucas van Leyden$luminous_1_i0ar$, $luminous_1_i0d$The Metropolitan Museum of Art, Nova York. Obra em domínio público; imagem Open Access (CC0) no Met (`isPublicDomain`: true; API objectID 364798)$luminous_1_i0d$, 0, 'contain', 2
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 1;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $luminous_1_i1u$https://images.metmuseum.org/CRDImages/ep/original/DT10696.jpg$luminous_1_i1u$, $luminous_1_i1ti$The Baptism of Christ$luminous_1_i1ti$, $luminous_1_i1ar$Sébastien Bourdon$luminous_1_i1ar$, $luminous_1_i1d$The Metropolitan Museum of Art, Nova York. Domínio público; imagem Open Access (CC0) no Met (`isPublicDomain`: true)$luminous_1_i1d$, 1, 'contain', 2
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 1;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $luminous_1_i2u$https://images.metmuseum.org/CRDImages/ep/original/DT9354.jpg$luminous_1_i2u$, $luminous_1_i2ti$The Baptism of Christ$luminous_1_i2ti$, $luminous_1_i2ar$Sebastiano Ricci$luminous_1_i2ar$, $luminous_1_i2d$The Metropolitan Museum of Art, Nova York. Domínio público; imagem Open Access (CC0) no Met (`isPublicDomain`: true)$luminous_1_i2d$, 2, 'contain', 2
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 1;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $luminous_1_i3u$https://images.metmuseum.org/CRDImages/ad/original/DP356935.jpg$luminous_1_i3u$, $luminous_1_i3ti$The Baptism of Christ$luminous_1_i3ti$, $luminous_1_i3ar$Nicolás Enríquez$luminous_1_i3ar$, $luminous_1_i3d$The Metropolitan Museum of Art, Nova York. Domínio público; imagem Open Access (CC0) no Met (`isPublicDomain`: true)$luminous_1_i3d$, 3, 'contain', 2
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 1;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $luminous_1_i4u$https://upload.wikimedia.org/wikipedia/commons/9/92/Piero_della_Francesca_-_Battesimo_di_Cristo_(National_Gallery%2C_London).jpg$luminous_1_i4u$, $luminous_1_i4ti$The Baptism of Christ (*Battesimo di Cristo*)$luminous_1_i4ti$, $luminous_1_i4ar$Piero della Francesca$luminous_1_i4ar$, $luminous_1_i4d$National Gallery, London (reprodução fotográfica). Obra em domínio público; fotografia Commons sem restrições conhecidas (PD-Art)$luminous_1_i4d$, 4, 'contain', 2
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 1;

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $luminous_2_txt$Celebraram-se umas bodas em Caná da Galileia … Faltando o vinho, a Mãe de Jesus disse-lhe: «Não têm vinho.» … Disse sua Mãe aos que serviam: «Fazei tudo o que ele vos disser.» … Jesus converteu a água em vinho. Tal foi o primeiro milagre de Jesus; manifestou a sua glória, e os seus discípulos creram nele.$luminous_2_txt$, $luminous_2_ref$Jo 2, 1-11$luminous_2_ref$, 0
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 2;

insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $luminous_2_c0a$São João Paulo II$luminous_2_c0a$, $luminous_2_c0s$Carta apostólica *Rosarium Virginis Mariae*, § 21 (texto abreviado)$luminous_2_c0s$, $luminous_2_c0t$Mistério de luz é o início dos sinais em Caná (cf. Jo 2, 1-12), quando Cristo, transformando a água em vinho, abre à fé o coração dos discípulos graças à intervenção de Maria, a primeira entre os crentes. … A função que desempenha em Caná acompanha, de algum modo, todo o caminho de Cristo. … Torna-se a grande advertência materna que Ela dirige à Igreja de todos os tempos: «Fazei o que Ele vos disser» (Jo 2, 5). Advertência esta que … constitui o fundo mariano de todos os «mistérios da luz».$luminous_2_c0t$),
  (1, $luminous_2_c1a$Catecismo da Igreja Católica$luminous_2_c1a$, $luminous_2_c1s$CIC 1613$luminous_2_c1s$, $luminous_2_c1t$«No umbral da sua vida pública, Jesus realiza o seu primeiro sinal –a pedido da sua Mãe – por ocasião duma festa de casamento (118). A Igreja atribui uma grande importância à presença de Jesus nas bodas de Caná. Ela vê nesse facto a confirmação da bondade do matrimónio e o anúncio de que, doravante, o matrimónio seria um sinal eficaz da presença de Cristo.»$luminous_2_c1t$),
  (2, $luminous_2_c2a$Catecismo da Igreja Católica$luminous_2_c2a$, $luminous_2_c2s$CIC 2618$luminous_2_c2s$, $luminous_2_c2t$«O Evangelho revela-nos como é que Maria ora e intercede na fé: em Caná, a Mãe de Jesus roga a seu Filho pelas necessidades dum banquete de bodas, sinal dum outro banquete, o das bodas do Cordeiro que dá o seu corpo e o seu sangue a pedido da Igreja, sua esposa. E é na hora da Nova Aliança, ao pé da cruz, que Maria é atendida como a Mulher, a nova Eva, a verdadeira «mãe dos vivos».»$luminous_2_c2t$),
  (3, $luminous_2_c3a$São Tomás de Aquino$luminous_2_c3a$, $luminous_2_c3s$Suma Teológica, III, q. 43, a. 3$luminous_2_c3s$, $luminous_2_c3t$Cristo fez milagres para confirmar a sua doutrina e para manifestar o seu poder divino. — Por isso, quanto à confirmação, não devia fazer milagres antes de começar a ensinar. … — Quanto à manifestação do seu poder, devia mostrar a sua divindade pelos seus milagres; de modo que acreditassem na sua humanidade verdadeira. Por isso, como diz Crisóstomo, fez bem não começando a fazer milagres desde a sua primeira idade; do contrário, pensariam que a sua Encarnação era fantástica … Em contrário, o Evangelho: «Com este milagre deu Jesus princípio aos seus, em Caná de Galileia.»$luminous_2_c3t$),
  (4, $luminous_2_c4a$São Bernardo de Claraval$luminous_2_c4a$, $luminous_2_c4s$Sermão para o 1.º domingo após a oitava da Epifania (sobre Jo 2,3-5) (texto abreviado)$luminous_2_c4s$, $luminous_2_c4t$«Faltando o vinho, a mãe de Jesus disse-lhe: Não têm vinho.» Ela teve piedade deles em sua bondade e tomou parte em seu constrangimento. O que pode resultar da fonte da Bondade, senão a bondade? … Talvez a resposta do Senhor pareça um pouco dura e severa; mas Ele sabia bem com quem estava falando, assim como ela não ignorava quem lhe falava. … Ouvi o que ela disse aos que serviam: «Fazei o que Ele vos disser.»$luminous_2_c4t$),
  (5, $luminous_2_c5a$Santo Agostinho$luminous_2_c5a$, $luminous_2_c5s$*Tractatus in Ioannem*, 8 (texto abreviado)$luminous_2_c5s$, $luminous_2_c5t$O milagre de nosso Senhor Jesus Cristo, pelo qual fez vinho da água, não é admirável para os que sabem que Deus o fez. Pois ele mesmo fez o vinho naquele dia, nas núpcias, naquelas seis talhas … ele que todos os anos faz isto nas videiras. … Também nós éramos água, e ele nos fez vinho, fez-nos sábios; pois temos gosto pela fé nele, nós que antes éramos insensatos.$luminous_2_c5t$),
  (6, $luminous_2_c6a$São João Crisóstomo$luminous_2_c6a$, $luminous_2_c6s$*Homiliae in Ioannem*, hom. 22 (Jo 2,4-10) (texto abreviado)$luminous_2_c6s$, $luminous_2_c6t$Não é sem razão que o Evangelista diz: «Segundo o rito da purificação dos judeus», … para mostrar que aqueles vasos nunca foram receptáculos de vinho. … Mas agora, para mostrar que é Ele quem transforma a água nas videiras, e converte a chuva em vinho … Ele efetuou naquele momento, nas bodas, o que na planta leva muito tempo. … Que era vinho então, e o melhor dos vinhos, … tinha os servos por testemunhas; … o mestre-sala e o noivo.$luminous_2_c6t$),
  (7, $luminous_2_c7a$Papa Francisco$luminous_2_c7a$, $luminous_2_c7s$Audiência geral, 8 de junho de 2016 (texto condensado, não é citação verbal)$luminous_2_c7s$, $luminous_2_c7t$Transformando em vinho a água das ânforas da purificação judaica, Jesus realiza um sinal: passa da Lei de Moisés ao Evangelio, portador de alegria. Maria coroa o quadro esponsal com «Fazei o que ele vos disser» — herança para a Igreja e programa do cristão: ouvir e praticar a Palavra.$luminous_2_c7t$)
) as v(sort_order, author, source, text) on true
where m.type = 'luminous' and m.sort_order = 2;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $luminous_2_i0u$https://images.metmuseum.org/CRDImages/ep/original/DT1459.jpg$luminous_2_i0u$, $luminous_2_i0ti$The Marriage Feast at Cana$luminous_2_i0ti$, $luminous_2_i0ar$Juan de Flandes$luminous_2_i0ar$, $luminous_2_i0d$The Metropolitan Museum of Art, Nova Iorque (1982.60.20). Domínio público / Met Open Access (CC0)$luminous_2_i0d$, 0, 'contain', 2
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 2;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $luminous_2_i1u$https://upload.wikimedia.org/wikipedia/commons/d/da/Giotto_-_Scrovegni_-_-24-_-_Marriage_at_Cana.jpg$luminous_2_i1u$, $luminous_2_i1ti$Marriage at Cana (Scenes from the Life of Christ)$luminous_2_i1ti$, $luminous_2_i1ar$Giotto$luminous_2_i1ar$, $luminous_2_i1d$Capela Scrovegni (Arena), Padova. Domínio público (PD-Art)$luminous_2_i1d$, 1, 'contain', 2
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 2;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $luminous_2_i2u$https://upload.wikimedia.org/wikipedia/commons/7/7f/Gerard_David_-_The_Marriage_at_Cana.jpg$luminous_2_i2u$, $luminous_2_i2ti$The Marriage at Cana (Les Noces de Cana)$luminous_2_i2ti$, $luminous_2_i2ar$Gerard David (e oficina)$luminous_2_i2ar$, $luminous_2_i2d$Musée du Louvre, Paris (INV 1995). Domínio público (PD-Art)$luminous_2_i2d$, 2, 'contain', 2
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 2;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $luminous_2_i3u$https://upload.wikimedia.org/wikipedia/commons/d/d1/The_Wedding_Feast_at_Cana_(after_Paolo_Veronese)_MET_1975.131.60.jpg$luminous_2_i3u$, $luminous_2_i3ti$The Wedding Feast at Cana (after Paolo Veronese)$luminous_2_i3ti$, $luminous_2_i3ar$After Federico Zuccaro (Zuccari), after Paolo Veronese$luminous_2_i3ar$, $luminous_2_i3d$The Metropolitan Museum of Art (1975.131.60). Met Open Access (CC0)$luminous_2_i3d$, 3, 'contain', 2
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 2;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $luminous_2_i4u$https://upload.wikimedia.org/wikipedia/commons/6/60/The_Wedding_at_Cana%2C_from_Das_Plenarium_MET_DP849917.jpg$luminous_2_i4u$, $luminous_2_i4ti$The Wedding at Cana, from *Das Plenarium*$luminous_2_i4ti$, $luminous_2_i4ar$Hans Schäufelein$luminous_2_i4ar$, $luminous_2_i4d$The Metropolitan Museum of Art (61.663.338). Met Open Access (CC0)$luminous_2_i4d$, 4, 'contain', 2
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 2;

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $luminous_3_txt$Depois que João foi preso, Jesus foi para a Galileia, pregando o Evangelho de Deus, e dizendo: «Completou-se o tempo, e está próximo o reino de Deus; fazei penitência, e crede no Evangelho.»$luminous_3_txt$, $luminous_3_ref$Mc 1, 14-15$luminous_3_ref$, 0
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 3;

insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $luminous_3_c0a$São João Paulo II$luminous_3_c0a$, $luminous_3_c0s$*Rosarium Virginis Mariae*, 21 (texto abreviado)$luminous_3_c0s$, $luminous_3_c0t$Mistério de luz é a pregação com a qual Jesus anuncia o advento do Reino de Deus e convida à conversão (cf. Mc 1, 15), perdoando os pecados de quem a Ele se dirige com humilde confiança … início do ministério de misericórdia que Ele prosseguirá exercendo até ao fim do mundo, especialmente através do sacramento da Reconciliação confiado à sua Igreja (cf. Jo 20, 22-23).$luminous_3_c0t$),
  (1, $luminous_3_c1a$Catecismo da Igreja Católica$luminous_3_c1a$, $luminous_3_c1s$CIC 541$luminous_3_c1s$, $luminous_3_c1t$«Depois de João ter sido preso, Jesus partiu para a Galileia. Aí proclamava a Boa-Nova da vinda de Deus, nestes termos: "Completou-se o tempo e o Reino de Deus está próximo: convertei-vos e acreditai na Boa-Nova!"» (Mc 1, 14-15). «Por isso, Cristo, a fim de cumprir a vontade do Pai, deu começo na terra ao Reino dos céus». … Esta reunião é a Igreja, a qual é na terra «o germe e o princípio» do Reino de Deus.$luminous_3_c1t$),
  (2, $luminous_3_c2a$Catecismo da Igreja Católica$luminous_3_c2a$, $luminous_3_c2s$CIC 542$luminous_3_c2s$, $luminous_3_c2t$Cristo está no centro desta reunião dos homens na «família de Deus». Reúne-os à sua volta pela sua palavra, pelos seus sinais que manifestam o Reino de Deus, pelo envio dos discípulos. E realizará a vinda do seu Reino sobretudo pelo grande mistério da sua Páscoa: a sua morte de cruz e a sua ressurreição. «E Eu, uma vez elevado da Terra, atrairei todos a Mim» (Jo 12, 32). Todos os homens são chamados a esta união com Cristo.$luminous_3_c2t$),
  (3, $luminous_3_c3a$Catecismo da Igreja Católica$luminous_3_c3a$, $luminous_3_c3s$CIC 543$luminous_3_c3s$, $luminous_3_c3t$Todos os homens são chamados a entrar no Reino. Anunciado primeiro aos filhos de Israel, este Reino messiânico é destinado a acolher os homens de todas as nações. Para ter acesso a ele, é preciso acolher a Palavra de Jesus: «A Palavra do Senhor compara-se à semente lançada ao campo: aqueles que a ouvem com fé … já receberam o Reino …»$luminous_3_c3t$),
  (4, $luminous_3_c4a$São Tomás de Aquino$luminous_3_c4a$, $luminous_3_c4s$Suma Teológica, I-II, q. 108, a. 1, ad 1 (texto abreviado; tradução a partir do latim conferido em tomasdeaquino.org)$luminous_3_c4s$, $luminous_3_c4t$O reino de Deus consiste principalmente nos actos interiores, mas, por consequência, pertencem também ao reino de Deus todas aquelas coisas sem as quais os actos interiores não podem existir. … se o reino de Deus é justiça interior, e paz, e gozo espiritual, é necessário que todos os actos exteriores que repugnem à justiça, ou à paz, ou ao gozo espiritual, repugnem também ao reino de Deus, e por isso devam ser proibidos no Evangelho do reino.$luminous_3_c4t$),
  (5, $luminous_3_c5a$São João Crisóstomo$luminous_3_c5a$, $luminous_3_c5s$*Homiliae in Matthaeum*, hom. 14, 1-2 (texto abreviado)$luminous_3_c5s$, $luminous_3_c5t$Veja-se que nesta pregação nada diz de si mesmo … no princípio falou de coisas agradáveis evangelizando o reino dos céus.$luminous_3_c5t$),
  (6, $luminous_3_c6a$Bento XVI$luminous_3_c6a$, $luminous_3_c6s$Angelus, 25 de janeiro de 2009 (texto condensado, não é citação verbal)$luminous_3_c6s$, $luminous_3_c6t$No Evangelho deste domingo ressoam as palavras da primeira pregação de Jesus na Galileia sobre o Reino próximo e a conversão (Mc 1, 15). A conversão cristã consiste em crer em Jesus morto e ressuscitado e abrir-se à luz da sua graça, deixando-se conduzir por Ele para sair do orgulho, do pecado e do egoísmo.$luminous_3_c6t$)
) as v(sort_order, author, source, text) on true
where m.type = 'luminous' and m.sort_order = 3;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $luminous_3_i0u$https://images.metmuseum.org/CRDImages/es/original/ES1340.jpg$luminous_3_i0u$, $luminous_3_i0ti$Christ Preaching from a Boat in the Lake of Gennesaret$luminous_3_i0ti$, $luminous_3_i0ar$Jan Rombouts$luminous_3_i0ar$, $luminous_3_i0d$The Metropolitan Museum of Art, Nova Iorque. Domínio público / Met Open Access (CC0)$luminous_3_i0d$, 0, 'contain', 2
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 3;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $luminous_3_i1u$https://upload.wikimedia.org/wikipedia/commons/1/1e/Jan_Brueghel_the_Elder_-_The_Sermon_on_the_Mount_-_Google_Art_Project.jpg$luminous_3_i1u$, $luminous_3_i1ti$The Sermon on the Mount$luminous_3_i1ti$, $luminous_3_i1ar$Jan Brueghel the Elder$luminous_3_i1ar$, $luminous_3_i1d$J. Paul Getty Museum, Los Angeles (via Wikimedia Commons). Domínio público (PD-Art / PD-US)$luminous_3_i1d$, 1, 'contain', 2
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 3;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $luminous_3_i2u$https://upload.wikimedia.org/wikipedia/commons/1/16/The_Calling_of_Saints_Peter_and_Andrew_-_Caravaggio_(1571-1610).jpg$luminous_3_i2u$, $luminous_3_i2ti$The Calling of Saints Peter and Andrew$luminous_3_i2ti$, $luminous_3_i2ar$Caravaggio (Michelangelo Merisi)$luminous_3_i2ar$, $luminous_3_i2d$Royal Collection (via Wikimedia Commons). Domínio público (PD-Art / PD-US)$luminous_3_i2d$, 2, 'contain', 2
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 3;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $luminous_3_i3u$https://images.metmuseum.org/CRDImages/dp/original/DP849939.jpg$luminous_3_i3u$, $luminous_3_i3ti$Christ Teaching the Disciples, 2, from *Das Plenarium*$luminous_3_i3ti$, $luminous_3_i3ar$Hans Schäufelein$luminous_3_i3ar$, $luminous_3_i3d$The Metropolitan Museum of Art, Nova Iorque. Domínio público / Met Open Access$luminous_3_i3d$, 3, 'contain', 2
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 3;

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $luminous_4_txt$Jesus tomou consigo Pedro, Tiago e João, seu irmão, e os levou a um alto monte. Transfigurou-se diante deles; o seu rosto resplandeceu como o sol. Eis que lhes apareceram Moisés e Elias. Uma voz dos céus disse: «Este é o meu Filho amado, em quem me comprazo; ouvi-o.»$luminous_4_txt$, $luminous_4_ref$Mt 17, 1-8$luminous_4_ref$, 0
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 4;

insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $luminous_4_c0a$São João Paulo II$luminous_4_c0a$, $luminous_4_c0s$Rosarium Virginis Mariae, n. 21 (16 de outubro de 2002)$luminous_4_c0s$, $luminous_4_c0t$Mistério de luz por excelência é a Transfiguração que, segundo a tradição, se deu no Monte Tabor. A glória da Divindade reluz no rosto de Cristo, enquanto o Pai O acredita aos Apóstolos extasiados para que O «escutem» (cf. Lc 9, 35 par) e se disponham a viver com Ele o momento doloroso da Paixão, a fim de chegarem com Ele à glória da Ressurreição e a uma vida transfigurada pelo Espírito Santo.$luminous_4_c0t$),
  (1, $luminous_4_c1a$Catecismo da Igreja Católica$luminous_4_c1a$, $luminous_4_c1s$CIC 554$luminous_4_c1s$, $luminous_4_c1t$A partir do dia em que Pedro confessou que Jesus era o Cristo, Filho do Deus vivo, o Mestre «começou a explicar aos seus discípulos que tinha de ir a Jerusalém e lá sofrer [...], que tinha de ser morto e ressuscitar ao terceiro dia» (Mt 16, 21). Pedro rejeita este anúncio e os outros também não o entendem (312). É neste contexto que se situa o episódio misterioso da transfiguração de Jesus (313), no cimo duma alta montanha, perante três testemunhas por Ele escolhidas: Pedro, Tiago e João. O rosto e as vestes de Jesus tornaram-se fulgurantes de luz, Moisés e Elias aparecem, «e falam da sua morte, que ia consumar-se em Jerusalém» (Lc 9, 31). Uma nuvem envolve-os e uma voz do céu diz: «Este é o meu Filho predilecto: escutai-O» (Lc 9, 35).$luminous_4_c1t$),
  (2, $luminous_4_c2a$Catecismo da Igreja Católica$luminous_4_c2a$, $luminous_4_c2s$CIC 555$luminous_4_c2s$, $luminous_4_c2t$Por um momento, Jesus mostra a sua glória divina, confirmando assim a confissão de Pedro. Mostra também que, para «entrar na sua glória» (Lc 24, 26), tem de passar pela cruz em Jerusalém. Moisés e Elias tinham visto a glória de Deus sobre a montanha; a Lei e os Profetas tinham anunciado os sofrimentos do Messias (314). A paixão de Jesus é da vontade do Pai: o Filho age como Servo de Deus (315). A nuvem indica a presença do Espírito Santo: «Tota Trinitas apparuit: Pater in voce; Filius in homine; Spiritus in nube clara – Apareceu toda a Trindade: o Pai na voz; o Filho na humanidade; o Espírito Santo na nuvem luminosa» (316):$luminous_4_c2t$),
  (3, $luminous_4_c3a$Catecismo da Igreja Católica$luminous_4_c3a$, $luminous_4_c3s$CIC 556$luminous_4_c3s$, $luminous_4_c3t$No limiar da vida pública, o baptismo; no limiar da Páscoa, a transfiguração. Pelo baptismo de Jesus «declaratum fuit mysterium primae regenerationis – foi declarado o mistério da (nossa) primeira regeneração» – o nosso Baptismo; e a transfiguração «est sacramentum secundae regenerationis – é o sacramento da (nossa) segunda regeneração» – a nossa própria ressurreição (318). Desde agora, nós participamos na ressurreição do Senhor pelo Espírito Santo que actua nos sacramentos do Corpo de Cristo. A transfiguração dá-nos um antegozo da vinda gloriosa de Cristo, «que transfigurará o nosso corpo miserável para o conformar com o seu corpo glorioso» (Fl 3, 21). Mas lembra-nos também que temos de passar por muitas tribulações para entrar no Reino de Deus» (Act 14, 22)…$luminous_4_c3t$),
  (4, $luminous_4_c4a$São Tomás de Aquino$luminous_4_c4a$, $luminous_4_c4s$Suma Teológica, III, q. 45, a. 4, ad 2$luminous_4_c4s$, $luminous_4_c4t$… assim também na transfiguração, que é o sacramento da segunda regeneração, apareceu toda a Trindade: o Pai na voz, o Filho no homem, o Espírito Santo na nuvem luminosa; porque, assim como no Baptismo concede a inocência, simbolizada pela simplicidade da pomba, assim na ressurreição dará aos eleitos a claridade da glória e o refrigério de todo mal, simbolizados na nuvem luminosa.$luminous_4_c4t$),
  (5, $luminous_4_c5a$Liturgia bizantina$luminous_4_c5a$, $luminous_4_c5s$Kontakion na Festa da Transfiguração (Menaion; cf. CIC 555, nota 317)$luminous_4_c5s$, $luminous_4_c5t$«Transfiguraste-Te sobre a montanha e, na medida em que disso eram capazes, os teus discípulos contemplaram a tua glória, ó Cristo Deus; para que, quando Te vissem crucificado, compreendessem que a tua paixão era voluntária, e anunciassem ao mundo que Tu és verdadeiramente a irradiação do Pai»$luminous_4_c5t$),
  (6, $luminous_4_c6a$São João Paulo II$luminous_4_c6a$, $luminous_4_c6s$Audiência geral de 26 de abril de 2000 (texto condensado, não é citação verbal)$luminous_4_c6s$, $luminous_4_c6t$Na Transfiguração no Tabor antecipa-se o que a Páscoa realiza plenamente. Cristo manifesta glória e luz; Moisés e Elias convergem para Ele; a voz do Pai convida a escutá-Lo. Visão, escuta, contemplação e obediência conduzem ao monte onde a Trindade se revela na glória do Filho e fortalece a esperança diante da cruz e das tribulações.$luminous_4_c6t$),
  (7, $luminous_4_c7a$São João Paulo II$luminous_4_c7a$, $luminous_4_c7s$Rosarium Virginis Mariae, n. 9 (16 de outubro de 2002)$luminous_4_c7s$, $luminous_4_c7t$«Transfigurou-Se diante deles: o seu rosto resplandeceu como o sol» (Mt 17, 2). A cena evangélica da transfiguração de Cristo… pode ser tomada como ícone da contemplação cristã. Fixar os olhos no rosto de Cristo… até perceber o brilho divino definitivamente manifestado no Ressuscitado glorificado à direita do Pai, é a tarefa de cada discípulo de Cristo…$luminous_4_c7t$)
) as v(sort_order, author, source, text) on true
where m.type = 'luminous' and m.sort_order = 4;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $luminous_4_i0u$https://upload.wikimedia.org/wikipedia/commons/0/0e/Transfiguration_by_fra_Angelico_%28San_Marco_Cell_6%29.jpg$luminous_4_i0u$, $luminous_4_i0ti$Transfiguração de Cristo$luminous_4_i0ti$, $luminous_4_i0ar$Fra Angelico$luminous_4_i0ar$, $luminous_4_i0d$Museo di San Marco, Florença. Obra em domínio público; reprodução fotográfica PD-Art (Commons)$luminous_4_i0d$, 0, 'contain', 2
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 4;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $luminous_4_i1u$https://upload.wikimedia.org/wikipedia/commons/a/ab/Lorenzo_Lotto_-_Transfiguration_-_WGA13666.jpg$luminous_4_i1u$, $luminous_4_i1ti$Transfiguração de Cristo$luminous_4_i1ti$, $luminous_4_i1ar$Lorenzo Lotto$luminous_4_i1ar$, $luminous_4_i1d$Villa Colloredo Mels, Recanati. Obra em domínio público; reprodução fotográfica PD-Art (Commons / Web Gallery of Art)$luminous_4_i1d$, 1, 'contain', 2
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 4;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $luminous_4_i2u$https://upload.wikimedia.org/wikipedia/commons/d/d2/Duccio_di_Buoninsegna_-_Transfiguration_-_WGA06780.jpg$luminous_4_i2u$, $luminous_4_i2ti$The Transfiguration$luminous_4_i2ti$, $luminous_4_i2ar$Duccio di Buoninsegna$luminous_4_i2ar$, $luminous_4_i2d$National Gallery, Londres (NG1330). Obra em domínio público; reprodução fotográfica PD-Art (Commons)$luminous_4_i2d$, 2, 'contain', 2
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 4;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $luminous_4_i3u$https://images.metmuseum.org/CRDImages/dp/original/DP836956.jpg$luminous_4_i3u$, $luminous_4_i3ti$The Transfiguration with Christ flanked by two saints and with the Apostles below$luminous_4_i3ti$, $luminous_4_i3ar$Cherubino Alberti (Zaccaria Mattia)$luminous_4_i3ar$, $luminous_4_i3d$The Metropolitan Museum of Art, Nova Iorque (51.501.3784). Public Domain / Met Open Access (CC0)$luminous_4_i3d$, 3, 'contain', 2
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 4;

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $luminous_5_txt$Jesus tomou pão, o benzeu, e o partiu: «Tomai e comei, isto é o meu corpo.» … Tomando um cálice: «Bebei dele todos; porque isto é o meu sangue, o sangue da nova aliança, que será derramado por muitos para remissão dos pecados.»$luminous_5_txt$, $luminous_5_ref$Mt 26, 26-29$luminous_5_ref$, 0
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 5;

insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $luminous_5_c0a$São João Paulo II$luminous_5_c0a$, $luminous_5_c0s$Rosarium Virginis Mariae, § 21 (texto abreviado)$luminous_5_c0s$, $luminous_5_c0t$«… 5o na instituição da Eucaristia, expressão sacramental do mistério pascal. … Mistério de luz é, enfim, a instituição da Eucaristia, na qual Cristo Se faz alimento com o seu Corpo e o seu Sangue sob os sinais do pão e do vinho, testemunhando «até ao extremo» o seu amor pela humanidade (Jo 13, 1), por cuja salvação Se oferecerá em sacrifício.»$luminous_5_c0t$),
  (1, $luminous_5_c1a$Catecismo da Igreja Católica$luminous_5_c1a$, $luminous_5_c1s$CIC 1323$luminous_5_c1s$, $luminous_5_c1t$«O nosso Salvador instituiu na última ceia, na noite em que foi entregue, o sacrifício eucarístico do seu corpo e sangue, para perpetuar pelo decorrer dos séculos, até voltar, o sacrifício da cruz, confiando à Igreja, sua esposa amada, o memorial da sua morte e ressurreição: sacramento de piedade, sinal de unidade, vínculo de caridade, banquete pascal em que se recebe Cristo, a alma se enche de graça e nos é dado o penhor da glória futura».$luminous_5_c1t$),
  (2, $luminous_5_c2a$Catecismo da Igreja Católica$luminous_5_c2a$, $luminous_5_c2s$CIC 1324$luminous_5_c2s$, $luminous_5_c2t$A Eucaristia é «fonte e cume de toda a vida cristã». «Os restantes sacramentos, assim como todos os ministérios eclesiásticos e obras de apostolado, estão vinculados com a sagrada Eucaristia e a ela se ordenam. Com efeito, na santíssima Eucaristia está contido todo o tesouro espiritual da Igreja, isto é, o próprio Cristo, nossa Páscoa».$luminous_5_c2t$),
  (3, $luminous_5_c3a$Catecismo da Igreja Católica$luminous_5_c3a$, $luminous_5_c3s$CIC 1337$luminous_5_c3s$, $luminous_5_c3t$Tendo amado os seus, o Senhor amou-os até ao fim. Sabendo que era chegada a hora de partir deste mundo para regressar ao Pai, no decorrer duma refeição, lavou-lhes os pés e deu-lhes o mandamento do amor. Para lhes deixar uma garantia deste amor, para jamais se afastar dos seus e para os tornar participantes da sua Páscoa, instituiu a Eucaristia como memorial da sua morte e da sua ressurreição, e ordenou aos seus Apóstolos que a celebrassem até ao seu regresso, «constituindo-os, então, sacerdotes do Novo Testamento».$luminous_5_c3t$),
  (4, $luminous_5_c4a$Catecismo da Igreja Católica$luminous_5_c4a$, $luminous_5_c4s$CIC 611$luminous_5_c4s$, $luminous_5_c4t$A Eucaristia, que neste momento instituiu, será o «memorial» do seu sacrifício. Jesus incluiu os Apóstolos na sua própria oferenda e pediu-lhes que a perpetuassem. Desse modo, instituiu os Apóstolos como sacerdotes da Nova Aliança: «Eu consagro-me por eles, para que também eles sejam consagrados na verdade» (Jo 17, 19).$luminous_5_c4t$),
  (5, $luminous_5_c5a$São Tomás de Aquino$luminous_5_c5a$, $luminous_5_c5s$Suma Teológica, III, q. 73, a. 2$luminous_5_c5s$, $luminous_5_c5t$Pelo contrário, diz o Apóstolo em 1 Cor 10,17: ainda que sejamos muitos, somos um só pão e um só corpo, todos os que participamos de um só pão e de um só cálice. Donde se conclui que a Eucaristia é o sacramento da unidade eclesiástica. … Este sacramento está ordenado ao alimento espiritual … para a integridade deste sacramento concorrem o cibo espiritual e a bebida espiritual … Por isso este sacramento é materialmente múltiplo, mas um formal e perfeitivamente.$luminous_5_c5t$),
  (6, $luminous_5_c6a$São Tomás de Aquino$luminous_5_c6a$, $luminous_5_c6s$Suma Teológica, III, q. 73, a. 3$luminous_5_c6s$, $luminous_5_c6t$… Como o batismo se chama sacramento da fé, que é o fundamento da vida espiritual, assim a eucaristia se chama sacramento da caridade, que é o «vínculo da perfeição», como se diz em Cl 3,14.$luminous_5_c6t$)
) as v(sort_order, author, source, text) on true
where m.type = 'luminous' and m.sort_order = 5;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $luminous_5_i0u$https://upload.wikimedia.org/wikipedia/commons/b/bc/%C3%9Altima_Cena_-_Juan_de_Juanes.jpg$luminous_5_i0u$, $luminous_5_i0ti$La Última Cena (Instituição da Eucaristia)$luminous_5_i0ti$, $luminous_5_i0ar$Juan de Juanes (Vicente Juan Masip)$luminous_5_i0ar$, $luminous_5_i0d$Museo Nacional del Prado, Madrid. Obra em domínio público; reprodução PD-Art (Commons)$luminous_5_i0d$, 0, 'contain', 2
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 5;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $luminous_5_i1u$https://upload.wikimedia.org/wikipedia/commons/1/1a/Ercole_de'_Roberti_-_The_Institution_of_the_Eucharist_(National_Gallery%2C_London).jpg$luminous_5_i1u$, $luminous_5_i1ti$The Institution of the Eucharist$luminous_5_i1ti$, $luminous_5_i1ar$Ercole de' Roberti$luminous_5_i1ar$, $luminous_5_i1d$National Gallery, Londres. Obra em domínio público; reprodução PD-Art (Commons)$luminous_5_i1d$, 1, 'contain', 2
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 5;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $luminous_5_i2u$https://upload.wikimedia.org/wikipedia/commons/b/b0/Federico_Barocci_-_The_Institution_of_the_Eucharist_-_WGA01290.jpg$luminous_5_i2u$, $luminous_5_i2ti$Istituzione dell'Eucarestia (Communion of the Apostles)$luminous_5_i2ti$, $luminous_5_i2ar$Federico Barocci$luminous_5_i2ar$, $luminous_5_i2d$Basilica di Santa Maria sopra Minerva, Roma. Obra em domínio público; reprodução PD-Art (Commons)$luminous_5_i2d$, 2, 'contain', 2
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 5;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $luminous_5_i3u$https://images.metmuseum.org/CRDImages/ad/original/DP211990.jpg$luminous_5_i3u$, $luminous_5_i3ti$The Institution of the Eucharist at the Last Supper with St. Peter and St. Paul$luminous_5_i3ti$, $luminous_5_i3ar$Anónimo (Mexicano, meados do séc. XVI)$luminous_5_i3ar$, $luminous_5_i3d$The Metropolitan Museum of Art, Nova Iorque. Domínio público / Met Open Access (CC0)$luminous_5_i3d$, 3, 'contain', 2
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 5;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $luminous_5_i4u$https://upload.wikimedia.org/wikipedia/commons/4/46/Jacopo_Tintoretto_-_The_Last_Supper_-_WGA22649.jpg$luminous_5_i4u$, $luminous_5_i4ti$The Last Supper (San Giorgio Maggiore)$luminous_5_i4ti$, $luminous_5_i4ar$Jacopo Tintoretto$luminous_5_i4ar$, $luminous_5_i4d$Chiesa di San Giorgio Maggiore, Veneza. Obra em domínio público; reprodução PD-Art (Commons)$luminous_5_i4d$, 4, 'contain', 2
from public.mysteries m
where m.type = 'luminous' and m.sort_order = 5;

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $sorrowful_1_txt$Foi Jesus com eles a Getsemani. … Prostrou-se com o rosto em terra: «Meu Pai, se é possível, passe de mim este cálice! Todavia não se faça como eu quero, mas sim como tu queres.» … «Vigiai e orai, para que não entreis em tentação.»$sorrowful_1_txt$, $sorrowful_1_ref$Mt 26, 36-46$sorrowful_1_ref$, 0
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 1;

insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $sorrowful_1_c0a$Catecismo da Igreja Católica$sorrowful_1_c0a$, $sorrowful_1_c0s$CIC 612$sorrowful_1_c0s$, $sorrowful_1_c0t$O cálice da Nova Aliança, que Jesus antecipou na Ceia, oferecendo-Se a Si mesmo, é aceite seguidamente por Jesus das mãos do Pai, na agonia no Getsêmani, fazendo-Se «obediente até á morte» (Fl 2, 8). Na sua oração, Jesus diz: «Meu Pai, se é possível, que se afaste de Mim este cálice [...]» (Mt 26, 39). Exprime desse modo o horror que a morte representa para a sua natureza humana. … Aceitando, com a sua vontade humana, que se faça a vontade do Pai, aceita a sua morte enquanto redentora, para «suportar os nossos pecados no seu corpo, no madeiro da cruz» (1 Pe 2, 24).$sorrowful_1_c0t$),
  (1, $sorrowful_1_c1a$São Tomás de Aquino$sorrowful_1_c1a$, $sorrowful_1_c1s$Suma Teológica, III, q. 46, a. 6$sorrowful_1_c1s$, $sorrowful_1_c1t$… em Cristo padecente houve verdadeira dor sensível e dor interior, a que se chama tristeza. Ambas foram em Cristo as maiores entre as dores da vida presente. … A causa da dor interior foi, em primeiro lugar, todos os pecados do género humano, pelos quais, padecendo, dava satisfação … em segundo lugar, especialmente a ruína dos discípulos escandalizados na paixão … em terceiro, a perda da vida corporal, naturalmente horrível à natureza humana. … A alma captava de modo intenso todas as causas de tristeza …$sorrowful_1_c1t$),
  (2, $sorrowful_1_c2a$Santo Afonso Maria de Ligório$sorrowful_1_c2a$, $sorrowful_1_c2s$*A Paixão de Nosso Senhor Jesus Cristo*, meditação de segunda-feira — Do suor de sangue e agonia de Jesus no horto, §1-3 (texto abreviado)$sorrowful_1_c2s$, $sorrowful_1_c2t$… chegando ao jardim de Getsêmani, quis dar começo à sua dolorosa paixão, permitindo que o temor, o tédio e a tristeza viessem afligi-Lo … «Meu Pai, se for possível, afastai de mim este cálice?» … O que propriamente afligiu o Coração de Jesus no horto não foi tanto a previsão dos tormentos … como a previsão dos nossos pecados … reduziu-O à agonia e fez-O suar sangue … «Pai, se é possível, passe de mim este cálice; todavia não seja como eu quero, mas sim como tu.»$sorrowful_1_c2t$),
  (3, $sorrowful_1_c3a$São João Crisóstomo$sorrowful_1_c3a$, $sorrowful_1_c3s$*Homilias sobre São Mateus*, homilia 83 (Mt 26, 36-51) (texto abreviado)$sorrowful_1_c3s$, $sorrowful_1_c3t$… costumava orar separado deles, para nos ensinar silêncio e recolhimento na oração … «Se é possível, que este cálice passe de mim; contudo, não como eu quero, mas como tu.» … Ao dizer isto, mostrou o humano; ao acrescentar «não a minha vontade, mas a tua», a virtude … ensina-nos a seguir a Deus ainda quando a natureza recua … o suor como gotas de sangue e o anjo que O conforta, para que ninguém diga que a tristeza era fingida.$sorrowful_1_c3t$),
  (4, $sorrowful_1_c4a$São João Paulo II$sorrowful_1_c4a$, $sorrowful_1_c4s$Carta aos sacerdotes para o Jueves Santo de 1987, secção «Entre o Cenáculo e Getsemani» (texto condensado, não é citação verbal)$sorrowful_1_c4s$, $sorrowful_1_c4t$Depois da Última Ceia, Jesus dirige-Se ao monte das Oliveiras. Ora para que «passe deste cálice», manifestando perante o Pai e os homens o peso da expiação que vai assumir. Permanece com toda a verdade da humanidade oprimida: «Triste está a minha alma até à morte.» Na oração do Getsêmani exprime o temor próprio do homem e, ao mesmo tempo, a adesão filial à vontade do Pai.$sorrowful_1_c4t$),
  (5, $sorrowful_1_c5a$Bento XVI$sorrowful_1_c5a$, $sorrowful_1_c5s$Audiência geral, 1 de fevereiro de 2012 — oração de Jesus no Getsêmani (texto condensado, não é citação verbal)$sorrowful_1_c5s$, $sorrowful_1_c5t$Jesus experimenta medo e angústia à iminência da Paixão e convida Pedro, Tiago e João a vigiar com Ele. Prostra-Se e pede que passe o cálice, mas conclui: que não se faça o que Ele quer, mas o que o Pai quer. Na unidade da pessoa do Filho, a vontade humana encontra pleno realização no «sim» ao Abbá; Jesus reporta a vontade humana ao «sim» pleno a Deus, reparando o «não» de Adão.$sorrowful_1_c5t$),
  (6, $sorrowful_1_c6a$São João Paulo II$sorrowful_1_c6a$, $sorrowful_1_c6s$Audiência geral, 3 de fevereiro de 1988 (texto condensado, não é citação verbal)$sorrowful_1_c6s$, $sorrowful_1_c6t$No Getsêmani, a tristeza de Jesus alcança intensidade particular: «A minha alma está triste até à morte.» Contemplamos aí a humanidade do Senhor diante da morte e, ao mesmo tempo, a obediência filial que entrega o destino ao Pai — modelo para a nossa oração nas provações.$sorrowful_1_c6t$)
) as v(sort_order, author, source, text) on true
where m.type = 'sorrowful' and m.sort_order = 1;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $sorrowful_1_i0u$https://images.metmuseum.org/CRDImages/ep/original/DP136373.jpg$sorrowful_1_i0u$, $sorrowful_1_i0ti$The Agony in the Garden$sorrowful_1_i0ti$, $sorrowful_1_i0ar$Raphael (Raffaello Sanzio)$sorrowful_1_i0ar$, $sorrowful_1_i0d$The Metropolitan Museum of Art, Nova Iorque. Domínio público / Met Open Access (CC0)$sorrowful_1_i0d$, 0, 'contain', 2
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 1;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $sorrowful_1_i1u$https://images.metmuseum.org/CRDImages/dp/original/DP815774.jpg$sorrowful_1_i1u$, $sorrowful_1_i1ti$Agony in the Garden$sorrowful_1_i1ti$, $sorrowful_1_i1ar$Albrecht Dürer$sorrowful_1_i1ar$, $sorrowful_1_i1d$The Metropolitan Museum of Art, Nova Iorque. Domínio público / Met Open Access (CC0)$sorrowful_1_i1d$, 1, 'contain', 2
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 1;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $sorrowful_1_i2u$https://images.metmuseum.org/CRDImages/ep/original/DP-23235-001.jpg$sorrowful_1_i2u$, $sorrowful_1_i2ti$The Agony in the Garden$sorrowful_1_i2ti$, $sorrowful_1_i2ar$Nicolas Poussin$sorrowful_1_i2ar$, $sorrowful_1_i2d$The Metropolitan Museum of Art, Nova Iorque. Domínio público / Met Open Access (CC0)$sorrowful_1_i2d$, 2, 'contain', 2
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 1;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $sorrowful_1_i3u$https://upload.wikimedia.org/wikipedia/commons/a/a3/Mantegna%2C_Andrea_-_Agony_in_the_Garden_-_National_Gallery%2C_London.jpg$sorrowful_1_i3u$, $sorrowful_1_i3ti$The Agony in the Garden$sorrowful_1_i3ti$, $sorrowful_1_i3ar$Andrea Mantegna$sorrowful_1_i3ar$, $sorrowful_1_i3d$National Gallery, Londres. Obra em domínio público; reprodução PD-Art (Commons)$sorrowful_1_i3d$, 3, 'contain', 2
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 1;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $sorrowful_1_i4u$https://upload.wikimedia.org/wikipedia/commons/1/10/Bellini%2CGiovanni_-_Agony_in_the_Garden_-_National_Gallery.jpg$sorrowful_1_i4u$, $sorrowful_1_i4ti$Agony in the Garden$sorrowful_1_i4ti$, $sorrowful_1_i4ar$Giovanni Bellini$sorrowful_1_i4ar$, $sorrowful_1_i4d$National Gallery, Londres. Obra em domínio público; reprodução PD-Art (Commons)$sorrowful_1_i4d$, 4, 'contain', 2
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 1;

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $sorrowful_2_txt$Então Pilatos mandou flagelar a Jesus, e o entregou para ser crucificado.$sorrowful_2_txt$, $sorrowful_2_ref$Mt 27, 26$sorrowful_2_ref$, 0
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 2;

insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $sorrowful_2_c0a$São Tomás de Aquino$sorrowful_2_c0a$, $sorrowful_2_c0s$Comentário ao Evangelho de São João, cap. 19, lição 1, nn. 2372–2373$sorrowful_2_c0s$, $sorrowful_2_c0t$Pilatos tomou Jesus e o flagelou por meio dos soldados, esperando que os judeus, saciados com aquelas injúrias, deixassem de exigir a morte. … Estes, porém, moviam-se contra Cristo por ódio, e por isso a flagelação não bastava. … Será que esta intenção desculpa Pilatos? Não: afligir um inocente, e sobretudo o Filho de Deus, é sumamente mau por si; nenhuma intenção o desculpa.$sorrowful_2_c0t$),
  (1, $sorrowful_2_c1a$São Tomás de Aquino$sorrowful_2_c1a$, $sorrowful_2_c1s$Suma Teológica, III, q. 47, a. 4$sorrowful_2_c1s$, $sorrowful_2_c1t$Convinha que Cristo começasse a padecer por parte dos judeus e que, depois de ser entregue por eles, a sua paixão se concluísse por mãos dos gentios — como o Senhor disse que o entregariam «aos gentios para ser escarnecido, flagelado e crucificado» (Mt 20, 19).$sorrowful_2_c1t$),
  (2, $sorrowful_2_c2a$Santo Agostinho$sorrowful_2_c2a$, $sorrowful_2_c2s$Tratados sobre o Evangelho de João, Tratado 116, §1$sorrowful_2_c2s$, $sorrowful_2_c2t$Então Pilatos tomou a Jesus e açoitou-o… para que os judeus, saciados com as injúrias, cessassem de se enfurecer até à morte dele. … O reino que não era deste mundo vencia o soberbo mundo não pela atrocidade de pelejar, mas pela humildade de padecer; aquele grão, que se havia de multiplicar, era semeado em horrível ultraje, para brotar em admirável glória.$sorrowful_2_c2t$),
  (3, $sorrowful_2_c3a$São João Crisóstomo$sorrowful_2_c3a$, $sorrowful_2_c3s$Homilias sobre o Evangelho de São Mateus, homilia 87 (Mt 27, 27–29)$sorrowful_2_c3s$, $sorrowful_2_c3t$Que desculpa teremos nós, depois disto, se nos deixamos mover por injúrias, quando Cristo padeceu estas coisas? … Não um membro apenas, mas todo o corpo foi objecto de insolência: a cabeça pela coroa e pelas bofetadas, o rosto cuspido, as faces feridas, todo o corpo pelos vergões… Que poderia ser mais grave?$sorrowful_2_c3t$),
  (4, $sorrowful_2_c4a$Santo Afonso Maria de Ligório$sorrowful_2_c4a$, $sorrowful_2_c4s$*Meditações para todos os dias e festas do ano*, Segunda Meditação para a Segunda-feira Santa («Jesus preso à coluna e flagelado»)$sorrowful_2_c4s$, $sorrowful_2_c4t$Contemplemos como os algozes começam a bater por toda a parte em nosso divino Redentor. Seu corpo virginal primeiro torna-se roxo; depois corre o sangue com tanta abundância… Pelo que o Senhor ficou transfigurado como um leproso, coberto de chagas desde a cabeça até aos pés. … Declara-O inocente, e depois manda-O castigar!$sorrowful_2_c4t$),
  (5, $sorrowful_2_c5a$Catecismo da Igreja Católica$sorrowful_2_c5a$, $sorrowful_2_c5s$CIC 572$sorrowful_2_c5s$, $sorrowful_2_c5t$Os sofrimentos de Jesus tomaram a sua forma histórica concreta, pelo facto de Ele ter sido «rejeitado pelos anciãos, pelos sumos sacerdotes e pelos escribas» (Mc 8, 31), que «O entregaram aos pagãos para ser escarnecido, flagelado e crucificado» (Mt 20, 19).$sorrowful_2_c5t$),
  (6, $sorrowful_2_c6a$Catecismo da Igreja Católica$sorrowful_2_c6a$, $sorrowful_2_c6s$CIC 1851$sorrowful_2_c6s$, $sorrowful_2_c6t$É precisamente na paixão, em que a misericórdia de Cristo o vai vencer, que o pecado manifesta melhor a sua violência e a sua multiplicidade: incredulidade, ódio assassino, rejeição e escárnio por parte dos chefes e do povo, cobardia de Pilatos e crueldade dos soldados, traição de Judas tão dura para Jesus, negação de Pedro e abandono dos discípulos. No entanto, mesmo na hora das trevas e do príncipe deste mundo, o sacrifício de Cristo torna-se secretamente a fonte de onde brotará, inesgotável, o perdão dos nossos pecados.$sorrowful_2_c6t$),
  (7, $sorrowful_2_c7a$Bento XVI$sorrowful_2_c7a$, $sorrowful_2_c7s$Discurso após o Rosário, Basílica de Santa Maria Maior, 3 de maio de 2008 (texto condensado, não é citação verbal)$sorrowful_2_c7s$, $sorrowful_2_c7t$Ao recitar o Rosário revivem-se os momentos da história da salvação e as etapas da missão de Cristo; com Maria o coração se orienta para o mistério de Jesus, meditando os santos mistérios de dor entre os de alegria, luz e glória, para acolher a graça que deles brota.$sorrowful_2_c7t$)
) as v(sort_order, author, source, text) on true
where m.type = 'sorrowful' and m.sort_order = 2;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $sorrowful_2_i0u$https://images.metmuseum.org/CRDImages/ep/original/DT6075.jpg$sorrowful_2_i0u$, $sorrowful_2_i0ti$The Flagellation; (reverse) The Madonna of Mercy$sorrowful_2_i0ti$, $sorrowful_2_i0ar$Girolamo Romanino (ca. 1484/87–1560)$sorrowful_2_i0ar$, $sorrowful_2_i0d$The Metropolitan Museum of Art, Nova Iorque. Obra e imagem em domínio público (Met Open Access / CC0)$sorrowful_2_i0d$, 0, 'contain', 2
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 2;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $sorrowful_2_i1u$https://images.metmuseum.org/CRDImages/ep/original/DP296527.jpg$sorrowful_2_i1u$, $sorrowful_2_i1ti$Saint Mary Magdalen Holding a Crucifix; (reverse) The Flagellation$sorrowful_2_i1ti$, $sorrowful_2_i1ar$Spinello Aretino (Spinello di Luca Spinelli, ca. 1345–1410)$sorrowful_2_i1ar$, $sorrowful_2_i1d$The Metropolitan Museum of Art, Nova Iorque. Obra em domínio público (Met: Public Domain)$sorrowful_2_i1d$, 1, 'contain', 2
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 2;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $sorrowful_2_i2u$https://images.metmuseum.org/CRDImages/ep/original/DP164873.jpg$sorrowful_2_i2u$, $sorrowful_2_i2ti$The Flagellation$sorrowful_2_i2ti$, $sorrowful_2_i2ar$Master of the Berswordt Altar (activo ca. 1400–35)$sorrowful_2_i2ar$, $sorrowful_2_i2d$The Metropolitan Museum of Art, Nova Iorque. Pintura gótica em domínio público (Met collection)$sorrowful_2_i2d$, 2, 'contain', 2
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 2;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $sorrowful_2_i3u$https://upload.wikimedia.org/wikipedia/commons/a/ad/The_Flagellation_of_Christ-Caravaggio_(1607).jpg$sorrowful_2_i3u$, $sorrowful_2_i3ti$The Flagellation of Christ$sorrowful_2_i3ti$, $sorrowful_2_i3ar$Caravaggio (Michelangelo Merisi, 1571–1610)$sorrowful_2_i3ar$, $sorrowful_2_i3d$Museo di Capodimonte, Nápoles. Domínio público (PD-Art; autor falecido 1610)$sorrowful_2_i3d$, 3, 'contain', 2
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 2;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $sorrowful_2_i4u$https://upload.wikimedia.org/wikipedia/commons/5/55/Titian_-_The_Scourging_of_Christ_-_WGA22826.jpg$sorrowful_2_i4u$, $sorrowful_2_i4ti$Scourged Christ (Cristo flagellato)$sorrowful_2_i4ti$, $sorrowful_2_i4ar$Tiziano (Titian, ca. 1488–1576)$sorrowful_2_i4ar$, $sorrowful_2_i4d$Galleria Borghese, Roma. Domínio público (PD-Art; WGA/Commons)$sorrowful_2_i4d$, 4, 'contain', 2
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 2;

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $sorrowful_3_txt$Os soldados conduziram Jesus ao pretório, … teceram uma coroa de espinhos, puseram-na na sua cabeça, e zombavam dele: «Salve, rei dos Judeus!»$sorrowful_3_txt$, $sorrowful_3_ref$Mt 27, 27-31$sorrowful_3_ref$, 0
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 3;

insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $sorrowful_3_c0a$Catecismo da Igreja Católica$sorrowful_3_c0a$, $sorrowful_3_c0s$CIC 440$sorrowful_3_c0s$, $sorrowful_3_c0t$Jesus aceitou a profissão de fé de Pedro, que O reconhecia como o Messias, anunciando a paixão próxima do Filho do Homem. Revelou o conteúdo autêntico da sua realeza messiânica, ao mesmo tempo na identidade transcendente do Filho do Homem «que desceu do céu» (Jo 3, 13) e na sua missão redentora como Servo sofredor: «O Filho do Homem […] não veio para ser servido, veio para servir e dar a vida como resgate pela multidão» (Mt 20, 28). Foi por isso que o verdadeiro sentido da sua realeza só se manifestou do cimo da cruz. E só depois da ressurreição, a sua realeza messiânica poderá ser proclamada por Pedro perante o Povo de Deus: «Saiba, com absoluta certeza, toda a casa de Israel, que Deus fez Senhor e Messias esse Jesus que vós crucificastes» (Act 2, 36).$sorrowful_3_c0t$),
  (1, $sorrowful_3_c1a$Catecismo da Igreja Católica$sorrowful_3_c1a$, $sorrowful_3_c1s$CIC 572$sorrowful_3_c1s$, $sorrowful_3_c1t$A Igreja permanece fiel à «interpretação de todas as Escrituras» dada pelo próprio Jesus, tanto antes como depois da sua Páscoa […] «Não tinha o Messias de sofrer tudo isto, para entrar na sua glória?» (Lc 24, 26). Os sofrimentos de Jesus tomaram a sua forma histórica concreta, pelo facto de Ele ter sido «rejeitado pelos anciãos, pelos sumos sacerdotes e pelos escribas» (Mc 8, 31), que «O entregaram aos pagãos para ser escarnecido, flagelado e crucificado» (Mt 20, 19).$sorrowful_3_c1t$),
  (2, $sorrowful_3_c2a$São Tomás de Aquino$sorrowful_3_c2a$, $sorrowful_3_c2s$Suma Teológica, III, q. 46, a. 3$sorrowful_3_c2s$, $sorrowful_3_c2t$… Segundo, porque com isto nos deu exemplo de obediência, humildade, constância, justiça e das demais virtudes manifestadas na paixão de Cristo, necessárias para a salvação dos homens. Por isso se diz em 1 Pd 2,21: «Cristo padeceu por nós, deixando-nos exemplo para que sigamos as suas pegadas.» …$sorrowful_3_c2t$),
  (3, $sorrowful_3_c3a$São Tomás de Aquino$sorrowful_3_c3a$, $sorrowful_3_c3s$Suma Teológica, III, q. 46, a. 5$sorrowful_3_c3s$, $sorrowful_3_c3t$… Cristo padeceu em honra e glória pelas zombarias e contumélias que lhe infligiram … Terceiro, quanto aos membros do corpo: padeceu na cabeça com a coroa de espinhos que a penetravam; nas mãos e nos pés com a fixação dos cravos; no rosto com as bofetadas e a saliva; e em todo o corpo com os azorragues. …$sorrowful_3_c3t$),
  (4, $sorrowful_3_c4a$São Bernardo de Claraval$sorrowful_3_c4a$, $sorrowful_3_c4s$Sermão 2, Solenidade de Todos os Santos (Liturgia das Horas, v. IV; PL 183)$sorrowful_3_c4s$, $sorrowful_3_c4t$Enquanto isto não sucede, a nossa Cabeça não como é, mas como se fez por nós, se nos apresenta: não coroada de glória, mas com os espinhos dos nossos pecados. É uma vergonha fazer-se membro delicado sob uma cabeça coroada de espinhos. Por enquanto a púrpura não lhe é sinal de honra, mas de zombaria; será sinal de honra quando Cristo vier …$sorrowful_3_c4t$),
  (5, $sorrowful_3_c5a$Liturgia da Igreja (meditação Via-Sacra, Santa Sé)$sorrowful_3_c5a$, $sorrowful_3_c5s$Via-Sacra 2007, 6.ª estação — Jesus flagelado e coroado de espinhos (Jo 19, 2-3)$sorrowful_3_c5s$, $sorrowful_3_c5t$… Eis uma coroa cujos esplendores são ramos de espinhos; a púrpura real é substituída por um manto vermelho … Jesus é humilhado como rei do ridículo; mas, na realidade, é o verdadeiro soberano da história. …$sorrowful_3_c5t$),
  (6, $sorrowful_3_c6a$Papa Francisco$sorrowful_3_c6a$, $sorrowful_3_c6s$Homilia do Domingo de Ramos, 28 de março de 2021 (texto condensado, não é citação verbal)$sorrowful_3_c6s$, $sorrowful_3_c6t$Contemplamos o Senhor coroado de espinhos em vez de glória, insultado e vexado, despojado de tudo: a humilhação extrema pela qual, no caminho da Páscoa, revela a realeza do serviço e do amor até ao fim.$sorrowful_3_c6t$)
) as v(sort_order, author, source, text) on true
where m.type = 'sorrowful' and m.sort_order = 3;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $sorrowful_3_i0u$https://images.metmuseum.org/CRDImages/ep/original/DP-26164-001.jpg$sorrowful_3_i0u$, $sorrowful_3_i0ti$Christ Crowned with Thorns (Ecce Homo), and the Mourning Virgin (Mater Dolorosa)$sorrowful_3_i0ti$, $sorrowful_3_i0ar$Adriaen Isenbrant$sorrowful_3_i0ar$, $sorrowful_3_i0d$The Metropolitan Museum of Art, Nova Iorque (04.32). CC0 (Met Open Access, domínio público)$sorrowful_3_i0d$, 0, 'contain', 2
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 3;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $sorrowful_3_i1u$https://upload.wikimedia.org/wikipedia/commons/6/64/Hendrick_ter_Brugghen_-_Christ_Crowned_with_Thorns_-_Google_Art_Project.jpg$sorrowful_3_i1u$, $sorrowful_3_i1ti$Christ Crowned with Thorns$sorrowful_3_i1ti$, $sorrowful_3_i1ar$Hendrick ter Brugghen$sorrowful_3_i1ar$, $sorrowful_3_i1d$Statens Museum for Kunst, Copenhaga (KMSsp365). Domínio público / SMK Open (Commons)$sorrowful_3_i1d$, 1, 'contain', 2
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 3;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $sorrowful_3_i2u$https://upload.wikimedia.org/wikipedia/commons/b/bf/Hieronymus_Bosch_-_Christ_Mocked_(The_Crowning_with_Thorns)_-_Google_Art_Project.jpg$sorrowful_3_i2u$, $sorrowful_3_i2ti$Christ Mocked (The Crowning with Thorns)$sorrowful_3_i2ti$, $sorrowful_3_i2ar$Hieronymus Bosch$sorrowful_3_i2ar$, $sorrowful_3_i2d$National Gallery, Londres (NG4744). Obra em domínio público; reprodução PD-Art (Commons / Google Art Project)$sorrowful_3_i2d$, 2, 'contain', 2
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 3;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $sorrowful_3_i3u$https://cdn.staedelmuseum.de/images/ed/d3/hm12/thumb-xl.jpg$sorrowful_3_i3u$, $sorrowful_3_i3ti$Dornenkrönung / Christ Crowned with Thorns$sorrowful_3_i3ti$, $sorrowful_3_i3ar$Hans Holbein the Elder$sorrowful_3_i3ar$, $sorrowful_3_i3d$Städel Museum, Frankfurt (HM 12). Obra em domínio público (séc. XVI); ficha oficial do museu$sorrowful_3_i3d$, 3, 'contain', 2
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 3;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $sorrowful_3_i4u$https://images.metmuseum.org/CRDImages/dp/original/DP819240.jpg$sorrowful_3_i4u$, $sorrowful_3_i4ti$Christ Crowned with Thorns, from the Circular Passion$sorrowful_3_i4ti$, $sorrowful_3_i4ar$Lucas van Leyden$sorrowful_3_i4ar$, $sorrowful_3_i4d$The Metropolitan Museum of Art, Nova Iorque (40.41.6). CC0 (Met Open Access, domínio público)$sorrowful_3_i4d$, 4, 'contain', 2
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 3;

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $sorrowful_4_txt$Ele saiu, levando a sua cruz, para o lugar chamado Calvário, em hebraico Gólgota.$sorrowful_4_txt$, $sorrowful_4_ref$Jo 19, 17$sorrowful_4_ref$, 0
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 4;

insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $sorrowful_4_c0a$Catecismo da Igreja Católica$sorrowful_4_c0a$, $sorrowful_4_c0s$CIC 618$sorrowful_4_c0s$, $sorrowful_4_c0t$A cruz é o único sacrifício de Cristo, mediador único entre Deus e os homens. Mas porque, na sua pessoa divina encarnada, «Ele Se uniu, de certo modo, a cada homem», «a todos dá a possibilidade de se associarem a este mistério pascal, por um modo só de Deus conhecido». Convida os discípulos a tomarem a sua cruz e a segui-Lo porque sofreu por nós, deixando-nos o exemplo, para que sigamos os seus passos. De facto, quer associar ao seu sacrifício redentor aqueles mesmos que são os primeiros beneficiários. Isto realiza-se, em sumo grau, em sua Mãe, associada, mais intimamente do que ninguém, ao mistério do seu sofrimento redentor: «Há uma só escada verdadeira fora do paraíso; fora da cruz, não há outra escada por onde se suba ao céu».$sorrowful_4_c0t$),
  (1, $sorrowful_4_c1a$Santo Agostinho$sorrowful_4_c1a$, $sorrowful_4_c1s$De consensu evangelistarum, lib. III, cap. 37$sorrowful_4_c1s$, $sorrowful_4_c1t$… João narra: «E, carregando ele mesmo a sua cruz, saiu para o lugar chamado Calvário…» Donde se entende que ele mesmo carregava a cruz quando saía para aquele lugar. Mas aquele Simão foi obrigado no caminho, ao qual depois foi dada a cruz para a levar até ao lugar. Assim encontramos que ambas as coisas aconteceram: primeiro o que João disse, depois o que os outros três disseram.$sorrowful_4_c1t$),
  (2, $sorrowful_4_c2a$São Tomás de Aquino$sorrowful_4_c2a$, $sorrowful_4_c2s$Suma Teológica, III, q. 46, a. 4$sorrowful_4_c2s$, $sorrowful_4_c2t$Respondo que foi convenientíssimo que Cristo padecesse a morte de cruz. Primeiro, para exemplo de virtude… para que nenhum género de morte fosse temido pelo homem que vive rectamente, mostrou-se-lhe, na cruz daquele homem, o género de morte mais execrável e formidável. Segundo, porque este género de morte convinha sobretudo à satisfação pelo pecado do primeiro pai, que tomou o fruto da árvore proibida; por isso convinha que Cristo, para satisfazer por aquele pecado, se deixasse pregar no madeiro, quasi restituindo o que Adão tomara… Terceiro, como diz Crisóstomo, padecendo «em madeiro elevado» e não debaixo de tecto, purificou também a natureza do ar…$sorrowful_4_c2t$),
  (3, $sorrowful_4_c3a$São Bernardo de Claraval$sorrowful_4_c3a$, $sorrowful_4_c3s$Sermo in feria IV hebdomadae sanctae, 8 (SBO 5)$sorrowful_4_c3s$, $sorrowful_4_c3t$… Flagelado, coroado de espinhos, trespassado de cravos, afixado ao patíbulo, saturado de opróbrios, no entanto esquecido de todos os dolores, disse: «Perdoa-lhes»… Daí muitas misérias do corpo, daí muitas misericórdias do coração, daí dolores, daí compaixões, daí óleo de exultação, daí gotas de sangue que correm sobre a terra.$sorrowful_4_c3t$),
  (4, $sorrowful_4_c4a$São Bernardo de Claraval$sorrowful_4_c4a$, $sorrowful_4_c4s$De duobus pertinentibus ad opus humanae redemptionis (sermo)$sorrowful_4_c4s$, $sorrowful_4_c4t$… Não foi simples ou ligeira aquela exinanition: esvaziou-Se até à carne, até à morte, até à cruz (cf. Fl 2,7-8). Quem poderá pesar dignamente quanta humildade, mansidão e condescendência foi a do Senhor da majestade vestir-Se de carne, ser castigado com a morte, desfigurar-Se na cruz? … Lembra-te agora: embora tenhas sido feito do nada, não foste redimido por nada.$sorrowful_4_c4t$),
  (5, $sorrowful_4_c5a$São João Paulo II$sorrowful_4_c5a$, $sorrowful_4_c5s$Salvifici Doloris, § 25 (texto abreviado)$sorrowful_4_c5s$, $sorrowful_4_c5t$… Foi no Calvário que o sofrimento de Maria Santíssima, conjunto ao de Jesus, atingiu um ponto culminante… A sua subida ao Calvário e aquele seu «estar» aos pés da Cruz com o discípulo amado foram uma participação muito especial na morte redentora do Filho…$sorrowful_4_c5t$),
  (6, $sorrowful_4_c6a$São João Paulo II$sorrowful_4_c6a$, $sorrowful_4_c6s$Rosarium Virginis Mariae, § 22 (texto abreviado)$sorrowful_4_c6s$, $sorrowful_4_c6t$… E o quanto Lhe deverá custar esta adesão à vontade do Pai, emerge dos mistérios seguintes, nos quais, com a flagelação, a coroação de espinhos, a subida ao Calvário, a morte na cruz, Ele é lançado no maior desprezo: Ecce homo! … Os mistérios da dor levam o crente a reviver a morte de Jesus pondo-se aos pés da cruz junto de Maria…$sorrowful_4_c6t$),
  (7, $sorrowful_4_c7a$Diretório sobre Piedade Popular e Liturgia$sorrowful_4_c7a$, $sorrowful_4_c7s$§ 133 (texto abreviado)$sorrowful_4_c7s$, $sorrowful_4_c7t$Na Via Crucis confluem também diversas expressões da espiritualidade cristã: … o desejo de nos conformarmos profundamente com a Paixão de Cristo; as exigências da sequela de Cristo, segundo a qual o discípulo deve caminhar atrás do Mestre, levando cada dia a sua própria cruz (cf. Lc 9, 23).$sorrowful_4_c7t$)
) as v(sort_order, author, source, text) on true
where m.type = 'sorrowful' and m.sort_order = 4;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $sorrowful_4_i0u$https://upload.wikimedia.org/wikipedia/commons/f/fb/Giotto_-_Scrovegni_-_-34-_-_Road_to_Calvary.jpg$sorrowful_4_i0u$, $sorrowful_4_i0ti$Road to Calvary (La Salita al Calvario)$sorrowful_4_i0ti$, $sorrowful_4_i0ar$Giotto di Bondone$sorrowful_4_i0ar$, $sorrowful_4_i0d$Cappella degli Scrovegni / Civic Museums of Padua. Domínio público (obra); reprodução PD-Art (Commons)$sorrowful_4_i0d$, 0, 'contain', 2
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 4;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $sorrowful_4_i1u$https://images.metmuseum.org/CRDImages/rl/original/DP347226.jpg$sorrowful_4_i1u$, $sorrowful_4_i1ti$Christ Carrying the Cross$sorrowful_4_i1ti$, $sorrowful_4_i1ar$El Greco (Domenikos Theotokopoulos)$sorrowful_4_i1ar$, $sorrowful_4_i1d$The Metropolitan Museum of Art, New York (1975.1.145). CC0 (Met Open Access; domínio público)$sorrowful_4_i1d$, 1, 'contain', 2
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 4;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $sorrowful_4_i2u$https://images.metmuseum.org/CRDImages/ep/original/DP368972.jpg$sorrowful_4_i2u$, $sorrowful_4_i2ti$Christ Carrying the Cross$sorrowful_4_i2ti$, $sorrowful_4_i2ar$Jan Gossart (called Mabuse)$sorrowful_4_i2ar$, $sorrowful_4_i2d$The Metropolitan Museum of Art, New York (2016.39). CC0 (Met Open Access)$sorrowful_4_i2d$, 2, 'contain', 2
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 4;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $sorrowful_4_i3u$https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/Cornelis_van_Poelenburch%2C_Christ_Carrying_the_Cross%2C_early_1620s%2C_NGA_137505.jpg/1920px-Cornelis_van_Poelenburch%2C_Christ_Carrying_the_Cross%2C_early_1620s%2C_NGA_137505.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail$sorrowful_4_i3u$, $sorrowful_4_i3ti$Christ Carrying the Cross$sorrowful_4_i3ti$, $sorrowful_4_i3ar$Cornelis van Poelenburch$sorrowful_4_i3ar$, $sorrowful_4_i3d$National Gallery of Art, Washington (2007.49.1). Domínio público / imagem open access (NGA)$sorrowful_4_i3d$, 3, 'contain', 2
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 4;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $sorrowful_4_i4u$https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/Christ_Carrying_the_Cross_A18132.jpg/1920px-Christ_Carrying_the_Cross_A18132.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail$sorrowful_4_i4u$, $sorrowful_4_i4ti$Christ Carrying the Cross$sorrowful_4_i4ti$, $sorrowful_4_i4ar$Benvenuto di Giovanni$sorrowful_4_i4ar$, $sorrowful_4_i4d$National Gallery of Art, Washington (1952.5.52). Domínio público / open access (NGA; Kress Collection)$sorrowful_4_i4d$, 4, 'contain', 2
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 4;

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $sorrowful_5_txt$Quando chegaram ao lugar chamado Calvário, crucificaram-no ali. Jesus dizia: «Pai, perdoa-lhes, porque não sabem o que fazem.» … Um dos malfeitores: «Lembra-te de mim, quando entrares no teu reino.» Jesus respondeu: «Hoje estarás comigo no paraíso.» … Jesus clamou: «Pai, entrego-te o meu espírito.»$sorrowful_5_txt$, $sorrowful_5_ref$Lc 23, 33-46$sorrowful_5_ref$, 0
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 5;

insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.sort_order = 0
join (values
  (0, $sorrowful_5_c0a$Catecismo da Igreja Católica$sorrowful_5_c0a$, $sorrowful_5_c0s$CIC 618$sorrowful_5_c0s$, $sorrowful_5_c0t$A cruz é o único sacrifício de Cristo, mediador único entre Deus e os homens. Mas porque, na sua pessoa divina encarnada, «Ele Se uniu, de certo modo, a cada homem», «a todos dá a possibilidade de se associarem a este mistério pascal, por um modo só de Deus conhecido». Convida os discípulos a tomarem a sua cruz e a segui-Lo … De facto, quer associar ao seu sacrifício redentor aqueles mesmos que são os primeiros beneficiários. Isto realiza-se, em sumo grau, em sua Mãe, associada, mais intimamente do que ninguém, ao mistério do seu sofrimento redentor.$sorrowful_5_c0t$),
  (1, $sorrowful_5_c1a$Catecismo da Igreja Católica$sorrowful_5_c1a$, $sorrowful_5_c1s$CIC 964$sorrowful_5_c1s$, $sorrowful_5_c1t$O papel de Maria em relação à Igreja é inseparável da sua união com Cristo e decorre dela directamente. … É particularmente manifesta na hora da sua paixão: «A Bem-aventurada Virgem avançou na peregrinação de fé, e manteve fielmente a sua união com o seu Filho até à Cruz, junto da qual esteve de pé, não sem um desígnio divino; padeceu acerbamente com o seu Filho único e associou-se com coração de mãe ao seu sacrifício, consentindo amorosamente na imolação da vítima que d'Ela nascera; e, por fim, foi dada por mãe ao discípulo …: "Mulher, eis aí o teu filho" (Jo 19, 26-27)».$sorrowful_5_c1t$),
  (2, $sorrowful_5_c2a$São Tomás de Aquino$sorrowful_5_c2a$, $sorrowful_5_c2s$Suma Teológica, III, q. 46, a. 3 (texto abreviado)$sorrowful_5_c2s$, $sorrowful_5_c2t$Respondo que tanto mais conveniente é um modo de alcançar o fim, quanto mais coisas convirjam que sejam úteis ao fim. Ora, pelo facto de o homem ser libertado pela paixão de Cristo, muitas coisas concorreram para a salvação do homem, para além da libertação do pecado. Primeiro, o homem conhece quanto Deus o ama, e disto é provocado a amá-Lo, em que consiste a perfeição da salvação humana … Segundo, deu-nos exemplo de obediência, humilitade, constância, justiça … Terceiro … quarto … quinto … Por isso foi mais conveniente que fôssemos libertados pela paixão de Cristo do que só pela vontade de Deus.$sorrowful_5_c2t$),
  (3, $sorrowful_5_c3a$São Tomás de Aquino$sorrowful_5_c3a$, $sorrowful_5_c3s$Suma Teológica, III, q. 46, a. 4 (texto abreviado)$sorrowful_5_c3s$, $sorrowful_5_c3t$Respondo que foi em suma conveniente que Cristo padecesse a morte de cruz. Primeiro, por exemplo de virtude … para que nenhum género de morte fosse temido pelo homem que vive rectamente, mostrou-se-lhe a morte em cruz … Segundo, porque este género de morte era o mais conveniente para satisfazer pelo pecado … tomou o fruto da árvore proibida; por isso convinha que Cristo, para satisfazer por aquele pecado, se deixasse pregar no madeiro …$sorrowful_5_c3t$),
  (4, $sorrowful_5_c4a$Santo Agostinho$sorrowful_5_c4a$, $sorrowful_5_c4s$Sermão 218, De passione Domini (texto abreviado)$sorrowful_5_c4s$, $sorrowful_5_c4t$A Paixão de nosso Senhor e Salvador Jesus Cristo é para nós penhor de glória e exemplo de paciência. … Portanto, de modo algum devemos envergonhar-nos da morte de nosso Deus e Senhor; pelo contrário, nela devemos confiar e gloriar-nos acima de tudo. … Reconheçamos corajosamente, irmãos, e proclamemos bem alto que Cristo foi crucificado por amor de nós … não com vergonha, mas com santo orgulho. … Quanto a mim, que eu me glorie somente na cruz do Senhor nosso, Jesus Cristo (Gl 6, 14).$sorrowful_5_c4t$),
  (5, $sorrowful_5_c5a$São Bernardo de Claraval$sorrowful_5_c5a$, $sorrowful_5_c5s$Sermo in dom. infra oct. Assumptionis, 14-15 (texto abreviado)$sorrowful_5_c5s$, $sorrowful_5_c5t$Verdadeiramente, ó bem-aventurada Mãe, uma espada traspassou o teu coração. Pois só passando pelo teu coração a espada podia entrar na carne do teu Filho. … Assim a violência da dor traspassou o teu coração, e com razão te chamamos mais que mártir, pois o efeito da compaixão em ti ultrapassou a resistência ao sofrimento corporal. … Quem és tu … para te espantares mais com a compaixão de Maria do que com a paixão do Filho de Maria?$sorrowful_5_c5t$),
  (6, $sorrowful_5_c6a$São João Crisóstomo$sorrowful_5_c6a$, $sorrowful_5_c6s$Homilias sobre o Evangelho de São João, hom. 85 (Jo 19, 34) (texto abreviado)$sorrowful_5_c6s$, $sorrowful_5_c6t$Eis que saíram água e sangue. Não por acaso brotaram estas fontes, mas porque por estes dois juntos consiste a Igreja. … regenerados pela água e nutridos pelo Sangue e pela Carne. Daí têm origem os Mistérios; para que, quando te aproximares daquele cáliz, te aproximes como bebendo do próprio lado.$sorrowful_5_c6t$),
  (7, $sorrowful_5_c7a$São João Paulo II$sorrowful_5_c7a$, $sorrowful_5_c7s$Salvifici doloris, § 31 (texto abreviado)$sorrowful_5_c7s$, $sorrowful_5_c7t$Com Maria, Mãe de Cristo, que estava de pé junto à Cruz, nós detemos-nos junto a todas as cruzes do homem de hoje.$sorrowful_5_c7t$)
) as v(sort_order, author, source, text) on true
where m.type = 'sorrowful' and m.sort_order = 5;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $sorrowful_5_i0u$https://images.metmuseum.org/CRDImages/ep/original/DP146490.jpg$sorrowful_5_i0u$, $sorrowful_5_i0ti$The Crucifixion with the Virgin and Saint John$sorrowful_5_i0ti$, $sorrowful_5_i0ar$Hendrick ter Brugghen$sorrowful_5_i0ar$, $sorrowful_5_i0d$The Metropolitan Museum of Art, New York (56.228). CC0 (Met Open Access; domínio público)$sorrowful_5_i0d$, 0, 'contain', 2
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 5;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $sorrowful_5_i1u$https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a9/Pietro_Perugino_040.jpg/1920px-Pietro_Perugino_040.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail$sorrowful_5_i1u$, $sorrowful_5_i1ti$The Crucifixion with the Virgin, Saint John, Saint Jerome, and Saint Mary Magdalene (painel central)$sorrowful_5_i1ti$, $sorrowful_5_i1ar$Pietro Perugino$sorrowful_5_i1ar$, $sorrowful_5_i1d$National Gallery of Art, Washington (1937.1.27.b). Domínio público / open access NGA$sorrowful_5_i1d$, 1, 'contain', 2
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 5;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $sorrowful_5_i2u$https://upload.wikimedia.org/wikipedia/commons/f/fe/El_Greco_and_Workshop_-_Crucifixion_with_the_Virgin_Mary_and_Saint_John_the_Evangelist%2C_c._1600-1610.jpg$sorrowful_5_i2u$, $sorrowful_5_i2ti$Crucifixion with the Virgin Mary and Saint John the Evangelist$sorrowful_5_i2ti$, $sorrowful_5_i2ar$El Greco (e oficina)$sorrowful_5_i2ar$, $sorrowful_5_i2d$Philadelphia Museum of Art. PD-Art / domínio público (Commons)$sorrowful_5_i2d$, 2, 'contain', 2
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 5;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $sorrowful_5_i3u$https://upload.wikimedia.org/wikipedia/commons/1/1a/Carlo_Crivelli_-_Crucifix_with_the_Virgin_and_St_John_the_Evangelist_-_WGA5786.jpg$sorrowful_5_i3u$, $sorrowful_5_i3ti$Crucifixion with the Virgin and St John the Evangelist$sorrowful_5_i3ti$, $sorrowful_5_i3ar$Carlo Crivelli$sorrowful_5_i3ar$, $sorrowful_5_i3d$Pinacoteca di Brera, Milão (197). PD-Art (Commons / Web Gallery of Art)$sorrowful_5_i3d$, 3, 'contain', 2
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 5;

insert into public.images (mystery_id, url, title, artist, description, sort_order, resize_mode, rotate_every_n_hail_marys)
select m.id, $sorrowful_5_i4u$https://upload.wikimedia.org/wikipedia/commons/d/df/CrucifixionVanDyckLouvre.jpg$sorrowful_5_i4u$, $sorrowful_5_i4ti$Christ Crucified with the Virgin, Saint John and Mary Magdalene (*Le Calvaire*)$sorrowful_5_i4ti$, $sorrowful_5_i4ar$Anthony van Dyck$sorrowful_5_i4ar$, $sorrowful_5_i4d$Musée du Louvre, Paris (INV 2028). PD-Art (Commons)$sorrowful_5_i4d$, 4, 'contain', 2
from public.mysteries m
where m.type = 'sorrowful' and m.sort_order = 5;

update public.mysteries set meditation_ready = true;
