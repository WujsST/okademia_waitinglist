import { PhaseData, PHASES } from "@/lib/phase-data";

interface NextPhaseProps {
  phase: PhaseData;
}

export function NextPhase({ phase }: NextPhaseProps) {
  const next = PHASES[phase.nextPhase];
  const isFinal = phase.id === 7;

  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 p-8 space-y-4 text-center md:text-left">
      <p className="flex items-center justify-center md:justify-start gap-2 text-sm text-themeAccent uppercase tracking-[0.2em] font-extrabold mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-themeAccent shadow-gold-glow animate-pulse" />
        Przyszłość
      </p>
      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-6">
        {isFinal ? "Jesteś na szczycie" : "Twoja kolejna faza to:"}
      </h3>
      {!isFinal && (
        <div className="flex items-center gap-4">
          <div className="rounded-xl border border-themeAccent/20 bg-themeAccent/5 px-5 py-3">
            <p className="text-themeAccent font-bold">{next.label}</p>
            <p className="text-white/70 text-sm">{next.name}</p>
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-xs text-white/40 uppercase tracking-widest">Na tej fazie wiesz o</p>
            <ul className="space-y-1">
              {phase.knowAbout.map((item, i) => (
                <li key={i} className="text-sm text-white/60 flex items-start gap-2">
                  <span className="text-themeAccent mt-0.5">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
