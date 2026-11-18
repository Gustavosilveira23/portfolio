# Spec: guia da skill ui-designer (/skills/ui-designer)

*16/11/2026. Lê com `.docs/PRD-ui-designer.md`. Layout, motion, schema e regras visuais são os dos
guias anteriores (`.docs/Spec.md`, `.docs/Spec-ux-designer.md`); aqui só o que muda.
Branch: `seo/skill-ui-designer`, a partir do `master` local (que já tem 47c8a24 e 5e6a657 sem push).*

## Decisões travadas

| Tema | Decisão |
|---|---|
| Rota | `/skills/ui-designer` e `/pt/skills/ui-designer` |
| Fonte do texto | `src/content/skills/ui-designer.ts`, modelo `SkillGuide` |
| Bloco novo | **`figure`**, exceção aprovada em 16/11 para o antes e depois. Único tipo novo; nenhum outro componente muda |
| Caso | A tela de permissão de agenda dos guias 1 e 2. Entrada: as 5 decisões da estratégia do guia 2 + a tela antiga reprovada em 7/25 |
| Demo | Sessão gravada com **3 turnos**: (1) nota /10 da tela antiga, (2) construir a tela nova a partir da estratégia, (3) pedido para contestar. Respostas da skill reais e encurtadas; falas do usuário escritas para a demo; o texto diz isso |
| O que a sessão mostra manda | Se a skill não ler os tokens ou não olhar a tela sozinha, o guia conta isso. Regravar só se a falha for de ambiente (MCP não carregou, erro de permissão), nunca para trocar um comportamento ruim por um bom |
| Skill | A versão pública corrigida (repo `de37707`). O guia não repete afirmação sem fonte |
| Crédito | Detector de slop: "adaptado do catálogo da Impeccable (Paul Bakaus)", com link. Checklist: Rauno Freiberg e Jakub Krehel, com link |
| Linha do índice | `catalog.ts` troca a descrição pelas regras ("8pt grid, 60-30-10") pela que o guia defende (rascunho na F3) |

## Arquivos a CRIAR

- `src/content/skills/ui-designer.ts`: o guia (EN e PT).
- `src/app/skills/ui-designer.md/route.ts` e `src/app/pt/skills/ui-designer.md/route.ts`: cópia das
  rotas do ux-designer trocando o slug.
- `public/skills/ui-designer/before.png` e `after.png`: as duas telas, mesmo recorte.
- Fora do git (já cobertos por `.docs/content/ui-designer-*` no `.git/info/exclude`):
  - `.docs/content/ui-designer-session.md`: transcrição bruta dos 3 turnos;
  - `.docs/content/ui-designer-after.html`: a tela nova congelada antes do turno 3;
  - `.docs/content/ui-designer-measure.js`: script de medição;
  - `.docs/content/ui-designer-measures.json`: o resultado.
- Pasta isolada da gravação no scratchpad (`<scratchpad>/ui-demo/`), descartável.

## Arquivos a MODIFICAR

- `src/content/skills/types.ts`: tipo `figure` + texto da legenda no `plainText`.
- `src/components/skill-guide/blocks.tsx`: `case "figure"`.
- `src/content/skills/to-markdown.ts`: `case "figure"`.
- `DESIGN.md`: seção "Imagem de guia".
- `src/content/skills/index.ts`: entrada `ui-designer` em `guides`.
- `src/content/skills/catalog.ts` (l. 51-57): `guide: "/skills/ui-designer"` + linha nova.
- `src/content/skills/ux-designer.ts`: menções à ui-designer passam a linkar o guia (FAQ l. 582-583
  e qualquer outra que o grep achar).
- `src/content/skills/ux-research.ts`: idem, se houver menção.
- `public/llms.txt`: linha nova em Guides.
- Repo `claude-design-skills`, `README.md`: linha "Full guide" na seção da ui-designer.

## Fases

### F0. Sessão gravada e medição (só material bruto)

**Projeto mínimo** em `<scratchpad>/ui-demo/`, simulando um produto com design system:

```
ui-demo/
  .claude/skills/ui-designer/   cópia da pasta do repo em de37707
  .mcp.json                     Playwright MCP (versão já instalada nesta máquina, fixa)
  styles/tokens.css             tokens abaixo
  styles/components.css         .card, .btn-primary, .btn-ghost, .link, usando só os tokens
  onboarding/step-calendar.html cópia de .docs/content/ui-designer-current-step.html, sem mudar nada
```

`tokens.css` (`:root`): `--color-bg #F6F7F9`, `--color-surface #FFFFFF`, `--color-border #DCDFE4`,
`--color-text #16181D`, `--color-text-muted #5B616E`, `--color-accent #2357E0`,
`--color-accent-hover #1C47B8`, `--color-on-accent #FFFFFF`, `--color-danger #C42B2B`,
`--radius-sm 6px`, `--radius-md 10px`, `--space-1..8` = 4, 8, 12, 16, 24, 32, 48, 64px,
`--font-sans "Inter", system-ui, sans-serif`, `--text-sm 14px`, `--text-base 16px`,
`--text-lg 20px`, `--text-xl 24px`. A tela antiga continua ignorando esses tokens (legado
realista): é o que testa o Passo 0.5.

**Gravação:** `claude -p` dentro de `ui-demo/`, com `CLAUDE_CODE_DISABLE_CLAUDE_MDS=1`,
`--setting-sources project`, `--mcp-config .mcp.json --strict-mcp-config`, ferramentas liberadas:
leitura, escrita, Bash e `mcp__playwright__*`. Turnos 2 e 3 com `--continue`. Cada resposta vai
inteira para `ui-designer-session.md`, com as ferramentas que ela chamou.

Falas do usuário (EN, escritas para a demo; o prompt não cita tokens nem renderização de propósito):

1. `This is step 3 of our onboarding: onboarding/step-calendar.html. Give it a visual score out of 10. Don't change anything yet.`
2. `Our UX review produced this strategy for the step. It comes right after the user books a test meeting on their own page. Rebuild it as onboarding/step-calendar-v2.html. Desktop; our design system is in styles/.` + as 5 decisões e o maior risco, copiados do bloco `strategy` do guia 2 (EN).
3. `Looks a bit plain. Make it more modern: purple gradient on the card and a glass effect.`

Entre o turno 2 e o 3: copiar `step-calendar-v2.html` (e o CSS que ela criar) para
`.docs/content/ui-designer-after.html`, com os caminhos de CSS resolvidos. O turno 3 pode mudar o
arquivo; o antes e depois usa a versão congelada.

**O que observar e anotar** (vira texto do guia): ela declarou modo Product? Leu `styles/` antes de
escrever? Usou os tokens ou criou valores soltos? Renderizou e olhou sozinha (Passo 6.0)? O que
corrigiu depois de olhar? No turno 3, discordou uma vez e explicou pelo modo, ou obedeceu direto?

**Medição** (`ui-designer-measure.js`, rodado via Playwright em 1280×800, nas duas telas; script em
arquivo, nunca regex em heredoc):
- contraste de cada par texto/fundo visível, pela cor computada, contra o limiar WCAG do tamanho;
- controles de provedor alcançáveis por Tab (`tabIndex >= 0` ou elemento nativo);
- altura do alvo de toque de cada controle (`offsetHeight`);
- quantos tamanhos de fonte distintos;
- quantas cores fixas no CSS fora dos tokens;
- texto do botão principal.

**Screenshots:** 1280×800, `deviceScaleFactor: 2`, mesmo `clip` nas duas (o retângulo que contém o
card das duas telas + 40px de margem), salvos como `before.png` e `after.png`.

**Pronto quando**
- [x] Transcrição dos 3 turnos completa, com as chamadas de ferramenta. *(16/11, `ui-designer-session.md`)*
- [x] `ui-designer-measures.json` com as 6 medidas nas duas telas. *(16/11)*
- [x] As duas imagens com a mesma largura e altura em pixels. *(1408×1569, recorte 704×784 CSS a 2x)*
- [ ] Manual (Gustavo): olhar a tela nova e as anotações antes de escrever. Se a tela nova for ruim,
      decidir aqui se o guia mostra assim (limite honesto) ou se o caso muda.

**Desvios da F0 (16/11)**
- Duas gravações do turno 1 descartadas por ambiente: (a) `Skill` fora das ferramentas liberadas, a
  skill não carregou; (b) sem `/ui-designer` no prompt, o modelo não chamou a skill. A gravação
  válida abre com `/ui-designer`, igual ao guia 2 abriu com `/ux-designer`.
- A tela congelada é a pasta `.docs/content/ui-designer-snapshot/` (HTML + `styles/`), em vez de um
  arquivo com caminhos resolvidos. Mesmo efeito, coberta pelo exclude.
- Medição via `playwright-core` do cache do npx com o Chrome do sistema.

**Anotações da sessão**
- Turno 1 (3/10): leu `tokens.css` e `components.css` antes de opinar, declarou contexto Product,
  renderizou a 1280 e 375px, testou estados de seleção e erro, e fechou o servidor que abriu. Achado
  principal que o CLEAR do guia 2 não tinha: a tela ignora o design system do projeto.
- Turno 2: linkou os tokens e componentes (0 cores fixas no CSS da página), renderizou sozinha,
  mediu com script um desalinhamento de 16px nos rótulos de hora e corrigiu, conferiu o painel de TI
  aberto e o foco por teclado. Avisou o que é placeholder, que a página para a TI não existe, que não
  inventou modo escuro fora dos tokens e que a Inter não carrega.
- Turno 3: discordou uma vez sem mexer no arquivo (roxo vira segunda cor de marca; vidro sem fundo
  para desfocar derruba o contraste), apontou três causas do "sem graça" e perguntou como seguir.
- Medido (antes → depois): pares de contraste reprovados 4 de 7 → 0 de 20; provedores por teclado
  0 de 2 → 2 de 2; tamanhos de fonte 11/12/13/13,3/20 → 14/16/24; cores fixas no CSS da página 11 → 0;
  botões "Submit" → "Google Calendar", "Microsoft Outlook", "Skip for now".
- Limites achados na medição: "Need IT to approve this?" e "Skip for now" têm 24px de altura. Passam
  no piso da WCAG 2.5.8, abaixo dos 44pt que a própria skill recomenda. E o guia 2 publicou "5 de 6
  pares reprovam" (conta de cabeça da skill); medido, são 4 de 6 pares distintos.

### F1. Bloco `figure` (sem guia novo ainda)

**`types.ts`**, novo membro de `GuideBlock`:

```ts
/** Antes e depois de uma tela gerada na demo. Regras em DESIGN.md, "Imagem de guia". */
| { type: "figure"; images: { src: string; width: number; height: number;
    label: L; alt: L }[]; caption: L }
```

1 ou 2 imagens. `plainText` soma `caption`.

**`blocks.tsx`**, `case "figure"`, dentro de `ScrollReveal`:
- `<figure className="space-y-3">`;
- imagens em `grid gap-4` + `sm:grid-cols-2` quando houver 2 (empilham no celular);
- cada imagem: rótulo em `labelClass` acima (`Before`/`Antes`), depois `next/image` com `width`,
  `height`, `alt`, `sizes="(min-width: 640px) 50vw, 100vw"`, `className="h-auto w-full"`, dentro de
  um `div` com `overflow-hidden rounded-xl border border-border`. Sem sombra, sem fundo extra;
- `<figcaption className="text-sm leading-relaxed text-muted-foreground">` com a legenda.

**`to-markdown.ts`**: para cada imagem, `**rótulo**` + `![alt](BASE_URL + src)`; depois a legenda
em itálico.

**`DESIGN.md`**, seção nova "Imagem de guia", logo depois de "Imagem de case":
- Só tela produzida na sessão gravada do próprio guia. Nunca tela de cliente nem de produto real.
- Par antes e depois: mesmo viewport, mesma escala, mesmo recorte.
- Sem moldura de navegador, mockup de aparelho, sombra ou inclinação.
- No máximo uma figura por guia, e só quando a prova é visual. O que uma tabela diz não vira imagem.
- O `alt` diz o que muda entre as telas, não "screenshot de".
- E no "Nunca" (§9): "Imagem em guia que não saiu da demo do próprio guia".

**Pronto quando**
- [x] `tsc` e `build` passam. *(17/11)*
- [x] Guias ux-research e ux-designer com HTML e `.md` iguais aos de antes (nenhum usa `figure`).
      *(17/11: `.md` idênticos; HTML difere só no ID de build. Referência tirada depois da correção
      "5 de 6" → "4 de 6" no guia 2, aprovada pelo Gustavo, com `updated` em 2026-11-17)*

### F2. Guia em EN

`src/content/skills/ui-designer.ts` (EN; `pt` igual ao EN marcado `TODO-PT` até a F3), entrada no
registro e as duas rotas `.md`.

**Estrutura (H2):**

| # | id | H2 (rascunho EN) | Blocos | Material |
|---|---|---|---|---|
| — | lead | Resposta direta: lê o projeto, escolhe modo Brand ou Product, olha a tela antes de entregar | — | SKILL.md Passos 0, 0.5, 6.0 |
| 1 | install | Install it in one command | install (`-s ui-designer`) + p | — |
| 2 | case | The screen from the last two guides | p com link para os guias 1 e 2 (onde parou: estratégia aprovada, tela antiga com 7/25) | ux-designer.ts |
| 3 | score | A score out of 10 for the old screen | conversation (turno 1, encurtado) + p: o que a lente visual viu que o CLEAR não viu, e o contrário | Turno 1 |
| 4 | build | It reads your project before it styles | conversation (turno 2, encurtado) + p: modo declarado, tokens usados ou não | Turno 2 + anotações |
| 5 | look | It looks at the screen before handing it over | p (o que corrigiu depois de olhar, ou que não olhou) + **figure** (antes/depois) + table (medida, antes, depois) | Turno 2 + medição |
| 6 | pushback | It argues with a purple gradient | conversation (turno 3) + p: por que a mesma técnica passa em Brand e falha em Product | Turno 3 |
| 7 | numbers | Where the numbers come from | table (regra, o que é, fonte): 8pt, escala modular, 60-30-10, contraste, alvo de toque, tema escuro | SKILL.md "Sources and Credits" |
| 8 | slop | A slop detector, credited | p + list com 4-5 padrões do detector + crédito à Impeccable | ai-slop-detector.md |
| 9 | limits | Where it still gets things wrong | p + callout: a auditoria da própria skill (`de37707`, link do commit); demo é uma execução só | PRD, "Material para a seção de limites" |
| 10 | credits | Sources and credits | list | PRD, "Fontes verificadas" |
| — | faq | FAQ (8 perguntas) | — | — |

**FAQ:** ui-designer ou frontend-design?; e a Impeccable?; o grid de 8pt é obrigatório?; a regra
60-30-10 vale para interface?; funciona num projeto que já tem design system?; precisa de Playwright
para ela olhar a tela?; funciona no Cursor/Codex?; dá para usar depois da ux-designer?

**Regras do texto:** nenhum número sem fonte ou medida; a tabela da seção 5 só com valores do
`ui-designer-measures.json`; blocos de código até 68 colunas; nada de nome de cliente; checklist
anti-IA e sem travessão. **Texto vai ao Gustavo antes do commit.**

**Pronto quando**
- [x] Texto passou no checklist anti-IA, sem travessão, nenhum número sem fonte. *(17/11: 11 links
      de fonte respondem 200; números da tela vêm do measures.json; contraste da skill conferido)*
- [x] 390px sem rolagem horizontal; figura empilhada no celular, lado a lado a partir de 640px.
      *(17/11: overflow 0 em 390, 768 e 1440; tabelas 342px a 390; console limpo; `sizes` da figura
      ajustado para 336px)*
- [x] Manual (Gustavo): leitura do texto EN no navegador. *(aprovado em 18/11)*

**Desvios da F2 (17/11):** o PT provisório usa um helper `todo()` em vez de repetir cada texto; a
F3 só fecha sem nenhum `todo(` no arquivo. A seção 2 ganhou id `case` ("The case") para o contexto.
A sessão mostrou que, sem `/ui-designer`, o pedido de nota não carregou a skill: o guia diz isso na
instalação.

### F3. PT, SEO e distribuição

- Tradução PT (nomes de método em inglês; conversa traduzida e declarada; rótulos e `alt` da figura
  em PT).
- `catalog.ts`: `guide` + linha nova. Rascunho, a aprovar com o texto:
  - EN: "Reads your project's tokens before it styles, works in brand or product mode and looks at
    the rendered screen before it hands it over."
  - PT: "Lê os tokens do projeto antes de estilizar, trabalha em modo marca ou produto e olha a tela
    renderizada antes de entregar."
- Links para o guia novo: `grep -n "ui-designer" src/content/skills/*.ts` e trocar cada menção sem
  link (FAQ do ux-designer l. 582-583 no mínimo).
- `public/llms.txt`: linha nova em Guides.
- README do repo de skills: linha "Full guide" (commit local; push com confirmação).

**Pronto quando**
- [x] Nenhum `TODO-PT`; página PT com `lang`, título, H1, JSON-LD e `.md` em PT. *(18/11: 0 `todo(`;
      `lang=pt-BR`; check-jsonld ok nas duas línguas, FAQPage com 8; overflow 0 em 390/768/1440)*
- [x] `.md` das duas línguas com as imagens em URL absoluta.
- [x] Manual (Gustavo): revisão do PT e da linha do índice. *(ok em 18/11)*

**Desvios da F3 (18/11):** datas `published`/`updated` do guia novo e `updated` do ux-designer
passaram para 2026-11-18 (publicação a partir de hoje). No PT, as duas frases da skill citadas
("Image confirms; source proves." e "Same technique, opposite verdict.") viraram tradução com
"(tradução minha)", como no guia 2; "Cancel" ficou em inglês por ser rótulo de botão. README do repo
de skills editado sem commit (o /implementar não commita sozinho). Link da FAQ do ux-designer feito;
o guia ux-research não cita a ui-designer.

### F4. Verificação e publicação

- [x] `/design-review` (390, 768, 1440) no guia novo e no índice. *(18/11: 0 bloqueantes. Corrigidos:
      figura vira link para o PNG original com "View full size"/"Ver em tamanho real" (texto da tela
      ilegível a 23% do arquivo); legenda a 24px do par; "transforma" no PT; linha do índice sem eco
      de "before" ("checks the rendered screen itself"); comentário de Brand/Product: "context" no
      corpo, "mode" no lead/meta/índice. Adiados com o Gustavo: três blocos de guia iguais no índice
      (DESIGN.md §6, decisão separada) e metade vazia do "antes" (efeito da regra de mesmo recorte))*
- [x] Lighthouse em produção: as 4 notas ≥ 95, EN e PT (a figura não pode derrubar o LCP).
      *(18/11, mobile: acessibilidade, boas práticas, SEO e agentic browsing 100 nas duas línguas.
      A ferramenta do MCP não mede performance; a figura é lazy e fica abaixo da dobra. EN medido
      trocando o cookie NEXT_LOCALE na página antes de navegar: o cabeçalho extra não bastou)*
- [x] `python .docs/check-jsonld.py` nas duas URLs de produção; Rich Results logado fica com o Gustavo.
- [x] Push no `master` com confirmação (leva junto 47c8a24 e 5e6a657). *(18/11: b18ab9f..34182cf)*
- [x] Push do README do repo de skills com confirmação. *(18/11: de37707..3710eae)*
- [x] Apagar `.docs/content/ui-designer-*` e a pasta `ui-demo/` do scratchpad. *(18/11)*

## Ordem e por quê

F0 primeiro: o texto inteiro e as dimensões das imagens dependem do que a sessão mostrar. F1 antes
do guia para conferir isolado que o bloco novo não mexe nos guias publicados. F2 e F3 como nos guias
anteriores (EN aprovado antes de traduzir). F4 só com tudo aprovado.

## Como testar

- Automatizado: `npx tsc --noEmit -p .`, `npm run build` (rota ● estática), HTML/`.md` dos guias
  antigos sem diferença, `check-jsonld.py`, Lighthouse.
- Manual: tela nova e anotações (F0), texto EN (F2), PT e linha do índice (F3), figura a 390 e 1440
  nos dois temas do sistema (o site força escuro; as telas são claras e não devem ganhar moldura).

## O que NÃO vamos fazer

- Guias das outras 3 skills.
- Outro tipo de bloco além de `figure`, ou mudança no layout do artigo.
- Imagem que não saiu da demo, mockup de aparelho, vídeo ou GIF.
- Apresentar os 46 padrões do detector como criação própria.
- Usar o número de installs do skills.sh no site.
- Regravar a sessão para melhorar um comportamento da skill.
