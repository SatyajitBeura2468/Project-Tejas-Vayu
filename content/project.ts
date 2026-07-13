export const projectIdentity = {
  name: "Project Tejasvayu",
  displayName: "PROJECT TEJASVAYU",
  tagline: "The city does not need more spaces. It needs smarter surfaces.",
  summary:
    "A student-led exploration of how nano-anatase titanium dioxide, ultraviolet activation and existing urban surfaces could work together to reduce selected airborne pollutants.",
};

export const evolutionStages = [
  "School science idea",
  "Hackathon innovation",
  "Student research project",
  "Future startup concept",
] as const;

export const innovationPillars = [
  "Existing infrastructure as active area",
  "Larger available surface area",
  "Low-cost prototype architecture",
  "Sensor-supported comparison",
  "Scalable smart-city vision",
] as const;

export type PrototypeComponent = {
  name: string;
  description: string;
  quantity?: string;
};

export const prototypeComponents: PrototypeComponent[] = [
  {
    name: "Nano-anatase titanium dioxide",
    description: "The active photocatalytic coating applied to selected internal surfaces and the active house model.",
  },
  {
    name: "Arduino Uno R3",
    description: "The controller that reads sensor output, supports display logic and communicates with a connected computer.",
    quantity: "1",
  },
  {
    name: "MQ-135 sensor modules",
    description: "Low-cost metal-oxide semiconductor modules used to observe relative mixed-gas response in each chamber.",
    quantity: "2",
  },
  {
    name: "12 V UV LED strip",
    description: "The enclosed prototype activation source for the TiO₂-coated chamber; its exact wavelength has not been verified.",
    quantity: "1",
  },
  {
    name: "12 V brushless DC fans",
    description: "Circulation fans used to distribute the chamber atmosphere and encourage comparable sensor exposure and surface contact.",
    quantity: "2",
  },
  {
    name: "Optional 16 × 2 LCD",
    description: "An optional local display for comparative sensor readings.",
    quantity: "1",
  },
  {
    name: "Connected computer",
    description: "An alternative or extended readout for numerical and graphical visualisation—not a live Version 1 website connection.",
  },
  {
    name: "Dual glass chambers",
    description: "Isolated test environments with an approximate 30 cm × 30 cm footprint for untreated and activated conditions.",
    quantity: "2",
  },
];

export const constructionSteps = [
  "Prepare two comparable glass chambers and model bases.",
  "Place an equivalent house model in each chamber.",
  "Position one MQ-135 sensor near the base of each chamber.",
  "Position one circulation fan near the front of each chamber.",
  "Apply nano-anatase TiO₂ coating only to the designated active chamber surfaces and active house model.",
  "Install the enclosed UV LED strip in the active chamber.",
  "Connect Arduino, sensor modules, optional display, computer and separate 12 V loads.",
  "Seal the chambers and prepare the controlled comparison protocol.",
] as const;

export const safetyPoints = [
  "Keep UV light enclosed and never look directly into active UV LEDs.",
  "Power off the apparatus before opening or adjusting the active chamber.",
  "Use only a controlled, minimal and supervised test input; avoid inhaling emissions.",
  "Ventilate after opening and test with adult or teacher supervision.",
  "Check electrical connections before energising the apparatus.",
  "Manage the 5 V electronics and 12 V load circuits correctly.",
] as const;

export const mechanismStages = [
  {
    title: "Photon arrival",
    copy: "Suitable ultraviolet energy is absorbed by the semiconductor surface.",
    equation: "TiO₂ + hν → e⁻ + h⁺",
  },
  {
    title: "Charge separation",
    copy: "Energy promotes an electron and leaves a positive hole at the activated surface.",
    equation: "TiO₂ + hν → e⁻ + h⁺",
  },
  {
    title: "Reactive species",
    copy: "Surface reactions with oxygen and moisture can form reactive oxygen species.",
    equation: "h⁺ + H₂O → •OH + H⁺\ne⁻ + O₂ → O₂•⁻",
  },
  {
    title: "Surface oxidation",
    copy: "Pollutant molecules reaching the surface may follow an oxidation pathway whose efficiency and products depend on the conditions.",
    equation: "Pollutant + reactive oxygen species\n→ oxidised intermediates\n→ simpler products under suitable conditions",
  },
] as const;

export const methodologySteps = [
  { title: "Preparation", detail: "Warm the MQ-135 modules according to their documentation, allow readings to stabilise, confirm both channels and seal comparable chambers." },
  { title: "Baseline", detail: "Observe a stable baseline for approximately 60 seconds before pollutant introduction." },
  { title: "Test input", detail: "Introduce a small controlled input through the temporary lower access point and reseal the chamber." },
  { title: "Mixing", detail: "Use the fans briefly to distribute the chamber atmosphere; no precise mixing duration is claimed." },
  { title: "Activation", detail: "Switch on the enclosed UV strip in the active chamber after introduction." },
  { title: "Observation", detail: "Stop fans during the current decay-observation phase and compare relative sensor trends over time." },
  { title: "Iteration", detail: "The prototype was refined through approximately 50 iterative trials, not 50 laboratory-grade replicates." },
] as const;

export const futureStages = [
  "Two-chamber prototype",
  "Better-calibrated experimental platform",
  "School or hospital pilot wall",
  "Bus stops and road dividers",
  "Larger urban pilot zone",
  "Smart-city deployment concept in Odisha",
] as const;

export const futureInitiatives = [
  "Better calibrated and more selective sensors",
  "Larger controlled chambers",
  "Equalised pollutant introduction",
  "Equivalent lighting controls",
  "Outdoor pilot surfaces",
  "Sunlight-based activation studies",
  "IoT monitoring",
  "School or hospital pilot",
  "Bus stops and road dividers",
  "Odisha smart-city testing",
  "Improved catalyst formulations",
  "Durability and weathering studies",
  "Binder and substrate compatibility",
  "Environmental by-product analysis",
  "AI-assisted performance optimisation",
  "Long-term cost and maintenance studies",
] as const;

export const validationNeeds = [
  "Sensor selectivity",
  "Sensor calibration",
  "Equal pollutant dosing",
  "Equivalent illumination",
  "Repeated controlled trials",
  "Environmental temperature and humidity",
  "Coating durability",
  "Surface fouling",
  "Outdoor airflow",
  "Catalyst adhesion",
  "Possible reaction intermediates",
  "Real-world scale",
  "Energy needs",
  "Maintenance",
  "Cost",
  "Independent validation",
] as const;
