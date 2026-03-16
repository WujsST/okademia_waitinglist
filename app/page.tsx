"use client";

import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import Particles from "@/components/ui/particles";
import { Hero } from "@/components/hero";
import { Quiz } from "@/components/quiz";
import { Results } from "@/components/results";
import { getPhase } from "@/lib/phase-data";

export default function Home() {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);

  const handlePhaseSelect = (id: number) => {
    setSelectedPhase(id);
  };

  const currentPhaseData = selectedPhase !== null ? getPhase(selectedPhase) : null;

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Hero />
      <Quiz selectedPhase={selectedPhase} onSelect={handlePhaseSelect} />
      <Results phase={currentPhaseData} />
      <Particles
        quantityDesktop={200}
        quantityMobile={60}
        ease={80}
        color="#F7FF9B"
        refresh
      />
    </main>
  );
}
