# Proposal

## Why

O app já reza o Terço com fundo artístico e protótipo embutido (galeria da Anunciação, crop por obra, rotação a cada duas Ave-Marias), mas o spec `meditation-content` ainda não está implementado de ponta a ponta nem alinhado ao backend. É hora de carregar passagens, comentários, imagens e referências do Supabase, com **prioridade remota sobre fallback local**, e compor a meditação na tela de oração.

## What Changes

- Repositórios e queries TanStack Query para `passages`, `commentaries`, `images`, `deeper_references` por mistério (leitura anon).
- **Precedência de dados**: conteúdo remoto válido do Supabase prevalece; assets/c catálogo embutido só quando remoto indisponível, vazio ou falha de rede.
- Identificação estável do mistério entre UUID (Supabase) e slug offline (`joyful-1`, etc.) via `type` + `sort_order` (ou campo equivalente no seed).
- UI na oração: bloco de meditação (passagem + comentário), ações “Outra passagem” / “Outro comentário”, “Quero me aprofundar” quando houver dados.
- Rotação de **múltiplas imagens** de fundo durante a década (padrão validado: a cada **2** Ave-Marias), com crédito (título/artista) por imagem.
- Metadados de apresentação por imagem (ex.: `resize_mode`, crop lateral embutido no asset ou URL já tratada) — **sem** percentual único global; cada obra calibrada individualmente.
- Seed inicial no Supabase para **A Anunciação** (`joyful-1`): cinco obras do Met já testadas no app + estrutura para expandir outros mistérios.
- **Passagens bíblicas (MVP):** catálogo de referências tradicionais por mistério + **40 trechos** na tradução do **Pe. Manuel de Matos Soares** (`supabase/seed/passages-matos-soares.json`, ver `docs/content/passagens-terco-matos-soares.md`).
- Ajuste do comportamento atual que **priorizava** galeria embutida sobre Supabase (**BREAKING** em relação ao protótipo local).
- Ferramentas de dev (painel de crop, toggle no menu) permanecem apenas em `__DEV__` e não alteram produção.

## Capabilities

### New Capabilities

_(nenhuma — capability `meditation-content` já existe em `openspec/specs/`.)_

### Modified Capabilities

- `meditation-content`: precedência remota, rotação de imagens na década, metadados de exibição por imagem, composição na oração e cenários de falha/limites.
- `rosary-prayer`: integração visual do bloco de meditação e crédito da obra na tela de oração sem quebrar layout, gestos e mapa de contas.

## Impact

- `src/data/repositories/` (novos repositórios de conteúdo), `src/domain/` (seleção/rotação de conteúdo, chave de mistério).
- `src/features/rosary-prayer/` (`PrayerScreen`, hooks de fundo e meditação).
- `src/shared/constants/prayerAssets.ts` (fallback reduzido, não fonte primária).
- Supabase: seed/migration de dados e, se necessário, colunas de metadados de imagem; RLS anon read já previsto na migration inicial.
- Testes unitários para precedência, rotação e mapeamento de mistério; `npm run openspec:check` e `npx tsc --noEmit` antes de concluir apply.

## Fora do escopo

- Autenticação de usuário, upload de conteúdo pelo app, CMS admin.
- Áudio, lembretes, estatísticas (`local-experience`).
- Calibração automática de crop por IA; calibração continua manual por obra (dev tools opcionais).
- Sincronizar catálogo de mistérios inteiro no Supabase além do necessário para validar o fluxo (expandir mistérios após Anunciação é incremental, não bloqueante do MVP desta change).
