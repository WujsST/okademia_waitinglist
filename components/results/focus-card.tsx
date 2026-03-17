import { PhaseData } from "@/lib/phase-data";
import { RadarChart } from "@/components/ui/radar-chart";

interface FocusCardProps {
  phase: PhaseData;
}

export function FocusCard({ phase }: FocusCardProps) {
  return (
    <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md p-8 sm:p-10 space-y-8 shadow-2xl overflow-hidden group hover:border-themeAccent/20 transition-all duration-500">
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-themeAccent/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-themeAccent/20 transition-colors" />

      <div className="relative z-10 text-center md:text-left">
        <p className="flex items-center justify-center md:justify-start gap-2 text-sm text-themeAccent uppercase tracking-[0.2em] font-extrabold mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-themeAccent shadow-gold-glow animate-pulse" />
          Twoje skupienie
        </p>
        <p className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-themeAccent to-blue-600 drop-shadow-sm tracking-tight">{phase.focusPrimary}</p>
        <p className="text-white/60 text-sm sm:text-base mt-4 leading-relaxed max-w-lg">{phase.focusExplanation}</p>
      </div>

      <div className="relative z-10 grid sm:grid-cols-2 gap-8 bg-themeBg/20 rounded-2xl p-6 border border-white/5">
        <div>
          <p className="text-xs text-white/50 uppercase tracking-widest font-bold mb-4">Fokus na:</p>
          <ul className="space-y-4">
            {phase.priorities.slice(0, 3).map(item => (
              <li key={item} className="flex items-center gap-3 text-sm text-white/90 font-medium tracking-wide">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-themeAccent/20 text-themeAccent text-[10px] shadow-gold-glow">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs text-white/50 uppercase tracking-widest font-bold mb-4">Ignoruj teraz:</p>
          <ul className="space-y-4">
            {phase.whatToIgnore.slice(0, 4).map(item => (
              <li key={item} className="flex items-center gap-3 text-sm text-white/40">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/5 text-white/30 text-[10px]">✕</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative z-10 flex justify-center pt-6 drop-shadow-2xl">
        <RadarChart data={phase.radarWeights} highlight={phase.focusPrimary} />
      </div>
    </div>
  );
}
