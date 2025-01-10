import { Button } from "@/components/ui/button";
import BackgroundPattern from '@/components/BackgroundPattern';
import Footer from '@/components/Footer';

const KIAutomatisierung = () => {
  return (
    <>
      <BackgroundPattern>
        <div className="min-h-screen bg-gradient-to-b from-swiss-darkblue to-swiss-darkblue/90 text-white">
          <div className="container mx-auto px-4 py-32">
            <div className="max-w-4xl mx-auto space-y-12">
              {/* Hero Section */}
              <div className="text-center space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                  KI & Automatisierung für KMU
                </h1>
                <p className="text-xl md:text-2xl text-gray-200">
                  Steigern Sie Ihre Effizienz mit intelligenten Lösungen
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold mb-3">Prozessoptimierung</h3>
                  <p>Automatisieren Sie repetitive Aufgaben und sparen Sie wertvolle Zeit mit massgeschneiderten KI-Lösungen.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold mb-3">Kundenservice</h3>
                  <p>Verbessern Sie Ihren Kundenservice mit intelligenten Chatbots und automatisierten Antworten.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold mb-3">Datenanalyse</h3>
                  <p>Nutzen Sie KI-gestützte Analysen für bessere Geschäftsentscheidungen und Prognosen.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold mb-3">Integration</h3>
                  <p>Nahtlose Integration in Ihre bestehenden Systeme und Arbeitsabläufe.</p>
                </div>
              </div>

              {/* Main Content */}
              <div className="space-y-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8">
                  <h2 className="text-2xl font-semibold mb-4">Sprechen Sie mit unserem KI-Experten</h2>
                  <p className="mb-6">
                    Unser KI-Assistent analysiert Ihre Anforderungen und erstellt einen massgeschneiderten Vorschlag für Ihr Unternehmen.
                  </p>
                  <div className="relative w-full aspect-[16/9] md:aspect-[2/1]">
                    <iframe 
                      className="absolute inset-0 w-full h-full rounded-lg"
                      src="https://avaia.io/chat/authorize-chat/2705b8b0-276f-4582-a41c-6ff896a461ad/"
                      width="100%"
                      height="600px"
                      frameBorder="0"
                      title="KI-Experte"
                    />
                  </div>
                </div>

                {/* Call to Action */}
                <div className="text-center bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-8">
                  <h3 className="text-2xl font-semibold mb-4">Bereit für die digitale Transformation?</h3>
                  <p className="mb-6">
                    Lassen Sie uns gemeinsam Ihr Unternehmen in die Zukunft führen.
                  </p>
                  <Button 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-lg shine-effect"
                    onClick={() => window.location.href = '#chat'}
                  >
                    Jetzt beraten lassen
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BackgroundPattern>
      <Footer />
    </>
  );
};

export default KIAutomatisierung;