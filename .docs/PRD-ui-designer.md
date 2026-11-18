# PRD: guia da skill ui-designer (/skills/ui-designer)

*16/11/2026. Terceiro guia da série. Os dois primeiros estão no ar (ux-research desde 09/11,
ux-designer desde 12/11) e valem como modelo. Receita técnica de guia novo no `CLAUDE.md` do
projeto ("Adicionar um guia de skill"); PRD/Spec da ux-designer em `.docs/` para o fluxo.*

## Objetivo

Mesmo dos anteriores: ser citado por buscador e por IA quando alguém pergunta como fazer o Claude
Code entregar interface com acabamento de designer, e mostrar a quem contrata que o Gustavo usa IA
com método. Este guia fecha o arco do caso: pesquisa (guia 1) → fluxo (guia 2) → tela (guia 3).

## Arquivos relevantes

| Arquivo | Papel |
|---|---|
| `src/content/skills/ux-designer.ts` | Modelo de conteúdo e fonte do caso. Seções `strategy` (l. 129-195: as 5 decisões que viram a tela) e `audit` (l. 247-369: CLEAR 7/25 da tela atual) |
| `src/content/skills/types.ts` | `SkillGuide`, blocos `p`, `code`, `table` (com `total`), `list`, `callout`, `install`, `conversation`. **Não existe bloco de imagem** |
| `src/content/skills/index.ts` | Registro `guides`; entrada nova aqui |
| `src/content/skills/catalog.ts:51-57` | Linha da ui-designer no índice (cita "8pt grid", "60-30-10 color rule", "seven-point check"); ganha `guide` |
| `src/app/skills/ux-designer.md/route.ts` e `src/app/pt/...` | Modelo das duas rotas `.md` novas |
| `src/content/skills/ux-designer.ts:582-583` | FAQ cita a ui-designer sem link; passa a apontar para o guia |
| `public/llms.txt` | Linha nova em Guides |
| `src/components/skill-guide/*` | Componentes do artigo; nada novo previsto |
| `.docs/check-jsonld.py` | Conferência do JSON-LD em produção |
| `.docs/content/ui-designer-current-step.html` | A tela atual fictícia auditada no guia 2 (copiada do scratchpad de 10/11). Fora do git via `.git/info/exclude`; apagar depois de publicar |

## O que a skill é (corrigida em 16/11, repo `de37707`)

`SKILL.md` com ~560 linhas + 6 references (~1.500 linhas). Fluxo de passos, sem modos. Em ordem de
interesse para o guia:

1. **Passo 0, modo Brand ou Product:** a mesma técnica tem veredito oposto conforme o contexto
   (degradê no hero de landing pode; na métrica do dashboard é slop). Pergunta uma vez se ambíguo.
2. **Passo 0.5, lê o projeto antes:** usa os tokens e componentes que existem, não impõe os seus.
3. **Fundação com números declarados como convenção:** grid de 8pt, escala modular de tipo,
   60-30-10 como ponto de partida, raio concêntrico. Desde 16/11 a skill diz o que é padrão e o que
   tem fonte (seção "Sources and Credits").
4. **Passo 6.0, "olhe antes de entregar":** renderiza a tela (Playwright/DevTools), tira screenshot
   e corrige antes de mostrar. "Image confirms; source proves": o resto da verificação é no código.
   Se não der para renderizar, diz que pulou.
5. **Senior Designer Filter** (7 perguntas) e **checklist de interface** (itens binários
   conferidos no código, de Rauno Freiberg e Jakub Krehel).
6. **Detector de slop:** 46 padrões adaptados do catálogo da **Impeccable**, com grep para
   Tailwind/Next e coluna Brand/Product.
7. **Auditoria /10** (crítico, importante, polimento, o que funciona) e **discordância** uma vez,
   depois obedece.

## Caso e sessão gravada (a fazer)

**Entrada:** a estratégia aprovada no guia 2 (5 decisões: reunião de teste primeiro, motivo vindo
do que a pessoa viu, uma linha sobre o alcance, "Pular por enquanto", página para a TI) + a tela
atual fictícia auditada em 7/25.

**Gravação:** mesmo método dos guias anteriores (memória `feedback_gravacao_headless_isolada`):
pasta isolada com só a skill pública, `--setting-sources project`, `CLAUDE_CODE_DISABLE_CLAUDE_MDS=1`.
Respostas da skill reais; falas do usuário escritas para a demo e declaradas no texto. Material bruto
fora do git.

**Turnos candidatos (decidir na Spec):**
1. Construir a etapa "conectar agenda" a partir da estratégia, num projeto mínimo com tokens
   próprios (testa o Passo 0.5: usa os tokens do projeto?).
2. Ver se ela roda o Passo 6.0 sozinha (renderiza e olha) e o que corrige depois de olhar.
3. Um pedido que a skill deve contestar (ex.: "deixa mais moderno, põe degradê roxo e vidro").
4. Auditoria /10 da tela antiga, para comparar com o CLEAR do guia 2 (o que a lente visual vê que
   a de UX não viu, e vice-versa).

**Medir o antes e depois** na tela real: contraste dos pares de cor (a antiga reprovava 5 de 6),
provedores alcançáveis por teclado, alvo de toque, hierarquia. Número medido, não descrito.

## Pesquisa de busca (16/11)

Qualitativa, por SERP e concorrência; sem ferramenta de volume.

| Cluster | Demanda | Alvo |
|---|---|---|
| "claude code skill UI design / best UI UX skills" | Alta. Listas: Pillitteri (EN, PT, JA, ID), Snyk (com pt-BR), UX Planet, thetoolnerd, claudeskills.info | **Principal** |
| "make Claude UI less generic / AI slop" | Alta. Post oficial da Anthropic ("Improving frontend design through Skills"), Medium, gists | **Principal** |
| "frontend-design vs Impeccable vs UI UX Pro Max" | Média, comparativos de um teste só; autores dizem que as diferenças são ruído | Secundário (FAQ: "qual usar") |
| "8pt grid / 60-30-10 / type scale para IA" | Média; skills e prompts repetem as regras como lei | Secundário. Chance de citação: quase ninguém diz que 60-30-10 é regra de decoração |
| PT-BR | Média e crescendo (horadecodar, open-design.ai/pt-br, Pillitteri PT) mas só listas e traduções | Fácil de ocupar com caso real |

**Concorrentes:**
- **frontend-design (Anthropic, oficial):** direção estética ousada, projeto novo. Críticas: pouca
  visibilidade do raciocínio; difícil em codebase existente.
- **Impeccable (Paul Bakaus):** 23 comandos, regras de anti-padrão. É a **fonte do detector de
  slop da ui-designer**: creditar, não competir.
- **UI/UX Pro Max:** catálogo de estilos/paletas/fontes; briga com design system existente.
- **Taste Skill, Hallmark** e dezenas de "ui-design-system" genéricas.

**Lacuna a ocupar:**
1. Trabalhar **dentro** de um projeto existente (Passo 0.5) e com modo Brand/Product: os
   concorrentes são para tela nova ou impõem estética.
2. **Olhar antes de entregar** (Passo 6.0) com a regra "imagem confirma, código prova".
3. Caso contínuo e real: a mesma tela atravessando três skills, com antes e depois medido.
4. Honestidade sobre os números: dizer o que é convenção (8pt, 60-30-10) e o que é padrão (WCAG),
   e contar que a própria skill foi auditada e corrigida.

**skills.sh (visto em 10/11):** ui-designer era a mais instalada do repo (45). Não usar número no
site sem conferir de novo na data.

## Material para a seção de limites

A auditoria de 16/11 da própria skill é evidência de primeira mão, com commit público
(`de37707`): ela classificava "Cancel" como ação destrutiva; mandava fazer anel de foco com
`box-shadow`, que some no alto contraste do Windows (a fonte original já registrava a correção do
Safari 16.4); recomendava como "qualidade" três técnicas que o próprio detector condena; e tinha um
exemplo com `transition: all`, o anti-padrão que ela mesma proíbe. Contar como fato, sem drama.

Comparativos públicos de skills de UI são de uma execução cada, e os autores dizem que as
diferenças entre as primeiras colocadas são ruído. Serve para a FAQ, não como prova.

*Fontes externas novas a reconferir antes de entrar no texto.*

## Fontes verificadas (16/11, usadas na correção da skill)

- Grid: Material Design (8dp); "8-Point Grid", spec.fm (sem autor assinado na página).
- Escala de tipo: Tim Brown, "More Meaningful Typography", A List Apart, 2011.
- Contraste e alvo: WCAG 2.2 (SC 1.4.3, 1.4.11, 2.5.8). Texto grande = 18pt ou 14pt bold (24px / ~18,7px).
- Toque: Apple HIG (44pt), Material (48dp).
- Tema escuro: Material, "Dark theme" (#121212, branco a 87%, tons 200).
- Performance de animação: web.dev, animations guide.
- Rótulo acima do campo: M. Penzo, UXmatters, 2006 (teste pequeno, o próprio autor chamou de ad hoc).
- Alcance do polegar: Steven Hoober, UXmatters, 2013-2017 (o centro é a área mais fácil; "embaixo
  é mais fácil" é simplificação).
- Detector de slop: Impeccable (impeccable.style/slop). Checklist: Rauno Freiberg
  (interfaces.rauno.me), Jakub Krehel (interfaces.dev, jakub.kr).

## Observações para o planejamento

- **Antes e depois visual não cabe no modelo atual:** não há bloco de imagem. A regra dos guias
  anteriores foi "sem tipo de bloco novo". Opções: descrever e medir em tabela/código (cabe hoje),
  ou abrir exceção para um bloco de imagem (decisão do Gustavo; mexe em `types.ts`, `blocks.tsx`,
  `to-markdown.ts` e nas regras de imagem do `DESIGN.md`).
- A tela nova é contexto **Product** (onboarding de ferramenta usada todo dia): a skill deve
  escolher contenção. Bom teste do Passo 0.
- A linha da ui-designer em `catalog.ts` continua correta, mas descreve a skill pelas regras que
  agora são "convenção". Avaliar se o texto do índice acompanha o enquadramento novo.
- O detector de slop é adaptado da Impeccable: o guia precisa deixar o crédito claro e não
  apresentar os 46 padrões como criação própria.

## Restrições

- `DESIGN.md` inteiro vale; mesmos componentes dos guias anteriores.
- Sem nome de cliente nem métrica interna.
- Guia anti-vícios de IA; sem travessão. Texto passa pelo Gustavo antes do código. Push só com
  confirmação, nos dois repos.
