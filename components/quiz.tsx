"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QUIZ_QUESTIONS, DIAGNOSTIC_QUESTIONS, computePhase } from "@/lib/phase-data";

interface QuizResult {
  phaseId: number;
  niche: string;
  currentIncome: string;
  targetIncome: string;
  diagnosticAnswers: Record<string, boolean>;
  budget?: string;
}

interface QuizProps {
  onComplete: (result: QuizResult) => void;
}

const NICHE_OPTIONS = [
  { id: "hvac", label: "HVAC", icon: "🌡️" },
  { id: "hydraulik", label: "Hydraulik", icon: "🔧" },
  { id: "okna", label: "Montaż okien", icon: "🪟" },
  { id: "elektryka", label: "Elektryka", icon: "⚡" },
  { id: "solar", label: "Solar / OZE", icon: "☀️" },
  { id: "medycyna", label: "Medycyna / Klinika", icon: "🏥" },
  { id: "telekomunikacja", label: "Telekomunikacja", icon: "📡" },
  { id: "sprzatanie", label: "Sprzątanie", icon: "🧹" },
];

const CURRENT_INCOME_OPTIONS = [
  { id: "<5k",    label: "<5k zł" },
  { id: "5-15k",  label: "5–15k zł" },
  { id: "15-30k", label: "15–30k zł" },
  { id: "30-60k", label: "30–60k zł" },
  { id: "60k+",   label: "60k+ zł" },
];

const TARGET_INCOME_OPTIONS = [
  { id: "10-20k",  label: "10–20k zł" },
  { id: "20-40k",  label: "20–40k zł" },
  { id: "40-80k",  label: "40–80k zł" },
  { id: "80-150k", label: "80–150k zł" },
  { id: "150k+",   label: "150k+ zł" },
];

const BUDGET_OPTIONS = [
  { id: "1-3k",  label: "1 000 – 3 000 zł",  sublabel: "Start — podstawowe systemy" },
  { id: "3-6k",  label: "3 000 – 6 000 zł",  sublabel: "Wzrost — kilka automatyzacji" },
  { id: "6-10k", label: "6 000 – 10 000 zł", sublabel: "Skalowanie — pełny pakiet" },
  { id: "10k+",  label: "10 000+ zł",         sublabel: "Enterprise — kompleksowe wdrożenie" },
];

// Steps: 0=intro, 1=niche, 2=currentIncome, 3=targetIncome, 4-8=phase questions,
//        9=transition, 10-17=diagnostic questions, 18=investment readiness, 19=budget
const QUESTION_STEP_OFFSET = 4;
const TRANSITION_STEP = QUESTION_STEP_OFFSET + QUIZ_QUESTIONS.length; // = 9
const DIAG_STEP_OFFSET = TRANSITION_STEP + 1; // = 10
const INVEST_STEP = DIAG_STEP_OFFSET + DIAGNOSTIC_QUESTIONS.length; // = 18
const BUDGET_STEP = INVEST_STEP + 1; // = 19
const TOTAL_STEPS = BUDGET_STEP + 1; // = 20

export function Quiz({ onComplete }: QuizProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [diagnosticAnswers, setDiagnosticAnswers] = useState<Record<string, boolean>>({});
  const [niche, setNiche] = useState("");
  const [otherNiche, setOtherNiche] = useState("");
  const [currentIncome, setCurrentIncome] = useState("");
  const [targetIncome, setTargetIncome] = useState("");
  const [budget, setBudget] = useState("");
  const [direction, setDirection] = useState<1 | -1>(1);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const isPhaseQuestionStep = step >= QUESTION_STEP_OFFSET && step < TRANSITION_STEP;
  const isTransitionStep = step === TRANSITION_STEP;
  const isDiagStep = step >= DIAG_STEP_OFFSET && step < INVEST_STEP;
  const isInvestStep = step === INVEST_STEP;
  const isBudgetStep = step === BUDGET_STEP;
  const questionIndex = step - QUESTION_STEP_OFFSET;
  const diagIndex = step - DIAG_STEP_OFFSET;
  const progressStep = step;

  const goNext = () => {
    setDirection(1);
    setStep(s => s + 1);
  };

  const back = () => {
    setDirection(-1);
    setStep(s => s - 1);
  };

  const handleNicheSelect = (value: string) => {
    setNiche(value);
    goNext();
  };

  const handleOtherNicheSubmit = () => {
    if (otherNiche.trim()) {
      setNiche(otherNiche.trim());
      goNext();
    }
  };

  const handleCurrentIncome = (value: string) => {
    setCurrentIncome(value);
    goNext();
  };

  const handleTargetIncome = (value: string) => {
    setTargetIncome(value);
    goNext();
  };

  const answer = (value: boolean) => {
    const newAnswers = [...answers.slice(0, questionIndex), value];
    setAnswers(newAnswers);
    setDirection(1);
    setStep(s => s + 1);
  };

  const answerDiag = (value: boolean) => {
    const questionId = DIAGNOSTIC_QUESTIONS[diagIndex].id;
    const newDiagAnswers = { ...diagnosticAnswers, [questionId]: value };
    setDiagnosticAnswers(newDiagAnswers);
    setDirection(1);
    setStep(s => s + 1);
  };

  const completeQuiz = (finalBudget?: string) => {
    onComplete({
      phaseId: computePhase(answers),
      niche: niche || otherNiche,
      currentIncome,
      targetIncome,
      diagnosticAnswers,
      budget: finalBudget,
    });
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleInvestAnswer = (ready: boolean) => {
    if (!ready) {
      completeQuiz(undefined);
    } else {
      setDirection(1);
      setStep(BUDGET_STEP);
    }
  };

  const handleBudgetSelect = (value: string) => {
    setBudget(value);
    completeQuiz(value);
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir * 40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir * -40, opacity: 0 }),
  };

  const cardBase = "relative rounded-2xl border p-5 cursor-pointer transition-[color,border-color,background-color,box-shadow,transform] duration-200 text-left overflow-hidden group active:scale-[0.99]";
  const cardDefault = "bg-white/5 border-white/8 text-white/75 hover:text-white hover:border-white/25 hover:bg-white/8";
  const cardSelected = "border-themeAccent/70 bg-themeAccent/10 text-white shadow-[0_0_0_1px_rgba(58,89,209,0.3)_inset]";

  return (
    <section id="quiz" className="w-full max-w-2xl mx-auto px-4 py-16">
      {/* Progress bar */}
      {step > 0 && (
        <div className="mb-8">
          <div className="flex justify-between text-xs text-white/30 mb-2">
            <span>Krok {progressStep} z {TOTAL_STEPS - 1}</span>
            <span>{Math.round((progressStep / (TOTAL_STEPS - 1)) * 100)}%</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10 shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 via-themeAccent to-blue-400 rounded-full relative"
              initial={{ width: 0 }}
              animate={{ width: `${(progressStep / (TOTAL_STEPS - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-white/40 to-transparent blur-[2px]" />
            </motion.div>
          </div>
        </div>
      )}

      <div className="relative overflow-hidden min-h-[320px] flex flex-col justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          {/* Step 1: Niche */}
          {step === 1 && (
            <motion.div
              key="niche"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ willChange: "transform, opacity" }}
              className="space-y-6"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-center">Czym się zajmujesz?</h2>
              <div className="grid grid-cols-2 gap-3">
                {NICHE_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleNicheSelect(opt.label)}
                    className={`${cardBase} ${niche === opt.label ? cardSelected : cardDefault}`}
                  >
                    <span className="text-xl mr-2">{opt.icon}</span>
                    <span className="font-medium">{opt.label}</span>
                  </button>
                ))}
                {/* "Inne" card with text input */}
                <div className={`${cardBase} ${niche && !NICHE_OPTIONS.find(o => o.label === niche) ? cardSelected : cardDefault} col-span-2`}>
                  <p className="text-sm font-medium mb-2 text-white/70">Inna branża:</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={otherNiche}
                      onChange={e => setOtherNiche(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleOtherNicheSubmit()}
                      placeholder="Wpisz branżę..."
                      className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-themeAccent/60"
                    />
                    <button
                      onClick={handleOtherNicheSubmit}
                      disabled={!otherNiche.trim()}
                      className="px-4 py-2 bg-themeAccent text-white text-sm font-semibold rounded-lg hover:bg-blue-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      Dalej →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Current income */}
          {step === 2 && (
            <motion.div
              key="current-income"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ willChange: "transform, opacity" }}
              className="space-y-6"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-center">Ile zarabiasz miesięcznie?</h2>
              <div className="grid grid-cols-2 gap-3">
                {CURRENT_INCOME_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleCurrentIncome(opt.id)}
                    className={`${cardBase} py-6 text-center ${currentIncome === opt.id ? cardSelected : cardDefault}`}
                  >
                    <span className="text-lg font-bold">{opt.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Target income */}
          {step === 3 && (
            <motion.div
              key="target-income"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ willChange: "transform, opacity" }}
              className="space-y-6"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-center">Ile chcesz zarabiać miesięcznie?</h2>
              <div className="grid grid-cols-2 gap-3">
                {TARGET_INCOME_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleTargetIncome(opt.id)}
                    className={`${cardBase} py-6 text-center ${targetIncome === opt.id ? cardSelected : cardDefault}`}
                  >
                    <span className="text-lg font-bold">{opt.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Steps 4-9: Tak/Nie phase questions */}
          {isPhaseQuestionStep && (
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ willChange: "transform, opacity" }}
              className="text-center space-y-8"
            >
              <p className="text-xs text-white/30 uppercase tracking-widest">
                Pytanie {questionIndex + 1} z {totalQuestions}
              </p>
              <h2 className="text-xl sm:text-2xl font-bold leading-snug">
                {QUIZ_QUESTIONS[questionIndex].question}
              </h2>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => answer(true)}
                  className="flex-1 max-w-[160px] py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-2xl hover:border-themeAccent/50 hover:bg-themeAccent/10 hover:shadow-gold-glow transition-[color,border-color,background-color,box-shadow,transform] duration-150 text-lg active:scale-95"
                >
                  Tak
                </button>
                <button
                  onClick={() => answer(false)}
                  className="flex-1 max-w-[160px] py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-2xl hover:border-white/30 hover:bg-white/10 transition-[color,border-color,background-color,box-shadow,transform] duration-150 text-lg active:scale-95"
                >
                  Nie
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 10: Transition screen */}
          {isTransitionStep && (
            <motion.div
              key="transition"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ willChange: "transform, opacity" }}
              className="text-center space-y-6"
            >
              <p className="text-themeAccent text-xs uppercase tracking-widest font-semibold">Faza obliczona ✓</p>
              <h2 className="text-xl sm:text-2xl font-bold leading-snug">
                Świetnie! Jeszcze kilka pytań o Twoje obecne systemy...
              </h2>
              <p className="text-white/50 text-sm max-w-md mx-auto">
                To pomoże nam dopasować konkretne rekomendacje dla Ciebie.
              </p>
              <button
                onClick={goNext}
                className="px-8 py-4 bg-themeAccent text-white font-bold rounded-2xl hover:bg-blue-400 transition-all duration-300 shadow-gold-glow hover:shadow-gold-glow-strong active:scale-95 inline-flex items-center gap-2"
              >
                Dalej →
              </button>
            </motion.div>
          )}

          {/* Steps 10-17: Diagnostic Tak/Nie questions */}
          {isDiagStep && diagIndex >= 0 && diagIndex < DIAGNOSTIC_QUESTIONS.length && (
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ willChange: "transform, opacity" }}
              className="text-center space-y-8"
            >
              <p className="text-xs text-white/30 uppercase tracking-widest">
                System {diagIndex + 1} z {DIAGNOSTIC_QUESTIONS.length}
              </p>
              <h2 className="text-xl sm:text-2xl font-bold leading-snug">
                {DIAGNOSTIC_QUESTIONS[diagIndex].question}
              </h2>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => answerDiag(true)}
                  className="flex-1 max-w-[160px] py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-2xl hover:border-themeAccent/50 hover:bg-themeAccent/10 hover:shadow-gold-glow transition-[color,border-color,background-color,box-shadow,transform] duration-150 text-lg active:scale-95"
                >
                  Tak
                </button>
                <button
                  onClick={() => answerDiag(false)}
                  className="flex-1 max-w-[160px] py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-2xl hover:border-white/30 hover:bg-white/10 transition-[color,border-color,background-color,box-shadow,transform] duration-150 text-lg active:scale-95"
                >
                  Nie
                </button>
              </div>
            </motion.div>
          )}
          {/* Step 18: Investment readiness */}
          {isInvestStep && (
            <motion.div
              key="invest"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ willChange: "transform, opacity" }}
              className="text-center space-y-8"
            >
              <p className="text-themeAccent text-xs uppercase tracking-widest font-semibold">Ostatnie pytanie</p>
              <h2 className="text-xl sm:text-2xl font-bold leading-snug">
                Czy jesteś gotowy zainwestować w systemy które zwrócą się w ciągu 30–90 dni?
              </h2>
              <p className="text-white/50 text-sm max-w-md mx-auto">
                Firmy które wdrożyły nasze systemy odzyskują inwestycję średnio w 6 tygodni.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => handleInvestAnswer(true)}
                  className="flex-1 max-w-[160px] py-4 bg-themeAccent text-white font-bold rounded-xl hover:bg-blue-400 transition-all duration-150 text-lg"
                >
                  Tak ✓
                </button>
                <button
                  onClick={() => handleInvestAnswer(false)}
                  className="flex-1 max-w-[160px] py-4 bg-white/5 border border-white/12 text-white font-semibold rounded-xl hover:border-themeAccent/50 hover:bg-themeAccent/10 transition-all duration-150 text-lg"
                >
                  Nie teraz
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 19: Budget selection */}
          {isBudgetStep && (
            <motion.div
              key="budget"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ willChange: "transform, opacity" }}
              className="space-y-6"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-center">Jaki masz miesięczny budżet na wdrożenie?</h2>
              <p className="text-white/50 text-sm text-center">Dobierzemy rozwiązania dopasowane do Twojego budżetu</p>
              <div className="grid grid-cols-1 gap-3">
                {BUDGET_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleBudgetSelect(opt.id)}
                    className={`${cardBase} flex justify-between items-center ${budget === opt.id ? cardSelected : cardDefault}`}
                  >
                    <span className="font-bold text-base">{opt.label}</span>
                    <span className="text-white/40 text-sm">{opt.sublabel}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Back button */}
      {step > 2 && (
        <div className="mt-6 text-center">
          <button
            onClick={back}
            className="text-white/40 hover:text-white/70 text-sm transition-colors"
          >
            ← Wróć
          </button>
        </div>
      )}
    </section>
  );
}
