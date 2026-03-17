"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/* Ecosystem visual + money-lost-per-lead + time-saved chart           */
/* ------------------------------------------------------------------ */

// Kwoty oparte na śr. wartości zlecenia HVAC/Solar/medycyna: 6 000–15 000 zł
const SOLUTIONS = [
  {
    id: "phone",
    icon: "📞",
    name: "AI Agent Głosowy",
    badge: "AI",
    color: "purple",
    loss: 36000,
    lossLabel: "miesięcznie — 6 nieodebranych telefonów × śr. 6 000 zł za zlecenie",
    timeSaved: 3,
    stat: "62% klientów nie oddzwania po 1. nieodebranym",
    headline: "Przestań tracić klientów przez nieodebrany telefon",
    fullDesc: "Każdy nieodebrany telefon to potencjalnie utracone zlecenie. Aż 62% klientów nie oddzwania — jeśli nie odbierzesz za pierwszym razem, idą do konkurencji. Wirtualny asystent głosowy odbiera 24/7, kwalifikuje klientów i umawia wizyty bez Twojego udziału.",
  },
  {
    id: "reviews",
    icon: "⭐",
    name: "System Opinii Google",
    badge: "Auto",
    color: "blue",
    loss: 24000,
    lossLabel: "miesięcznie — o tyle mniej zapytań przy <20 opiniach vs 50+",
    timeSaved: 1,
    stat: "3× więcej zapytań przy 50+ opiniach na mapach",
    headline: "Zdobywaj więcej opinii na Google i przyciągaj klientów bez reklam",
    fullDesc: "Firmy z 50+ opiniami otrzymują 3× więcej zapytań z map Google niż te z mniej niż 20. Automatyczny system wysyła prośby o opinię we właściwym momencie — po zakończeniu zlecenia — kiedy klient jest najbardziej zadowolony.",
  },
  {
    id: "crm",
    icon: "📋",
    name: "CRM + Dispatching",
    badge: "CRM",
    color: "blue",
    loss: 18000,
    lossLabel: "miesięcznie — 3 zlecenia zgubione w chaosie × 6 000 zł",
    timeSaved: 4,
    stat: "30% zleceń odpada gdy nie ma systemu śledzenia",
    headline: "Przestań gubić zlecenia w chaosie — CRM który działa jak Twój drugi mózg",
    fullDesc: "30% zleceń odpada gdy nie ma systemu śledzenia. Każde zapytanie, każdy klient, każde zlecenie — w jednym miejscu. CRM z automatycznym dispatchingiem eliminuje chaos i pozwala skalować bez zatrudniania dodatkowych pracowników.",
  },
  {
    id: "website",
    icon: "🌐",
    name: "Strona WWW",
    badge: "Marketing",
    color: "green",
    loss: 30000,
    lossLabel: "miesięcznie — klienci którzy odeszli bo strona ich nie przekonała",
    timeSaved: 0,
    stat: "75% ocenia wiarygodność firmy po stronie w 3 sek.",
    headline: "Twoja strona decyduje czy klient dzwoni — zanim w ogóle przeczyta ofertę",
    fullDesc: "75% potencjalnych klientów ocenia wiarygodność firmy na podstawie strony w ciągu pierwszych 3 sekund. Strona bez konwersji to nie strona — to sito przez które przeciekają klienci. Profesjonalna strona z jasnym CTA potraja liczbę zapytań.",
  },
  {
    id: "automation",
    icon: "⚡",
    name: "Automatyzacja procesów",
    badge: "AI",
    color: "purple",
    loss: 12000,
    lossLabel: "miesięcznie w straconej produktywności właściciela (80h × 150 zł/h)",
    timeSaved: 5,
    stat: "Śr. właściciel traci 2–3h/dzień na ręczną robotę",
    headline: "Odzyskaj 2–3h dziennie które teraz przepalasz na ręczną robotę",
    fullDesc: "Średni właściciel firmy usługowej traci 2–3 godziny dziennie na zadania które mogłyby być w pełni zautomatyzowane: faktury, przypomnienia, maile, raporty. Automatyzacja zwraca Ci ten czas na to co faktycznie generuje przychód.",
  },
  {
    id: "referrals",
    icon: "🤝",
    name: "System Poleceń",
    badge: "Marketing",
    color: "green",
    loss: 20000,
    lossLabel: "miesięcznie w poleceniach które nigdy nie dotarły — bo nikt nie zapytał",
    timeSaved: 2,
    stat: "Polecony klient ma 4× wyższy LTV i zamknięcie w 1 rozmowie",
    headline: "Zamień zadowolonych klientów w darmową reklamę dla Twojej firmy",
    fullDesc: "Większość klientów chętnie poleci Twoją firmę — ale tylko jeśli ich o to poprosisz. Polecony klient ma 4× wyższy LTV i zamknięcie w 1 rozmowie. Systematyczny program poleceń to najtańszy kanał pozyskiwania klientów jaki istnieje.",
  },
];

const BADGE_BG: Record<string, string> = {
  yellow: "border-themeAccent/30 bg-themeAccent/8",
  purple: "border-purple-500/30 bg-purple-500/8",
  blue: "border-blue-400/30 bg-blue-400/8",
  green: "border-emerald-500/30 bg-emerald-500/8",
};
const BADGE_TEXT: Record<string, string> = {
  yellow: "text-themeAccent",
  purple: "text-purple-400",
  blue: "text-blue-400",
  green: "text-emerald-400",
};

/* ---- Ecosystem grid ---- */
function EcosystemGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-white font-extrabold text-3xl sm:text-4xl tracking-tight leading-tight">
          Ekosystem systemów — jak każdy element wpływa na Twój przychód
        </p>
        <p className="text-white/50 text-sm mt-2">
          Firmy które mają wszystkie 6 systemów zarabiają średnio 3.4× więcej niż te bez żadnego
        </p>
      </div>

      {/* Numbered list */}
      <div className="divide-y divide-white/8">
        {SOLUTIONS.map((s, i) => (
          <div
            key={s.id}
            className="relative cursor-pointer py-5"
            onMouseEnter={() => setHoveredId(s.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="flex gap-6">
              {/* Index */}
              <span className="text-4xl font-black text-white/10 tabular-nums w-10 shrink-0 leading-none pt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              {/* Content */}
              <div className="space-y-2 min-w-0 flex-1">
                <p className="text-white font-bold text-lg sm:text-xl leading-snug">
                  {s.icon} {s.name}
                </p>
                <p className="text-white font-semibold text-sm sm:text-base">
                  {s.stat}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/35 border border-white/12 rounded px-2 py-0.5">
                    {s.badge}
                  </span>
                </div>

                {/* Hover-expand glassmorphism panel */}
                <div
                  className="overflow-hidden transition-all duration-500 ease-out"
                  style={{ maxHeight: hoveredId === s.id ? "320px" : "0px" }}
                >
                  <div
                    className="mt-3 rounded-2xl p-5 space-y-3 border transition-all duration-300"
                    style={{
                      background: "rgba(255,255,255,0.074)",
                      borderColor: hoveredId === s.id ? "rgba(255,255,255,0.454)" : "rgba(255,255,255,0.222)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      boxShadow: hoveredId === s.id ? "0 0 20px 1px rgba(58,89,209,0.25)" : "none",
                    }}
                  >
                    <p className="text-white font-bold text-base leading-snug">
                      {s.icon} Rozwiązanie: {s.name}
                    </p>
                    <p className="text-themeAccent font-semibold text-sm">
                      ⚡ {s.headline}
                    </p>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {s.fullDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Money lost per lead ---- */
function MoneyLostChart() {
  const maxLoss = Math.max(...SOLUTIONS.map(s => s.loss));

  return (
    <div className="space-y-4">
      <div>
        <p className="text-white font-extrabold text-3xl sm:text-4xl tracking-tight leading-tight">
          Ile tracisz w złotówkach — bez każdego systemu
        </p>
        <p className="text-white/50 text-sm mt-2">
          Szacunkowe straty na pojedynczym leadzie / miesiącu dla firmy usługowej (śr. wartość zlecenia 3 500 zł)
        </p>
      </div>

      <div className="space-y-3">
        {SOLUTIONS.map(s => (
          <div key={s.id} className="space-y-1.5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-base shrink-0">{s.icon}</span>
                <span className="text-white/80 text-sm font-medium truncate">{s.name}</span>
              </div>
              <span className="text-red-400 font-bold text-base tabular-nums shrink-0">
                −{s.loss.toLocaleString("pl-PL")} zł
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-3 rounded-full bg-white/6 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-red-500/70 to-red-400/50"
                  style={{ width: `${(s.loss / maxLoss) * 100}%` }}
                />
              </div>
            </div>
            <p className="text-white/35 text-xs pl-6">{s.lossLabel}</p>
          </div>
        ))}
      </div>

      {/* Total callout */}
      <div className="rounded-xl border border-red-500/25 bg-red-500/6 p-4 flex items-center gap-4">
        <span className="text-3xl shrink-0">💸</span>
        <div>
          <p className="text-red-400 font-black text-2xl">
            −{SOLUTIONS.reduce((a, s) => a + s.loss, 0).toLocaleString("pl-PL")} zł
          </p>
          <p className="text-white/60 text-sm">
            łączne szacunkowe straty miesięcznie bez żadnego systemu
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---- Time saved per week ---- */
function TimeSavedChart() {
  const totalHours = SOLUTIONS.reduce((a, s) => a + s.timeSaved, 0);
  const withSystems = SOLUTIONS.filter(s => s.timeSaved > 0);

  return (
    <div className="space-y-4">
      <div>
        <p className="text-white font-extrabold text-3xl sm:text-4xl tracking-tight leading-tight">
          Ile godzin tygodniowo możesz odzyskać
        </p>
        <p className="text-white/50 text-sm mt-2">
          Szacowany czas zaoszczędzony po wdrożeniu każdego systemu
        </p>
      </div>

      {/* Radial/visual summary */}
      <div className="rounded-xl border border-themeAccent/15 bg-themeAccent/5 p-5 flex items-center gap-6">
        {/* Big number SVG donut */}
        <div className="relative shrink-0 w-24 h-24">
          <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
            <circle cx="40" cy="40" r="30" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
            <circle
              cx="40" cy="40" r="30" fill="none"
              stroke="#3A59D1" strokeWidth="10"
              strokeDasharray={`${(totalHours / 20) * 188.5} 188.5`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-themeAccent font-black text-xl leading-none">{totalHours}h</span>
            <span className="text-white/40 text-xs">/ tydzień</span>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-white font-bold text-lg">
            {totalHours} godzin tygodniowo z powrotem dla Ciebie
          </p>
          <p className="text-white/55 text-sm">
            To <span className="text-themeAccent font-semibold">{totalHours * 4} godzin miesięcznie</span> na klientów, strategię lub odpoczynek — zamiast na ręczną robotę.
          </p>
          <p className="text-white/40 text-xs">
            Przy wartości Twojego czasu 150 zł/h = <span className="text-themeAccent font-medium">{(totalHours * 4 * 150).toLocaleString("pl-PL")} zł/mies.</span> odzyskanej wartości
          </p>
        </div>
      </div>

      {/* Per-system bars */}
      <div className="space-y-2.5">
        {withSystems.map(s => (
          <div key={s.id} className="flex items-center gap-3">
            <span className="text-base w-6 text-center shrink-0">{s.icon}</span>
            <span className="text-white/70 text-sm w-44 shrink-0 truncate">{s.name}</span>
            <div className="flex-1 h-2.5 rounded-full bg-white/6 overflow-hidden">
              <div
                className="h-full rounded-full bg-themeAccent/60"
                style={{ width: `${(s.timeSaved / totalHours) * 100}%` }}
              />
            </div>
            <span className="text-themeAccent font-bold text-sm tabular-nums shrink-0 w-12 text-right">
              +{s.timeSaved}h
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Main export ---- */
export function EcosystemChart() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/3 p-6 sm:p-8 space-y-10">
      <div className="space-y-1">
        <p className="text-xs text-white/40 uppercase tracking-widest font-semibold">
          Analiza kosztów i oszczędności
        </p>
        <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Co tracisz każdego miesiąca bez odpowiednich systemów
        </h3>
      </div>

      <EcosystemGrid />
      <div className="border-t border-white/8" />
      <MoneyLostChart />
      <div className="border-t border-white/8" />
      <TimeSavedChart />
    </div>
  );
}
