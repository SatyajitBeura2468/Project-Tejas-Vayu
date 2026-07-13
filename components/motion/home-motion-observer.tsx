"use client";

import { useEffect } from "react";

export function HomeMotionObserver() {
  useEffect(() => {
    document.documentElement.dataset.homePage = "true";
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".home-main > section"));
    if (!("IntersectionObserver" in window)) {
      sections.forEach((section) => { section.dataset.motionActive = "true"; });
      return () => { delete document.documentElement.dataset.homePage; };
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        (entry.target as HTMLElement).dataset.motionActive = String(entry.isIntersecting && document.visibilityState === "visible");
      });
    }, { rootMargin: "24% 0px 24% 0px" });

    sections.forEach((section) => observer.observe(section));
    const visibility = () => {
      if (document.visibilityState === "hidden") {
        sections.forEach((section) => { section.dataset.motionActive = "false"; });
        return;
      }

      sections.forEach((section) => {
        const bounds = section.getBoundingClientRect();
        section.dataset.motionActive = String(bounds.bottom > -window.innerHeight * 0.24 && bounds.top < window.innerHeight * 1.24);
      });
    };
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      delete document.documentElement.dataset.homePage;
    };
  }, []);

  return null;
}
