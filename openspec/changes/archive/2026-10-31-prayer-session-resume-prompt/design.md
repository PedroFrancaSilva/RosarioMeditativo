# Design

## Context

Ver `proposal.md`. A sessão hoje é um `useReducer` em `useRosarySession` com `stepIndex` inicial 0; `src/app/prayer/index.tsx` monta o hook a partir dos query params (`mode`, `set`, `mysteryId`, `mysteryType`) e do catálogo remoto/embutido. Sair da oração desmonta a rota e perde o estado. O app já persiste preferências com `@react-native-async-storage/async-storage` (canto gregoriano, dev tools).

## Goals / Non-Goals

**Goals:**

- Uma única sessão incompleta serializável, restaurável após fechar a oração ou matar o app.
- Diálogo na home antes de `router.push('/prayer', …)` quando houver snapshot válido.
- Testes unitários em domínio/persistência (parse, validação, limpeza).

**Non-Goals:**

- Provider global de sessão montado o tempo todo; deep link direto para `/prayer` sem passar pela home (comportamento best-effort: restaurar só se a rota carregar snapshot explícito ou ler storage na montagem — ver decisão 4).
- UI de “Continuar” permanente na home além do diálogo.
- Versionar vários rascunhos ou merge de configs diferentes.

## Decisions

### 1. Formato do snapshot

**Escolha:** JSON em AsyncStorage com chave fixa (ex.: `@rosary/incomplete-session`), versão `schemaVersion`, campos: `mode`, `set`, `mysteryIds[]` (ordem da sessão), `stepIndex`, e para `tercio`/`single` os identificadores já usados nos params (`mysteryType`, `mysteryId`).

**Alternativa:** serializar `PrayerStep[]` inteiros — rejeitada porque muda com evolução de `buildPrayerSteps`; recomputar steps a partir de `RosarySessionConfig` + catálogo garante alinhamento.

**Validação:** ao ler, reconstruir config com catálogo embutido; se `stepIndex` ≥ `steps.length` ou mistério ausente, apagar chave e retornar `null`.

### 2. Quando gravar

**Escolha:** efeito em `useRosarySession` (ou hook fino `usePersistRosarySession`) que persiste após cada mudança de `stepIndex` com debounce curto (~300 ms), e gravação síncrona best-effort no cleanup da rota de oração se ainda incompleta.

**Alternativa:** só gravar ao sair — rejeitada porque kill do processo perderia o último passo.

### 3. Limpeza

**Escolha:** `clearIncompleteSession()` no passo `completion` (detectado em hook quando `currentStep.kind === 'completion'`) e ao confirmar “Iniciar nova” no diálogo.

### 4. Onde interceptar o diálogo

**Escolha:** helper `startPrayerWithResumeCheck(intent)` usado pelos três handlers em `src/app/(tabs)/index.tsx`. Lê snapshot assíncrono antes de navegar; se existir, a home abre `ResumePrayerDialog`, um modal com fundo escuro, cartão, tipografia e ouro de `contemplative` — o mesmo vocabulário da seleção. Toque fora do cartão fecha sem iniciar oração.

**Continue:** `router.push` com params derivados do snapshot (não do `intent` pendente). **Nova:** `clear` + `router.push` com `intent`.

**Alternativa:** interceptar em `_layout` — rejeitada; a home concentra todas as entradas atuais.

**Rota `/prayer`:** aceitar param opcional `resume=1` ou ler storage na montagem quando `stepIndex` omitido nos params: na implementação, passar `initialStepIndex` lido do storage após hidratação para evitar flash no passo 0 (estado `hydrated` + spinner curto se necessário).

### 5. Extensão de `useRosarySession`

**Escolha:** terceiro argumento opcional `{ initialStepIndex?: number }` aplicado só na inicialização do reducer (`useReducer` com função init que clampa índice). Não re-hidratar se `sessionConfig` mudar mid-flight.

## Risks / Trade-offs

- **[Catálogo remoto vs embutido]** Mistério salvo pode faltar no cache remoto → Mitigação: fallback embutido já usado em `prayer/index.tsx`; validação usa embutido mínimo.
- **[Flash no passo 0]** Hidratação async → Mitigação: não renderizar `PrayerScreen` até índice restaurado ou confirmado ausência.
- **[Params diferentes no diálogo]** Usuário toca outro terço mas continua o antigo → Mitigação: copy claro no diálogo; spec exige continuar sessão salva, não o tap novo.
- **[Tamanho do storage]** Snapshot pequeno (IDs + índice); risco negligible.

## Migration Plan

- Deploy único no app; primeira leitura com chave ausente = comportamento atual.
- Rollback: remover gravação e diálogo; chave órfã no storage é inofensiva.

## Open Questions

_(nenhuma.)_
