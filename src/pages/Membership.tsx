import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";

const Membership = () => {
  const [step, setStep] = useState(1);
  const [inviteCode, setInviteCode] = useState("");

  const benefits = [
    {
      tag: "NEU",
      title: "KMU Finanzierung",
      description: "10'000 zinslos und laufzeitfrei.",
    },
    {
      tag: "Exklusiver Vorteil",
      title: "Kostenlose KI-Beratung",
      description: "Profitieren Sie 2025 von unserer kostenlosen Beratung zu Automatisierung und künstlicher Intelligenz für Ihr Unternehmen.",
    },
    {
      tag: "Sichtbarkeit",
      title: "Unternehmensblick",
      description: "Präsentieren Sie Ihr Unternehmen in unserem exklusiven Magazin und erreichen Sie tausende Entscheidungsträger.",
    },
  ];

  const testimonials = [
    {
      quote: "Die Mitgliedschaft im SKV hat uns Zugang zu einem starken Netzwerk und exklusiven Vorteilen verschafft. Die Investition hat sich mehrfach ausgezahlt – absolut empfehlenswert!",
      author: "Dominik Graf",
      company: "Pawex AG",
    },
    {
      quote: "Unterstützend durch den SKV konnten wir unser Netzwerk erheblich erweitern und neue Kunden gewinnen. Der direkte Zugang zu relevanten Kontakten war entscheidend für unseren Erfolg.",
      author: "Hussam Zaghloul",
      company: "Architekt FH",
    },
    {
      quote: "Der SKV hat uns mit gezielten Marketingstrategien, wertvollen Netzwerkkontakten und effektiven Werbemöglichkeiten geholfen, unsere Reichweite zu erhöhen.",
      author: "Timo Seger",
      company: "Umzug Schweiz AG",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative bg-luxury-gradient pt-32 pb-20 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-swiss-darkblue/90 to-swiss-red/90 mix-blend-multiply"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl mb-6">
            Werden Sie Mitglied im KMU Verein
          </h1>
          <p className="text-xl mb-8">
            Nutzen Sie exklusive Vorteile, vernetzen Sie sich mit Branchenführern und treiben Sie Ihr Unternehmen voran.
          </p>
          <Button 
            className="bg-white text-swiss-darkblue hover:bg-white/90 text-lg px-8 py-6"
            onClick={() => document.getElementById('membership-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Jetzt Mitglied werden
          </Button>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105">
                <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-swiss-red text-white mb-4">
                  {benefit.tag}
                </span>
                <h3 className="text-xl font-bold mb-2 text-swiss-darkblue">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-swiss-darkblue">
            Vertrauen von führenden Unternehmen
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                <div className="font-semibold text-swiss-darkblue">{testimonial.author}</div>
                <div className="text-sm text-gray-500">{testimonial.company}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Membership Form */}
      <div id="membership-form" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="flex justify-between mb-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`flex items-center ${i !== 3 ? 'flex-1' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= i ? 'bg-swiss-red text-white' : 'bg-gray-200'
                    }`}
                  >
                    {step > i ? <Check size={16} /> : i}
                  </div>
                  {i !== 3 && (
                    <div
                      className={`h-1 flex-1 mx-2 ${
                        step > i ? 'bg-swiss-red' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-swiss-darkblue mb-6">Unternehmensdaten</h3>
                <Input placeholder="Firmenname" className="w-full" />
                <Input placeholder="Name der verantwortlichen Person" className="w-full" />
                <Input placeholder="Straße und Hausnummer" className="w-full" />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="PLZ" />
                  <Input placeholder="Ort" />
                </div>
                <Button 
                  className="w-full bg-swiss-red hover:bg-swiss-red/90 text-white mt-6"
                  onClick={() => setStep(2)}
                >
                  Weiter
                </Button>
                <p className="text-sm text-gray-500 text-center mt-4">
                  Ihre Daten werden sicher übertragen und nicht an Dritte weitergegeben
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Membership;