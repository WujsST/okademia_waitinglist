"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PhaseData } from "@/lib/phase-data";
import { PhaseIndicator } from "./phase-indicator";
import { TruthCard } from "./truth-card";
import { FocusCard } from "./focus-card";
import { HowToWin } from "./how-to-win";
import { BottomLine } from "./bottom-line";
import { NextPhase } from "./next-phase";
import { CtaCard } from "./cta-card";

interface ResultsProps {
  phase: PhaseData | null;
}

export function Results({ phase }: ResultsProps) {
  return (
    <section id="results" className="w-full max-w-4xl mx-auto px-4 pb-24">
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
            <PhaseIndicator activePhase={phase.id} />
            <TruthCard phase={phase} />
            <div className="grid sm:grid-cols-2 gap-4">
              <FocusCard phase={phase} />
              <HowToWin phase={phase} />
            </div>
            <BottomLine phase={phase} />
            <NextPhase phase={phase} />
            <CtaCard phase={phase} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
