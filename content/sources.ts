export type SourceRecord = {
  id: string;
  title: string;
  organisation: string;
  publicationYear: number;
  dataYear?: number;
  url: string;
  accessedOn: string;
  supportedClaims: string[];
  kind: "institutional" | "peer-reviewed" | "manufacturer" | "project-record";
};

export const sources: SourceRecord[] = [
  {
    id: "soga-2025",
    title: "State of Global Air 2025",
    organisation: "Health Effects Institute, IHME and NCD Alliance",
    publicationYear: 2025,
    dataYear: 2023,
    url: "https://www.stateofglobalair.org/sites/default/files/documents/2025-10/soga-2025-report.pdf",
    accessedOn: "2026-07-13",
    supportedClaims: ["More than 2 million deaths were estimated to be attributable to air pollution in India in 2023.", "India and China together accounted for 52% of global air-pollution-attributable deaths in 2023."],
    kind: "institutional",
  },
  {
    id: "cpcb-2022-23",
    title: "Annual Report 2022–23",
    organisation: "Central Pollution Control Board, Government of India",
    publicationYear: 2023,
    dataYear: 2023,
    url: "https://cpcb.nic.in/openpdffile.php?id=UmVwb3J0RmlsZXMvMTY2OV8xNzI3NDE0NTc1X21lZGlhcGhvdG8yOTAyNy5wZGY%3D",
    accessedOn: "2026-07-13",
    supportedClaims: ["Clean Air City Action Plans covered 131 identified non-attainment and million-plus cities.", "In 2022–23, 87 of those cities showed lower PM₁₀ than in 2017–18; 14 met the national annual PM₁₀ standard."],
    kind: "institutional",
  },
  {
    id: "who-aqg-2021",
    title: "WHO global air quality guidelines",
    organisation: "World Health Organization",
    publicationYear: 2021,
    url: "https://www.who.int/publications/i/item/9789240034228",
    accessedOn: "2026-07-13",
    supportedClaims: ["The WHO annual guideline value for PM₂.₅ is 5 µg/m³.", "PM₂.₅, PM₁₀, ozone, nitrogen dioxide, sulfur dioxide and carbon monoxide are major guideline pollutants."],
    kind: "institutional",
  },
  {
    id: "schneider-2014",
    title: "Understanding TiO₂ Photocatalysis: Mechanisms and Materials",
    organisation: "Chemical Reviews",
    publicationYear: 2014,
    url: "https://doi.org/10.1021/cr5001892",
    accessedOn: "2026-07-13",
    supportedClaims: ["Suitable photon energy can create electron–hole pairs in TiO₂.", "Surface oxygen and moisture participate in pathways that form reactive species."],
    kind: "peer-reviewed",
  },
  {
    id: "irga-2021",
    title: "A Review of Photocatalytic Materials for Urban NOₓ Remediation",
    organisation: "Catalysts",
    publicationYear: 2021,
    url: "https://doi.org/10.3390/catal11060675",
    accessedOn: "2026-07-13",
    supportedClaims: ["TiO₂-based materials have been studied for urban NOₓ and selected VOC abatement.", "Field performance varies widely and requires site-specific testing, durability assessment and by-product consideration."],
    kind: "peer-reviewed",
  },
  {
    id: "cement-review-2019",
    title: "TiO₂-based Photocatalytic Cementitious Composites",
    organisation: "Nanomaterials",
    publicationYear: 2019,
    url: "https://doi.org/10.3390/nano9101444",
    accessedOn: "2026-07-13",
    supportedClaims: ["Binder type, pore structure, coverage, curing and surface conditions influence photocatalytic construction materials.", "Coatings and bulk incorporation are both studied approaches for building materials."],
    kind: "peer-reviewed",
  },
  {
    id: "mq135-manual",
    title: "MQ135 Air Quality Detection Gas Sensor Manual, Version 1.4",
    organisation: "Zhengzhou Winsen Electronics Technology Co., Ltd.",
    publicationYear: 2015,
    url: "https://www.winsen-sensor.com/d/files/semiconductor/mq135.pdf",
    accessedOn: "2026-07-13",
    supportedClaims: ["The MQ-135 is a semiconductor gas sensor based on a heated tin-dioxide sensing layer.", "Its response is cross-sensitive to multiple gases and needs calibration for quantitative use."],
    kind: "manufacturer",
  },
  {
    id: "arduino-uno-r3",
    title: "Arduino UNO R3 hardware documentation",
    organisation: "Arduino",
    publicationYear: 2026,
    url: "https://docs.arduino.cc/hardware/uno-rev3",
    accessedOn: "2026-07-13",
    supportedClaims: ["The Arduino Uno R3 is an ATmega328P-based microcontroller board with analogue inputs and USB connectivity."],
    kind: "manufacturer",
  },
  {
    id: "project-observations",
    title: "Project Tejasvayu prototype observation notes",
    organisation: "Project Tejasvayu",
    publicationYear: 2026,
    url: "/results#observation-notice",
    accessedOn: "2026-07-13",
    supportedClaims: ["The supplied qualitative milestones and approximate return-to-baseline times used in the normalised reconstruction."],
    kind: "project-record",
  },
];

export function getSource(id: string): SourceRecord {
  const source = sources.find((item) => item.id === id);
  if (!source) throw new Error(`Unknown source: ${id}`);
  return source;
}

export const indiaEvidence = [
  {
    value: ">2 million",
    label: "estimated air-pollution-attributable deaths",
    geography: "India",
    dataYear: 2023,
    publicationYear: 2025,
    sourceId: "soga-2025",
  },
  {
    value: "131 cities",
    label: "covered by Clean Air City Action Plans",
    geography: "India",
    dataYear: 2023,
    publicationYear: 2023,
    sourceId: "cpcb-2022-23",
  },
  {
    value: "87 cities",
    label: "showed lower PM₁₀ than their 2017–18 level",
    geography: "India",
    dataYear: 2023,
    publicationYear: 2023,
    sourceId: "cpcb-2022-23",
  },
] as const;
