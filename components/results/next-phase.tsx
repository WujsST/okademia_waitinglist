import { PhaseData, PHASES } from "@/lib/phase-data";

interface NextPhaseProps {
  phase: PhaseData;
}

export function NextPhase({ phase }: NextPhaseProps) {
  const next = PHASES[phase.nextPhase];
  const isFinal = phase.id === 7;

  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 p-8 space-y-4">
      <h3 className="text-xl font-bold">
        {isFinal ? "Jesteś na szczycie" : "Twoja kolejna faza to:"}
      </h3>
      {!isFinal && (
        <div className="flex items-center gap-4">
          <div className="rounded-xl border border-yellow-400/20 bg-yellow-400/5 px-5 py-3">
            <p className="text-yellow-400 font-bold">{next.label}</p>
            <p className="text-white/70 text-sm">{next.name}</p>
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-xs text-white/40 uppercase tracking-widest">Na tej fazie wiesz o</p>
            <ul className="space-y-1">
              {phase.knowAbout.map((item, i) => (
                <li key={i} className="text-sm text-white/60 flex items-start gap-2">
                  <span className="text-yellow-400 mt-0.5">→</span>
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
