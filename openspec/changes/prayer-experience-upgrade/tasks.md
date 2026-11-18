# Tasks

## 1. Preferências e ajustes

- [x] 1.1 Domínio `src/domain/preferences/prayerPreferences.ts`: padrão, leitura tolerante (`schemaVersion` 1), escala do texto e hora do lembrete. Verificar com `npx jest src/domain/preferences`.
- [x] 1.2 `PreferencesProvider` (AsyncStorage `@rosario/preferences`) montado em `AppProviders`; o contexto fica num módulo sem AsyncStorage (`preferencesContext.ts`).
- [x] 1.3 Tela `src/app/ajustes.tsx` e entrada “Ajustes” na home.

## 2. Oração

- [x] 2.1 `useKeepAwake` em `PrayerScreen`.
- [x] 2.2 `hapticCueForStep` + `playHapticCue`; vibra só ao avançar ou no “Próximo mistério”. Verificar com `npx jest src/domain/rosary/hapticCue`.
- [x] 2.3 `buildPrayerSteps` aceita `openingIntentions` (padrão fé/esperança/caridade); a rota de oração espera as preferências antes de montar a sessão. Verificar com `npx jest src/domain/rosary/buildPrayerSteps`.
- [x] 2.4 Tamanho do texto em `PrayerTextBlock` e `MeditationBlock`.

## 3. Contador e lembrete

- [x] 3.1 `completionCount` (domínio) e `completionCounter` (AsyncStorage + React Query); conta uma vez por sessão no passo de conclusão.
- [x] 3.2 `dailyReminder` com `expo-notifications` (canal Android, permissão, trigger diário) e plugin no `app.json`.
- [ ] 3.3 Conferir num aparelho real (development build novo): permissão, notificação na hora marcada e toque abrindo o app.

## 4. Conteúdo

- [x] 4.1 JSON dos vinte mistérios no formato `passages[]`, com texto verbatim de Matos Soares (Cathivo) e comentários redistribuídos. Verificar com `npx jest src/data/repositories`.
- [x] 4.2 `useMeditationSelection` com `drawAnother`/`canDrawAnother` e “Outra meditação” em `MeditationBlock`. Verificar com `npx jest src/features/rosary-prayer`.
- [x] 4.3 Migration `supabase/migrations/20261117120000_multi_passage_meditations.sql` gerada a partir dos JSON.
- [ ] 4.4 Aplicar a migration no projeto Supabase (`supabase db push`) e conferir com a chave anon que cada mistério devolve 2–3 passagens.

## 5. Obras de fundo

- [x] 5.1 `artworkPath` percorre de borda a borda o eixo que transborda (sobra > 8% da tela), 18–30 s por ida, vai e volta suave; `rest` no foco para movimento reduzido. Verificar com `npx jest src/domain/artworkMotion`.
- [ ] 5.2 Conferir no aparelho uma obra larga (ex.: `glorious-3-2`, só 26% visível antes) e uma vertical.

## 6. Verificação

- [x] 6.1 `npm test`, `npx tsc --noEmit` e `npm run openspec:check`.
- [ ] 6.2 Arquivar com `/opsx-archive` depois de revisar no aparelho.
