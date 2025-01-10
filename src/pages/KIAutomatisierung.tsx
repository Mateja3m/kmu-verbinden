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
              {/* Hero Section with Evoya Logo */}
              <div className="text-center space-y-6">
                <div className="flex justify-center mb-8">
                  <img 
                    src="https://evoya.ai/wp-content/uploads/2020/11/evoya-ai-logo-medium-768x174.png"
                    alt="Evoya.ai Logo"
                    className="h-16 object-contain bg-white/10 backdrop-blur-sm rounded-xl p-4"
                  />
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                  Revolutionieren Sie Ihr Unternehmen mit KI und Automatisierung
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mt-4">
                  Entdecken Sie, wie KI-Agenten und automatisierte Lösungen Ihre Prozesse optimieren, Kosten reduzieren und Ihre Effizienz steigern können.
                </p>
              </div>

              {/* Subheadline & Intro */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8">
                <h2 className="text-2xl font-semibold mb-4">Ihr Partner für innovative KI-Lösungen</h2>
                <p className="text-lg mb-6">
                  Als Experten für KI-gestützte Beratung und Automatisierung zeigen wir Ihnen, wie moderne Technologien kleine und mittlere Unternehmen (KMU) transformieren können.
                </p>
                <p className="text-lg mb-6">
                  Die rasante Entwicklung von KI, insbesondere durch leistungsstarke Sprachmodelle (LLMs) wie ChatGPT, hat die Art und Weise verändert, wie Unternehmen arbeiten. Kleine und mittlere Unternehmen (KMU) profitieren besonders von diesen Technologien, da sie kostengünstige Automatisierungsmöglichkeiten bieten, die früher großen Unternehmen vorbehalten waren.
                </p>
                <p className="text-lg">
                  Mit unserer Beratung unterstützen wir Sie dabei, KI-Agenten und Automatisierungen in Ihr Unternehmen zu integrieren. Erfahren Sie, welche Lösungen für Ihr Geschäftsfeld möglich sind und wie Sie Ihre Arbeitsabläufe smarter gestalten können.
                </p>
              </div>

              {/* Keypoints */}
              <div className="space-y-8">
                <h2 className="text-2xl font-semibold">Was ist möglich mit KI und Automatisierung?</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Intelligente Kundenbetreuung */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl font-semibold mb-3">Intelligente Kundenbetreuung</h3>
                    <ul className="space-y-2">
                      <li>• 24/7-KI-Chatbots für Support und Anfragen</li>
                      <li>• Automatische Antworten auf E-Mails und häufige Fragen</li>
                      <li>• Mehrsprachige Kommunikation ohne zusätzliche Kosten</li>
                    </ul>
                  </div>

                  {/* Automatisierte Marketinglösungen */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl font-semibold mb-3">Automatisierte Marketinglösungen</h3>
                    <ul className="space-y-2">
                      <li>• KI-gestützte Erstellung von Social-Media-Inhalten</li>
                      <li>• Automatisierte Kampagnenplanung und -optimierung</li>
                      <li>• Personalisierte Kundenansprache basierend auf Datenanalysen</li>
                    </ul>
                  </div>

                  {/* Prozessoptimierung */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl font-semibold mb-3">Optimierung von Geschäftsprozessen</h3>
                    <ul className="space-y-2">
                      <li>• Automatische Terminplanung und Ressourcenzuweisung</li>
                      <li>• KI-basierte Datenanalyse für fundierte Entscheidungen</li>
                      <li>• Automatisierung von wiederkehrenden Aufgaben</li>
                    </ul>
                  </div>

                  {/* Personal- und Bewerbermanagement */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl font-semibold mb-3">Personal- und Bewerbermanagement</h3>
                    <ul className="space-y-2">
                      <li>• Automatisierte Bewerbervorauswahl durch KI</li>
                      <li>• Erstellen von individuellen Schulungsplänen</li>
                      <li>• KI-gesteuerte Analysen zur Mitarbeiterzufriedenheit</li>
                    </ul>
                  </div>
                </div>

                {/* KI-Agenten Section */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 mt-12">
                  <h2 className="text-2xl font-semibold mb-6">Unsere KI-Agenten: Was ist schon verfügbar?</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Virtuelle Assistenten</h3>
                      <ul className="space-y-2">
                        <li>• KI-Agenten für administrative Aufgaben</li>
                        <li>• Unterstützung bei Datenverarbeitung</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Branchenspezifische Lösungen</h3>
                      <ul className="space-y-2">
                        <li>• Automatisierte Buchhaltungsagenten</li>
                        <li>• KI-gestützte Diagnose</li>
                        <li>• Logistikoptimierung</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Kundensupport-Bots</h3>
                      <ul className="space-y-2">
                        <li>• Selbstlernende Chatbots</li>
                        <li>• Integration in bestehende Plattformen</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Benefits Section */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8">
                  <h2 className="text-2xl font-semibold mb-6">Wie profitieren KMU?</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <span className="text-swiss-red">✓</span>
                        <span>Zeitersparnis durch Automatisierung</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-swiss-red">✓</span>
                        <span>Kostenreduktion durch effizientere Abläufe</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-swiss-red">✓</span>
                        <span>Skalierbare Lösungen</span>
                      </li>
                    </ul>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <span className="text-swiss-red">✓</span>
                        <span>Wettbewerbsvorteil durch Schnelligkeit</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-swiss-red">✓</span>
                        <span>Niedrige Einstiegskosten</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Chat Integration */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8">
                  <h2 className="text-2xl font-semibold mb-4">Sprechen Sie mit unserem KI-Experten von Evoya.ai</h2>
                  <p className="mb-6">
                    Unser Partner Evoya.ai analysiert Ihre Anforderungen und erstellt einen massgeschneiderten Vorschlag für Ihr Unternehmen.
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

                {/* Additional Services */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl font-semibold mb-3">Zusatzangebote</h3>
                    <ul className="space-y-2">
                      <li>• Live-Demo: KI-Agenten in Aktion</li>
                      <li>• Individuelle Lösungen & Automatisierungen</li>
                      <li>• Workshops & Mitarbeiterschulungen</li>
                      <li>• Vernetzung mit Partnern</li>
                    </ul>
                  </div>
                  
                  {/* CTA Section */}
                  <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-6">
                    <h3 className="text-2xl font-semibold mb-4">Bereit für die Zukunft?</h3>
                    <p className="mb-6">
                      Starten Sie jetzt mit einer kostenlosen Erstberatung! Unsere KI-Experten zeigen Ihnen die passenden Lösungen.
                    </p>
                    <Button 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-lg shine-effect w-full"
                      onClick={() => window.location.href = '#chat'}
                    >
                      Jetzt beraten lassen
                    </Button>
                  </div>
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