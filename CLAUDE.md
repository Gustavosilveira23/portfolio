# CLAUDE.md — gustavosilveira.com

Portfólio do Gustavo. Next 16 (App Router) + React 19 + TypeScript + Tailwind 4, i18n com
next-intl. Regras visuais e proibições estão no `DESIGN.md`: ler antes de mexer em qualquer
coisa que aparece na tela.

## Rodar

- `npm run dev`: servidor local na porta 3000 (`npm run dev -- -p 3456` se a 3000 estiver ocupada)
- `npx tsc --noEmit -p .`: checagem de tipos, rodar antes de commitar
- `npm run build`: build de produção

**Push no `master` publica o site** (deploy automático do GitHub
`Gustavosilveira23/portfolio`). Nunca dar push sem o Gustavo confirmar.

## Onde mora cada coisa

| O quê | Onde |
|---|---|
| Textos de interface (PT e EN) | `messages/pt.json`, `messages/en.json` |
| Cases (conteúdo) | `src/content/projects.ts` |
| Imagens dos cases | `public/projects/<slug>/` |
| SEO de cada case | `caseMeta` em `src/app/[locale]/portfolio/[slug]/page.tsx` |
| Lista de cases para IAs | `public/llms.txt` |
| Layout da página de case | `src/components/case-study-content.tsx` |
| Home | `src/app/[locale]/page.tsx` + componentes em `src/components/` |
| Tokens, cores, fonte | `src/app/globals.css` |
| Metadata global | `src/app/layout.tsx` |
| `<html lang>`, fontes, Google Analytics, JSON-LD `Person` | `src/app/[locale]/layout.tsx` |
| Canonical e hreflang | `localeAlternates()` em `src/lib/seo.ts`, chamado por cada página |
| Material bruto (Figma, exports pesados) | `OneDrive\...\Gus\Trabalho\Portfolio\` (fora do repo) |

EN fica na raiz (`/`) e PT em `/pt`. O middleware redireciona pelo cookie `NEXT_LOCALE`: se o
navegador já visitou `/pt`, a raiz vai cair em `/pt`. Para testar EN, apagar o cookie.

## Adicionar um case

1. Imagens em `public/projects/<slug>/`, recortadas (regras em `DESIGN.md`, "Imagem de case").
2. Objeto novo em `src/content/projects.ts`. A ordem do array é a ordem do carrossel da home. Todo campo de texto tem `pt` e `en`.
   `client` é o nome da empresa, igual nas duas línguas (aparece em "Cliente" no topo do case).
3. Entrada em `caseMeta` (SEO) e uma linha em `public/llms.txt`.
4. O carrossel da home e o sitemap puxam o case sozinhos.

O array `images` tem posições fixas no layout do case:

| Índice | Onde aparece |
|---|---|
| `[0]` | capa (16:9, `object-cover`) e card do carrossel (4:3, `object-cover`) |
| `[1]` | depois de "Papel" |
| `[2]` e `[4]` | lado a lado depois de "Decisões" (proporções parecidas) |
| `[3]` | depois de "Processo" |
| `[5]` em diante | não aparece em lugar nenhum |

`decisions` vira a lista de "Decisões-chave" por um parser que quebra o texto em `\d+\.\s+`.
Formato obrigatório: `1. **Título**: corpo`. Nenhum "número seguido de ponto e espaço" dentro do
corpo, senão o item se parte em dois.

## Adicionar um guia de skill (`/skills/<slug>`)

A página é uma rota só (`src/app/[locale]/skills/[slug]/`), que lê o guia de um registro. Guia novo:

1. `src/content/skills/<slug>.ts` no modelo `SkillGuide` (`types.ts`). Todo texto é `{ en, pt }`, e
   o `pt` é obrigatório. Blocos de código com até 68 colunas, para não rolar no tablet.
2. Entrada em `guides`, em `src/content/skills/index.ts`. Página, OG, `generateStaticParams` e
   sitemap puxam dali.
3. Duas rotas `.md` (o Next não aceita segmento `[slug].md`): copiar
   `src/app/skills/ux-designer.md/route.ts` e `src/app/pt/skills/ux-designer.md/route.ts`.
4. Imagem no guia: bloco `figure` (1 ou 2 imagens em `public/skills/<slug>/`), regras em
   DESIGN.md, "Imagem de guia". Cada imagem já abre o PNG original em tamanho real.
5. `guide: "/skills/<slug>"` em `catalog.ts` (vira bloco de destaque no índice), uma linha em
   `public/llms.txt` e o link "Full guide" no README do repo `claude-design-skills`.

Material bruto de sessão gravada não entra no git: listar em `.git/info/exclude` antes do primeiro
commit e apagar depois de publicar. PRD e Spec de cada guia ficam em `.docs/`.

## Verificar em produção

- O domínio principal é **sem `www`** (desde 11/11/2026); o `www` faz 308 para ele. Canonical que
  aponta para o `www` é bug.
- Lighthouse: Chrome DevTools MCP, `lighthouse_audit` com `device: mobile`. Meta: as 4 notas ≥ 95.
  Em localhost o SEO dá 92 por causa do canonical; só vale a nota de produção.
- **Testar EN:** o navegador desta máquina manda o idioma como PT e o site redireciona para `/pt`.
  Usar contexto isolado com cookie `NEXT_LOCALE=en` (ou cabeçalho `Accept-Language: en`).
- **Lighthouse em EN** (validado em 18/11/2026): no Chrome DevTools MCP o cabeçalho extra do
  `emulate` não basta, porque o primeiro redirect grava `NEXT_LOCALE=pt`. Abrir a página num
  `isolatedContext`, trocar o cookie com `evaluate_script`
  (`document.cookie = "NEXT_LOCALE=en; path=/"`), navegar de novo para a URL EN e só então rodar o
  `lighthouse_audit`. Conferir `finalDisplayedUrl` no `report.json`.
- **Rich Results Test pede login desde nov/2026.** Sem login, conferir o JSON-LD com
  `python .docs/check-jsonld.py <url> [<url>...]` (datas com fuso, `image`, breadcrumb, FAQ) e
  deixar o teste oficial para o Gustavo rodar logado.

## Regras de conteúdo

- **Métrica interna de empresa ou cliente não entra em case**, nem no texto nem visível em
  imagem. Resultado sem número é descrito pelo que mudou.
- PT e EN mudam juntos. EN é a voz principal.
- Rodar o checklist de vícios de linguagem de IA em todo texto (guia no vault do Gustavo:
  `Mind/3-Recursos/vicios-linguagem-ia-copy.md`). Sem travessão de ritmo.
- Mostrar o texto ao Gustavo antes de commitar copy nova.

## Armadilhas conhecidas

- **Toda página indexável nova exporta `generateMetadata` com `localeAlternates(locale, "/rota")`.**
  O layout não define canonical de propósito. Até 03/11/2026 o canonical `/` morava no layout
  raiz e `/about`, `/contact` e todo o `/pt` diziam ao Google que eram a home. Página client
  component (`"use client"`) não exporta metadata: usar um `layout.tsx` ao lado (ver `contact/`)
  ou um `page.tsx` de servidor que renderiza o componente (ver a home e `home-content.tsx`).
- **O `<html>` mora em `[locale]/layout.tsx`**, não no layout raiz, para o `lang` seguir o idioma.
  O layout raiz só repassa `children`; o `src/app/not-found.tsx` traz o próprio `<html>` para as
  rotas que não passam pelo `[locale]`.
- **Servidor de dev trava** em sessão longa ("Jest worker exceeding retry limit"). Não é bug de
  código: reiniciar o `npm run dev`.
- **GA sem dados**: conferir se o script carrega com
  `curl -I "https://www.googletagmanager.com/gtag/js?id=<ID>"`. Um ID que o Google não reconhece
  devolve 404, enquanto IDs aleatórios devolvem 200. Em 05/10/2026 o fluxo antigo
  (`G-MBSDZ8DF98`) existia no GA mas o script dava 404 havia semanas; criamos um fluxo novo,
  `G-EXZMV47S4W`. Se repetir, criar fluxo novo resolve mais rápido que esperar.
- **Não existe página `/portfolio`.** O portfólio é a seção `#portfolio` da home; `next.config.ts`
  redireciona `/portfolio` e `/pt/portfolio` para lá. As páginas de case (`/portfolio/<slug>`)
  continuam. Links internos para a lista usam `/#portfolio`.
- Repo fora do OneDrive de propósito: o hot-reload do Next não funciona em pasta sincronizada.
