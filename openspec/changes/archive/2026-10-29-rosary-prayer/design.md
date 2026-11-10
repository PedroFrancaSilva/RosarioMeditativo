# Design

## Context

- Requisitos normativos: `openspec/specs/rosary-prayer/spec.md` (motivação em `proposal.md`).
- Código atual: template Expo Router com abas placeholder; tipos de mistério em `src/domain/mystery.ts`; cliente Supabase em `src/data/api/supabaseClient.ts`; `src/features/` ainda vazio.
- Stack já presente: TanStack Query, Reanimated, AsyncStorage; sem telas de produto.

## Goals / Non-Goals

**Goals:**

- Modelo de domínio puro para passos de oração e sessão (terço completo vs um mistério; conjunto clássico vs JP II).
- Catálogo na home para escolher modo e conjunto; navegação para tela de oração full-screen.
- UI conforme spec: fundo com imagem, overlay escuro, texto resumido/expandido, fila de contas da década, gestos avançar/voltar.
- Orações fixas embutidas (resumo + texto completo), utilizáveis offline.
- Mistérios: lista mínima embutida + fetch Supabase quando `EXPO_PUBLIC_SUPABASE_*` estiver definido.

**Non-Goals:**

- Meditação dinâmica (passagens/comentários/troca de conteúdo) — capability `meditation-content`.
- Contador persistente de terços, áudio, downloads offline — `local-experience`.
- Animações elaboradas além de transição simples entre passos.

## Decisions

### 1. Motor de passos como função pura + reducer no hook

**Escolha:** `buildPrayerSteps(config)` em `src/domain/rosary/` retorna lista ordenada de `PrayerStep` (id, tipo, rótulo, prayerId fixo ou mistério, índice de conta 0–10, etc.). Hook `useRosarySession(initialConfig)` usa `useReducer` para índice atual, histórico mínimo e ações `next` / `previous`.

**Alternativas:** Máquina de estados implícita só na UI (rejeitada — difícil testar e duplica regras); XState (rejeitada — dependência extra no MVP).

**Sequência (terço completo, simplificada):** abertura (Sinal da Cruz, Credo, 1 Pai-Nosso, 3 Ave-Marias, Glória) → para cada mistério do conjunto: anúncio do mistério, 1 Pai-Nosso, 10 Ave-Marias (contas 1–10), Glória, **Oração de Fátima** → tela de conclusão. **Um mistério:** anúncio + década + Glória + Oração de Fátima (sem abertura completa).

### 2. Orações fixas em módulo estático

**Escolha:** `src/domain/rosary/fixedPrayers.ts` com ids (`sign-of-cross`, `creed`, `our-father`, `hail-mary`, `glory-be`, `fatima-prayer`, …), cada um com `title`, `summary` (primeiras ~120 caracteres ou primeiro período), `fullText` em pt-BR. Texto da Oração de Fátima (forma usual em português): *«Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o Céu, especialmente aquelas que mais precisarem.»*

**Alternativa:** JSON em assets (adiada — TS permite tipagem e tree-shaking).

### 3. Rotas Expo Router

**Escolha:**

- `(tabs)/index.tsx` — home “Rezar”: escolha conjunto (3 vs 4 mistérios), lista de mistérios, CTAs “Este mistério” e “Terço completo”.
- `src/app/prayer/index.tsx` — recebe params (`mode`, `set`, `mysteryId` opcional) via `useLocalSearchParams`, monta sessão e renderiza `PrayerScreen`.
- Stack: registrar `prayer` no `_layout` raiz (fora das tabs) para experiência imersiva.

**Alternativa:** Modal nas tabs (rejeitada — spec pede tela dedicada com imagem full-bleed).

### 4. Imagens de fundo

**Escolha:** Para cada passo ligado a um mistério, resolver `backgroundImageUri`: primeira imagem do mistério via query Supabase; fallback **asset local padrão**:

- Arquivo: `assets/images/La_Purísima_Concepción_-_Cristóbal_de_Villalpando.jpg` (1080×1565, retrato ~2:3, JPEG otimizado para `resizeMode="cover"`).
- Crédito: *Imaculada Conceição*, Cristóbal de Villalpando (domínio público / Wikimedia Commons).
- No apply: constante `DEFAULT_MYSTERY_BACKGROUND` (ex. `src/shared/constants/prayerAssets.ts`) com `require()` — mesma imagem para todos os mistérios no MVP até seed por mistério no Supabase.

Novas obras: preferir originais verticais (~2:3); evitar paisagens largas.

**Alternativa:** Só placeholder até `meditation-content` (rejeitada — spec exige artwork visível; placeholder nomeado no asset basta no MVP).

### 5. Gestos e área de toque

**Escolha:** `Pressable` na área central para `next`; `react-native-gesture-handler` `Gesture.Pan()` (ou `Fling`) para swipe horizontal — instalar via `npx expo install react-native-gesture-handler`. Swipe direita → `previous` (no primeiro passo, ignorar ou haptic leve).

**Alternativa:** Só botões visíveis (rejeitada — spec prioriza gestos).

Transição entre passos: `LayoutAnimation` ou fade curto com Reanimated (implementação mínima).

### 6. Contador de contas

**Escolha:** Componente `DecadeBeads` — 10 contas grandes + opcional “Pai-Nosso” como bead 0 ou separador visual; estado `activeIndex` derivado do passo atual (`hailMaryIndex` 1–10). Contas anteriores preenchidas, atual destacada.

### 7. Dados de mistérios

**Escolha:** `src/data/repositories/mysteryRepository.ts` — `getMysteriesBySet(set: 'classic' | 'jp2')` com fallback embutido (20 mistérios nomeados, ids estáveis UUID-like ou slugs mapeados para Supabase quando existir). TanStack Query `useMysteries(set)` na home.

**Alternativa:** Só Supabase (rejeitada — viola cenário offline de orações fixas e impede dev sem `.env`).

### 8. Texto expansível

**Escolha:** Estado local `expanded` por passo (reset ao mudar `stepIndex`). Toque no bloco de texto alterna resumo ↔ completo; toque na área central avança (texto usa `onPress` com stopPropagation ou áreas separadas).

## Risks / Trade-offs

- **[Gestos vs scroll/texto]** → Separar hit areas: texto em card superior; zona inferior ou lateral para avançar; documentar na UI dev.
- **[Sequência litúrgica simplificada]** → MVP documentado no design; ajustes finos não alteram spec até change dedicada.
- **[Supabase vazio]** → Fallback embutido garante fluxo; imagens podem ser genéricas.
- **[gesture-handler não instalado]** → Task explícita com `expo install`.

## Migration Plan

- Change puramente client-side; sem migração de DB além de seeds opcionais manuais.
- Deploy: nova build; usuários existentes (template) passam a ver home de oração.
- Rollback: reverter branch; sem persistência de sessão no MVP.

## Open Questions

_(Nenhuma pendente — Oração de Fátima incluída após cada Glória por decisão de produto.)_
