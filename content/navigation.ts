export type NavigationItem = {
  label: string;
  href: string;
  shortLabel?: string;
};

export const primaryNavigation: NavigationItem[] = [
  { label: "Concept", href: "/#concept" },
  { label: "Prototype", href: "/prototype" },
  { label: "Science", href: "/science" },
  { label: "Method", href: "/methodology" },
  { label: "Results", href: "/results" },
  { label: "Team", href: "/team" },
  { label: "Future", href: "/future" },
];

export const modeNavigation: NavigationItem[] = [
  { label: "Overview", href: "/" },
  { label: "Scientific Mode", shortLabel: "Science", href: "/science" },
  { label: "Judge Mode", shortLabel: "Judge", href: "/judge" },
  { label: "Dashboard Preview", shortLabel: "Replay", href: "/dashboard" },
];

export const mobileNavigation: NavigationItem[] = [
  { label: "Overview", href: "/" },
  ...primaryNavigation,
  { label: "Dashboard Preview", href: "/dashboard" },
  { label: "Judge Mode", href: "/judge" },
  { label: "Sources", href: "/sources" },
];
