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
    slug: "duo-ai-buyer-redesign",
    category: "product",
    coverImage: "/projects/Duo-ai-buyer-redesign/DuoAI-Consumer-Redesign-Screen.png",
    year: "2026",
    tags: ["Product Design", "UI", "Frontend", "Design System", "Claude Code"],
    title: {
      pt: "Duo AI — Redesign do Consumidor",
      en: "Duo AI — Consumer Redesign",
    },
    description: {
      pt: "Redesign e implementação das principais superfícies do consumidor no Duo AI — sign-in, agents, header, sidebar e light mode — levadas do Figma ao código usando Claude Code.",
      en: "Redesign and implementation of the main consumer surfaces in Duo AI — sign-in, agents, header, sidebar, and light mode — taken from Figma to code using Claude Code.",
    },
    context: {
      pt: "O Duo AI é uma plataforma onde creators constroem e vendem agentes de IA (DUOs) para suas audiências. A visão do creator (Studio) já tinha recebido bastante investimento de design — mas a visão do consumidor, que é onde o aluno passa 90% do tempo, estava defasada: padrões inconsistentes, hierarquia confusa, light mode quebrado em vários pontos e uma sensação geral de \"produto interno\" em vez de \"produto pronto pro mercado\".\n\nAntes do lançamento público, decidimos elevar o craft dessa camada inteira.",
      en: "Duo AI is a platform where creators build and sell AI agents (DUOs) to their audiences. The creator side (Studio) had already received significant design investment — but the consumer side, where the buyer spends 90% of their time, was lagging: inconsistent patterns, confusing hierarchy, broken light mode in several places, and an overall \"internal tool\" feel instead of \"market-ready product.\"\n\nBefore the public launch, we decided to raise the craft bar across the entire layer.",
    },
    role: {
      pt: "Product Designer responsável pelo redesign end-to-end das superfícies de consumo: decisões de UX, design no Figma e implementação direta no código (Next.js + Tailwind) usando Claude Code.\n\nEscopo: sign-in (split-screen no desktop, progressive disclosure no mobile), Agents page (cards redesenhados, paginação no desktop, scroll horizontal no mobile), header (AppPageLayout com avatar centralizado), sidebar (três seções: Meus DUOs, Salas, Conversas) e migração completa do light mode para tokens semânticos. Pendentes próximas: chat, signup, forgot-password, variantes Trial/Expired do AgentCard e variante \"Chat\" do header.",
      en: "Product Designer responsible for the end-to-end redesign of the consumer surfaces: UX decisions, Figma design, and direct implementation in code (Next.js + Tailwind) using Claude Code.\n\nScope: sign-in (split-screen on desktop, progressive disclosure on mobile), Agents page (redesigned cards, desktop pagination, horizontal scroll on mobile), header (AppPageLayout with centered avatar), sidebar (three sections: My DUOs, Rooms, Conversations), and full light mode migration to semantic tokens. Upcoming: chat, signup, forgot-password, Trial/Expired AgentCard variants, and a \"Chat\" header variant.",
    },
    process: {
      pt: "**Figma como fonte da verdade.** Estruturei o file no Figma como referência única. Toda decisão de UI tinha que existir lá antes de virar código — isso evitou retrabalho e me deu um lugar pra discutir trade-offs visuais sem ruído de implementação.\n\n**Implementação com Claude Code.** Como UX Designer com nível iniciante em código, normalmente esse tipo de redesign exigiria handoff pra um time de engenharia e seria spread em várias sprints. Com Claude Code, eu mesmo levei tudo do Figma ao PR. O fluxo virou: apresento a tela do Figma e o contexto → Claude pesquisa o codebase e devolve um plano de mudanças → eu aprovo (ou ajusto) o plano → implementação acontece em ciclos curtos, com verificação visual minha entre cada fase. Não é \"vibe coding\". É design com loop fechado entre intenção, decisão e execução — sem perder controle do produto.\n\n**Design system como guard-rail.** Um aprendizado caro do projeto: na primeira passada da sidebar e dos AgentCards, usamos cores fixas (stone-85, stone-98). Funcionou no dark mode, quebrou no light. Tivemos que refazer trocando tudo por tokens semânticos (background-tint-02, text-text-01, border-border-01). Esse erro virou regra: nada de cor fixa em componente — sempre token semântico que adapta entre temas.\n\n**O que aprendi trabalhando com Claude Code como Product Designer.** A pesquisa de código vem antes da implementação — forcei Claude a sempre ler arquivos completos e mapear o que existe antes de propor mudança, o que eliminou 80% das soluções genéricas. Plano antes de PR — toda task grande começa com um documento em .docs/Spec.md, que eu reviso e aprovo antes da implementação. Memória é alavanca — feedbacks recorrentes (como o de tokens semânticos) ficam numa camada persistente, e próximos projetos começam com esse contexto carregado. Eu continuo sendo o Product Designer; Claude implementa, mas as decisões de hierarquia, tom, fluxo e prioridade são minhas. A ferramenta amplifica — não substitui — o julgamento de design.",
      en: "**Figma as source of truth.** I structured the Figma file as the single reference. Every UI decision had to exist there before becoming code — this avoided rework and gave me a place to discuss visual trade-offs without implementation noise.\n\n**Implementation with Claude Code.** As a UX Designer with beginner-level coding skills, this kind of redesign would normally require handoff to an engineering team and be spread across multiple sprints. With Claude Code, I took everything from Figma to PR myself. The flow became: I present the Figma screen and context → Claude researches the codebase and returns a change plan → I approve (or adjust) the plan → implementation happens in short cycles, with my visual verification between each phase. This isn't \"vibe coding.\" It's design with a closed loop between intent, decision, and execution — without losing control of the product.\n\n**Design system as guard-rail.** An expensive lesson: on the first pass of the sidebar and AgentCards, we used hardcoded colors (stone-85, stone-98). It worked in dark mode, broke in light mode. We had to redo it all using semantic tokens (background-tint-02, text-text-01, border-border-01). That mistake became a rule: no hardcoded colors in components — always semantic tokens that adapt between themes.\n\n**What I learned working with Claude Code as a Product Designer.** Code research comes before implementation — I forced Claude to always read full files and map what exists before proposing changes, which eliminated 80% of generic solutions. Plan before PR — every large task starts with a .docs/Spec.md document that I review and approve before implementation. Memory is leverage — recurring feedback (like the semantic tokens lesson) lives in a persistent layer, and future projects start with that context loaded. I'm still the Product Designer; Claude implements, but the decisions on hierarchy, tone, flow, and priority are mine. The tool amplifies — doesn't replace — design judgment.",
    },
    decisions: {
      pt: "1. **Sign-in mobile com progressive disclosure**: no mobile, o formulário de e-mail/senha fica oculto por trás de um CTA secundário (\"ou entre com e-mail\"). O Google OAuth recebe o destaque primário. A hipótese: a maioria dos usuários da audiência dos creators já está logada no Google, e mostrar 4 campos de uma vez aumenta fricção sem aumentar conversão.\n\n2. **Sidebar reorganizada em três planos mentais**: em vez de listar tudo plano, separei em \"Meus DUOs\" (o que eu comprei), \"Salas\" (onde eu participo) e \"Conversas\" (histórico). Espelha como o usuário pensa, não como o backend modela.\n\n3. **Header centralizado com avatar como âncora**: o avatar do DUO atual fica no centro do header, não no canto. É a peça mais importante da tela em qualquer momento — onde o usuário está conversando, com quem, em qual contexto. Tirar isso da periferia mudou a sensação do produto.\n\n4. **Tokens semânticos como contrato do design system**: depois do incidente das cores fixas, qualquer cor em componente passou a ser obrigatoriamente token semântico. Isso virou parte da memória do projeto, não um \"a gente tenta lembrar\" — o que destravou o light mode de toda a experiência sem precisar refazer a cada nova tela.",
      en: "1. **Mobile sign-in with progressive disclosure**: on mobile, the email/password form is hidden behind a secondary CTA (\"or sign in with email\"). Google OAuth gets primary focus. The hypothesis: most users in the creators' audiences are already logged into Google, and showing 4 fields upfront adds friction without lifting conversion.\n\n2. **Sidebar reorganized into three mental layers**: instead of a flat list, I split it into \"My DUOs\" (what I bought), \"Rooms\" (where I participate), and \"Conversations\" (history). Mirrors how the user thinks, not how the backend models.\n\n3. **Centered header with avatar as anchor**: the current DUO's avatar sits at the center of the header, not the corner. It's the most important piece of the screen at any moment — where the user is talking, with whom, in what context. Pulling it out of the periphery changed how the product feels.\n\n4. **Semantic tokens as design system contract**: after the hardcoded color incident, any color in a component became required to be a semantic token. This became part of the project's memory, not a \"we'll try to remember\" — which unlocked light mode across the entire experience without redoing it on every new screen.",
    },
    results: {
      pt: "- Cinco superfícies de consumo redesenhadas e implementadas em produção (sign-in, agents, header, sidebar, light mode)\n- Light mode funcional em toda a experiência via tokens semânticos\n- Design system consistente, com padrões prontos pra serem replicados nas próximas telas (chat, signup, variantes do AgentCard)\n- Provou que um Product Designer com nível técnico iniciante consegue, com o setup certo, levar um redesign completo do Figma ao código mantendo qualidade de craft e velocidade de iteração",
      en: "- Five consumer surfaces redesigned and shipped to production (sign-in, agents, header, sidebar, light mode)\n- Light mode working across the entire experience via semantic tokens\n- Consistent design system, with patterns ready to be replicated on upcoming screens (chat, signup, AgentCard variants)\n- Proved that a Product Designer with beginner-level coding skills can, with the right setup, take a full redesign from Figma to code while keeping craft quality and iteration speed",
    },
    images: [
      "/projects/Duo-ai-buyer-redesign/DuoAI-Consumer-Redesign-Screen.png",
      "/projects/Duo-ai-buyer-redesign/DuoAI-Consumer-Redesign-Process.png",
      "/projects/Duo-ai-buyer-redesign/DuoAI-Consumer-Redesign-Components.png",
    ],
  },
  {
    slug: "hotmart-club-jtbd",
    category: "research",
    coverImage: "/projects/Hotmart-new-club/2.png",
    year: "2024",
    tags: ["UX Research", "Jobs To Be Done", "Journey Mapping", "Service Design"],
    title: {
      pt: "Hotmart Club — Jornada do Criador (JTBD)",
      en: "Hotmart Club — Creator Journey (JTBD)",
    },
    description: {
      pt: "Mapeei a jornada completa do criador no Hotmart Club usando Jobs To Be Done. O objetivo: identificar lacunas de experiência e oportunidades de melhoria em toda a plataforma (30M+ usuários).",
      en: "Mapped the complete Hotmart Club creator journey using Jobs To Be Done methodology. The goal: identify experience gaps and improvement opportunities across the entire platform (30M+ users).",
    },
    context: {
      pt: "O Hotmart Club é a plataforma onde criadores hospedam e entregam seus produtos digitais — cursos, comunidades, mentorias — para uma base de 30M+ usuários. Ao longo dos anos, a plataforma cresceu adicionando funcionalidades de forma incremental, sem uma visão consolidada do que o criador realmente precisa fazer ao longo do ciclo de vida do seu produto.\n\nO desafio: criar um modelo único que descreve a experiência inteira do criador, do primeiro contato com a Hotmart até a operação madura — e que servisse de base para discoveries, priorização de roadmap e alinhamento entre times.",
      en: "Hotmart Club is the platform where creators host and deliver their digital products — courses, communities, mentorships — to a 30M+ user base. Over the years, the platform grew by adding features incrementally, without a consolidated view of what the creator actually needs to do across their product lifecycle.\n\nThe challenge: build a single model describing the entire creator experience, from first contact with Hotmart to mature operations — one that could serve as a foundation for discoveries, roadmap prioritization, and cross-team alignment.",
    },
    role: {
      pt: "UX Researcher responsável por conceber, estruturar e entregar o mapeamento end-to-end. Trabalhei de forma transversal com Product Managers e Product Designers para garantir que o output fosse acionável — não um artefato bonito que ninguém usa.",
      en: "UX Researcher responsible for conceiving, structuring, and delivering the end-to-end mapping. I worked cross-functionally with Product Managers and Product Designers to make sure the output was actionable — not a beautiful artifact nobody uses.",
    },
    process: {
      pt: "**Síntese de pesquisa.** Analisei dados qualitativos de entrevistas com criadores documentadas no Dovetail, extraindo padrões de comportamento, necessidades recorrentes e momentos de fricção.\n\n**Auditoria da plataforma.** Naveguei e auditei mão na massa cada seção da plataforma — não só as áreas \"do meu time\". A auditoria expôs inconsistências entre o que os usuários descreviam e o que a plataforma de fato oferecia.\n\n**Mapeamento JTBD.** Estruturei a experiência completa em macro jobs (o que o criador está tentando alcançar) e micro tasks (os passos concretos para chegar lá). Para cada macro job, mapeei subfluxos com pontos de decisão e caminhos alternativos.\n\nO output não é um diagrama estático — é um sistema de fluxos escalável, projetado para ser estendido conforme a plataforma evolui.",
      en: "**Research synthesis.** Analyzed qualitative data from user interviews documented in Dovetail, extracting behavioral patterns, recurring needs, and friction moments.\n\n**Platform audit.** Navigated and audited every section of the platform hands-on — not just \"my team's\" areas. The audit exposed mismatches between what users described and what the platform actually offered.\n\n**JTBD mapping.** Structured the full experience into macro jobs (what the creator is trying to achieve) and micro tasks (the concrete steps to get there). For each macro job, I mapped subflows with decision points and alternate paths.\n\nThe output isn't a static diagram — it's a scalable flow system designed to be extended as the platform evolves.",
    },
    decisions: {
      pt: "**Macro jobs identificados:**\n\n1. **Get to Know Hotmart** — primeiro contato, entendimento da proposta de valor, criação de conta\n2. **Produce and Format Content** — criação, edição e estruturação do conteúdo do produto\n3. **Communicate with Audience** — engajamento, comunidade, suporte direto\n4. **Sell / Manage Sales** — pricing, checkout, afiliados, conversão\n5. **Deliver and Provide Support** — entrega do conteúdo, atendimento, retenção\n6. **Manage Operations** — analytics, finanças, equipe, decisões estratégicas\n\nEssa estrutura virou linguagem comum entre os times de produto. Cada macro job tem dono, métrica e roadmap próprios — mas todos se reportam à mesma jornada.",
      en: "**Macro jobs identified:**\n\n1. **Get to Know Hotmart** — first contact, value proposition understanding, account creation\n2. **Produce and Format Content** — product content creation, editing, structuring\n3. **Communicate with Audience** — engagement, community, direct support\n4. **Sell / Manage Sales** — pricing, checkout, affiliates, conversion\n5. **Deliver and Provide Support** — content delivery, customer service, retention\n6. **Manage Operations** — analytics, finance, team, strategic decisions\n\nThis structure became shared language across product teams. Each macro job has its own owner, metric, and roadmap — but all map back to the same journey.",
    },
    results: {
      pt: "- Mapa de jornada de alto nível com estágios de ciclo de vida\n- Subfluxos detalhados com pontos de decisão e caminhos alternativos\n- Quebra em micro steps para cada macro job\n- Lacunas anotadas onde a experiência quebrava\n- Sistema de fluxos escalável adotado como referência por múltiplos times de produto na priorização de roadmap",
      en: "- High-level journey map with lifecycle stages\n- Detailed subflows with decision points and alternate paths\n- Micro steps breakdown for each macro job\n- Annotated gaps where the experience broke down\n- Scalable flow system adopted as a reference by multiple product teams for roadmap prioritization",
    },
    images: [
      "/projects/Hotmart-new-club/2.png",
      "/projects/Hotmart-new-club/3.png",
      "/projects/Hotmart-new-club/Backup - Micro Steps.jpg",
      "/projects/Hotmart-new-club/Backup - SESSION + ONBOARDING.jpg",
    ],
  },
  {
    slug: "duo-ai-creator-studio",
    category: "product",
    coverImage: "/projects/duo-ai/duo-ai-admin.png",
    year: "2025 – Present",
    tags: ["Product Design", "AI", "Conversational UX"],
    title: {
      pt: "Duo AI — Creator Studio",
      en: "Duo AI — Creator Studio",
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
    slug: "sonho-grande",
    category: "design",
    coverImage: "/projects/Sonho-grande/3f67ce225722305.682379b97a7e0.png",
    year: "2022",
    tags: ["Product Design", "Mobile", "Data Visualization", "Social Impact"],
    title: {
      pt: "Sonho Grande — Prevenção de Abandono Escolar",
      en: "Sonho Grande — School Dropout Prevention",
    },
    description: {
      pt: "App web e mobile para o Instituto Sonho Grande: ajuda gestores de escolas públicas e secretarias de educação a monitorar e agir contra o abandono escolar, com visualização de dados de risco e ações concretas de acompanhamento.",
      en: "Web and mobile app for Instituto Sonho Grande: helps public school managers and education departments track and prevent school dropout, with risk data visualization and concrete follow-up actions.",
    },
    context: {
      pt: "O Instituto Sonho Grande atua para reduzir o abandono escolar nas escolas públicas brasileiras. O desafio era criar uma ferramenta que transformasse dados complexos sobre risco de evasão em ações concretas — algo que gestores escolares e secretarias de educação pudessem usar no dia a dia, sem treinamento técnico.\n\nA tela tinha que responder duas perguntas em segundos: \"quais alunos estão em risco?\" e \"o que eu faço a respeito?\".",
      en: "Instituto Sonho Grande works to reduce school dropout across Brazilian public schools. The challenge was building a tool that turned complex dropout risk data into concrete action — something school managers and education departments could use day-to-day, without technical training.\n\nThe interface had to answer two questions in seconds: \"which students are at risk?\" and \"what do I do about it?\".",
    },
    role: {
      pt: "UX/UI Designer responsável pela experiência completa: pesquisa, arquitetura de informação, fluxos, wireframes, protótipo de alta fidelidade, sistema de componentes e visualização de dados.\n\nEscopo: três perfis de usuário (Assessores, Secretarias de Educação, Equipe Escolar), 20+ telas mobile, dashboard de risco em múltiplos níveis (Brasil → Escola → Aluno) e fluxo de registro de ações (ligação familiar, visita domiciliar, encaminhamento).",
      en: "UX/UI Designer responsible for the full experience: research, information architecture, flows, wireframes, high-fidelity prototype, component system, and data visualization.\n\nScope: three user roles (Advisors, Education Departments, School Staff), 20+ mobile screens, multi-level risk dashboard (Brazil → School → Student), and an action registration flow (family call, home visit, referral).",
    },
    process: {
      pt: "Segui um processo em 4 fases:\n\n**1. Understand** — Reuniões de alinhamento com os donos do projeto e profissionais da educação para definir objetivos e identificar dores principais.\n\n**2. Define** — Mapeamento de necessidades primárias e secundárias dos usuários. Construção e validação do sitemap para guiar a navegação entre os três perfis.\n\n**3. Design** — Wireframes em baixa fidelidade explorando layout e usabilidade, com cada passo alinhado aos fluxos de usuário definidos.\n\n**4. Deliver** — Protótipos em alta fidelidade e interações projetadas para suportar visualização de dados e tomada de decisão rápida.",
      en: "I followed a 4-phase process:\n\n**1. Understand** — Alignment meetings with project owners and education professionals to define goals and identify key pain points.\n\n**2. Define** — Mapped primary and secondary user needs. Built and validated the sitemap to guide navigation across the three user roles.\n\n**3. Design** — Low-fidelity wireframes to explore layout and usability, aligning each step with the defined user flows.\n\n**4. Deliver** — High-fidelity prototypes and interactions designed to support data visualization and quick decision-making.",
    },
    decisions: {
      pt: "1. **Visão hierárquica de dados (Brasil → Escola → Aluno)**: o gestor entra pela visão macro e desce até o aluno individual. Cada nível responde uma pergunta diferente — quais regiões precisam de atenção, quais escolas dentro delas, quais alunos dentro de cada escola. Sem isso, a base de dados ficaria opressiva.\n\n2. **Ação como cidadã de primeira classe**: cada aluno em risco tem uma ação primária visível (NOVA AÇÃO) — não enterrada em um menu. O fluxo de registrar uma ligação, visita ou encaminhamento foi otimizado para acontecer em segundos, não minutos.\n\n3. **Categorização visual por status de risco**: cores semânticas (Em Risco, Sem Ação, Com Ação, Recuperados) tornam o status reconhecível sem leitura. Isso é crítico para gestores escaneando listas com centenas de alunos.\n\n4. **Três perfis, mesma base de componentes**: Assessores, Secretarias e Equipe Escolar têm necessidades diferentes mas compartilham a mesma linguagem visual e padrões de interação. Reduz custo de aprendizado quando alguém muda de papel.",
      en: "1. **Hierarchical data view (Brazil → School → Student)**: managers enter at the macro view and drill down to individual students. Each level answers a different question — which regions need attention, which schools within them, which students within each school. Without this, the data would be overwhelming.\n\n2. **Action as a first-class citizen**: every at-risk student has a primary visible action (NEW ACTION) — not buried in a menu. The flow to register a call, visit, or referral was optimized to take seconds, not minutes.\n\n3. **Visual categorization by risk status**: semantic colors (At Risk, No Action, With Action, Recovered) make status recognizable without reading. Critical for managers scanning lists of hundreds of students.\n\n4. **Three roles, one component base**: Advisors, Education Departments, and School Staff have different needs but share the same visual language and interaction patterns. Reduces learning cost when someone switches roles.",
    },
    results: {
      pt: "- App web e mobile completo com 20+ telas em alta fidelidade\n- Sistema de componentes e visualização de dados consistente entre três perfis de usuário\n- Fluxo de ação otimizado para registrar intervenções em segundos\n- Dashboard hierárquico que escala de visão nacional a aluno individual\n- Projeto com impacto social direto: ferramenta para reduzir abandono escolar em escolas públicas brasileiras",
      en: "- Complete web and mobile app with 20+ high-fidelity screens\n- Consistent component system and data visualization across three user roles\n- Action flow optimized to register interventions in seconds\n- Hierarchical dashboard scaling from national view down to individual student\n- Project with direct social impact: a tool to reduce dropout in Brazilian public schools",
    },
    images: [
      "/projects/Sonho-grande/3f67ce225722305.682379b97a7e0.png",
      "/projects/Sonho-grande/07fb35225722305.682379b97afd5.png",
      "/projects/Sonho-grande/b59d1e225722305.682379b97ee57.png",
      "/projects/Sonho-grande/f56350225722305.682379b97b64f.png",
      "/projects/Sonho-grande/d86954225722305.682379b97cdb7.png",
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
