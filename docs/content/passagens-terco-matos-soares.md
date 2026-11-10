# Passagens bíblicas do Terço — tradução Pe. Manuel de Matos Soares

Documento de curadoria para seed do MVP (`passages` no Supabase). Textos copiados da [Bíblia Matos Soares no Cathivo](https://cathivo.com/bible/matos-soares/) (edição conforme Pe. Manuel de Matos Soares, rev. 1956).

**Atribuição:** Bíblia Sagrada — tradução do Pe. Manuel de Matos Soares. Confirmar direitos de reprodução com a editora (Ecclesiae) antes de distribuição comercial ampla.

**Convenção de referência no app:** `Lc 1, 26-38` (livro abreviado, capítulo, versículos).

**Slug do mistério:** `{type}-{sortOrder}` (ex.: `joyful-1`), alinhado a `mysteryRepository`.

## Referências tradicionais (primária + complementar)

| Slug | Mistério | Passagem principal (terço scriptural) | Complementar usual |
|------|----------|--------------------------------------|-------------------|
| joyful-1 | A Anunciação | Lc 1, 26-38 | Is 7, 14 |
| joyful-2 | A Visitação | Lc 1, 39-45 | Lc 1, 46-55 |
| joyful-3 | O Nascimento | Lc 2, 1-20 | Mt 1, 18-25 ou Is 9, 5 |
| joyful-4 | A Apresentação | Lc 2, 22-38 | Ex 13, 2 |
| joyful-5 | Perda e encontro no Templo | Lc 2, 41-52 | Mt 2, 13-15 (fuga) opcional |
| luminous-1 | Batismo | Mt 3, 13-17 | Jo 1, 29-34 |
| luminous-2 | Bodas de Caná | Jo 2, 1-11 | Jo 2, 5 |
| luminous-3 | Anúncio do Reino | Mc 1, 14-15 | Lc 4, 16-21 |
| luminous-4 | Transfiguração | Mt 17, 1-8 | 2 Pe 1, 16-18 |
| luminous-5 | Eucaristia | Mt 26, 26-29 | 1 Co 11, 23-26 |
| sorrowful-1 | Agonia no Horto | Mt 26, 36-46 | Lc 22, 42 |
| sorrowful-2 | Flagelação | Mt 27, 26 | Is 53, 5 |
| sorrowful-3 | Coroa de espinhos | Mt 27, 27-31 | Jo 19, 2-3 |
| sorrowful-4 | Carrega a Cruz | Lc 23, 26-32 | Jo 19, 17 |
| sorrowful-5 | Crucifixão | Lc 23, 33-46 | Mt 27, 45-54 |
| glorious-1 | Ressurreição | Mt 28, 1-10 | Jo 20, 11-18 |
| glorious-2 | Ascensão | At 1, 6-11 | Mc 16, 19 |
| glorious-3 | Pentecostes | At 2, 1-13 | Jo 20, 22 |
| glorious-4 | Assunção | Ap 12, 1 | 1 Co 15, 54-55 |
| glorious-5 | Coroação | Ap 12, 1 | Lc 1, 48 |

Listas de bispos e rosários scripturais variam ligeiramente (ex.: Agonia Mt 26 vs Mc 14; Ressurreição Mt 28 vs Jo 20). Esta tabela segue o padrão mais usado em rosário scriptural em português e nas [orientações da NZ Catholic Bishops](https://www.catholic.org.nz/resources/pastoral-letter-on-the-rosary).

## Dados para seed

O arquivo machine-readable com **dois trechos por mistério** (texto Matos Soares) está em:

`supabase/seed/passages-matos-soares.json`

Campos por item:

- `mystery_slug`
- `reference`
- `sort_order` (0 = principal, 1 = complementar)
- `text`

Na apply da change `meditation-content`, importar via migration SQL ou script Supabase MCP após upsert dos mistérios.

## Fontes para completar / revisar trechos

| Livro | URL Cathivo (Matos Soares) |
|-------|----------------------------|
| Lucas | https://cathivo.com/bible/matos-soares/luke/ |
| Mateus | https://cathivo.com/bible/matos-soares/matthew/ |
| João | https://cathivo.com/bible/matos-soares/john/ |
| Marcos | https://cathivo.com/bible/matos-soares/mark/ |
| Atos | https://cathivo.com/bible/matos-soares/acts/ |
| Apocalipse | https://cathivo.com/bible/matos-soares/revelation/ |
| Isaías | https://cathivo.com/bible/matos-soares/isaiah/ |
