# DESIGN.md — gustavosilveira.com

Regras de interface deste site. Existe para ser lido por agente antes de gerar ou alterar
qualquer coisa visual. Diz o que é **permitido e proibido**, não o que é bonito.

---

## 1. O que este site é

Portfólio de um Senior Product Designer que trabalha com produto de IA, SaaS e early-stage.
Ele tem um trabalho: fazer alguém que nunca me viu decidir, em menos de um minuto, se quer
conversar. Posicionamento em uma frase: *"I design AI products people actually understand."*

Bilíngue: EN é o padrão (`/`), PT-BR em `/pt`. Texto PT ocupa 20-30% mais espaço que EN — todo
layout tem que tolerar a quebra.

## 2. A regra que define a estética

**O site é monocromático por decisão, e o movimento é o acento.**

Toda cor do sistema tem croma 0 em OKLCH — é uma escala de cinza pura. A única exceção é o bege
de `.section-light` (`oklch(0.955 0.008 83)`). Não há cor de marca, e isso é o ponto: quem carrega
interesse é o tipo grande, o vazio e o movimento, não uma paleta.

Consequência prática: **introduzir uma cor saturada quebra o sistema inteiro.** Se algo precisa de
destaque, ele ganha tamanho, contraste ou movimento — nunca cor.

## 3. Tema — dark é o site, light é uma seção

`<html className="dark">` é fixo no layout. Não existe toggle de tema e não deve existir.

O claro aparece só como **inversão de seção**, via `.section-light`, que redefine os tokens de cor
para valores claros — todo componente dentro inverte sozinho. Usar a classe na seção; nunca
recolorir componente na mão para simular claro.

## 4. Tokens

Definidos em `src/app/globals.css`. Base shadcn mais três superfícies próprias.

- **Superfície**: `surface-1`, `surface-2`, `surface-3` — profundidade por luminosidade.
- **Texto**: `foreground` e `muted-foreground`. Só dois níveis. Terceiro nível de texto não existe
  neste site; se a informação precisa de um, ela provavelmente não precisa estar ali.
- **Borda**: no dark é `oklch(1 0 0 / 10%)` — branco com alfa, não cinza sólido. Manter assim para
  a borda respirar sobre qualquer superfície.
- **Raio**: tudo deriva de `--radius: 0.625rem`. Usar `radius-sm` a `radius-4xl`, nunca px cru.
- **Fonte**: Geist e Geist Mono, carregadas por `next/font`. Nenhuma outra família entra.

## 5. Tipografia

Desde 05/10/2026 o site não tem nenhum tamanho de fonte arbitrário: tudo usa a escala Tailwind
(`xs` a `9xl`) mais dois degraus próprios, definidos no `@theme` do `globals.css`:

- `text-hero` (40px) e `text-hero-lg` (54px): só o título do hero, que no desktop usa `text-7xl`.

Regras:

- **Nenhum `text-[...]`.** Se falta um degrau, o problema é a escala: criar um token nomeado pelo
  papel no `@theme`, como os do hero, e registrar aqui.
- Etiquetas em maiúsculas (meta) usam `text-xs`, não 11px.
- **Um tamanho display por seção**, no máximo. Se tudo é grande, nada é.
- Corpo de texto vive em `text-sm` e `text-base`. `text-xs` é meta, não é corpo.

## 6. Composição

- **Uma ideia por seção.** Rolagem longa com respiro vale mais que seção densa.
- **Densidade varia entre seções.** Sequência de blocos com o mesmo peso visual é o defeito mais
  fácil de cometer num portfólio — checar com zoom em 25%.
- **Grid de cards idênticos é proibido.** Projeto tem hierarquia: um puxa a vista, os outros
  recuam.
- Contraste mínimo WCAG AA (4.5:1) em texto. Sobre o bege da seção clara, conferir de novo — é
  onde quebra.

### Imagem de case

- **Recorte de tela ou de artefato, nunca o slide inteiro.** Cabeçalho, título em serifa e fundo
  do deck ficam fora: dentro do site eles viram uma segunda identidade visual competindo com a
  Geist.
- Imagem que mostra número interno (misclick, conversão, receita) é recortada antes de entrar.
- As posições `[2]` e `[4]` aparecem lado a lado: as duas precisam ter proporção parecida, senão
  o par fica com alturas diferentes.

## 7. Movimento

Stack: Lenis (scroll suave), cursor customizado, dot grid, shader plane, magnetic, typewriter,
scroll reveal, horizontal scroll.

- **Movimento serve à leitura**, não ao portfólio de efeitos. Efeito que atrasa a compreensão sai.
- Toda animação de entrada respeita `prefers-reduced-motion`.
- O cursor customizado esconde o cursor nativo (`html.cursor-none`). Qualquer elemento clicável
  precisa continuar legível como clicável sem ele — nunca depender só do cursor para indicar
  afordância.
- Efeito pesado (shader, canvas) não roda em seção que já tem texto competindo por atenção.

## 8. Copy

- EN é a voz principal; PT-BR é tradução, não texto novo.
- Primeira pessoa, direta, sem terceira pessoa institucional.
- Fato e número no lugar de adjetivo. "8+ anos" e o nome do produto valem mais que "apaixonado por
  experiências".
- **Exceção: métrica interna de empresa ou cliente não entra em case.** Sem o número, o resultado
  é descrito pelo que mudou ("ficaram raros", "mais do que nos eventos anteriores"), nunca com
  valor inventado ou estimado.
- Rodar o checklist de vícios de linguagem de IA em todo texto antes de publicar: travessão de
  ritmo, "não é X, é Y", buzzword, hedging, regra de três genérica, frases todas do mesmo tamanho.

## 9. Proibições

- Cor saturada em qualquer lugar que não seja o bege de `.section-light`.
- Toggle de tema.
- Valor arbitrário novo de tipografia (`text-[...]`).
- Família de fonte além de Geist.
- Grid de cards idênticos.
- Emoji na interface.
- px cru onde existe token de raio ou espaçamento.
- Movimento que bloqueia leitura ou ignora `prefers-reduced-motion`.
- Slide de apresentação inteiro como imagem de case.
- Métrica interna de empresa ou cliente em case.

## 10. Dívida conhecida

- `:root` (tema claro global) tem `surface-1/2/3` com valores escuros. Como o site força `.dark`,
  isso nunca aparece — mas é uma armadilha se alguém remover a classe do `<html>`.
- `components.json` tem `"registries": {}`. Quando houver componente próprio reutilizável, vale
  virar registry para o agente instalar em vez de reescrever.

---

*Escrito em 24/08/2026 a partir de `src/app/globals.css`, `src/app/layout.tsx` e varredura de
classes em `src/`. Método: regra por restrição, não por descrição.*

*05/10/2026: `chart-1` a `chart-5` removidos do `globals.css` (não tinham uso); regras de imagem
de case e de métrica interna adicionadas a partir do case Eventos Online.*
