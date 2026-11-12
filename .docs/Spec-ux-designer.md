# Spec: guia da skill ux-designer (/skills/ux-designer)

*11/11/2026. Lê com `.docs/PRD-ux-designer.md`. Layout, motion, schema e regras visuais são os do
primeiro guia (`.docs/Spec.md`); aqui só o que muda. Branch: `seo/skill-ux-designer`.*

## Decisões travadas

| Tema | Decisão |
|---|---|
| Rota | `/skills/ux-designer` e `/pt/skills/ux-designer` |
| Fonte do texto | `src/content/skills/ux-designer.ts`, mesmo modelo `SkillGuide` (sem tipo de bloco novo) |
| Caso | Continua o brief "Permissão de agenda no onboarding" do guia ux-research, com um parágrafo de contexto e link para lá |
| Demo | Sessão gravada em 10/11 (`.docs/content/ux-designer-session.md`). Respostas da skill reais e encurtadas; falas do usuário escritas para a demo; o texto diz isso, como no primeiro guia |
| Skill | Corrigida antes do guia (repo `f70854e`, 11/11): o guia não repete nenhuma afirmação sem fonte |
| CLEAR | "Scorecard adaptado do CLEAR UI (Growth.Design)", com link. Nada do material do curso |
| ELMR | "Da Reforge (atribuído a Brian Balfour em fontes secundárias)", com a fonte secundária linkada |

## Estrutura do guia (H2)

| # | id | H2 (rascunho EN) | Blocos | Material |
|---|---|---|---|---|
| — | lead | Resposta direta: o que a skill faz, em 2-3 frases | — | SKILL.md Passos 1, 2, 9 |
| 1 | install | Install it in one command | install (`-s ux-designer`) + p | — |
| 2 | gate | It asks before it builds | p (contexto + link pro guia 1) + conversation (turno 1, encurtado) | Turno 1 |
| 3 | strategy | Strategy before code | p + code "What comes back (excerpt)" | Turno 2 |
| 4 | pushback | It pushes back | conversation (turno 3, encurtado) + p | Turno 3 |
| 5 | audit | Audits: a score out of 10, or a CLEAR scorecard | p (dois formatos) + table (5 dimensões, nota, problema) + code (achados críticos) + p | Turno 4 + página de auditoria |
| 6 | checks | What it checks while it designs | list: psicologia e leis, fluxo e estados, microcopy, acessibilidade, motion. Cada item com a fonte que a skill cita agora | SKILL.md corrigido |
| 7 | ai-limits | Where AI fails at UX review | p + callout | Baymard 2023, NN/g jan/2026, Napoli 2026. **Reconferir os números na fonte antes de escrever** |
| 8 | credits | Frameworks and credits | list | ELMR, CLEAR, Laws of UX, NN/g, papers |
| — | faq | FAQ (8 perguntas) | — | PRD, seção "Perguntas reais" |

**FAQ:** skill vs. prompt; precisa programar?; a IA consegue auditar UX, é confiável?; isso é
avaliação heurística? (não: leis de UX + CLEAR, não as 10 de Nielsen); como fazer o Claude perguntar
antes de construir; funciona no Cursor/Codex?; dá pra usar com as outras skills (ux-research antes,
ui-designer depois)?; o que é ELMR / o que é CLEAR.

**Cortar da sessão:** a tentativa de publicar página no turno 4 e o comentário sobre o arquivo da
pasta no turno 1.

## Fases

### F1. Rota única para os guias (sem mudança visível)

- `src/content/skills/index.ts`: registro `guides: Record<string, SkillGuide>` e `getGuide(slug)`.
- `src/app/[locale]/skills/[slug]/page.tsx` e `opengraph-image.tsx`: movidos de `ux-research/`,
  lendo o guia do registro; `generateStaticParams` a partir do registro, `dynamicParams = false`.
- `src/content/skills/markdown-response.ts`: recebe o guia (`markdownResponse(guide, locale)`).
  As rotas `.md` continuam uma pasta por guia (Next não aceita segmento `[slug].md`): 4 linhas cada.
- `src/app/sitemap.ts`: URLs dos guias a partir do registro.

**Pronto quando**
- [x] `tsc` e `build` passam; `/skills/ux-research` sai estática (●). *(11/11)*
- [x] HTML de `/skills/ux-research` e `/pt/...` igual ao de antes (diff do HTML de produção, sem
      contar hashes de build); OG, `.md` e sitemap respondem igual. *(11/11: `.md` idêntico; HTML
      difere só no ID de build e no `og:image:alt`, que ficou genérico porque o export `alt` não
      recebe o slug; OG com o mesmo tamanho em bytes; sitemap só muda nas datas de build das
      páginas que já usavam `new Date()`; slug inexistente dá 404)*

### F2. Guia em EN

- `src/content/skills/ux-designer.ts` (EN; `pt` provisório igual ao EN só até a F3, marcado `TODO-PT`
  e barrado pelo build da F3).
- Registro, `src/app/skills/ux-designer.md/route.ts` + `src/app/pt/...`.
- `catalog.ts`: ux-designer ganha `guide`. Índice: **toda skill com guia vira bloco de destaque**,
  as sem guia continuam em linha. Hoje o código assume só a primeira.
- Guia ux-research, seção Specify: o link "[ux-designer skill](/skills)" passa a apontar para
  `/skills/ux-designer`.

**Pronto quando**
- [x] Texto passou no checklist anti-IA, sem travessão, nenhum número sem fonte. *(11/11; números da seção de limites reconferidos lendo Baymard, arXiv 2507.02306 e Napoli)*
- [x] 390px sem rolagem horizontal; blocos de código com até 68 colunas. *(11/11; lead termina em 703 de 844px depois de cortar a última frase)*
- [x] Manual (Gustavo): leitura do texto EN no navegador. *(12/11)*

### F3. PT, SEO e distribuição

- Tradução PT (mesmas regras do primeiro: nomes de método em inglês, conversa traduzida e
  declarada, citação traduzida marcada).
- `llms.txt` (linha nova em Guides), sitemap (já automático pela F1).
- README do repo de skills: linha "Full guide" na seção da ux-designer (push com confirmação).

**Pronto quando**
- [ ] Nenhum `TODO-PT`; página PT com `lang`, título, H1, JSON-LD e `.md` em PT.
- [ ] Manual (Gustavo): revisão do PT.

### F4. Verificação e publicação

- [ ] `/design-review` (390, 768, 1440) no guia novo e no índice.
- [ ] Lighthouse em produção: as 4 notas ≥ 95.
- [ ] Rich Results Test em produção sem aviso.
- [ ] Apagar `.docs/content/ux-designer-session.md` e `ux-designer-audit.html`.
- [ ] Push no `master` só com confirmação.

## O que NÃO vamos fazer

- Guias das outras 4 skills.
- Tipo de bloco novo, componente novo ou mudança no layout do artigo.
- Reproduzir material do curso CLEAR ou competir com o Growth.Design.
- Usar o número de installs do skills.sh no site.
