# Proposal

## Why

A home só deixa rezar o terço do dia (além do rosário completo e de um mistério desse terço). A tela “Conteúdo dos mistérios” existe para marcar cada mistério como curado ou pendente, e esse checklist deixou de servir: os vinte mistérios já têm pacote curado. A mesma tela já agrupa o catálogo por terço e pelo conjunto escolhido na home, então é o lugar natural para o usuário iniciar um terço que não seja o do dia.

## What Changes

- A entrada na home deixa de se chamar “Conteúdo dos mistérios” e passa a abrir a escolha de terço. Rótulo assumido da entrada e do título da tela: **“Escolher um terço”**.
- A tela lista todos os terços do conjunto já selecionado (tradicional: gozosos, dolorosos e gloriosos; com luminosos: esses três mais os luminosos), com os cinco nomes de cada um e o controle **“Rezar este terço”**.
- “Rezar este terço” inicia a mesma sessão de um terço que a home já inicia: orações iniciais e os cinco mistérios, nesta ordem. Vale para qualquer terço da lista, inclusive o do dia.
- Some da interface o estado “Curado” / “Pendente”. A home continua mostrando só o terço do dia na lista principal.
- O diálogo de continuar ou iniciar nova oração também aparece quando o terço é iniciado nesta tela e já existe sessão incompleta.

## Capabilities

### New Capabilities

_(nenhuma — o comportamento cabe no fluxo de seleção e oração já especificado.)_

### Modified Capabilities

- `rosary-prayer`: a seleção passa a oferecer qualquer terço do conjunto ativo, numa tela que reaproveita o agrupamento de `/meditation-coverage`; a home deixa de apontar para o checklist de curadoria; a retomada de sessão incompleta vale também para um início feito nessa tela.

## Impact

- **UI:** `src/app/(tabs)/index.tsx` (rótulo e destino da entrada), `src/app/meditation-coverage.tsx` e `src/features/rosary-prayer/components/MeditationCoverageList.tsx` (lista acionável por terço, sem status de curadoria). O diálogo de retomada precisa estar disponível nesse início, não só na home.
- **Domínio:** reutiliza `groupMysteriesByTerco`, `tercoTypeForDate` e o início de sessão em modo `tercio`. Sem mudança no motor da oração.
- **Specs:** `openspec/specs/rosary-prayer/spec.md`. `meditation-content` e `local-experience` não mudam de requisito.
- **Fora do escopo:** remover a coluna `mysteries.meditation_ready` ou o campo `meditationReady`; alterar o pacote de meditação, o seed ou o fluxo de curadoria; iniciar um mistério avulso a partir desta tela (isso continua só na lista do dia, na home); mudar qual terço é o do dia; oferecer o rosário completo nesta tela; nova tab; autenticação.
