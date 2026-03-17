"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const [meteors, setMeteors] = useState<Array<{ left: string; delay: string; duration: string }>>([]);

  useEffect(() => {
    // Generowanie własności meteorów tylko po stronie klienta, aby zapobiec mismatchowi hydracji (Hydration Error).
    // Ograniczamy liczbę elementów i korzystamy z optymalizacji CSS.
    const generated = new Array(number || 20).fill(true).map(() => ({
      left: Math.floor(Math.random() * window.innerWidth) + "px",
      delay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
      duration: Math.floor(Math.random() * (10 - 2) + 2) + "s",
    }));
    setMeteors(generated);
  }, [number]);

  if (meteors.length === 0) return null;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {meteors.map((m, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-effect absolute -top-[50px] w-0.5 h-0.5 rounded-[9999px] bg-themeAccent shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-themeAccent before:to-transparent",
            className
          )}
          style={{
            left: m.left,
            animationDelay: m.delay,
            animationDuration: m.duration,
          }}
        ></span>
      ))}
    </div>
  );
};
