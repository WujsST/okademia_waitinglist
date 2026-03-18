import Link from "next/link";

export const metadata = {
  title: "Polityka prywatności | Okademia",
  description: "Polityka prywatności i klauzula RODO",
};

export default function PolitykaPrywatnosci() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.2em] text-white/40 hover:text-white/70 transition-colors mb-12 inline-block"
        >
          ← Powrót
        </Link>

        <article className="space-y-10">
          <header className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Polityka prywatności
            </h1>
            <p className="text-white/40 text-sm">Ostatnia aktualizacja: marzec 2026</p>
          </header>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">1. Administrator danych</h2>
            <p className="text-white/60 leading-relaxed">
              Administratorem Twoich danych osobowych jest <strong className="text-white">Dawid Stępień</strong>,
              adres e-mail: <strong className="text-white">[EMAIL]</strong>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">2. Podstawa prawna przetwarzania</h2>
            <p className="text-white/60 leading-relaxed">
              Twoje dane przetwarzamy na podstawie:
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/60 leading-relaxed">
              <li>
                <strong className="text-white/80">art. 6 ust. 1 lit. b RODO</strong> — przetwarzanie jest niezbędne do
                podjęcia działań przed zawarciem umowy (obsługa zapytania ofertowego);
              </li>
              <li>
                <strong className="text-white/80">art. 6 ust. 1 lit. f RODO</strong> — prawnie uzasadniony interes
                administratora polegający na kontakcie handlowym i marketingu własnych usług.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">3. Cel przetwarzania danych</h2>
            <ul className="list-disc list-inside space-y-2 text-white/60 leading-relaxed">
              <li>Obsługa zapytania przesłanego przez formularz kontaktowy;</li>
              <li>Nawiązanie kontaktu handlowego i przedstawienie oferty;</li>
              <li>Analiza wyników quizu w celu dopasowania oferty do potrzeb.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">4. Zakres przetwarzanych danych</h2>
            <p className="text-white/60 leading-relaxed">
              Przetwarzamy dane podane w formularzu: imię i nazwisko, adres e-mail, numer telefonu, nazwa firmy,
              adres strony internetowej oraz odpowiedzi udzielone w quizie (branża, przychody, budżet, odpowiedzi
              diagnostyczne).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">5. Odbiorcy danych</h2>
            <p className="text-white/60 leading-relaxed">
              Twoje dane mogą być przekazywane podmiotom świadczącym usługi techniczne na nasze zlecenie
              (hosting, CRM, narzędzia do e-mail marketingu), wyłącznie w zakresie niezbędnym do realizacji usług
              i na podstawie umów powierzenia przetwarzania danych.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">6. Okres przechowywania danych</h2>
            <p className="text-white/60 leading-relaxed">
              Dane przechowujemy przez okres niezbędny do obsługi zapytania, a następnie przez czas wynikający
              z prawnie uzasadnionych interesów administratora (max. 3 lata od ostatniego kontaktu) lub do
              momentu wniesienia sprzeciwu.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">7. Twoje prawa</h2>
            <p className="text-white/60 leading-relaxed">
              Przysługuje Ci prawo do:
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/60 leading-relaxed">
              <li><strong className="text-white/80">dostępu</strong> do swoich danych;</li>
              <li><strong className="text-white/80">sprostowania</strong> danych nieprawidłowych lub niekompletnych;</li>
              <li><strong className="text-white/80">usunięcia</strong> danych („prawo do bycia zapomnianym");</li>
              <li><strong className="text-white/80">ograniczenia przetwarzania</strong>;</li>
              <li><strong className="text-white/80">przenoszenia danych</strong> (w formacie ustrukturyzowanym);</li>
              <li>
                <strong className="text-white/80">sprzeciwu</strong> wobec przetwarzania na podstawie prawnie
                uzasadnionego interesu;
              </li>
              <li>
                wniesienia skargi do <strong className="text-white/80">Prezesa Urzędu Ochrony Danych Osobowych</strong> (PUODO).
              </li>
            </ul>
            <p className="text-white/60 leading-relaxed">
              Aby skorzystać ze swoich praw, skontaktuj się pod adresem: <strong className="text-white">[EMAIL]</strong>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">8. Przekazywanie danych poza EOG</h2>
            <p className="text-white/60 leading-relaxed">
              Co do zasady nie przekazujemy danych poza Europejski Obszar Gospodarczy. Jeśli korzystamy z usług
              dostawców spoza EOG, odbywa się to na podstawie standardowych klauzul umownych zatwierdzonych
              przez Komisję Europejską.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">9. Pliki cookie</h2>
            <p className="text-white/60 leading-relaxed">
              Serwis może korzystać z plików cookie wyłącznie w celach technicznych i analitycznych.
              Możesz zarządzać ustawieniami cookie w swojej przeglądarce.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">10. Zmiany polityki prywatności</h2>
            <p className="text-white/60 leading-relaxed">
              Zastrzegamy prawo do aktualizacji niniejszej polityki. O istotnych zmianach poinformujemy poprzez
              aktualizację daty na górze strony.
            </p>
          </section>

          <footer className="pt-8 border-t border-white/10">
            <Link
              href="/"
              className="text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              ← Wróć na stronę główną
            </Link>
          </footer>
        </article>
      </div>
    </main>
  );
}
