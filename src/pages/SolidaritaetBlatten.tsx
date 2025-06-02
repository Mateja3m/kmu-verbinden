import {Link} from 'react-router-dom'; 

export default function SolidaritaetBlatten() {
  return (
      <div className="min-h-screen flex flex-col">
      <div className="w-full h-[400px] relative overflow-hidden">
        <img
          src="/lovable-uploads/sol-background.jpg"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-white/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white mb-12 text-center max-w-4xl mx-auto px-8 py-6 bg-swiss-darkblue/30 backdrop-blur-sm rounded-lg shadow-lg">
            Solidarität mit Blatten (VS)
          </h1>
        </div>
      </div>
      <main className="flex-grow py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-lg text-[#444] mb-10">
            Die Gemeinde Blatten (VS) liegt im Herzen des Wallis – und sie liegt
            uns am Herzen. Als Schweizerischer KMU Verein (SKV) wollen wir mehr
            als nur Worte: Wir wollen handeln. Mit dieser Aktion ermöglichen wir
            konkrete, unbürokratische Hilfe für eine Region, die vom Wandel
            betroffen ist – und gleichzeitig ein Symbol für den Zusammenhalt der
            Schweiz darstellt. Unterstützen Sie mit uns Blatten – durch Ihre
            Mitgliedschaft oder eine direkte Spende.
          </p>

          <div className="flex flex-wrap gap-10 mb-16">
            <div className="flex-1 min-w-[280px] bg-[#f5f5f5] rounded-lg p-8 shadow transition-shadow duration-300 hover:shadow-lg flex flex-col justify-between">
              <h2 className="text-[#003366] mb-4">Mitglied werden &amp; helfen</h2>
              <p className="mb-4">
                Wer dem SKV beitritt, unterstützt nicht nur Schweizer
                Unternehmertum – sondern auch gezielt Blatten (VS).
              </p>
              <p className="mb-6">
                <strong>CHF 110.–</strong> aus jedem neuen Jahresbeitrag (CHF
                550.–) gehen direkt an die Gemeinde.
              </p>
              <Link to="/membership/form">
                <a className="mt-auto inline-block px-6 py-3 bg-[#003366] text-white rounded hover:bg-[#002244] transition">
                  Jetzt Mitglied werden
                </a>
              </Link>
            </div>

            <div className="flex-1 min-w-[280px] bg-[#f5f5f5] rounded-lg p-8 shadow transition-shadow duration-300 hover:shadow-lg flex flex-col justify-between">
              <h2 className="text-[#003366] mb-4">Spenden ohne Mitgliedschaft</h2>
              <p className="mb-4">
                Wer kein Mitglied werden möchte, kann dennoch gezielt helfen. Unser
                offizielles Spendenkonto bei der{" "}
                <strong>Walliser Kantonalbank</strong> garantiert einen sicheren,
                transparenten Ablauf.
              </p>
              <p className="mb-6">
                <strong>100 %</strong> Ihrer Spende gehen direkt und ohne Abzug an
                die Gemeinde Blatten (VS).
              </p>
              <a href="#konto" className="mt-auto inline-block px-6 py-3 bg-[#003366] text-white rounded hover:bg-[#002244] transition">
                Spendenkonto anzeigen
              </a>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-[1.8rem] text-[#003366] mb-8">Häufig gestellte Fragen (FAQ)</h2>

            <details className="text-left bg-[#eef2f6] p-4 rounded-md max-w-[800px] mx-auto mb-5">
              <summary className="font-bold cursor-pointer text-[#003366] text-[1.05rem]">
                1. Was ist das Ziel der Aktion?
              </summary>
              <p className="mt-2">
                Die Unterstützung der Gemeinde Blatten (VS) durch einen gezielten
                Solidaritätsbeitrag aus neuen KMU-Mitgliedschaften.
              </p>
            </details>

            <details className="text-left bg-[#eef2f6] p-4 rounded-md max-w-[800px] mx-auto mb-5">
              <summary className="font-bold cursor-pointer text-[#003366] text-[1.05rem]">
                2. Wie wird der Beitrag berechnet?
              </summary>
              <p className="mt-2">
                20 % aus dem Nettobeitrag jeder neuen Jahresmitgliedschaft von CHF
                550.–. Das entspricht CHF 110.– pro Mitglied.
              </p>
            </details>

            <details className="text-left bg-[#eef2f6] p-4 rounded-md max-w-[800px] mx-auto mb-5">
              <summary className="font-bold cursor-pointer text-[#003366] text-[1.05rem]">
                3. Bis wann läuft die Aktion?
              </summary>
              <p className="mt-2">
                Die Aktion beginnt am 1. Juni 2025. Der erste Überweisungszeitraum
                endet Ende Juni. Weitere Etappen folgen je nach Verlauf.
              </p>
            </details>

            <details className="text-left bg-[#eef2f6] p-4 rounded-md max-w-[800px] mx-auto mb-5">
              <summary className="font-bold cursor-pointer text-[#003366] text-[1.05rem]">
                4. Kann ich auch ohne Mitgliedschaft spenden?
              </summary>
              <p className="mt-2">
                Ja. Sie können direkt auf unser Spendenkonto überweisen. Alle Informationen
                finden Sie im Bereich Spendenkonto oben auf dieser Seite. Jeder Beitrag hilft
                und wird vollständig weitergeleitet.
              </p>
            </details>

            <details className="text-left bg-[#eef2f6] p-4 rounded-md max-w-[800px] mx-auto mb-5">
              <summary className="font-bold cursor-pointer text-[#003366] text-[1.05rem]">
                5. Wer übergibt die Spendensumme?
              </summary>
              <p className="mt-2">
                Im Juli 2025 übergeben Diego Schnydrig (SKV-Präsident) und Michele Imobersteg
                (Leiter Rechtsdienst SKV) die gesammelten Mittel persönlich an die Gemeinde
                Blatten. Die Verwendung erfolgt unbürokratisch vor Ort.
              </p>
            </details>

            <details className="text-left bg-[#eef2f6] p-4 rounded-md max-w-[800px] mx-auto mb-5">
              <summary className="font-bold cursor-pointer text-[#003366] text-[1.05rem]">
                6. Gibt es eine Spendenbestätigung?
              </summary>
              <p className="mt-2">
                Gerne stellen wir auf Wunsch eine Spendenbestätigung aus. Bitte kontaktieren Sie
                uns unter{" "}
                <a href="mailto:info@kmu-verein.ch" className="text-[#003366] hover:underline">
                  info@kmu-verein.ch
                </a>{" "}
                oder<br />+41 (0) 31 528 05 51.
              </p>
            </details>
          </div>

          <div
            id="konto"
            className="mt-16 p-10 bg-gradient-to-br from-[#f0f4f8] to-white rounded-xl shadow-lg border-l-8 border-[#003366] max-w-[800px] mx-auto flex justify-between items-start gap-10 text-[1.1rem] leading-[1.8]"
          >
            <div className="flex-1">
              <h3 className="text-[1.8rem] text-[#003366] mb-5">Spendenkonto</h3>
              <p className="my-2">
                <strong>Empfänger:</strong> Schweizerischer KMU Verein (SKV)
              </p>
              <p className="my-2">
                <strong>Bank:</strong> Walliser Kantonalbank
              </p>
              <p className="my-2">
                <strong>IBAN:</strong> CH93 0076 5001 0577 1390 8
              </p>
              <p className="my-2">
                <strong>Zahlungszweck:</strong> Solidarität Blatten (VS)
              </p>
              <p className="my-2">
                <strong>Kontakt:</strong>
                <br />
                E-Mail:{" "}
                <a href="mailto:info@kmu-verein.ch" className="text-[#003366] hover:underline">
                  info@kmu-verein.ch
                </a>
                <br />
                Telefon: +41 (0) 31 528 05 51
              </p>
            </div>
            <img
              src="/lovable-uploads/qr-code.png"
              alt="QR Code"
              className="w-[130px] h-[130px]"
            />
          </div>

          <div className="mt-16 italic text-center text-[#666] text-[1.1rem]">
            «Echte Solidarität beginnt dort, wo man nicht muss – sondern will.»
          </div>

        </div>
      </main>
    </div>
  );
  
}