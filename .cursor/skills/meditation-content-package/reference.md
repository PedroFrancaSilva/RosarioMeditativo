# Referência — pacote de meditação

## Slugs dos 20 mistérios

Padrão: `{type}-{sortOrder}`.

| type | sort_order | slug (ex.) |
|------|------------|------------|
| joyful | 1–5 | joyful-1 … joyful-5 |
| sorrowful | 1–5 | sorrowful-1 … |
| glorious | 1–5 | glorious-1 … |
| luminous | 1–5 | luminous-1 … |

Resolver UUID no remoto:

```sql
select id, name, type, sort_order, meditation_ready
from public.mysteries
where type = 'joyful' and sort_order = 2;
```

## Verificação anon (após seed)

```sql
begin;
set local role anon;
select m.name, m.meditation_ready, p.reference, count(c.id) as commentaries
from public.mysteries m
left join public.passages p on p.mystery_id = m.id
left join public.commentaries c on c.passage_id = p.id
where m.type = 'joyful' and m.sort_order = 1
group by m.name, m.meditation_ready, p.reference;
commit;
```

Esperado para Anunciação curada: `meditation_ready = true`, uma passagem `Lc 1, 26-27`, 9 comentários.

```sql
select sort_order, title, artist, url
from public.images i
join public.mysteries m on m.id = i.mystery_id
where m.type = 'joyful' and m.sort_order = 1
order by sort_order;
```

## Template SQL — passagem + comentários (idempotente)

Substituir `$TYPE$`, `$SORT$`, textos e `values`. Usar dollar-quotes para textos longos.

```sql
-- Remover passagens de oração que não entram no pacote (opcional, por reference)
delete from public.passages p
using public.mysteries m
where p.mystery_id = m.id
  and m.type = '$TYPE$'
  and m.sort_order = $SORT$
  and p.reference in ('REF_A_REMOVER', 'REF_B_REMOVER');

insert into public.passages (mystery_id, text, reference, sort_order)
select m.id, $passage$TEXTO MATOS SOARES$passage$, 'REF BÍBLICA', 0
from public.mysteries m
where m.type = '$TYPE$' and m.sort_order = $SORT$
  and not exists (
    select 1 from public.passages p
    where p.mystery_id = m.id and p.reference = 'REF BÍBLICA'
  );

insert into public.commentaries (mystery_id, passage_id, text, author, source, sort_order)
select m.id, p.id, v.text, v.author, v.source, v.sort_order
from public.mysteries m
join public.passages p on p.mystery_id = m.id and p.reference = 'REF BÍBLICA'
join (values
  (0, 'Autor', 'Fonte', $c0$Texto$c0$)
) as v(sort_order, author, source, text) on true
where m.type = '$TYPE$' and m.sort_order = $SORT$
  and not exists (
    select 1 from public.commentaries c
    where c.passage_id = p.id and c.sort_order = v.sort_order
  );

update public.mysteries
set meditation_ready = (type = '$TYPE$' and sort_order = $SORT$)
where type = '$TYPE$' and sort_order = $SORT$;
```

**Nota:** o `update` acima só liga `true` a um mistério se reescrever a expressão para **não** desligar os já curados. Padrão seguro da Anunciação:

```sql
update public.mysteries
set meditation_ready = (type = 'joyful' and sort_order = 1);
```

Ao curar o segundo mistério, estender para:

```sql
update public.mysteries
set meditation_ready = (
  (type = 'joyful' and sort_order = 1)
  or (type = 'joyful' and sort_order = 2)
);
```

Ou `update … set meditation_ready = true where type = … and sort_order = …` só na linha nova.

## Template SQL — galeria de imagens

Substituir URLs e créditos. Anunciação apaga e reinsere o conjunto:

```sql
delete from public.images
where mystery_id = (
  select id from public.mysteries where type = '$TYPE$' and sort_order = $SORT$
);

insert into public.images (
  mystery_id, url, title, artist, description,
  sort_order, resize_mode, rotate_every_n_hail_marys
)
select m.id,
  'https://…',
  'Título da obra',
  'Artista',
  'Descrição / licença.',
  0,
  'contain',
  2
from public.mysteries m
where m.type = '$TYPE$' and m.sort_order = $SORT$;
```

Colunas opcionais (migration `20251030180000_images_focal_drift.sql`): `focal_x`, `focal_y`, `drift_x`, `drift_y` (0–1 ou drift ±1).

## Galeria embutida (`prayerAssets.ts`)

```typescript
'slug-aqui': {
  rotateEveryNHailMarys: 2,
  images: [
    {
      source: require('../../../assets/images/Obra_crop_sides.jpg'),
      credit: {
        title: '…',
        artist: '…',
        description: '…',
        sourceUrl: 'https://…',
      },
      resizeMode: 'contain',
      bakedLateralCropPercent: 88, // opcional
      motion: { focalX: 0.5, focalY: 0.38, driftX: 0.035, driftY: -0.025 }, // opcional
    },
  ],
},
```

Sem entrada em `EMBEDDED_MYSTERY_GALLERIES`, offline cai no fundo default (`DEFAULT_MYSTERY_BACKGROUND`).

## Wiring no repositório (checklist de ficheiros)

Ao adicionar slug `<slug>`:

1. `src/data/content/<slug>Meditation.json` — fonte única de verdade offline para passagem/comentários.
2. `meditationContentRepository.ts`:
   - import JSON;
   - `buildEmbeddedPassages`: skip `mystery_slug === '<slug>'`;
   - `embeddedPassages` / `embeddedCommentaries` (e `embeddedDeeper` se necessário);
   - constante `EMBEDDED_PASSAGE_<SLUG>_ID` alinhada ao id gerado.
3. `prayerAssets.ts` — galeria `<slug>`.
4. `assets/images/` — ficheiros referenciados.
5. `mysteryRepository.ts` — `meditationReady` no seed embutido.
6. `supabase/migrations/YYYYMMDDHHMMSS_<slug>_meditation.sql` — remoto.
7. `meditationContentRepository-test.ts` — asserções do bundle embutido.

## Precedência remoto / offline

`fetchMysteryMeditationBundle`:

- Passagens: remoto se houver linhas; senão embutido.
- Comentários: só os cujo `passage_id` está no conjunto de passagens mostradas; se remoto vazio, embutido filtrado da mesma forma.
- Imagens: remoto se houver; senão galeria embutida.

UUIDs remotos em passagens só emparelham comentários remotos com os mesmos ids; ids embutidos estáveis (`embedded-passage-…`) só funcionam com passagens embutidas.

## Fontes e qualidade

- Conferir primary sources (Suma, CCC, Padres, audiências) antes de gravar.
- Texto condensado de papas/modernos: declarar na coluna `source`, não fingir citação verbatim.
- CIC: preferir um comentário por número (484, 490, 494), como na Anunciação.
