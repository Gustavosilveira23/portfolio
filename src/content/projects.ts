export type Project = {
  slug: string;
  category: "product" | "research" | "design";
  coverImage: string;
  year: string;
  tags: string[];
  title: { pt: string; en: string };
  description: { pt: string; en: string };
  context: { pt: string; en: string };
  role: { pt: string; en: string };
  process: { pt: string; en: string };
  decisions: { pt: string; en: string };
  results: { pt: string; en: string };
  images: string[];
};

export const projects: Project[] = [
  {
    slug: "raio-x-creator",
    category: "product",
    coverImage: "/projects/raio-x-creator/home.png",
    year: "2025 - Presente",
    tags: ["Product Design", "UX Research", "Frontend", "AI"],
    title: {
      pt: "Raio X Creator",
      en: "Raio X Creator",
    },
    description: {
      pt: "Plataforma de inteligência de dados para criadores de conteúdo. Transforma sinais de performance em insights acionáveis.",
      en: "Data intelligence platform for content creators. Transforms performance signals into actionable insights.",
    },
    context: {
      pt: "Criadores de conteúdo enfrentam duas dores recorrentes: paralisia criativa (não saber o que postar) e a caixa preta do algoritmo (não entender por que posts flopam). O Raio X Creator nasceu para transformar dados complexos em decisões simples — um plano diário acionável.\n\nO produto analisa conteúdo, performance e audiência para entregar diagnósticos que separam o que é problema de conteúdo do que é problema de algoritmo.",
      en: "Content creators face two recurring pain points: creative paralysis (not knowing what to post) and the algorithm black box (not understanding why posts flop). Raio X Creator was born to transform complex data into simple decisions — a daily actionable plan.\n\nThe product analyzes content, performance, and audience to deliver diagnostics that separate content problems from algorithm problems.",
    },
    role: {
      pt: "Foundation team — responsável por toda a experiência do produto: pesquisa com usuários, design de interface, sistema de score e implementação frontend com Next.js + Tailwind CSS. Trabalho em equipe com 3 desenvolvedores.",
      en: "Foundation team — responsible for the entire product experience: user research, interface design, scoring system, and frontend implementation with Next.js + Tailwind CSS. Working in a team of 4.",
    },
    process: {
      pt: "Começamos com pesquisa: entrevistas com creators e análise de 220 perfis e 6.804 posts via parceria estratégica de dados. Identifiquei padrões de comportamento e dores reais.\n\nDesenvolvemos um scorecard que combina métricas quantitativas (atenção, interação) com análise qualitativa via IA (força do gancho, densidade de conteúdo, SEO do Instagram).\n\nPrototipei e iteramos em sprints de 2 semanas, validando hipóteses com usuários reais antes de implementar.",
      en: "We started with research: creator interviews and analysis of 220 profiles and 6,804 posts through a strategic data partnership. I identified behavioral patterns and real pain points.\n\nWe developed a scorecard combining quantitative metrics (attention, interaction) with AI qualitative analysis (hook strength, content density, Instagram SEO).\n\nI prototyped and iterated in 2-week sprints, validating hypotheses with real users before implementing.",
    },
    decisions: {
      pt: "1. **Promessa clara**: \"Descubra se o seu flop foi culpa do Algoritmo ou do seu Conteúdo\" — posiciona o produto de forma única no mercado.\n\n2. **Score híbrido**: combinação de dados quantitativos + análise de IA qualitativa, em vez de só dashboards de métricas.\n\n3. **Análise de comentários com IA**: extrair insights da audiência que o creator não consegue ver manualmente.\n\n4. **Linguagem cuidadosa**: evitar diagnósticos ofensivos ou certezas absolutas nos feedbacks.\n\n5. **Design System com Claude Code**: criei um Design System documentado com tokens, componentes e exemplos de código — feito para que qualquer builder do time consiga implementar interfaces consistentes usando Claude Code, sem depender de designer.",
      en: "1. **Clear promise**: \"Find out if your flop was the Algorithm's fault or your Content's\" — uniquely positions the product in the market.\n\n2. **Hybrid score**: combination of quantitative data + qualitative AI analysis, instead of just metric dashboards.\n\n3. **AI comment analysis**: extract audience insights that creators can't see manually.\n\n4. **Careful language**: avoid offensive diagnostics or absolute certainties in feedback.\n\n5. **Design System with Claude Code**: I built a documented Design System with tokens, components, and code examples — made so any builder on the team can implement consistent interfaces using Claude Code, without depending on a designer.",
    },
    results: {
      pt: "- Produto em fase de lançamento com usuários ativos pagantes\n- Base de dados de 220+ creators e 6.800+ posts analisados\n- Parceria estratégica de dados para distribuição e aquisição\n- Pipeline de aquisição orgânica via Instagram em andamento\n- Score que combina 6+ critérios quantitativos e qualitativos\n- Design System que permite builders implementarem UI consistente de forma autônoma",
      en: "- Product in launch phase with active paying users\n- Database of 220+ creators and 6,800+ analyzed posts\n- Strategic data partnership for distribution and acquisition\n- Organic acquisition pipeline via Instagram in progress\n- Score combining 6+ quantitative and qualitative criteria\n- Design System enabling builders to implement consistent UI autonomously",
    },
    images: [
      "/projects/raio-x-creator/home.png",
      "/projects/raio-x-creator/post-details.png",
      "/projects/raio-x-creator/design-system.png",
      "/projects/raio-x-creator/labs.png",
      "/projects/raio-x-creator/ds-component.png",
    ],
  },
  {
    slug: "duo-ai",
    category: "product",
    coverImage: "/projects/duo-ai.png",
    year: "2025 - Presente",
    tags: ["Product Design", "AI", "Conversational UI"],
    title: {
      pt: "Duo AI",
      en: "Duo AI",
    },
    description: {
      pt: "Plataforma de IA conversacional. Design de interface e experiencia para interacao com modelos de linguagem.",
      en: "Conversational AI platform. Interface and experience design for language model interaction.",
    },
    context: {
      pt: "O Duo AI e uma plataforma de IA conversacional que precisa oferecer uma experiencia fluida e intuitiva para usuarios interagirem com modelos de linguagem. O desafio e tornar a IA acessivel sem perder a profundidade das funcionalidades.",
      en: "Duo AI is a conversational AI platform that needs to offer a fluid and intuitive experience for users interacting with language models. The challenge is making AI accessible without losing the depth of features.",
    },
    role: {
      pt: "Responsavel pelo design de produto e experiencia do usuario. Defino a interface, fluxos de interacao e padroes de UX para conversacao com IA.",
      en: "Responsible for product design and user experience. I define the interface, interaction flows, and UX patterns for AI conversation.",
    },
    process: {
      pt: "Pesquisa de benchmarks em plataformas de IA existentes, definicao de padroes de interacao, prototipacao de fluxos conversacionais e testes de usabilidade.",
      en: "Benchmark research on existing AI platforms, definition of interaction patterns, prototyping conversational flows, and usability testing.",
    },
    decisions: {
      pt: "1. **Interface minimalista**: foco no conteudo da conversa, nao na interface.\n\n2. **Padroes de interacao claros**: o usuario sempre sabe o que a IA pode fazer.\n\n3. **Feedback visual**: estados de loading, typing e resposta bem definidos.",
      en: "1. **Minimalist interface**: focus on conversation content, not the interface.\n\n2. **Clear interaction patterns**: the user always knows what the AI can do.\n\n3. **Visual feedback**: well-defined loading, typing, and response states.",
    },
    results: {
      pt: "- Produto funcional com usuarios ativos\n- Interface conversacional intuitiva\n- Integracao com multiplos modelos de linguagem",
      en: "- Functional product with active users\n- Intuitive conversational interface\n- Integration with multiple language models",
    },
    images: [],
  },
  {
    slug: "hotmart-research-repository",
    category: "research",
    coverImage: "/projects/repositorio-pesquisa-automatizado/repositorio.png",
    year: "2023 - 2024",
    tags: ["UX Research", "Data Viz", "Automation", "Looker"],
    title: {
      pt: "Repositório de Pesquisa Automatizado",
      en: "Automated Research Repository",
    },
    description: {
      pt: "Sistema centralizado de feedback (CSAT, NPS, tickets) com dashboard dinâmico que se tornou input chave para backlog e priorização.",
      en: "Centralized feedback system (CSAT, NPS, tickets) with dynamic dashboard that became key input for backlog and prioritization.",
    },
    context: {
      pt: "Na Hotmart, dados de satisfação do usuário estavam espalhados em múltiplas fontes (CSAT, NPS, tickets de suporte) sem uma visão consolidada. Isso dificultava a priorização do backlog baseada em evidência.\n\nO desafio era criar um sistema que centralizasse, categorizasse e visualizasse esses dados de forma automática.",
      en: "At Hotmart, user satisfaction data was scattered across multiple sources (CSAT, NPS, support tickets) without a consolidated view. This made evidence-based backlog prioritization difficult.\n\nThe challenge was creating a system that would centralize, categorize, and visualize this data automatically.",
    },
    role: {
      pt: "UX Researcher responsável pela concepção, estruturação e implementação do repositório. Trabalhei de forma transversal com PMs, analistas de dados e engenheiros.",
      en: "UX Researcher responsible for the conception, structuring, and implementation of the repository. I worked cross-functionally with PMs, data analysts, and engineers.",
    },
    process: {
      pt: "Mapeei todas as fontes de dados existentes, defini taxonomia para categorização automática, criei dashboards no Looker Studio e automatizei a coleta de dados.\n\nTestei a usabilidade do dashboard com PMs para garantir que era útil na prática, não só visualmente bonito.",
      en: "I mapped all existing data sources, defined taxonomy for automatic categorization, created dashboards in Looker Studio, and automated data collection.\n\nI tested the dashboard usability with PMs to ensure it was practically useful, not just visually appealing.",
    },
    decisions: {
      pt: "1. **Categorização automática**: tags e categorias aplicadas automaticamente, reduzindo trabalho manual.\n\n2. **Dashboard como ferramenta de priorização**: não só visualização, mas input direto para decisões de backlog.\n\n3. **Visualizações no Looker**: escolha por acessibilidade e integração com stack existente.",
      en: "1. **Automatic categorization**: tags and categories applied automatically, reducing manual work.\n\n2. **Dashboard as prioritization tool**: not just visualization, but direct input for backlog decisions.\n\n3. **Looker visualizations**: chosen for accessibility and integration with existing stack.",
    },
    results: {
      pt: "- Dashboard se tornou input chave para priorização de backlog do time de produto\n- Dados de CSAT, NPS e tickets consolidados em uma única fonte\n- Redução significativa de tempo gasto em análise manual de feedback\n- Adoção por múltiplos times dentro da empresa",
      en: "- Dashboard became key input for product team backlog prioritization\n- CSAT, NPS, and ticket data consolidated in a single source\n- Significant reduction in time spent on manual feedback analysis\n- Adoption by multiple teams within the company",
    },
    images: [
      "/projects/repositorio-pesquisa-automatizado/repositorio.png",
      "/projects/repositorio-pesquisa-automatizado/processo.png",
    ],
  },
  {
    slug: "softruck-redesign",
    category: "design",
    coverImage: "/projects/softruck/soft-4-home.png",
    year: "2022",
    tags: ["UX/UI Design", "Mobile", "Design System", "Usability Testing"],
    title: {
      pt: "Softruck — Redesign do App de Rastreamento",
      en: "Softruck — Vehicle Tracking App Redesign",
    },
    description: {
      pt: "Redesign completo do app mobile de rastreamento de veículos. Melhorias em usabilidade, design visual e feature set.",
      en: "Complete redesign of the vehicle tracking mobile app. Improvements in usability, visual design, and feature set.",
    },
    context: {
      pt: "O app da Softruck tinha problemas de usabilidade identificados por reclamações de usuários. A interface era datada, fluxos eram confusos e a percepção de valor do produto estava comprometida.",
      en: "Softruck's app had usability issues identified through user complaints. The interface was dated, flows were confusing, and the product's perceived value was compromised.",
    },
    role: {
      pt: "Product Designer responsável por todo o redesign: auditoria heurística, pesquisa comportamental, prototipação e testes de usabilidade.",
      en: "Product Designer responsible for the entire redesign: heuristic audit, behavioral research, prototyping, and usability testing.",
    },
    process: {
      pt: "Comecei com auditoria heurística para mapear problemas sistemáticos. Depois, análise comportamental para entender como usuários reais usavam o app. Criei novos fluxos, design system e protótipos que foram testados com usuários reais.",
      en: "Started with a heuristic audit to map systematic problems. Then, behavioral analysis to understand how real users used the app. Created new flows, design system, and prototypes tested with real users.",
    },
    decisions: {
      pt: "1. **Novo design system**: componentes consistentes que facilitam desenvolvimento e manutenção.\n\n2. **Hierarquia de informação**: reorganização das telas priorizando as ações mais frequentes.\n\n3. **Mobile-first**: todo o redesign pensado para a experiência em campo, onde motoristas usam o app.",
      en: "1. **New design system**: consistent components that facilitate development and maintenance.\n\n2. **Information hierarchy**: screen reorganization prioritizing the most frequent actions.\n\n3. **Mobile-first**: entire redesign thought for field experience, where drivers use the app.",
    },
    results: {
      pt: "- Melhoria significativa na clareza e valor percebido do app\n- Design system implementado com componentes reutilizáveis\n- Protótipos validados com usuários reais antes da implementação\n- Feedback positivo dos usuários sobre a nova experiência",
      en: "- Significant improvement in app clarity and perceived value\n- Design system implemented with reusable components\n- Prototypes validated with real users before implementation\n- Positive user feedback on the new experience",
    },
    images: [
      "/projects/softruck/soft-4-home.png",
      "/projects/softruck/soft-5-map.png",
      "/projects/softruck/soft-dados.png",
      "/projects/softruck/soft-3-style.png",
      "/projects/softruck/soft-7-map.png",
    ],
  },
  {
    slug: "hotmart-design-sprint",
    category: "design",
    coverImage: "/projects/hotmart-design-sprint/sprint2.png",
    year: "2023",
    tags: ["Design Sprint", "Facilitation", "Prototyping", "Validation"],
    title: {
      pt: "Design Sprint — Personalização na Hotmart",
      en: "Design Sprint — Hotmart Personalization",
    },
    description: {
      pt: "Sprint de 4 dias para resolver dor de personalização. Protótipo validado na semana, lançado em 1 mês.",
      en: "4-day sprint to solve a personalization pain point. Prototype validated within the week, launched in 1 month.",
    },
    context: {
      pt: "Usuários da Hotmart estavam insatisfeitos com a falta de personalização na experiência. O churn estava sendo impactado por essa dor. Precisávamos de uma solução rápida e validada.",
      en: "Hotmart users were dissatisfied with the lack of personalization in the experience. Churn was being impacted by this pain point. We needed a fast and validated solution.",
    },
    role: {
      pt: "Facilitador do Design Sprint. Coordenei PMs, Product Designers e Desenvolvedores ao longo de 4 dias de trabalho intensivo.",
      en: "Design Sprint Facilitator. I coordinated PMs, Product Designers, and Developers throughout 4 days of intensive work.",
    },
    process: {
      pt: "Segui o framework de Design Sprint adaptado: mapeamento do problema, ideação, decisão, prototipação e teste com usuários — tudo em 4 dias.\n\nNo dia 1, alinhamos o problema e mapeamos a jornada. Dias 2-3 foram de ideação e prototipação. Dia 4, testamos com 5 usuários reais.",
      en: "Followed an adapted Design Sprint framework: problem mapping, ideation, decision, prototyping, and user testing — all in 4 days.\n\nDay 1, we aligned on the problem and mapped the journey. Days 2-3 were ideation and prototyping. Day 4, we tested with 5 real users.",
    },
    decisions: {
      pt: "1. **Formato compacto**: 4 dias em vez de 5, sem perder profundidade.\n\n2. **Protótipo de alta fidelidade**: permite testar a experiência real, não só o conceito.\n\n3. **Validação antes de dev**: garantir que a solução resolve o problema antes de investir em código.",
      en: "1. **Compact format**: 4 days instead of 5, without losing depth.\n\n2. **High-fidelity prototype**: allows testing the real experience, not just the concept.\n\n3. **Validation before dev**: ensure the solution solves the problem before investing in code.",
    },
    results: {
      pt: "- Protótipo validado com usuários em menos de 1 semana\n- Feature lançada em produção em 1 mês\n- Redução de churn na área impactada\n- Aumento de satisfação dos usuários com personalização",
      en: "- Prototype validated with users in less than 1 week\n- Feature launched in production in 1 month\n- Churn reduction in the impacted area\n- Increased user satisfaction with personalization",
    },
    images: [
      "/projects/hotmart-design-sprint/sprint2.png",
      "/projects/hotmart-design-sprint/sprint.png",
      "/projects/hotmart-design-sprint/image.png",
      "/projects/hotmart-design-sprint/sprint3.png",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(
  category: Project["category"] | "all"
): Project[] {
  if (category === "all") return projects;
  return projects.filter((p) => p.category === category);
}
