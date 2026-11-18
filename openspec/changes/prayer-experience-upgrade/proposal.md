# Proposal

## Why

Rezar com o app ainda tem atritos que não existem num terço físico. A tela apaga no meio da dezena, só se sabe em que conta se está olhando para a tela e o texto tem tamanho fixo. Também não há registro do que já se rezou nem lembrete.

A meditação, que é o diferencial do app, tem uma passagem por mistério. A revisão do conteúdo encontrou passagens condensadas sem marca de corte, uma glosa editorial dentro do Apocalipse, paráfrases exibidas com o nome de papas e comentários repetidos ou fora do mistério.

## What Changes

- **Tela acesa** enquanto a oração está aberta.
- **Vibração a cada conta**, com um padrão diferente no Glória que fecha a dezena e outros no anúncio do mistério e na conclusão. Fica ligada por padrão e pode ser desligada.
- **Ave-Marias iniciais**: o padrão passa a ser “Pelo aumento da fé / da esperança / da caridade”. O Angelus continua como opção.
- **Contador de terços**, mostrado na home, na conclusão e nos ajustes.
- **Lembrete diário** opcional, com hora escolhida em passos de 15 minutos.
- **Tamanho do texto** em três níveis.
- **Tela “Ajustes”** acessível pela home, reunindo essas opções.
- **Conteúdo**: cada mistério passa a ter duas ou três passagens, com o texto verbatim de Matos Soares e cortes marcados com “…”. Os comentários existentes são redistribuídos pela passagem a que se referem, e 18 saem (paráfrases, duplicados e ligações indiretas). A grafia original de cada fonte é mantida. Uma migration alinha o Supabase ao conteúdo embutido.
- **Obras de fundo inteiras**: obra mais larga (ou alta) que a tela é percorrida de borda a borda, em vai e volta lento; antes a deriva de 3,5% deixava até três quartos de uma obra larga fora da tela.
- **“Outra meditação”**: sorteia outro par de passagem e comentário do mesmo mistério.

### Decisão revertida

A change arquivada `2026-10-30-meditation-passage-comments` removeu “Outra passagem” e “Outro comentário” porque a troca tirava a pessoa da meditação. O dono do produto pediu de volta uma forma de trocar a meditação. Esta change usa um controle único e discreto, que troca o par inteiro e não aparece quando só existe um par. A spec principal `meditation-content` ainda tinha o texto antigo (“another passage / another commentary”); este delta o substitui.

## Capabilities

### Modified Capabilities

- `rosary-prayer`: Ave-Marias iniciais, tela acesa, vibração, tamanho do texto, tela de ajustes.
- `meditation-content`: várias passagens por mistério, regras de fidelidade do texto, “Outra meditação”.
- `local-experience`: contador de terços (definição precisa) e lembrete diário.

## Impact

- **Dependências:** `expo-keep-awake`, `expo-haptics`, `expo-notifications` (plugin no `app.json`). É preciso um novo development build.
- **UI:** `src/app/ajustes.tsx` (nova), home, `PrayerScreen`, `MeditationBlock`, `PrayerTextBlock`.
- **Domínio:** `prayerPreferences`, `hapticCue`, `completionCount`, `buildPrayerSteps` (opção das Ave-Marias iniciais).
- **Dados:** novo formato dos JSON em `src/data/content/` (`passages[]`, cada uma com `commentaries[]`) e a migration `20261117120000_multi_passage_meditations.sql`, que substitui passagens e comentários remotos.
- **Persistência local:** `@rosario/preferences` e `@rosario/completed-tercos`.

## Fora do escopo

- **Ave Regina caelorum.** Não foi encontrada gravação gregoriana sob licença sem restrição não comercial: o Wikimedia Commons só tem MIDI e partituras; o Internet Archive e o Jamendo (Zefiro) têm CC BY-NC-SA; o Freesound tem polifonia CC BY-NC com aplausos. O fallback para a Salve Regina continua.
- Campo de intenção da oração.
- Sincronizar o contador entre aparelhos, estatísticas ou histórico por data.
- Imagens novas e mudanças nas referências “Quero me aprofundar”.
