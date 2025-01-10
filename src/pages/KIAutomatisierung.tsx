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
                  Evoya.ai – Ihre Plattform für smarte KI-Lösungen und Automatisierung
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mt-4">
                  Mit der Evoya-Plattform bringen Sie Ihre Geschäftsprozesse auf das nächste Level: Nutzen Sie modernste KI-Technologien und maßgeschneiderte Automatisierungen, um Ihre Effizienz zu steigern und Kosten zu senken.
                </p>
              </div>

              {/* Subheadline & Intro */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8">
                <h2 className="text-2xl font-semibold mb-4">Wir zeigen Ihnen, wie KI Ihre Unternehmensprozesse revolutioniert!</h2>
                <p className="text-lg mb-6">
                  Mit unserer Expertise und der innovativen Evoya-Plattform finden wir Lösungen, die perfekt auf Ihre Bedürfnisse zugeschnitten sind – für kleine und mittelständische Unternehmen (KMU).
                </p>
                <p className="text-lg mb-6">
                  Die Evoya-Plattform bietet Ihnen alles, was Sie benötigen, um KI-gestützte Prozesse in Ihrem Unternehmen einzusetzen. Ob intelligente Chatbots, E-Mail-Automatisierung oder Multi-Agenten-Systeme – wir helfen Ihnen, die passenden Lösungen zu finden und umzusetzen.
                </p>
                <p className="text-lg">
                  Unser Beratungsteam zeigt Ihnen praxisnah, wie Sie mit den Evoya-Funktionen nicht nur Zeit und Geld sparen, sondern auch Ihre Wettbewerbsfähigkeit steigern können.
                </p>
              </div>

              {/* Platform Features */}
              <div className="space-y-8">
                <h2 className="text-2xl font-semibold">Was bietet die Evoya-Plattform?</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* LLM Hub */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl font-semibold mb-3">LLM Hub</h3>
                    <ul className="space-y-2">
                      <li>• Zugriff auf führende KI-Modelle von OpenAI, Anthropic, Meta, Google und mehr</li>
                      <li>• Immer die besten Technologien für Ihre Anforderungen</li>
                    </ul>
                  </div>

                  {/* Privacy Shield */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl font-semibold mb-3">Privacy Shield</h3>
                    <ul className="space-y-2">
                      <li>• Datenschutzkonforme Anonymisierung sensibler Daten</li>
                      <li>• Gehostet in der Schweiz – Ihre Daten bleiben sicher</li>
                    </ul>
                  </div>

                  {/* Semantic Knowledge Base */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl font-semibold mb-3">Semantische Wissensbasis</h3>
                    <ul className="space-y-2">
                      <li>• Präzise Verarbeitung und Informationsextraktion aus Dokumenten</li>
                      <li>• Erleichtert die Arbeit mit großen Datenmengen</li>
                    </ul>
                  </div>

                  {/* Web Integration */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl font-semibold mb-3">Universelle Webintegration</h3>
                    <ul className="space-y-2">
                      <li>• KI-Agenten-Chats nahtlos integrieren</li>
                      <li>• Kein Programmieraufwand erforderlich</li>
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

                {/* Benefits & CTA */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl font-semibold mb-3">Wie kann das Ihrer KMU helfen?</h3>
                    <ul className="space-y-2">
                      <li>• Zeitersparnis durch Automatisierung</li>
                      <li>• Kostenreduktion durch optimierte Prozesse</li>
                      <li>• Effizienzsteigerung durch KI-Unterstützung</li>
                      <li>• Datenschutzkonforme Lösungen</li>
                      <li>• Skalierbare Systeme</li>
                    </ul>
                  </div>
                  
                  {/* CTA Section */}
                  <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-6">
                    <h3 className="text-2xl font-semibold mb-4">Starten Sie Ihre Reise in die KI-gestützte Zukunft!</h3>
                    <p className="mb-6">
                      Vereinbaren Sie jetzt Ihre kostenlose Beratung und entdecken Sie die Möglichkeiten der Evoya-Plattform.
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