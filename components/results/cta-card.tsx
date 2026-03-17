"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PhaseData } from "@/lib/phase-data";

interface CtaCardProps {
  phase: PhaseData;
  calendarUrl?: string;
  onSuccess?: () => void;
  niche?: string;
  currentIncome?: string;
  targetIncome?: string;
  diagnosticAnswers?: Record<string, boolean>;
  budget?: string;
}

export function CtaCard({ phase, calendarUrl, onSuccess, niche, currentIncome, targetIncome, diagnosticAnswers, budget }: CtaCardProps) {
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = async () => {
    if (!fullName || !companyName || !phone || !email) {
      toast.error("Uzupełnij wszystkie wymagane pola");
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Podaj prawidłowy adres email");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        fullName, companyName, companyUrl, phone, email,
        phase: phase.id,
        phaseName: phase.name,
        niche,
        currentIncome,
        targetIncome,
        budget,
        diagnosticAnswers,
        submittedAt: new Date().toISOString(),
      };
      const [mailRes, notionRes] = await Promise.all([
        fetch("/api/mail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }),
        fetch("/api/notion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }),
        fetch("/api/webhook", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }).catch(() => new Response(null, { status: 200 })),
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
      onSuccess?.();
    } catch {
      toast.error("Błąd sieci. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "bg-transparent border-0 border-b border-white/25 focus:border-white/70 focus:outline-none text-white text-xl sm:text-2xl placeholder:text-white/20 pb-1 transition-colors w-full";

  return (
    <div className="rounded-3xl bg-black border border-white/8 p-8 sm:p-12 space-y-10">
      {/* Label */}
      <p className="text-xs uppercase tracking-[0.25em] text-white/40 font-semibold flex items-center gap-2">
        <span className="w-1 h-1 rounded-full bg-white/40" />
        Kontakt
      </p>

      {!submitted ? (
        <>
          {/* Headline */}
          <h3 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-none">
            Porozmawiajmy
          </h3>

          {/* Sentence-style form */}
          <div className="space-y-8 text-xl sm:text-2xl text-white/60 leading-relaxed">
            {/* Row 1 */}
            <div className="flex flex-wrap items-end gap-x-3 gap-y-4">
              <span>Nazywam się</span>
              <div className="min-w-[220px] flex-1">
                <input
                  type="text"
                  placeholder="imię i nazwisko"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className={inputClass}
                />
              </div>
              <span>z firmy</span>
              <div className="min-w-[180px] flex-1">
                <input
                  type="text"
                  placeholder="nazwa firmy"
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex flex-wrap items-end gap-x-3 gap-y-4">
              <span>Strona firmy (opcjonalnie):</span>
              <div className="min-w-[240px] flex-1">
                <input
                  type="url"
                  placeholder="https://..."
                  value={companyUrl}
                  onChange={e => setCompanyUrl(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex flex-wrap items-end gap-x-3 gap-y-4">
              <span>Można się ze mną skontaktować pod</span>
              <div className="min-w-[180px] flex-1">
                <input
                  type="tel"
                  placeholder="numer telefonu"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Row 4 */}
            <div className="flex flex-wrap items-end gap-x-3 gap-y-4">
              <span>Mój email to</span>
              <div className="min-w-[240px] flex-1">
                <input
                  type="email"
                  placeholder="adres email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="space-y-4 pt-2">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-3 rounded-full bg-white/8 border border-white/15 hover:bg-white/15 hover:border-white/30 text-white font-semibold px-8 py-4 text-base transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span className="text-lg">✦</span>
              {loading ? "Wysyłam..." : "Wyślij"}
            </button>
            <p className="text-xs text-white/25 leading-relaxed max-w-sm">
              Wysyłając formularz, wyrażasz zgodę na kontakt w celu obsługi zgłoszenia.
            </p>
          </div>
        </>
      ) : (
        /* Success state */
        <div className="space-y-8">
          <h3 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-none">
            Gotowe.
          </h3>
          <p className="text-xl text-white/55 leading-relaxed max-w-lg">
            Otrzymaliśmy Twoje zgłoszenie. Odezwiemy się wkrótce, żeby umówić rozmowę.
          </p>

          {calendarUrl && (
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-white/8 border border-white/15 hover:bg-white/15 hover:border-white/30 text-white font-semibold px-8 py-4 text-base transition-all"
            >
              Zarezerwuj spotkanie →
            </a>
          )}
        </div>
      )}
    </div>
  );
}
