# Modelo de conteúdo

Contrato entre a migração `supabase/migrations/20251029000000_initial_content_schema.sql` e os tipos em `src/domain/mystery.ts`. O requisito de produto está em `openspec/specs/meditation-content/spec.md`.

Não há repositório em `src/data/repositories/` que leia essas tabelas nem que converta snake_case da API para os tipos abaixo. Quem implementar essa camada usa este mapeamento.

## Tabelas

Tudo em `public`. A migração cria a extensão `pgcrypto`. As tabelas filhas referenciam `mysteries.id` com `on delete cascade`.

| Tabela | Papel | Colunas próprias |
|--------|--------|------------------|
| `mysteries` | um mistério | `name`, `type` (`mystery_type`), `sort_order`, `description`, `created_at`, `updated_at` |
| `passages` | trecho bíblico | `mystery_id`, `text`, `reference`, `sort_order`, `created_at` |
| `commentaries` | comentário | `mystery_id`, `text`, `author`, `source`, `sort_order`, `created_at` |
| `images` | obra usada como imagem | `mystery_id`, `url`, `title`, `artist`, `description`, `sort_order`, `created_at` |
| `deeper_references` | material para aprofundar | `mystery_id`, `title`, `description`, `url_or_reference`, `sort_order`, `created_at` |

Cada tabela usa `id uuid primary key default gen_random_uuid()`. Só `mysteries` tem `updated_at`. Os tipos TypeScript não incluem timestamps.

O enum `mystery_type` vale `joyful`, `sorrowful`, `glorious` ou `luminous`. `MysteryType` em `src/domain/mystery.ts` repete esses quatro literais.

Restrições da migração:

- `sort_order >= 0` em todas as tabelas (`*_sort_order_non_negative`).
- Índice único `mysteries_type_sort_order_idx` em `(type, sort_order)`. Dois mistérios do mesmo tipo não usam a mesma ordem.
- Nas tabelas filhas, `sort_order` default é `0` e não há unicidade entre irmãos.
- `images.url` é `text`. A migração não cria bucket de Storage. A coluna guarda a URL pronta para exibir.

## Tipos de domínio

| Coluna SQL | Campo TypeScript |
|------------|------------------|
| `mystery_id` | `mysteryId` |
| `sort_order` | `sortOrder` |
| `url_or_reference` | `urlOrReference` |
| `name`, `type`, `text`, `reference`, `author`, `source`, `url`, `title`, `artist`, `description` | o mesmo nome |

Nullable no tipo (`string | null`), como na coluna: `Mystery.description`, `Commentary.source`, `MysteryImage.title`, `MysteryImage.artist`, `MysteryImage.description`, `DeeperReference.description`, `DeeperReference.urlOrReference`.

## Leitura anônima

RLS está ligado nas cinco tabelas. Cada uma tem uma policy `for select to anon using (true)`:

- `Anon read mysteries`
- `Anon read passages`
- `Anon read commentaries`
- `Anon read images`
- `Anon read deeper_references`

A migração não cria policy de `insert`, `update` ou `delete`, nem policy para o role `authenticated`. A anon key cobre a leitura descrita na spec. Gravação pelo cliente do app não faz parte deste schema. A carga inicial entra por SQL administrativo (SQL Editor do projeto ou uma migração), o mesmo caminho citado no README.

`createClient` em `src/data/api/supabaseClient.ts` só roda quando URL e anon key existem. Sem elas, o export `supabase` é `null`. Nenhum outro arquivo importa `supabase`, então preencher o `.env` ainda não muda a UI.

## Exemplo de carga

`sort_order` `1` em `joyful` só pode aparecer uma vez.

```sql
with inserted as (
  insert into public.mysteries (name, type, sort_order, description)
  values ('Anunciação', 'joyful', 1, 'O anjo anuncia a encarnação.')
  returning id
),
passage as (
  insert into public.passages (mystery_id, text, reference, sort_order)
  select id,
         'Eis que conceberás no teu ventre e darás à luz um filho.',
         'Lc 1,31',
         0
  from inserted
  returning mystery_id
)
insert into public.images (mystery_id, url, title, artist, sort_order)
select mystery_id,
       'https://example.com/anunciacao.jpg',
       'A Anunciação',
       'Fra Angelico',
       0
from passage;
```

Apagar a linha em `mysteries` remove passagens, comentários, imagens e referências daquele id por causa do `on delete cascade`.
