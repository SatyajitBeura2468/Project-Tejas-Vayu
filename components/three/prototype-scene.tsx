"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { BoxGeometry, type Group } from "three";
import { useMotionPreference } from "@/components/motion/motion-provider";

function House({ active }: { active: boolean }) {
  return (
    <group position={[0.25, -0.55, -0.3]}>
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

function Fan() {
  return (
    <group position={[-0.85, -0.84, 0.72]} rotation={[0, Math.PI / 2, 0]}>
      <mesh>
        <cylinderGeometry args={[0.43, 0.43, 0.17, 30]} />
        <meshStandardMaterial color="#152d40" metalness={0.7} roughness={0.28} />
      </mesh>
      {[0, 1, 2, 3].map((blade) => (
        <mesh key={blade} position={[0.1, 0, 0]} rotation={[Math.PI / 2, 0, blade * (Math.PI / 2)]}>
          <boxGeometry args={[0.06, 0.55, 0.15]} />
          <meshStandardMaterial color="#9db3c6" metalness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function Sensor() {
  return (
    <group position={[0.92, -1.03, 0.75]}>
      <mesh>
        <boxGeometry args={[0.55, 0.08, 0.42]} />
        <meshStandardMaterial color="#146b84" metalness={0.35} />
      </mesh>
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.26, 24]} />
        <meshStandardMaterial color="#bac8d3" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function Chamber({ active, position }: { active: boolean; position: [number, number, number] }) {
  const frameColor = active ? "#a78bfa" : "#67e8f9";
  return (
    <group position={position}>
      <mesh receiveShadow>
        <boxGeometry args={[3.25, 2.8, 3.05]} />
        <meshPhysicalMaterial color={active ? "#8b5cf6" : "#78b9d0"} transmission={0.9} transparent opacity={0.12} roughness={0.08} thickness={0.16} metalness={0.05} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new BoxGeometry(3.25, 2.8, 3.05)]} />
        <lineBasicMaterial color={frameColor} transparent opacity={0.65} />
      </lineSegments>
      <House active={active} />
      <Fan />
      <Sensor />
      {active && (
        <>
          <mesh position={[0, 1.2, 0]}>
            <boxGeometry args={[2.45, 0.09, 0.18]} />
            <meshStandardMaterial color="#b794f6" emissive="#7c3aed" emissiveIntensity={3.2} />
          </mesh>
          <pointLight position={[0, 0.75, 0]} color="#8b5cf6" intensity={7} distance={5} />
        </>
      )}
      <Line points={[[-1.1, -0.2, 0.8], [-0.3, 0.65, 0.45], [0.8, 0.4, 0.05], [1.1, -0.2, 0.55]]} color="#22d3ee" lineWidth={1.4} transparent opacity={0.75} />
      <Line points={[[1.1, -0.2, 0.55], [0.25, -0.65, -0.15], [-0.95, -0.55, 0.35]]} color="#67e8f9" lineWidth={0.9} transparent opacity={0.45} />
    </group>
  );
}

function SceneContents({ reduced }: { reduced: boolean }) {
  const group = useRef<Group>(null);
  const pointer = useThree((state) => state.pointer);
  useFrame(({ clock }) => {
    if (!group.current || reduced) return;
    group.current.rotation.y += (pointer.x * 0.07 - group.current.rotation.y) * 0.035;
    group.current.rotation.x += (-pointer.y * 0.025 - group.current.rotation.x) * 0.035;
    group.current.position.y = Math.sin(clock.elapsedTime * 0.32) * 0.04;
  });

  return (
    <group ref={group} rotation={[0.04, -0.04, 0]} position={[0, 0.05, 0]}>
      <Chamber active={false} position={[-2, 0, 0]} />
      <Chamber active position={[2, 0, 0]} />
      <mesh position={[0, -1.55, 0]} receiveShadow>
        <boxGeometry args={[8.3, 0.18, 4.4]} />
        <meshStandardMaterial color="#071a2b" metalness={0.45} roughness={0.45} />
      </mesh>
    </group>
  );
}

export function StaticPrototypeVisual() {
  return (
    <div className="static-prototype" role="img" aria-label="Two transparent prototype chambers. The active chamber has a violet enclosed UV strip and coated surfaces; both contain a house model, base sensor and front circulation fan.">
      {[false, true].map((active) => (
        <div className={`static-chamber${active ? " is-active" : ""}`} key={String(active)}>
          <span className="static-uv" />
          <span className="static-house"><i /></span>
          <span className="static-fan" />
          <span className="static-sensor" />
          <svg viewBox="0 0 240 150" aria-hidden="true"><path d="M24 104C40 32 159 24 207 77S153 139 80 115 35 78 82 60" /></svg>
          <strong>{active ? "TiO₂ + UV activation" : "Untreated control"}</strong>
        </div>
      ))}
    </div>
  );
}

export default function PrototypeScene({ className = "" }: { className?: string }) {
  const { reduced } = useMotionPreference();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const canvas = document.createElement("canvas");
        setWebgl(Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl")));
      } catch {
        setWebgl(false);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { rootMargin: "160px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`prototype-scene ${className}`} ref={wrapperRef}>
      {webgl && !reduced ? (
        <Canvas camera={{ position: [0, 2.1, 10.6], fov: 38 }} dpr={[1, 1.5]} frameloop={active ? "always" : "never"} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} shadows>
          <ambientLight intensity={0.7} />
          <directionalLight position={[2, 7, 5]} intensity={3.2} color="#e7f7ff" castShadow />
          <pointLight position={[-5, 1, 4]} intensity={2} color="#22d3ee" />
          <SceneContents reduced={reduced} />
        </Canvas>
      ) : (
        <StaticPrototypeVisual />
      )}
      <p className="sr-only">Narrative prototype visual: both chambers contain a house model, MQ-135 sensor near the base, circulation fan toward the front, a sealed enclosure and a lower access point. The active chamber additionally contains TiO₂-coated surfaces and an enclosed UV strip.</p>
    </div>
  );
}
