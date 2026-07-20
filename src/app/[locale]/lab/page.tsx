/**
 * Rota de teste isolada — /lab
 * Sandbox pra experimentar efeitos antes de levar pro site real.
 * O smooth scroll (Lenis) agora vem do layout, então esta página já o herda —
 * não precisa (nem pode) ter o próprio wrapper, senão dois Lenis brigam pela janela.
 */

import { ShaderPlane } from "@/components/shader-plane";

const panels = [
  {
    n: "01",
    title: "Role a página",
    note: "Compare com uma aba normal do site. Aqui o scroll tem inércia — ele desacelera em vez de parar seco.",
  },
  {
    n: "02",
    title: "Sinta o peso",
    note: "Esse 'peso' é o parâmetro LERP no componente. Menor = mais manteiga; maior = mais responsivo.",
  },
  {
    n: "03",
    title: "Roda do mouse vs. trackpad",
    note: "Teste os dois. O multiplicador da roda e do toque são ajustáveis separadamente.",
  },
  {
    n: "04",
    title: "O dot-grid continua ancorado",
    note: "Repare no fundo de pontos: ele acompanha o scroll certinho, porque o Lenis rola o scroll real da janela.",
  },
  {
    n: "05",
    title: "Acessibilidade",
    note: "Se ativar 'reduzir movimento' no sistema, o Lenis nem liga — o scroll volta a ser o nativo.",
  },
  {
    n: "06",
    title: "Chegou ao fim",
    note: "Se a sensação agradou, o próximo passo é mover o SmoothScroll pro layout e aplicar no site inteiro.",
  },
];

export default function LabPage() {
  return (
    <>
      {/* Selo fixo indicando que é ambiente de teste */}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-1.5 rounded-full border border-border bg-surface-2/80 backdrop-blur text-[11px] uppercase tracking-[1.5px] text-muted-foreground">
        Lab · Sandbox de testes
      </div>

      {/* Shader — primeiro contato com WebGL */}
      <section className="min-h-screen flex flex-col justify-center px-8 md:px-20 py-24">
        <span className="text-sm font-mono text-muted-foreground mb-4">
          Shader · WebGL
        </span>
        <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-foreground max-w-4xl mb-6">
          Primeiro shader
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mb-10">
          Um plano de tela cheia onde cada pixel é calculado na GPU. As ondas se
          movem com o tempo — tudo definido no fragment shader (GLSL).
        </p>
        <div className="w-full h-[55vh] rounded-2xl overflow-hidden border border-border">
          <ShaderPlane />
        </div>
      </section>

      <div>
        {panels.map((panel, i) => (
          <section
            key={panel.n}
            className={`min-h-screen flex flex-col justify-center px-8 md:px-20 ${
              i % 2 === 0 ? "bg-transparent" : "bg-surface-2/40"
            }`}
          >
            <span className="text-sm font-mono text-muted-foreground mb-4">
              {panel.n} / 06
            </span>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-foreground max-w-4xl mb-6">
              {panel.title}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              {panel.note}
            </p>
          </section>
        ))}
      </div>
    </>
  );
}
