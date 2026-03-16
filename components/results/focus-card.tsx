import { PhaseData } from "@/lib/phase-data";
import { RadarChart } from "@/components/ui/radar-chart";

interface FocusCardProps {
  phase: PhaseData;
}

export function FocusCard({ phase }: FocusCardProps) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 p-8 space-y-6">
      <div>
        <h3 className="text-xl font-bold">Twoje skupienie</h3>
        <p className="text-white/50 mt-1">
          Powinieneś się skupić na{" "}
          <span className="font-semibold text-yellow-400">{phase.focusPrimary}</span>
        </p>
      </div>
      <div className="flex justify-center">
        <RadarChart data={phase.radarWeights} highlight={phase.focusPrimary} />
      </div>
    </div>
  );
}
