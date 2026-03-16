"use client";

import { motion } from "framer-motion";

interface RadarData {
  identyfikacja: number;
  positioning: number;
  oferta: number;
  content: number;
  marketing: number;
  team: number;
}

interface RadarChartProps {
  data: RadarData;
  highlight: string; // nazwa głównej dziedziny
}

const LABELS = [
  { key: "identyfikacja", label: "Identyfikacja" },
  { key: "positioning", label: "Positioning" },
  { key: "oferta", label: "Oferta" },
  { key: "content", label: "Content" },
  { key: "marketing", label: "Marketing" },
  { key: "team", label: "Team" },
] as const;

const SIZE = 200;
const CENTER = SIZE / 2;
const MAX_RADIUS = 75;
const LEVELS = 5;

function polarToCartesian(angle: number, radius: number) {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

export function RadarChart({ data, highlight }: RadarChartProps) {
  const keys = LABELS.map(l => l.key);
  const angleStep = 360 / keys.length;

  // Grid polygons
  const gridPolygons = Array.from({ length: LEVELS }, (_, i) => {
    const r = (MAX_RADIUS * (i + 1)) / LEVELS;
    const points = keys.map((_, j) => {
      const { x, y } = polarToCartesian(j * angleStep, r);
      return `${x},${y}`;
    }).join(" ");
    return points;
  });

  // Data polygon
  const dataPoints = keys.map((key, i) => {
    const value = data[key as keyof RadarData];
    const r = (value / 10) * MAX_RADIUS;
    return polarToCartesian(i * angleStep, r);
  });
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        {/* Grid */}
        {gridPolygons.map((points, i) => (
          <polygon
            key={i}
            points={points}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        ))}

        {/* Axes */}
        {keys.map((_, i) => {
          const { x, y } = polarToCartesian(i * angleStep, MAX_RADIUS);
          return (
            <line
              key={i}
              x1={CENTER} y1={CENTER}
              x2={x} y2={y}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon */}
        <motion.path
          d={dataPath}
          fill="rgba(250,204,21,0.15)"
          stroke="rgba(250,204,21,0.8)"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.3 }}
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
        />

        {/* Labels */}
        {LABELS.map((item, i) => {
          const { x, y } = polarToCartesian(i * angleStep, MAX_RADIUS + 18);
          const isHighlight = item.label.toLowerCase() === highlight.toLowerCase();
          return (
            <text
              key={i}
              x={x} y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="9"
              fontWeight={isHighlight ? "700" : "400"}
              fill={isHighlight ? "rgb(250,204,21)" : "rgba(255,255,255,0.5)"}
            >
              {item.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
