-- Passagem dona dos comentários e pacote curado da Anunciação.

alter table public.mysteries
  add column if not exists meditation_ready boolean not null default false;

alter table public.commentaries
  add column if not exists passage_id uuid references public.passages (id) on delete cascade;

create index if not exists commentaries_passage_id_idx
  on public.commentaries (passage_id);

delete from public.passages p
using public.mysteries m
where p.mystery_id = m.id
  and m.type = 'joyful'
  and m.sort_order = 1
  and p.reference in ('Lc 1, 26-38', 'Is 7, 14');

delete from public.commentaries c
using public.mysteries m
where c.mystery_id = m.id
  and m.type = 'joyful'
  and m.sort_order = 1
  and c.passage_id is null;

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $passage$Estando Isabel no sexto mês, foi enviado por Deus o anjo Gabriel a uma cidade da Galileia, chamada Nazaré, a uma virgem desposada com um varão, chamado José, da casa de David; o nome da virgem era Maria.$passage$, 'Lc 1, 26-27', 0
from public.mysteries m
where m.type = 'joyful'
  and m.sort_order = 1
  and not exists (
    select 1 from public.passages p
    where p.mystery_id = m.id and p.reference = 'Lc 1, 26-27'
  );

insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text::text, v.author::text, v.source::text, v.sort_order::int
from public.mysteries m
join public.passages p
  on p.mystery_id = m.id and p.reference = 'Lc 1, 26-27'
join (
  values
  (0, $c0a$São Tomás de Aquino$c0a$, $c0s$Suma Teológica, III, q. 30, a. 1$c0s$, $c0t$Era conveniente que fosse anunciado à bem-aventurada Virgem que ela havia de conceber Cristo. Primeiro, para que se guardasse a devida ordem na união do Filho de Deus com a Virgem, a saber, que primeiro sua mente fosse instruída acerca d’Ele, antes de O conceber na carne. Segundo, para que pudesse ser testemunha mais certa deste mistério… Terceiro, para que oferecesse a Deus os dons voluntários de sua obediência, para o que se mostrou pronta, dizendo: Eis a serva do Senhor. Em quarto lugar, para mostrar que existe um certo matrimônio espiritual entre o Filho de Deus e a natureza humana. E por isso, na Anunciação, era solicitado o consentimento da Virgem em lugar de toda a natureza humana.$c0t$),
  (1, $c1a$São Tomás de Aquino$c1a$, $c1s$Suma Teológica, III, q. 30, a. 2$c1s$, $c1t$Convinha que fosse anunciado à Mãe de Deus por um Anjo o mistério da divina encarnação, por três razões. Primeiro, para que também nisto se conservasse a ordenação divina, segundo a qual as coisas divinas chegam aos homens por meio dos Anjos. Segundo, isto foi conveniente à restauração da natureza humana… (porque a ruína começou pela serpente enviada à mulher, o reparo começa pelo anjo enviado à Virgem). Terceiro, porque isto convinha à virgindade da Mãe de Deus. Por isso Jerônimo diz: É conveniente que um anjo seja enviado à Virgem, porque a virgindade é sempre aparentada com os anjos.$c1t$),
  (2, $c2a$Santo Agostinho$c2a$, $c2s$De sancta virginitate, 3$c2s$, $c2t$Maria é mais bem-aventurada por receber a fé de Cristo do que por conceber a carne de Cristo$c2t$),
  (3, $c3a$São João Paulo II$c3a$, $c3s$Audiências gerais de 4 e 18 de setembro de 1996 (texto condensado, não é citação verbal)$c3s$, $c3t$No mistério da Anunciação contemplamos a humildade e a obediência da Virgem, modelo da nossa resposta a Deus.$c3t$),
  (4, $c4a$Bento XVI$c4a$, $c4s$Homilia nas Vésperas, Basílica da Anunciação, Nazaré, 14 de maio de 2009 (texto condensado)$c4s$, $c4t$Ao meditar este mistério, somos convidados a abrir-nos à ação do Espírito e a dar o nosso consentimento para que o Verbo habite em nós.$c4t$),
  (5, $c5a$Catecismo da Igreja Católica$c5a$, $c5s$CIC 484$c5s$, $c5t$A Anunciação a Maria inaugura a «plenitude dos tempos» (Gl 4, 4), isto é, o cumprimento das promessas e das preparações. Maria é convidada a conceber Aquele em quem habitará «corporalmente toda a plenitude da Divindade» (Cl 2, 9). A resposta divina ao seu «como será isto, se Eu não conheço homem?» (Lc 1, 34) é dada pelo poder do Espírito: «O Espírito Santo virá sobre ti» (Lc 1, 35).$c5t$),
  (6, $c6a$Catecismo da Igreja Católica$c6a$, $c6s$CIC 490$c6s$, $c6t$Para vir a ser Mãe do Salvador, Maria «foi adornada por Deus com dons dignos de uma tão grande missão». O anjo Gabriel, no momento da Anunciação, saúda-a como «cheia de graça». De facto, para poder dar o assentimento livre da sua fé ao anúncio da sua vocação, era necessário que Ela fosse totalmente movida pela graça de Deus.$c6t$),
  (7, $c7a$Catecismo da Igreja Católica$c7a$, $c7s$CIC 494$c7s$, $c7t$… Maria respondeu com «a obediência da fé»… «Eis a serva do Senhor; faça-se em mim segundo a tua palavra» (Lc 1, 38). Assim, dando o seu consentimento à palavra de Deus, Maria torna-se Mãe de Jesus.$c7t$),
  (8, $c8a$São Bernardo de Claraval$c8a$, $c8s$In laudibus Virginis Matris, homilia 4, 8-9 (texto abreviado)$c8s$, $c8t$Ouviste, ó Virgem, que vais conceber e dar à luz um Filho… O Anjo aguarda a tua resposta… Nós também, miseravelmente oprimidos… esperamos a tua palavra de misericórdia. Em tuas mãos está o preço da nossa salvação. Dá, depressa, ó Virgem, a tua resposta. Responde sem demora ao Anjo, ou, para melhor dizer, ao Senhor por meio do Anjo. Pronuncia uma palavra e recebe a Palavra. Profere a tua palavra humana e concebe a divina.$c8t$)
) as v(sort_order, author, source, text)
  on true
where m.type = 'joyful'
  and m.sort_order = 1
  and not exists (
    select 1 from public.commentaries c
    where c.passage_id = p.id and c.sort_order = v.sort_order::int
  );

delete from public.commentaries where passage_id is null;

alter table public.commentaries
  alter column passage_id set not null;

update public.mysteries
set meditation_ready = (type = 'joyful' and sort_order = 1);
