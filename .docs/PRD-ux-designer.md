# PRD: guia da skill ux-designer (/skills/ux-designer)

*10/11/2026. Segundo guia da série. O primeiro (`.docs/PRD.md`, `.docs/Spec.md`) está no ar desde
09/11 e vale como modelo: decisões de layout, motion, SEO e schema que não mudam estão lá.*

## Objetivo

Mesmo do primeiro guia: ser citado por buscador e por IA quando alguém pergunta como usar o
Claude Code para trabalho de UX, e mostrar a quem contrata que o Gustavo é designer praticante que
usa IA com método.

## Decisões tomadas (com o Gustavo, 10/11)

| Decisão | Escolha |
|---|---|
| URL | `/skills/ux-designer` e `/pt/skills/ux-designer`. O card do índice passa a levar pro guia |
| Caso da demo | Continua o primeiro guia: a skill recebe o brief "Permissão de agenda no onboarding" da ferramenta de agendamento (seção Specify do guia ux-research) e segue dali. Um parágrafo de contexto para quem chega direto |
| Idioma | EN é a voz principal, PT é tradução (igual ao primeiro) |

## O que a skill é (SKILL.md público, 499 linhas + 4 references, ~1.200 linhas)

Não tem modos. É um fluxo de 10 passos. O que diferencia, em ordem de importância para o guia:

1. **Trava (Passo 1):** não constrói antes de saber quem usa, qual o problema e as restrições.
   Se não souber, para e pergunta.
2. **Estratégia antes do código (Passo 2):** formato fixo (usuário, insight central, decisões,
   inspiração, maior risco).
3. **Discorda** de pedido que piora a experiência ("Push Back When Needed").
4. **Auditoria** em dois formatos: nota /10 (crítico, importante, polimento, o que funciona) e
   scorecard CLEAR (1 a 5 por dimensão) cruzado com ELMR.
5. O resto (psicologia, leis, fluxo e estados, microcopy, acessibilidade, motion, o que testar)
   entra como "o que ela confere", não como seções próprias.

## Sessão gravada (10/11)

Bruto em `.docs/content/ux-designer-session.md` (4 turnos) e `.docs/content/ux-designer-audit.html`
(página que a skill gerou no turno 4). Claude Code headless em pasta limpa, só a skill pública,
sem o CLAUDE.md do Gustavo (`--setting-sources project` + `CLAUDE_CODE_DISABLE_CLAUDE_MDS=1`).
Respostas da skill reais; falas do usuário escritas para a demo.

1. **Trava:** recebe o brief e faz 5 perguntas antes de desenhar; diz que 1 e 2 são as que importam.
2. **Estratégia:** nota que a citação "agenda de todo mundo" descreve um acesso que o OAuth nem dá.
   Teste primeiro como "experimente sua página", motivo para conectar vindo do que a pessoa acabou
   de ver, "Pular por enquanto" como saída real, página para encaminhar à TI. Maior risco: a reunião
   de teste satisfazer e a pessoa sair sem conectar.
3. **Discordância:** PM quer tirar o "Pular". A skill recusa com 4 argumentos (a métrica muda quem
   entra no número; os que duvidam voltam, segundo a própria pesquisa; quem depende da TI fica
   bloqueado e vira ticket; é o mesmo erro da pesquisa, uma etapa depois) e oferece alternativa e A/B.
4. **Auditoria CLEAR** de uma tela atual fictícia (`current-step.html`): 7/25. Achados fortes:
   "Error 403" para quem só não escolheu provedor; provedores em `div` sem teclado; escopo
   `admin.directory.resource.calendar` que parece dar acesso à organização inteira.

**Cortar do texto:** no turno 4 a skill tentou publicar a auditoria como página (a ferramenta
existe na máquina do Gustavo, não é da skill); no turno 1 ela comenta um arquivo da pasta.

## Pesquisa de busca (10/11)

Demanda qualitativa, julgada por SERP e concorrência; sem ferramenta de volume.

| Cluster | Demanda | Alvo |
|---|---|---|
| "claude code skill ux designer / UI UX skills" | Alta e subindo. Listas: Pillitteri (EN, atualizada out/2026, ~10 idiomas), Snyk (com pt-BR), UX Planet, Figma | **Principal** |
| "UX review with AI / Claude" | Média, praticantes recentes (uxdesign.cc; Daniela Napoli, 18/05/2026) | **Principal** (auditoria) |
| "AI UX audit" | Alta, comercial e fechada (UX Pilot, The UX Audit etc.). Contraponto NN/g jan/2026 | Secundário (seção de limites) |
| "heuristic evaluation AI" | Média, acadêmica (arXiv 2507.02306) | Secundário. FAQ explica que a skill **não** usa as 10 heurísticas de Nielsen |
| "claude code for designers" | Alta e saturada, tema é prototipar código | Não é alvo |
| "UX copy / microcopy AI" | Média, skills dedicadas | Secundário (o que ela confere) |
| "ELMR framework" | Muito baixa, SERP quase vazio | Secundário. Chance de citação por IA: quase ninguém explica |
| "CLEAR framework growth design" | Baixa, ocupada pelo dono (curso pago Growth.Design) | Só crédito. **Não competir com o dono** |
| PT-BR | Baixa, só traduções e ferramentas pagas | Fácil de ocupar |

**Concorrentes:** Impeccable critique/audit (~82 mil installs, auditoria de código, sem trava nem
psicologia); UI/UX Pro Max (444 mil, visual); Bencium UX Designer ("always ask", mas sobre cor e
fonte); plugin `design` da Anthropic; Owl-Listener/designer-skills (~91 skills, heurística com
severidade, sem saída de exemplo); nielsen-heuristics-audit; skill da Daniela Napoli; woakin/growth-design-review
(CLEAR/25, sem autor nem exemplo); Product Psychology Agent pago do Growth.Design (dono do CLEAR).

**Lacuna a ocupar:**
1. Entender antes de construir como argumento central. Ninguém trata a trava como o produto.
2. Saída real: nenhum concorrente mostra nota /10 ou CLEAR preenchido numa tela.
3. Créditos e limites com evidência juntos (CLEAR, ELMR, leis; precisão da IA em auditoria).
4. Grátis, aberto, autor praticante com rosto, em EN e PT.

**skills.sh (visto em 10/11):** repo com 219 installs; ux-designer 44 (segunda, atrás da
ui-designer com 45). Não usar número no site sem conferir de novo na data.

## Fontes verificadas (10/11)

### Créditos
- **CLEAR:** Growth.Design, curso "CLEAR UI" (https://growth.design/courses/clear-ui). Letras
  confirmadas. Escala 1-5, critérios e sub-regras são adaptação da skill: escrever "scorecard
  adaptado do CLEAR (Growth.Design)".
- **ELMR:** lição "The ELMR Framework" da Reforge existe (URL na série de growth), mas exige login.
  Fontes secundárias: CoSchedule (Rod Austin, 21/06/2017, atribui a Brian Balfour) e Vahe
  Baghdasaryan (20/10/2021). Escrever "framework da Reforge, atribuído a Brian Balfour em fontes
  secundárias".
- **Leis:** Laws of UX (Jon Yablonski) como link curado; papers: Hick (1952), Fitts (1954),
  Kahneman et al. (1993) para peak-end, Jakob Nielsen (2017) para Jakob's Law.
- **Vocabulário Growth.Design** dentro da skill (Spark Effect e outros vieses): https://growth.design/psychology.

### Precisão da IA em auditoria (para a seção de limites)
- Baymard (out/2023, GPT-4): 19,9% de acerto, 80,1% de falso positivo. Baymard vende ferramenta própria.
- NN/g, Kate Moran (30/01/2026): ferramentas mais novas entre 50% e 70%.
- Zhong et al. (arXiv 2507.02306): comparação com 5 especialistas.
- Daniela Napoli: "Claude confidently flagged problems that did not exist".
- *Números a reconferir na fonte antes de entrar no texto.*

### Afirmações da skill que estão erradas ou sem fonte

O guia não repete nenhuma delas. A correção da skill é decisão à parte (ver abaixo).

| # | Onde | Afirmação | Problema | Correção |
|---|---|---|---|---|
| 1 | SKILL.md:145 | "Left-aligned content gets 30% more attention" | Distorce NN/g: 30% era a metade direita, em 2010 | ~80% do tempo na metade esquerda (NN/g, 2017) |
| 2 | SKILL.md:200 | "80% of viewing time above the fold" | Dado de 2010; NN/g 2018 mediu 57% | 57% (NN/g, 2018) |
| 3 | deep-dive.md:10; situations.md:32 | "~4 chunks (Miller's revised estimate)"; "5 plus or minus 2" | 4 é Cowan (2001); Miller é 7±2 | Cowan, 2001; Miller 7±2 |
| 4 | SKILL.md:140,156,470; patterns.md:104 | "scan in 3 seconds" | Sem fonte | Lindgaard (2006) 50 ms; Nielsen (2011) 10-20 s; ou tirar |
| 5 | deep-dive.md:20,36 | "72% accept defaults", "80% choose this" | Sem fonte | Tirar o número; Johnson & Goldstein (2003) para a direção |
| 6 | patterns.md:55-58 | Auto-login após reset de senha | Contradiz OWASP ("Don't automatically log the user in") | Inverter a regra |
| 7 | SKILL.md:302,356 | 44px "minimum" | AA é 24 CSS px (WCAG 2.5.8); 44 é AAA/Apple | 44 pt recomendado; 24 px é o mínimo AA |
| 8 | situations.md:47 | Zeigarnik | Replicação falhou (Ghibellini & Meier, 2025) | Ovsiankina ou tirar |
| 9 | SKILL.md:166,191 | "5-7 options", "7 top-level items" | Número sem fonte | Hick + Scheibehenne (2010); Larson & Czerwinski (1998) sem número |
| 10 | SKILL.md:151,349 | Progresso > 1 s; "skeletons, not spinners" | Barra de % é para > 10 s; NN/g: cada indicador tem seu caso | Nielsen (1993); NN/g (2023) |

Confirmadas: ~4 chunks (Cowan), 100 ms de resposta (Nielsen), contraste 4.5:1/3:1, faixa de motion
100-500 ms (NN/g 2020, como convenção).

## Restrições

- `DESIGN.md` inteiro vale; mesmos componentes do primeiro guia.
- Sem nome de cliente nem métrica interna. CLEAR é marca de curso pago: crédito, sem reproduzir o
  material do curso.
- Guia anti-vícios de IA; sem travessão. Texto passa pelo Gustavo antes do código. Push só com
  confirmação, nos dois repos.
