"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { resolveReducedMotion, type MotionPreference } from "@/lib/motion";

type MotionContextValue = {
  preference: MotionPreference;
  reduced: boolean;
  toggle: () => void;
  setPreference: (preference: MotionPreference) => void;
};

const MotionContext = createContext<MotionContextValue | null>(null);
const STORAGE_KEY = "tejasvayu-motion-preference";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreferenceState] = useState<MotionPreference>("system");
  const [systemReduced, setSystemReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSystemReduced(media.matches);
    const frame = requestAnimationFrame(() => {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "system" || saved === "full" || saved === "reduced") setPreferenceState(saved);
      update();
    });
    media.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(frame);
      media.removeEventListener("change", update);
    };
  }, []);

  const reduced = resolveReducedMotion(preference, systemReduced);

  useEffect(() => {
    document.documentElement.dataset.reducedMotion = String(reduced);
  }, [reduced]);

  const setPreference = useCallback((next: MotionPreference) => {
    setPreferenceState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggle = useCallback(() => setPreference(reduced ? "full" : "reduced"), [reduced, setPreference]);
  const value = useMemo(() => ({ preference, reduced, toggle, setPreference }), [preference, reduced, toggle, setPreference]);

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export function useMotionPreference() {
  const context = useContext(MotionContext);
  if (!context) throw new Error("useMotionPreference must be used inside MotionProvider");
  return context;
}
