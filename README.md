# Rosário Meditativo

Aplicativo mobile (Android primeiro) para rezar o Terço com meditação dinâmica: passagens bíblicas, comentários de santos e papas, e imagens de obras clássicas. MVP **sem autenticação**.

## Stack

| Camada | Tecnologia |
|--------|------------|
| UI | Expo SDK 58, React Native, TypeScript (strict) |
| Navegação | Expo Router (`src/app/`) |
| Dados remotos | Supabase + TanStack Query |
| Áudio | expo-av (dependência instalada; sem uso em `src/` ainda) |
| Persistência local | AsyncStorage instalado; contador e cache ainda sem código em `src/` |

Estrutura de código:

- `src/app/` — rotas (Expo Router); UI atual é o template de abas
- `src/features/` — fluxos de produto (pasta reservada, só `.gitkeep`)
- `src/shared/` — componentes, providers, constantes
- `src/data/` — cliente Supabase; `repositories/` ainda vazio
- `src/domain/` — tipos de conteúdo (`mystery.ts`)
- `openspec/` — especificações executáveis (OpenSpec)
- `supabase/migrations/` — schema Postgres + RLS
- `docs/` — visão de produto, guia de desenvolvimento e modelo de conteúdo

O mapa do que já roda e do que a spec ainda não tem em código está em `docs/desenvolvimento.md`.

## Pré-requisitos

- Node.js **≥ 22.13** (Expo SDK 58; use [nvm](https://github.com/nvm-sh/nvm) com `.nvmrc` na raiz)
- **npm** — gerenciador oficial do repositório (`package-lock.json`); não usar pnpm/yarn em paralelo
- OpenSpec CLI em `~/.local/bin` (instalado via [openspec.dev](https://openspec.dev/docs/installation))
- Android Studio ou dispositivo com Expo Go / development build

## Como rodar

```bash
git clone https://github.com/PedroFrancaSilva/RosarioMeditativo.git
cd RosarioMeditativo
nvm use          # lê .nvmrc (Node 22.13+)
npm ci           # ou: npm install
cp .env.example .env   # opcional até linkar Supabase
npm start              # Android: npm run android
```

Dependências do ecossistema Expo/React Native: preferir **`npx expo install <pacote>`** em vez de `npm install` direto.

Qualidade local (antes de concluir mudanças):

```bash
npm run openspec:check
npx tsc --noEmit
npx expo-doctor          # saúde do projeto Expo
# após upgrade de SDK: npx expo install --fix
```

## OpenSpec (desenvolvimento orientado a especificação)

Especificações de comportamento ficam em `openspec/specs/`:

- `rosary-prayer` — fluxo de oração, gestos, contas
- `meditation-content` — conteúdo dinâmico e Supabase
- `local-experience` — contador, áudio, offline, cache

Comandos no **terminal** (OpenSpec CLI 1.15+):

```bash
# Validar specs normativas
openspec validate --specs --no-interactive

# Validar tudo (CI / pré-commit) — também via npm
npm run openspec:check
# equivalente: openspec validate --all --strict --no-interactive

openspec list                   # mudanças ativas
openspec view                   # dashboard interativo
openspec show rosary-prayer     # detalhe de uma capability (exemplo)
```

> **Deprecado:** `openspec spec list` e `openspec spec validate` ainda podem responder, mas emitem aviso; use os comandos acima.

Fluxo no **Cursor** (comandos em `.cursor/commands/`):

`/opsx:explore` → `/opsx:propose` → `/opsx:apply` → `/opsx:sync` (se necessário) → `/opsx:archive`

Também disponíveis: `/opsx:update` (refinar artefatos da change). Perfil expandido (`/opsx:verify`, `/opsx:onboard`, etc.) **não** está instalado neste projeto — use o fluxo core acima ou `openspec new change <nome-kebab-case>`.

Para nova funcionalidade: **não** edite `openspec/specs/**/spec.md` direto; proponha uma change, implemente as tasks, valide (`npm run openspec:check` + `npx tsc --noEmit`), depois arquive (ou sync) para fundir deltas nas specs principais.

Documento de produto (visão geral): `docs/project-spec.md`.

## Supabase

1. Crie um projeto em [supabase.com](https://supabase.com).
2. Aplique migrações (CLI local ou SQL Editor):

   ```bash
   supabase link --project-ref YOUR_REF
   supabase db push
   ```

   Ou execute o conteúdo de `supabase/migrations/20251029000000_initial_content_schema.sql` no SQL Editor.

3. Copie URL e **anon key** para `.env`:

   ```env
   EXPO_PUBLIC_SUPABASE_URL=...
   EXPO_PUBLIC_SUPABASE_ANON_KEY=...
   ```

A migração liga RLS e cria policy de **`SELECT` para `anon`** em `mysteries`, `passages`, `commentaries`, `images` e `deeper_references`. Não há policy de escrita. Sem as variáveis, o app abre e `supabase` fica `null` (aviso no console). Detalhe de colunas, tipos e um `INSERT` de exemplo: `docs/modelo-de-conteudo.md`. Não commite `.env`.

## Repositório

[PedroFrancaSilva/RosarioMeditativo](https://github.com/PedroFrancaSilva/RosarioMeditativo).

| Identificador | Valor |
|---------------|--------|
| `app.json` `name` e `slug` | `RosarioMeditativo` |
| `app.json` `scheme` | `rosariomeditativo` |
| `package.json` `name` | `rosariomeditativo` |

`ios/` e `android/` ficam de fora do git. A configuração nativa está em `app.json`.

Guia de ambiente, bootstrap e problemas frequentes: `docs/desenvolvimento.md`.

## Licença

Ver `LICENSE` (template Expo).
