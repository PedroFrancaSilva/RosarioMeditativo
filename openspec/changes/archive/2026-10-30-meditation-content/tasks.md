# Tasks

## 1. Schema e seed Supabase

- [x] 1.1 Adicionar migration `resize_mode` e `rotate_every_n_hail_marys` em `public.images` e aplicar no projeto remoto; verificar colunas com MCP `list_tables` ou SQL de inspeção.
- [x] 1.2 Seed idempotente dos **20 mistérios** (type + sort_order alinhados ao app) e das **5 imagens** Met da Anunciação; verificar leitura anon.
- [x] 1.3 Importar **40 passagens** de `supabase/seed/passages-matos-soares.json` (Matos Soares, 2 por mistério); inserir amostra de comentários (≥2) e deeper_references (≥1) para `joyful-1`; verificar RLS anon.

## 2. Domínio e repositório

- [x] 2.1 Implementar `meditationContentRepository` (fetch por UUID + mapeamento para tipos de domínio) e helper de precedência remoto-then-embedded; testes unitários para remoto vence embutido e fallback quando remoto vazio/falha.
- [x] 2.2 Centralizar `resolveMysteryContentTarget` (slug + uuid) e reutilizar em repositório e hooks; estender testes de `resolveEmbeddedMysteryContentKey` se necessário.
- [x] 2.3 Documentar no repositório ordem `sort_order` e intervalo de rotação (default 2, override por coluna nullable); teste de `mysteryGalleryImageIndex` com contagem vinda do repositório mockado.

## 3. Hooks e fundo

- [x] 3.1 Refatorar `useMysteryBackground`: buscar **lista** de imagens via repositório (remoto primeiro), calcular slot por Ave-Maria, crédito e `resizeMode` por entrada; **remover** skip de fetch Supabase quando há galeria embutida; verificar troca de imagem ao avançar da Ave-Maria 2→3 no simulador.
- [x] 3.2 Manter fallback embutido `joyful-1` espelhando seed (5 obras, crops individuais) para offline; verificar modo avião usa embutido.
- [x] 3.3 Implementar `useMeditationContent` + `useMeditationSelection` com TanStack Query; testes de ciclo “outra passagem/comentário” sem alterar índice do terço.

## 4. UI na oração

- [x] 4.1 Criar `MeditationBlock` (passagem, comentário, ações de troca) e integrar em `PrayerScreen` conforme delta `rosary-prayer`; verificar gestos de avançar/voltar passo inalterados.
- [x] 4.2 Modal ou overlay “Quero me aprofundar” listando `deeper_references`; ocultar ação quando lista vazia; verificar dismiss sem sair da rota `/prayer`.
- [x] 4.3 Garantir `key`/transição no `ImageBackground` ao mudar slot; crédito atualizado por obra.

## 5. Dev tools e limpeza

- [x] 5.1 Restringir painel dev de crop a fallback embutido sem imagens remotas; verificar toggle do menu em `__DEV__` não afeta build release.
- [x] 5.2 Remover constantes deprecadas não usadas ou alinhar comentários em `prayerAssets.ts` (crop por entrada, não global).

## 6. Verificação final

- [x] 6.1 `npm test`, `npx tsc --noEmit`, `npm run openspec:check`; corrigir falhas.
- [ ] 6.2 Teste manual: `.env` com Supabase — Anunciação mostra 5 fundos rotacionando, passagens/comentários trocáveis, remoto visível; sem rede — fallback embutido equivalente.

## Workflow follow-up

- Revisar artifacts da change; quando satisfeito, `/opsx-apply` e após implementação `/opsx-archive`.
