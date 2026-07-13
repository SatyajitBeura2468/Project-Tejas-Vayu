"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Gauge, Menu, Microscope, PanelsTopLeft, Scale, Waves, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/ui/brand-mark";
import { mobileNavigation, modeNavigation, primaryNavigation } from "@/content/navigation";
import { useMotionPreference } from "@/components/motion/motion-provider";

const modeIcons = [PanelsTopLeft, Microscope, Scale, Gauge];

export function SiteHeader() {
  const pathname = usePathname();
  const { reduced, toggle } = useMotionPreference();
  const [homeDocked, setHomeDocked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (pathname !== "/") return;
    const update = () => setHomeDocked(window.scrollY > Math.max(520, window.innerHeight * 0.72));
    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, [pathname]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (menuOpen && !dialog.open) dialog.showModal();
    if (!menuOpen && dialog.open) {
      dialog.close();
      menuButtonRef.current?.focus();
    }
  }, [menuOpen]);

  if (pathname === "/judge") return null;
  const docked = pathname !== "/" || homeDocked;

  return (
    <>
      <header className={`site-header${docked ? " is-docked" : ""}`}>
        <div className="site-header-inner">
          <Link href="/" aria-label="Project Tejasvayu home" className="brand-link"><BrandMark compact={docked} /></Link>
          <nav aria-label="Primary navigation" className="desktop-primary-nav">
            {(docked ? modeNavigation : primaryNavigation).map((item, index) => {
              const Icon = modeIcons[index];
              return (
                <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                  {docked && Icon && <Icon size={16} aria-hidden="true" />}
                  <span>{docked ? item.shortLabel ?? item.label : item.label}</span>
                  {pathname === item.href && <motion.i className="nav-active-indicator" layoutId="navigation-active-indicator" transition={{ type: "spring", stiffness: 260, damping: 28 }} />}
                </Link>
              );
            })}
          </nav>
          {!docked && <Link className="judge-link" href="/judge">Judge mode <ArrowRight size={16} aria-hidden="true" /></Link>}
          <div className="mobile-header-actions">
            <button className="motion-compact" onClick={toggle} aria-pressed={reduced} aria-label={reduced ? "Enable full motion" : "Reduce motion"}>
              <Waves size={18} aria-hidden="true" />
            </button>
            <button ref={menuButtonRef} className="menu-button" onClick={() => setMenuOpen(true)} aria-expanded={menuOpen} aria-controls="mobile-menu">
              <Menu size={22} aria-hidden="true" /><span>Menu</span>
            </button>
          </div>
        </div>
      </header>

      <dialog id="mobile-menu" ref={dialogRef} className="mobile-menu" onClose={() => setMenuOpen(false)} onCancel={() => setMenuOpen(false)}>
        <div className="mobile-menu-head">
          <BrandMark />
          <button onClick={() => setMenuOpen(false)} className="mobile-menu-close" autoFocus>
            <X aria-hidden="true" /><span>Close</span>
          </button>
        </div>
        <button className="mobile-motion-toggle" onClick={toggle} aria-pressed={reduced}>
          <Waves aria-hidden="true" /><span>{reduced ? "Reduced motion on" : "Reduce motion"}</span><span className="toggle-state" aria-hidden="true" />
        </button>
        <nav aria-label="Mobile navigation">
          {mobileNavigation.map((item, index) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} onClick={() => setMenuOpen(false)} style={{ "--menu-index": index } as React.CSSProperties}>
                <span>{item.label}</span><ArrowRight size={18} aria-hidden="true" />
              </Link>
            );
          })}
        </nav>
      </dialog>
    </>
  );
}
