"use client";

import { motion } from "framer-motion";
import { PHASES } from "@/lib/phase-data";
import { cn } from "@/lib/utils";
import { containerVariants, itemVariants } from "@/lib/animation-variants";

interface QuizProps {
  selectedPhase: number | null;
  onSelect: (phase: number) => void;
}

export function Quiz({ selectedPhase, onSelect }: QuizProps) {
  const handleSelect = (id: number) => {
    onSelect(id);
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <section id="quiz" className="w-full max-w-4xl mx-auto px-4 py-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.div variants={itemVariants} className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Quiz — w której fazie jesteś?</h2>
          <p className="text-white/40 text-sm">Kliknij fazę która najlepiej opisuje Twój biznes</p>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PHASES.map((phase) => (
            <button
              key={phase.id}
              onClick={() => handleSelect(phase.id)}
              className={cn(
                "rounded-2xl border p-5 text-left transition-all duration-300 hover:border-yellow-400/40 hover:bg-yellow-400/5 group",
                selectedPhase === phase.id
                  ? "border-yellow-400 bg-yellow-400/10"
                  : "border-white/8 bg-white/2"
              )}
            >
              <p className={cn(
                "text-xs mb-1 transition-colors",
                selectedPhase === phase.id ? "text-yellow-400/70" : "text-white/30 group-hover:text-yellow-400/50"
              )}>
                {phase.label}
              </p>
              <p className={cn(
                "font-semibold text-sm transition-colors",
                selectedPhase === phase.id ? "text-yellow-400" : "text-white/80"
              )}>
                {phase.name}
              </p>
            </button>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
