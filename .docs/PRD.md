# PRD: guias das Claude Skills (começando por ux-research)

*03/11/2026. Fase de pesquisa do workflow SDD. Documenta o que existe e o que foi decidido; o plano
tático vai para `.docs/Spec.md`.*

## Objetivo

Página de conteúdo no site ensinando a usar as skills de design do Gustavo, com foco em SEO e GEO
(ser citado por ChatGPT, Perplexity, Claude e AI Overviews). Primeira: `ux-research`. As outras
cinco (ux-designer, ui-designer, design-system, creative-coding, figma-craft) reaproveitam o
template depois.

## Decisões tomadas

| Decisão | Escolha |
|---|---|
| Público | 1) Designers e PMs que querem usar IA em pesquisa. 2) Potenciais clientes: um cliente real (Mathieu) já chegou ao Gustavo por indicação de IA, então a página também prova que ele é referência em IA no processo de design |
| URL | `/skills` (índice) e `/skills/ux-research`, com `/pt/...`. Rótulo na nav: "Claude Skills" |
| Profundidade | Uma página-pilar por skill. Estrutura pronta para virar subpáginas por modo se a busca mostrar demanda |
| Idioma | EN é a voz principal, PT é tradução |
| Fundação SEO | Feita em 03/11: `lang` por idioma e canonical + hreflang por página (`src/lib/seo.ts`) |

## O que existe no código

- Nenhuma seção de conteúdo. Página mais parecida: `src/app/[locale]/process/page.tsx` (lista simples).
- SEO: metadata global em `src/app/layout.tsx`; JSON-LD `Person` em `src/app/[locale]/layout.tsx`;
  `src/app/sitemap.ts` escrito à mão (precisa de entrada nova); `public/llms.txt`.
- Imagem OG dinâmica de case em `src/app/[locale]/portfolio/[slug]/opengraph-image.tsx` (modelo a copiar).
- Componentes de motion reaproveitáveis: `scroll-reveal`, `typewriter`, `magnetic`, `horizontal-scroll`.
- Regras visuais: `DESIGN.md` (monocromático, um display por seção, motion serve à leitura,
  `prefers-reduced-motion` obrigatório, sem `text-[...]`).

## Fonte do conteúdo

- `~/.claude/skills/ux-research/SKILL.md` (585 linhas) + `references/` (research-methods,
  interview-guide, atomic-research, specs-templates). ~1.700 linhas no total.
- Repo público: github.com/Gustavosilveira23/claude-design-skills.
  Instalação: `npx skills add Gustavosilveira23/claude-design-skills --all -g`.
- **A versão pública da skill tem a moldura "not part of this repo" nos handoffs e não pode citar
  cliente.** A página segue a mesma regra.

## Pesquisa de busca (03/11/2026)

Demanda qualitativa (sem ferramenta de volume), julgada pelo SERP e pela concorrência.

| Cluster | Demanda | Leitura |
|---|---|---|
| "claude code skills for designers / UI UX" | Alta e subindo | skills.sh lançado em jan/2026; listas "best skills" em 5 idiomas (Snyk, UX Planet, Pillitteri) |
| "claude skills ux research", "claude for user research" | Média | Diretórios + Great Question, Lyssna, ClaudeCodeHQ. Quase nenhum autor praticante. **Alvo principal** |
| "AI user interview synthesis" | Alta, comercial | Fornecedores (Outset, Great Question) e Teresa Torres. Alvo secundário via FAQ |
| "atomic research" | Baixa a média, perene | Maze, UXtweak, User Interviews. Alvo secundário via seção Synthesize |
| "UX research plan template" | Alta, fechado | Miro, Airtable. Não é alvo |
| PT-BR | Baixa | Pouca oferta. Fácil de ocupar |

**Concorrente mais forte:** Great Question, "Claude skills for UX research" (atualizado 12/10/2026,
26 skills, FAQ de 7 perguntas). Não mostra o texto das skills, não tem comando de instalação, não
cita Atomic Research, Torres nem Sirjani.

**Lacuna a ocupar:** ninguém junta (a) skill instalável em um comando, (b) frameworks com nome e
crédito, (c) exemplo real de saída (fato > insight > recomendação com confiança), (d) autor
praticante com nome e rosto. O item (d) é o que o público de clientes procura.

**Outras skills de pesquisa concorrentes:** rampstackco/ux-research, alirezarezvani/ux-researcher-designer,
mohitagw15856/pm-claude-skills, plugin oficial user-research da Anthropic (o tessl critica a falta
de exemplos e de sequência).

**skills.sh:** segundo a pesquisa, o repo já está listado (204 installs, 31 da ux-research).
*Conferir na página antes de usar qualquer número no site.*

## GEO: o que tem evidência

- **Paper GEO** (Aggarwal et al., KDD 2024, arXiv 2311.09735): citação direta (+~41%),
  estatística (+~33%) e fonte citada (+~28%) aumentam a visibilidade na resposta; keyword stuffing
  piora (-~9%). → Citar Torres, Pidcock, Sirjani e NN/g textualmente, com link.
- **Frescor** (Ahrefs, 17M de citações): assistentes citam conteúdo mais novo que o SERP orgânico.
  → Data de atualização visível e atualização real.
- **Google** (developers.google.com/search/docs/appearance/ai-features): não exige schema especial
  nem arquivo para IA. **llms.txt** sem sinal preditivo de citação (SE Ranking, ~300 mil domínios).
  → Versão `.md` e llms.txt ficam porque custam pouco e ajudam agentes a ler, não porque movem citação.
- **Opinião de mercado, sem prova forte:** seções de 120-180 palavras entre headings; resposta
  direta no primeiro terço da página. Fazer porque é barato.

## Schema.org

- `TechArticle` com `author` Person (sameAs GitHub/LinkedIn), `datePublished`, `dateModified`.
- `BreadcrumbList`: Skills > UX Research.
- `SoftwareSourceCode` em `about`, com `codeRepository`. Sem rich result; deixa a entidade clara.
- **FAQPage:** rich result removido pelo Google em 2026 (doc: "no longer appear... starting May 7,
  2026"). O FAQ entra como conteúdo; a marcação é opcional.
- **HowTo:** fora desde set/2023. Não usar. **SoftwareApplication:** evitar (pede preço e avaliação).

## Limite da IA na síntese: fonte a usar

A skill dizia "AI summaries can miss 20-40% of important detail", sem fonte. **Resolvido em
03/11/2026:** a skill (as duas cópias, commit `0187a44` no repo de skills) agora cita a fonte
primária, que é a que a página também usa:

- Kate Moran e Maria Rosala, NN/g, "Accelerating Research with AI" (27/09/2024, revisado em
  21/01/2026): https://www.nngroup.com/articles/research-with-ai/
- Citações verbatim: "It might miss, misinterpret, or even manufacture insights." /
  "it often misses large sections of the transcript where codes should be applied" /
  "Never rely on AI tools to perform all your analysis for you."
- Não usar o percentual em lugar nenhum. A palestra "Human vs. machine" (Rosenfeld) foi
  descartada: o site bloqueia leitura e não deu pra confirmar autoria.

## Sugestões de título (rascunho, entram no texto para revisão)

- EN title: `UX Research Skill for Claude Code | Gustavo Silveira` (52)
- EN meta: "A Claude Code skill that plans research, scripts interviews and turns findings into
  traceable insights, using Atomic Research and Continuous Discovery." (151)
- PT title: `Skill de UX Research para Claude Code | Gustavo Silveira` (56)

## Estrutura sugerida (H2)

1. What the ux-research skill does (resposta direta, 2-3 frases)
2. Install it in one command
3. Plan: start from the decision, not the method
4. Interview: scripts, surveys and usability tests
5. Synthesize: from facts to insights with Atomic Research (exemplo real)
6. Specify: a design brief traceable to evidence
7. Where AI helps and where it fails in user research (NN/g, Torres)
8. Frameworks, credits and author
9. FAQ

**FAQ (de buscas reais):** o que são Claude Code skills e como instalar; funciona no Claude
Desktop?; IA substitui pesquisador?; dá pra usar Claude para sintetizar entrevistas?; o que é
atomic research?; diferença entre fato e insight; quantas pessoas entrevistar; o que vai num plano
de pesquisa.

## Distribuição (fora do site)

1. Link do guia no README do repo (a ficha do skills.sh puxa o README).
2. PR em listas awesome-claude-skills (ComposioHQ, travisvn, karanb192).
3. Pedir inclusão em listas que se atualizam (tessl registry, Pillitteri PT/EN).

## Ligações internas planejadas

Card de UX Research nos Serviços da home, case `hotmart-research-repository`, case
`hotmart-club-jtbd`, nav ("Claude Skills"), `llms.txt`, sitemap.

## Restrições

- `DESIGN.md` inteiro vale. Destaque por tamanho, contraste ou movimento, nunca por cor.
- Todo texto renderizado no HTML pelo servidor; motion só anima por cima.
- Sem nome de cliente, sem métrica interna.
- Guia anti-vícios-de-IA em todo texto; sem travessão.
- Texto passa pelo Gustavo antes de entrar no código. Push só com confirmação.
