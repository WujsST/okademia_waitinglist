"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PhaseData } from "@/lib/phase-data";

interface CtaCardProps {
  phase: PhaseData;
  bookingUrl?: string;
}

export function CtaCard({ phase, bookingUrl = "https://calendly.com/dawid" }: CtaCardProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = async () => {
    if (!name || !email) {
      toast.error("Uzupełnij wszystkie pola");
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Podaj prawidłowy adres email");
      return;
    }

    setLoading(true);
    try {
      const [mailRes, notionRes] = await Promise.all([
        fetch("/api/mail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstname: name, email, phase: phase.id }),
        }),
        fetch("/api/notion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, phase: phase.id }),
        }),
      ]);

      if (mailRes.status === 429 || notionRes.status === 429) {
        toast.error("Zbyt wiele prób. Spróbuj za chwilę.");
        return;
      }

      if (!mailRes.ok || !notionRes.ok) {
        toast.error("Coś poszło nie tak. Spróbuj ponownie.");
        return;
      }

      setSubmitted(true);
      toast.success("Gotowe! Sprawdź skrzynkę email.");
    } catch {
      toast.error("Błąd sieci. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-8 space-y-6">
      <div>
        <p className="text-xs text-yellow-400/60 uppercase tracking-widest mb-2">Czas na wdrożenie</p>
        <h3 className="text-xl font-bold">
          {phase.implementationTime !== "Ciągły proces"
            ? `Szacowany czas: ${phase.implementationTime}`
            : "Jesteś gotowy na ciągły wzrost"}
        </h3>
        <p className="text-white/50 mt-2 text-sm">
          Zostaw swoje dane — wyślę Ci spersonalizowany plan dla {phase.label}.
        </p>
      </div>

      {!submitted ? (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Twoje imię"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder:text-white/30 focus:outline-none focus:border-yellow-400/40 transition-colors"
          />
          <input
            type="email"
            placeholder="Twój email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder:text-white/30 focus:outline-none focus:border-yellow-400/40 transition-colors"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full rounded-xl bg-yellow-400 text-black font-bold py-3 text-sm hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Wysyłam..." : "Otrzymaj plan działania →"}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-white/70 text-sm">
            Email wysłany! Teraz umów bezpłatną konsultację żeby razem zaplanować wdrożenie.
          </p>
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-xl border border-yellow-400/40 text-yellow-400 font-bold py-3 text-sm text-center hover:bg-yellow-400/10 transition-colors"
          >
            Umów spotkanie →
          </a>
        </div>
      )}
    </div>
  );
}
