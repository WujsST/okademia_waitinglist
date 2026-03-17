"use client";

import { motion } from "framer-motion";
import { itemVariants, containerVariants } from "@/lib/animation-variants";

interface HeroProps {
  onStart?: () => void;
}

export function Hero({ onStart }: HeroProps) {

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative flex flex-col items-center text-center px-4 pt-24 pb-16 max-w-4xl mx-auto"
    >
      {/* Background Subtle Glow Effect */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[120%] h-[400px] bg-themeAccent/5 blur-[120px] rounded-[100%] pointer-events-none -z-10" />

      <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-themeAccent/20 bg-themeAccent/5 mb-8">
        <span className="w-2 h-2 rounded-full bg-themeAccent animate-pulse" />
        <span className="text-xs text-themeAccent uppercase tracking-[0.2em] font-medium">
          The Brand GAMEPLAN
        </span>
      </motion.div>

      <motion.h1 variants={itemVariants} className="text-5xl sm:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
        Gwarantujemy Ci
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-themeAccent to-blue-600 drop-shadow-sm">
          20 nowych klientów w 90 dni
        </span>
      </motion.h1>

      <motion.p variants={itemVariants} className="text-lg sm:text-xl text-white/50 max-w-2xl leading-relaxed mb-10">
        Firmy z branż takich jak HVAC, hydraulika czy solar zwiększają liczbę leadów o 3× w ciągu pierwszego kwartału. Sprawdź co blokuje Twój wzrost — <strong className="text-white/80 font-medium">bezpłatna diagnoza w 3 minuty</strong>.
      </motion.p>

      <motion.div variants={itemVariants} className="flex flex-col items-center gap-4">
        <button
          onClick={onStart}
          className="group relative px-8 py-4 bg-themeAccent text-white font-bold rounded-2xl hover:bg-blue-400 active:scale-[0.98] transition-all duration-200 shadow-gold-glow hover:shadow-[0_0_30px_rgba(58,89,209,0.5)] overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-3 text-base">
            Zrób bezpłatną diagnozę →
          </span>
          <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
        <p className="text-xs text-white/30">
          Bezpłatna diagnoza · Bez zobowiązań · Wyniki w 3 minuty
        </p>
      </motion.div>
    </motion.section>
  );
}
