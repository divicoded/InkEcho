import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uColor;
  uniform float uIntensity;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv - 0.5;
    p.x *= uResolution.x / max(uResolution.y, 1.0);

    float t = uTime * 0.05;

    // Domain-warped fbm for a flowing, ink-in-water feel.
    vec2 q = vec2(fbm(p * 2.0 + vec2(0.0, t)), fbm(p * 2.0 + vec2(5.2, -t * 0.8)));
    vec2 r = vec2(
      fbm(p * 2.0 + 3.0 * q + vec2(1.7, 9.2) + t * 0.4),
      fbm(p * 2.0 + 3.0 * q + vec2(8.3, 2.8) - t * 0.3)
    );
    float n = fbm(p * 2.5 + 4.0 * r);

    // Aurora bands drifting across the field.
    float band = sin((uv.y * 3.0 + r.x * 2.5 + t * 2.0)) * 0.5 + 0.5;
    float band2 = sin((uv.x * 2.0 - r.y * 2.0 - t * 1.3)) * 0.5 + 0.5;

    float ink = smoothstep(0.15, 0.95, n * 0.7 + band * 0.15 + band2 * 0.15);

    vec3 col = uColor * (ink * 0.55 + band * 0.12 + band2 * 0.08);
    col += uColor * pow(ink, 3.0) * 0.7;
    col += mix(uColor, vec3(1.0), 0.4) * pow(band * band2, 2.0) * 0.25;

    // Subtle film grain to keep gradients from banding.
    float grain = (hash(uv * uResolution + t) - 0.5) * 0.04;
    col += grain;

    float vig = smoothstep(1.3, 0.2, length(p));
    col *= vig;
    col *= uIntensity;

    gl_FragColor = vec4(col, 1.0);
  }
`

function InkPlane({ rgb }: { rgb: string }) {
  const matRef = useRef<THREE.ShaderMaterial>(null)

  const target = useMemo(() => {
    const parts = rgb.split(',').map((v) => Number(v.trim()))
    const r = parts[0] ?? 200
    const g = parts[1] ?? 200
    const b = parts[2] ?? 200
    return new THREE.Color(r / 255, g / 255, b / 255)
  }, [rgb])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uColor: { value: new THREE.Color(0.8, 0.8, 0.8) },
      uIntensity: { value: 0.55 },
    }),
    []
  )

  useFrame((state, delta) => {
    const mat = matRef.current
    if (!mat) return
    mat.uniforms.uTime.value += delta
    ;(mat.uniforms.uColor.value as THREE.Color).lerp(target, 0.025)
    mat.uniforms.uResolution.value.set(state.size.width, state.size.height)
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

export default function InkShader({ rgb }: { rgb: string }) {
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 1] }}
      >
        <InkPlane rgb={rgb} />
      </Canvas>
    </div>
  )
}
