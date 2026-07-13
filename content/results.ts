export type ResultMilestone = {
  id: string;
  seconds: number;
  label: string;
  observation: string;
  control: number;
  active: number;
};

export const resultMilestones: ResultMilestone[] = [
  { id: "baseline", seconds: 0, label: "Baseline", observation: "Both chamber responses were observed near the approximate baseline of 100.", control: 100, active: 100 },
  { id: "introduction", seconds: 5, label: "Introduction", observation: "A small controlled test input was introduced for approximately five seconds.", control: 102, active: 102 },
  { id: "peak", seconds: 8, label: "Peak", observation: "The relative response reached its approximate peak around eight seconds.", control: 116, active: 116 },
  { id: "30s", seconds: 30, label: "30 seconds", observation: "Both chambers showed only a very small decline; their difference remained minimal.", control: 113, active: 112 },
  { id: "60s", seconds: 60, label: "60 seconds", observation: "A slight but noticeable difference began to appear.", control: 108, active: 102 },
  { id: "2m", seconds: 120, label: "2 minutes", observation: "The difference between the two response trends was visually clear.", control: 110, active: 104 },
  { id: "4m", seconds: 240, label: "4 minutes", observation: "The active chamber had returned near baseline while the control remained elevated.", control: 106, active: 101 },
  { id: "10m", seconds: 600, label: "10 minutes", observation: "The control chamber returned near baseline around this point.", control: 101, active: 100 },
];

export const resultInterpretation =
  "Across the observed prototype trials, the activated chamber generally showed a faster decline in relative sensor response than the untreated chamber. The result is encouraging, but larger controlled trials, calibrated instrumentation and improved variable isolation are required before drawing quantitative conclusions.";

export const reconstructionNotice = {
  title: "Observation-based normalised reconstruction",
  detail: "Not raw instrument logs",
};
