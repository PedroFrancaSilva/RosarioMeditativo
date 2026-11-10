# Tasks

## 1. Lista de escolha de terço

- [x] 1.1 Substituir `MeditationCoverageList` por um componente que recebe as seções, `offline`, o tipo do terço do dia e `onStartTerco`. Cada seção mostra título, dias recomendados, os cinco nomes como texto (sem `Pressable`) e “Rezar este terço”; a seção do dia leva “Do dia”. Não renderizar `meditationReady`, “Curado” nem “Pendente”. Verificar com `npx jest src/features/rosary-prayer/components/MeditationCoverageList-test.tsx` (ou o teste renomeado junto do componente): no tradicional, três “Rezar este terço”, “Segunda e quinta”, “A Anunciação”, sem “Mistérios Luminosos”, sem “Curado” e sem “Pendente”; com luminosos, quatro controles e “O Batismo de Jesus”; `offline` mostra “Usando catálogo offline embutido.” e os controles; tocar um nome não chama `onStartTerco`; tocar “Rezar este terço” dos Dolorosos chama com `sorrowful`.

## 2. Início do terço nas duas telas

- [x] 2.1 Extrair da home o estado do diálogo de retomada para um hook em `src/features/rosary-prayer/` que usa `startPrayerWithResumeCheck` e `clearIncompleteSession`. A home passa a usá-lo em rosário completo, terço do dia e mistério avulso, com o mesmo `ResumePrayerDialog`. Verificar com teste do hook e AsyncStorage mockado: sem snapshot, iniciar `{ mode: 'tercio', set: 'classic', mysteryType: 'sorrowful' }` devolve href de `/prayer` com esses params; com snapshot, não há href e o diálogo fica disponível; “iniciar nova” apaga o snapshot antes do href fresco; “continuar” devolve o href do passo salvo.

- [x] 2.2 Em `/meditation-coverage`, título “Escolher um terço”, terço do dia via `tercoTypeForDate` e “Rezar este terço” no hook com o `set` da rota. Na home, o link passa a “Escolher um terço”, abre a mesma rota com o `set` selecionado, e a lista segue só o terço do dia. Verificar com teste de render dessas telas (mock de `useMysteries`, canto e storage): a escolha não mostra “Conteúdo dos mistérios”; o controle de um terço chama o início em modo `tercio` com o tipo da seção; a home mostra “Escolher um terço” e uma única seção de mistérios.

## 3. Verificação integrada

- [x] 3.1 Rodar `npx jest` nos testes dos arquivos tocados, `npx tsc --noEmit` e `npm run openspec:check`, e só concluir se os três passarem.

## Workflow follow-up

- Arquivar o change depois da implementação revista, com `/opsx-archive`.
