export type TeamMember = {
  name: string;
  initials: string;
  role: string;
  focus: string;
  leader?: boolean;
};

export const team: TeamMember[] = [
  {
    name: "Satyajit Beura",
    initials: "SB",
    role: "Founder and Lead Innovator",
    focus: "Oversees the primary theoretical framework, foundational research and strategic vision of the project.",
    leader: true,
  },
  {
    name: "Amit Ku. Panigrahi",
    initials: "AP",
    role: "Project Lead and Technical Director",
    focus: "Manages technical architecture, execution logistics and functional system deployment.",
  },
  {
    name: "Ansuman Dakua",
    initials: "AD",
    role: "Head of Project Design",
    focus: "Responsible for structural layouts, technical blueprinting and physical design integration.",
  },
  {
    name: "Nabin Sahu",
    initials: "NS",
    role: "Aesthetic Director and Creative Lead",
    focus: "Directs visual presentation, creative concept formatting and the overall aesthetic architecture of the project display.",
  },
];
