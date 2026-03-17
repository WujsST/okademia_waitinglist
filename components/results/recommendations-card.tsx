"use client";

import { DIAGNOSTIC_QUESTIONS } from "@/lib/phase-data";

interface RecommendationsCardProps {
  diagnosticAnswers: Record<string, boolean>;
}

const BADGE_STYLES: Record<string, string> = {
  Automatyzacja: "bg-themeAccent/15 text-themeAccent border border-themeAccent/30",
  CRM: "bg-white/15 text-white/80 border border-white/25",
  Marketing: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  AI: "bg-purple-500/15 text-purple-400 border border-purple-500/30",
};

const SERVICE_NAMES: Record<string, string> = {
  "google-reviews": "System Automatycznych Opinii Google",
  "referrals": "System Follow-up i Poleceń",
  "manual-work": "Automatyzacja CRM + AI Agent",
  "job-organization": "CRM + System Dispatchingu",
  "phone-system": "AI Agent Głosowy 24/7",
  "clv-awareness": "Analiza CLV + Strategia Sprzedaży",
  "website-awareness": "Strona WWW zorientowana na sprzedaż",
  "ai-awareness": "Pełna Strategia Wdrożenia AI",
};

export function RecommendationsCard({ diagnosticAnswers }: RecommendationsCardProps) {
  const recommendations = DIAGNOSTIC_QUESTIONS.filter(
    q => diagnosticAnswers[q.id] === q.triggerOn
  );

  return (
    <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md p-6 sm:p-8 space-y-6 shadow-2xl overflow-hidden group hover:border-themeAccent/20 transition-all duration-500">
      <div className="absolute top-0 right-0 w-64 h-64 bg-themeAccent/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-themeAccent/10 transition-colors" />

      <div className="relative z-10 text-center md:text-left mb-6">
        <p className="flex items-center justify-center md:justify-start gap-2 text-sm text-themeAccent uppercase tracking-[0.2em] font-extrabold mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-themeAccent shadow-gold-glow animate-pulse" />
          Rekomendowane dla Ciebie
        </p>
        <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white mt-1">
          Na podstawie Twoich odpowiedzi wykryliśmy {recommendations.length} obszar{recommendations.length === 1 ? "" : recommendations.length < 5 ? "y" : "ów"}, w których tracisz pieniądze
        </h3>
      </div>

      {recommendations.length === 0 ? (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
          <p className="text-emerald-400 font-semibold text-base">
            ✓ Świetnie — masz już solidne fundamenty systemowe.
          </p>
          <p className="text-white/60 text-sm mt-1">
            Porozmawiajmy o skalowaniu i wejściu na kolejny poziom przychodów.
          </p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row w-full h-[600px] md:h-[420px] gap-3">
          {recommendations.map((q, idx) => (
            <div
              key={q.id}
              className="group relative flex-1 hover:flex-[4] md:hover:flex-[3] transition-[flex] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-2xl border border-white/10 bg-white/5 overflow-hidden cursor-pointer"
            >
              {/* Stan "Zamknięty" (Zwijany na desktopie by był obrócony, na mobile na płasko z ikoną/badge) */}
              <div className="absolute inset-0 flex items-center justify-center p-4 transition-opacity duration-300 opacity-100 group-hover:opacity-0 group-hover:invisible pointer-events-none">
                <div className="flex flex-row md:flex-col items-center gap-3 md:-rotate-90 whitespace-nowrap transform md:translate-y-4">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${BADGE_STYLES[q.service.badge] ?? BADGE_STYLES.CRM}`}>
                    {q.service.badge}
                  </span>
                  <span className="text-white font-bold text-lg md:text-xl drop-shadow-md"> {q.service.name} </span>
                </div>
              </div>

              {/* Stan "Rozwinięty" (Zawartość odsłania się z efektem fade/transform tylko przy najechaniu z dużą zmianą gradientu) */}
              <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end md:justify-center transition-all duration-500 opacity-0 transform translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 bg-gradient-to-t from-themeBg via-themeBg/80 to-transparent md:bg-themeBg/60 backdrop-blur-md pointer-events-auto overflow-y-auto custom-scrollbar">
                <div className="space-y-4 min-w-[280px] w-full max-w-sm mx-auto">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${BADGE_STYLES[q.service.badge] ?? BADGE_STYLES.CRM}`}>
                      {q.service.badge}
                    </span>
                    <span className="text-themeAccent text-xs font-bold uppercase tracking-wider">
                      {SERVICE_NAMES[q.id]}
                    </span>
                  </div>

                  <p className="text-white font-extrabold text-xl sm:text-2xl leading-snug">
                    {q.service.name}
                  </p>

                  <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-themeAccent text-lg shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-themeAccent/20 shadow-gold-glow animate-pulse">!</span>
                      <p className="text-white/90 text-sm sm:text-base font-semibold leading-snug">
                        {q.service.shortDesc}
                      </p>
                    </div>
                  </div>

                  <p className="text-white/60 text-sm sm:text-base leading-relaxed pl-1">
                    {q.service.fullDesc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
