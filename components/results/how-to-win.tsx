import { PhaseData } from "@/lib/phase-data";

interface HowToWinProps {
  phase: PhaseData;
}

export function HowToWin({ phase }: HowToWinProps) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 p-8 space-y-6">
      <div>
        <h3 className="text-xl font-bold">Jak wygrać</h3>
        <p className="text-white/50 mt-1">
          Priorytet na <span className="text-yellow-400 font-semibold">{phase.focusPrimary}</span>
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {phase.priorities.map((priority, index) => (
          <div
            key={priority}
            className={`rounded-xl p-3 flex items-center gap-3 border transition-all ${
              index === 0
                ? "border-yellow-400/40 bg-yellow-400/8 col-span-2"
                : "border-white/8 bg-white/2"
            }`}
          >
            <span
              className={`text-xs font-bold min-w-[20px] ${
                index === 0 ? "text-yellow-400" : "text-white/30"
              }`}
            >
              {index + 1}
            </span>
            <span className={`text-sm font-medium ${index === 0 ? "text-yellow-400" : "text-white/70"}`}>
              {priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
