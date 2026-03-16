# The Brand GAMEPLAN — Lead Magnet Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Zbudować spersonalizowaną stronę lead magnet, gdzie klient wybiera fazę biznesu (0–7), dostaje dopasowaną diagnozę, radar chart, plan działania i CTA do umówienia spotkania, a jego dane trafiają do Notion + welcome email przez Resend.

**Architecture:** Baza to `okademia_waitinglist` template (Next.js 14 App Router). Strona ma jeden URL — quiz u góry, wyniki pojawiają się dynamicznie pod spodem po wyborze fazy. Stan zarządzany lokalnie przez `useState` w `page.tsx`. Email capture na końcu wyników → POST do `/api/notion` i `/api/mail`.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Resend, Notion API, Upstash Redis, Vercel, Figtree font (Google Fonts)

---

## File Map

| Plik | Status | Odpowiedzialność |
|------|--------|-----------------|
| `app/layout.tsx` | Modify | Metadata PL, Figtree font, dark theme |
| `app/page.tsx` | Replace | Orkiestrator: hero + quiz + wyniki + email state |
| `app/globals.css` | Keep | Tailwind base |
| `app/api/notion/route.ts` | Modify | Dodaje pole `phase` do zapisu |
| `app/api/mail/route.ts` | Modify | Personalizacja emaila per faza |
| `lib/phase-data.ts` | Create | Dane dla faz 0–7 (TypeScript interface + data) |
| `lib/animation-variants.ts` | Keep/extend | Framer Motion variants |
| `lib/utils.ts` | Keep | cn() helper |
| `components/hero.tsx` | Create | Hero section z nagłówkiem i strzałką do quizu |
| `components/quiz.tsx` | Create | Grid 8 kart faz — klik = wybór |
| `components/results/index.tsx` | Create | Kontener wyników z AnimatePresence |
| `components/results/phase-indicator.tsx` | Create | Progress bar 0→7 z aktywną fazą |
| `components/results/truth-card.tsx` | Create | "Prawda jest taka..." + największa przeszkoda |
| `components/results/focus-card.tsx` | Create | "Twoje skupienie" + SVG radar chart |
| `components/results/how-to-win.tsx` | Create | "Jak wygrać" — priority matrix 1–6 |
| `components/results/bottom-line.tsx` | Create | "The BOTTOM LINE" — 3 karty akcji |
| `components/results/next-phase.tsx` | Create | "Twoja kolejna faza" — preview |
| `components/results/cta-card.tsx` | Create | Email capture + "Umów spotkanie" CTA |
| `components/ui/radar-chart.tsx` | Create | SVG radar chart animowany Framer Motion |
| `emails/welcome.tsx` | Modify | Welcome email z treścią per faza |

---

## Chunk 1: Setup projektu

### Task 1: Sklonuj template i zainstaluj zależności

**Files:**
- Create: całe repo (clone)

- [ ] **Step 1: Sklonuj template do katalogu projektu**

```bash
cd "/Users/dawidstepien/Desktop/Project/[P22]Personalized_landingPage"
git clone https://github.com/WujsST/okademia_waitinglist .
```

- [ ] **Step 2: Zainstaluj zależności**

```bash
npm install
# lub jeśli dostępny bun:
# bun install
```

- [ ] **Step 3: Stwórz .env.local**

```bash
cp .env.example .env.local
```

Zawartość `.env.local`:
```
NOTION_SECRET=your_notion_integration_secret
NOTION_DB=your_notion_database_id
RESEND_API_KEY=your_resend_api_key
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

- [ ] **Step 4: Zweryfikuj że dev server startuje**

```bash
npm run dev
```

Oczekiwane: serwer startuje na http://localhost:3000, strona waitlist się ładuje.

- [ ] **Step 5: Commit punktu startowego**

```bash
git add -A
git commit -m "chore: base template from okademia_waitinglist"
```

---

## Chunk 2: Dane faz

### Task 2: Stwórz `lib/phase-data.ts`

**Files:**
- Create: `lib/phase-data.ts`

- [ ] **Step 1: Zdefiniuj TypeScript interface i dane faz**

Stwórz `lib/phase-data.ts`:

```typescript
export interface PhaseData {
  id: number;
  name: string;        // "Zdecyduj"
  label: string;       // "Faza 0"
  truth: string;       // "Prawda jest taka..."
  mainClaim: string;   // główne zdanie diagnozy
  biggestObstacle: string;
  focusPrimary: string; // nazwa głównej dziedziny
  radarWeights: {      // wartości 0-10 dla radar chart
    identyfikacja: number;
    positioning: number;
    oferta: number;
    content: number;
    marketing: number;
    team: number;
  };
  priorities: string[]; // ["Identyfikacja", "Oferta", ...] — kolejność 1-6
  bottomLine: {        // 3 karty akcji
    title: string;
    description: string;
  }[];
  nextPhase: number;   // id następnej fazy
  knowAbout: string[]; // bullet lista "Na tej fazie wiesz o..."
  implementationTime: string; // "3-4 tygodnie"
}

export const PHASES: PhaseData[] = [
  {
    id: 0,
    name: "Zdecyduj",
    label: "Faza 0",
    truth: "Prawda jest taka...",
    mainClaim: "Masz pomysł, ale jeszcze nie ruszyłeś. To normalne — każdy zaczyna od zera.",
    biggestObstacle: "BRAK DECYZJI I JASNOŚCI",
    focusPrimary: "Identyfikacja",
    radarWeights: {
      identyfikacja: 9,
      positioning: 3,
      oferta: 2,
      content: 1,
      marketing: 1,
      team: 1,
    },
    priorities: ["Identyfikacja", "Oferta", "Positioning", "Content", "Marketing", "Team"],
    bottomLine: [
      { title: "Zdefiniuj klienta", description: "Określ dokładnie komu pomagasz i jaki problem rozwiązujesz." },
      { title: "Stwórz pierwszą ofertę", description: "Prosta, jasna propozycja wartości — nie musisz mieć wszystkiego gotowego." },
      { title: "Zrób pierwszy krok", description: "Porozmawiaj z 5 potencjalnymi klientami. Walidacja przed budowaniem." },
    ],
    nextPhase: 1,
    knowAbout: [
      "Kim jest Twój idealny klient",
      "Jaki problem rozwiązujesz",
      "Dlaczego chcesz to robić",
    ],
    implementationTime: "2-4 tygodnie",
  },
  {
    id: 1,
    name: "Udowodnij",
    label: "Faza 1",
    truth: "Prawda jest taka...",
    mainClaim: "Jesteś już prawie gotowy na dłuższą grę. Masz podstawy — teraz musisz je udowodnić.",
    biggestObstacle: "ROZPOCZĘCIE Z NICZEGO",
    focusPrimary: "Identyfikacja",
    radarWeights: {
      identyfikacja: 8,
      positioning: 5,
      oferta: 6,
      content: 3,
      marketing: 2,
      team: 1,
    },
    priorities: ["Identyfikacja", "Oferta", "Positioning", "Content", "Marketing", "Team"],
    bottomLine: [
      { title: "Zbuduj podstawy online", description: "Strona, LinkedIn lub profil — miejsce gdzie klient może Cię znaleźć." },
      { title: "Pozyskaj pierwsze case study", description: "Jeden prawdziwy wynik klienta wart jest więcej niż 100 słów obietnicy." },
      { title: "Ustal proces obsługi", description: "Jak wygląda praca z Tobą od A do Z — zdefiniuj to teraz." },
    ],
    nextPhase: 2,
    knowAbout: [
      "Kto jest Twoim klientem i co go boli",
      "Jak wygląda Twoja oferta",
      "Jaką wartość dostarczasz",
    ],
    implementationTime: "4-8 tygodni",
  },
  {
    id: 2,
    name: "Zbuduj",
    label: "Faza 2",
    truth: "Prawda jest taka...",
    mainClaim: "Masz już coś działającego. Teraz czas zbudować systemy, które będą skalować.",
    biggestObstacle: "BRAK SYSTEMÓW I PROCESÓW",
    focusPrimary: "Oferta",
    radarWeights: {
      identyfikacja: 7,
      positioning: 6,
      oferta: 9,
      content: 5,
      marketing: 4,
      team: 3,
    },
    priorities: ["Oferta", "Positioning", "Identyfikacja", "Marketing", "Content", "Team"],
    bottomLine: [
      { title: "Zautomatyzuj onboarding", description: "Klient nie może czekać — stwórz system który działa bez Ciebie." },
      { title: "Skaluj ofertę", description: "Dodaj tier lub produkt, który działa dla większej liczby klientów." },
      { title: "Mierz wyniki", description: "Bez danych nie wiesz co działa. Wprowadź KPI dla każdego obszaru." },
    ],
    nextPhase: 3,
    knowAbout: [
      "Jak działa Twój proces sprzedaży",
      "Które usługi przynoszą największy ROI",
      "Jak obsługiwać klientów efektywnie",
    ],
    implementationTime: "6-12 tygodni",
  },
  {
    id: 3,
    name: "Odróżnij się",
    label: "Faza 3",
    truth: "Prawda jest taka...",
    mainClaim: "Konkurencja rośnie. Czas wypracować unikalną pozycję, która sprawia że klienci wybierają właśnie Ciebie.",
    biggestObstacle: "BRAK WYRÓŻNIKA NA RYNKU",
    focusPrimary: "Positioning",
    radarWeights: {
      identyfikacja: 7,
      positioning: 9,
      oferta: 7,
      content: 6,
      marketing: 5,
      team: 4,
    },
    priorities: ["Positioning", "Content", "Oferta", "Marketing", "Identyfikacja", "Team"],
    bottomLine: [
      { title: "Zdefiniuj swój USP", description: "Co robisz inaczej niż wszyscy? Klienci kupują różnicę, nie podobieństwo." },
      { title: "Zbuduj content strategy", description: "Treści, które pokazują Twoją unikalną perspektywę i przyciągają właściwych klientów." },
      { title: "Podnieś ceny", description: "Specjalista zarabia więcej niż generalist. Pozycjonowanie = wyższe marże." },
    ],
    nextPhase: 4,
    knowAbout: [
      "Kto jest Twoją konkurencją",
      "Co sprawia że klienci zostają z Tobą",
      "Jaki jest Twój unikalny proces lub metodologia",
    ],
    implementationTime: "8-16 tygodni",
  },
  {
    id: 4,
    name: "Optymalizuj",
    label: "Faza 4",
    truth: "Prawda jest taka...",
    mainClaim: "Masz działający biznes. Teraz każda godzina Twojej pracy powinna być warta więcej.",
    biggestObstacle: "NIEEFEKTYWNOŚĆ I CZAS",
    focusPrimary: "Marketing",
    radarWeights: {
      identyfikacja: 6,
      positioning: 7,
      oferta: 7,
      content: 6,
      marketing: 9,
      team: 5,
    },
    priorities: ["Marketing", "Team", "Oferta", "Positioning", "Content", "Identyfikacja"],
    bottomLine: [
      { title: "Wdróż AI do procesów", description: "Automatyzacja powtarzalnych zadań to wolny czas na strategię i klientów." },
      { title: "Zbuduj lejek marketingowy", description: "Klienci powinni przychodzić do Ciebie — nie odwrotnie." },
      { title: "Deleguj i skaluj team", description: "Zatrudnij lub outsourcuj to co nie wymaga Ciebie osobiście." },
    ],
    nextPhase: 5,
    knowAbout: [
      "Które procesy można zautomatyzować",
      "Skąd przychodzą Twoi najlepsi klienci",
      "Co wymaga Twojego czasu, a co nie",
    ],
    implementationTime: "10-20 tygodni",
  },
  {
    id: 5,
    name: "Lead",
    label: "Faza 5",
    truth: "Prawda jest taka...",
    mainClaim: "Masz sprawdzony model. Teraz czas przejąć rynek przez systematyczne generowanie leadów.",
    biggestObstacle: "BRAK PRZEWIDYWALNEGO PIPELINE'U",
    focusPrimary: "Marketing",
    radarWeights: {
      identyfikacja: 6,
      positioning: 7,
      oferta: 6,
      content: 8,
      marketing: 10,
      team: 6,
    },
    priorities: ["Marketing", "Content", "Team", "Positioning", "Oferta", "Identyfikacja"],
    bottomLine: [
      { title: "Stwórz lead magnet", description: "Daj wartość z góry. Ludzie muszą poczuć Twoją jakość zanim zapłacą." },
      { title: "Uruchom kampanie outreach", description: "Systematyczny, personalizowany kontakt z potencjalnymi klientami." },
      { title: "Zbuduj retencję", description: "Lojalni klienci to tańszy growth niż ciągłe pozyskiwanie nowych." },
    ],
    nextPhase: 6,
    knowAbout: [
      "Jak mierzyć koszt pozyskania klienta (CAC)",
      "Jakie kanały marketingowe działają w Twojej branży",
      "Jak budować relacje z potencjalnymi klientami",
    ],
    implementationTime: "12-24 tygodnie",
  },
  {
    id: 6,
    name: "Pivot",
    label: "Faza 6",
    truth: "Prawda jest taka...",
    mainClaim: "Rynek się zmienił lub dotarłeś do sufitu. Pivot to nie porażka — to strategiczna decyzja.",
    biggestObstacle: "STRACH PRZED ZMIANĄ I SUNK COST",
    focusPrimary: "Identyfikacja",
    radarWeights: {
      identyfikacja: 9,
      positioning: 8,
      oferta: 7,
      content: 5,
      marketing: 6,
      team: 5,
    },
    priorities: ["Identyfikacja", "Positioning", "Oferta", "Marketing", "Team", "Content"],
    bottomLine: [
      { title: "Zwaliduj nowy kierunek", description: "Przed pivitem — 10 rozmów z potencjalnymi klientami nowego segmentu." },
      { title: "Przenieś reputację", description: "Twoje dotychczasowe wyniki i case study są aktywem w nowym kierunku." },
      { title: "Minimum Viable Pivot", description: "Testuj nowy model na małej skali zanim porzucisz stary." },
    ],
    nextPhase: 7,
    knowAbout: [
      "Dlaczego obecny model nie skaluje",
      "Co Twoi klienci naprawdę kupują od Ciebie",
      "Które umiejętności możesz przenieść do nowej niszy",
    ],
    implementationTime: "16-32 tygodnie",
  },
  {
    id: 7,
    name: "Rośnij",
    label: "Faza 7",
    truth: "Prawda jest taka...",
    mainClaim: "Jesteś w czołówce. Teraz gra toczy się o dominację rynku i budowanie imperium.",
    biggestObstacle: "SKALOWANIE BEZ UTRATY JAKOŚCI",
    focusPrimary: "Team",
    radarWeights: {
      identyfikacja: 7,
      positioning: 8,
      oferta: 7,
      content: 7,
      marketing: 8,
      team: 10,
    },
    priorities: ["Team", "Marketing", "Positioning", "Content", "Oferta", "Identyfikacja"],
    bottomLine: [
      { title: "Zbuduj autonomiczny team", description: "Biznes który nie może działać bez Ciebie to pułapka, nie sukces." },
      { title: "Wejdź w nowe kanały", description: "Partnerstwa, enterprise, nowe rynki — to jest Twoja gra na tym poziomie." },
      { title: "Zostań liderem opinii", description: "Twoja wiedza i historia to najpotężniejszy marketing jaki istnieje." },
    ],
    nextPhase: 7, // stays at 7
    knowAbout: [
      "Jak delegować decyzje strategiczne",
      "Jak budować kulturę organizacyjną przy skali",
      "Jakie partnerstwa mogą przyspieszyć Twój wzrost",
    ],
    implementationTime: "Ciągły proces",
  },
];

export const getPhase = (id: number): PhaseData => {
  const phase = PHASES.find(p => p.id === id);
  if (!phase) throw new Error(`Phase ${id} not found`);
  return phase;
};
```

- [ ] **Step 2: Commit**

```bash
git add lib/phase-data.ts
git commit -m "feat: add phase data for all 8 phases (0-7)"
```

---

## Chunk 3: SVG Radar Chart

### Task 3: Stwórz `components/ui/radar-chart.tsx`

**Files:**
- Create: `components/ui/radar-chart.tsx`

- [ ] **Step 1: Zaimplementuj SVG radar chart**

Stwórz `components/ui/radar-chart.tsx`:

```typescript
"use client";

import { motion } from "framer-motion";

interface RadarData {
  identyfikacja: number;
  positioning: number;
  oferta: number;
  content: number;
  marketing: number;
  team: number;
}

interface RadarChartProps {
  data: RadarData;
  highlight: string; // nazwa głównej dziedziny
}

const LABELS = [
  { key: "identyfikacja", label: "Identyfikacja" },
  { key: "positioning", label: "Positioning" },
  { key: "oferta", label: "Oferta" },
  { key: "content", label: "Content" },
  { key: "marketing", label: "Marketing" },
  { key: "team", label: "Team" },
] as const;

const SIZE = 200;
const CENTER = SIZE / 2;
const MAX_RADIUS = 75;
const LEVELS = 5;

function polarToCartesian(angle: number, radius: number) {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

export function RadarChart({ data, highlight }: RadarChartProps) {
  const keys = LABELS.map(l => l.key);
  const angleStep = 360 / keys.length;

  // Grid polygons
  const gridPolygons = Array.from({ length: LEVELS }, (_, i) => {
    const r = (MAX_RADIUS * (i + 1)) / LEVELS;
    const points = keys.map((_, j) => {
      const { x, y } = polarToCartesian(j * angleStep, r);
      return `${x},${y}`;
    }).join(" ");
    return points;
  });

  // Data polygon
  const dataPoints = keys.map((key, i) => {
    const value = data[key as keyof RadarData];
    const r = (value / 10) * MAX_RADIUS;
    return polarToCartesian(i * angleStep, r);
  });
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        {/* Grid */}
        {gridPolygons.map((points, i) => (
          <polygon
            key={i}
            points={points}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        ))}

        {/* Axes */}
        {keys.map((_, i) => {
          const { x, y } = polarToCartesian(i * angleStep, MAX_RADIUS);
          return (
            <line
              key={i}
              x1={CENTER} y1={CENTER}
              x2={x} y2={y}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon */}
        <motion.path
          d={dataPath}
          fill="rgba(250,204,21,0.15)"
          stroke="rgba(250,204,21,0.8)"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.3 }}
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
        />

        {/* Labels */}
        {LABELS.map((item, i) => {
          const { x, y } = polarToCartesian(i * angleStep, MAX_RADIUS + 18);
          const isHighlight = item.label.toLowerCase() === highlight.toLowerCase();
          return (
            <text
              key={i}
              x={x} y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="9"
              fontWeight={isHighlight ? "700" : "400"}
              fill={isHighlight ? "rgb(250,204,21)" : "rgba(255,255,255,0.5)"}
            >
              {item.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/radar-chart.tsx
git commit -m "feat: add SVG radar chart component with framer motion animation"
```

---

## Chunk 4: Komponenty wyników

### Task 4: Stwórz phase-indicator.tsx

**Files:**
- Create: `components/results/phase-indicator.tsx`

- [ ] **Step 1: Zaimplementuj progress bar faz**

Stwórz `components/results/phase-indicator.tsx`:

```typescript
import { PHASES } from "@/lib/phase-data";
import { cn } from "@/lib/utils";

interface PhaseIndicatorProps {
  activePhase: number;
}

export function PhaseIndicator({ activePhase }: PhaseIndicatorProps) {
  return (
    <div className="w-full space-y-3">
      <p className="text-sm text-white/40 uppercase tracking-widest">Jesteś tutaj</p>
      <div className="flex items-center gap-1">
        {PHASES.map((phase) => (
          <div key={phase.id} className="flex-1 flex flex-col items-center gap-1.5">
            <div
              className={cn(
                "h-1 w-full rounded-full transition-all duration-500",
                phase.id <= activePhase ? "bg-yellow-400" : "bg-white/10"
              )}
            />
            <span
              className={cn(
                "text-[10px] font-medium transition-colors duration-300 hidden sm:block",
                phase.id === activePhase ? "text-yellow-400" : "text-white/30"
              )}
            >
              {phase.id}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-white/30">
        <span>Faza 0 — Zdecyduj</span>
        <span className="font-semibold text-yellow-400">
          {PHASES[activePhase].label} — {PHASES[activePhase].name}
        </span>
        <span>Faza 7 — Rośnij</span>
      </div>
    </div>
  );
}
```

### Task 5: Stwórz truth-card.tsx

**Files:**
- Create: `components/results/truth-card.tsx`

- [ ] **Step 1: Zaimplementuj kartę "Prawda jest taka"**

Stwórz `components/results/truth-card.tsx`:

```typescript
import { PhaseData } from "@/lib/phase-data";

interface TruthCardProps {
  phase: PhaseData;
}

export function TruthCard({ phase }: TruthCardProps) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 p-8 space-y-4">
      <h2 className="text-2xl font-bold">{phase.label}</h2>
      <p className="text-lg font-semibold text-white/80">{phase.truth}</p>
      <p className="text-white/60 leading-relaxed">{phase.mainClaim}</p>
      <div className="pt-2 border-t border-white/8">
        <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Największa przeszkoda</p>
        <p className="font-bold text-yellow-400">{phase.biggestObstacle}</p>
      </div>
    </div>
  );
}
```

### Task 6: Stwórz focus-card.tsx

**Files:**
- Create: `components/results/focus-card.tsx`

- [ ] **Step 1: Zaimplementuj kartę skupienia z radar chart**

Stwórz `components/results/focus-card.tsx`:

```typescript
import { PhaseData } from "@/lib/phase-data";
import { RadarChart } from "@/components/ui/radar-chart";

interface FocusCardProps {
  phase: PhaseData;
}

export function FocusCard({ phase }: FocusCardProps) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 p-8 space-y-6">
      <div>
        <h3 className="text-xl font-bold">Twoje skupienie</h3>
        <p className="text-white/50 mt-1">
          Powinieneś się skupić na{" "}
          <span className="font-semibold text-yellow-400">{phase.focusPrimary}</span>
        </p>
      </div>
      <div className="flex justify-center">
        <RadarChart data={phase.radarWeights} highlight={phase.focusPrimary} />
      </div>
    </div>
  );
}
```

### Task 7: Stwórz how-to-win.tsx

**Files:**
- Create: `components/results/how-to-win.tsx`

- [ ] **Step 1: Zaimplementuj priority matrix**

Stwórz `components/results/how-to-win.tsx`:

```typescript
import { PhaseData } from "@/lib/phase-data";

interface HowToWinProps {
  phase: PhaseData;
}

export function HowToWin({ phase }: HowToWinProps) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 p-8 space-y-6">
      <div>
        <h3 className="text-xl font-bold">Jak wygrać</h3>
        <p className="text-white/50 mt-1">
          Priorytet na <span className="text-yellow-400 font-semibold">{phase.focusPrimary}</span>
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {phase.priorities.map((priority, index) => (
          <div
            key={priority}
            className={`rounded-xl p-3 flex items-center gap-3 border transition-all ${
              index === 0
                ? "border-yellow-400/40 bg-yellow-400/8 col-span-2"
                : "border-white/8 bg-white/2"
            }`}
          >
            <span
              className={`text-xs font-bold min-w-[20px] ${
                index === 0 ? "text-yellow-400" : "text-white/30"
              }`}
            >
              {index + 1}
            </span>
            <span className={`text-sm font-medium ${index === 0 ? "text-yellow-400" : "text-white/70"}`}>
              {priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Task 8: Stwórz bottom-line.tsx

**Files:**
- Create: `components/results/bottom-line.tsx`

- [ ] **Step 1: Zaimplementuj 3 karty akcji**

Stwórz `components/results/bottom-line.tsx`:

```typescript
import { PhaseData } from "@/lib/phase-data";

interface BottomLineProps {
  phase: PhaseData;
}

export function BottomLine({ phase }: BottomLineProps) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 p-8 space-y-6">
      <div>
        <h3 className="text-xl font-bold">The BOTTOM LINE</h3>
        <p className="text-white/50 mt-1">Konkluzja całej sytuacji</p>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {phase.bottomLine.map((item, i) => (
          <div key={i} className="rounded-xl border border-white/8 bg-white/2 p-5 space-y-2">
            <p className="font-semibold text-sm">{item.title}</p>
            <p className="text-white/50 text-xs leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Task 9: Stwórz next-phase.tsx i cta-card.tsx

**Files:**
- Create: `components/results/next-phase.tsx`
- Create: `components/results/cta-card.tsx`

- [ ] **Step 1: Zaimplementuj next-phase**

Stwórz `components/results/next-phase.tsx`:

```typescript
import { PhaseData, PHASES } from "@/lib/phase-data";

interface NextPhaseProps {
  phase: PhaseData;
}

export function NextPhase({ phase }: NextPhaseProps) {
  const next = PHASES[phase.nextPhase];
  const isFinal = phase.id === 7;

  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 p-8 space-y-4">
      <h3 className="text-xl font-bold">
        {isFinal ? "Jesteś na szczycie" : "Twoja kolejna faza to:"}
      </h3>
      {!isFinal && (
        <div className="flex items-center gap-4">
          <div className="rounded-xl border border-yellow-400/20 bg-yellow-400/5 px-5 py-3">
            <p className="text-yellow-400 font-bold">{next.label}</p>
            <p className="text-white/70 text-sm">{next.name}</p>
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-xs text-white/40 uppercase tracking-widest">Na tej fazie wiesz o</p>
            <ul className="space-y-1">
              {phase.knowAbout.map((item, i) => (
                <li key={i} className="text-sm text-white/60 flex items-start gap-2">
                  <span className="text-yellow-400 mt-0.5">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Zaimplementuj cta-card**

Stwórz `components/results/cta-card.tsx`:

```typescript
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
```

- [ ] **Step 3: Commit**

```bash
git add components/results/
git commit -m "feat: add all result card components (truth, focus, how-to-win, bottom-line, next-phase, cta)"
```

---

## Chunk 5: Quiz i strona główna

### Task 10: Stwórz hero.tsx i quiz.tsx

**Files:**
- Create: `components/hero.tsx`
- Create: `components/quiz.tsx`

- [ ] **Step 1: Zaimplementuj hero**

Stwórz `components/hero.tsx`:

```typescript
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
```

- [ ] **Step 2: Zaimplementuj quiz**

Stwórz `components/quiz.tsx`:

```typescript
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
```

### Task 11: Stwórz results/index.tsx i zaktualizuj app/page.tsx

**Files:**
- Create: `components/results/index.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Stwórz kontener wyników**

Stwórz `components/results/index.tsx`:

```typescript
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PhaseData } from "@/lib/phase-data";
import { PhaseIndicator } from "./phase-indicator";
import { TruthCard } from "./truth-card";
import { FocusCard } from "./focus-card";
import { HowToWin } from "./how-to-win";
import { BottomLine } from "./bottom-line";
import { NextPhase } from "./next-phase";
import { CtaCard } from "./cta-card";

interface ResultsProps {
  phase: PhaseData | null;
}

export function Results({ phase }: ResultsProps) {
  return (
    <section id="results" className="w-full max-w-4xl mx-auto px-4 pb-24">
      <AnimatePresence mode="wait">
        {phase && (
          <motion.div
            key={phase.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="space-y-4"
          >
            <PhaseIndicator activePhase={phase.id} />
            <TruthCard phase={phase} />
            <div className="grid sm:grid-cols-2 gap-4">
              <FocusCard phase={phase} />
              <HowToWin phase={phase} />
            </div>
            <BottomLine phase={phase} />
            <NextPhase phase={phase} />
            <CtaCard phase={phase} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
```

- [ ] **Step 2: Zaktualizuj app/page.tsx**

Zastąp zawartość `app/page.tsx`:

```typescript
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
```

- [ ] **Step 3: Commit**

```bash
git add components/ app/page.tsx
git commit -m "feat: wire up quiz, results, and main page orchestration"
```

---

## Chunk 6: API routes i email

### Task 12: Zaktualizuj API routes

**Files:**
- Modify: `app/api/notion/route.ts`
- Modify: `app/api/mail/route.ts`
- Modify: `emails/welcome.tsx`

- [ ] **Step 1: Zaktualizuj Notion route (dodaj pole phase)**

Zmień `app/api/notion/route.ts` — dodaj do body parsowania `phase` i zapisz w Notion:

```typescript
// W sekcji gdzie tworzysz page w Notion, dodaj:
Phase: {
  select: {
    name: `Faza ${phase} — ${phaseName}`,
  },
},
```

Konkretna zmiana w route.ts:
```typescript
import { PHASES } from "@/lib/phase-data";

// W handler:
const { name, email, phase } = await req.json();
const phaseData = phase !== undefined ? PHASES[phase] : null;

// W notion.pages.create properties:
properties: {
  Name: { title: [{ text: { content: name } }] },
  Email: { email },
  ...(phaseData && {
    Phase: { select: { name: `${phaseData.label} — ${phaseData.name}` } },
  }),
},
```

- [ ] **Step 2: Zaktualizuj mail route (dodaj phase do body)**

W `app/api/mail/route.ts` dodaj `phase` do parsowania i przekaż do szablonu:

```typescript
const { firstname, email, phase } = await req.json();
// Przekaż phase do WelcomeTemplate
```

- [ ] **Step 3: Zaktualizuj email template**

W `emails/welcome.tsx` dodaj sekcję per faza (prosty tekst):

```typescript
// Dodaj prop:
interface WelcomeTemplateProps {
  firstname: string;
  phase?: number;
}

// W body emaila dodaj sekcję:
{phase !== undefined && (
  <Section>
    <Text>Twoja faza: {PHASES[phase].label} — {PHASES[phase].name}</Text>
    <Text>Największa przeszkoda: {PHASES[phase].biggestObstacle}</Text>
    <Text>Twój priorytet: {PHASES[phase].focusPrimary}</Text>
  </Section>
)}
```

- [ ] **Step 4: Commit**

```bash
git add app/api/ emails/
git commit -m "feat: add phase field to notion, mail API routes and welcome email"
```

---

## Chunk 7: Layout i finalizacja

### Task 13: Zaktualizuj layout i metadata

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Zaktualizuj metadata**

W `app/layout.tsx` zmień:

```typescript
export const metadata: Metadata = {
  title: "The Brand GAMEPLAN — Odkryj swoją fazę wzrostu",
  description:
    "Sprawdź w której fazie jest Twój biznes i dowiedz się dokładnie co zrobić, żeby przejść do następnej.",
  openGraph: {
    title: "The Brand GAMEPLAN",
    description: "Spersonalizowana diagnoza fazy Twojego biznesu",
  },
};
```

- [ ] **Step 2: Zweryfikuj działanie całości**

```bash
npm run dev
```

Sprawdź:
- [ ] Hero renderuje się poprawnie
- [ ] Klik każdej z 8 faz → wyniki się pojawiają
- [ ] Radar chart animuje się po wyborze
- [ ] Priority matrix wyświetla poprawne priorytety per faza
- [ ] Email form wysyła dane (potrzebuje .env.local z prawdziwymi kluczami)
- [ ] Scroll do results działa płynnie

- [ ] **Step 3: Build check**

```bash
npm run build
```

Oczekiwane: zero błędów TypeScript, build przechodzi.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete Brand GAMEPLAN lead magnet MVP"
```

---

## Weryfikacja end-to-end

1. `npm run dev` → otwórz http://localhost:3000
2. Klik "Faza 1 — Udowodnij" → wyniki się pojawiają z animacją
3. Radar chart pokazuje żółty highlight na "Identyfikacja"
4. Priority matrix: Identyfikacja = Priorytet 1 (pełna szerokość)
5. Wpisz imię + email → submit → toast "Gotowe!"
6. Sprawdź Notion DB: nowy rekord z `Name`, `Email`, `Phase: Faza 1 — Udowodnij`
7. Sprawdź inbox: email z podsumowaniem fazy
8. Klik "Umów spotkanie" → otwiera booking link
9. `npm run build` → zero błędów
10. Deploy na Vercel → produkcja działa
