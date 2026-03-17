import { PhaseData } from "@/lib/phase-data";

interface TruthCardProps {
  phase: PhaseData;
}

export function TruthCard({ phase }: TruthCardProps) {
  return (
    <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md p-8 sm:p-10 space-y-6 shadow-2xl overflow-hidden group hover:border-themeAccent/20 transition-all duration-500">
      <div className="absolute top-0 right-0 w-64 h-64 bg-themeAccent/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-themeAccent/10 transition-colors" />

      <div className="relative z-10 space-y-2 text-center md:text-left">
        <span className="text-sm justify-center md:justify-start font-bold uppercase tracking-[0.2em] text-themeAccent flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-themeAccent" />
          Faza {phase.id} — {phase.name}
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold mt-3 leading-tight tracking-tight text-white">{phase.truth}</h2>
      </div>

      <p className="relative z-10 text-white/70 leading-relaxed text-base sm:text-lg">{phase.mainClaim}</p>

      <hr className="relative z-10 border-white/10" />

      <div className="relative z-10 border-l-2 border-themeAccent/50 pl-4 space-y-1">
        <p className="text-xs font-bold uppercase tracking-widest text-themeAccent/70">Największa przeszkoda</p>
        <p className="font-bold text-white text-sm sm:text-base">{phase.biggestObstacle}</p>
      </div>

      <div className="relative z-10 rounded-2xl bg-themeBg/40 border border-white/5 p-6 space-y-3 backdrop-blur-sm">
        <p className="flex items-center gap-2 text-xs text-themeAccent/70 uppercase tracking-widest font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-themeAccent/70" />
          Jak wygrać na tym etapie
        </p>
        <p className="text-white/80 leading-relaxed text-sm sm:text-base">{phase.howToWinDetails}</p>
      </div>

      <div className="relative z-10 pt-2">
        <a
          href="#cta-section"
          className="inline-flex items-center gap-3 rounded-full bg-themeAccent text-white font-bold px-8 py-4 text-base hover:bg-blue-400 transition-all shadow-gold-glow"
        >
          Zostań naszym partnerem →
        </a>
      </div>
    </div>
  );
}
