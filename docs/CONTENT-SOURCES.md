# Content and source policy

## Evidence model

All scientific or statistical claims visible on the site should be traceable to `content/sources.ts`. A source record includes:

- stable local identifier;
- title and publishing organisation;
- publication year and separate data year where relevant;
- HTTPS URL or explicit internal project record;
- access date;
- the exact claims it is allowed to support;
- institutional, peer-reviewed, manufacturer or project-record type.

The `/sources` route renders that registry directly. Updating a statistic therefore requires updating its source record and any dependent typed content together.

## Current registry

| Purpose | Source |
| --- | --- |
| India air-pollution burden | *State of Global Air 2025*, data year 2023 |
| Indian city clean-air actions and PM₁₀ progress | Central Pollution Control Board Annual Report 2022–23 |
| Guideline pollutants and PM₂.₅ reference | WHO Global Air Quality Guidelines 2021 |
| TiO₂ mechanism | Schneider et al., *Chemical Reviews* (2014) |
| Urban NOₓ remediation context | Irga et al., *Catalysts* (2021) |
| Cementitious material factors | *Nanomaterials* review (2019) |
| MQ-135 operating limits | Winsen MQ135 manual, version 1.4 |
| Arduino hardware description | Arduino UNO R3 documentation |
| Prototype milestones | Project Tejasvayu supplied observation notes |

## Version 1 observation policy

The chart is not a transcription of raw instrument logs. It is a normalised visual reconstruction designed to preserve the supplied story:

- both chamber responses begin near an approximate baseline of 100;
- the controlled input lasts approximately five seconds;
- the relative peak is around eight seconds;
- separation becomes noticeable later in the observation window;
- the active chamber returns near baseline at approximately four minutes;
- the control returns near baseline at approximately ten minutes.

Every results surface must retain a visible “not raw instrument logs” notice and link to the methodology or limitations. No AQI label, gas concentration, percentage removal, formal uncertainty interval or real-time status may be inferred from these values.

## Editorial rules

Use “could,” “may,” “observed” and “under suitable conditions” where the evidence is exploratory. Do not describe the project as proven outdoor remediation, certified construction material, a medical intervention or a production IoT system.

For future updates:

1. Confirm the primary or peer-reviewed source.
2. Record publication year and data year separately.
3. Add only supported claims to the registry.
4. Update the relevant content module.
5. Extend content-integrity tests when new evidence or routes are introduced.
