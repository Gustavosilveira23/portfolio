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
    slug: "duo-ai",
    category: "product",
    coverImage: "/projects/duo-ai/duo-ai-admin.png",
    year: "2025 – Present",
    tags: ["Product Design", "AI", "Conversational UX"],
    title: {
      pt: "Duo AI",
      en: "Duo AI",
    },
    description: {
      pt: "Plataforma onde qualquer pessoa cria assistentes de IA personalizados. Projetei o Studio — a ferramenta de criação — e a experiência de chat do usuário final.",
      en: "Platform where anyone can create custom AI assistants. I designed the Studio — the creation tool — and the end-user chat experience.",
    },
    context: {
      pt: "O Duo AI é uma plataforma de IA conversacional com dois lados: o Studio, onde criadores constroem assistentes personalizados (escolhendo modelo, instruções, base de conhecimento, ferramentas), e o chat, onde usuários finais interagem com esses assistentes.\n\nO desafio central: configurar um assistente de IA envolve dezenas de decisões técnicas (modelo, temperatura, ferramentas, knowledge base). Como tornar isso acessível para alguém que nunca escreveu um prompt — sem limitar power users que querem controle total?",
      en: "Duo AI is a conversational AI platform with two sides: the Studio, where creators build custom assistants (choosing model, instructions, knowledge base, tools), and the chat, where end-users interact with those assistants.\n\nThe core challenge: configuring an AI assistant involves dozens of technical decisions (model, temperature, tools, knowledge base). How do you make that accessible to someone who's never written a prompt — without limiting power users who want full control?",
    },
    role: {
      pt: "Founding designer responsável pelo produto end-to-end. Projetei a arquitetura do Studio (painel de criação, onboarding conversacional, preview em tempo real), a experiência de chat, e os padrões de interação entre criador e usuário final.",
      en: "Founding designer responsible for the product end-to-end. I designed the Studio architecture (creation panel, conversational onboarding, real-time preview), the chat experience, and the interaction patterns between creator and end-user.",
    },
    process: {
      pt: "Comecei com benchmarking de plataformas existentes — ChatGPT, Claude, Perplexity, Gemini, Custom GPTs — mapeando como cada uma resolve a criação de assistentes e onde estavam as lacunas.\n\nA partir disso, separei o produto em dois fluxos distintos: o fluxo do criador (Studio) e o fluxo do usuário final (chat). Cada um tem necessidades e modelos mentais completamente diferentes.\n\nPara o Studio, projetei um onboarding conversacional — em vez de um formulário com 15 campos, o próprio assistente guia o criador pelas configurações através de uma conversa. O criador \"conversa\" com seu assistente para configurá-lo.\n\nPrototipei e testei com usuários que iam de técnicos (devs que já usam APIs) a não-técnicos (consultores que querem um assistente para atender clientes).",
      en: "I started by benchmarking existing platforms — ChatGPT, Claude, Perplexity, Gemini, Custom GPTs — mapping how each handles assistant creation and where the gaps were.\n\nFrom there, I separated the product into two distinct flows: the creator flow (Studio) and the end-user flow (chat). Each has completely different needs and mental models.\n\nFor the Studio, I designed a conversational onboarding — instead of a form with 15 fields, the assistant itself guides the creator through configuration via a conversation. The creator \"talks\" to their assistant to set it up.\n\nI prototyped and tested with users ranging from technical (devs already using APIs) to non-technical (consultants who want an assistant to serve their clients).",
    },
    decisions: {
      pt: "1. **Onboarding conversacional no Studio**: em vez de um formulário tradicional, o criador configura seu assistente conversando com ele. Isso reduz a intimidação de campos técnicos e permite que o assistente sugira configurações baseado no contexto que o criador descreve.\n\n2. **Preview em tempo real**: enquanto o criador ajusta instruções, modelo ou knowledge base, um painel ao lado mostra exatamente como o assistente vai se comportar. Sem \"salvar e testar\" — o feedback é imediato.\n\n3. **Dois produtos em um, dois modelos mentais**: o criador pensa em configuração, controle, personalização. O usuário final pensa em conversa, resposta, utilidade. A interface do Studio não pode \"vazar\" para o chat — cada lado precisa ser simples no seu próprio contexto.\n\n4. **Progressive disclosure no painel de configuração**: o Copilot Panel mostra o essencial (nome, instrução, modelo) primeiro. Ferramentas avançadas (power-ups, rooms, API keys) aparecem conforme o criador precisa — sem esconder, sem sobrecarregar.",
      en: "1. **Conversational onboarding in Studio**: instead of a traditional form, the creator configures their assistant by talking to it. This reduces the intimidation of technical fields and lets the assistant suggest settings based on the context the creator describes.\n\n2. **Real-time preview**: as the creator adjusts instructions, model, or knowledge base, a side panel shows exactly how the assistant will behave. No \"save and test\" — feedback is immediate.\n\n3. **Two products in one, two mental models**: the creator thinks about configuration, control, customization. The end-user thinks about conversation, answers, utility. The Studio interface can't \"leak\" into the chat — each side needs to be simple in its own context.\n\n4. **Progressive disclosure in the configuration panel**: the Copilot Panel shows the essentials (name, instruction, model) first. Advanced tools (power-ups, rooms, API keys) surface as the creator needs them — without hiding, without overwhelming.",
    },
    results: {
      pt: "- Produto funcional com usuários ativos criando e usando assistentes\n- Studio com onboarding conversacional que reduz barreira de entrada para criadores não-técnicos\n- Preview em tempo real que acelera o ciclo de iteração do criador\n- Integração multi-modelo com camada de UX consistente\n- Arquitetura de interface que separa cleanly o lado criador do lado usuário final",
      en: "- Functional product with active users creating and using assistants\n- Studio with conversational onboarding that lowers the barrier for non-technical creators\n- Real-time preview that speeds up the creator's iteration cycle\n- Multi-model integration with consistent UX layer\n- Interface architecture that cleanly separates the creator side from the end-user side",
    },
    images: [
      "/projects/duo-ai/duo-ai-admin.png",
      "/projects/duo-ai/Studio1.mp4",
      "/projects/duo-ai/Studio2.mp4",
    ],
  },
  {
    slug: "raio-x-creator",
    category: "product",
    coverImage: "/projects/raio-x-creator/home.png",
    year: "2025 – Present",
    tags: ["Product Design", "UX Research", "AI", "Frontend"],
    title: {
      pt: "Raio X Creator",
      en: "Raio X Creator",
    },
    description: {
      pt: "Plataforma de analytics com IA para criadores de conteúdo. Transforma sinais de performance em insights acionáveis que separam problemas de conteúdo de problemas de algoritmo.",
      en: "AI-powered analytics platform for content creators. Turns performance signals into actionable insights that separate content problems from algorithm problems.",
    },
    context: {
      pt: "Criadores de conteúdo enfrentam duas dores recorrentes: paralisia criativa (não saber o que postar) e a caixa preta do algoritmo (não entender por que posts flopam). O Raio X Creator nasceu para transformar dados complexos em decisões simples — um plano diário acionável.\n\nO produto analisa conteúdo, performance e audiência para entregar diagnósticos que separam o que é problema de conteúdo do que é problema de algoritmo.",
      en: "Content creators face two recurring pain points: creative paralysis (not knowing what to post) and the algorithm black box (not understanding why posts flop). Raio X Creator was built to turn complex data into simple decisions — a daily actionable plan.\n\nThe product analyzes content, performance, and audience to deliver diagnostics that separate content problems from algorithm problems.",
    },
    role: {
      pt: "Founding designer num time de 4. Responsável por toda a experiência do produto: pesquisa com usuários, design de interface, arquitetura do sistema de score e implementação frontend com Next.js + Tailwind CSS.",
      en: "Founding designer on a team of 4. Responsible for the entire product experience: user research, interface design, scoring system architecture, and frontend implementation with Next.js + Tailwind CSS.",
    },
    process: {
      pt: "Começamos com pesquisa: entrevistas com creators e análise de 220 perfis e 6.800+ posts via parceria estratégica de dados. Identifiquei padrões de comportamento e dores reais que moldaram toda a direção do produto.\n\nDesenvolvemos um scorecard híbrido combinando métricas quantitativas (atenção, taxas de interação) com análise qualitativa via IA (força do gancho, densidade de conteúdo, SEO do Instagram).\n\nPrototipei e iteramos em sprints de 2 semanas, validando hipóteses com usuários reais antes de implementar.",
      en: "We started with research: interviews with creators and analysis of 220 profiles and 6,800+ posts through a strategic data partnership. I identified behavioral patterns and real pain points that shaped the entire product direction.\n\nWe developed a hybrid scorecard combining quantitative metrics (attention, interaction rates) with qualitative AI analysis (hook strength, content density, Instagram SEO).\n\nI prototyped and iterated in 2-week sprints, validating hypotheses with real users before moving to implementation.",
    },
    decisions: {
      pt: "1. **Proposta de valor clara**: \"Descubra se o seu flop foi culpa do Algoritmo ou do seu Conteúdo\" — posiciona o produto de forma única num mercado lotado de analytics.\n\n2. **Score híbrido**: combinação de dados quantitativos + análise qualitativa via IA, em vez de mais um dashboard de métricas. Isso dá contexto aos creators, não só números.\n\n3. **Análise de comentários com IA**: extrair sentimento e insights comportamentais da audiência — sinais que creators não conseguem processar manualmente em escala.\n\n4. **Linguagem cuidadosa nos diagnósticos**: evitar rótulos ofensivos ou certezas absolutas no feedback. Creators são emocionalmente investidos no conteúdo — o produto precisa ser honesto sem ser duro.\n\n5. **Design System feito para builders**: sistema documentado com tokens, componentes e exemplos de código — feito para que qualquer dev do time implemente interfaces consistentes usando Claude Code, sem depender de designer.",
      en: "1. **Clear value proposition**: \"Find out if your flop was the Algorithm's fault or your Content's\" — positions the product uniquely in a crowded analytics market.\n\n2. **Hybrid scoring system**: combining quantitative data with qualitative AI analysis, instead of building yet another metrics dashboard. This gives creators context, not just numbers.\n\n3. **AI-powered comment analysis**: extracting audience sentiment and behavioral insights from comments — signals creators can't process manually at scale.\n\n4. **Careful diagnostic language**: avoiding offensive labels or absolute certainties in feedback. Creators are emotionally invested in their content — the product needs to be honest without being harsh.\n\n5. **Design System built for builders**: a documented design system with tokens, components, and code examples — built so any developer on the team can implement consistent interfaces using Claude Code, without depending on a designer for every screen.",
    },
    results: {
      pt: "- Produto em fase de lançamento com usuários ativos pagantes\n- 220+ perfis de creators e 6.800+ posts analisados via parceria estratégica de dados\n- Sistema de score híbrido combinando 6+ critérios quantitativos e qualitativos\n- Design System que permite builders implementarem UI consistente de forma autônoma\n- Pipeline de aquisição orgânica via Instagram em andamento",
      en: "- Product in launch phase with paying active users\n- 220+ creator profiles and 6,800+ posts analyzed through strategic data partnership\n- Hybrid scoring system combining 6+ quantitative and qualitative criteria\n- Design system enabling autonomous UI implementation by builders\n- Organic acquisition pipeline via Instagram in progress",
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
    slug: "hotmart-design-sprint",
    category: "design",
    coverImage: "/projects/hotmart-design-sprint/sprint2.png",
    year: "2023",
    tags: ["Design Sprint", "Facilitation", "Prototyping", "Validation"],
    title: {
      pt: "Design Sprint — Personalização na Hotmart",
      en: "Design Sprint — Personalization at Hotmart",
    },
    description: {
      pt: "Sprint de 4 dias para resolver dor de personalização. Protótipo validado na semana, lançado em produção em 1 mês.",
      en: "4-day sprint to solve a personalization pain point. Prototype validated within the week, shipped to production in 1 month.",
    },
    context: {
      pt: "Usuários da Hotmart estavam insatisfeitos com a falta de personalização na experiência. O churn estava sendo diretamente impactado por essa dor, e o time de produto precisava de uma solução rápida e validada — não de uma iniciativa de um trimestre.",
      en: "Hotmart users were dissatisfied with the lack of personalization in their experience. Churn was being directly impacted by this pain point, and the product team needed a fast, validated solution — not a quarter-long initiative.",
    },
    role: {
      pt: "Facilitador do Design Sprint. Coordenei Product Managers, Product Designers e Engenheiros ao longo de 4 dias de trabalho intensivo e estruturado.",
      en: "Design Sprint facilitator. I coordinated Product Managers, Product Designers, and Engineers across 4 days of intensive, structured work.",
    },
    process: {
      pt: "Segui um framework de Design Sprint adaptado: mapeamento do problema, ideação, tomada de decisão, prototipação e teste com usuários — tudo comprimido em 4 dias.\n\nDia 1: Alinhamento do problema, entrevistas com stakeholders e mapeamento da jornada. Identificamos os momentos exatos onde a falta de personalização causava drop-off.\n\nDias 2–3: Ideação estruturada, sketching de soluções e prototipação em alta fidelidade. Fomos direto pra hi-fi porque o time precisava testar a experiência real, não só um conceito.\n\nDia 4: Teste do protótipo com 5 usuários reais. Capturamos feedback de usabilidade e resposta emocional à experiência personalizada.",
      en: "I followed an adapted Design Sprint framework: problem mapping, ideation, decision-making, prototyping, and user testing — all compressed into 4 days.\n\nDay 1: Problem alignment, stakeholder interviews, and user journey mapping. We identified the exact moments where lack of personalization was causing drop-off.\n\nDays 2–3: Structured ideation, solution sketching, and high-fidelity prototyping. We went straight to hi-fi because the team needed to test the real experience, not just a concept.\n\nDay 4: Testing the prototype with 5 real users. We captured both usability feedback and emotional response to the personalized experience.",
    },
    decisions: {
      pt: "1. **Formato compacto de 4 dias**: cortamos o sprint padrão de 5 dias para 4 sem perder profundidade. A restrição forçou priorização mais afiada e decisões mais rápidas.\n\n2. **Protótipo de alta fidelidade desde o início**: pulamos low-fi e fomos direto pra protótipo realista. Isso permitiu testar a experiência real que os usuários teriam — não uma abstração.\n\n3. **Validação antes de uma linha de código**: o objetivo era reduzir risco. Provamos que a solução funcionava com usuários reais antes do time de engenharia investir qualquer tempo de desenvolvimento.",
      en: "1. **Compact 4-day format**: cut the standard 5-day sprint to 4 days without losing depth. The constraint forced sharper prioritization and faster decisions.\n\n2. **High-fidelity prototype from day one**: skipped low-fi and went straight to a realistic prototype. This let us test the actual experience users would have — not an abstraction of it.\n\n3. **Validation before a single line of code**: the entire point was to de-risk. We proved the solution worked with real users before the engineering team invested any development time.",
    },
    results: {
      pt: "- Protótipo validado com usuários reais em menos de 1 semana\n- Feature lançada em produção em 1 mês\n- Redução mensurável de churn na área impactada\n- Aumento nos scores de satisfação dos usuários com personalização",
      en: "- Prototype validated with real users in under 1 week\n- Feature shipped to production in 1 month\n- Measurable reduction in churn for the impacted area\n- Increased user satisfaction scores for personalization",
    },
    images: [
      "/projects/hotmart-design-sprint/sprint2.png",
      "/projects/hotmart-design-sprint/sprint.png",
      "/projects/hotmart-design-sprint/image.png",
      "/projects/hotmart-design-sprint/sprint3.png",
    ],
  },
  {
    slug: "hotmart-research-repository",
    category: "research",
    coverImage: "/projects/repositorio-pesquisa-automatizado/repositorio.png",
    year: "2023 – 2024",
    tags: ["UX Research", "Data Visualization", "Research Ops"],
    title: {
      pt: "Repositório de Pesquisa Automatizado",
      en: "Automated Research Repository",
    },
    description: {
      pt: "Sistema centralizado de feedback (CSAT, NPS, tickets) com dashboards dinâmicos. Se tornou o input primário para priorização de backlog dos times de produto.",
      en: "Centralized feedback system (CSAT, NPS, support tickets) with dynamic dashboards. Became the primary input for backlog prioritization across product teams.",
    },
    context: {
      pt: "Na Hotmart — plataforma líder na economia de criadores com 30M+ usuários — dados de satisfação estavam espalhados em múltiplas fontes desconectadas: pesquisas CSAT, scores NPS e tickets de suporte. Não havia visão consolidada, o que tornava priorização baseada em evidência quase impossível.\n\nTimes de produto tomavam decisões por gut feeling ou por quem falava mais alto na sala. O desafio: construir um sistema que centraliza, categoriza e visualiza todo esse feedback automaticamente — e que realmente seja usado.",
      en: "At Hotmart — a leading creator economy platform serving 30M+ users — user satisfaction data was scattered across multiple disconnected sources: CSAT surveys, NPS scores, and support tickets. There was no consolidated view, which made evidence-based backlog prioritization nearly impossible.\n\nProduct teams were making decisions based on gut feeling or whoever spoke loudest in the room. The challenge: build a system that centralizes, categorizes, and visualizes all this feedback automatically — and actually gets used.",
    },
    role: {
      pt: "UX Researcher responsável por conceber, estruturar e implementar o repositório inteiro do zero. Trabalhei de forma transversal com Product Managers, analistas de dados e engenheiros para construir algo na interseção de pesquisa, dados e estratégia de produto.",
      en: "UX Researcher responsible for conceiving, structuring, and implementing the entire repository from scratch. I worked cross-functionally with Product Managers, data analysts, and engineers to build something that lived at the intersection of research, data, and product strategy.",
    },
    process: {
      pt: "Comecei mapeando cada fonte de dados existente — pesquisas, ferramentas de NPS, sistemas de tickets — e entendendo como (ou se) os times estavam usando.\n\nDepois defini uma taxonomia para categorização automática: tags, temas e níveis de severidade que podiam ser aplicados sem esforço manual. Essa foi a parte mais difícil — as categorias tinham que ser específicas o suficiente para serem úteis, mas amplas o suficiente para escalar.\n\nConstruí dashboards interativos no Looker Studio, escolhendo pela acessibilidade e integração com o stack existente. A restrição-chave: PMs tinham que conseguir usar sem treinamento.\n\nTestei a usabilidade do dashboard diretamente com PMs — observando como navegavam, o que confundia, o que ignoravam. Várias iterações vieram de assistir pessoas tentando encontrar respostas e falhando.",
      en: "I started by mapping every existing data source — surveys, NPS tools, support ticket systems — and understanding how (or if) teams were using them.\n\nThen I defined a taxonomy for automatic categorization: tags, themes, and severity levels that could be applied without manual effort. This was the hardest part — the categories had to be specific enough to be useful but broad enough to scale.\n\nI built interactive dashboards in Looker Studio, choosing it for accessibility and integration with the existing tech stack. The key constraint: PMs had to be able to use it without training.\n\nI tested dashboard usability directly with PMs — observing how they navigated, what confused them, what they ignored. Several iterations came from watching people try to find answers and fail.",
    },
    decisions: {
      pt: "1. **Categorização automática em vez de tagging manual**: tags e categorias aplicadas automaticamente baseadas em padrões de palavras-chave e metadados da fonte. Isso removeu o gargalo de alguém ter que classificar manualmente cada feedback.\n\n2. **Dashboard como ferramenta de priorização, não só relatório**: o dashboard não foi desenhado pra ficar bonito em reunião de review. Foi desenhado pra ser o primeiro lugar onde PMs vão quando decidem o que construir. Isso significou filtros por impacto, recência e volume — não só gráficos de pizza.\n\n3. **Looker Studio por acessibilidade**: escolhi Looker em vez de soluções custom porque cada PM já tinha acesso e sabia o básico. Adoção > sofisticação.",
      en: "1. **Automatic categorization over manual tagging**: tags and categories applied automatically based on keyword patterns and source metadata. This removed the bottleneck of someone having to manually classify every piece of feedback.\n\n2. **Dashboard as a prioritization tool, not just a report**: the dashboard wasn't designed to look good in a review meeting. It was designed to be the first place PMs go when deciding what to build next. That meant filtering by impact, recency, and volume — not just showing pie charts.\n\n3. **Looker Studio for accessibility**: chose Looker over custom-built solutions because every PM already had access and knew the basics. Adoption > sophistication.",
    },
    results: {
      pt: "- Dashboard se tornou o input primário para priorização de backlog do produto\n- Dados de CSAT, NPS e tickets consolidados em uma única fonte da verdade\n- Redução significativa no tempo gasto em análise manual de feedback\n- Adotado por múltiplos times de produto na organização\n- Mudou a cultura do time em direção a decisões baseadas em evidência",
      en: "- Dashboard became the primary input for product backlog prioritization\n- CSAT, NPS, and support ticket data consolidated into a single source of truth\n- Significant reduction in time spent on manual feedback analysis\n- Adopted by multiple product teams across the organization\n- Shifted team culture toward evidence-based decision making",
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
    tags: ["Product Design", "Mobile", "Prototyping", "Usability Testing"],
    title: {
      pt: "Softruck — Redesign do App de Rastreamento",
      en: "Softruck — Tracking App Redesign",
    },
    description: {
      pt: "Redesign completo do app mobile de rastreamento veicular. Melhorias em usabilidade, design visual e feature set expandido.",
      en: "Complete redesign of a vehicle tracking mobile app. Usability improvements, visual overhaul, and expanded feature set.",
    },
    context: {
      pt: "O app mobile de rastreamento veicular da Softruck cresceu organicamente ao longo dos anos, acumulando dívida de UX e uma interface que confundia mais do que ajudava. Gestores de frota e motoristas precisavam rastrear veículos, revisar rotas e gerenciar alertas — mas o app tornava tarefas simples desnecessariamente complexas.\n\nO desafio: um redesign completo que melhorasse usabilidade, modernizasse a linguagem visual e expandisse o feature set — sem quebrar workflows que usuários existentes dependiam.",
      en: "Softruck's vehicle tracking mobile app had grown organically over years, accumulating UX debt and an interface that confused more than it helped. Fleet managers and drivers needed to track vehicles, review routes, and manage alerts — but the existing app made simple tasks unnecessarily complex.\n\nThe challenge: a complete redesign that improved usability, modernized the visual language, and expanded the feature set — without breaking workflows that existing users depended on.",
    },
    role: {
      pt: "UX/UI Designer responsável pelo redesign completo: pesquisa com usuários, arquitetura de informação, design visual, prototipação e testes de usabilidade.",
      en: "UX/UI Designer responsible for the full redesign: user research, information architecture, visual design, prototyping, and usability testing.",
    },
    process: {
      pt: "Comecei com pesquisa — entrevistando gestores de frota e motoristas para entender seus workflows diários, dores e o que \"bom o suficiente\" significava pra eles (spoiler: a barra era baixa, o que significava que pequenas melhorias tinham impacto desproporcional).\n\nReestruturei a arquitetura de informação baseada na frequência de tarefas: as coisas que usuários fazem 10x/dia devem estar a 1 toque de distância, não enterradas em menus.\n\nDesenhei um novo sistema visual que priorizava legibilidade em condições outdoor/veiculares — alto contraste, touch targets maiores, visualização de dados simplificada.\n\nPrototipei fluxos-chave e rodei testes de usabilidade com usuários reais antes do desenvolvimento.",
      en: "I started with user research — interviewing fleet managers and drivers to understand their daily workflows, pain points, and what \"good enough\" looked like for them (spoiler: the bar was low, which meant small improvements had outsized impact).\n\nI restructured the information architecture based on task frequency: the things users do 10x/day should be 1 tap away, not buried in menus.\n\nI designed a new visual system that prioritized readability in outdoor/vehicle conditions — high contrast, larger touch targets, simplified data visualization.\n\nPrototyped key flows and ran usability tests with real users before development.",
    },
    decisions: {
      pt: "1. **Navegação baseada em frequência de tarefas**: reorganizei toda a estrutura do app em torno de quão frequentemente usuários executam cada ação. Tarefas diárias ficam em destaque; features semanais/mensais são acessíveis mas não competem por atenção.\n\n2. **Design para leitura outdoor**: ratios de contraste altos, touch targets maiores e displays de dados simplificados — porque a maioria dos usuários olha esse app sob sol forte, frequentemente em movimento.\n\n3. **Rollout incremental**: lançamos o redesign em fases para evitar disrupção em workflows estabelecidos. Cada fase foi validada antes de avançar para a próxima.",
      en: "1. **Task-frequency-based navigation**: reorganized the entire app structure around how often users perform each action. Daily tasks are front and center; weekly/monthly features are accessible but not competing for attention.\n\n2. **Designed for outdoor readability**: high contrast ratios, larger touch targets, and simplified data displays — because most users are looking at this app in bright sunlight, often while moving.\n\n3. **Incremental rollout**: released the redesign in phases to avoid disrupting established workflows. Each phase was validated before moving to the next.",
    },
    results: {
      pt: "- Overhaul visual e de UX completo do app mobile de rastreamento\n- Scores de usabilidade melhorados nos workflows core\n- Feature set expandido sem aumentar complexidade\n- Recepção positiva da base de usuários existente",
      en: "- Complete visual and UX overhaul of the mobile tracking app\n- Improved usability scores across core workflows\n- Expanded feature set without increasing complexity\n- Positive reception from existing user base",
    },
    images: [
      "/projects/softruck/soft-4-home.png",
      "/projects/softruck/soft-5-map.png",
      "/projects/softruck/soft-dados.png",
      "/projects/softruck/soft-3-style.png",
      "/projects/softruck/soft-7-map.png",
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
