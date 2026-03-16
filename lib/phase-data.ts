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
    nextPhase: 7,
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
