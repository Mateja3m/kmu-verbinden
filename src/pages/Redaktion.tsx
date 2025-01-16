import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, MessageSquare, Newspaper, Mic, Globe, Calendar, Mail, Share2 } from "lucide-react";

const Redaktion = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 bg-swiss-red text-white">
        {/* Background Pattern Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: `url('data:image/svg+xml;base64,${btoa(`
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 20L20 0M20 20L40 0M0 0L-20 20M20 40L0 20" 
                      stroke="#FFFFFF" 
                      stroke-width="0.5" 
                      fill="none"/>
              </svg>
            `)}')`,
            backgroundSize: '20px 20px'
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                className="bg-transparent border-white text-white hover:bg-white hover:text-swiss-red"
              >
                Zur Online-Ausgabe
              </Button>
            </div>
            <div className="relative">
              <img
                src="https://res.cloudinary.com/dphbnwjtx/image/upload/v1737022234/WhatsApp_Image_2025-01-15_at_23.29.30_1_ljnm3y.jpg"
                alt="Unternehmensblick Magazine"
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Newspaper className="h-8 w-8 text-swiss-red" />
              <h2 className="text-3xl font-bold text-swiss-darkblue">Print-Angebote</h2>
            </div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Unsere Print-Publikationen sind bewährte Plattformen, die Ihre Themen nachhaltig ins Rampenlicht rücken.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-swiss-darkblue mb-3">Unternehmensblick</h3>
              <p className="text-gray-600">Unsere quartalsweise erscheinende Zeitung ist die Stimme der Schweizer KMU-Landschaft.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-swiss-darkblue mb-3">Branchenmagazine</h3>
              <p className="text-gray-600">Spezifische Publikationen für Technologie, Finanzen oder Marketing.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-swiss-darkblue mb-3">KMU-Praxisratgeber</h3>
              <p className="text-gray-600">Individuell erstellte Ratgeber für Ihre Expertenpositionierung.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-swiss-darkblue mb-3">Feature-Berichte</h3>
              <p className="text-gray-600">Individuelle Artikel über Ihre Produkte und Innovationen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Online Offerings Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Globe className="h-8 w-8 text-swiss-red" />
              <h2 className="text-3xl font-bold text-swiss-darkblue">Online-Angebote</h2>
            </div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Unsere digitalen Plattformen sind die ideale Ergänzung, um moderne Zielgruppen zu erreichen.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-swiss-darkblue mb-3">Unternehmensjournal</h3>
              <p className="text-gray-600">Täglich aktualisiertes Online-Magazin mit Artikeln und Analysen.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-swiss-darkblue mb-3">Social-Media-Strategie</h3>
              <p className="text-gray-600">Gezielte Social-Media-Beiträge für mehr Sichtbarkeit.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-swiss-darkblue mb-3">Eventkalender & Webinare</h3>
              <p className="text-gray-600">Digitale Veranstaltungen und Schulungen für Mitglieder.</p>
            </div>
          </div>
        </div>
      </section>

      {/* External Communication Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Share2 className="h-8 w-8 text-swiss-red" />
              <h2 className="text-3xl font-bold text-swiss-darkblue">Externe Kommunikation</h2>
            </div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Wir nutzen externe Kommunikationskanäle gezielt für Ihre Reichweite.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-swiss-darkblue mb-3">Newsletter & Partnerplattformen</h3>
              <p className="text-gray-600">Ihre Inhalte auf Plattformen unserer Partner.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-swiss-darkblue mb-3">Medienpartnerschaften</h3>
              <p className="text-gray-600">Zusammenarbeit mit etablierten Medien.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-swiss-darkblue mb-3">Pressearbeit</h3>
              <p className="text-gray-600">Entwicklung und Verbreitung redaktioneller Inhalte.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-swiss-darkblue">Auftrag der Redaktion</h2>
              <p className="text-gray-600">
                Die SKV-Redaktion unterstützt KMUs dabei, durch redaktionelle Präsenz ihre Kundenbasis zu 
                erweitern. Mit einer durchdachten Kombination aus Print-, Digital- und externer Kommunikation 
                schaffen wir für unsere Mitglieder und Partner einzigartige Mehrwerte.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-swiss-red hover:bg-swiss-red/90 text-white flex items-center gap-2 shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
                  onClick={() => window.location.href = "mailto:redaktion@kmu-verein.ch"}
                >
                  <Mail className="h-4 w-4" />
                  E-Mail senden
                </Button>
                <Button 
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Termin vereinbaren
                </Button>
              </div>
            </div>
            <div>
              <img
                src="https://static.wixstatic.com/media/0c82d3_2da4db47c0734c6092506969dd256f2f~mv2.png"
                alt="Editorial Team"
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
