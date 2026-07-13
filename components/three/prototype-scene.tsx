"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { BoxGeometry, type Group, type MeshStandardMaterial } from "three";
import { useMotionPreference } from "@/components/motion/motion-provider";

export type PrototypeView = "exterior" | "airflow" | "components";

function House({ active, componentView }: { active: boolean; componentView: boolean }) {
  return (
    <group position={[0.25, -0.55, -0.3]} scale={componentView ? 1.05 : 1}>
      <mesh castShadow>
        <boxGeometry args={[1.05, 0.75, 0.95]} />
        <meshStandardMaterial color={active ? "#dbe7ef" : "#718092"} roughness={0.76} emissive={active ? "#130f28" : "#000000"} />
      </mesh>
      <mesh position={[0, 0.56, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.9, 0.58, 4]} />
        <meshStandardMaterial color={active ? "#b8cfe0" : "#536274"} roughness={0.82} />
      </mesh>
      <mesh position={[0, -0.12, 0.485]}>
        <planeGeometry args={[0.22, 0.42]} />
        <meshStandardMaterial color="#071a2b" />
      </mesh>
    </group>
  );
}

function Fan({ active, reduced }: { active: boolean; reduced: boolean }) {
  const rotor = useRef<Group>(null);
  useFrame((_, delta) => {
    if (!rotor.current || reduced) return;
    rotor.current.rotation.x += delta * (active ? 1.75 : 0.82);
  });
  return (
    <group position={[-0.85, -0.84, 0.72]} rotation={[0, Math.PI / 2, 0]}>
      <mesh>
        <cylinderGeometry args={[0.43, 0.43, 0.17, 30]} />
        <meshStandardMaterial color="#152d40" metalness={0.7} roughness={0.28} />
      </mesh>
      <group ref={rotor}>
        {[0, 1, 2, 3].map((blade) => (
          <mesh key={blade} position={[0.1, 0, 0]} rotation={[Math.PI / 2, 0, blade * (Math.PI / 2)]}>
            <boxGeometry args={[0.06, 0.55, 0.15]} />
            <meshStandardMaterial color="#9db3c6" metalness={0.4} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Sensor() {
  return (
    <group position={[0.92, -1.03, 0.75]}>
      <mesh><boxGeometry args={[0.55, 0.08, 0.42]} /><meshStandardMaterial color="#146b84" metalness={0.35} /></mesh>
      <mesh position={[0, 0.16, 0]}><cylinderGeometry args={[0.15, 0.15, 0.26, 24]} /><meshStandardMaterial color="#bac8d3" metalness={0.8} roughness={0.2} /></mesh>
    </group>
  );
}

function AirflowMarkers({ active, reduced, visible }: { active: boolean; reduced: boolean; visible: boolean }) {
  const group = useRef<Group>(null);
  const markers = active ? 9 : 6;
  useFrame(({ clock }) => {
    if (!group.current || reduced || !visible) return;
    group.current.children.forEach((child, index) => {
      const phase = ((clock.elapsedTime * (active ? 0.2 : 0.11) + index / markers) % 1) * Math.PI * 2;
      child.position.x = Math.cos(phase) * 1.05;
      child.position.y = Math.sin(phase) * 0.42 - 0.05;
      child.position.z = Math.sin(phase * 1.6) * 0.6;
    });
  });
  if (!visible) return null;
  return (
    <group ref={group}>
      {Array.from({ length: markers }, (_, index) => (
        <mesh key={index} position={[Math.cos(index) * 0.8, Math.sin(index) * 0.3, 0]}>
          <sphereGeometry args={[active ? 0.045 : 0.038, 10, 10]} />
          <meshBasicMaterial color={active ? "#67e8f9" : "#22a8c3"} transparent opacity={active ? 0.82 : 0.48} />
        </mesh>
      ))}
    </group>
  );
}

function PollutantParticles({ active, reduced, count }: { active: boolean; reduced: boolean; count: number }) {
  const group = useRef<Group>(null);
  const positions = useMemo(() => Array.from({ length: count }, (_, index) => ({
    x: -1.2 + ((index * 0.73) % 2.4),
    y: -0.85 + ((index * 0.41) % 1.7),
    z: -1.05 + ((index * 0.57) % 2.1),
  })), [count]);

  useFrame(({ clock }, delta) => {
    if (!group.current || reduced) return;
    group.current.children.forEach((child, index) => {
      const speed = active ? 0.13 : 0.065;
      child.position.y += delta * speed;
      child.position.x += Math.sin(clock.elapsedTime * 0.65 + index) * delta * 0.035;
      if (child.position.y > 1.05) child.position.y = -1.05;
    });
  });

  return (
    <group ref={group}>
      {positions.map((position, index) => {
        const reacted = active && index % 5 === 0;
        return (
          <mesh key={index} position={[position.x, position.y, position.z]}>
            <sphereGeometry args={[index % 3 === 0 ? 0.055 : 0.04, 8, 8]} />
            <meshStandardMaterial color={reacted ? "#34d399" : active ? "#b8a4d8" : "#7d8794"} emissive={reacted ? "#0d3b2d" : "#000000"} transparent opacity={reacted ? 0.62 : 0.46} />
          </mesh>
        );
      })}
    </group>
  );
}

function Chamber({ active, position, reduced, view, mobile }: { active: boolean; position: [number, number, number]; reduced: boolean; view: PrototypeView; mobile: boolean }) {
  const uv = useRef<MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (!uv.current || reduced) return;
    uv.current.emissiveIntensity = 2.5 + Math.sin(clock.elapsedTime * 1.35) * 0.5;
  });
  const frameColor = active ? "#a78bfa" : "#67e8f9";
  const airflowVisible = view !== "exterior";
  return (
    <group position={position}>
      <mesh receiveShadow>
        <boxGeometry args={[3.25, 2.8, 3.05]} />
        <meshPhysicalMaterial color={active ? "#8b5cf6" : "#78b9d0"} transmission={0.92} transparent opacity={view === "components" ? 0.055 : 0.12} roughness={0.08} thickness={0.18} metalness={0.04} ior={1.32} />
      </mesh>
      <lineSegments><edgesGeometry args={[new BoxGeometry(3.25, 2.8, 3.05)]} /><lineBasicMaterial color={frameColor} transparent opacity={view === "components" ? 0.88 : 0.6} /></lineSegments>
      <House active={active} componentView={view === "components"} />
      <Fan active={active} reduced={reduced} />
      <Sensor />
      {active && (
        <>
          <mesh position={[0, 1.2, 0]}><boxGeometry args={[2.45, 0.09, 0.18]} /><meshStandardMaterial ref={uv} color="#b794f6" emissive="#7c3aed" emissiveIntensity={3} /></mesh>
          <pointLight position={[0, 0.75, 0]} color="#8b5cf6" intensity={mobile ? 4.5 : 6.5} distance={5} />
          <mesh position={[0.25, -0.55, -0.79]}><planeGeometry args={[1.08, 0.78]} /><meshStandardMaterial color="#6ee7b7" emissive="#0c4a3a" emissiveIntensity={0.45} transparent opacity={0.32} /></mesh>
        </>
      )}
      {airflowVisible && <>
        <Line points={[[-1.1, -0.2, 0.8], [-0.3, 0.65, 0.45], [0.8, 0.4, 0.05], [1.1, -0.2, 0.55]]} color="#22d3ee" lineWidth={view === "airflow" ? 2 : 1.2} transparent opacity={view === "airflow" ? 0.9 : 0.58} />
        <Line points={[[1.1, -0.2, 0.55], [0.25, -0.65, -0.15], [-0.95, -0.55, 0.35]]} color="#67e8f9" lineWidth={view === "airflow" ? 1.4 : 0.8} transparent opacity={view === "airflow" ? 0.72 : 0.35} />
      </>}
      <AirflowMarkers active={active} reduced={reduced} visible={airflowVisible} />
      <PollutantParticles active={active} reduced={reduced} count={mobile ? (active ? 8 : 6) : (active ? 16 : 12)} />
    </group>
  );
}

function CitySilhouette() {
  return (
    <group position={[0, -0.25, -4.2]}>
      {Array.from({ length: 13 }, (_, index) => (
        <mesh key={index} position={[-6 + index, -0.15 + ((index * 3) % 4) * 0.25, 0]}>
          <boxGeometry args={[0.7, 1.1 + ((index * 5) % 4) * 0.52, 0.45]} />
          <meshStandardMaterial color="#0c2638" transparent opacity={0.62} roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

function SceneContents({ reduced, view, variant, mobile, inspectable }: { reduced: boolean; view: PrototypeView; variant: "hero" | "inspection"; mobile: boolean; inspectable: boolean }) {
  const group = useRef<Group>(null);
  const pointer = useThree((state) => state.pointer);

  useFrame(({ clock }) => {
    if (!group.current || reduced) return;
    if (!inspectable) {
      group.current.rotation.y += (pointer.x * 0.075 - group.current.rotation.y) * 0.025;
      group.current.rotation.x += (-pointer.y * 0.028 - group.current.rotation.x) * 0.025;
    }
    group.current.position.y = Math.sin(clock.elapsedTime * 0.3) * (mobile ? 0.018 : 0.035);
    if (variant === "hero" && !mobile) {
      group.current.position.x = Math.sin(clock.elapsedTime * 0.18) * 0.1;
      const driftScale = 1 + Math.cos(clock.elapsedTime * 0.16) * 0.006;
      group.current.scale.setScalar(driftScale);
    }
  });

  return (
    <>
      <CitySilhouette />
      <group ref={group} rotation={[0.04, -0.04, 0]} position={[0, 0.05, 0]}>
        <Chamber active={false} position={[-2, 0, 0]} reduced={reduced} view={view} mobile={mobile} />
        <Chamber active position={[2, 0, 0]} reduced={reduced} view={view} mobile={mobile} />
        <mesh position={[0, -1.55, 0]} receiveShadow><boxGeometry args={[8.3, 0.18, 4.4]} /><meshStandardMaterial color="#071a2b" metalness={0.45} roughness={0.42} /></mesh>
        <mesh position={[0, -1.43, 1.75]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[8, 2.3]} /><meshStandardMaterial color="#0b2436" metalness={0.5} roughness={0.3} transparent opacity={mobile ? 0.18 : 0.28} /></mesh>
      </group>
      {inspectable && !mobile && <OrbitControls makeDefault enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.7} maxPolarAngle={Math.PI / 1.8} minAzimuthAngle={-0.38} maxAzimuthAngle={0.38} enableDamping dampingFactor={0.08} />}
    </>
  );
}

export function StaticPrototypeVisual({ view = "exterior" }: { view?: PrototypeView }) {
  return (
    <div className={`static-prototype static-view-${view}`} role="img" aria-label="Two transparent prototype chambers. The active chamber has a violet enclosed UV strip and coated surfaces; both contain a house model, base sensor and front circulation fan.">
      {[false, true].map((active) => (
        <div className={`static-chamber${active ? " is-active" : ""}`} key={String(active)}>
          <span className="static-uv" /><span className="static-house"><i /></span><span className="static-fan" /><span className="static-sensor" />
          <svg viewBox="0 0 240 150" aria-hidden="true"><path d="M24 104C40 32 159 24 207 77S153 139 80 115 35 78 82 60" /></svg>
          <strong>{active ? "TiO₂ + UV activation" : "Untreated control"}</strong>
        </div>
      ))}
    </div>
  );
}

export default function PrototypeScene({ className = "", variant = "inspection", view = "exterior", resetKey = 0, inspectable = false }: { className?: string; variant?: "hero" | "inspection"; view?: PrototypeView; resetKey?: number; inspectable?: boolean }) {
  const { reduced } = useMotionPreference();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)");
    const update = () => setMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const canvas = document.createElement("canvas");
        setWebgl(Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl")));
      } catch { setWebgl(false); }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "160px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => setDocumentVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  const animating = inView && documentVisible;
  return (
    <div className={`prototype-scene ${className}`} ref={wrapperRef} data-rendering={webgl && !reduced ? "webgl" : "static"} data-frame-loop={animating ? "active" : "paused"}>
      {webgl && !reduced ? (
        <Canvas key={resetKey} camera={{ position: [0, 2.1, 10.6], fov: 38 }} dpr={mobile ? 1 : [1, 1.5]} frameloop={animating ? "always" : "never"} gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }} shadows={!mobile}>
          <ambientLight intensity={0.72} />
          <directionalLight position={[2, 7, 5]} intensity={mobile ? 2.2 : 3.2} color="#e7f7ff" castShadow={!mobile} />
          <pointLight position={[-5, 1, 4]} intensity={1.7} color="#22d3ee" />
          <SceneContents reduced={reduced} view={view} variant={variant} mobile={mobile} inspectable={inspectable} />
        </Canvas>
      ) : <StaticPrototypeVisual view={view} />}
      <p className="sr-only">Narrative prototype visual: both chambers contain a house model, MQ-135 sensor near the base, circulation fan toward the front, a sealed enclosure and a lower access point. The active chamber additionally contains TiO₂-coated surfaces and an enclosed UV strip.</p>
    </div>
  );
}
