import { PhaseData } from "@/lib/phase-data";

interface BottomLineProps {
  phase: PhaseData;
}

export function BottomLine({ phase }: BottomLineProps) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 p-8 space-y-6">
      <div>
        <h3 className="text-xl font-bold">The BOTTOM LINE</h3>
        <p className="text-white/50 mt-1">Konkluzja całej sytuacji</p>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {phase.bottomLine.map((item, i) => (
          <div key={i} className="rounded-xl border border-white/8 bg-white/2 p-5 space-y-2">
            <p className="font-semibold text-sm">{item.title}</p>
            <p className="text-white/50 text-xs leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
