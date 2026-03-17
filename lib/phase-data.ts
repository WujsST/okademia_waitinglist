export interface PhaseData {
  id: number;
  name: string;        // "Zdecyduj"
  label: string;       // "Faza 0"
  truth: string;       // "Prawda jest taka..."
  mainClaim: string;   // główne zdanie diagnozy
  biggestObstacle: string;
  focusPrimary: string; // nazwa głównej dziedziny
  focusExplanation: string;  // 2-3 zdania tłumaczące dlaczego ten fokus
  whatToIgnore: string[];    // lista rzeczy do zignorowania w tej fazie
  howToWinDetails: string;   // paragraf ~3 zdania "jak wygrać w tej fazie"
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
    focusExplanation: "Na tym etapie jedyną rzeczą która ma znaczenie jest klarowność — kto płaci, za co dokładnie, ile i dlaczego Ty. Bez tego wszystkie inne działania to strzelanie w ciemność.",
    whatToIgnore: ["Social media", "Reklamy płatne", "Budowanie zespołu", "Skomplikowane narzędzia"],
    howToWinDetails: "Zaczniemy od bezpłatnej rozmowy gdzie przeanalizujemy Twój rynek i dobierzemy pierwsze narzędzia AI. Bez homework — to nasza robota. W ciągu 7 dni masz pierwsze wdrożenie które zaczyna pracować na Twój przychód zanim skończy się miesiąc.",
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
      { title: "Audyt — bezpłatnie, bez zobowiązań", description: "15 minut rozmowy wystarczy żeby wskazać gdzie tracisz pieniądze i co wdrożyć jako pierwsze." },
      { title: "Pierwsze narzędzie AI w 7 dni", description: "Nie teoria — konkretne wdrożenie które od razu zaczyna pracować na Twoje zlecenia." },
      { title: "System Opinii Google jako start", description: "Najprostszy ROI: automatyczne zbieranie opinii = więcej zapytań od razu." },
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
    focusExplanation: "Masz klarowność co oferujesz, ale jeszcze nie udowodniłeś że to działa na rynku. Pierwsi klienci i pierwsze wyniki to jedyna miara sukcesu na tym etapie.",
    whatToIgnore: ["Reklamy", "Personal branding", "Newsletter", "Agresywny outreach"],
    howToWinDetails: "Wdrożymy dla Ciebie system który zbiera opinie Google automatycznie po każdym zleceniu + podstawowy CRM żebyś nie gubił klientów. Te dwa elementy wystarczą żeby zamknąć lukę do Fazy 2 w ciągu 4–8 tygodni — bez żadnej dodatkowej pracy z Twojej strony.",
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
      { title: "System Opinii Google", description: "Automatyczne zbieranie po każdym zleceniu — Twój profil rośnie bez kiwnięcia palcem." },
      { title: "CRM dla pierwszych zleceń", description: "Żeby żaden klient nie wypadł przez brak systemu śledzenia." },
      { title: "Strona która konwertuje", description: "Klienci muszą Cię znaleźć i zadzwonić — strona to ich pierwszy krok." },
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
    focusExplanation: "Masz klientów, ale każda realizacja wygląda inaczej. Bez powtarzalnego procesu nie możesz skalować ani delegować. Teraz budujesz fundamenty pod każdy następny krok.",
    whatToIgnore: ["Personal branding", "Reklamy płatne", "Skalowanie", "Nowe usługi"],
    howToWinDetails: "Chaos zleceniowy kosztuje Cię co miesiąc zlecenia których nawet nie widzisz. Wdrożymy CRM z automatycznym dispatchingiem + automatyzację follow-upów — Twoja ekipa wie co robić bez telefonu do Ciebie, klienci dostają potwierdzenia automatycznie, Ty widzisz wszystko w jednym miejscu.",
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
      { title: "CRM + Dispatching", description: "Każde zlecenie, każdy pracownik, każdy deadline — w jednym miejscu. Zero gubionych zleceń." },
      { title: "Automatyczne follow-upy i opinie", description: "System sam wysyła potwierdzenia, przypomnienia i prośbę o opinię po realizacji." },
      { title: "Onboarding klienta bez Twojego czasu", description: "Klient podpisuje, dostaje materiały, wie co dalej — wszystko automatycznie." },
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
    focusExplanation: "Masz działający biznes, ale klienci mogą pójść do konkurencji równie łatwo jak do Ciebie. Twój unikalny wyróżnik to nie slogan — to konkretna, mierzalna różnica w wynikach lub doświadczeniu.",
    whatToIgnore: ["Walka ceną", "Kopiowanie konkurencji", "Nowe technologie", "Ekspansja rynkowa"],
    howToWinDetails: "Twoja przewaga nie leży w tym że sam wymyślisz 'unikalny wyróżnik' — leży w tym co wdrożymy dla Ciebie. Poprawimy Twój landing i ofertę tak żeby wyglądały jak lider rynku. Dodamy AI Voice Agent 24/7 i automatyczne opinie Google. Gdy konkurencja ma 8 opinii i nie odbiera telefonów — Ty masz 80+ opinii i zawsze odbierasz. To jest Twój USP — i my go budujemy.",
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
      { title: "Nowy landing + unikalna oferta", description: "Poprawiamy Twój landing i pozycjonowanie oferty — żebyś wyglądał jak oczywisty wybór, nie jak jeden z wielu." },
      { title: "AI Voice Agent 24/7", description: "Odbiera każdy telefon, kwalifikuje klienta, umawia — gdy konkurencja śpi, Ty zamykasz sprzedaż." },
      { title: "80+ Opinii Google automatycznie", description: "Automatyczny system zbierania opinii — stań się oczywistym wyborem na mapach bez złotówki na reklamę." },
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
    focusExplanation: "Dobrze znasz rynek i klientów, ale Twój czas jest wąskim gardłem. Każda godzina którą można zaoszczędzić przez automatyzację lub delegowanie to bezpośrednie przełożenie na przychód lub wolność.",
    whatToIgnore: ["Nowe produkty", "Nowe rynki", "Agresywna ekspansja", "Rebrand"],
    howToWinDetails: "Wdrożymy automatyzację 3 rzeczy które zajmują Ci najwięcej czasu: wyceny, koordynacja ekipy, follow-upy. AI Voice Agent przejmuje obsługę telefoniczną. CRM z dispatchingiem eliminuje telefony do pracowników. Wynik: 2–3 godziny dziennie z powrotem dla Ciebie — bez żadnego dodatkowego wysiłku.",
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
      { title: "Automatyzacja procesów biurowych", description: "Wyceny, faktury, raporty — maszyna robi to w 2 minuty zamiast Ciebie przez 2 godziny." },
      { title: "AI Voice Agent", description: "Obsługa telefoniczna 24/7 — zero straconej sprzedaży przez zajętą linię lub nieodebrany telefon." },
      { title: "CRM z automatycznym dispatchingiem", description: "Ekipa wie co robić bez 10 telefonów dziennie. Ty widzisz status każdego zlecenia." },
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
    focusExplanation: "Twój biznes działa sprawnie, ale wzrost zależy od przypadku i poleceń. Przewidywalny pipeline leadów to różnica między właścicielem biznesu a osobą samozatrudnioną.",
    whatToIgnore: ["Organiczny wzrost", "Czekanie na polecenia", "Jednorazowe kampanie", "Trendy social media"],
    howToWinDetails: "Zbudujemy dla Ciebie maszynę leadów opartą na AI: automatyczny system poleceń od obecnych klientów + opinie Google które przyciągają nowych + AI Voice Agent który zamyka sprzedaż zanim zdążysz oddzwonić. Bez reklam, bez social media — tylko systemy które pracują 24/7.",
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
      { title: "System Automatycznych Poleceń", description: "Zadowoleni klienci polecają — ale tylko jeśli masz system który pyta ich o to w odpowiednim momencie." },
      { title: "Opinie Google jako magnes na leady", description: "50+ opinii = 3x więcej zapytań bez złotówki na reklamę. Budujemy to automatycznie." },
      { title: "AI Voice Agent zamyka sprzedaż", description: "Lead przychodzi, dostaje odpowiedź natychmiast, umawia się — bez Twojego zaangażowania." },
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
    focusExplanation: "Masz działający biznes, ale nie satysfakcjonujący. To może być sygnał o zmianie rynku, o Twoich celach które ewoluowały, lub o suficie przychodowym który osiągnąłeś. Pivot wymaga odwagi ale też metodyczności.",
    whatToIgnore: ["Optymalizacja obecnego modelu", "Inwestycje w obecne kanały", "Budowanie na starych fundamentach", "Sunk cost"],
    howToWinDetails: "Pivot łatwiej przeprowadzić gdy masz systemy które działają niezależnie od branży. AI Voice Agent, CRM i automatyczne opinie Google działają dla każdej firmy usługowej. Przenosimy cały Twój ekosystem AI do nowego kierunku — bez budowania od zera, z zachowaniem reputacji i danych.",
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
      { title: "Walidacja niszowa przez dane", description: "Używamy AI i danych CRM żeby przetestować nowy kierunek zanim zainwestujesz w pełny pivot." },
      { title: "Ekosystem AI przenosi się z Tobą", description: "Voice Agent, CRM, automatyzacje — działają w każdej niszy usługowej. Zero budowania od zera." },
      { title: "Nowa strona + opinie = nowy start", description: "Budujemy nową pozycję rynkową w nowym kierunku — szybko i bez chaosu." },
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
    focusExplanation: "Jesteś na szczycie krzywej wzrostu. Teraz gra toczy się o skalowanie bez utraty jakości i budowanie aktywów które pracują bez Twojego czasu.",
    whatToIgnore: ["Mikrozarządzanie", "Operacyjna praca w biznesie", "Lokalny marketing", "Tanie projekty"],
    howToWinDetails: "Na tym poziomie wdrażamy pełny ekosystem AI: Voice Agent + CRM + Automatyzacje + System Poleceń + opinie Google. Wszystkie 6 systemów działają bez Twojego zaangażowania — Ty skupiasz się na strategii i partnerstwach, systemy generują przychód w tle.",
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
      { title: "Pełny ekosystem AI — wszystkie 6 systemów", description: "Max automatyzacja, max przychód, min Twojego czasu operacyjnego." },
      { title: "AI jako trwała przewaga konkurencyjna", description: "Gdy konkurencja wdroży to za rok, Ty będziesz rok do przodu z wynikami i opiniami." },
      { title: "Partnerstwa strategiczne przez reputację", description: "80+ opinii + profesjonalna infrastruktura = wiarygodność którą czuć na pierwszym spotkaniu." },
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

export interface DiagnosticQuestion {
  id: string;
  question: string;
  triggerOn: boolean; // true = "Tak" triggeruje rekomendację; false = "Nie"
  service: {
    name: string;
    shortDesc: string;
    fullDesc: string;
    badge: string;
  };
}

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: "google-reviews",
    question: "Czy masz system automatycznego pozyskiwania opinii na Google po każdej realizacji?",
    triggerOn: false,
    service: {
      name: "Zdobywaj więcej opinii na Google i przyciągaj klientów bez reklam",
      shortDesc: "60% klientów wybiera firmę na podstawie liczby opinii — zanim w ogóle zadzwoni.",
      fullDesc: "Firmy z 50+ opiniami dostają 3x więcej zapytań niż te z 10. Każda skończona robota to szansa na nową opinię — ale tylko jeśli masz system który sam o nią pyta. Bez tego tracisz klientów, którzy idą do konkurencji tylko dlatego, że ona ma więcej gwiazdek.",
      badge: "Automatyzacja",
    },
  },
  {
    id: "referrals",
    question: "Czy Twoi klienci regularnie polecają Cię swoim znajomym?",
    triggerOn: false,
    service: {
      name: "Zamień zadowolonych klientów w darmową reklamę dla Twojej firmy",
      shortDesc: "Polecony klient kosztuje 0 zł i kupuje 4x chętniej niż ktoś z reklamy.",
      fullDesc: "Większość klientów chętnie by Cię poleciła — ale nikt ich o to nie prosi w odpowiednim momencie. Automatyczny follow-up po zakończeniu zlecenia sprawia, że sami z siebie wracają i przyprowadzają znajomych. To najtańszy klient jakiego możesz pozyskać.",
      badge: "Marketing",
    },
  },
  {
    id: "manual-work",
    question: "Czy tracisz dużo czasu na ręczne przepisywanie danych do tabelek i papierkową robotę?",
    triggerOn: true,
    service: {
      name: "Odzyskaj kilka godzin tygodniowo — niech nudna robota robi się sama",
      shortDesc: "Właściciele firm tracą średnio 2–3 h dziennie na rzeczy które maszyna zrobi w 2 minuty.",
      fullDesc: "Przepisywanie, wyceny, faktury, raporty — to praca którą dziś robi człowiek, a powinna robić maszyna. Automatyzacja tych procesów nie tylko oszczędza czas, ale eliminuje błędy i daje Ci przestrzeń na to co naprawdę przynosi pieniądze: klientów i zlecenia.",
      badge: "AI",
    },
  },
  {
    id: "job-organization",
    question: "Czy masz system organizacji zleceń i prac ekipy, czy działasz 'na czuja'?",
    triggerOn: false,
    service: {
      name: "Przestań gasić pożary — wiedz co robi Twoja ekipa bez dzwonienia do każdego",
      shortDesc: "Brak systemu zleceń to chaos który kosztuje Cię zlecenia, czas i nerwy.",
      fullDesc: "Kiedy wszystko jest w głowie albo w Excelu, rzeczy wypadają. Klienci czekają za długo, ekipa nie wie co ma robić, Ty spędzasz pół dnia na koordynacji zamiast na biznesie. Jeden system porządkuje całość — widzisz każde zlecenie, każdego pracownika, każdy deadline.",
      badge: "CRM",
    },
  },
  {
    id: "phone-system",
    question: "Czy masz system który odbiera za Ciebie telefon i obsługuje klienta nawet gdy nikt nie jest przy biurku?",
    triggerOn: false,
    service: {
      name: "Przestań tracić klientów przez nieodebrany telefon — niech ktoś odbiera zawsze",
      shortDesc: "Aż 62% klientów nie oddzwania — jeśli nie odbierzesz za pierwszym razem, idą do konkurencji.",
      fullDesc: "Każdy nieodebrany telefon to potencjalnie utracone zlecenie. Wirtualny asystent głosowy odbiera połączenia 24/7, odpowiada na typowe pytania i umawia klientów — nawet w niedzielę o 21:00 gdy Ty już śpisz. Zero straconej sprzedaży przez zajętą linię.",
      badge: "AI",
    },
  },
  {
    id: "clv-awareness",
    question: "Czy wiesz dokładnie ile jest wart dla Ciebie jeden pozyskany klient przez cały czas współpracy?",
    triggerOn: false,
    service: {
      name: "Dowiedz się ile naprawdę zarabiasz na kliencie — i gdzie tracisz pieniądze",
      shortDesc: "Większość firm nie wie, że pozyskanie nowego klienta kosztuje 5x więcej niż utrzymanie starego.",
      fullDesc: "Jeśli nie wiesz ile wart jest Twój klient w ciągu roku czy dwóch, nie wiesz ile możesz wydać na jego pozyskanie. Firmy które to liczą, wydają lepiej i rosną szybciej. Te które nie liczą — przepalają budżet i zastanawiają się dlaczego reklamy 'nie działają'.",
      badge: "Marketing",
    },
  },
  {
    id: "website-awareness",
    question: "Klienci zanim zadzwonią — najpierw sprawdzają Cię w internecie. Czy Twoja strona WWW aktywnie przekonuje ich do wyboru właśnie Ciebie, czy tylko 'jest'?",
    triggerOn: false,
    service: {
      name: "Zamień swoją stronę w sprzedawcę który pracuje 24/7 bez wynagrodzenia",
      shortDesc: "75% klientów ocenia wiarygodność firmy na podstawie strony — w ciągu pierwszych 3 sekund.",
      fullDesc: "Jeśli Twoja strona wygląda słabo albo nie mówi wprost co robisz i dlaczego jesteś najlepszy — klient klika 'wstecz' i dzwoni do konkurencji. Dobra strona to nie wydatek, to inwestycja która zwraca się na każdym nowym zapytaniu.",
      badge: "Marketing",
    },
  },
  {
    id: "ai-awareness",
    question: "Twoja konkurencja już wdraża AI — automatyzuje oferty, obsługę klienta i follow-upy. Czy Ty masz już konkretny plan działania, żeby nie zostać w tyle?",
    triggerOn: false,
    service: {
      name: "Zacznij używać AI zanim Twoja konkurencja zostawi Cię daleko w tyle",
      shortDesc: "Firmy które wdrożyły AI w 2024 roku obsługują 2x więcej klientów tym samym zespołem.",
      fullDesc: "AI to nie technologia przyszłości — to narzędzie które dziś używa Twoja konkurencja do automatyzacji ofert, follow-upów i obsługi klienta. Bez planu wdrożenia każdy miesiąc to rosnąca przepaść między Tobą a firmami które już to robią. Czas na konkretne kroki.",
      badge: "AI",
    },
  },
];

export const getPhase = (id: number): PhaseData => {
  const phase = PHASES.find(p => p.id === id);
  if (!phase) throw new Error(`Phase ${id} not found`);
  return phase;
};

export interface QuizQuestion {
  id: number;
  question: string;
  // "Nie" → dana faza; ostatnie pytanie: "Tak" → Phase 7, "Nie" → Phase 6
  phaseIfNo: number;
}

// 5 pytań w kolejności dojrzałości biznesu
// Pierwsze "Nie" = ta faza klienta
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  { id: 0, question: "Czy masz powtarzalny system sprzedaży i dostarczania usługi?", phaseIfNo: 2 },
  { id: 1, question: "Czy wyróżniasz się wyraźnie od konkurencji?",                  phaseIfNo: 3 },
  { id: 2, question: "Czy Twój biznes działa sprawnie bez Twojej stałej obecności?", phaseIfNo: 4 },
  { id: 3, question: "Czy masz automatyczny, przewidywalny napływ nowych leadów?",   phaseIfNo: 5 },
  { id: 4, question: "Czy jesteś zadowolony z obecnego kierunku swojego biznesu?",   phaseIfNo: 6 },
];

// Oblicza ID fazy (0-7) na podstawie tablicy odpowiedzi (true=Tak, false=Nie)
export function computePhase(answers: boolean[]): number {
  for (let i = 0; i < QUIZ_QUESTIONS.length; i++) {
    if (answers[i] === false) return QUIZ_QUESTIONS[i].phaseIfNo;
  }
  return 7; // Wszystkie Tak → Rośnij
}
