import type { SkillGuide } from "./types";

// Texto do guia /skills/ux-designer. EN é a voz principal; PT é tradução (DESIGN.md, Copy).
// A sessão foi gravada em inglês em 10/11/2026 (Claude Code headless, só esta skill, sem CLAUDE.md
// pessoal). Respostas da skill são reais e encurtadas; falas do usuário foram escritas para a demo;
// a tela auditada é fictícia. A página declara as três coisas, e o PT diz que a conversa é traduzida.
// Nomes de framework (ELMR, CLEAR e as cinco dimensões) ficam em inglês nas duas línguas.
// Blocos de código: no máximo 68 colunas por linha nas duas línguas (não rolam no desktop).
// Fontes de cada número: .docs/PRD-ux-designer.md, seção "Fontes verificadas".

export const uxDesignerGuide: SkillGuide = {
  slug: "ux-designer",
  repoPath: "skills/ux-designer",
  published: "2026-11-11",
  updated: "2026-11-11",
  meta: {
    title: { en: "UX Designer Skill for Claude Code", pt: "Skill de UX Design para o Claude Code" },
    description: {
      en: "A free Claude Code skill that asks who uses an interface before building it, presents a UX strategy first and audits screens with a CLEAR scorecard.",
      pt: "Uma skill gratuita do Claude Code que pergunta quem usa a interface antes de construir, apresenta a estratégia de UX primeiro e audita telas com o scorecard CLEAR.",
    },
  },
  breadcrumb: { en: "UX Designer", pt: "UX Designer" },
  h1: { en: "A UX design skill for Claude Code", pt: "Uma skill de UX Design para o Claude Code" },
  lead: {
    en: "**ux-designer is a free, open-source skill for Claude Code that makes Claude ask who uses an interface before it builds one, present a UX strategy before writing code, push back on requests that would hurt the experience, and audit existing screens with a score out of 10 or a CLEAR scorecard.** It also checks what AI-generated interfaces tend to skip: empty and error states, microcopy, keyboard access and touch targets.",
    pt: "**A ux-designer é uma skill gratuita e open source para o Claude Code que faz o Claude perguntar quem usa uma interface antes de construí-la, apresentar a estratégia de UX antes de escrever código, discordar de pedidos que piorariam a experiência e auditar telas existentes com uma nota de 0 a 10 ou com o scorecard CLEAR.** Ela também confere o que interfaces geradas por IA costumam esquecer: estados vazios e de erro, microcopy, acesso por teclado e área de toque.",
  },
  sections: [
    {
      id: "install",
      nav: { en: "Install", pt: "Instalar" },
      title: { en: "Install it in one command", pt: "Instale com um comando" },
      blocks: [
        { type: "install", command: "npx skills add Gustavosilveira23/claude-design-skills -s ux-designer -g" },
        {
          type: "p",
          text: {
            en: "That installs it for every project on your machine. Ask Claude Code to design, review or fix anything a person uses, and the skill loads on its own. You can also call it directly with `/ux-designer`, followed by a URL, a component name or a file path.",
            pt: "Isso instala a skill para todos os projetos da sua máquina. Peça ao Claude Code para desenhar, revisar ou consertar qualquer coisa que uma pessoa usa, e a skill carrega sozinha. Você também pode chamá-la direto com `/ux-designer`, seguido de uma URL, do nome de um componente ou do caminho de um arquivo.",
          },
        },
        {
          type: "p",
          text: {
            en: "The same command works in Cursor, Codex and other agents that read the Agent Skills format. On claude.ai, zip the `ux-designer` folder and upload it under Customize > Skills, with code execution turned on. The code lives at [github.com/Gustavosilveira23/claude-design-skills](https://github.com/Gustavosilveira23/claude-design-skills), MIT licensed, next to five other design skills.",
            pt: "O mesmo comando funciona no Cursor, no Codex e em outros agentes que leem o formato Agent Skills. No claude.ai, compacte a pasta `ux-designer` em zip e envie em Customize > Skills, com a execução de código ligada. O código fica em [github.com/Gustavosilveira23/claude-design-skills](https://github.com/Gustavosilveira23/claude-design-skills), com licença MIT, junto de outras cinco skills de design.",
          },
        },
      ],
    },
    {
      id: "gate",
      nav: { en: "It asks first", pt: "Pergunta antes" },
      title: { en: "It asks before it builds", pt: "Ela pergunta antes de construir" },
      blocks: [
        {
          type: "p",
          text: {
            en: "Ask most AI tools to design the calendar step of an onboarding and you get a screen. This skill stops first. Until it knows who uses the interface, what problem it solves and what the constraints are, it asks instead of building.",
            pt: "Peça à maioria das ferramentas de IA para desenhar a etapa da agenda de um onboarding e você recebe uma tela. Esta skill para antes. Enquanto não sabe quem usa a interface, que problema ela resolve e quais são as restrições, ela pergunta em vez de construir.",
          },
        },
        {
          type: "p",
          text: {
            en: "To show it, I continued the case from the [ux-research guide](/skills/ux-research#specify). There, research on a scheduling tool found that new admins won't connect their calendar before they've seen the product work, and the skill wrote a design brief whose one must-have was a working test booking before any permission request. Here, that brief goes to ux-designer. I recorded the session in a fresh Claude Code session with only this skill installed. The skill's replies are real and shortened; the user's lines were written for the demo.",
            pt: "Para mostrar, continuei o caso do [guia da ux-research](/skills/ux-research#specify). Lá, a pesquisa sobre uma ferramenta de agendamento descobriu que admins novos não conectam a agenda antes de ver o produto funcionando, e a skill escreveu um brief de design cujo único item obrigatório era uma reunião de teste funcionando antes de qualquer pedido de permissão. Aqui, esse brief vai para a ux-designer. Gravei numa sessão nova do Claude Code, só com esta skill instalada. As respostas da skill são reais, encurtadas e traduzidas do inglês; as falas do usuário foram escritas para a demonstração.",
          },
        },
        {
          type: "conversation",
          turns: [
            {
              role: "user",
              text: {
                en: "/ux-designer Here's the design brief from our research on why new admins stall in onboarding. Can you design the calendar connection step? [brief pasted]",
                pt: "/ux-designer Aqui está o brief de design da nossa pesquisa sobre por que admins novos travam no onboarding. Você pode desenhar a etapa de conectar a agenda? [brief colado]",
              },
            },
            {
              role: "skill",
              text: {
                en: `The brief covers what to build. It leaves out a few things that would change the design, so I have some questions before I start.
[...]
1. What made admins stall? "They don't trust us with their calendar", "they don't see the value yet" and "IT has to approve it" each lead to a different screen.
2. How does a test booking work before we have calendar access? The must-have depends on it.
3. Who grants the permission? Their own calendar in one OAuth click, or workspace-wide consent from an IT admin?
4. What did "reframed by research" decide?
5. Desktop or mobile? Is there a design system? Do you want a prototype, a Figma file or a flow and states spec?
If you only have time for two, answer 1 and 2.`,
                pt: `O brief diz o que construir. Ele deixa de fora algumas coisas que mudariam o design, então tenho perguntas antes de começar.
[...]
1. O que fez os admins travarem? "Não confiam a agenda a nós", "ainda não veem valor" e "a TI precisa aprovar" levam, cada um, a uma tela diferente.
2. Como funciona uma reunião de teste antes de termos acesso à agenda? O item obrigatório depende disso.
3. Quem concede a permissão? A própria agenda, com um clique de OAuth, ou o consentimento da empresa inteira, dado por um admin de TI?
4. O que o "reformulada pela pesquisa" decidiu?
5. Desktop ou celular? Existe design system? Você quer um protótipo, um arquivo no Figma ou uma spec de fluxo e estados?
Se só tiver tempo para duas, responda a 1 e a 2.`,
              },
            },
            {
              role: "user",
              text: {
                en: `1. They won't connect before they've seen it work. 5 of 6 stopped at "Connect your calendar". One said: "I didn't want to give it access to everyone's calendar before I knew it worked." 3 of 6 came back after a colleague said it was safe.
2. They can book a slot on their own page with default hours and get the confirmation email.
3. Mostly their own calendar. Some bigger companies need IT consent.
4. Show it working first.
5. Desktop, we have a design system, a flow and states spec is enough.`,
                pt: `1. Eles não conectam antes de ver funcionando. 5 de 6 pararam em "Conecte sua agenda". Um disse: "Eu não queria dar acesso à agenda de todo mundo antes de saber se funcionava." 3 de 6 voltaram depois que um colega disse que era seguro.
2. Eles podem marcar um horário na própria página, com o horário padrão, e recebem o e-mail de confirmação.
3. Quase sempre a própria agenda. Algumas empresas maiores precisam de consentimento da TI.
4. Mostrar funcionando primeiro.
5. Desktop, temos design system, uma spec de fluxo e estados basta.`,
              },
            },
          ],
        },
        {
          type: "p",
          text: {
            en: "Every question changes the design. Question 3 is the one teams skip most: if consent needs an IT admin, part of this step becomes \"send this to your IT person\", and no screen layout fixes that.",
            pt: "Cada pergunta muda o design. A 3 é a que os times mais pulam: se o consentimento depende de um admin de TI, parte desta etapa vira \"mande isto para a pessoa da TI\", e nenhum layout de tela resolve isso.",
          },
        },
      ],
    },
    {
      id: "strategy",
      nav: { en: "Strategy first", pt: "Estratégia antes" },
      title: { en: "Strategy before code", pt: "Estratégia antes do código" },
      blocks: [
        {
          type: "p",
          text: {
            en: "With the answers in, the skill presents a strategy in a fixed format and waits for approval before it writes a spec or any code. A quick fix gets one sentence. A new flow gets the full template.",
            pt: "Com as respostas, a skill apresenta a estratégia num formato fixo e espera aprovação antes de escrever spec ou código. Um ajuste rápido ganha uma frase. Um fluxo novo ganha o modelo inteiro.",
          },
        },
        {
          type: "code",
          label: { en: "What came back (shortened)", pt: "O que voltou (encurtado)" },
          code: {
            en: `UX STRATEGY  Calendar connection step

TARGET USER  A new admin at their desk, evaluating the tool.
             Cautious: they feel they're vouching for it to
             their team.

CORE INSIGHT Trust comes from seeing it work. Connecting the
             calendar should fix a problem they just saw.

KEY DECISIONS
  1. Test booking first, framed as "try your page".
  2. The reason to connect comes from what they saw:
     "This booking isn't on your calendar yet."
  3. One line on scope: "Connects your calendar only.
     Your team's calendars stay private."
  4. "Skip for now" is a real exit. The page stays live.
  5. A short page they can forward to IT or a colleague.

BIGGEST RISK The test booking satisfies them and they leave
             without connecting.`,
            pt: `ESTRATÉGIA DE UX  Etapa de conectar a agenda

USUÁRIO      Um admin novo na mesa de trabalho, avaliando a
             ferramenta. Cauteloso: sente que está dando aval
             a ela para o time.

INSIGHT      A confiança vem de ver funcionando. Conectar a
             agenda deve resolver um problema que ele acabou
             de ver.

DECISÕES
  1. Reunião de teste primeiro, como "experimente sua página".
  2. O motivo para conectar vem do que ele viu:
     "Esta reunião ainda não está na sua agenda."
  3. Uma linha sobre o alcance: "Conecta só a sua agenda.
     As agendas do seu time continuam privadas."
  4. "Pular por enquanto" é uma saída real. A página fica no ar.
  5. Uma página curta para encaminhar à TI ou a um colega.

MAIOR RISCO  A reunião de teste satisfaz, e ele sai sem
             conectar.`,
          },
        },
        {
          type: "p",
          text: {
            en: "Two details came from reading the evidence closely. The quote said \"everyone's calendar\", but the OAuth click only grants access to the admin's own calendar, so part of the fear is about something the product doesn't do. That became decision 3. And it named its own weak spot: a test booking good enough that nobody bothers to connect. The message after the booking is there to close that gap.",
            pt: "Dois detalhes vieram de ler a evidência com atenção. A citação dizia \"a agenda de todo mundo\", mas o clique de OAuth só dá acesso à agenda do próprio admin, então parte do medo é de algo que o produto nem faz. Isso virou a decisão 3. E ela apontou o próprio ponto fraco: uma reunião de teste tão boa que ninguém se dá ao trabalho de conectar. A mensagem depois da reunião está lá para fechar essa brecha.",
          },
        },
      ],
    },
    {
      id: "pushback",
      nav: { en: "It pushes back", pt: "Ela discorda" },
      title: { en: "It pushes back", pt: "Ela discorda" },
      blocks: [
        {
          type: "p",
          text: {
            en: "Then the demo user brought a request from their PM: remove \"Skip for now\", because a mandatory step would raise calendar step completion, the brief's primary metric.",
            pt: "Aí o usuário da demonstração trouxe um pedido do PM: tirar o \"Pular por enquanto\", porque uma etapa obrigatória aumentaria a conclusão da etapa da agenda, a métrica principal do brief.",
          },
        },
        {
          type: "conversation",
          turns: [
            {
              role: "user",
              text: {
                en: "My PM wants to remove \"Skip for now\". If the calendar step is mandatory, calendar step completion goes up, and that's our primary metric. Can we do that?",
                pt: "Meu PM quer tirar o \"Pular por enquanto\". Se a etapa da agenda for obrigatória, a conclusão dessa etapa sobe, e essa é a nossa métrica principal. Dá para fazer isso?",
              },
            },
            {
              role: "skill",
              text: {
                en: `You could, but I'd push back. The metric would probably go up while the real outcome gets worse.
1. It changes who is in the number. Admins who won't connect don't start trusting us because the skip button is gone. They leave onboarding, and completion rises because the doubters left.
2. Your own research says the doubters come back. 3 of 6 returned after a colleague said it was safe. Skip is what lets them return.
3. Some admins can't connect at all. The ones who need IT consent get blocked and become the support tickets your guardrail watches.
4. It's the same mistake the research found, one step later.
Instead: keep skip as a quiet text link, ask "What's stopping you?" when someone skips, and require a connected calendar later, when they share the page with real people. If your PM still wants mandatory, run an A/B test judged on accounts with a connected calendar after 7 days.`,
                pt: `Dá, mas eu discordaria. A métrica provavelmente subiria enquanto o resultado real piora.
1. Muda quem entra no número. Admins que não querem conectar não passam a confiar em nós porque o botão de pular sumiu. Eles saem do onboarding, e a conclusão sobe porque quem duvidava foi embora.
2. A sua própria pesquisa diz que quem duvida volta. 3 de 6 voltaram depois que um colega disse que era seguro. O pular é o que permite essa volta.
3. Alguns admins não conseguem conectar de jeito nenhum. Quem depende da TI fica bloqueado e vira os tickets de suporte que a sua métrica de proteção vigia.
4. É o mesmo erro que a pesquisa encontrou, uma etapa depois.
Em vez disso: mantenha o pular como um link discreto, pergunte "O que está impedindo você?" quando alguém pular, e exija a agenda conectada mais tarde, quando a pessoa for compartilhar a página com gente de verdade. Se o PM ainda quiser obrigatório, faça um teste A/B medido pelas contas com agenda conectada depois de 7 dias.`,
              },
            },
          ],
        },
        {
          type: "p",
          text: {
            en: "The skill's instructions end with one line: advocate for the person on the other side of the screen. In practice that means disagreeing with reasons taken from the brief, offering something else to do, and proposing a test when argument can't settle it.",
            pt: "As instruções da skill terminam com uma linha: defenda a pessoa do outro lado da tela. Na prática, isso é discordar com motivos tirados do brief, oferecer outra coisa a fazer e propor um teste quando a discussão não resolve.",
          },
        },
      ],
    },
    {
      id: "audit",
      nav: { en: "Audits", pt: "Auditorias" },
      title: {
        en: "Audits: a score out of 10, or a CLEAR scorecard",
        pt: "Auditorias: nota de 0 a 10 ou scorecard CLEAR",
      },
      blocks: [
        {
          type: "p",
          text: {
            en: "Point it at an existing screen and it audits in one of two formats. The quick one is a score out of 10, with findings sorted into critical, important and polish, plus what's working. The detailed one is a scorecard adapted from [Growth.Design's CLEAR UI framework](https://growth.design/courses/clear-ui): Copy, Layout, Emphasis, Accessibility and Reward, each scored from 1 to 5, then checked against ELMR for the main action.",
            pt: "Aponte a skill para uma tela existente e ela audita em um de dois formatos. O rápido é uma nota de 0 a 10, com os achados separados em crítico, importante e acabamento, mais o que está funcionando. O detalhado é um scorecard adaptado do [framework CLEAR UI, do Growth.Design](https://growth.design/courses/clear-ui): Copy, Layout, Emphasis, Accessibility e Reward, cada um com nota de 1 a 5, cruzado depois com o ELMR para a ação principal.",
          },
        },
        {
          type: "p",
          text: {
            en: "In the session I asked for the detailed audit of the calendar step the tool has today. That screen is fictional, written for the demo to match what the brief describes: a permission request first, written from the system's side.",
            pt: "Na sessão, pedi a auditoria detalhada da etapa da agenda que a ferramenta tem hoje. Essa tela é fictícia, escrita para a demonstração de acordo com o que o brief descreve: o pedido de permissão primeiro, escrito do ponto de vista do sistema.",
          },
        },
        {
          type: "table",
          head: [
            { en: "Dimension", pt: "Dimensão" },
            { en: "Score", pt: "Nota" },
            { en: "Main problem", pt: "Problema principal" },
          ],
          rows: [
            [
              { en: "Copy", pt: "Copy" },
              { en: "1/5", pt: "1/5" },
              {
                en: "Describes what the system needs, not what the admin gets. Raw scope codes, a \"Submit\" button and a fake \"Error 403\".",
                pt: "Descreve o que o sistema precisa, não o que o admin ganha. Códigos de permissão crus, um botão \"Enviar\" e um \"Error 403\" falso.",
              },
            ],
            [
              { en: "Layout", pt: "Layout" },
              { en: "2/5", pt: "2/5" },
              {
                en: "Two actions (pick, then Submit) where one would do. No Back or Skip.",
                pt: "Duas ações (escolher e depois Enviar) onde uma bastaria. Sem Voltar nem Pular.",
              },
            ],
            [
              { en: "Emphasis", pt: "Emphasis" },
              { en: "2/5", pt: "2/5" },
              {
                en: "The provider choice looks like plain boxes. The strongest element is a button that does nothing on its own.",
                pt: "A escolha do provedor parece um par de caixas comuns. O elemento mais forte é um botão que sozinho não faz nada.",
              },
            ],
            [
              { en: "Accessibility", pt: "Accessibility" },
              { en: "1/5", pt: "1/5" },
              {
                en: "Provider tiles can't be reached by keyboard. 5 of 6 color pairs fail contrast.",
                pt: "Os provedores não são alcançáveis pelo teclado. 5 de 6 pares de cor reprovam no contraste.",
              },
            ],
            [
              { en: "Reward", pt: "Reward" },
              { en: "1/5", pt: "1/5" },
              {
                en: "No benefit stated before the ask, and no feedback when you click.",
                pt: "Nenhum benefício dito antes do pedido, e nenhum retorno quando você clica.",
              },
            ],
            [
              { en: "Total", pt: "Total" },
              { en: "7/25", pt: "7/25" },
              {
                en: "Asks for broad access before showing anything works.",
                pt: "Pede acesso amplo antes de mostrar que qualquer coisa funciona.",
              },
            ],
          ],
          total: true,
        },
        {
          type: "code",
          label: { en: "Critical findings (shortened)", pt: "Achados críticos (encurtado)" },
          code: {
            en: `1. It asks before it proves anything. This is the screen
   where 5 of 6 admins stopped.
2. Clicking a provider changes nothing on screen.
3. Keyboard and screen-reader users can't connect at all:
   the provider tiles are divs with click handlers.
4. Picking no provider shows "Error 403:
   insufficient_permissions". Nothing was denied. Admins
   already nervous about permissions see a permission error.
5. One scope, admin.directory.resource.calendar, reads like
   access to the whole organization.

QUESTION FOR ENGINEERING
Does onboarding need the resource-calendar scope? Admin
directory scopes often require IT approval.`,
            pt: `1. Pede antes de provar qualquer coisa. Esta é a tela
   onde 5 de 6 admins pararam.
2. Clicar num provedor não muda nada na tela.
3. Quem usa teclado ou leitor de tela não consegue conectar:
   os provedores são divs com clique, não botões.
4. Não escolher provedor mostra "Error 403:
   insufficient_permissions". Nada foi negado. Admins já
   nervosos com permissão veem um erro de permissão.
5. Uma permissão, admin.directory.resource.calendar, parece
   dar acesso à organização inteira.

PERGUNTA PARA A ENGENHARIA
O onboarding precisa da permissão de salas de reunião?
Permissões de diretório costumam exigir aprovação da TI.`,
          },
        },
        {
          type: "p",
          text: {
            en: "Finding 4 is the kind a checklist misses: an error message telling a nervous person that the thing they fear just happened. The skill also said what it couldn't check. It worked out the contrast ratios by hand, because running a script needed approval, and it didn't score the screens after the redirect to Google or Microsoft, because they weren't in the file.",
            pt: "O achado 4 é do tipo que checklist não pega: uma mensagem de erro dizendo a uma pessoa nervosa que aquilo que ela teme acabou de acontecer. A skill também disse o que não conseguiu conferir. Calculou o contraste à mão, porque rodar um script precisava de aprovação, e não deu nota às telas depois do redirecionamento para o Google ou a Microsoft, porque elas não estavam no arquivo.",
          },
        },
      ],
    },
    {
      id: "checks",
      nav: { en: "What it checks", pt: "O que ela confere" },
      title: { en: "What it checks while it designs", pt: "O que ela confere enquanto desenha" },
      blocks: [
        {
          type: "p",
          text: {
            en: "Between the strategy and the audit, the skill runs the same checks on anything it designs. These are the ones that catch what AI-generated interfaces usually miss:",
            pt: "Entre a estratégia e a auditoria, a skill faz as mesmas conferências em tudo o que desenha. Estas são as que pegam o que interfaces geradas por IA costumam esquecer:",
          },
        },
        {
          type: "list",
          items: [
            {
              en: "**States, not only the happy path.** Empty, loading, error and success, plus edge cases: zero items, a thousand items, long names, missing data. Every step of a flow needs a way out.",
              pt: "**Estados, não só o caminho feliz.** Vazio, carregando, erro e sucesso, mais os casos de borda: zero itens, mil itens, nomes longos, dado faltando. Toda etapa de um fluxo precisa de uma saída.",
            },
            {
              en: "**Microcopy.** Buttons name the outcome (\"Connect Google Calendar\", never \"Submit\"). Errors say what happened, why and what to do next. Confirmation dialogs name both actions.",
              pt: "**Microcopy.** Botões dizem o resultado (\"Conectar Google Agenda\", nunca \"Enviar\"). Erros dizem o que aconteceu, por que e o que fazer. Diálogos de confirmação nomeiam as duas ações.",
            },
            {
              en: "**Accessibility.** Text contrast of at least 4.5:1 (WCAG AA), real buttons instead of clickable divs, visible focus and `prefers-reduced-motion`. Touch targets aim for 44x44 pt and never drop below the WCAG AA floor of 24x24 CSS pixels.",
              pt: "**Acessibilidade.** Contraste de texto de pelo menos 4,5:1 (WCAG AA), botões de verdade em vez de divs clicáveis, foco visível e `prefers-reduced-motion`. A área de toque mira em 44x44 pt e nunca fica abaixo do piso da WCAG AA, de 24x24 pixels CSS.",
            },
            {
              en: "**Psychology, with sources.** Working memory holds about four chunks ([Cowan, 2001](https://doi.org/10.1017/S0140525X01003922)). More options slow decisions ([Hick's law](https://lawsofux.com/hicks-law/)). People judge an experience by its peak and its end ([Kahneman et al., 1993](https://doi.org/10.1111/j.1467-9280.1993.tb00589.x)).",
              pt: "**Psicologia, com fonte.** A memória de trabalho guarda cerca de quatro blocos de informação ([Cowan, 2001](https://doi.org/10.1017/S0140525X01003922)). Mais opções deixam a decisão mais lenta ([lei de Hick](https://lawsofux.com/hicks-law/)). As pessoas julgam uma experiência pelo pico e pelo final ([Kahneman et al., 1993](https://doi.org/10.1111/j.1467-9280.1993.tb00589.x)).",
            },
            {
              en: "**Feedback timing.** A response within 0.1 second feels instant. Past about 10 seconds, show a percent-done progress bar ([Nielsen, 1993](https://www.nngroup.com/articles/response-times-3-important-limits/)).",
              pt: "**Tempo de resposta.** Uma resposta em até 0,1 segundo parece instantânea. Passando de uns 10 segundos, mostre uma barra de progresso com porcentagem ([Nielsen, 1993](https://www.nngroup.com/articles/response-times-3-important-limits/)).",
            },
            {
              en: "**Motion with a reason.** Every animation has to answer a question: where did this come from, what changed, did my action work. Most UI animations fall between 100 and 500 ms ([NN/g](https://www.nngroup.com/articles/animation-duration/)).",
              pt: "**Animação com motivo.** Toda animação precisa responder a uma pergunta: de onde isto veio, o que mudou, minha ação funcionou. A maioria das animações de interface fica entre 100 e 500 ms ([NN/g](https://www.nngroup.com/articles/animation-duration/)).",
            },
          ],
        },
        {
          type: "p",
          text: {
            en: "Before writing this guide I checked every number in the skill against its primary source. Ten were wrong, outdated or had no source. One said left-aligned content gets 30% more attention; the study behind it measured 30% of viewing time on the right half of the page, in 2010. The current figure is about 80% on the left half ([NN/g, 2017](https://www.nngroup.com/articles/horizontal-attention-leans-left/)). All ten are [fixed in the skill](https://github.com/Gustavosilveira23/claude-design-skills/commit/f70854e7c0014abf9c8881e12f8f2e07bed744da).",
            pt: "Antes de escrever este guia, conferi cada número da skill na fonte primária. Dez estavam errados, desatualizados ou sem fonte. Um dizia que conteúdo alinhado à esquerda recebe 30% mais atenção; o estudo por trás dele mediu 30% do tempo de leitura na metade direita da página, em 2010. O número atual é de cerca de 80% na metade esquerda ([NN/g, 2017](https://www.nngroup.com/articles/horizontal-attention-leans-left/)). Os dez estão [corrigidos na skill](https://github.com/Gustavosilveira23/claude-design-skills/commit/f70854e7c0014abf9c8881e12f8f2e07bed744da).",
          },
        },
      ],
    },
    {
      id: "ai-limits",
      nav: { en: "Where AI fails", pt: "Onde a IA falha" },
      title: { en: "Where AI fails at UX review", pt: "Onde a IA falha na revisão de UX" },
      blocks: [
        {
          type: "p",
          text: {
            en: "The research on AI audits points one way: models find part of the real problems and invent others. How much of each depends on the method.",
            pt: "A pesquisa sobre auditoria com IA aponta para o mesmo lado: os modelos encontram parte dos problemas reais e inventam outros. Quanto de cada um depende do método.",
          },
        },
        {
          type: "p",
          text: {
            en: "In 2023, Baymard Institute gave ChatGPT-4 screenshots of 12 e-commerce pages and compared its suggestions with those of six UX benchmarkers who reviewed the live pages. 80% of the AI's suggestions were wrong. It found 14% of the problems on the live pages, and 26% of the ones visible in the screenshots ([Holst, Baymard, 2023](https://baymard.com/research-articles/gpt-ux-audit)).",
            pt: "Em 2023, o Baymard Institute deu ao ChatGPT-4 screenshots de 12 páginas de e-commerce e comparou as sugestões dele com as de seis especialistas que revisaram as páginas ao vivo. 80% das sugestões da IA estavam erradas. Ela encontrou 14% dos problemas das páginas ao vivo e 26% dos que apareciam nos screenshots ([Holst, Baymard, 2023](https://baymard.com/research-articles/gpt-ux-audit)).",
          },
        },
        {
          type: "p",
          text: {
            en: "A 2025 study got far more coverage with a structured prompt built on Nielsen's heuristics: GPT-4 found 73% and 77% of the usability problems in two mobile apps, more than five experienced evaluators combined (57% and 63%). It also flagged 95 issues that weren't problems, against 9 from the experts, and struggled with problems that span several screens ([Zhong, McDonald and Hsieh, 2025](https://arxiv.org/abs/2507.02306)). The two studies measure different things, so they don't show AI going from 14% to 77%.",
            pt: "Um estudo de 2025 chegou a uma cobertura bem maior com um prompt estruturado sobre as heurísticas de Nielsen: o GPT-4 encontrou 73% e 77% dos problemas de usabilidade de dois apps de celular, mais do que cinco avaliadores experientes somados (57% e 63%). Também apontou 95 itens que não eram problemas, contra 9 dos especialistas, e teve dificuldade com problemas que atravessam várias telas ([Zhong, McDonald e Hsieh, 2025](https://arxiv.org/abs/2507.02306)). Os dois estudos medem coisas diferentes, então não mostram a IA indo de 14% para 77%.",
          },
        },
        {
          type: "p",
          text: {
            en: "Daniela Napoli, a UX researcher who built her own heuristic evaluation skill, tested it on her own site, where she knew the reason behind every decision. Her summary: \"Claude confidently flagged problems that did not exist\", mostly in dynamic content and paths it couldn't verify ([Napoli, 2026](https://hellodaniela.substack.com/p/ai-heuristic-evaluation-building)).",
            pt: "Daniela Napoli, pesquisadora de UX que criou a própria skill de avaliação heurística, testou no próprio site, onde conhecia o motivo de cada decisão. O resumo dela: o Claude \"apontou com confiança problemas que não existiam\", principalmente em conteúdo dinâmico e em caminhos que não conseguia verificar ([Napoli, 2026](https://hellodaniela.substack.com/p/ai-heuristic-evaluation-building), tradução minha).",
          },
        },
        {
          type: "p",
          text: { en: "So the skill is built around that limit:", pt: "Por isso a skill foi construída em torno desse limite:" },
        },
        {
          type: "list",
          items: [
            {
              en: "It asks who uses the screen before judging it, so each finding is tied to a person and a goal instead of a generic best practice.",
              pt: "Ela pergunta quem usa a tela antes de julgá-la, então cada achado fica ligado a uma pessoa e a um objetivo, e não a uma boa prática genérica.",
            },
            {
              en: "It says what it couldn't check. In the demo it flagged the contrast it calculated by hand and the screens it never saw.",
              pt: "Ela diz o que não conseguiu conferir. Na demonstração, avisou do contraste calculado à mão e das telas que nunca viu.",
            },
            {
              en: "Every review ends with what to test: the riskiest assumption and the cheapest way to check it with real users.",
              pt: "Toda revisão termina com o que testar: a premissa mais arriscada e o jeito mais barato de conferi-la com usuários reais.",
            },
          ],
        },
        {
          type: "p",
          text: {
            en: "Treat its audit as a first pass. Each finding is a hypothesis to check on the live screen, and the ones that matter go to users.",
            pt: "Trate a auditoria dela como uma primeira passada. Cada achado é uma hipótese para conferir na tela de verdade, e os que importam vão para os usuários.",
          },
        },
      ],
    },
    {
      id: "credits",
      nav: { en: "Credits", pt: "Créditos" },
      title: { en: "Frameworks and credits", pt: "Frameworks e créditos" },
      blocks: [
        {
          type: "p",
          text: {
            en: "The skill combines frameworks other people published first. Its job is to make Claude apply them in the same conversation, at the moment they matter.",
            pt: "A skill combina frameworks que outras pessoas publicaram primeiro. O trabalho dela é fazer o Claude aplicá-los na mesma conversa, no momento em que importam.",
          },
        },
        {
          type: "list",
          items: [
            {
              en: "**ELMR** (Emotion, Logic, Motivation, Reward): from Reforge's user psychology material, [attributed to Brian Balfour](https://coschedule.com/blog/user-psychology) in secondary sources. The original lesson is behind a Reforge login.",
              pt: "**ELMR** (Emotion, Logic, Motivation, Reward): do material de psicologia do usuário da Reforge, [atribuído a Brian Balfour](https://coschedule.com/blog/user-psychology) em fontes secundárias. A lição original fica atrás do login da Reforge.",
            },
            {
              en: "**CLEAR** (Copy, Layout, Emphasis, Accessibility, Reward): [Growth.Design, CLEAR UI course](https://growth.design/courses/clear-ui). The 1 to 5 scale and the criteria in the skill are my adaptation, not the course material.",
              pt: "**CLEAR** (Copy, Layout, Emphasis, Accessibility, Reward): [Growth.Design, curso CLEAR UI](https://growth.design/courses/clear-ui). A escala de 1 a 5 e os critérios da skill são adaptação minha, não o material do curso.",
            },
            {
              en: "**Laws of UX**: [Jon Yablonski](https://lawsofux.com), for Hick's law, Fitts's law, Jakob's law and the peak-end rule, each with a link to the original paper.",
              pt: "**Laws of UX**: [Jon Yablonski](https://lawsofux.com), para as leis de Hick, Fitts e Jakob e a regra do pico e fim, cada uma com link para o artigo original.",
            },
            {
              en: "**Attention, response times and animation**: [Nielsen Norman Group](https://www.nngroup.com) research, cited by date in the skill.",
              pt: "**Atenção, tempo de resposta e animação**: pesquisas do [Nielsen Norman Group](https://www.nngroup.com), citadas com data na skill.",
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
      q: { en: "How is a skill different from a prompt?", pt: "Qual a diferença entre uma skill e um prompt?" },
      a: {
        en: "A prompt lasts one conversation. A skill is a folder of instructions and reference files that Claude loads on its own whenever a request matches, in every project. This one runs to about 1,200 lines, more than anyone would paste into a chat.",
        pt: "Um prompt dura uma conversa. Uma skill é uma pasta com instruções e arquivos de referência que o Claude carrega sozinho sempre que o pedido combina, em qualquer projeto. Esta tem cerca de 1.200 linhas, mais do que alguém colaria num chat.",
      },
    },
    {
      q: { en: "Do I need to know how to code?", pt: "Preciso saber programar?" },
      a: {
        en: "No. The skill works the same when you ask for a strategy, a flow spec or an audit of a screenshot. Claude Code runs in a terminal, but you talk to it in plain language. If you'd rather avoid the terminal, upload the skill folder to claude.ai under Customize > Skills.",
        pt: "Não. A skill funciona do mesmo jeito quando você pede uma estratégia, uma spec de fluxo ou a auditoria de um screenshot. O Claude Code roda no terminal, mas você conversa com ele em linguagem comum. Se preferir não usar o terminal, envie a pasta da skill no claude.ai, em Customize > Skills.",
      },
    },
    {
      q: { en: "Can AI do a UX audit? Is it reliable?", pt: "A IA consegue fazer auditoria de UX? É confiável?" },
      a: {
        en: "As a first pass, yes. Studies show models find part of the real problems and flag others that don't exist: in Baymard's 2023 test, 80% of ChatGPT-4's suggestions were wrong. Treat each finding as a hypothesis, check it on the live screen, and test the important ones with users.",
        pt: "Como primeira passada, sim. Os estudos mostram que os modelos encontram parte dos problemas reais e apontam outros que não existem: no teste do Baymard em 2023, 80% das sugestões do ChatGPT-4 estavam erradas. Trate cada achado como hipótese, confira na tela de verdade e teste os importantes com usuários.",
      },
    },
    {
      q: { en: "Is this a heuristic evaluation?", pt: "Isso é uma avaliação heurística?" },
      a: {
        en: "Not in the strict sense. A heuristic evaluation checks a screen against a fixed list, usually Jakob Nielsen's 10 usability heuristics. This skill audits with a score out of 10 or the CLEAR scorecard, plus the laws of UX and a checklist for states, copy and accessibility. If your team needs a Nielsen heuristics report, ask for one explicitly.",
        pt: "No sentido estrito, não. Uma avaliação heurística confere a tela contra uma lista fixa, em geral as 10 heurísticas de usabilidade de Jakob Nielsen. Esta skill audita com nota de 0 a 10 ou com o scorecard CLEAR, mais as leis de UX e um checklist de estados, copy e acessibilidade. Se o seu time precisa de um relatório pelas heurísticas de Nielsen, peça isso explicitamente.",
      },
    },
    {
      q: {
        en: "How do I make Claude ask questions before it builds?",
        pt: "Como faço o Claude perguntar antes de construir?",
      },
      a: {
        en: "Install this skill: asking is its first step, and it only skips it when you've already answered the three questions (who uses it, what problem it solves, what the constraints are). Without the skill, open your request with those three answers, or tell Claude to interview you before writing any code.",
        pt: "Instale esta skill: perguntar é o primeiro passo dela, e ela só pula quando você já respondeu às três perguntas (quem usa, que problema resolve, quais são as restrições). Sem a skill, comece o pedido com essas três respostas ou diga ao Claude para entrevistar você antes de escrever qualquer código.",
      },
    },
    {
      q: { en: "Does it work in Cursor or Codex?", pt: "Funciona no Cursor ou no Codex?" },
      a: {
        en: "Yes. The install command works for agents that read the Agent Skills format, including Cursor and Codex. On claude.ai, zip the `ux-designer` folder and upload it under Customize > Skills.",
        pt: "Sim. O comando de instalação funciona nos agentes que leem o formato Agent Skills, incluindo Cursor e Codex. No claude.ai, compacte a pasta `ux-designer` em zip e envie em Customize > Skills.",
      },
    },
    {
      q: {
        en: "Can I use it with the other design skills?",
        pt: "Dá para usar junto com as outras skills de design?",
      },
      a: {
        en: "That's how I use them. [ux-research](/skills/ux-research) gathers the evidence and writes the brief, ux-designer turns it into a flow, and ui-designer handles the visual craft. Each one hands off to the next and says so when another fits better. All six are in the [index](/skills).",
        pt: "É assim que eu uso. A [ux-research](/skills/ux-research) reúne a evidência e escreve o brief, a ux-designer desenha o fluxo a partir dele e a ui-designer cuida do acabamento visual. Cada uma passa para a seguinte e avisa quando outra serve melhor. As seis estão no [índice](/skills).",
      },
    },
    {
      q: { en: "What are ELMR and CLEAR?", pt: "O que são ELMR e CLEAR?" },
      a: {
        en: "Two lenses on the same screen. ELMR, from Reforge, looks at the main action: what the person should feel (Emotion), what convinces them (Logic), what makes it easy (Motivation) and what they get (Reward). CLEAR, from Growth.Design, scores the screen itself: Copy, Layout, Emphasis, Accessibility and Reward.",
        pt: "Duas lentes sobre a mesma tela. O ELMR, da Reforge, olha para a ação principal: o que a pessoa deve sentir (Emotion), o que a convence (Logic), o que facilita (Motivation) e o que ela ganha (Reward). O CLEAR, do Growth.Design, dá nota à tela em si: Copy, Layout, Emphasis, Accessibility e Reward.",
      },
    },
  ],
};
