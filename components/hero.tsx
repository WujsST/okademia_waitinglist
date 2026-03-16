"use client";

import { motion } from "framer-motion";
import { itemVariants, containerVariants } from "@/lib/animation-variants";

export function Hero() {
  const scrollToQuiz = () => {
    document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center text-center px-4 pt-20 pb-16 max-w-3xl mx-auto"
    >
      <motion.p variants={itemVariants} className="text-xs text-yellow-400/70 uppercase tracking-[0.2em] mb-6">
        The Brand GAMEPLAN
      </motion.p>
      <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl font-bold leading-[1.1] mb-6">
        W której fazie
        <br />
        <span className="text-yellow-400">jesteś teraz?</span>
      </motion.h1>
      <motion.p variants={itemVariants} className="text-lg text-white/50 max-w-xl leading-relaxed mb-10">
        Wybierz fazę, która najlepiej opisuje Twój biznes. Dostaniesz spersonalizowaną diagnozę
        i plan działania.
      </motion.p>
      <motion.button
        variants={itemVariants}
        onClick={scrollToQuiz}
        className="text-sm text-white/40 hover:text-white/70 transition-colors flex flex-col items-center gap-2"
      >
        Odkryj swoją fazę
        <span className="animate-bounce">↓</span>
      </motion.button>
    </motion.section>
  );
}
