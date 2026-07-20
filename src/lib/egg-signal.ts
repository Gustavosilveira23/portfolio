/**
 * Sinal leve de comunicação entre o EasterEgg (foto) e o DotGrid (fundo).
 *
 * O EasterEgg reporta onde o rosto está na tela (hotspot, em coordenadas de
 * viewport) e se está revelado. O DotGrid lê isso a cada frame pra fazer os
 * pontos daquela região pulsarem (a isca) enquanto o egg está fechado.
 *
 * É um objeto mutável simples de propósito: evita re-render do React e é lido
 * dentro do loop de animação do dot-grid sem custo.
 */
export type EggHotspot = { x: number; y: number; r: number } | null;

export const eggSignal: { hotspot: EggHotspot; revealed: boolean } = {
  hotspot: null,
  revealed: false,
};
