# Spec: guia da skill ux-research (/skills/ux-research)

*04/11/2026. Lê com `.docs/PRD.md` (pesquisa e decisões) e `.docs/content/ux-research.en.md`
(rascunho do texto). Branch: `seo/skills-content`.*

## Decisões travadas

| Tema | Decisão |
|---|---|
| Rota | `/skills/ux-research` (EN) e `/pt/skills/ux-research`; índice `/skills` |
| Fonte do texto | `src/content/skills/ux-research.ts`, estruturado em seções e blocos, `en` e `pt` por campo. A partir da F1 o texto vive aqui; o rascunho `.md` vira histórico e sai na F4 |
| Textos de interface | rótulos ("On this page", "Updated", "Copy") em `messages/*.json`, namespace `skills` |
| Motion de assinatura | a conversa do `/ux-research` vazio tocando como terminal conforme o scroll (F2). Cadeia de Atomic Research fica estática |
| Índice `/skills` | lista das 6 skills; ux-research em destaque com guia, as outras 5 com uma linha e link pro README no GitHub. Sem "em breve", sem grid de cards iguais |
| Schema | `TechArticle` + `BreadcrumbList` + `FAQPage` (sem rich result no Google, mas reflete conteúdo visível e outros buscadores leem) |

## Modelo de conteúdo

```ts
type L = { en: string; pt?: string };        // pt vira obrigatório na F3 (o tipo cobra a tradução)
type Block =
  | { type: "p"; text: L }                    // inline: **negrito**, `código`, [texto](href)
  | { type: "code"; label?: L; code: L }      // prompt ou saída da skill
  | { type: "table"; head: L[]; rows: L[][] }
  | { type: "list"; items: L[] }
  | { type: "callout"; text: L }              // "The case."
  | { type: "install" }                       // comando com botão de copiar
  | { type: "conversation"; turns: { role: "user" | "skill"; text: L }[] }
  | { type: "placeholder"; text: string };    // [GUSTAVO], visível só em dev
type Section = { id: string; title: L; blocks: Block[] };
```

Links internos no texto (`/contact`, `/portfolio/...`) passam pelo `Link` do next-intl para
respeitar o idioma.

---

## F1. Página estática (EN)

**Criar**
- `src/content/skills/ux-research.ts`: meta (title, description, datas), lead, seções, FAQ.
- `src/components/skill-guide/inline.tsx`: parser de `**`, `` ` `` e `[](...)`.
- `src/components/skill-guide/blocks.tsx`: um componente por tipo de bloco (servidor).
- `src/components/skill-guide/toc.tsx`: sumário lateral com seção ativa (client, IntersectionObserver).
- `src/components/skill-guide/copy-command.tsx`: comando de instalação com copiar (client).
- `src/components/skill-guide/skill-guide.tsx`: layout do artigo.
- `src/app/[locale]/skills/ux-research/page.tsx`: `setRequestLocale`, `generateMetadata`
  (`localeAlternates`, OG `article`), JSON-LD.

**Mexer**
- `messages/en.json` e `messages/pt.json`: namespace `skills`.

**Layout**
- Cabeçalho: breadcrumb (AI Skills / UX Research), H1, lead (a resposta direta), linha de
  meta (atualizado em, tempo de leitura, licença). Sem `h-screen`: a resposta precisa estar na
  primeira dobra.
- Corpo: coluna de leitura `max-w-2xl`; no `lg`, sumário fixo à direita. Abaixo de `lg`, sem sumário.
- H1 é o único tamanho display da página (`text-4xl md:text-6xl`). H2 `text-2xl md:text-3xl`.
  Corpo `text-base`. Meta e rótulos `text-xs` maiúsculo. Nenhum `text-[...]`.
- Código: `font-mono text-sm`, `bg-surface-2`, `rounded-xl`, borda `border-border`, rolagem
  horizontal dentro do bloco, nunca da página.
- Tabelas: rolagem horizontal própria no mobile.
- FAQ aberto (H3 + parágrafo), sem acordeão: texto visível é o que buscador e IA leem.
- Autor com a foto que já existe (`public/gustavo_siveira.jpg`) e CTA pra `/contact`.
- Sem Footer: o componente existe mas nenhuma página o usa (a home tem seção de contato própria).

**Pronto quando**
- [x] `npx tsc --noEmit -p .` e `npm run build` passam; a rota sai estática (●). *(04/11)*
- [x] HTML de produção contém o texto inteiro, canonical/hreflang certos, `lang`, os 3 JSON-LD,
      `og:image` própria, e o `[GUSTAVO]` não aparece. *(04/11)*
- [x] 390px sem rolagem horizontal; lead termina na primeira dobra (652 de 844px); sumário some
      abaixo de `lg` e fica `sticky` no desktop. *(04/11, medido via iframe no Chrome)*
- [x] Manual (Gustavo): leitura e hierarquia no navegador. *(04/11, depois dos ajustes abaixo)*

*Ajustes da revisão do Gustavo (04/11):*
- Blocos de código reescritos com no máximo 68 colunas: nada rola no desktop. Prompt (`wrap`)
  quebra linha; saída com colunas alinhadas rola só no celular. Barra de rolagem fina e escura
  (`scrollbar-subtle` no `globals.css`) no lugar da barra branca do Windows.
- Comando de instalação: botão de copiar subiu para uma barra de título; o comando tem a largura toda.
- "Who built this" deixou de ser seção: virou "By Gustavo Silveira" no cabeçalho e um cartão curto
  no fim (foto, uma frase, link de contato). Saíram o bloco `[GUSTAVO]` e a frase "every week".

*Puxado da F3 para a F1:* `opengraph-image.tsx` do guia. Definir `openGraph` na metadata
substitui o bloco do pai inteiro, e a página ficava sem imagem.

## F2. Motion

- `src/components/skill-guide/conversation-replay.tsx` (client): a conversa já vem inteira no
  HTML; GSAP ScrollTrigger revela turno a turno, o texto da skill aparece em ritmo de digitação
  curto. Sem `prefers-reduced-motion` liberado, tudo fica visível e parado.
- `ScrollReveal` (existente) nos blocos de código e na cadeia de Atomic Research, com stagger leve.
- Nada de shader ou canvas novo na página.

**Pronto quando**
- [x] Com reduced-motion ligado, nenhuma animação e todo o texto visível. *(tudo dentro de
      `gsap.matchMedia("no-preference")`; conferido pelo Gustavo, 04/11)*
- [x] O replay não bloqueia leitura: cada fala anima uma vez, em no máximo ~1,2s, com gatilho
      próprio. Pular para o fim da página revela tudo e o SplitText é revertido. *(04/11)*
- [x] Texto inteiro no HTML do servidor (6 falas, 13 linhas). Altura da fala igual com e sem split
      em 360, 390, 768 e desktop. *(04/11; com `type: "chars"` só, a 390px a fala perdia uma
      linha e a página pulava 23px ao reverter. Resolvido com `"words,chars"`)*
- [x] Manual (Gustavo): ritmo do replay. *(04/11)*

*Implementado:* `conversation-replay.tsx` (fala do usuário digitada, até 0,8s; fala da skill linha a
linha com 0,2s de pausa) e `ScrollReveal` nos blocos de código e no comando de instalação.

## F3. SEO/GEO, ligações e PT

- `src/app/[locale]/skills/page.tsx`: índice das 6 skills.
- `src/app/skills/ux-research.md/route.ts` e `src/app/pt/...`: versão markdown gerada do mesmo
  arquivo de conteúdo (o middleware já ignora caminhos com ponto).
- ~~`opengraph-image.tsx` do guia~~ (feito na F1).
- `src/middleware.ts`: tirar `opengraph-image` do matcher. Hoje a URL da imagem sai como
  `/en/.../opengraph-image` e o middleware responde 307 para `/...`. Vale também para as imagens
  de case, que já tinham o problema. Rede que não segue redirecionamento fica sem imagem.
- `src/app/sitemap.ts`: `/skills`, `/skills/ux-research` (+ PT).
- `public/llms.txt`: seção "Guides" com o link e uma linha.
- `src/components/nav.tsx`: link "AI Skills" (desktop e mobile).
- Links internos: card de UX Research nos Serviços, cases `hotmart-research-repository` e
  `hotmart-club-jtbd`.
- Tradução PT de todo o conteúdo; `pt` vira obrigatório no tipo `L`.
- README do repo de skills: link pro guia (push só com confirmação).

**Pronto quando**
- [x] `/skills/ux-research.md` responde 200 com `text/markdown` (EN e PT), com cabeçalho
      `Link: rel=canonical` para a versão HTML e links internos absolutos. *(04/11)*
- [x] Sitemap lista as 4 URLs novas, com `lastModified` = data do conteúdo. *(04/11)*
- [x] Imagem OG responde 200 direto em `/en/...` (antes 307), no guia e nos cases. *(04/11)*
- [x] Índice `/skills` (EN/PT): canonical, hreflang, `CollectionPage`. Nav com "AI Skills"
      no desktop e no menu mobile. `llms.txt` com seção "Guides". *(04/11)*
- [x] Links internos *(05/11, decidido com o Gustavo)*: card "Claude Design Skills" da home
      → `/skills` (era o GitHub); frase no fim do Processo do case `hotmart-research-repository`;
      repo no topo do índice e no "MIT license" do guia. Card de Serviços e case JTBD ficaram de
      fora. Parágrafos de case passaram pelo `InlineText`: de quebra, os `**` que apareciam crus
      em 4 cases viraram negrito.
- [x] Tradução PT do guia e do índice; `pt` obrigatório no tipo `L`. Página PT com `lang`,
      título, H1, JSON-LD e `.md` em PT. *(05/11)*
- [x] PT revisado pelo Gustavo. *(09/11; rótulo "Claude Skills" virou "AI Skills" na nav, breadcrumb, OG e llms.txt; título e meta seguem com "Claude Code" por SEO)*
- [ ] README do repo de skills com link pro guia (push com confirmação).

*Desvios:* `.md` sem `noindex` (o canonical por cabeçalho basta e o texto puro interessa a buscador
de IA). Conteúdo do índice em `src/content/skills/catalog.ts`; conversor em `to-markdown.ts`.
Servidor de teste foi para a porta 3458: `TaskStop` encerra o bash mas deixa o `node` do
`next start` vivo, e a porta fica presa com o build velho. Matar pelo PID (`Win32_Process`).

## F4. Verificação

- [x] `/design-review` no guia e no índice (390, 768, 1440; só tema escuro). *(09/11: 4 bloqueantes
      e 7 ajustes corrigidos. Conversa sem `visibility:hidden` e com texto em `sr-only`; ícones da nav
      com nome e alvo de 26px; sumário sem rolagem animada com reduced-motion; data e comando sem
      quebra no meio; botão Copiar com 44px e raio concêntrico; índice com 6 itens, nomes em h2 e
      links com rótulo próprio; H2 a 16px do texto; alt vazio na foto do autor)*
- [x] Lighthouse (SEO e acessibilidade ≥ 95). *(09/11, mobile: acessibilidade 100, best practices 100,
      agentic browsing 100 nas duas páginas. SEO 92 só pelo canonical apontar para o domínio real
      em teste local; reconferir em produção)*
- [ ] Rich Results Test sem erro no `TechArticle` e no `BreadcrumbList`. *(09/11: validado localmente,
      campos completos; `TechArticle` ganhou `image`. O teste do Google precisa da URL pública:
      rodar depois do deploy)*
- [x] ~~Bloco `[GUSTAVO]` e "every week"~~: saíram com o cartão de autor curto (04/11).
- [x] Rascunho `.docs/content/ux-research.en.md` apagado. *(09/11)*
- [ ] Push no `master` só com confirmação do Gustavo.

## O que NÃO vamos fazer

- Guias das outras 5 skills.
- Títulos duplicados das páginas antigas (about, contact, process).
- Cor nova, fonte nova, toggle de tema.
- MDX ou qualquer dependência nova.
- Acordeão no FAQ.
