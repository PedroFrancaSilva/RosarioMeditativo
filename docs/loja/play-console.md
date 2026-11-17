# Publicação no Google Play — Ora et Contempla

Roteiro e textos prontos para o Play Console. Pacote: `com.rosariomeditativo.app`.

## 1. Antes de enviar

- [ ] Aplicar `supabase/migrations/20261117120000_multi_passage_meditations.sql` no Supabase. A produção lê o conteúdo remoto, que prevalece sobre o embutido.
- [ ] Confirmar os direitos de reprodução dos textos (ver seção 7).
- [ ] Publicar a política de privacidade (`docs/loja/politica-de-privacidade.md`) numa URL pública e preencher o e-mail de contato.

## 2. Criar o app (Play Console → Criar app)

| Campo | Valor |
|---|---|
| Nome do app | Ora et Contempla: Terço |
| Idioma padrão | Português (Brasil) – pt-BR |
| App ou jogo | App |
| Gratuito ou pago | Gratuito |

## 3. Ficha da loja

**Nome (até 30):** Ora et Contempla: Terço

**Descrição curta (até 80):**
> Reze o Terço com o Evangelho, os santos e a arte sacra, passo a passo.

**Descrição completa (até 4000):**
> Ora et Contempla é um convite para rezar o Terço e o Rosário com calma, contemplando a vida de Jesus com Maria.
>
> O app conduz cada oração, conta por conta, para que você reze mesmo sem saber as orações de cor. Em cada mistério, uma passagem do Evangelho e um comentário dos santos, dos Padres da Igreja, dos papas ou do Catecismo ajudam a meditar. Ao fundo, obras-primas da arte sacra (Fra Angelico, Rembrandt, Murillo e outros) são percorridas lentamente enquanto você reza.
>
> • Terço do dia, terço à escolha, Rosário completo ou um mistério avulso
> • Mistérios Gozosos, Dolorosos, Gloriosos e Luminosos
> • Meditação com passagens bíblicas (tradução do Pe. Matos Soares) e comentários com fonte
> • “Outra meditação” para variar a passagem e o comentário
> • Canto gregoriano opcional, com a antífona mariana do tempo litúrgico
> • Vibração a cada conta, para rezar sem olhar a tela
> • A tela não apaga durante a oração
> • Retome de onde parou
> • Contador de terços rezados
> • Lembrete diário opcional
> • Tamanho do texto ajustável
> • Funciona sem internet
>
> Sem cadastro, sem anúncios e sem coleta de dados.
>
> “Permanecei em mim” (Jo 15, 4).

**Categoria:** Estilo de vida (alternativa: Livros e referências). **Tags:** religião, oração.

**Gráficos exigidos:**
- Ícone 512×512 PNG (a partir de `assets/images/icon.png`).
- Imagem de destaque 1024×500.
- Pelo menos 2 capturas de tela de celular (recomendado de 4 a 8). Sugestões: home; anúncio do mistério com meditação; Ave-Maria com obra ao fundo; Ajustes; conclusão com contador.

## 4. Conteúdo do app (Política → Conteúdo do app)

| Seção | Resposta |
|---|---|
| Política de privacidade | URL pública da política |
| Anúncios | Não contém anúncios |
| Acesso ao app | Todo o app está disponível sem restrições (sem login) |
| Público-alvo | 13+ (ou 18+). Evite marcar menores de 13: isso traz exigências da política Famílias |
| Classificação de conteúdo | Questionário IARC: categoria “Referência, notícias ou educação”; responder “Não” a violência, sexo, linguagem, drogas, jogos de azar e interação entre usuários. Esperado: Livre / L |
| App de notícias | Não |
| Governo | Não |
| Recursos financeiros | Nenhum |
| Saúde | Não |

### Segurança dos dados

- **O app coleta ou compartilha algum dos tipos de dados exigidos?** Não.
  - Ajustes, contador e sessão ficam só no aparelho e não são transmitidos (não contam como “coleta” para o Google).
  - As leituras do Supabase e das imagens não enviam dados do usuário.
- **Os dados são criptografados em trânsito?** Sim (HTTPS).
- **Os usuários podem pedir exclusão?** Não se aplica: nenhum dado é coletado.

## 5. Primeiro envio (manual, exigido pela Google)

1. Baixe o `.aab` do build de produção no expo.dev (Builds → o build mais recente → Download).
2. Play Console → Testes → **Teste interno** → Criar versão.
3. Aceite o **Play App Signing** (a Google guarda a chave de assinatura; a keystore do EAS vira a chave de upload).
4. Envie o `.aab`, escreva as notas da versão e publique para os testadores (seu e-mail na lista).
5. Instale pelo link de teste e confira no aparelho: vibração, tela acesa, lembrete, conteúdo novo.
6. Depois promova a versão para **Produção**. A primeira revisão da Google costuma levar de alguns dias a uma semana.

> Contas pessoais criadas depois de nov./2023 precisam de **teste fechado com pelo menos 12 testadores por 14 dias** antes de liberar Produção. Conta de organização não tem essa exigência.

## 6. Próximas versões (automático)

1. Crie no Google Cloud uma conta de serviço com acesso ao Play Console (Usuários e permissões → convidar o e-mail da conta de serviço com permissão de lançar versões) e baixe a chave JSON.
2. Rode `npx eas-cli@latest submit -p android --profile production` e informe a chave quando pedir (ou configure `serviceAccountKeyPath` e `track` em `eas.json` → `submit.production.android`).
3. Fluxo de cada versão: `eas build -p android --profile production` → `eas submit -p android`. O `versionCode` sobe sozinho (`autoIncrement`, versão remota).

## 7. Direitos dos textos (verificar antes de publicar)

| Material | Situação |
|---|---|
| Bíblia, trad. Pe. Matos Soares | O projeto anota: confirmar direitos com a editora (Ecclesiae) |
| Catecismo da Igreja Católica (pt) | Tradução oficial © Libreria Editrice Vaticana; cerca de 50 trechos |
| Liturgia das Horas (CNBB), Lírio Católico, outras traduções citadas | Traduções com titular; usar com autorização ou trocar por tradução própria/domínio público |
| Obras de arte | Domínio público (PD-Art, Met Open Access CC0) |
| Cantos | CC BY-SA, com crédito mostrado na home |

Isto não é aconselhamento jurídico. Para distribuição numa loja, o mais seguro é obter autorização por escrito ou substituir os trechos.
