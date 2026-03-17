"use client";

import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/* SVG helpers                                                          */
/* ------------------------------------------------------------------ */

/** Convert data points to SVG polyline points string (0,0 origin = bottom-left) */
function toPoints(data: [number, number][], w: number, h: number): string {
  return data.map(([x, y]) => `${(x / 100) * w},${h - (y / 100) * h}`).join(" ");
}

/* ------------------------------------------------------------------ */
/* Chart 1 — AI vs Non-AI growth curve                                 */
/* ------------------------------------------------------------------ */
function GrowthCurveChart() {
  const W = 460;
  const H = 200;

  // Non-AI: slow linear growth then plateau
  const noAI: [number, number][] = [
    [0, 5], [10, 8], [20, 12], [30, 15], [40, 18], [50, 20],
    [60, 21], [70, 22], [80, 22], [90, 23], [100, 23],
  ];

  // AI: exponential growth
  const withAI: [number, number][] = [
    [0, 5], [10, 7], [20, 11], [30, 17], [40, 26], [50, 38],
    [60, 52], [70, 65], [80, 78], [90, 89], [100, 97],
  ];

  const noAIPts = toPoints(noAI, W, H);
  const withAIPts = toPoints(withAI, W, H);

  // filled area paths
  const noAIFill = `M0,${H} ` + noAI.map(([x, y]) => `L${(x / 100) * W},${H - (y / 100) * H}`).join(" ") + ` L${W},${H} Z`;
  const withAIFill = `M0,${H} ` + withAI.map(([x, y]) => `L${(x / 100) * W},${H - (y / 100) * H}`).join(" ") + ` L${W},${H} Z`;

  const years = ["Rok 1", "Rok 2", "Rok 3", "Rok 4", "Rok 5"];

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-white font-bold text-lg sm:text-xl leading-tight">
            Firmy z AI rosną eksponencjalnie — firmy bez AI stagnują
          </p>
          <p className="text-white/50 text-sm mt-1">
            Średni wzrost przychodów w branżach usługowych 2022–2027 (McKinsey SMB Report)
          </p>
        </div>
        <div className="flex gap-4 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-themeAccent shrink-0" />
            <span className="text-xs text-white/60">Z AI</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-white/25 shrink-0" />
            <span className="text-xs text-white/60">Bez AI</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/8 bg-white/2 p-4 overflow-hidden">
        <svg viewBox={`0 0 ${W} ${H + 30}`} className="w-full" style={{ maxHeight: 220 }}>
          {/* Grid lines */}
          {[25, 50, 75].map(y => (
            <line
              key={y}
              x1={0} y1={H - (y / 100) * H}
              x2={W} y2={H - (y / 100) * H}
              stroke="rgba(255,255,255,0.06)" strokeWidth={1}
            />
          ))}

          {/* No-AI fill */}
          <defs>
            <linearGradient id="noAIGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            <linearGradient id="aiGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(58,89,209,0.25)" />
              <stop offset="100%" stopColor="rgba(58,89,209,0)" />
            </linearGradient>
          </defs>
          <motion.path d={noAIFill} fill="url(#noAIGrad)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }} viewport={{ once: true }} />
          <motion.path d={withAIFill} fill="url(#aiGrad)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} viewport={{ once: true }} />

          {/* Lines */}
          <motion.polyline points={noAIPts} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth={2} strokeDasharray="6 4" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeOut" }} viewport={{ once: true }} />
          <motion.polyline points={withAIPts} fill="none" stroke="#3A59D1" strokeWidth={2.5} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }} viewport={{ once: true }} />

          {/* End labels */}
          <motion.text x={W - 4} y={H - (23 / 100) * H - 6} textAnchor="end" fontSize={11} fill="rgba(255,255,255,0.45)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.5 }} viewport={{ once: true }}>+23%</motion.text>
          <motion.text x={W - 4} y={H - (97 / 100) * H + 14} textAnchor="end" fontSize={11} fill="#3A59D1" fontWeight="bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.8 }} viewport={{ once: true }}>+97%</motion.text>

          {/* X axis labels */}
          {years.map((label, i) => (
            <text
              key={i}
              x={(i / (years.length - 1)) * W}
              y={H + 20}
              textAnchor="middle"
              fontSize={10}
              fill="rgba(255,255,255,0.3)"
            >
              {label}
            </text>
          ))}
        </svg>
      </div>

      {/* Stat pills */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { val: "4.2×", label: "wyższy wzrost przychodów" },
          { val: "67%", label: "mniej czasu na admin" },
          { val: "2.8×", label: "więcej klientów tym samym teamem" },
        ].map(s => (
          <div key={s.val} className="rounded-xl border border-themeAccent/15 bg-themeAccent/5 p-3 text-center">
            <p className="text-themeAccent font-bold text-xl">{s.val}</p>
            <p className="text-white/50 text-xs mt-0.5 leading-snug">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Chart 2 — Market positioning heatmap                                */
/* ------------------------------------------------------------------ */
function PositioningHeatmap() {
  // Dots: [x=tech adoption 0-100, y=revenue growth 0-100, label, isYou?]
  const dots: { x: number; y: number; label: string; you?: boolean; size?: number }[] = [
    { x: 12, y: 10, label: "Twój sektor avg" },
    { x: 18, y: 14, label: "" },
    { x: 8,  y: 18, label: "" },
    { x: 22, y: 9,  label: "" },
    { x: 15, y: 22, label: "" },
    { x: 30, y: 30, label: "Liderzy branży" },
    { x: 55, y: 52, label: "" },
    { x: 70, y: 68, label: "" },
    { x: 82, y: 75, label: "" },
    { x: 90, y: 88, label: "Top 10%" },
    { x: 95, y: 93, label: "" },
    // "You" dot in the stuck zone
    { x: 20, y: 16, label: "Ty teraz", you: true, size: 10 },
    // Target
    { x: 75, y: 72, label: "Twój cel", size: 9 },
  ];

  const W = 400;
  const H = 220;
  const PAD = 30;

  return (
    <div className="space-y-3">
      <div>
        <p className="text-white font-bold text-lg sm:text-xl leading-tight">
          Gdzie jesteś teraz — a gdzie być powinieneś
        </p>
        <p className="text-white/50 text-sm mt-1">
          Mapa pozycji firm usługowych wg adopcji technologii i wzrostu (n=2 400 firm, 2024)
        </p>
      </div>

      <div className="rounded-xl border border-white/8 bg-white/2 p-4 overflow-hidden">
        <svg viewBox={`0 0 ${W + PAD} ${H + PAD}`} className="w-full" style={{ maxHeight: 240 }}>
          <defs>
            {/* heatmap gradient zones */}
            <radialGradient id="hotZone" cx="85%" cy="15%" r="50%">
              <stop offset="0%" stopColor="rgba(58,89,209,0.18)" />
              <stop offset="100%" stopColor="rgba(58,89,209,0)" />
            </radialGradient>
            <radialGradient id="coldZone" cx="15%" cy="85%" r="45%">
              <stop offset="0%" stopColor="rgba(239,68,68,0.15)" />
              <stop offset="100%" stopColor="rgba(239,68,68,0)" />
            </radialGradient>
          </defs>

          {/* Background heat zones */}
          <rect x={PAD} y={0} width={W} height={H} fill="url(#coldZone)" />
          <rect x={PAD} y={0} width={W} height={H} fill="url(#hotZone)" />

          {/* Grid */}
          {[25, 50, 75].map(v => (
            <g key={v}>
              <line x1={PAD} y1={H - (v / 100) * H} x2={PAD + W} y2={H - (v / 100) * H}
                stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
              <line x1={PAD + (v / 100) * W} y1={0} x2={PAD + (v / 100) * W} y2={H}
                stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
            </g>
          ))}

          {/* Arrow from "Ty" to target */}
          <motion.line
            x1={PAD + (20 / 100) * W + 8} y1={H - (16 / 100) * H - 8}
            x2={PAD + (75 / 100) * W - 10} y2={H - (72 / 100) * H + 10}
            stroke="rgba(58,89,209,0.8)" strokeWidth={2} strokeDasharray="5 3"
            markerEnd="url(#arrow)"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          />
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="rgba(58,89,209,0.8)" />
            </marker>
          </defs>

          {/* Regular dots */}
          {dots.filter(d => !d.you && d.label !== "Twój cel").map((d, i) => (
            <motion.circle
              key={i}
              cx={PAD + (d.x / 100) * W}
              cy={H - (d.y / 100) * H}
              r={d.size ?? 4}
              fill={d.x > 60 ? "rgba(58,89,209,0.5)" : "rgba(255,255,255,0.2)"}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
            />
          ))}

          {/* "Ty teraz" dot */}
          <motion.circle cx={PAD + (20 / 100) * W} cy={H - (16 / 100) * H} r={10}
            fill="rgba(239,68,68,0.3)" stroke="#EF4444" strokeWidth={2}
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ type: "spring", delay: 0.5, bounce: 0.5 }} viewport={{ once: true }} />
          <motion.text x={PAD + (20 / 100) * W + 14} y={H - (16 / 100) * H + 4}
            fontSize={12} fill="#EF4444" fontWeight="bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.6 }} viewport={{ once: true }}>Ty teraz</motion.text>

          {/* Target dot */}
          <motion.circle cx={PAD + (75 / 100) * W} cy={H - (72 / 100) * H} r={9}
            fill="rgba(58,89,209,0.2)" stroke="#3A59D1" strokeWidth={2} strokeDasharray="4 3"
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ type: "spring", delay: 2, bounce: 0.5 }} viewport={{ once: true }} />
          <motion.text x={PAD + (75 / 100) * W + 12} y={H - (72 / 100) * H + 4}
            fontSize={12} fill="#3A59D1" fontWeight="bold" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 2.2 }} viewport={{ once: true }}>Twój cel</motion.text>

          {/* Axis labels */}
          <text x={PAD + W / 2} y={H + PAD - 4} textAnchor="middle" fontSize={10} fill="rgba(255,255,255,0.3)">
            Adopcja technologii →
          </text>
          <text x={10} y={H / 2} textAnchor="middle" fontSize={10} fill="rgba(255,255,255,0.3)"
            transform={`rotate(-90, 10, ${H / 2})`}>
            Wzrost →
          </text>

          {/* Zone labels */}
          <text x={PAD + 10} y={H - 8} fontSize={9} fill="rgba(239,68,68,0.6)" fontWeight="bold">
            STREFA STAGNACJI
          </text>
          <text x={PAD + W - 80} y={14} fontSize={9} fill="rgba(58,89,209,0.6)" fontWeight="bold">
            STREFA WZROSTU
          </text>
        </svg>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Chart 3 — Phone / reviews / referral bar comparison                 */
/* ------------------------------------------------------------------ */
function ConversionBars() {
  const bars = [
    { label: "Firmy BEZ systemu opinii", value: 18, color: "rgba(255,255,255,0.2)" },
    { label: "Firmy Z systemem opinii", value: 61, color: "#3A59D1" },
    { label: "Firmy BEZ oddzwaniania", value: 24, color: "rgba(255,255,255,0.2)" },
    { label: "Firmy Z AI-telefonem", value: 73, color: "#3A59D1" },
    { label: "Firmy BEZ follow-up", value: 11, color: "rgba(255,255,255,0.2)" },
    { label: "Firmy Z automatycznym follow-up", value: 38, color: "#3A59D1" },
  ];

  return (
    <div className="space-y-3">
      <div>
        <p className="text-white font-bold text-lg sm:text-xl leading-tight">
          Procent zapytań zamienionych w klientów — z systemem vs bez
        </p>
        <p className="text-white/50 text-sm mt-1">
          Dane: HubSpot SMB Benchmark 2024, próba 8 200 firm usługowych
        </p>
      </div>

      <div className="space-y-2.5">
        {bars.map((bar, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className={`text-sm ${bar.color === "#3A59D1" ? "text-white font-semibold" : "text-white/50"}`}>
                {bar.label}
              </span>
              <span className={`text-sm font-bold tabular-nums ${bar.color === "#3A59D1" ? "text-themeAccent" : "text-white/40"}`}>
                {bar.value}%
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-white/6 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: bar.color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${bar.value}%` }}
                transition={{ duration: 1, delay: i * 0.15, ease: "easeOut" }}
                viewport={{ once: true }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main export                                                          */
/* ------------------------------------------------------------------ */
export function GrowthCharts() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/3 p-6 sm:p-8 space-y-10">
      <div className="space-y-2 text-center md:text-left mb-6">
        <p className="flex items-center justify-center md:justify-start gap-2 text-sm text-themeAccent uppercase tracking-[0.2em] font-extrabold">
          <span className="w-1.5 h-1.5 rounded-full bg-themeAccent shadow-gold-glow animate-pulse" />
          Dane i porównania
        </p>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mt-1">
          Liczby nie kłamią — tu widać gdzie jesteś i gdzie możesz być
        </h3>
      </div>

      <GrowthCurveChart />

      <div className="border-t border-white/8" />

      <PositioningHeatmap />

      <div className="border-t border-white/8" />

      <ConversionBars />
    </div>
  );
}
