# Proposal

## Why

Na tela de oração o progresso é só uma fileira de Ave-Marias. A pessoa não vê em qual mistério está, precisa percorrer cada passo para chegar ao próximo, e o toque que abre o texto completo também avança a oração. O terço precisa ser legível de relance e navegável sem perder o texto.

## What Changes

- O progresso passa a lembrar um terço: mistérios da sessão visíveis como grupos de contas, com a década atual destacada e a conta corrente marcada.
- O mistério em curso (nome) permanece visível em todo passo daquela década, inclusive nas Ave-Marias. Na abertura do terço completo, o rótulo indica abertura até o primeiro anúncio.
- Um controle explícito salta para o anúncio do próximo mistério, sem exigir os passos restantes da década atual. No último mistério esse controle some.
- **BREAKING** (comportamento da tela): o toque no texto da oração só expande ou recolhe o texto. Avançar e voltar um passo passa a ser por setas dedicadas. O deslize horizontal pode continuar como atalho, sem competir com o texto.
- Modo de um único mistério: o mapa mostra só essa década e não oferece salto para outro mistério.

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- `rosary-prayer` (`openspec/specs/rosary-prayer/spec.md`): layout da tela, contador de contas, gestos de navegação e salto entre mistérios. Seleção de conjuntos, orações fixas offline e o fluxo guiado de texto (resumo/completo) permanecem, com o toque no texto deixando de avançar o passo.

## Impact

- UI em `src/features/rosary-prayer/components/` (`PrayerScreen`, `DecadeBeads` ou substituto visual, `PrayerTextBlock`).
- Sessão em `useRosarySession`: ação de salto para o próximo anúncio de mistério (ou conclusão, se não houver próximo — o controle de UI fica oculto nesse caso).
- `src/app/prayer/index.tsx` passa o novo estado para a tela.
- Sem novas dependências. Sem mudança de rota, de catálogo ou de Supabase.

## Fora de escopo

- Áudio, vibração e animações elaboradas do terço físico.
- Saltar para um mistério arbitrário (só o próximo) ou reordenar o terço.
- Alterar textos das orações, seleção clássico vs. João Paulo II, ou conteúdo de meditação.
- Development build nativo; continua em Expo Go.
