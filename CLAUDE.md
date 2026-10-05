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
| Google Analytics, metadata global, JSON-LD | `src/app/layout.tsx` |
| Material bruto (Figma, exports pesados) | `OneDrive\...\Gus\Trabalho\Portfolio\` (fora do repo) |

EN fica na raiz (`/`) e PT em `/pt`. O middleware redireciona pelo cookie `NEXT_LOCALE`: se o
navegador já visitou `/pt`, a raiz vai cair em `/pt`. Para testar EN, apagar o cookie.

## Adicionar um case

1. Imagens em `public/projects/<slug>/`, recortadas (regras em `DESIGN.md`, "Imagem de case").
2. Objeto novo em `src/content/projects.ts`. A ordem do array é a ordem do carrossel da home e
   da página `/portfolio`. Todo campo de texto tem `pt` e `en`.
3. Entrada em `caseMeta` (SEO) e uma linha em `public/llms.txt`.
4. A home, `/portfolio` e o sitemap puxam o case sozinhos.

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

## Regras de conteúdo

- **Métrica interna de empresa ou cliente não entra em case**, nem no texto nem visível em
  imagem. Resultado sem número é descrito pelo que mudou.
- PT e EN mudam juntos. EN é a voz principal.
- Rodar o checklist de vícios de linguagem de IA em todo texto (guia no vault do Gustavo:
  `Mind/3-Recursos/vicios-linguagem-ia-copy.md`). Sem travessão de ritmo.
- Mostrar o texto ao Gustavo antes de commitar copy nova.

## Armadilhas conhecidas

- **Servidor de dev trava** em sessão longa ("Jest worker exceeding retry limit"). Não é bug de
  código: reiniciar o `npm run dev`.
- **GA sem dados**: conferir se o script carrega com
  `curl -I "https://www.googletagmanager.com/gtag/js?id=<ID>"`. Um ID que o Google não reconhece
  devolve 404, enquanto IDs aleatórios devolvem 200. Em 05/10/2026 o ID `G-MBSDZ8DF98` dava 404
  (propriedade ou fluxo apagado no GA).
- **"Cliente: Projeto Pessoal"** está fixo em `case-study-content.tsx` para todos os cases,
  inclusive os da Hotmart. Dívida em aberto.
- `public/projects/Collectors/` tem imagens sem case. Não apagar sem perguntar: pode ser material
  de case futuro.
- Repo fora do OneDrive de propósito: o hot-reload do Next não funciona em pasta sincronizada.
