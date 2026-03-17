"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhaseData } from "@/lib/phase-data";
import { PhaseIndicator } from "./phase-indicator";
import { TruthCard } from "./truth-card";
import { FocusCard } from "./focus-card";
import { HowToWin } from "./how-to-win";
import { BottomLine } from "./bottom-line";
import { NextPhase } from "./next-phase";
import { CtaCard } from "./cta-card";
import { GrowthCharts } from "./growth-charts";
import { EcosystemChart } from "./ecosystem-chart";

interface ResultsProps {
  phase: PhaseData | null;
  niche?: string;
  currentIncome?: string;
  targetIncome?: string;
  diagnosticAnswers?: Record<string, boolean>;
  budget?: string;
}

const INCOME_ORDER = ["<5k", "5-15k", "15-30k", "30-60k", "60k+", "10-20k", "20-40k", "40-80k", "80-150k", "150k+"];

function getIncomeIndex(income: string): number {
  return INCOME_ORDER.indexOf(income);
}

function getIncomeSuggestion(phaseId: number, currentIncome: string, targetIncome: string): string {
  const ci = getIncomeIndex(currentIncome);
  const ti = getIncomeIndex(targetIncome);
  const bigGap = ti - ci >= 2;

  if (phaseId <= 2 && bigGap) {
    return "Zanim zaczniesz generować leady — musisz zbudować fundamenty. Bez jasności i systemu reklamy to przepalanie budżetu.";
  }
  if (phaseId >= 3 && phaseId <= 4 && bigGap) {
    return "Twój fokus to automatyzacja i AI — tu kryje się przejście przez barierę przychodową. Każda godzina zaoszczędzona to godzina na skalowanie.";
  }
  if (phaseId >= 5 && bigGap) {
    return "Jesteś gotowy na pełny AI lead gen system. Przy Twoim fundamencie — to może być przełom w ciągu 90 dni.";
  }
  return "Twój cel jest osiągalny — kluczowe jest konsekwentne skupienie na właściwych działaniach dla tej fazy.";
}

function formatIncome(income: string): string {
  const map: Record<string, string> = {
    "<5k": "<5k zł",
    "5-15k": "5–15k zł",
    "15-30k": "15–30k zł",
    "30-60k": "30–60k zł",
    "60k+": "60k+ zł",
    "10-20k": "10–20k zł",
    "20-40k": "20–40k zł",
    "40-80k": "40–80k zł",
    "80-150k": "80–150k zł",
    "150k+": "150k+ zł",
  };
  return map[income] ?? income;
}

const BUDGET_LABELS: Record<string, string> = {
  "1-3k":  "1 000–3 000 zł/mies.",
  "3-6k":  "3 000–6 000 zł/mies.",
  "6-10k": "6 000–10 000 zł/mies.",
  "10k+":  "10 000+ zł/mies.",
};

export function Results({ phase, niche, currentIncome, targetIncome, diagnosticAnswers, budget }: ResultsProps) {
  const showCallout = !!(niche && currentIncome && targetIncome && phase);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!modalOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [modalOpen]);

  return (
    <section id="results" className="w-full max-w-4xl mx-auto px-4 pt-24 md:pt-[15vh] pb-32">
      <AnimatePresence mode="wait">
        {phase && (
          <motion.div
            key={phase.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="space-y-4"
          >
            {showCallout && (
              <div className="rounded-3xl border border-themeAccent/30 bg-gradient-to-br from-themeAccent/10 to-transparent p-6 sm:p-8 space-y-4 shadow-gold-glow flex flex-col items-center text-center">
                <p className="flex items-center gap-2 text-sm text-themeAccent uppercase tracking-[0.2em] font-extrabold">
                  Twój profil
                </p>
                <div className="text-white text-lg sm:text-2xl font-semibold flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
                  <span className="text-themeAccent bg-themeAccent/10 px-3 py-1 rounded-full">{niche}</span>
                  <span className="text-white/30 hidden sm:inline">·</span>
                  <span className="flex items-center gap-2">
                    <span className="text-white/60 text-base">Teraz:</span>
                    <span className="text-themeAccent">{formatIncome(currentIncome!)}</span>
                  </span>
                  <span className="text-white/40">→</span>
                  <span className="flex items-center gap-2">
                    <span className="text-white/60 text-base">Cel:</span>
                    <span className="text-themeAccent drop-shadow-sm border-b-2 border-themeAccent/40">{formatIncome(targetIncome!)}</span>
                  </span>
                  {budget && (
                    <>
                      <span className="text-white/30 hidden sm:inline">·</span>
                      <span className="flex items-center gap-2">
                        <span className="text-white/60 text-base">Budżet:</span>
                        <span className="text-themeAccent">{BUDGET_LABELS[budget] ?? budget}</span>
                      </span>
                    </>
                  )}
                </div>
                <p className="text-white/60 md:text-lg leading-relaxed max-w-2xl mt-4 border-t border-white/10 pt-4">
                  {getIncomeSuggestion(phase.id, currentIncome!, targetIncome!)}
                </p>
              </div>
            )}

            <PhaseIndicator activePhase={phase.id} />
            <TruthCard phase={phase} />
            <EcosystemChart />
            <GrowthCharts />
            <FocusCard phase={phase} />
            <HowToWin phase={phase} niche={niche} targetIncome={targetIncome} />
            <BottomLine phase={phase} currentIncome={currentIncome} targetIncome={targetIncome} />
            <NextPhase phase={phase} />

            {/* CTA Button */}
            <div className="text-center py-12 space-y-4">
              <p className="text-white/50 text-sm uppercase tracking-widest">Gotowy na wdrożenie?</p>
              <button
                onClick={() => setModalOpen(true)}
                className="rounded-full bg-themeAccent text-white font-bold px-10 py-5 text-lg hover:bg-blue-400 transition-all shadow-gold-glow"
              >
                Zostań naszym partnerem →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={e => e.target === e.currentTarget && setModalOpen(false)}
        >
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] rounded-3xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 z-10 text-white/40 hover:text-white text-2xl leading-none"
            >
              ✕
            </button>
            {phase && (
              <CtaCard
                phase={phase}
                onSuccess={() => setModalOpen(false)}
                niche={niche}
                currentIncome={currentIncome}
                targetIncome={targetIncome}
                diagnosticAnswers={diagnosticAnswers}
                budget={budget}
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
