# Proposal

## Why

A meditação ainda trata passagem e comentário como duas listas soltas do mistério: o app mostra um de cada e troca um sem o outro. O conteúdo faz mais sentido se uma passagem bíblica for a unidade, e os comentários — cada texto distinto, mesmo do mesmo autor — pertencerem a ela. A Anunciação é o primeiro pacote nesse formato; os demais mistérios entram aos poucos, com um checklist no banco para saber o que já está curado.

## What Changes

- **BREAKING:** comentário deixa de ser um pool do mistério e passa a pertencer a uma passagem. Textos diferentes do mesmo autor são registros separados. Na oração não há lista nem seleção: o app sorteia **uma** passagem entre as disponíveis do mistério e **um** comentário entre os dessa passagem, como combustível da meditação. O par fica estável enquanto a pessoa reza o mistério, inclusive ao avançar as contas. Sair e voltar sorteia de novo. Não há “Outra passagem” nem “Outro comentário”. Na Anunciação, hoje, só existe Lc 1, 26-27, então a passagem mostrada é essa e o sorteio é o do comentário.
- Passagem ou comentário longo abre e fecha no mesmo gesto das orações fixas (“Toque para ver texto completo” / “Toque para recolher”), sem avançar o passo do terço. Texto curto aparece inteiro, sem esse convite.
- Enquanto a passagem (e os comentários dela) ainda está a carregar, o bloco de meditação mostra estado de carregamento. O mesmo vale para a imagem de fundo do passo, sem esconder o painel da oração.
- Checklist de cobertura lido do Supabase: cada mistério está curado ou pendente. Não se infere o estado só porque já existe alguma passagem (os 20 mistérios já têm trechos Matos Soares). A Anunciação entra como curada; os outros ficam pendentes até um pacote futuro.
- Primeiro pacote, na Anunciação (`joyful` / ordem 1): uma passagem, **Lc 1, 26-27**, na tradução já adotada (Pe. Manuel de Matos Soares), com nove comentários e fonte em cada um:
  1. São Tomás de Aquino — *Suma Teológica* III, q. 30, a. 1 (corpus): conveniência do anúncio à Virgem (quatro razões).
  2. São Tomás de Aquino — *Suma Teológica* III, q. 30, a. 2 (corpus): conveniência de o anúncio ser feito por um anjo (três razões).
  3. Santo Agostinho — *De sancta virginitate*, 3: Maria mais bem-aventurada por receber a fé de Cristo do que por conceber a carne de Cristo.
  4. São João Paulo II — frase pedida, condensada; o teor está nas audiências gerais de 4 e 18 de setembro de 1996. A fonte gravada declara que não é citação verbal.
  5. Bento XVI — frase pedida, condensada da homilia das Vésperas na Basílica da Anunciação, Nazaré, 14 de maio de 2009.
  6. Catecismo da Igreja Católica, n. 484.
  7. Catecismo da Igreja Católica, n. 490.
  8. Catecismo da Igreja Católica, n. 494.
  9. São Bernardo de Claraval — *In laudibus Virginis Matris*, homilia 4, 8-9 (texto abreviado pedido).
- Na oração da Anunciação, a passagem oferecida passa a ser essa. Os trechos atuais Lc 1, 26-38 e Is 7, 14, e os dois comentários de amostra sem fonte fiel, saem dali. Os trechos dos outros mistérios permanecem.
- A change `meditation-content` (quase concluída, ainda não arquivada) continua a valer para precedência remota, imagens e “Quero me aprofundar”. Esta change substitui só a combinação solta de passagem e comentário. Na archive, o ciclo independente de comentário não prevalece sobre estes requisitos.

## Capabilities

### New Capabilities

_(nenhuma — o comportamento cabe nas capabilities já existentes em `openspec/specs/`.)_

### Modified Capabilities

- `meditation-content`: passagem como dona dos comentários; campos e leitura anônima do checklist de mistérios curados; pacote inicial da Anunciação com fontes.
- `rosary-prayer`: bloco de meditação mostra uma passagem e um comentário sorteados, sem controles para trocá-los, e expande texto longo; carregamento visível da passagem e da imagem; checklist de cobertura acessível a partir da seleção, sem substituir os mistérios do dia.

## Impact

- Supabase: `commentaries.passage_id`, flag de mistério curado em `mysteries`, seed da Anunciação e política anon de leitura dessa flag. RLS anon já cobre as tabelas de conteúdo.
- `src/domain/mystery.ts`, `src/data/repositories/meditationContentRepository.ts` e hooks de meditação e de fundo.
- `src/features/rosary-prayer/` (`MeditationBlock`, `PrayerScreen`, `ArtworkBackground`) e a home em `src/app/(tabs)/index.tsx` (entrada para o checklist).
- Fallback embutido da Anunciação alinhado ao pacote remoto, para o modo sem rede.
- Testes do repositório, do sorteio do comentário e da expansão; `npm run openspec:check` e `npx tsc --noEmit` antes de concluir o apply.

## Fora do escopo

- Curar passagens e comentários dos outros 19 mistérios.
- Trocar a tradução bíblica do catálogo (permanece Matos Soares).
- CMS, autenticação, upload de conteúdo pelo app.
- Alterar rotação de imagens, crédito da obra, “Quero me aprofundar” ou o mapa de contas.
- Arquivar a change `meditation-content`.
