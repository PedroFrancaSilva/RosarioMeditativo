# Design

## Context

Ver `proposal.md`. Hoje: `useMysteryBackground` busca uma URL no Supabase ou cai em `EMBEDDED_MYSTERY_GALLERIES`; o protótipo **desabilitou** o fetch remoto quando há galeria embutida — o oposto do spec. Já existem domínio (`mysteryGalleryImageIndex`, `resolveEmbeddedMysteryContentKey`), assets da Anunciação (5 obras Met, crop por obra), rotação a cada 2 Ave-Marias e dev tools (`__DEV__`). Schema Supabase inicial cobre tabelas sem colunas de apresentação de imagem além de `url`/metadados textuais.

## Goals / Non-Goals

**Goals:**

- Repositório único de conteúdo de meditação por mistério com **remoto primeiro**, fallback embutido por slug (`type` + `sort_order`).
- Carregar passagens, comentários, imagens (lista ordenada) e referências profundas via TanStack Query, cache por `mysteryId` UUID resolvido.
- UI de meditação na `PrayerScreen`: passagem + comentário, troca sem mudar passo do terço, modal “Quero me aprofundar”.
- Fundo: slot por intervalo de Ave-Marias (default 2), crédito por imagem, `resizeMode` (e crop já baked na URL/asset) **por linha**, não global.
- Seed Supabase para Anunciação (mistério `joyful`/`sort_order=1` + 5 imagens Met + amostra de passagens/comentários/refs).
- Corrigir precedência remota vs embutido; testes de domínio + integração leve nos hooks.

**Non-Goals:**

- Painel admin, auth, Storage upload pelo app.
- Popular os 20 mistérios completos (só Anunciação obrigatório para validar).
- Persistir escolhas de passagem/comentário entre sessões.
- Remover dev tools; apenas não expor em release.

## Decisions

### 1. Resolução de mistério → conteúdo

**Escolha:** `resolveMysteryContentTarget(mystery: Mystery)` retorna `{ supabaseMysteryId: string | null, contentSlug: string }` onde `contentSlug = \`${type}-${sortOrder}\`` e `supabaseMysteryId` vem do objeto `Mystery` da sessão (UUID quando catálogo remoto; slug quando embutido). Queries Supabase usam `mystery_id = uuid`; fallback embutido indexa por `contentSlug` em `prayerAssets` / JSON estático.

**Alternativa:** coluna `slug` em `mysteries` — adiada; seed garante `(type, sort_order)` único.

### 2. Precedência remota (breaking fix)

**Escolha:** Para cada facet (images, passages, …), `fetchRemote()` → se sucesso e array não vazio, usar remoto; senão `getEmbeddedFallback(slug)`. **Nunca** pular fetch remoto só porque existe galeria embutida.

**Alternativa:** merge remoto + embutido — rejeitada (confuso e contra spec).

### 3. Repositório e queries

**Escolha:** `meditationContentRepository.ts` com funções puras mapeando rows Supabase → tipos de `src/domain/mystery.ts`. Hooks `useMeditationContent(mysteryId, type, sortOrder)` e `useMysteryBackground` consumindo lista de imagens do repositório (não query solta de uma URL).

**Cache keys:** `['meditation', mysteryUuid, 'images' | 'passages' | …]`.

### 4. Metadados de imagem

**Escolha:** Migration adiciona em `images`:

- `resize_mode text not null default 'contain' check (resize_mode in ('cover','contain'))`
- `rotate_every_n_hail_marys integer` nullable (null = herdar default 2 no app por mistério ou global)

Crop lateral **não** vive no banco no MVP: URLs apontam para JPEG já recortado (Met CDN ou futuro Storage); embutido mantém `bakedLateralCropPercent` só para dev preview da Champaigne.

**Alternativa:** `lateral_crop_percent` por linha — possível fase 2; protótipo dev cobre calibração local.

### 5. Rotação de imagens

**Escolha:** Reutilizar `mysteryGalleryImageIndex` com `imageCount = remoteImages.length || embedded.length` e `rotateEveryNHailMarys` da primeira imagem ou constante de mistério (2 para Anunciação). Índice derivado de `hailMaryIndex` + `prayerId` inalterado.

### 6. Estado de meditação na oração

**Escolha:** Hook `useMeditationSelection(content)` com índices locais `passageIndex`, `commentaryIndex` (useState); botões ciclam módulo `(index + 1) % length`. Não persiste no reducer do terço.

**UI:** Componente `MeditationBlock` abaixo do rótulo do mistério, acima de `PrayerTextBlock`; botões compactos; modal/stack para deeper refs.

### 7. Seed Supabase

**Escolha:** Migration SQL idempotente ou script documentado + execução via MCP `apply_migration` / `execute_sql`: upsert dos **20 mistérios** (catálogo embutido) e conteúdo inicial; passagens bíblicas na tradução **Pe. Manuel de Matos Soares** a partir de `supabase/seed/passages-matos-soares.json` (curadoria em `docs/content/passagens-terco-matos-soares.md`, fonte Cathivo/Ecclesiae). Anunciação: 5 `images` Met + passagens/comentários/refs. Demais mistérios: passagens no seed; imagens/comentários incrementais.

**Embutido:** Manter galeria `joyful-1` espelhando seed para offline idêntico em comportamento (mesma ordem sort_order).

### 8. Dev tools

**Escolha:** Inalteradas; preview de crop só slot 0 embutido quando modo dev ativo e **sem** dados remotos de imagem para aquele mistério (evita divergência com produção).

## Risks / Trade-offs

- **[Risco] UUID de mistério no app vs seed** → Mitigação: home/sessão já carrega `Mystery.id` do Supabase quando `.env` ok; seed deve usar mesmo par type/sort_order.
- **[Risco] Imagens Met hotlink** → Mitigação: aceitar no MVP; tarefa opcional copiar para Supabase Storage depois.
- **[Risco] Layout crowded na oração** → Mitigação: meditação colapsável ou tipografia menor; testar em telas pequenas Android.
- **[Trade-off] Query N+1** → Um hook agrega 4 selects paralelos ou view RPC futura; MVP 4 queries aceitável.

## Migration Plan

1. Deploy migration colunas `images.resize_mode`, `images.rotate_every_n_hail_marys` (nullable).
2. Aplicar seed Anunciação no projeto Supabase remoto.
3. Ship app: repositório + precedência + UI.
4. Rollback app: versão anterior; dados Supabase permanecem compatíveis.

## Open Questions

- Textos reais das passagens/comentários — **passagens**: ver `supabase/seed/passages-matos-soares.json` (Matos Soares, 2 trechos × 20 mistérios). **Comentários** de santos/papas: curadoria manual pós-MVP ou placeholders curtos na seed de Anunciação.
- Intervalo de rotação configurável por mistério no admin — MVP fixo 2 salvo coluna nullable preenchida no seed.
