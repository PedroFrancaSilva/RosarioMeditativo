# Tasks

Referência: `openspec/specs/rosary-prayer/spec.md` e `design.md`.

## 1. Domínio e orações fixas

- [x] 1.1 Criar tipos `PrayerStep`, `RosaryMode`, `MysterySet`, `RosarySessionConfig` em `src/domain/rosary/` e verificar com `npx tsc --noEmit`
- [x] 1.2 Implementar `fixedPrayers.ts` (Sinal da Cruz, Credo, Pai-Nosso, Ave-Maria, Glória, Oração de Fátima) com variantes resumo e completo em pt-BR; verificar que cada id é referenciável sem rede
- [x] 1.3 Implementar `buildPrayerSteps(config)` cobrindo terço completo (abertura + N mistérios, com Fátima após cada Glória) e um mistério (anúncio + década + Glória + Fátima); teste manual: logar lista gerada para `mode=full` e `mode=single` com 5 mistérios JP II

## 2. Sessão e hook

- [x] 2.1 Implementar `useRosarySession` (reducer: next/previous, limites no primeiro/último passo) em `src/features/rosary-prayer/hooks/`; verificar avanço/regressão em componente de dev ou teste unitário simples se criado
- [x] 2.2 Derivar do passo atual: texto da oração, índice de conta (0–10), id do mistério para imagem; verificar em simulação que 10 Ave-Marias incrementam contas

## 3. Dependências de UI e gestos

- [x] 3.1 Instalar `react-native-gesture-handler` e `expo-linear-gradient` via `npx expo install` e rodar `npx expo-doctor` sem erros críticos
- [x] 3.2 Garantir import de `react-native-gesture-handler` no entry conforme docs Expo SDK 58; verificar app inicia com `npm start`

## 4. Componentes de oração

- [x] 4.1 `DecadeBeads`: 10 contas touch-friendly, preenchidas/atual conforme props; verificar visualmente no simulador
- [x] 4.2 `PrayerTextBlock`: resumo por padrão, expandir ao toque no texto; verificar que segundo toque ou novo passo reseta expansão
- [x] 4.3 `PrayerScreen`: `ImageBackground` + gradiente, integração beads + texto + gestos (toque central e swipe); verificar avanço/volta entre 3 passos consecutivos

## 5. Dados de mistérios

- [x] 5.1 `mysteryRepository` com catálogo embutido (20 mistérios, tipos alinhados a `MysteryType`) e fetch Supabase quando env configurado; verificar home lista mistérios com `.env` ausente
- [x] 5.2 Hook `useMysteries(set)` com TanStack Query; verificar loading/erro/fallback embutido

## 6. Navegação e home

- [x] 6.1 Substituir conteúdo de `(tabs)/index.tsx` por seleção de conjunto (clássico vs JP II), terço completo e lista “Este mistério”; verificar navegação para `/prayer` com params corretos
- [x] 6.2 Adicionar rota stack `src/app/prayer/index.tsx` + ajuste em `src/app/_layout.tsx`; verificar tela full-screen fora das tabs
- [x] 6.3 Tela de conclusão ao fim do fluxo com ação voltar à home; verificar terço completo percorre todos os passos gerados

## 7. Imagens de fundo

- [x] 7.1 Resolver URI de imagem por mistério (query `images` Supabase); fallback `assets/images/La_Purísima_Concepción_-_Cristóbal_de_Villalpando.jpg` via constante em `src/shared/constants/prayerAssets.ts`; verificar fundo full-bleed no simulador com e sem Supabase

## 8. Verificação final

- [x] 8.1 Percorrer manualmente no Android/Expo Go: um mistério, terço completo clássico, gestos, texto offline, contas — checklist alinhado aos cenários de `openspec/specs/rosary-prayer/spec.md`
- [x] 8.2 Rodar `npm run openspec:check` e `npx tsc --noEmit` com sucesso

## Workflow follow-up

- Após review, implementar via `/opsx-apply`; como `skip_specs: true`, arquivar com `openspec validate --all --strict` quando pronto (sem delta de specs a fundir).
