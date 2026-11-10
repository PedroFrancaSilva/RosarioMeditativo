# Design

## Context

Ver `proposal.md` para a motivação. A home (`src/app/(tabs)/index.tsx`) já inicia um terço com `{ mode: 'tercio', set, mysteryType }` via `startPrayerWithResumeCheck`, e o diálogo `ResumePrayerDialog` está montado só nessa tela. A rota `/meditation-coverage` recebe o `set` da home (`classic` ou `jp2`), agrupa o catálogo com `groupMysteriesByTerco` e hoje só desenha nome + “Curado” / “Pendente” em `MeditationCoverageList`. O requisito novo está no delta de `rosary-prayer`.

## Goals / Non-Goals

**Goals:**

- Trocar o checklist por uma lista de terços do conjunto já escolhido, cada um iniciável com o mesmo fluxo da home.
- Fazer o diálogo de retomada valer nesse início, sem um segundo mecanismo de sessão.
- Manter a home com um único terço na lista do dia.

**Non-Goals:**

- Ver o que ficou de fora no proposal. Em especial: não apagar `meditationReady`, não tornar o nome do mistério um início de dezena, não duplicar o controle Tradicional / Com Luminosos nesta tela.

## Decisions

### 1. Reaproveitar a rota e o conjunto da home

**Escolha:** manter `src/app/meditation-coverage.tsx` e o param `set`. A tela não tem segmento próprio. “Voltar” continua `router.back()`. O título e a entrada na home passam a “Escolher um terço”. A entrada fica onde está hoje o link de cobertura: depois da lista do dia e antes do canto.

**Alternativa:** rota nova `/tercios` — rejeitada; não há deep link público, e renomear a screen do stack não muda o que o usuário vê.

### 2. Cada seção é um terço, não um checklist

**Escolha:** substituir `MeditationCoverageList` por uma lista que, para cada `TercoSection`, mostra o título, `recommendedDays`, os cinco nomes (texto, sem `Pressable`) e “Rezar este terço”. A ordem já vem de `groupMysteriesByTerco`. O terço de `tercoTypeForDate(set, new Date())` ganha o rótulo discreto “Do dia”; os outros não são escondidos. “Curado” e “Pendente” saem. `meditationReady` deixa de ser lido nesta UI.

**Alternativa:** um botão por mistério, no mesmo gesto da home — rejeitada; o delta exige que tocar o nome não abra a oração.

**Alternativa:** omitir os nomes e listar só os quatro títulos — rejeitada; os nomes já estão na tela e o delta pede que continuem visíveis.

### 3. O mesmo início de sessão, com o diálogo na tela que dispara

**Escolha:** “Rezar este terço” chama `startPrayerWithResumeCheck({ mode: 'tercio', set, mysteryType: section.type })`. Extrair da home o estado do diálogo (abrir, continuar, iniciar nova, dispensar) para um hook em `src/features/rosary-prayer/`, usado pela home e por esta tela, e montar `ResumePrayerDialog` nos dois lugares. Continuar e iniciar nova seguem `prayerHrefFromSnapshot` / `prayerHrefForIntent` e `clearIncompleteSession`, como na home.

**Alternativa:** só `router.push` nesta tela — rejeitada; uma sessão incompleta seria ignorada.

**Alternativa:** diálogo global no layout — rejeitada; o prompt já é local ao gesto de iniciar, e um provider não é necessário para dois call sites.

### 4. Catálogo offline

**Escolha:** manter `useMysteries(set)`. Em `isError`, a lista usa o catálogo embutido que o hook já devolve e mostra “Usando catálogo offline embutido.”, como hoje. Sem estado de erro que esvazie a tela.

## Risks / Trade-offs

- [O diálogo fica só na home e esta tela navega direto] → o hook compartilhado é o único caminho de “Rezar este terço” aqui; o teste da lista cobre o callback, e o da tela (ou do hook) cobre sessão salva.
- [Vários “Rezar este terço” na mesma tela] → testes usam a seção (título + controle), não um `getByText` único.
- [O nome do arquivo `meditation-coverage` continua a sugerir checklist] → o título visível e o componente deixam de usar esse vocabulário; a rota fica estável.
- [“Do dia” depende do relógio do aparelho] → a mesma função da home; não há segunda regra de calendário.

## Migration Plan

Só UI e testes. Não há migration, seed nem flag para ligar. Reverter é restaurar o link “Conteúdo dos mistérios” e a lista de status. `meditation_ready` no Supabase permanece.

## Open Questions

Nenhuma. O rótulo “Escolher um terço” e a marca “Do dia” ficam fechados aqui; não alteram o delta.
