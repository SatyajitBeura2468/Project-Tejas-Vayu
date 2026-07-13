"use client";

import { useEffect, useState } from "react";

const DESKTOP_STORY_QUERY = "(min-width: 1101px)";

export function useDesktopStory() {
  const [desktopStory, setDesktopStory] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_STORY_QUERY);
    const update = () => setDesktopStory(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return desktopStory;
}
