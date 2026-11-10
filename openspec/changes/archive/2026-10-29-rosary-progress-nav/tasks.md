# Tasks

## 1. Sessão

- [x] 1.1 Expor em `presentPrayerStep` (ou helper ao lado) o rótulo persistente do mistério: nome do mistério quando o passo tem `mysteryId` ou é anúncio; “Abertura” nos passos iniciais sem mistério; na conclusão, rótulo de terço concluído. Verificar com `npx tsc --noEmit` e conferindo três passos representativos (abertura, Ave-Maria de um mistério, conclusão)
- [x] 1.2 Em `useRosarySession`, adicionar `skipToNextMystery` e `canSkipToNextMystery`: o salto vai ao próximo passo `mystery-announcement` com índice maior que o atual e não avança para `completion`. Verificar com `npx tsc --noEmit` e que, numa sessão de dois ou mais mistérios, o salto a partir de uma Ave-Maria cai no anúncio seguinte, e no último mistério `canSkipToNextMystery` é falso

## 2. Progresso visual

- [x] 2.1 Substituir a fileira única de `DecadeBeads` por um mapa do terço: um grupo por mistério da sessão, década atual destacada com a conta corrente marcada e contas já rezadas preenchidas; décadas anteriores preenchidas e as seguintes vazias; modo de um mistério mostra só esse grupo. Verificar visualmente na rota `/prayer` em terço completo (meio de uma década que não é a primeira) e em modo de um mistério

## 3. Tela de oração

- [x] 3.1 Em `PrayerScreen`, mostrar o rótulo do mistério o tempo todo, separado do título da oração. Remover a zona de toque que avança. Colocar setas de voltar e avançar um passo (ocultas quando não há passo nessa direção) e o controle “Próximo mistério” só quando `canSkipToNextMystery` for verdadeiro. O toque no texto só expande ou recolhe. Manter o deslize horizontal. Na conclusão, ação de voltar ao início sem setas de passo. Verificar na tela: expandir o texto não muda o passo; a seta avança um passo; “Próximo mistério” abre o anúncio seguinte já no resumo; no último mistério o salto não aparece
- [x] 3.2 Ligar a rota `src/app/prayer/index.tsx` ao salto e aos dados do mapa. Rodar `npx tsc --noEmit` sem erros

## 4. Testes automatizados

- [x] 4.1 Configurar Jest (`jest-expo`, `@testing-library/react-native`) e script `npm test`. Verificar `npm test` com suítes passando
- [x] 4.2 Cobrir domínio/sessão: `buildPrayerSteps`, salto entre mistérios, rótulo persistente, mapa de décadas e expansão de texto. Verificar `npm test` e `npx tsc --noEmit`

## Workflow follow-up

- Revisar os artefatos e, quando a implementação estiver aceita, arquivar com `/opsx-archive`.
