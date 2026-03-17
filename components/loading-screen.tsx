"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const STEPS = [
  "Analiza modelu biznesowego...",
  "Skanowanie potencjału rynkowego...",
  "Identyfikacja wąskich gardeł...",
  "Obliczanie luki przychodowej...",
  "Dobór strategii optymalizacji...",
  "Generowanie spersonalizowanego Gameplanu...",
];

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Show texts sequence
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= STEPS.length - 1) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-8 px-4 w-full">
      {/* Dynamiczny Radar Glow */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        <div className="absolute inset-0 border border-themeAccent/20 rounded-full animate-ping" />
        <div className="absolute inset-4 border border-themeAccent/40 rounded-full animate-pulse" />
        <div className="w-16 h-16 bg-themeAccent/20 rounded-full flex items-center justify-center shadow-gold-glow-strong">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-1 h-8 bg-themeAccent origin-bottom rounded-full"
            style={{ transformOrigin: "bottom center" }}
          />
        </div>
      </div>

      <div className="text-center space-y-4 max-w-sm">
        <p className="text-themeAccent font-bold uppercase tracking-widest text-sm animate-pulse">
          Trwa przetwarzanie
        </p>

        <div className="h-8 relative overflow-hidden flex justify-center flex-col">
          <motion.p
            key={currentStep}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-white/80 font-medium whitespace-nowrap"
          >
            {STEPS[currentStep]}
          </motion.p>
        </div>

        {/* Progress bar z gradientem */}
        <div className="w-64 h-1.5 bg-white/5 mx-auto rounded-full overflow-hidden relative shadow-inner">
          <motion.div
            className="h-full bg-themeAccent rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>
    </div>
  );
}
