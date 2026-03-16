import { PhaseData } from "@/lib/phase-data";

interface TruthCardProps {
  phase: PhaseData;
}

export function TruthCard({ phase }: TruthCardProps) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 p-8 space-y-4">
      <h2 className="text-2xl font-bold">{phase.label}</h2>
      <p className="text-lg font-semibold text-white/80">{phase.truth}</p>
      <p className="text-white/60 leading-relaxed">{phase.mainClaim}</p>
      <div className="pt-2 border-t border-white/8">
        <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Największa przeszkoda</p>
        <p className="font-bold text-yellow-400">{phase.biggestObstacle}</p>
      </div>
    </div>
  );
}
