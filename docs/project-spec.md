# App de Terço / Rosário com Meditação — Especificação

Documento de referência do produto. Comportamento normativo para desenvolvimento está em `openspec/specs/`.

## Visão geral

Aplicativo mobile (Android primeiro, iOS depois) para rezar o Terço/Rosário com foco em meditação da vida de Jesus. Diferencial principal: conteúdo de meditação dinâmico e rico (passagens bíblicas + comentários de santos e papas + imagens de quadros clássicos), em vez de textos fixos e repetitivos.

O usuário deve conseguir rezar mesmo sem saber as orações de cor. O app guia passo a passo.

## Stack técnica

- Frontend: Expo SDK 58 (React Native) + TypeScript strict
- Navegação: Expo Router (`src/app/`)
- Estado remoto: TanStack Query, cache em memória (`src/shared/providers/AppProviders.tsx`)
- Backend: Supabase Postgres. Imagens são URLs em `images.url`; a migração inicial não cria bucket de Storage
- Áudio previsto: `expo-av` (dependência presente, sem chamada em `src/`)
- Persistência local prevista: AsyncStorage (dependência presente, sem chamada em `src/`). `expo-sqlite` não está no projeto
- Sem autenticação no MVP

O que já está no código e o que ainda é só spec: `docs/desenvolvimento.md`. Contrato SQL ↔ `src/domain/mystery.ts`: `docs/modelo-de-conteudo.md`.

## Funcionalidades principais (MVP)

Ver `openspec/specs/` para requisitos e cenários detalhados. A UI versionada ainda é o template de abas do Expo Router.

## Fora do MVP

- Login / contas de usuário
- Sincronização do contador entre aparelhos
- Áudio da oração falada
- Lembretes / notificações
- Estatísticas avançadas
- Escolha de diferentes estilos de imagem ou cantos
- Comunidade ou compartilhamento
