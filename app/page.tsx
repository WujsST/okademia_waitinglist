"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import Particles from "@/components/ui/particles";
import { Hero } from "@/components/hero";
import { Quiz } from "@/components/quiz";
import { Results } from "@/components/results";
import { LoadingScreen } from "@/components/loading-screen";
import { Meteors } from "@/components/ui/meteors";
import { getPhase } from "@/lib/phase-data";

interface QuizResult {
  phaseId: number;
  niche: string;
  currentIncome: string;
  targetIncome: string;
  diagnosticAnswers: Record<string, boolean>;
  budget?: string;
}

export default function Home() {
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const currentPhaseData = quizResult ? getPhase(quizResult.phaseId) : null;

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);
    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-themeBg text-white overflow-x-hidden relative">
      {!quizResult && !isLoading && (
        <div className="min-h-screen flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            {!isQuizStarted ? (
              <motion.div key="hero" exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }} transition={{ duration: 0.4 }} className="w-full">
                <Hero onStart={() => setIsQuizStarted(true)} />
              </motion.div>
            ) : (
              <motion.div key="quiz" initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 0.4 }} className="w-full">
                <Quiz onComplete={handleQuizComplete} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {quizResult && !isLoading && (
        <Results
          phase={currentPhaseData}
          niche={quizResult.niche}
          currentIncome={quizResult.currentIncome}
          targetIncome={quizResult.targetIncome}
          diagnosticAnswers={quizResult.diagnosticAnswers}
          budget={quizResult.budget}
        />
      )}

      <Particles
        quantityDesktop={200}
        quantityMobile={60}
        ease={80}
        color="#3A59D1"
        refresh
        className="absolute inset-0 pointer-events-none -z-10 opacity-30"
      />
      <Meteors number={25} className="z-[-5]" />
    </main>
  );
}
