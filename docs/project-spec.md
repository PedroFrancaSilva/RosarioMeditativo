# App de Terço / Rosário com Meditação — Especificação

Documento de referência do produto. Comportamento normativo para desenvolvimento está em `openspec/specs/`.

## Visão geral

Aplicativo mobile (Android primeiro, iOS depois) para rezar o Terço/Rosário com foco em meditação da vida de Jesus. Diferencial principal: conteúdo de meditação dinâmico e rico (passagens bíblicas + comentários de santos e papas + imagens de quadros clássicos), em vez de textos fixos e repetitivos.

O usuário deve conseguir rezar mesmo sem saber as orações de cor. O app guia passo a passo.

## Stack técnica

- Frontend: Expo (React Native) + TypeScript
- Navegação: Expo Router
- Estado / dados: TanStack Query (React Query) + cache local
- Backend: Supabase (Postgres + Storage + API)
- Áudio: expo-av
- Persistência local: AsyncStorage ou expo-sqlite
- Sem autenticação no MVP

## Funcionalidades principais (MVP)

Ver `openspec/specs/` para requisitos e cenários detalhados.

## Fora do MVP

- Login / contas de usuário
- Sincronização do contador entre aparelhos
- Áudio da oração falada
- Lembretes / notificações
- Estatísticas avançadas
- Escolha de diferentes estilos de imagem ou cantos
- Comunidade ou compartilhamento
