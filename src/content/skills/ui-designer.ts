import type { SkillGuide } from "./types";

// Texto do guia /skills/ui-designer. EN é a voz principal; PT é tradução (DESIGN.md, Copy).
// A sessão foi gravada em inglês em 16/11/2026 (Claude Code headless, só esta skill na versão
// pública de37707, sem CLAUDE.md pessoal, Playwright MCP 0.0.85), num projeto mínimo com tokens
// próprios. Respostas da skill são reais e encurtadas; falas do usuário foram escritas para a demo;
// o projeto e as duas telas são fictícios. A página declara as três coisas, e o PT diz que a
// conversa é traduzida. Nomes de passo da skill (Step 0, Step 0.5, Step 6.0) ficam em inglês nas duas
// línguas, e textos da tela (botões, título) também. Brand e Product: no corpo, "Brand/Product
// context" ("contexto Brand/Product"), que é o termo da skill; no lead, na meta e no índice
// (catalog.ts), "brand or product mode" ("modo marca ou produto"), para quem chega sem contexto.
// Números da tela: medidos por script (.docs/content/ui-designer-measures.json, fora do git).
// Fontes: .docs/PRD-ui-designer.md, "Fontes verificadas". Blocos de código: até 68 colunas.

const COMMIT_AUDIT =
  "https://github.com/Gustavosilveira23/claude-design-skills/commit/de37707147f9b75be49d69e22c1b006fcb7489b2";

export const uiDesignerGuide: SkillGuide = {
  slug: "ui-designer",
  repoPath: "skills/ui-designer",
  published: "2026-11-18",
  updated: "2026-11-18",
  meta: {
    title: { en: "UI Designer Skill for Claude Code", pt: "Skill de UI Design para o Claude Code" },
    description: {
      en: "A free Claude Code skill that reads your design tokens first, works in brand or product mode and looks at the rendered screen before it hands UI over.",
      pt: "Uma skill gratuita do Claude Code que lê os tokens do seu projeto primeiro, trabalha em modo marca ou produto e olha a tela renderizada antes de entregar.",
    },
  },
  breadcrumb: { en: "UI Designer", pt: "UI Designer" },
  h1: { en: "A UI design skill for Claude Code", pt: "Uma skill de UI Design para o Claude Code" },
  lead: {
    en: "**ui-designer is a free, open-source skill for Claude Code that reads your project's design tokens before it styles anything, works in brand or product mode, and looks at the rendered screen before it hands it over.** It scores existing screens out of 10, argues once when a request would hurt the interface, and checks its own output against 46 patterns that make UI look AI-generated, adapted from Impeccable.",
    pt: "**A ui-designer é uma skill gratuita e open source para o Claude Code que lê os tokens de design do seu projeto antes de estilizar qualquer coisa, trabalha em modo marca ou produto e olha a tela renderizada antes de entregar.** Ela dá nota de 0 a 10 para telas existentes, discorda uma vez quando um pedido piora a interface e confere o próprio resultado contra 46 padrões que deixam a interface com cara de gerada por IA, adaptados da Impeccable.",
  },
  sections: [
    {
      id: "install",
      nav: { en: "Install", pt: "Instalar" },
      title: { en: "Install it in one command", pt: "Instale com um comando" },
      blocks: [
        { type: "install", command: "npx skills add Gustavosilveira23/claude-design-skills -s ui-designer -g" },
        {
          type: "p",
          text: {
            en: "That installs it for every project on your machine. Ask Claude Code to build, style or polish an interface and the skill loads on its own. You can also call it with `/ui-designer`. In my tests, a plain request to score a screen didn't always load it, so for audits I call it by name.",
            pt: "Isso instala a skill para todos os projetos da sua máquina. Peça ao Claude Code para construir, estilizar ou dar acabamento a uma interface e a skill carrega sozinha. Você também pode chamá-la com `/ui-designer`. Nos meus testes, um pedido comum de nota para uma tela nem sempre carregou a skill, então para auditoria eu chamo pelo nome.",
          },
        },
        {
          type: "p",
          text: {
            en: "The same command works in Cursor, Codex and other agents that read the Agent Skills format. On claude.ai, zip the `ui-designer` folder and upload it under Customize > Skills, with code execution turned on. The code lives at [github.com/Gustavosilveira23/claude-design-skills](https://github.com/Gustavosilveira23/claude-design-skills), MIT licensed, next to five other design skills.",
            pt: "O mesmo comando funciona no Cursor, no Codex e em outros agentes que leem o formato Agent Skills. No claude.ai, compacte a pasta `ui-designer` em zip e envie em Customize > Skills, com a execução de código ligada. O código está em [github.com/Gustavosilveira23/claude-design-skills](https://github.com/Gustavosilveira23/claude-design-skills), com licença MIT, ao lado de outras cinco skills de design.",
          },
        },
      ],
    },
    {
      id: "case",
      nav: { en: "The case", pt: "O caso" },
      title: { en: "The screen from the last two guides", pt: "A tela dos dois últimos guias" },
      blocks: [
        {
          type: "p",
          text: {
            en: "This guide closes one case. In the [ux-research guide](/skills/ux-research), research on a scheduling tool found that new admins won't connect their calendar before they've seen the product work. In the [ux-designer guide](/skills/ux-designer#strategy), that finding became a strategy with five decisions, and the calendar step the tool has today scored 7 out of 25 on a CLEAR audit. Here, ui-designer turns the strategy into the screen.",
            pt: "Este guia fecha um caso. No [guia da ux-research](/skills/ux-research), a pesquisa sobre uma ferramenta de agendamento descobriu que admins novos não conectam a agenda antes de ver o produto funcionando. No [guia da ux-designer](/skills/ux-designer#strategy), esse achado virou uma estratégia com cinco decisões, e o passo de agenda que a ferramenta tem hoje tirou 7 de 25 numa auditoria CLEAR. Aqui, a ui-designer constrói a tela a partir da estratégia.",
          },
        },
        {
          type: "p",
          text: {
            en: "I recorded the session in a fresh Claude Code session with only this skill installed, inside a small project with its own design tokens (`styles/tokens.css`) and components. The old screen ignores them, as legacy screens often do. The project and both screens are fictional. The skill's replies are real and shortened. My lines were written for the demo, and they say nothing about tokens or screenshots: whatever the skill did with those, it did on its own.",
            pt: "Gravei numa sessão nova do Claude Code, só com esta skill instalada, dentro de um projeto pequeno com tokens de design (`styles/tokens.css`) e componentes próprios. A tela antiga ignora os dois, como tela legada costuma fazer. O projeto e as duas telas são fictícios. As respostas da skill são reais, encurtadas e traduzidas do inglês. As minhas falas foram escritas para a demonstração e não dizem nada sobre tokens nem sobre screenshots: o que a skill fez com isso, fez por conta própria.",
          },
        },
      ],
    },
    {
      id: "score",
      nav: { en: "Score out of 10", pt: "Nota de 0 a 10" },
      title: { en: "A score out of 10 for the old screen", pt: "Uma nota de 0 a 10 para a tela antiga" },
      blocks: [
        {
          type: "conversation",
          turns: [
            {
              role: "user",
              text: {
                en: "/ui-designer This is step 3 of our onboarding: onboarding/step-calendar.html. Give it a visual score out of 10. Don't change anything yet.",
                pt: "/ui-designer Este é o passo 3 do nosso onboarding: onboarding/step-calendar.html. Dê uma nota visual de 0 a 10. Não mude nada ainda.",
              },
            },
            {
              role: "skill",
              text: {
                en: `Score: 3/10. The layout is tidy, but the page ignores the project's own design system. Most of its text fails contrast, the provider tiles never show which one you picked, and the page breaks on phones.

I treated this as Product context. I rendered the page at 1280px and 375px and checked the hover, selected and error states. I haven't changed anything.

Critical
1. It doesn't use the design system. styles/tokens.css and components.css exist, but the page links neither: Arial instead of Inter, #3b82f6 instead of the accent token, a homemade button instead of .btn-primary.
2. Most of the text fails contrast. Body copy is about 3.3:1, the step label 2.6:1, the scopes 2:1. The muted token, #5B616E, already passes.
3. Picking a provider shows no change. The blue border in my screenshot is just hover, and it disappears when the mouse moves away.
4. It breaks on mobile. There's no viewport tag and the card is a fixed 560px: at 375px the page scrolls sideways to 624px.`,
                pt: `Nota: 3/10. O layout é organizado, mas a página ignora o design system do próprio projeto. A maior parte do texto reprova no contraste, os blocos de provedor nunca mostram qual você escolheu e a página quebra no celular.

Tratei como contexto Product. Renderizei a página a 1280px e 375px e testei os estados de hover, selecionado e erro. Não mudei nada.

Crítico
1. Não usa o design system. styles/tokens.css e components.css existem, mas a página não liga nenhum dos dois: Arial no lugar da Inter, #3b82f6 no lugar do token de destaque, um botão feito à mão no lugar do .btn-primary.
2. A maior parte do texto reprova no contraste. O corpo fica em torno de 3,3:1, a etiqueta do passo 2,6:1, os escopos 2:1. O token muted, #5B616E, já passa.
3. Escolher um provedor não muda nada na tela. A borda azul no meu screenshot é só o hover, e some quando o mouse sai.
4. Quebra no celular. Não há tag de viewport e o card tem 560px fixos: a 375px a página rola de lado até 624px.`,
              },
            },
          ],
        },
        {
          type: "p",
          text: {
            en: "Its contrast estimates hold up: measured in the browser, the three ratios are 3.25, 2.64 and 2.0 to 1. Next to the CLEAR audit from the last guide, the visual lens found two problems the UX audit didn't mention: the screen ignores a design system the project already has, and it scrolls sideways on a phone. It also missed the problem the UX audit put first, that the screen asks for access before it shows anything working. That's a flow problem, and finding it is ux-designer's job.",
            pt: "As estimativas de contraste se confirmam: medidas no navegador, as três razões são 3,25, 2,64 e 2,0 para 1. Comparada com a auditoria CLEAR do último guia, a lente visual achou dois problemas que a auditoria de UX não citou: a tela ignora um design system que o projeto já tem e rola de lado no celular. Ela também deixou passar o problema que a auditoria de UX pôs em primeiro lugar: a tela pede acesso antes de mostrar qualquer coisa funcionando. Esse é um problema de fluxo, e achá-lo é trabalho da ux-designer.",
          },
        },
      ],
    },
    {
      id: "build",
      nav: { en: "It reads your project", pt: "Ela lê o projeto" },
      title: { en: "It reads your project before it styles", pt: "Ela lê o projeto antes de estilizar" },
      blocks: [
        {
          type: "p",
          text: {
            en: "Next I pasted the strategy from the ux-designer guide and asked for a new version of the step.",
            pt: "Depois colei a estratégia do guia da ux-designer e pedi uma versão nova do passo.",
          },
        },
        {
          type: "conversation",
          turns: [
            {
              role: "user",
              text: {
                en: "Our UX review produced this strategy for the step. It comes right after the user books a test meeting on their own page. Rebuild it as onboarding/step-calendar-v2.html. Desktop; our design system is in styles/. [strategy pasted]",
                pt: "Nossa revisão de UX gerou esta estratégia para o passo. Ele vem logo depois que a pessoa agenda uma reunião de teste na própria página. Refaça como onboarding/step-calendar-v2.html. Desktop; nosso design system está em styles/. [estratégia colada]",
              },
            },
            {
              role: "skill",
              text: {
                en: `I built the new version as onboarding/step-calendar-v2.html and left the original unchanged. I checked it in the browser at 1280px with the IT panel closed and open, with keyboard focus, and fixed the two problems those screenshots showed.

- The reason to connect is something they can see. The heading is "This booking isn't on your calendar yet." Below it is a slice of their Thursday with the test booking drawn as a dashed outline marked "Missing". It's aimed at your biggest risk: they're satisfied with the test, so the page shows them what's still broken.
- Connecting is one click. The old pick-then-Submit pattern is gone, along with its 403 error.
- Your scope line sits right under the buttons, word for word.
- "Skip for now" is a real exit, with "Your page stays live." under it.

It uses your design system: every color, spacing value, radius and font size comes from your tokens.

Things to decide: the booking and the links are placeholders. The summary page for IT doesn't exist yet. Your tokens only define light colors, and I didn't invent dark ones outside the system. The tokens name Inter, but nothing loads it, so the page falls back to the system font.`,
                pt: `Construí a versão nova como onboarding/step-calendar-v2.html e deixei a original intacta. Conferi no navegador a 1280px, com o painel de TI fechado e aberto e com foco de teclado, e corrigi os dois problemas que esses screenshots mostraram.

- O motivo para conectar é algo que a pessoa vê. O título é "This booking isn't on your calendar yet." Abaixo dele vem um pedaço da quinta-feira dela, com a reunião de teste desenhada como um contorno tracejado marcado "Missing". Isso mira o seu maior risco: ela fica satisfeita com o teste, então a página mostra o que ainda está quebrado.
- Conectar é um clique. O padrão antigo de escolher e depois clicar em Submit saiu, junto com o erro 403.
- A sua linha de escopo fica logo abaixo dos botões, palavra por palavra.
- "Skip for now" é uma saída de verdade, com "Your page stays live." embaixo.

Usa o seu design system: toda cor, espaçamento, raio e tamanho de fonte vem dos seus tokens.

Para decidir: a reunião e os links são provisórios. A página de resumo para a TI ainda não existe. Os seus tokens só definem cores claras, e eu não inventei cores escuras fora do sistema. Os tokens citam a Inter, mas nada carrega a fonte, então a página cai na fonte do sistema.`,
              },
            },
          ],
        },
        {
          type: "p",
          text: {
            en: "The new page links the project's `tokens.css` and `components.css`, and its own CSS has no fixed colors. That's Step 0.5 of the skill: when tokens exist, use them, and never introduce competing values. The main visual came from the strategy's biggest risk. If the test booking is good enough that nobody bothers to connect, the page answers by showing that booking missing from their calendar.",
            pt: "A página nova liga o `tokens.css` e o `components.css` do projeto, e o CSS dela não tem nenhuma cor fixa. Esse é o Step 0.5 da skill: se existem tokens, usar os tokens e nunca criar valores concorrentes. O visual principal saiu do maior risco da estratégia. Se a reunião de teste for boa o bastante para ninguém se dar ao trabalho de conectar, a página responde mostrando que essa reunião não está na agenda da pessoa.",
          },
        },
      ],
    },
    {
      id: "look",
      nav: { en: "It looks first", pt: "Ela olha antes" },
      title: { en: "It looks at the screen before handing it over", pt: "Ela olha a tela antes de entregar" },
      blocks: [
        {
          type: "p",
          text: {
            en: "Most of the skill's checks happen in the code. Step 6.0 is the exception: when the interface can be rendered, it opens it with Playwright or Chrome DevTools, takes a screenshot, fixes what it sees and looks again. If it can't render, it has to say that it skipped the check.",
            pt: "A maior parte das checagens da skill acontece no código. O Step 6.0 é a exceção: quando a interface pode ser renderizada, a skill abre com o Playwright ou o Chrome DevTools, tira um screenshot, corrige o que vê e olha de novo. Se não consegue renderizar, tem que dizer que pulou a checagem.",
          },
        },
        {
          type: "p",
          text: {
            en: "In the session it looked without being asked. The browser blocked opening a local file, so it started a small local server. The first screenshot showed the hour labels sitting off their lines. It measured the offset with a script (16px where 7px was expected), fixed it, checked the IT panel open and the focus ring with the keyboard, then stopped the server. The skill puts the division of labor in four words: \"Image confirms; source proves.\"",
            pt: "Na sessão ela olhou sem ninguém pedir. O navegador bloqueou a abertura de um arquivo local, então ela subiu um servidor local pequeno. O primeiro screenshot mostrou os rótulos de hora fora das linhas. Ela mediu o desvio com um script (16px onde se esperavam 7px), corrigiu, conferiu o painel de TI aberto e o anel de foco pelo teclado e desligou o servidor. A skill resume a divisão de trabalho numa frase curta: \"a imagem confirma; o código prova\" (tradução minha).",
          },
        },
        {
          type: "figure",
          images: [
            {
              src: "/skills/ui-designer/before.png",
              width: 1408,
              height: 1569,
              label: { en: "Before", pt: "Antes" },
              alt: {
                en: "The old calendar step: grey text on white, a box of raw permission codes, two plain provider boxes and a Submit button.",
                pt: "O passo de agenda antigo: texto cinza sobre branco, uma caixa com códigos de permissão crus, dois blocos de provedor sem destaque e um botão Submit.",
              },
            },
            {
              src: "/skills/ui-designer/after.png",
              width: 1408,
              height: 1569,
              label: { en: "After", pt: "Depois" },
              alt: {
                en: "The new calendar step: a progress bar, the heading \"This booking isn't on your calendar yet\", a calendar slice with the test booking marked Missing, two provider buttons, a one-line privacy note and a Skip for now link.",
                pt: "O passo de agenda novo: barra de progresso, o título \"This booking isn't on your calendar yet\", um pedaço de agenda com a reunião de teste marcada como Missing, dois botões de provedor, uma nota de privacidade de uma linha e o link Skip for now.",
              },
            },
          ],
          caption: {
            en: "Both screens at 1280px, same crop. Both are fictional, made for the demo. The new one is the file the skill delivered before the next request.",
            pt: "As duas telas a 1280px, mesmo recorte. As duas são fictícias, feitas para a demonstração. A nova é o arquivo que a skill entregou antes do pedido seguinte.",
          },
        },
        {
          type: "table",
          head: [
            { en: "Measure", pt: "Medida" },
            { en: "Before", pt: "Antes" },
            { en: "After", pt: "Depois" },
          ],
          rows: [
            [
              { en: "Text elements below WCAG AA contrast", pt: "Elementos de texto abaixo do contraste WCAG AA" },
              { en: "4 of 7", pt: "4 de 7" },
              { en: "0 of 20", pt: "0 de 20" },
            ],
            [
              { en: "Provider buttons reachable by keyboard", pt: "Botões de provedor alcançáveis pelo teclado" },
              { en: "0 of 2", pt: "0 de 2" },
              { en: "2 of 2", pt: "2 de 2" },
            ],
            [
              { en: "Font sizes in use", pt: "Tamanhos de fonte em uso" },
              { en: "5, from 11 to 20px", pt: "5, de 11 a 20px" },
              { en: "3: 14, 16 and 24px", pt: "3: 14, 16 e 24px" },
            ],
            [
              { en: "Fixed colors in the page's own CSS", pt: "Cores fixas no CSS da própria página" },
              { en: "11", pt: "11" },
              { en: "0", pt: "0" },
            ],
            [
              { en: "Main buttons", pt: "Botões principais" },
              { en: "\"Submit\"", pt: "\"Submit\"" },
              { en: "\"Google Calendar\", \"Microsoft Outlook\"", pt: "\"Google Calendar\", \"Microsoft Outlook\"" },
            ],
            [
              { en: "Shortest control", pt: "Controle mais baixo" },
              { en: "35px (Submit)", pt: "35px (Submit)" },
              { en: "24px (two text links)", pt: "24px (dois links de texto)" },
            ],
          ],
        },
        {
          type: "p",
          text: {
            en: "I measured both screens with a script in the browser, from computed styles. The last row is the one the skill didn't catch. \"Need IT to approve this?\" and \"Skip for now\" are 24px tall: they pass the WCAG 2.2 minimum ([SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)) and fall short of the 44pt the skill itself recommends.",
            pt: "Medi as duas telas com um script no navegador, a partir dos estilos computados. A última linha é a que a skill não pegou. \"Need IT to approve this?\" e \"Skip for now\" têm 24px de altura: passam no mínimo da WCAG 2.2 ([SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)) e ficam abaixo dos 44pt que a própria skill recomenda.",
          },
        },
      ],
    },
    {
      id: "pushback",
      nav: { en: "It pushes back", pt: "Ela discorda" },
      title: { en: "It argues with a purple gradient", pt: "Ela discute com um degradê roxo" },
      blocks: [
        {
          type: "p",
          text: {
            en: "Then I made the request most AI tools would simply carry out.",
            pt: "Então fiz o pedido que a maioria das ferramentas de IA simplesmente executaria.",
          },
        },
        {
          type: "conversation",
          turns: [
            {
              role: "user",
              text: {
                en: "Looks a bit plain. Make it more modern: purple gradient on the card and a glass effect.",
                pt: "Está meio sem graça. Deixa mais moderno: degradê roxo no card e um efeito de vidro.",
              },
            },
            {
              role: "skill",
              text: {
                en: `Design note: I'd hold off on these two before building them.

- A purple gradient would add a second brand color. Your system's accent is blue, and the progress bar and links already use it. This user is checking whether the tool looks trustworthy enough to recommend to their team. If the onboarding card has a different color from the rest of the product, it starts to look like a template.
- A glass effect needs something behind it to blur. Here the card sits on a flat grey background, so the blur has nothing to work on. All it would do is wash out the text.

I think "plain" comes from three specific gaps: load Inter, lift the card off the background with a soft shadow, and make the calendar slice look like their real calendar.

Want me to build it as you asked, or try these three instead?`,
                pt: `Nota de design: eu seguraria estes dois antes de construir.

- Um degradê roxo acrescentaria uma segunda cor de marca. O destaque do seu sistema é azul, e a barra de progresso e os links já usam essa cor. Essa pessoa está avaliando se a ferramenta parece confiável o bastante para recomendar ao time. Se o card do onboarding tem uma cor diferente do resto do produto, ele começa a parecer template.
- Um efeito de vidro precisa de algo atrás para desfocar. Aqui o card fica sobre um fundo cinza liso, então o desfoque não tem com o que trabalhar. Ele só deixaria o texto lavado.

Acho que o "sem graça" vem de três lacunas específicas: carregar a Inter, descolar o card do fundo com uma sombra suave e fazer o pedaço de agenda parecer a agenda real da pessoa.

Quer que eu construa do jeito que você pediu ou que eu tente estas três?`,
              },
            },
          ],
        },
        {
          type: "p",
          text: {
            en: "It didn't touch the file. The skill pushes back once and then does what you decide; if I had insisted, it would have built the gradient. The reasoning goes back to Step 0. In the first turn it classified this screen as Product context, a tool people use every day, where restraint is the default. On a landing page, which is Brand context, the same gradient can be the right call. In the skill's words: \"Same technique, opposite verdict.\"",
            pt: "Ela não mexeu no arquivo. A skill discorda uma vez e depois faz o que você decidir; se eu tivesse insistido, ela teria construído o degradê. O raciocínio volta ao Step 0. No primeiro turno ela classificou esta tela como contexto Product, uma ferramenta que as pessoas usam todo dia, onde contenção é o padrão. Numa landing page, que é contexto Brand, o mesmo degradê pode ser a escolha certa. Nas palavras da skill: \"mesma técnica, veredito oposto\" (tradução minha).",
          },
        },
      ],
    },
    {
      id: "numbers",
      nav: { en: "Where numbers come from", pt: "De onde vêm os números" },
      title: { en: "Where the numbers come from", pt: "De onde vêm os números" },
      blocks: [
        {
          type: "p",
          text: {
            en: "Design skills and prompts repeat the same numbers as if they were laws. Some are standards, some are conventions, and one comes from decorating living rooms. The skill now says which is which:",
            pt: "Skills e prompts de design repetem os mesmos números como se fossem lei. Alguns são norma, outros são convenção, e um vem da decoração de salas de estar. A skill agora diz qual é qual:",
          },
        },
        {
          type: "table",
          head: [
            { en: "Rule in the skill", pt: "Regra na skill" },
            { en: "What it is", pt: "O que é" },
            { en: "Source", pt: "Fonte" },
          ],
          rows: [
            [
              {
                en: "Spacing on an 8pt grid, 4px steps inside components",
                pt: "Espaçamento em grid de 8pt, passos de 4px dentro de componentes",
              },
              {
                en: "Convention. What matters is that every value comes from one scale.",
                pt: "Convenção. O que importa é todo valor sair de uma escala só.",
              },
              { en: "Material Design (8dp grid), spec.fm", pt: "Material Design (grid de 8dp), spec.fm" },
            ],
            [
              { en: "Font sizes from a ratio, 4 to 5 sizes", pt: "Tamanhos de fonte a partir de uma razão, de 4 a 5 tamanhos" },
              { en: "Convention from editorial typography.", pt: "Convenção da tipografia editorial." },
              { en: "Tim Brown, A List Apart, 2011", pt: "Tim Brown, A List Apart, 2011" },
            ],
            [
              { en: "60-30-10 color split", pt: "Divisão de cor 60-30-10" },
              {
                en: "Rule of thumb from interior design, used as a starting proportion to keep the accent rare.",
                pt: "Regra prática da decoração de interiores, usada como proporção inicial para manter o destaque raro.",
              },
              { en: "No study on screens", pt: "Nenhum estudo em telas" },
            ],
            [
              { en: "Text contrast 4.5:1, large text 3:1", pt: "Contraste de texto 4,5:1, texto grande 3:1" },
              { en: "Standard.", pt: "Norma." },
              { en: "WCAG 2.2, SC 1.4.3", pt: "WCAG 2.2, SC 1.4.3" },
            ],
            [
              {
                en: "Touch targets of 44pt or 48dp, never below 24px",
                pt: "Área de toque de 44pt ou 48dp, nunca abaixo de 24px",
              },
              {
                en: "Platform guidelines, plus a floor from the standard.",
                pt: "Diretrizes de plataforma, mais um piso da norma.",
              },
              { en: "Apple HIG, Material Design, WCAG 2.2 SC 2.5.8", pt: "Apple HIG, Material Design, WCAG 2.2 SC 2.5.8" },
            ],
            [
              { en: "Dark surface #121212, white text at 87%", pt: "Superfície escura #121212, texto branco a 87%" },
              { en: "One platform's guideline.", pt: "Diretriz de uma plataforma." },
              { en: "Material Design, \"Dark theme\"", pt: "Material Design, \"Dark theme\"" },
            ],
          ],
        },
        {
          type: "p",
          text: {
            en: "Until the audit I ran before writing this guide, the skill gave most of these numbers without saying where they came from. Each one now carries its label, and the full list sits in the skill's Sources and Credits section.",
            pt: "Até a auditoria que fiz antes de escrever este guia, a skill dava a maioria desses números sem dizer de onde vinham. Agora cada um leva a sua etiqueta, e a lista completa está na seção Sources and Credits da skill.",
          },
        },
      ],
    },
    {
      id: "slop",
      nav: { en: "Slop detector", pt: "Detector de slop" },
      title: { en: "A slop detector, credited", pt: "Um detector de slop, com crédito" },
      blocks: [
        {
          type: "p",
          text: {
            en: "Before it shows any interface, the skill checks it against 46 visual patterns that make UI look AI-generated. The catalog is adapted from [Impeccable](https://impeccable.style/slop), Paul Bakaus's design skill, filtered for this skill's contexts. Each pattern has a detection signal, many of them a grep you can run on Tailwind classes, and says whether it's tolerable in Brand context or never acceptable in Product. Five it checks first:",
            pt: "Antes de mostrar qualquer interface, a skill confere o resultado contra 46 padrões visuais que deixam a interface com cara de gerada por IA. O catálogo é adaptado da [Impeccable](https://impeccable.style/slop), a skill de design do Paul Bakaus, filtrado para os contextos desta skill. Cada padrão tem um sinal de detecção, muitos deles um grep que dá para rodar nas classes do Tailwind, e diz se é tolerável em contexto Brand ou nunca aceitável em Product. Cinco que ela confere primeiro:",
          },
        },
        {
          type: "list",
          items: [
            {
              en: "A colored stripe down one side of a rounded card.",
              pt: "Uma faixa colorida descendo por um lado de um card arredondado.",
            },
            { en: "Glass effects used as ornament.", pt: "Efeito de vidro usado como enfeite." },
            {
              en: "Gradient text anywhere except a single hero headline.",
              pt: "Texto em degradê em qualquer lugar que não seja um único título de hero.",
            },
            {
              en: "The purple or violet plus cyan default palette, unless the brand calls for it.",
              pt: "A paleta padrão de roxo ou violeta com ciano, a não ser que a marca peça.",
            },
            {
              en: "Bounce or elastic easing on interface elements.",
              pt: "Easing com quique ou elástico em elementos de interface.",
            },
          ],
        },
        {
          type: "p",
          text: {
            en: "For the complete catalog with its own commands, use [Impeccable](https://github.com/pbakaus/impeccable) directly. This skill applies a filtered version while it builds.",
            pt: "Para o catálogo completo, com comandos próprios, use a [Impeccable](https://github.com/pbakaus/impeccable) direto. Esta skill aplica uma versão filtrada enquanto constrói.",
          },
        },
      ],
    },
    {
      id: "limits",
      nav: { en: "Where it fails", pt: "Onde ela erra" },
      title: { en: "Where it still gets things wrong", pt: "Onde ela ainda erra" },
      blocks: [
        {
          type: "p",
          text: {
            en: "Before writing this guide I audited the skill the way it audits a screen. Some of what I found:",
            pt: "Antes de escrever este guia, auditei a skill do jeito que ela audita uma tela. Parte do que encontrei:",
          },
        },
        {
          type: "list",
          items: [
            {
              en: "It classified \"Cancel\" as a destructive action.",
              pt: "Ela classificava \"Cancel\" como ação destrutiva.",
            },
            {
              en: "It built focus rings with `box-shadow`, which disappears in Windows high contrast mode.",
              pt: "Ela fazia o anel de foco com `box-shadow`, que some no modo de alto contraste do Windows.",
            },
            {
              en: "It recommended, as polish, three techniques its own slop detector condemns.",
              pt: "Ela recomendava, como acabamento, três técnicas que o próprio detector de slop condena.",
            },
            {
              en: "One of its examples used `transition: all`, a pattern it forbids elsewhere.",
              pt: "Um dos exemplos dela usava `transition: all`, um padrão que ela proíbe em outro trecho.",
            },
          ],
        },
        {
          type: "p",
          text: {
            en: `All of it is [fixed in the skill](${COMMIT_AUDIT}). The demo showed two more limits. The 24px links in the new screen went unnoticed. And a number estimated by eye still needs measuring: in the last guide, ux-designer counted 5 of 6 failing color pairs by hand; measured, it was 4 of 6, and that guide now says so.`,
            pt: `Tudo isso está [corrigido na skill](${COMMIT_AUDIT}). A demonstração mostrou mais dois limites. Os links de 24px da tela nova passaram despercebidos. E número estimado no olho ainda precisa de medida: no último guia, a ux-designer contou à mão 5 de 6 pares de cor reprovados; medidos, eram 4 de 6, e aquele guia agora diz isso.`,
          },
        },
        {
          type: "callout",
          label: { en: "In practice", pt: "Na prática" },
          text: {
            en: "This guide shows one run, and the same request can give a different screen next time. Treat what it hands over as a strong first draft: look at it at your real widths, and measure what a screenshot can't show.",
            pt: "Este guia mostra uma execução, e o mesmo pedido pode dar outra tela da próxima vez. Trate o que ela entrega como um primeiro rascunho forte: olhe nas larguras reais do seu produto e meça o que um screenshot não mostra.",
          },
        },
      ],
    },
    {
      id: "credits",
      nav: { en: "Credits", pt: "Créditos" },
      title: { en: "Sources and credits", pt: "Fontes e créditos" },
      blocks: [
        {
          type: "p",
          text: {
            en: "The skill puts other people's work to use at the moment it matters. The main sources:",
            pt: "A skill usa o trabalho de outras pessoas no momento em que ele importa. As fontes principais:",
          },
        },
        {
          type: "list",
          items: [
            {
              en: "**Slop detector**: adapted from [Impeccable](https://impeccable.style/slop) by Paul Bakaus.",
              pt: "**Detector de slop**: adaptado da [Impeccable](https://impeccable.style/slop), do Paul Bakaus.",
            },
            {
              en: "**Interface checklist**: [Rauno Freiberg](https://interfaces.rauno.me) and [Jakub Krehel](https://jakub.kr).",
              pt: "**Checklist de interface**: [Rauno Freiberg](https://interfaces.rauno.me) e [Jakub Krehel](https://jakub.kr).",
            },
            {
              en: "**Type scale**: Tim Brown, [\"More Meaningful Typography\"](https://alistapart.com/article/more-meaningful-typography/), A List Apart, 2011.",
              pt: "**Escala tipográfica**: Tim Brown, [\"More Meaningful Typography\"](https://alistapart.com/article/more-meaningful-typography/), A List Apart, 2011.",
            },
            {
              en: "**Spacing**: [Material Design spacing methods](https://m2.material.io/design/layout/spacing-methods.html) and spec.fm's [8-Point Grid](https://spec.fm/specifics/8-pt-grid).",
              pt: "**Espaçamento**: [métodos de espaçamento do Material Design](https://m2.material.io/design/layout/spacing-methods.html) e o [8-Point Grid](https://spec.fm/specifics/8-pt-grid) do spec.fm.",
            },
            {
              en: "**Contrast and target size**: [WCAG 2.2](https://www.w3.org/TR/WCAG22/). **Dark theme**: [Material Design](https://m2.material.io/design/color/dark-theme.html). **Animation performance**: [web.dev](https://web.dev/articles/animations-guide).",
              pt: "**Contraste e área de toque**: [WCAG 2.2](https://www.w3.org/TR/WCAG22/). **Tema escuro**: [Material Design](https://m2.material.io/design/color/dark-theme.html). **Performance de animação**: [web.dev](https://web.dev/articles/animations-guide).",
            },
          ],
        },
        {
          type: "p",
          text: {
            en: "Full credits are in the [repository README](https://github.com/Gustavosilveira23/claude-design-skills#credits--sources).",
            pt: "Os créditos completos estão no [README do repositório](https://github.com/Gustavosilveira23/claude-design-skills#credits--sources).",
          },
        },
      ],
    },
  ],
  author: {
    en: "Senior product designer. I designed products at Hotmart and Sympla and now work on AI products. Building one? [Let's talk](/contact).",
    pt: "Product designer sênior. Desenhei produtos na Hotmart e na Sympla e hoje trabalho com produtos de IA. Está construindo um? [Vamos conversar](/contact).",
  },
  faq: [
    {
      q: { en: "Should I use ui-designer or frontend-design?", pt: "Uso a ui-designer ou a frontend-design?" },
      a: {
        en: "They aim at different jobs. frontend-design, Anthropic's official skill, pushes toward a distinctive aesthetic and suits a new page. ui-designer works inside a project that already exists: it reads your tokens and components first and defaults to restraint on product screens. You can install both.",
        pt: "Elas servem a trabalhos diferentes. A frontend-design, skill oficial da Anthropic, puxa para uma estética marcante e combina com uma página nova. A ui-designer trabalha dentro de um projeto que já existe: lê seus tokens e componentes primeiro e parte da contenção em telas de produto. Dá para instalar as duas.",
      },
    },
    {
      q: { en: "How is it different from Impeccable?", pt: "Qual a diferença para a Impeccable?" },
      a: {
        en: "Impeccable is a full design skill with its own commands and a catalog of anti-patterns. ui-designer uses an adapted, filtered version of that catalog as one of its checks. If the catalog is what you're after, install Impeccable.",
        pt: "A Impeccable é uma skill de design completa, com comandos próprios e um catálogo de antipadrões. A ui-designer usa uma versão adaptada e filtrada desse catálogo como uma das checagens. Se o que você quer é o catálogo, instale a Impeccable.",
      },
    },
    {
      q: { en: "Do I have to use an 8pt grid?", pt: "Preciso usar grid de 8pt?" },
      a: {
        en: "No. The skill defaults to it because one scale beats random values, and it follows whatever scale your project already has. An off-scale value only needs a stated reason.",
        pt: "Não. A skill parte dele porque uma escala vale mais que valores soltos, e segue a escala que o seu projeto já tiver. Um valor fora da escala só precisa de um motivo declarado.",
      },
    },
    {
      q: { en: "Does the 60-30-10 rule work for interfaces?", pt: "A regra 60-30-10 funciona em interface?" },
      a: {
        en: "It comes from interior design, and I haven't found a study that tests it on screens. The skill uses it as a starting proportion to keep the accent color rare, not as a target to measure.",
        pt: "Ela vem da decoração de interiores, e não encontrei estudo que teste a regra em telas. A skill usa como proporção inicial para manter a cor de destaque rara, não como meta a medir.",
      },
    },
    {
      q: {
        en: "Does it work in a project that already has a design system?",
        pt: "Funciona num projeto que já tem design system?",
      },
      a: {
        en: "That's the case it's built for. Before generating anything it reads your tokens and components, uses them, and extends them only when something is missing. In the demo, the new screen's CSS had zero fixed colors.",
        pt: "É o caso para o qual ela foi feita. Antes de gerar qualquer coisa, lê seus tokens e componentes, usa os dois e só estende quando falta algo. Na demonstração, o CSS da tela nova ficou com zero cores fixas.",
      },
    },
    {
      q: {
        en: "Does it need Playwright to look at the screen?",
        pt: "Ela precisa do Playwright para olhar a tela?",
      },
      a: {
        en: "To look, yes: it uses the Playwright or Chrome DevTools MCP server, whichever you have. Without one, it says it skipped the visual check and still runs the checks it can do in the code.",
        pt: "Para olhar, sim: ela usa o servidor MCP do Playwright ou do Chrome DevTools, o que você tiver. Sem nenhum dos dois, ela avisa que pulou a checagem visual e roda mesmo assim as checagens que dá para fazer no código.",
      },
    },
    {
      q: { en: "Does it work in Cursor or Codex?", pt: "Funciona no Cursor ou no Codex?" },
      a: {
        en: "Yes. The install command works for agents that read the Agent Skills format, including Cursor and Codex. On claude.ai, zip the `ui-designer` folder and upload it under Customize > Skills.",
        pt: "Sim. O comando de instalação funciona para agentes que leem o formato Agent Skills, incluindo Cursor e Codex. No claude.ai, compacte a pasta `ui-designer` em zip e envie em Customize > Skills.",
      },
    },
    {
      q: { en: "Can I use it after ux-designer?", pt: "Dá para usar depois da ux-designer?" },
      a: {
        en: "That's the order I use. [ux-research](/skills/ux-research) gathers the evidence, [ux-designer](/skills/ux-designer) designs the flow and ui-designer builds the screen. This guide is the third step of the same case. All six skills are in the [index](/skills).",
        pt: "É a ordem que eu uso. A [ux-research](/skills/ux-research) reúne a evidência, a [ux-designer](/skills/ux-designer) desenha o fluxo e a ui-designer constrói a tela. Este guia é o terceiro passo do mesmo caso. As seis skills estão no [índice](/skills).",
      },
    },
  ],
};
