"use client";

/**
 * ShaderPlane — primeiro contato com shader (WebGL via react-three-fiber).
 *
 * Um plano cobre a tela inteira, e um FRAGMENT SHADER calcula a cor de cada
 * pixel na GPU. Aqui: duas ondas cruzadas que se movem com o tempo, criando
 * um padrão de interferência animado.
 *
 * Conceitos:
 *  - uniform  = um valor que o JS envia pro shader (aqui, uTime = o relógio)
 *  - varying  = um valor que o vertex shader passa pro fragment (aqui, vUv)
 *  - vUv      = a coordenada do pixel, de 0 a 1 em x e y
 *  - o fragment shader roda UMA VEZ POR PIXEL, em paralelo na placa de vídeo
 */

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";

// Vertex shader: posiciona o quad na tela inteira e repassa as uv.
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// Fragment shader: a cor de cada pixel. É aqui que mora a "mágica".
const fragmentShader = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;

  void main() {
    vec2 uv = vUv;

    // duas ondas se movendo em direções diferentes
    float w1 = sin(uv.x * 10.0 + uTime);
    float w2 = sin(uv.y * 10.0 + uTime * 1.3);

    // somadas, elas criam um padrão de interferência (-1 a 1)
    float pattern = (w1 + w2) * 0.5;

    // smoothstep suaviza o contraste do padrão
    float v = smoothstep(-0.3, 0.9, pattern);

    // mistura duas cores conforme o padrão
    vec3 dark = vec3(0.04, 0.04, 0.06);
    vec3 light = vec3(0.45, 0.55, 0.95);
    vec3 color = mix(dark, light, v);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function ShaderMesh() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  // A cada frame, atualiza o uTime com o relógio -> o shader "anima"
  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh>
      {/* plano 2x2 = cobre o clip space inteiro (tela cheia) */}
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function ShaderPlane() {
  // WebGL só existe no navegador: monta o Canvas apenas depois do mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Canvas gl={{ antialias: true }} dpr={[1, 2]}>
      <ShaderMesh />
    </Canvas>
  );
}
