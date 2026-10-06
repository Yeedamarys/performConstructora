import { useEffect, useLayoutEffect, useMemo, useRef, type MutableRefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { BLOCK_DEPTH, DEPTH_TICKS, MAX_DEPTH, STRATA, Y_PER_M, type Stratum } from './strata';

export interface SceneLabels {
  ticks: (HTMLElement | null)[];
  names: (HTMLElement | null)[];
  tip: HTMLElement | null;
  readout: HTMLElement | null;
}

interface Props {
  /** Target drilling depth in metres, written by the scroll handler. */
  depthTarget: MutableRefObject<number>;
  labels: MutableRefObject<SceneLabels>;
  active: boolean;
  lowPower: boolean;
  onReady: () => void;
}

const BLOCK_W = 3;
const BLOCK_D = 2.2;
const AUGER_R = 0.34;
const SHAFT_R = 0.085;
const AUGER_LEN = BLOCK_DEPTH * Y_PER_M + 0.6;
const VIEW_H = 4.6; // ≈23 m of profile visible at once
const MIN_VIEW_W = 5.6; // block + side face + label gutters

/* ---------- procedural materials ---------- */

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function stratumTexture(s: Stratum, seed: number) {
  const size = 256;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d')!;
  const r = rng(seed);
  g.fillStyle = s.color;
  g.fillRect(0, 0, size, size);

  // Bedding: faint horizontal bands give the layer its sedimentary read.
  for (let i = 0; i < 9; i++) {
    g.globalAlpha = 0.06 + r() * 0.08;
    g.fillStyle = r() > 0.5 ? s.grain : '#ffffff';
    g.fillRect(0, r() * size, size, 2 + r() * 6);
  }
  // Grain speckle.
  for (let i = 0; i < 2600; i++) {
    g.globalAlpha = 0.25 + r() * 0.4;
    g.fillStyle = r() > 0.82 ? '#f3e9d8' : s.grain;
    g.fillRect(r() * size, r() * size, 1 + r() * 1.6, 1 + r() * 1.6);
  }
  if (s.pebbles) {
    for (let i = 0; i < 70; i++) {
      const x = r() * size, y = r() * size, rx = 2 + r() * 6, ry = rx * (0.55 + r() * 0.35);
      g.globalAlpha = 0.9;
      g.fillStyle = ['#6d675e', '#9b958a', '#57524b', '#b3ab9d'][Math.floor(r() * 4)];
      g.beginPath();
      g.ellipse(x, y, rx, ry, r() * Math.PI, 0, Math.PI * 2);
      g.fill();
      g.globalAlpha = 0.35;
      g.fillStyle = '#ffffff';
      g.beginPath();
      g.ellipse(x - rx * 0.3, y - ry * 0.3, rx * 0.35, ry * 0.3, 0, 0, Math.PI * 2);
      g.fill();
    }
  }
  if (s.cracks) {
    g.strokeStyle = '#2c2f31';
    for (let i = 0; i < 14; i++) {
      g.globalAlpha = 0.35 + r() * 0.35;
      g.lineWidth = 0.6 + r() * 1.2;
      g.beginPath();
      let x = r() * size, y = r() * size;
      g.moveTo(x, y);
      for (let k = 0; k < 5; k++) {
        x += (r() - 0.5) * 50;
        y += (r() - 0.3) * 30;
        g.lineTo(x, y);
      }
      g.stroke();
    }
  }
  g.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  return tex;
}

/** Helicoid flight: a ribbon wound around the shaft, dipping slightly at its outer edge. */
function flightGeometry(yStart: number, yEnd: number, pitch: number) {
  const segPerTurn = 40;
  const steps = Math.ceil(((yEnd - yStart) / pitch) * segPerTurn);
  const pos: number[] = [];
  const idx: number[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / segPerTurn) * Math.PI * 2;
    const y = yStart + (i / segPerTurn) * pitch;
    const cs = Math.cos(t), sn = Math.sin(t);
    pos.push(SHAFT_R * cs, y, SHAFT_R * sn, AUGER_R * cs, y - 0.025, AUGER_R * sn);
    if (i < steps) {
      const a = i * 2;
      idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
}

const flightSteel = new THREE.MeshStandardMaterial({ color: '#8d969c', metalness: 0.88, roughness: 0.34, side: THREE.DoubleSide });
const shaftSteel = new THREE.MeshStandardMaterial({ color: '#6f787e', metalness: 0.92, roughness: 0.28 });
const amber = new THREE.MeshStandardMaterial({ color: '#8d4b00', metalness: 0.35, roughness: 0.45 });
const deep = new THREE.MeshStandardMaterial({ color: '#004d62', metalness: 0.4, roughness: 0.5 });
const boreMat = new THREE.MeshStandardMaterial({ color: '#2a221b', roughness: 1 });
const spoilMat = new THREE.MeshStandardMaterial({ color: '#8a7257', roughness: 1 });

/* ---------- scene pieces ---------- */

function Environment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.55;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

function SoilBlock() {
  const layers = useMemo(
    () =>
      STRATA.map((s, i) => {
        const h = (Math.min(s.to, BLOCK_DEPTH) - s.from) * Y_PER_M;
        const tex = stratumTexture(s, 17 + i * 31);
        tex.repeat.set(BLOCK_W / 1.2, Math.max(h / 1.2, 0.3));
        const mat = new THREE.MeshStandardMaterial({
          map: tex,
          bumpMap: tex,
          bumpScale: 1.6,
          roughness: s.cracks ? 0.78 : 0.96,
          metalness: 0,
        });
        return { s, h, y: -(s.from * Y_PER_M) - h / 2, mat, tex };
      }),
    [],
  );
  useEffect(() => () => layers.forEach((l) => { l.mat.dispose(); l.tex.dispose(); }), [layers]);

  return (
    <group position={[0, 0, -BLOCK_D / 2]}>
      {layers.map((l) => (
        <mesh key={l.s.name} position={[0, l.y, 0]} material={l.mat} receiveShadow>
          <boxGeometry args={[BLOCK_W, l.h, BLOCK_D]} />
        </mesh>
      ))}
    </group>
  );
}

function Rig({ depth }: { depth: MutableRefObject<number> }) {
  const auger = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const bore = useRef<THREE.Mesh>(null);
  const spoil = useRef<THREE.Mesh>(null);
  const lastDepth = useRef(depth.current);
  const flights = useMemo(() => flightGeometry(0.16, AUGER_LEN - 0.7, 0.26), []);
  useEffect(() => () => flights.dispose(), [flights]);

  useFrame((_, dt) => {
    const d = depth.current;
    const tipY = -d * Y_PER_M;
    auger.current!.position.y = tipY;

    // Spin faster while actually advancing; idle rotation keeps it alive.
    const speed = Math.abs(d - lastDepth.current) / Math.max(dt, 1e-3);
    lastDepth.current = d;
    spin.current!.rotation.y -= (0.9 + Math.min(speed, 30) * 0.45) * dt;

    const b = bore.current!;
    b.scale.y = Math.max(d * Y_PER_M, 0.0001);
    b.position.y = tipY / 2;
    const p = d / MAX_DEPTH;
    spoil.current!.scale.set(0.3 + 0.75 * p, 0.06 + 0.26 * p, 0.3 + 0.75 * p);
  });

  return (
    <>
      {/* Leader mast stands on the ground behind the auger */}
      <mesh position={[0, 4.6, -0.55]} material={deep} castShadow>
        <boxGeometry args={[0.2, 9.2, 0.2]} />
      </mesh>
      {/* Back wall of the bore, exposed by the section cut */}
      <mesh ref={bore} position={[0, 0, 0.004]} material={boreMat} receiveShadow>
        <planeGeometry args={[AUGER_R * 2.15, 1]} />
      </mesh>
      {/* Spoil heap grows as material is lifted out */}
      <mesh ref={spoil} material={spoilMat} castShadow receiveShadow>
        <coneGeometry args={[1, 1, 28, 1, false, Math.PI, Math.PI]} />
      </mesh>
      <group ref={auger}>
        <group ref={spin}>
          <mesh position={[0, AUGER_LEN / 2, 0]} material={shaftSteel} castShadow>
            <cylinderGeometry args={[SHAFT_R, SHAFT_R, AUGER_LEN, 16]} />
          </mesh>
          <mesh geometry={flights} material={flightSteel} castShadow />
          <mesh position={[0, 0.08, 0]} rotation={[Math.PI, 0, 0]} material={shaftSteel} castShadow>
            <coneGeometry args={[SHAFT_R * 1.6, 0.18, 16]} />
          </mesh>
        </group>
        {/* Rotary drive head arrives at the surface at full depth */}
        <mesh position={[0, AUGER_LEN + 0.28, 0]} material={amber} castShadow>
          <boxGeometry args={[0.9, 0.56, 0.62]} />
        </mesh>
      </group>
    </>
  );
}

/** Smooths depth, frames the camera on the drilling front, and pins DOM labels to the scene. */
function Director({ target, smoothed, labels, onReady }: {
  target: MutableRefObject<number>;
  smoothed: MutableRefObject<number>;
  labels: MutableRefObject<SceneLabels>;
  onReady: () => void;
}) {
  const { camera, size } = useThree();
  const key = useRef<THREE.DirectionalLight>(null);
  const v = useMemo(() => new THREE.Vector3(), []);
  const readoutText = useRef('');
  const ready = useRef(false);

  useLayoutEffect(() => {
    (camera as THREE.PerspectiveCamera).fov = 28;
    camera.updateProjectionMatrix();
  }, [camera]);

  useFrame((_, dt) => {
    smoothed.current += (target.current - smoothed.current) * (1 - Math.exp(-dt * 5));
    const d = smoothed.current;
    const p = d / MAX_DEPTH;

    // Frame ~22 m of profile, widening the shot on narrow canvases.
    const cam = camera as THREE.PerspectiveCamera;
    const halfTan = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2));
    const aspect = size.width / size.height;
    const dist = Math.max(VIEW_H / (2 * halfTan), MIN_VIEW_W / (2 * halfTan * aspect));
    const viewH = 2 * dist * halfTan;
    const top = -viewH / 2 + 1.05;
    const bottom = -BLOCK_DEPTH * Y_PER_M + viewH / 2 - 0.05;
    const cy = THREE.MathUtils.lerp(top, bottom, p);
    // Three-quarter view from above-right: front section, top and side faces all read.
    cam.position.set(dist * 0.36, cy + dist * 0.2, dist * 0.93);
    cam.lookAt(0.35, cy - 0.15, -BLOCK_D / 2);

    if (key.current) {
      key.current.position.set(-3.5, cy + 5, 6);
      key.current.target.position.set(0, cy, -0.5);
      key.current.target.updateMatrixWorld();
    }

    // DOM labels follow their scene anchors.
    const project = (y: number, x = 0, z = 0) => {
      v.set(x, y, z).project(cam);
      return { x: (v.x * 0.5 + 0.5) * size.width, y: (-v.y * 0.5 + 0.5) * size.height };
    };
    const L = labels.current;
    DEPTH_TICKS.forEach((m, i) => {
      const el = L.ticks[i];
      if (!el) return;
      const { x, y } = project(-m * Y_PER_M, -BLOCK_W / 2);
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      el.style.opacity = y < 10 || y > size.height - 44 ? '0' : '1';
    });
    STRATA.forEach((s, i) => {
      const el = L.names[i];
      if (!el) return;
      const mid = (s.from + Math.min(s.to, MAX_DEPTH)) / 2;
      const { x, y } = project(-mid * Y_PER_M, BLOCK_W / 2, -BLOCK_D);
      // Keep the chip inside narrow canvases; width is measured once, not per frame.
      const w = Number(el.dataset.w) || (el.dataset.w = String(el.offsetWidth + 12), el.offsetWidth + 12);
      const cx = Math.min(x, size.width - w - 4);
      el.style.transform = `translate3d(${cx.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      el.style.opacity = y < 16 || y > size.height - 48 ? '0' : '1';
      el.dataset.active = d >= s.from && d < s.to ? 'true' : 'false';
    });
    if (L.tip) {
      const { x, y } = project(-d * Y_PER_M, AUGER_R);
      L.tip.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    }
    const text = `${d.toFixed(1)} m`;
    if (L.readout && text !== readoutText.current) {
      readoutText.current = text;
      L.readout.textContent = text;
    }
    if (!ready.current) {
      ready.current = true;
      onReady();
    }
  });

  return (
    <>
      <hemisphereLight args={['#e3edf3', '#5b4a39', 0.7]} />
      <directionalLight
        ref={key}
        intensity={2.4}
        color="#fff4e6"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
        shadow-camera-left={-3.5}
        shadow-camera-right={3.5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
      />
      <directionalLight position={[6, 1, 4]} intensity={0.55} color="#cfe3ff" />
    </>
  );
}

export default function HeroScene({ depthTarget, labels, active, lowPower, onReady }: Props) {
  const smoothed = useRef(depthTarget.current);
  return (
    <Canvas
      style={{ position: 'absolute', inset: 0 }}
      frameloop={active ? 'always' : 'never'}
      dpr={[1, lowPower ? 1.5 : 2]}
      shadows={lowPower ? false : 'soft'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [1.5, 0, 10], fov: 28, near: 0.1, far: 60 }}
      aria-hidden="true"
    >
      <Environment />
      <Director target={depthTarget} smoothed={smoothed} labels={labels} onReady={onReady} />
      <SoilBlock />
      <Rig depth={smoothed} />
    </Canvas>
  );
}
