# Proposal

## Why

O app ainda está no template Expo (abas genéricas) enquanto a capability `rosary-prayer` já está normativamente definida em `openspec/specs/rosary-prayer/spec.md`. Sem a tela de oração, seleção de mistérios e motor de passos, o produto não entrega o valor central prometido em `docs/project-spec.md`: rezar o Terço passo a passo, mesmo sem decorar as orações.

## What Changes

- Catálogo / entrada para escolher conjunto de mistérios (clássico vs João Paulo II com Luminosos), um mistério ou terço completo.
- Motor de sessão de oração com passos fixos (Credo, Pai-Nosso, Ave-Marias por década, Glória, etc.) embutidos no app, com textos resumido e completo.
- Tela de oração: imagem de fundo, gradiente/painel legível, texto expansível, contador de contas da década atual.
- Gestos: avançar (toque central / swipe esquerda), voltar (swipe direita).
- Rotas Expo Router em `src/features/` + `src/app/` alinhadas à estrutura do README.
- Integração mínima com imagens de mistério (placeholder local ou URL do Supabase quando configurado), sem implementar ainda o fluxo completo de `meditation-content` (outra change).

## Capabilities

### New Capabilities

_(Nenhuma — requisitos normativos já existem.)_

### Modified Capabilities

_(Nenhuma — esta change é implementação do contrato existente em `openspec/specs/rosary-prayer/spec.md`.)_

## Fora do escopo

- Contador de terços completos, áudio gregoriano, pacotes offline e bootstrap de conteúdo (`local-experience`).
- Troca dinâmica de passagem/comentário, “Quero me aprofundar” e políticas Supabase além do necessário para listar mistérios e imagens (`meditation-content`).
- Autenticação, estatísticas, notificações, áudio falado das orações.
- Seeds massivos de conteúdo editorial no Supabase (apenas dados mínimos ou fixtures para desenvolvimento).

## Impact

- **Código:** novo `src/features/rosary-prayer/` (sessão, UI, gestos), extensões em `src/domain/` (passos, orações fixas, tipos de sessão), `src/data/` (repositório de mistérios se Supabase estiver configurado; fallback embutido), novas rotas em `src/app/`.
- **Dependências:** possivelmente `react-native-gesture-handler` / `react-native-reanimated` (já comuns no Expo) para gestos; sem novas dependências de backend.
- **APIs:** leitura anon em `mysteries` e `images` quando `.env` estiver preenchido; app funcional com catálogo fixo offline.
- **Specs:** nenhuma alteração normativa (`skip_specs: true` nesta change).
