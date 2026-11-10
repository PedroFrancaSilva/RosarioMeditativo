# Tasks

## 1. Snapshot de domínio e persistência

- [x] 1.1 Definir tipo `IncompleteRosarySession` (versão, `mode`, `set`, ids de mistérios, `stepIndex`, campos de param) em `src/domain/rosary/` e funções `serialize`/`parse` com validação contra `buildPrayerSteps` usando catálogo embutido. Verificar com testes unitários (`npm test` no arquivo de teste criado) cobrindo snapshot válido, índice fora do range e JSON inválido.
- [x] 1.2 Implementar `readIncompleteSession`, `writeIncompleteSession` e `clearIncompleteSession` em `src/data/` ou `src/features/rosary-prayer/session/` usando AsyncStorage e a chave acordada no design. Verificar testes com mock de storage para gravar, ler e apagar.

## 2. Hook de sessão

- [x] 2.1 Estender `useRosarySession` com `initialStepIndex` opcional (init do reducer com clamp) e hook `usePersistRosarySession` que persiste após mudanças de índice (debounce) e chama `clearIncompleteSession` quando `kind === 'completion'`. Verificar com teste unitário do reducer/init e `npx tsc --noEmit`.
- [x] 2.2 Em `src/app/prayer/index.tsx`, hidratar índice salvo antes de renderizar `PrayerScreen` (estado de carregamento curto) e passar config + índice ao hook. Verificar manualmente ou com teste que montagem com snapshot mockado não mostra passo 0 antes da hidratação.

## 3. Diálogo na seleção

- [x] 3.1 Criar `startPrayerWithResumeCheck` (lê snapshot, monta rótulo descritivo, `Alert` com Continuar / Iniciar nova) e usar nos três fluxos de `src/app/(tabs)/index.tsx`. Verificar teste unitário da função pura de rótulo e que Continuar navega com params do snapshot enquanto Iniciar nova limpa storage e usa o intent do toque.
- [x] 3.2 Garantir copy em pt-BR alinhada ao tom contemplativo e acessibilidade básica dos botões do `Alert`. Verificar revisão visual no emulador ao tocar rosário completo com sessão salva.

## 4. Verificação integrada

- [x] 4.1 Rodar `npm run openspec:check`, `npx tsc --noEmit` e testes afetados. Verificar que todos passam.
- [x] 4.2 No emulador: avançar alguns passos, voltar à home, tocar outra opção de oração → diálogo; Continuar retoma o passo; repetir escolhendo Iniciar nova → começa do zero; concluir terço → nova tentativa não mostra diálogo. Verificar esses fluxos na sessão manual.

## Workflow follow-up

- Após revisão dos artefatos, implementar com `/opsx-apply` e arquivar quando `openspec validate --all --strict` estiver verde.
