import type { SkillGuide } from "./types";

// Texto do guia /skills/ux-research. EN é a voz principal; PT é tradução (DESIGN.md, Copy).
// Saídas da skill nos blocos de código são reais quando o texto diz que são, e fictícias no
// caso do app de agenda, que a página declara como inventado. A conversa do início guiado foi
// gravada em inglês: o PT diz que ela está traduzida.
// Blocos de código: no máximo 68 colunas por linha nas duas línguas (não rolam no desktop).

export const uxResearchGuide: SkillGuide = {
  slug: "ux-research",
  repoPath: "skills/ux-research",
  published: "2026-11-04",
  updated: "2026-11-05",
  meta: {
    title: { en: "UX Research Skill for Claude Code", pt: "Skill de UX Research para o Claude Code" },
    description: {
      en: "A free Claude Code skill that plans user research, writes interview scripts and turns findings into insights you can trace back to evidence.",
      pt: "Uma skill gratuita do Claude Code que planeja pesquisa com usuários, escreve roteiros de entrevista e liga cada insight à evidência que o sustenta.",
    },
  },
  breadcrumb: { en: "UX Research", pt: "UX Research" },
  h1: { en: "A UX research skill for Claude Code", pt: "Uma skill de UX Research para o Claude Code" },
  lead: {
    en: "**ux-research is a free, open-source skill for Claude Code that plans user research, writes interview scripts, turns raw findings into insights you can trace back to evidence, and hands a design brief to the next step.** Before it suggests any method, it asks what decision the research is supposed to inform. I built it on three published frameworks: Behzod Sirjani's research planning, Daniel Pidcock's Atomic Research and Teresa Torres' Continuous Discovery.",
    pt: "**A ux-research é uma skill gratuita e open source para o Claude Code que planeja pesquisa com usuários, escreve roteiros de entrevista, organiza achados brutos em insights que apontam para a evidência e entrega um brief de design para a etapa seguinte.** Antes de sugerir qualquer método, ela pergunta qual decisão a pesquisa precisa informar. Construí a skill sobre três frameworks publicados: o planejamento de pesquisa de Behzod Sirjani, o Atomic Research de Daniel Pidcock e o Continuous Discovery de Teresa Torres.",
  },
  sections: [
    {
      id: "install",
      nav: { en: "Install", pt: "Instalar" },
      title: { en: "Install it in one command", pt: "Instale com um comando" },
      blocks: [
        { type: "install", command: "npx skills add Gustavosilveira23/claude-design-skills -s ux-research -g" },
        {
          type: "p",
          text: {
            en: "That installs it for every project on your machine. Open a new Claude Code conversation and describe a research problem; the skill loads on its own. You can also call it directly with `/ux-research`.",
            pt: "Isso instala a skill para todos os projetos da sua máquina. Abra uma conversa nova no Claude Code e descreva um problema de pesquisa: a skill carrega sozinha. Você também pode chamá-la direto com `/ux-research`.",
          },
        },
        {
          type: "p",
          text: {
            en: "The same command works in Cursor, Codex and other agents that read the Agent Skills format. On claude.ai, zip the `ux-research` folder and upload it under Customize > Skills, with code execution turned on.",
            pt: "O mesmo comando funciona no Cursor, no Codex e em outros agentes que leem o formato Agent Skills. No claude.ai, compacte a pasta `ux-research` em zip e envie em Customize > Skills, com a execução de código ligada.",
          },
        },
        {
          type: "p",
          text: {
            en: "The code lives at [github.com/Gustavosilveira23/claude-design-skills](https://github.com/Gustavosilveira23/claude-design-skills), MIT licensed, next to five other design skills.",
            pt: "O código fica em [github.com/Gustavosilveira23/claude-design-skills](https://github.com/Gustavosilveira23/claude-design-skills), com licença MIT, junto de outras cinco skills de design.",
          },
        },
      ],
    },
    {
      id: "guided-start",
      nav: { en: "Guided start", pt: "Início guiado" },
      title: {
        en: "Never planned research? Type /ux-research and nothing else",
        pt: "Nunca planejou uma pesquisa? Digite só /ux-research",
      },
      blocks: [
        {
          type: "p",
          text: {
            en: "You don't need to know the method or which mode to pick. Type the command alone and the skill interviews you until there is a decision worth researching. This is the conversation it had with a first-time researcher, recorded in a fresh Claude Code session. The skill's replies are real and shortened; the user's answers were written for the demo. The wording changes from run to run and follows your language. The order of the questions doesn't.",
            pt: "Você não precisa conhecer o método nem saber qual modo escolher. Digite o comando sozinho e a skill entrevista você até aparecer uma decisão que valha uma pesquisa. Esta é a conversa que ela teve com alguém pesquisando pela primeira vez, gravada numa sessão nova do Claude Code. As respostas da skill são reais, encurtadas e traduzidas do inglês; as do usuário foram escritas para a demonstração. As palavras mudam a cada execução e seguem o seu idioma. A ordem das perguntas não muda.",
          },
        },
        {
          type: "conversation",
          turns: [
            { role: "user", text: { en: "/ux-research", pt: "/ux-research" } },
            {
              role: "skill",
              text: {
                en: `What are you working on? A sentence or two is enough to start.
[...]
If you're not sure which mode fits, answer this: what decision are you trying to make? If you had the perfect answer tomorrow, what would you do differently?`,
                pt: `No que você está trabalhando? Uma ou duas frases bastam para começar.
[...]
Se não souber qual modo serve, responda isto: que decisão você está tentando tomar? Se tivesse a resposta perfeita amanhã, o que faria de diferente?`,
              },
            },
            {
              role: "user",
              text: {
                en: "I'm the only designer at a small startup, we make a habit tracking app. My manager said we should do user research. I guess we just want to understand our users better.",
                pt: "Sou a única pessoa de design numa startup pequena, a gente faz um app de hábitos. Meu gestor disse que a gente devia fazer pesquisa com usuários. Acho que a ideia é só entender melhor nossos usuários.",
              },
            },
            {
              role: "skill",
              text: {
                en: `"Understand our users better" isn't something research can finish. You could interview people for six months and still not know when you're done. Here's what a decision could look like for a habit tracking app:
- "Should we rebuild onboarding, or is the real problem week 2?"
- "Do people drop off because they forget to open the app, or because they miss a day and give up?"
What made your manager bring this up now?`,
                pt: `"Entender melhor nossos usuários" não é algo que uma pesquisa consiga terminar. Dá para entrevistar gente por seis meses e ainda não saber quando parar. Veja como uma decisão poderia ficar num app de hábitos:
- "Refazemos o onboarding, ou o problema de verdade está na segunda semana?"
- "As pessoas somem porque esquecem de abrir o app, ou porque perdem um dia e desistem?"
O que fez seu gestor levantar isso agora?`,
              },
            },
            {
              role: "user",
              text: {
                en: "A lot of people stop using the app after the first couple of weeks. The team wants to build streak reminders next quarter but nobody's sure that's the problem.",
                pt: "Muita gente para de usar o app depois das duas primeiras semanas. O time quer construir lembretes de sequência no próximo trimestre, mas ninguém tem certeza de que o problema é esse.",
              },
            },
            {
              role: "skill",
              text: {
                en: `That's a real decision: should we spend next quarter on streak reminders, or is the drop-off caused by something reminders won't fix?
Streak reminders are a bet that people leave because they forget. Other explanations are just as plausible:
- They missed a day, lost the streak, and gave up. If that's the cause, more streak reminders could make it worse.
- The app worked: the habit stuck and they didn't need it anymore.
[...]
One honest check: if the evidence says reminders aren't the answer, is the team actually willing to build something else?`,
                pt: `Isso é uma decisão de verdade: gastamos o próximo trimestre em lembretes de sequência, ou o abandono vem de algo que lembrete não resolve?
Lembrete de sequência é uma aposta de que as pessoas saem porque esquecem. Outras explicações são igualmente plausíveis:
- Perderam um dia, perderam a sequência e desistiram. Se for isso, mais lembretes podem piorar.
- O app funcionou: o hábito pegou e elas não precisaram mais dele.
[...]
Uma checagem honesta: se a evidência disser que lembrete não é a resposta, o time está mesmo disposto a construir outra coisa?`,
              },
            },
          ],
        },
        {
          type: "p",
          text: {
            en: "Three answers in, the vague request has become a decision, the team's favorite solution has five competing explanations, and the skill has already described the one slide the study should end with: why people stopped, grouped by cause, and where \"forgot to open the app\" ranks. From there it moves into Plan mode on its own.",
            pt: "Com três respostas, o pedido vago virou uma decisão, a solução favorita do time ganhou cinco explicações concorrentes e a skill já descreveu o slide com que o estudo deve terminar: por que as pessoas pararam, agrupado por causa, e em que posição fica \"esqueci de abrir o app\". Dali ela passa sozinha para o modo Plan.",
          },
        },
      ],
    },
    {
      id: "modes",
      nav: { en: "Four modes", pt: "Quatro modos" },
      title: { en: "How it works: four modes", pt: "Como funciona: quatro modos" },
      blocks: [
        {
          type: "p",
          text: {
            en: "The skill reads your request and picks one of four modes. If you describe your problem in your own words, you never have to name a mode. Most days I use one at a time.",
            pt: "A skill lê o seu pedido e escolhe um de quatro modos. Se você descrever o problema com as suas palavras, nunca precisa dizer o nome de um modo. Na maioria dos dias eu uso um de cada vez.",
          },
        },
        {
          type: "table",
          head: [
            { en: "Mode", pt: "Modo" },
            { en: "Use it when", pt: "Use quando" },
            { en: "You get", pt: "Você recebe" },
          ],
          rows: [
            [
              { en: "Plan", pt: "Plan" },
              {
                en: "You have a decision to make and not enough evidence",
                pt: "Tem uma decisão a tomar e evidência insuficiente",
              },
              {
                en: "A research brief: stage, method, sample, the one slide you expect to show",
                pt: "Um research brief: estágio, método, amostra, o slide que você espera mostrar",
              },
            ],
            [
              { en: "Interview", pt: "Interview" },
              { en: "You need to talk to users", pt: "Precisa conversar com usuários" },
              {
                en: "Interview scripts, surveys, usability test plans",
                pt: "Roteiros de entrevista, questionários, planos de teste de usabilidade",
              },
            ],
            [
              { en: "Synthesize", pt: "Synthesize" },
              {
                en: "You have notes, transcripts or survey data",
                pt: "Tem anotações, transcrições ou dados de questionário",
              },
              {
                en: "Facts, insights and recommendations, each with a confidence level",
                pt: "Fatos, insights e recomendações, cada um com nível de confiança",
              },
            ],
            [
              { en: "Specify", pt: "Specify" },
              {
                en: "The insights are in and design starts next",
                pt: "Os insights chegaram e o design começa em seguida",
              },
              {
                en: "A design brief where every requirement points back to evidence",
                pt: "Um brief de design em que cada requisito aponta para a evidência",
              },
            ],
          ],
        },
        {
          type: "p",
          text: {
            en: "The examples below follow one invented case from start to finish, so you can see what each mode returns. The company and the numbers are fictional.",
            pt: "Os exemplos abaixo seguem um mesmo caso inventado do começo ao fim, para você ver o que cada modo devolve. A empresa e os números são fictícios.",
          },
        },
        {
          type: "callout",
          label: { en: "The case", pt: "O caso" },
          text: {
            en: "A B2B scheduling app. New teams sign up, then stall before they book a single meeting. The PM asks: should we rebuild onboarding as a guided setup, or fix the self-service flow we have?",
            pt: "Um app B2B de agendamento. Times novos se cadastram e travam antes de marcar a primeira reunião. A PM pergunta: refazemos o onboarding como configuração guiada ou consertamos o fluxo self-service que já existe?",
          },
        },
      ],
    },
    {
      id: "plan",
      nav: { en: "Plan", pt: "Plan" },
      title: {
        en: "Plan: start from the decision, not the method",
        pt: "Plan: comece pela decisão, não pelo método",
      },
      blocks: [
        {
          type: "p",
          text: {
            en: "The first thing the skill does is refuse to start without a decision. \"Learn about our users\" gets sent back with a question: if you had the perfect answer tomorrow, what would you do differently?",
            pt: "A primeira coisa que a skill faz é se recusar a começar sem uma decisão. \"Conhecer nossos usuários\" volta com uma pergunta: se você tivesse a resposta perfeita amanhã, o que faria de diferente?",
          },
        },
        {
          type: "p",
          text: {
            en: "Once the decision is clear, it works through four checks. Which stage the team is in (Discover, Design, Develop or Deploy). How big the decision is, which Sirjani calls the splash zone: size of the work, who has to be involved, who gets affected. What kind of evidence the decision needs. And which methods are actually possible with the time, traffic and access you have.",
            pt: "Com a decisão clara, ela passa por quatro checagens. Em que estágio o time está (Discover, Design, Develop ou Deploy). Qual o tamanho da decisão, o que Sirjani chama de splash zone: tamanho do trabalho, quem precisa participar, quem é afetado. Que tipo de evidência a decisão pede. E quais métodos são possíveis de verdade com o tempo, o tráfego e o acesso que você tem.",
          },
        },
        {
          type: "code",
          label: { en: "Prompt", pt: "Prompt" },
          wrap: true,
          code: {
            en: "/ux-research We're losing new teams before their first booked meeting. Should we rebuild onboarding as a guided setup or fix the self-service flow?",
            pt: "/ux-research Estamos perdendo times novos antes da primeira reunião marcada. Refazemos o onboarding como configuração guiada ou consertamos o fluxo self-service?",
          },
        },
        {
          type: "code",
          label: { en: "What comes back (shortened)", pt: "O que volta (encurtado)" },
          code: {
            en: `DECISION     Guided setup vs. fixing the current self-service
             onboarding.
STAGE        Discover. Nobody can say yet why teams stall, so
             it's too early to compare two solutions.
SPLASH ZONE  Medium. 6-8 weeks of work, sales and support
             affected, every new account goes through it.
EVIDENCE     Behavioral first (where teams stop), then
             attitudinal (why).
METHODS      Funnel review of the setup steps + 6 interviews
             with admins who stalled in the last 30 days.
CUT          A/B test. About 200 signups a month is too few
             per variant.
THE SLIDE    The step where teams stop, next to the words
             they used for it.`,
            pt: `DECISÃO      Configuração guiada vs. consertar o onboarding
             self-service atual.
ESTÁGIO      Discover. Ninguém sabe ainda por que os times
             travam, então é cedo para comparar duas soluções.
SPLASH ZONE  Média. 6 a 8 semanas de trabalho, vendas e suporte
             afetados, toda conta nova passa por ali.
EVIDÊNCIA    Comportamental primeiro (onde os times param),
             depois atitudinal (por quê).
MÉTODOS      Análise do funil das etapas de configuração + 6
             entrevistas com admins que travaram nos últimos
             30 dias.
CORTADO      Teste A/B. Uns 200 cadastros por mês é pouco
             para cada variante.
O SLIDE      A etapa onde os times param, ao lado das palavras
             que eles usaram para descrevê-la.`,
          },
        },
        {
          type: "p",
          text: {
            en: "That last line is Sirjani's \"million dollar slide\": the one chart you expect to change the decision, sketched before any data comes in. If you can't sketch it, you don't know yet what you're looking for.",
            pt: "Essa última linha é o \"million dollar slide\" de Sirjani: o gráfico que você espera que mude a decisão, rascunhado antes de qualquer dado chegar. Se não consegue rascunhar, você ainda não sabe o que está procurando.",
          },
        },
      ],
    },
    {
      id: "interview",
      nav: { en: "Interview", pt: "Interview" },
      title: {
        en: "Interview: scripts that ask about the past",
        pt: "Interview: roteiros que perguntam sobre o passado",
      },
      blocks: [
        {
          type: "p",
          text: {
            en: "People are bad at predicting what they would do and reasonable at telling you what they did. So the scripts follow Teresa Torres' story-based interviewing: start from the last time something happened and walk forward in time.",
            pt: "As pessoas são ruins em prever o que fariam e razoáveis em contar o que fizeram. Por isso os roteiros seguem a entrevista baseada em histórias de Teresa Torres: comece pela última vez que algo aconteceu e avance no tempo.",
          },
        },
        {
          type: "code",
          label: { en: "Prompt", pt: "Prompt" },
          wrap: true,
          code: {
            en: "/ux-research Write the interview script for the admins who stalled.",
            pt: "/ux-research Escreva o roteiro de entrevista para os admins que travaram.",
          },
        },
        {
          type: "code",
          label: { en: "What comes back (excerpt)", pt: "O que volta (trecho)" },
          code: {
            en: `STORY (15-20 min)
"Think about the day you signed your team up. Walk me through what
happened from the beginning."
  "What happened first?"
  "Then what did you do?"
  "What were you thinking at that point?"

PROBES
  Pain point    -> "What did you do when that happened?"
  Workaround    -> "How did you figure out that approach?"
  Vague answer  -> "Can you give me a specific example?"`,
            pt: `HISTÓRIA (15-20 min)
"Pense no dia em que você cadastrou o seu time. Me conte o que
aconteceu desde o começo."
  "O que aconteceu primeiro?"
  "E depois, o que você fez?"
  "O que você estava pensando naquele momento?"

APROFUNDAMENTO
  Dor            -> "O que você fez quando isso aconteceu?"
  Gambiarra      -> "Como você chegou nesse jeito?"
  Resposta vaga  -> "Pode me dar um exemplo específico?"`,
          },
        },
        {
          type: "p",
          text: {
            en: "It also rewrites the questions that tend to sneak into scripts:",
            pt: "Ela também reescreve as perguntas que costumam escapar para dentro dos roteiros:",
          },
        },
        {
          type: "table",
          head: [
            { en: "Instead of", pt: "Em vez de" },
            { en: "It asks", pt: "Ela pergunta" },
          ],
          rows: [
            [
              { en: "\"Would you use a guided setup?\"", pt: "\"Você usaria uma configuração guiada?\"" },
              {
                en: "\"Tell me about the last time you set up a tool for your team.\"",
                pt: "\"Me conte da última vez que você configurou uma ferramenta para o seu time.\"",
              },
            ],
            [
              { en: "\"Why did you stop?\"", pt: "\"Por que você parou?\"" },
              { en: "\"What led you to stop there?\"", pt: "\"O que levou você a parar ali?\"" },
            ],
            [
              { en: "\"How often do you invite people?\"", pt: "\"Com que frequência você convida pessoas?\"" },
              { en: "\"When was the last time? And before that?\"", pt: "\"Quando foi a última vez? E antes dessa?\"" },
            ],
          ],
        },
        {
          type: "p",
          text: {
            en: "The same mode writes surveys (screening first, 10 minutes at most) and usability tests, where each task is a goal (\"book a meeting with two colleagues\") instead of a list of clicks.",
            pt: "O mesmo modo escreve questionários (triagem primeiro, 10 minutos no máximo) e testes de usabilidade, em que cada tarefa é um objetivo (\"marque uma reunião com dois colegas\") e não uma lista de cliques.",
          },
        },
      ],
    },
    {
      id: "synthesize",
      nav: { en: "Synthesize", pt: "Synthesize" },
      title: {
        en: "Synthesize: from facts to insights with Atomic Research",
        pt: "Synthesize: de fatos a insights com Atomic Research",
      },
      blocks: [
        {
          type: "p",
          text: {
            en: "This is the mode I use most. It sorts what you collected into Daniel Pidcock's four levels:",
            pt: "É o modo que eu mais uso. Ele organiza o que você coletou nos quatro níveis de Daniel Pidcock:",
          },
        },
        {
          type: "list",
          items: [
            {
              en: "**Experiment**: what you did. \"6 interviews and a funnel review, October.\"",
              pt: "**Experimento**: o que você fez. \"6 entrevistas e uma análise de funil, outubro.\"",
            },
            { en: "**Fact**: what you found, with no interpretation.", pt: "**Fato**: o que você encontrou, sem interpretação." },
            { en: "**Insight**: what a group of facts means.", pt: "**Insight**: o que um grupo de fatos significa." },
            { en: "**Recommendation**: what to do about it.", pt: "**Recomendação**: o que fazer a respeito." },
          ],
        },
        {
          type: "p",
          text: {
            en: "The rule that makes it work: no insight without facts behind it, and no recommendation without an insight. If the chain breaks, the recommendation is an opinion. Each insight also gets a confidence level. One fact from one source is LOW. Two or three from one source is MEDIUM. Three or more from different sources is HIGH.",
            pt: "A regra que faz funcionar: nenhum insight sem fatos por trás, e nenhuma recomendação sem um insight. Se a corrente quebra, a recomendação é opinião. Cada insight também recebe um nível de confiança. Um fato de uma fonte é BAIXA. Dois ou três da mesma fonte é MÉDIA. Três ou mais de fontes diferentes é ALTA.",
          },
        },
        {
          type: "code",
          label: { en: "What comes back (fictional data)", pt: "O que volta (dados fictícios)" },
          code: {
            en: `EXPERIMENT  6 interviews with admins who stalled
            + setup funnel review, Oct.

FACT 1  5 of 6 admins stopped at "Connect your calendar".
FACT 2  P4: "I didn't want to give it access to everyone's
        calendar before I knew it worked."
FACT 3  58% of new accounts never pass the calendar step
        (funnel).
FACT 4  3 of 6 came back only after a colleague said it
        was safe.

INSIGHT  Admins won't grant calendar access before they've
         seen the product work.
         Confidence: HIGH (4 facts, 2 sources)

RECOMMENDATION  Let admins book a test meeting with sample
                data before asking for calendar access.
                Expected: more accounts pass that step.
                Measure: completion rate of that step.`,
            pt: `EXPERIMENTO  6 entrevistas com admins que travaram
             + análise do funil de configuração, out.

FATO 1  5 de 6 admins pararam em "Conecte sua agenda".
FATO 2  P4: "Eu não queria dar acesso à agenda de todo mundo
        antes de saber se funcionava."
FATO 3  58% das contas novas nunca passam da etapa da agenda
        (funil).
FATO 4  3 de 6 só voltaram depois que um colega disse que
        era seguro.

INSIGHT  Admins não liberam acesso à agenda antes de ver o
         produto funcionando.
         Confiança: ALTA (4 fatos, 2 fontes)

RECOMENDAÇÃO  Deixar o admin marcar uma reunião de teste com
              dados de exemplo antes de pedir acesso à agenda.
              Esperado: mais contas passam dessa etapa.
              Medida: taxa de conclusão dessa etapa.`,
          },
        },
        {
          type: "p",
          text: {
            en: "Look at the recommendation. It is neither \"guided\" nor \"self-service\". The evidence moved the question, which is the point of doing research before choosing.",
            pt: "Repare na recomendação. Ela não é \"guiada\" nem \"self-service\". A evidência mudou a pergunta, e é para isso que se pesquisa antes de escolher.",
          },
        },
        {
          type: "p",
          text: {
            en: "The skill ends every synthesis with a note to go back to the raw data. The next section explains why.",
            pt: "A skill termina toda síntese com um lembrete de voltar aos dados brutos. A próxima seção explica por quê.",
          },
        },
      ],
    },
    {
      id: "specify",
      nav: { en: "Specify", pt: "Specify" },
      title: {
        en: "Specify: a design brief traceable to evidence",
        pt: "Specify: um brief de design rastreável até a evidência",
      },
      blocks: [
        {
          type: "p",
          text: {
            en: "When the insights are solid, this mode writes the brief for whoever designs next. In my setup that is the [ux-designer skill](/skills/ux-designer), but the brief works for a person too.",
            pt: "Quando os insights estão sólidos, este modo escreve o brief para quem desenha em seguida. No meu setup é a [skill ux-designer](/skills/ux-designer), mas o brief serve para uma pessoa também.",
          },
        },
        {
          type: "code",
          label: { en: "What comes back (excerpt)", pt: "O que volta (trecho)" },
          code: {
            en: `DESIGN BRIEF  Calendar permission in onboarding

DECISION   Guided setup vs. fixing self-service
           (reframed by research).

MUST HAVE
  1. A working test booking before any permission request
     Backed by: Insight 1 (facts 1, 2, 3, 4), HIGH

ASSUMPTION (LOW confidence, validate before building)
  2. Showing which calendar data we read will reduce drop-off
     Based on: 1 quote. Cheapest test: 5 usability sessions.

SUCCESS    Primary: calendar step completion.
           Guardrail: support tickets about permissions don't go up.`,
            pt: `BRIEF DE DESIGN  Permissão de agenda no onboarding

DECISÃO    Configuração guiada vs. consertar o self-service
           (reformulada pela pesquisa).

OBRIGATÓRIO
  1. Uma reunião de teste funcionando antes de pedir permissão
     Base: Insight 1 (fatos 1, 2, 3, 4), ALTA

PREMISSA (confiança BAIXA, validar antes de construir)
  2. Mostrar quais dados da agenda lemos vai reduzir o abandono
     Base: 1 citação. Teste mais barato: 5 sessões de usabilidade.

SUCESSO    Principal: conclusão da etapa da agenda.
           Proteção: tickets de suporte sobre permissão não sobem.`,
          },
        },
        {
          type: "p",
          text: {
            en: "Anything that can't be traced to a fact is labeled as an assumption, with the cheapest way to test it. A brief that hides its weak spots gets built anyway, and then the weak spot shows up in production.",
            pt: "Tudo o que não se rastreia até um fato vira premissa, com o jeito mais barato de testar. Um brief que esconde os pontos fracos é construído do mesmo jeito, e aí o ponto fraco aparece em produção.",
          },
        },
      ],
    },
    {
      id: "ai-limits",
      nav: { en: "Where AI fails", pt: "Onde a IA falha" },
      title: {
        en: "Where AI helps and where it fails in user research",
        pt: "Onde a IA ajuda e onde ela falha na pesquisa com usuários",
      },
      blocks: [
        {
          type: "p",
          text: {
            en: "AI is fast at structure: drafting a script, grouping hundreds of notes, checking that every recommendation has evidence behind it. It is not reliable at the step that matters most, which is reading what people meant.",
            pt: "A IA é rápida em estrutura: rascunhar um roteiro, agrupar centenas de anotações, conferir se cada recomendação tem evidência por trás. Ela não é confiável na etapa que mais importa, que é entender o que as pessoas quiseram dizer.",
          },
        },
        {
          type: "p",
          text: {
            en: "Nielsen Norman Group put it plainly in their guide to research with AI: the model \"might miss, misinterpret, or even manufacture insights\", and when coding transcripts \"it often misses large sections of the transcript where codes should be applied\" ([Moran and Rosala, NN/g](https://www.nngroup.com/articles/research-with-ai/)).",
            pt: "O Nielsen Norman Group foi direto no guia sobre pesquisa com IA: o modelo \"pode deixar passar, interpretar errado ou até fabricar insights\", e ao codificar transcrições \"muitas vezes ignora trechos grandes onde os códigos deveriam ser aplicados\" ([Moran e Rosala, NN/g](https://www.nngroup.com/articles/research-with-ai/), tradução minha).",
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
              en: "It structures and checks. It never treats its own reading of an interview as the final word.",
              pt: "Ela estrutura e confere. Nunca trata a própria leitura de uma entrevista como palavra final.",
            },
            {
              en: "Every synthesis ends with a flag to review the raw data.",
              pt: "Toda síntese termina com um aviso para revisar os dados brutos.",
            },
            {
              en: "It keeps verbatim quotes, because a paraphrase is already an interpretation.",
              pt: "Ela mantém as citações literais, porque uma paráfrase já é uma interpretação.",
            },
            {
              en: "It pushes back on research meant to confirm a decision already made. If the team has decided, it says so: skip the research and ship.",
              pt: "Ela questiona pesquisa feita para confirmar uma decisão já tomada. Se o time já decidiu, ela diz isso: pule a pesquisa e lance.",
            },
          ],
        },
        {
          type: "p",
          text: {
            en: "On sample size it holds the opposite line from most AI tools. It won't let a small decision wait for a big study. Five interviews are enough for a lot of decisions, and five usability sessions find most of the problems in a flow ([Nielsen, 2000](https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/)).",
            pt: "Sobre tamanho de amostra, ela vai na contramão da maioria das ferramentas de IA. Não deixa uma decisão pequena esperar por um estudo grande. Cinco entrevistas bastam para muitas decisões, e cinco sessões de usabilidade encontram a maior parte dos problemas de um fluxo ([Nielsen, 2000](https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/)).",
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
            en: "The method comes from people who published it first. The skill's job is to combine them so Claude applies all three in the same conversation.",
            pt: "O método vem de quem o publicou primeiro. O trabalho da skill é combinar os três para que o Claude aplique todos na mesma conversa.",
          },
        },
        {
          type: "list",
          items: [
            {
              en: "**Research planning**: Behzod Sirjani (Reforge). Decision first, splash zone, evidence mapping, the million dollar slide.",
              pt: "**Planejamento de pesquisa**: Behzod Sirjani (Reforge). Decisão primeiro, splash zone, mapa de evidências, o million dollar slide.",
            },
            {
              en: "**Atomic Research**: [Daniel Pidcock](https://blog.prototypr.io/what-is-atomic-research-e5d9fbc1285c). Experiment, fact, insight, recommendation.",
              pt: "**Atomic Research**: [Daniel Pidcock](https://blog.prototypr.io/what-is-atomic-research-e5d9fbc1285c). Experimento, fato, insight, recomendação.",
            },
            {
              en: "**Continuous Discovery**: [Teresa Torres](https://www.producttalk.org). Story-based interviewing and the opportunity solution tree.",
              pt: "**Continuous Discovery**: [Teresa Torres](https://www.producttalk.org). Entrevista baseada em histórias e a opportunity solution tree.",
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
    en: "Senior product designer and UX researcher. I ran research at Hotmart and Sympla, including an [automated research repository](/portfolio/hotmart-research-repository). Building an AI product? [Let's talk](/contact).",
    pt: "Product designer sênior e UX researcher. Conduzi pesquisa na Hotmart e na Sympla, incluindo um [repositório de pesquisa automatizado](/portfolio/hotmart-research-repository). Está construindo um produto de IA? [Vamos conversar](/contact).",
  },
  faq: [
    {
      q: { en: "What is a Claude Code skill?", pt: "O que é uma skill do Claude Code?" },
      a: {
        en: "A folder with instructions and reference files that Claude loads when your request matches what the skill covers. It changes how Claude works on that kind of task without you pasting a long prompt every time.",
        pt: "Uma pasta com instruções e arquivos de referência que o Claude carrega quando o seu pedido combina com o que a skill cobre. Ela muda como o Claude trabalha nesse tipo de tarefa sem você colar um prompt longo toda vez.",
      },
    },
    {
      q: {
        en: "Do I need Claude Code, or does it work on claude.ai?",
        pt: "Preciso do Claude Code ou funciona no claude.ai?",
      },
      a: {
        en: "Both. In Claude Code, install it with the command above. On claude.ai, zip the `ux-research` folder and upload it under Customize > Skills, with code execution on. It also works in other agents that support Agent Skills, such as Cursor and Codex.",
        pt: "Nos dois. No Claude Code, instale com o comando acima. No claude.ai, compacte a pasta `ux-research` em zip e envie em Customize > Skills, com a execução de código ligada. Também funciona em outros agentes compatíveis com Agent Skills, como Cursor e Codex.",
      },
    },
    {
      q: {
        en: "I've never done user research. Where do I start?",
        pt: "Nunca fiz pesquisa com usuários. Por onde começo?",
      },
      a: {
        en: "With the decision, not the method. Write down what your team will build or change depending on the answer. If you can't, type `/ux-research` with nothing after it: the skill asks questions until the decision is clear, then suggests the smallest study that can answer it, often five or six interviews.",
        pt: "Pela decisão, não pelo método. Escreva o que o seu time vai construir ou mudar dependendo da resposta. Se não conseguir, digite `/ux-research` sem nada depois: a skill faz perguntas até a decisão ficar clara e então sugere o menor estudo capaz de respondê-la, muitas vezes cinco ou seis entrevistas.",
      },
    },
    {
      q: { en: "Can AI replace a UX researcher?", pt: "A IA pode substituir um UX researcher?" },
      a: {
        en: "No. It can draft, organize and check, and it does those quickly. Deciding what a pattern means and what the team should do about it still needs a person who read the raw data. The skill is built to keep that step human.",
        pt: "Não. Ela rascunha, organiza e confere, e faz isso rápido. Decidir o que um padrão significa e o que o time deve fazer a respeito ainda exige uma pessoa que leu os dados brutos. A skill foi feita para manter essa etapa humana.",
      },
    },
    {
      q: {
        en: "Can I use Claude to synthesize user interviews?",
        pt: "Posso usar o Claude para sintetizar entrevistas com usuários?",
      },
      a: {
        en: "Yes, for structure. Paste your notes or transcripts and use Synthesize mode: it separates facts from interpretation, groups them into insights and scores each one. Then check the insights against the transcripts yourself, because AI can skip whole sections of a conversation.",
        pt: "Sim, para a estrutura. Cole as anotações ou transcrições e use o modo Synthesize: ele separa fato de interpretação, agrupa em insights e dá uma nota de confiança para cada um. Depois confira você mesmo os insights contra as transcrições, porque a IA pode pular trechos inteiros de uma conversa.",
      },
    },
    {
      q: { en: "What is atomic research?", pt: "O que é atomic research?" },
      a: {
        en: "A way to store research as small linked pieces instead of reports. Daniel Pidcock defined four levels: experiment, fact, insight and recommendation. A fact can support several insights, and new studies add facts to old insights, so knowledge builds up across projects.",
        pt: "Um jeito de guardar pesquisa em pedaços pequenos e ligados entre si, em vez de relatórios. Daniel Pidcock definiu quatro níveis: experimento, fato, insight e recomendação. Um fato pode sustentar vários insights, e estudos novos somam fatos a insights antigos, então o conhecimento se acumula entre projetos.",
      },
    },
    {
      q: {
        en: "What's the difference between a fact and an insight?",
        pt: "Qual a diferença entre fato e insight?",
      },
      a: {
        en: "A fact is what happened: \"5 of 6 admins stopped at the calendar step.\" An insight is what it means: \"admins won't grant access before they trust the product.\" If two people could read the same data and disagree, you've already moved from fact to insight.",
        pt: "Fato é o que aconteceu: \"5 de 6 admins pararam na etapa da agenda.\" Insight é o que isso significa: \"admins não liberam acesso antes de confiar no produto.\" Se duas pessoas podem ler os mesmos dados e discordar, você já passou do fato para o insight.",
      },
    },
    {
      q: { en: "How many users should I interview?", pt: "Quantos usuários devo entrevistar?" },
      a: {
        en: "It depends on the size of the decision. For a small decision, 3 to 5 interviews are usually enough. For a larger one, plan 5 to 8 per user segment. For usability testing, 5 participants find most of the problems in a flow.",
        pt: "Depende do tamanho da decisão. Para uma decisão pequena, 3 a 5 entrevistas costumam bastar. Para uma maior, planeje 5 a 8 por segmento de usuário. Em teste de usabilidade, 5 participantes encontram a maior parte dos problemas de um fluxo.",
      },
    },
    {
      q: { en: "What goes in a UX research plan?", pt: "O que entra num plano de pesquisa UX?" },
      a: {
        en: "The decision it informs, the product stage, the size of the decision, what you need to learn (must, should, nice to know), the method and participants, the output you expect, and what the research won't answer. Plan mode writes this as a research brief.",
        pt: "A decisão que ele informa, o estágio do produto, o tamanho da decisão, o que você precisa aprender (obrigatório, desejável, bom saber), o método e os participantes, o resultado esperado e o que a pesquisa não vai responder. O modo Plan escreve isso como um research brief.",
      },
    },
  ],
};
