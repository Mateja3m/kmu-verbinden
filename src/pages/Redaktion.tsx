import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Newspaper, Printer, Globe, Users, MessageSquare, Mail } from "lucide-react";

const Redaktion = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-luxury-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold">Unsere Redaktion: Ihre Plattform für schweizweite Medienpräsenz und Kundengewinnung</h1>
              <p className="text-lg">
                Die Redaktion des Schweizerischen KMU Vereins (SKV) verfolgt ein klares Ziel: KMUs eine
                schweizweite Medienpräsenz zu ermöglichen – sowohl in Print als auch digital. Unser Fokus liegt
                darauf, Ihre Sichtbarkeit zu erhöhen und Ihnen zu helfen, mehr Kunden zu gewinnen.
              </p>
              <Button 
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-swiss-darkblue"
                onClick={() => window.location.href = 'mailto:redaktion@kmu-verein.ch'}
              >
                Kontaktieren Sie uns
              </Button>
            </div>
            <div className="relative">
              <img
                src="https://static.wixstatic.com/media/0c82d3_dffa67a695014dfb9df38a1ec31083a8~mv2.png"
                alt="Unternehmensblick Magazine"
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Print and Digital Offerings */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Print Offerings */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-swiss-red">
                <Printer className="h-6 w-6" />
                <h2 className="text-2xl font-bold text-swiss-darkblue">Print-Angebote</h2>
              </div>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="font-semibold">Unternehmensblick:</span> Unsere quartalsweise erscheinende Zeitung ist die Stimme der Schweizer KMU-Landschaft.
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold">Branchenmagazine:</span> Spezifische Publikationen für Technologie, Finanzen oder Marketing.
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold">KMU-Praxisratgeber:</span> Individuell erstellte Ratgeber für Ihre Expertenpositionierung.
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold">Feature-Berichte:</span> Individuelle Artikel in unseren hochwertigen Magazinen.
                </li>
              </ul>
            </div>

            {/* Online Offerings */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-swiss-red">
                <Globe className="h-6 w-6" />
                <h2 className="text-2xl font-bold text-swiss-darkblue">Online-Angebote</h2>
              </div>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="font-semibold">Unternehmensjournal:</span> Täglich aktualisiertes Online-Magazin mit Artikeln und Analysen.
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold">Social-Media-Strategie:</span> Gezielte Beiträge für maximale Sichtbarkeit.
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold">Eventkalender & Webinare:</span> Digitale Veranstaltungen und Schulungen.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* External Communication */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="flex items-center gap-3 text-swiss-red">
              <MessageSquare className="h-6 w-6" />
              <h2 className="text-2xl font-bold text-swiss-darkblue">Externe Kommunikation</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-3">Newsletter & Partnerplattformen</h3>
                <p className="text-gray-600">Ihre Inhalte werden in Newslettern und auf Plattformen unserer Partner beworben.</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-3">Medienpartnerschaften</h3>
                <p className="text-gray-600">Zusammenarbeit mit etablierten Medien für wirkungsvolle Platzierung.</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-3">Pressearbeit</h3>
                <p className="text-gray-600">Entwicklung und Verbreitung redaktioneller Inhalte für schweizweite Positionierung.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Contact */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-swiss-red">
                <Users className="h-6 w-6" />
                <h2 className="text-2xl font-bold text-swiss-darkblue">Gemeinsam für Ihre Sichtbarkeit</h2>
              </div>
              <p className="text-gray-600">
                Unsere Redaktion ist Ihre Brücke zur Medienlandschaft der Schweiz. Wir bieten Ihnen die
                Infrastruktur, die Expertise und das Netzwerk, um Ihre Themen gezielt und effektiv zu platzieren.
              </p>
              <div className="flex items-center gap-4">
                <Button 
                  className="bg-swiss-red hover:bg-swiss-darkblue text-white"
                  onClick={() => window.location.href = 'mailto:redaktion@kmu-verein.ch'}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Kontakt aufnehmen
                </Button>
                <Button 
                  variant="outline"
                  className="border-swiss-red text-swiss-red hover:bg-swiss-red hover:text-white"
                >
                  Termin vereinbaren
                </Button>
              </div>
            </div>
            <div>
              <img
                src="https://static.wixstatic.com/media/0c82d3_2da4db47c0734c6092506969dd256f2f~mv2.png"
                alt="Redaktion Team"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Redaktion;