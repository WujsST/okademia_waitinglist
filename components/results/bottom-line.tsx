import { PhaseData } from "@/lib/phase-data";

interface BottomLineProps {
  phase: PhaseData;
  targetIncome?: string;
  currentIncome?: string;
}

const INCOME_LABELS: Record<string, string> = {
  "<5k": "<5k zł",
  "5-15k": "5–15k zł",
  "15-30k": "15–30k zł",
  "30k+": "30k+ zł",
  "10-20k": "10–20k zł",
  "20-40k": "20–40k zł",
  "40-80k": "40–80k zł",
  "80k+": "80k+ zł",
};

export function BottomLine({ phase, targetIncome, currentIncome }: BottomLineProps) {
  const target = targetIncome ? INCOME_LABELS[targetIncome] ?? targetIncome : null;
  const current = currentIncome ? INCOME_LABELS[currentIncome] ?? currentIncome : null;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/3 p-8 space-y-8">
      {/* Header */}
      <div className="space-y-2 text-center md:text-left mb-6">
        <p className="flex items-center justify-center md:justify-start gap-2 text-sm text-themeAccent uppercase tracking-[0.2em] font-extrabold mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-themeAccent shadow-gold-glow animate-pulse" />
          Konkluzja
        </p>
        <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2 leading-tight">
          {target ? (
            <>
              Twoja droga do{" "}
              <span className="text-themeAccent">{target} miesięcznie</span>{" "}
              zaczyna się od tych 3 kroków
            </>
          ) : (
            "The Bottom Line — co musisz zrobić teraz"
          )}
        </h3>
        {current && target && (
          <p className="text-white/50 text-sm leading-relaxed">
            Przejście z <span className="text-white/70">{current}</span> do{" "}
            <span className="text-themeAccent font-semibold">{target}</span> to nie kwestia
            przypadku — to kwestia właściwej kolejności działań. Oto co robi różnicę na{" "}
            <span className="text-white/70">{phase.label}</span>:
          </p>
        )}
      </div>

      {/* Action cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        {phase.bottomLine.map((item, i) => (
          <div
            key={i}
            className={`rounded-xl border p-5 space-y-3 flex flex-col ${
              i === 0
                ? "border-themeAccent/40 bg-themeAccent/5"
                : "border-white/10 bg-white/4"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                i === 0
                  ? "bg-themeAccent/20 border border-themeAccent/50 text-themeAccent"
                  : "bg-white/8 border border-white/20 text-white/50"
              }`}>
                {i + 1}
              </span>
              <p className={`font-bold leading-tight ${i === 0 ? "text-base text-white" : "text-sm text-white/80"}`}>{item.title}</p>
            </div>
            <p className="text-white/55 text-sm leading-relaxed flex-1">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Closing punch */}
      <div className="rounded-xl border border-white/8 bg-white/2 p-5">
        <p className="text-white/70 text-sm leading-relaxed">
          <span className="text-white font-semibold">Pamiętaj:</span>{" "}
          Większość ludzi wie co robić — ale nie robi tego w odpowiedniej kolejności.
          Na <span className="text-themeAccent font-medium">{phase.label}</span> każda godzina spędzona
          na niewłaściwym działaniu to godzina która oddala Cię od celu, nie przybliża.{" "}
          {target && (
            <span>
              <span className="text-themeAccent font-semibold">{target} miesięcznie</span> to
              realny cel — ale tylko jeśli skupisz się na tym co jest w tym planie.
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
