# Rosário Meditativo

Aplicativo mobile (Android primeiro) para rezar o Terço com meditação dinâmica: passagens bíblicas, comentários de santos e papas, e imagens de obras clássicas. MVP **sem autenticação**.

## Stack

| Camada | Tecnologia |
|--------|------------|
| UI | Expo SDK 58, React Native, TypeScript (strict) |
| Navegação | Expo Router (`src/app/`) |
| Dados remotos | Supabase + TanStack Query |
| Áudio | expo-av |
| Persistência local | AsyncStorage (contador, cache; repositórios em evolução) |

Estrutura de código:

- `src/app/` — rotas (Expo Router)
- `src/features/` — fluxos de produto (oração, mistérios, etc.)
- `src/shared/` — componentes, providers, constantes
- `src/data/` — cliente API e repositórios
- `src/domain/` — tipos e regras de domínio
- `openspec/` — especificações executáveis (OpenSpec)
- `supabase/migrations/` — schema Postgres + RLS

## Pré-requisitos

- Node.js 20+ (recomendado: [nvm](https://github.com/nvm-sh/nvm))
- OpenSpec CLI em `~/.local/bin` (instalado via [openspec.dev](https://openspec.dev/docs/installation))
- Android Studio ou dispositivo com Expo Go / development build

## Como rodar

```bash
cd ~/Projetos/RosarioMeditativo
nvm use 22   # se usar nvm
npm install
cp .env.example .env   # opcional até linkar Supabase
npm run android        # ou: npm start
```

Typecheck:

```bash
npx tsc --noEmit
```

## OpenSpec (desenvolvimento orientado a especificação)

Especificações de comportamento ficam em `openspec/specs/`:

- `rosary-prayer` — fluxo de oração, gestos, contas
- `meditation-content` — conteúdo dinâmico e Supabase
- `local-experience` — contador, áudio, offline, cache

Comandos no **terminal**:

```bash
openspec spec list              # listar specs
openspec spec validate          # validar todas
openspec list                   # mudanças ativas
openspec view                   # dashboard interativo
```

No **Cursor**, use os comandos `/opsx:explore`, `/opsx:propose`, `/opsx:apply`, `/opsx:archive` (ver `.cursor/commands/`).

Para uma nova funcionalidade: proponha uma change, implemente as tasks, arquive para fundir deltas em `openspec/specs/`.

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

RLS permite **leitura anon** nas tabelas de conteúdo (`mysteries`, `passages`, `commentaries`, `images`, `deeper_references`). Não commite `.env`.

## GitHub

O repositório remoto ainda precisa ser criado nesta máquina (`gh` não estava instalado no bootstrap). Passos:

```bash
# Instalar GitHub CLI (Arch/CachyOS)
sudo pacman -S github-cli
gh auth login

# Repositório privado
gh repo create RosarioMeditativo --private --source=. --remote=origin --push
```

Nome consistente: **`RosarioMeditativo`** (slug Expo: `rosariomeditativo`).

## Licença

Ver `LICENSE` (template Expo).
