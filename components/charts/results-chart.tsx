"use client";

import { resultMilestones } from "@/content/results";
import { reconstructAt } from "@/lib/results";

type ResultsChartProps = {
  currentSeconds?: number;
  dark?: boolean;
  compact?: boolean;
  focus?: "both" | "control" | "active";
  showLabels?: boolean;
  zoomed?: boolean;
};

const WIDTH = 960;
const HEIGHT = 410;
const PAD = { left: 72, right: 30, top: 54, bottom: 66 };
const Y_MIN = 98;
const Y_MAX = 118;

function xAtIndex(index: number) {
  return PAD.left + (index / (resultMilestones.length - 1)) * (WIDTH - PAD.left - PAD.right);
}

function yFor(value: number) {
  return PAD.top + ((Y_MAX - value) / (Y_MAX - Y_MIN)) * (HEIGHT - PAD.top - PAD.bottom);
}

function pathFor(key: "control" | "active") {
  return resultMilestones.map((point, index) => `${index === 0 ? "M" : "L"}${xAtIndex(index).toFixed(1)},${yFor(point[key]).toFixed(1)}`).join(" ");
}

function cursorX(seconds: number) {
  const right = resultMilestones.findIndex((item) => item.seconds >= seconds);
  if (right <= 0) return xAtIndex(0);
  const left = resultMilestones[right - 1];
  const next = resultMilestones[right];
  const amount = (seconds - left.seconds) / (next.seconds - left.seconds || 1);
  return xAtIndex(right - 1) + amount * (xAtIndex(right) - xAtIndex(right - 1));
}

export function ResultsChart({ currentSeconds = 600, dark = false, compact = false, focus = "both", showLabels = true, zoomed = false }: ResultsChartProps) {
  const current = reconstructAt(currentSeconds);
  const x = cursorX(currentSeconds);
  const id = dark ? "active-gradient-dark" : "active-gradient";

  return (
    <figure className={`results-chart${dark ? " is-dark" : ""}${compact ? " is-compact" : ""}${zoomed ? " is-zoomed" : ""}`} data-curve-focus={focus} style={{ "--chart-cursor-x": `${(x / WIDTH) * 100}%` } as React.CSSProperties}>
      <div className="chart-notice">
        <strong>Observation-based normalised reconstruction</strong>
        <span>Not raw instrument logs</span>
      </div>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-labelledby="chart-title chart-desc">
        <title id="chart-title">Normalised comparison of relative sensor response over time</title>
        <desc id="chart-desc">Both curves remain close at 30 seconds. A slight difference appears by 60 seconds and becomes clear by two minutes. The active chamber returns near baseline around four minutes, while the control returns near baseline around ten minutes. The chart reconstructs qualitative observations and is not raw instrument data.</desc>
        <defs>
          <linearGradient id={id} x1="0" x2="1">
            <stop offset="0" stopColor="#a78bfa" />
            <stop offset="0.68" stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#34d399" />
          </linearGradient>
        </defs>
        {[100, 105, 110, 115].map((tick) => (
          <g key={tick}>
            <line className="chart-grid" x1={PAD.left} x2={WIDTH - PAD.right} y1={yFor(tick)} y2={yFor(tick)} />
            <text className="chart-tick" x={PAD.left - 14} y={yFor(tick) + 4} textAnchor="end">{tick}</text>
          </g>
        ))}
        {resultMilestones.map((point, index) => (
          <g key={point.id}>
            <line className="chart-grid chart-grid-vertical" x1={xAtIndex(index)} x2={xAtIndex(index)} y1={PAD.top} y2={HEIGHT - PAD.bottom} />
            <text className="chart-tick" x={xAtIndex(index)} y={HEIGHT - PAD.bottom + 24} textAnchor="middle" opacity={showLabels ? 1 : 0}>
              {point.label.replace(" seconds", "s").replace(" minutes", "m")}
            </text>
          </g>
        ))}
        <text className="chart-axis" x={WIDTH / 2} y={HEIGHT - 14} textAnchor="middle">Time after introduction</text>
        <text className="chart-axis" transform={`translate(20 ${HEIGHT / 2}) rotate(-90)`} textAnchor="middle">Relative sensor response</text>
        <g className="chart-data-layer">
        <path className="chart-line chart-line-control" d={pathFor("control")} pathLength={1} style={{ strokeDashoffset: Math.max(0, 1 - currentSeconds / 600) }} />
        <path className="chart-line chart-line-active" d={pathFor("active")} pathLength={1} style={{ stroke: `url(#${id})`, strokeDashoffset: Math.max(0, 1 - currentSeconds / 600) }} />
        {resultMilestones.map((point, index) => (
          <g key={`${point.id}-points`} opacity={point.seconds <= currentSeconds ? 1 : 0.22}>
            <circle className="chart-point chart-point-control" cx={xAtIndex(index)} cy={yFor(point.control)} r={4.5} />
            <circle className="chart-point chart-point-active" cx={xAtIndex(index)} cy={yFor(point.active)} r={4.5} />
          </g>
        ))}
        {currentSeconds < 600 && (
          <g className="chart-cursor">
            <line x1={x} x2={x} y1={PAD.top} y2={HEIGHT - PAD.bottom} />
            <circle cx={x} cy={yFor(current.control)} r={7} className="cursor-control" />
            <circle cx={x} cy={yFor(current.active)} r={7} className="cursor-active" />
          </g>
        )}
        </g>
      </svg>
      <figcaption className="chart-legend">
        <span><i className="legend-control" />Control chamber</span>
        <span><i className="legend-active" />Project Tejasvayu chamber</span>
      </figcaption>
    </figure>
  );
}
