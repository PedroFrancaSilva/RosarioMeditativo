---
name: meditation-content-package
description: >-
  Curates meditation content for a rosary mystery: passages, commentaries linked
  by passage_id, background images, Supabase seed/migration, and offline fallback.
  Use when adding or updating mystery meditation packages, meditation_ready, Matos
  Soares passages, commentaries with sources, Met images, or replicating the
  Annunciation (joyful-1) pattern for another mystery.
---

# Pacote de meditação por mistério

Guia operacional para **curar** um mistério (passagens + comentários + imagens + flag `meditation_ready`). Não substitui OpenSpec quando o **comportamento** do app muda — só conteúdo e dados.

Referência implementada: **Anunciação** (`joyful` / `sort_order` 1 → slug `joyful-1`).

Detalhes de SQL, JSON e checklist longo: [reference.md](reference.md).

## Antes de começar

1. **Identificar o mistério:** `type` + `sort_order` → slug `{type}-{sortOrder}` (ex.: `joyful-2`, `sorrowful-3`).
2. **Confirmar no catálogo:** nome em `src/data/repositories/mysteryRepository.ts` (`EMBEDDED_MYSTERIES`).
3. **Separar dois mundos:**
   - **Corpus Matos Soares** em `supabase/seed/passages-matos-soares.json` — trechos genéricos para todos os mistérios; **não reescrever o JSON inteiro** ao curar um mistério.
   - **Pacote curado** — passagens escolhidas para a oração, cada comentário com `passage_id`, fontes conferidas, imagens e fallback offline dedicado.

## Modelo de dados (resumo)

| Entidade | Regra |
|----------|--------|
| `passages` | Pertence a um `mystery_id`; `reference`, `text`, `sort_order`. |
| `commentaries` | **Obrigatório** `passage_id` → `passages.id` (CASCADE). Mantém `mystery_id`. Dois textos do mesmo autor = **duas linhas**. |
| `images` | Por `mystery_id`; `sort_order` = ordem da galeria; `url` remoto; metadados de crédito; `resize_mode`, `rotate_every_n_hail_marys`, opcional `focal_*` / `drift_*`. |
| `mysteries.meditation_ready` | `true` só quando o pacote está pronto para o checklist “Curado”. **Não** inferir de “tem passagem” — todos já têm Matos Soares no JSON. |

Na oração: um par **sorteado** (uma passagem + um comentário **dela**), sem lista nem troca manual. Várias passagens entram no mesmo sorteio.

## Fluxo recomendado (ordem)

Copie e marque:

```
- [ ] Textos e fontes conferidos (não inventar citações; condensados declarados na source)
- [ ] JSON local src/data/content/<slug>Meditation.json
- [ ] Migration idempotente supabase/migrations/ (remoto)
- [ ] Repositório: skip Matos no slug + embedded passage/commentaries (+ deeper se houver)
- [ ] Imagens em assets/images/ + galeria em prayerAssets.ts + linhas em images (SQL)
- [ ] meditation_ready no SQL + catálogo embutido (mysteryRepository)
- [ ] Testes (meditationContentRepository-test) + npm test + tsc
- [ ] Verificação anon no Supabase (reference.md)
```

### 1. Conteúdo editorial

- Passagem: tradução **Matos Soares** quando for evangelho; referência no formato já usado (ex. `Lc 1, 26-27`).
- Comentários: `author`, `source`, `text` integral ou abreviado com reticências **do autor** — não completar omissões.
- `sort_order` estável (0…n) para passagens e comentários; comentários ligados à passagem correta no SQL.

Espelhe a estrutura de `src/data/content/annunciationMeditation.json`:

```json
{
  "reference": "…",
  "text": "…",
  "commentaries": [
    { "sortOrder": 0, "author": "…", "source": "…", "text": "…" }
  ]
}
```

### 2. Supabase (remoto)

- **DDL** raro neste fluxo; colunas já existem (`passage_id`, `meditation_ready`). Novo DDL → migration via MCP `apply_migration` ou arquivo em `supabase/migrations/`.
- **DML + seed do mistério:** migration **idempotente** (padrão `20261030190000_passage_bound_commentaries.sql`):
  - Apagar passagens/comentários antigos **deste mistério** que não devem aparecer na oração (se aplicável).
  - `INSERT` passagens com `NOT EXISTS` por `reference` + `sort_order`.
  - `INSERT` comentários com `passage_id` resolvido por join em `passages`.
  - `UPDATE mysteries SET meditation_ready = …` — só o mistério curado vira `true`; os outros permanecem `false` até terem pacote.

Aplicar no projeto remoto e validar com SQL (ver [reference.md](reference.md)).

### 3. App — fallback offline

Arquivos típicos (seguir `joyful-1`):

| O quê | Onde |
|--------|------|
| JSON do pacote | `src/data/content/<slug>Meditation.json` |
| Ignorar Matos Soares deste slug | `buildEmbeddedPassages`: `if (row.mystery_slug === '<slug>') continue` |
| Passagem + comentários embutidos | `meditationContentRepository.ts`: funções/`if (contentSlug === '<slug>')` ou mapa por slug |
| IDs estáveis embutidos | ex. `embedded-passage-<slug>-0`, `embedded-commentary-<slug>-{n}`; `passageId` em cada comentário |
| Galeria de obras | `src/shared/constants/prayerAssets.ts` → `EMBEDDED_MYSTERY_GALLERIES['<slug>']` |
| Ficheiros PNG/JPG | `assets/images/` (crops `_crop_sides` se usar o mesmo padrão da Anunciação) |
| Flag Curado offline | `mysteryRepository.ts` → `meditationReady: seed.id === '<slug>'` (até ler só do remoto em todos os casos) |

**Imagens remoto vs app:** URLs públicas estáveis (ex. Met) na tabela `images`; offline usa `require()` local na galeria embutida. Remoto ganha quando existe (`preferRemoteList`).

### 4. Testes mínimos

Em `meditationContentRepository-test.ts`, para o slug:

- Número de passagens/comentários e referências esperadas.
- Nenhum comentário órfão (`passageId` coincide com passagem do bundle).
- Slug excluído do mapa Matos antigo (sem referências indesejadas).
- Galeria: contagem de imagens e `rotateEveryNHailMarys` se relevante.

Rodar: `npm test`, `npx tsc --noEmit`.

## O que não fazer

- Não repor “Outra passagem” / “Outro comentário” na UI.
- Não marcar `meditation_ready` só porque existe passagem Matos Soares no JSON.
- Não inserir comentário sem `passage_id`.
- Não reescrever `passages-matos-soares.json` para entregar um pacote curado — usar JSON dedicado + skip no repositório.
- Não editar `openspec/specs/**/spec.md` direto; mudança normativa → fluxo OpenSpec (propose → apply → archive).

## Quando pedir OpenSpec

- Novo comportamento de UI, sorteio, checklist ou schema.
- Só **mais um mistério com o mesmo desenho** → esta skill basta; opcionalmente atualizar tabela de exemplos no `design.md` da change arquivada, não obrigatório.

## Atalhos úteis no repo

- Design e tabela de fontes (Anunciação): `openspec/changes/archive/2026-10-30-meditation-passage-comments/design.md`
- Migration consolidada Anunciação: `supabase/migrations/20261030190000_passage_bound_commentaries.sql`
- Seed histórico (imagens Met Anunciação): `supabase/migrations/20251030000002_seed_meditation_content.sql` (linhas `images`)

Se o utilizador pedir “próximo mistério”, comece por confirmar **slug**, **passagens**, **lista de comentários com fontes** e **obras** antes de escrever SQL ou código.
