import { PhaseData } from "@/lib/phase-data";

interface HowToWinProps {
  phase: PhaseData;
  niche?: string;
  targetIncome?: string;
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

// Plain-language explanations for each focus area
const FOCUS_PLAIN: Record<string, { title: string; what: string }> = {
  Identyfikacja: {
    title: "Zdefiniuj dokładnie kto płaci i za co",
    what: "Zanim zrobisz cokolwiek innego — musisz wiedzieć kto jest Twoim klientem, jaki ma problem i ile jest gotowy zapłacić za rozwiązanie. Bez tego wszystkie reklamy, treści i oferty to strzelanie w ciemność.",
  },
  Oferta: {
    title: "Zbuduj ofertę której nie można odrzucić",
    what: "Klienci nie kupują usług — kupują wyniki. Twoja oferta musi mówić wprost: 'Zrobię dla Ciebie X, w ciągu Y czasu, za Z złotych — i gwarantuję rezultat.' Im bardziej konkretnie, tym wyższa cena którą możesz wziąć.",
  },
  Positioning: {
    title: "Stań się oczywistym wyborem w swojej niszy",
    what: "Jeśli klient może wybrać Ciebie lub kogoś innego — wybierze tańszego. Chyba że jasno widzisz dlaczego TY jesteś inny i lepszy. Twój wyróżnik musi być konkretny i mierzalny, nie 'profesjonalny i rzetelny'.",
  },
  Marketing: {
    title: "Stwórz maszynę do pozyskiwania klientów",
    what: "Wdrożymy maszynę leadów: system poleceń + opinie Google + AI Voice Agent. Bez reklam, bez social media — tylko systemy które pracują 24/7 i dostarczają klientów bez Twojego zaangażowania.",
  },
  Content: {
    title: "Twoja reputacja online = opinie Google i AI Voice Agent",
    what: "Twoja reputacja online to opinie Google i AI Voice Agent — nie blog ani social media. Automatyczne zbieranie opinii + agent który zawsze odbiera = Ty wyglądasz jak lider rynku bez dodatkowego wysiłku.",
  },
  Team: {
    title: "Zbuduj zespół który działa bez Ciebie",
    what: "Jeśli biznes stoi gdy Ty śpisz — masz pułapkę, nie firmę. Celem jest system gdzie odpowiedni ludzie i procesy dają klientom Twoją jakość bez Twojego czasu przy każdym zleceniu.",
  },
};

export function HowToWin({ phase, niche, targetIncome }: HowToWinProps) {
  const target = targetIncome ? INCOME_LABELS[targetIncome] ?? targetIncome : null;
  const focusData = FOCUS_PLAIN[phase.focusPrimary];

  return (
    <div className="relative rounded-3xl border border-themeAccent/20 bg-gradient-to-br from-themeAccent/5 to-transparent backdrop-blur-xl p-8 sm:p-10 space-y-10 shadow-[0_0_30px_rgba(58,89,209,0.1)] overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-themeAccent/10 via-transparent to-transparent pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center md:text-left space-y-3">
        <p className="flex items-center justify-center md:justify-start gap-2 text-sm text-themeAccent uppercase tracking-[0.2em] font-extrabold mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-themeAccent shadow-gold-glow animate-pulse" />
          Twój plan wygranej
        </p>
        <h3 className="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight text-white">
          Jak przejść z {phase.label} do{" "}
          {target ? (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-themeAccent to-blue-600 drop-shadow-sm">{target} miesięcznie</span>
          ) : (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-themeAccent to-blue-600 drop-shadow-sm">następnego poziomu</span>
          )}
          {niche ? <span className="text-white/80"> jako {niche}</span> : ""}
        </h3>
      </div>

      {/* #1 — Main focus */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-themeAccent text-white text-sm font-black flex items-center justify-center shrink-0">1</span>
          <p className="text-xs text-white/40 uppercase tracking-widest font-semibold">Twój główny fokus teraz</p>
        </div>
        <div className="rounded-xl border border-themeAccent/25 bg-themeAccent/6 p-5 space-y-2">
          <p className="text-themeAccent font-bold text-lg sm:text-xl leading-snug">
            {focusData?.title ?? phase.focusPrimary}
          </p>
          <p className="text-white/75 text-base leading-relaxed">
            {focusData?.what ?? phase.focusExplanation}
          </p>
        </div>
        <p className="text-white/60 text-sm leading-relaxed pl-1">
          {phase.focusExplanation}
        </p>
      </div>

      {/* #2 — Concrete strategy */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-white/10 border border-white/20 text-white text-sm font-black flex items-center justify-center shrink-0">2</span>
          <p className="text-xs text-white/40 uppercase tracking-widest font-semibold">Konkretna strategia działania</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/4 p-5">
          <p className="text-white/85 text-base leading-relaxed">
            {phase.howToWinDetails}
          </p>
        </div>
      </div>

      {/* #3 — What to IGNORE — very powerful */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-black flex items-center justify-center shrink-0">✕</span>
          <p className="text-xs text-white/40 uppercase tracking-widest font-semibold">
            Czego NIE robić — to będzie Cię kosztować czas i pieniądze
          </p>
        </div>
        <div className="rounded-xl border border-red-500/15 bg-red-500/4 p-5 space-y-2">
          <p className="text-white/55 text-sm mb-3">
            Na {phase.label} ludzie marnują miesiące na poniższe rzeczy i pytają dlaczego nie rosną. Nie popełniaj tego błędu:
          </p>
          <div className="grid sm:grid-cols-2 gap-2">
            {phase.whatToIgnore.map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 rounded-lg bg-white/4 border border-red-500/10 px-3 py-2.5">
                <span className="text-red-400/70 font-bold text-base shrink-0">✕</span>
                <span className="text-white/60 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-xl border border-white/8 bg-white/3 p-5 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-themeAccent/10 border border-themeAccent/25 flex items-center justify-center shrink-0">
          <span className="text-themeAccent text-xl">⏱</span>
        </div>
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">Szacowany czas na przejście tej fazy</p>
          <p className="text-white font-bold text-xl mt-0.5">{phase.implementationTime}</p>
          <p className="text-white/50 text-sm mt-0.5">
            Pod warunkiem że skupisz się na priorytecie #{1} — nie na wszystkim naraz
          </p>
        </div>
      </div>
    </div>
  );
}
