import { PHASES } from "@/lib/phase-data";
import { cn } from "@/lib/utils";

interface PhaseIndicatorProps {
  activePhase: number;
}

export function PhaseIndicator({ activePhase }: PhaseIndicatorProps) {
  return (
    <div className="w-full space-y-3">
      <p className="text-base font-bold text-themeAccent uppercase tracking-widest text-center mt-6">Jesteś tutaj</p>
      <div className="flex items-center gap-1">
        {PHASES.map((phase) => (
          <div key={phase.id} className="flex-1 flex flex-col items-center gap-1.5">
            <div
              className={cn(
                "h-1 w-full rounded-full transition-all duration-500",
                phase.id <= activePhase ? "bg-themeAccent" : "bg-white/10"
              )}
            />
            <span
              className={cn(
                "text-[10px] font-medium transition-colors duration-300 hidden sm:block",
                phase.id === activePhase ? "text-themeAccent" : "text-white/30"
              )}
            >
              {phase.id}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-white/30">
        <span>Faza 0 — Zdecyduj</span>
        <span className="font-semibold text-themeAccent">
          {PHASES[activePhase].label} — {PHASES[activePhase].name}
        </span>
        <span>Faza 7 — Rośnij</span>
      </div>
    </div>
  );
}
