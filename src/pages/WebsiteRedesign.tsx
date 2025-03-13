
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { nationalPartners } from '@/data/partners';

const WebsiteRedesign = () => {
  const [selectedPartners, setSelectedPartners] = useState(() => {
    // Get 6 partners for the showcase
    return nationalPartners.slice(0, 6);
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-swiss-darkblue leading-tight">
                Optimieren Sie Ihre digitale Präsenz.
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed">
                Wir vernetzen Kompetenz. Websites bauen geht einfach, doch nur mit der richtigen Expertise entsteht eine gute Onlinepräsenz.
              </p>
              <Button 
                className="bg-swiss-darkblue hover:bg-swiss-darkblue/90 text-white px-6 py-3 text-lg flex items-center gap-2"
                asChild
              >
                <Link to="/partners">
                  Unsere Partner kennenlernen
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/lovable-uploads/19cbbc4e-2aa2-407e-9b31-d950e577c9cb.png"
                alt="Digital workspace"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Website/Brand Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12 text-center">
            <Link to="#" className="text-indigo-600 mb-3 font-medium">Web-Auftritt optimieren</Link>
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-darkblue mb-6">
              Website Redesign oder Brand Refresh?
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl">
              Die Entscheidung zwischen einer kompletten Überarbeitung Ihrer Website oder einer Auffrischung Ihrer Marke hängt von Ihren spezifischen Geschäftszielen ab.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold text-swiss-darkblue">Website Redesign</h3>
                <p className="text-gray-700">
                  Eine komplette Überarbeitung Ihrer Website verbessert nicht nur das Design, sondern optimiert auch die Benutzerführung, Ladezeiten und Conversion-Raten. Ideal wenn Ihre aktuelle Website veraltet ist oder nicht die gewünschten Ergebnisse erzielt.
                </p>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold text-swiss-darkblue">Brand Refresh</h3>
                <p className="text-gray-700">
                  Eine Markenauffrischung modernisiert Ihr visuelles Erscheinungsbild und Ihre Kommunikation, ohne die Kernidentität zu verändern. Perfekt, wenn Ihre Marke solide ist, aber ein zeitgemäßeres Auftreten benötigt.
                </p>
              </div>
              
              <Button className="bg-swiss-red hover:bg-swiss-red/90 text-white px-6 py-3 mt-4">
                Kostenlose Beratung erhalten
              </Button>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="/lovable-uploads/e8fe9475-a9bf-4636-9512-ac9c74ccbf80.png"
                alt="Website analytics"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partners Logo Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-swiss-darkblue mb-4">
              Für den optimalen Webauftritt verbinden wir Sie mit diesen Experten
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {selectedPartners.map((partner) => (
              <div 
                key={partner.id} 
                className="bg-white rounded-lg p-6 flex items-center justify-center h-24 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-10 max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section className="py-16 bg-swiss-gray">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-swiss-darkblue">
                Werden Sie Mitglied des KMU-Vereins
              </h2>
              <p className="text-lg text-gray-700">
                Profitieren Sie von einem starken Netzwerk, exklusiven Angeboten und wertvollen Geschäftskontakten. Als Mitglied des Schweizerischen KMU Vereins erhalten Sie Zugang zu erstklassigen Dienstleistern und attraktiven Sonderkonditionen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="outline" 
                  className="border-swiss-darkblue text-swiss-darkblue hover:bg-swiss-darkblue hover:text-white"
                  asChild
                >
                  <Link to="/membership">
                    Mehr erfahren
                  </Link>
                </Button>
                <Button 
                  className="bg-swiss-red hover:bg-swiss-red/90 text-white"
                  asChild
                >
                  <Link to="/membership">
                    Jetzt Mitglied werden
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <img
                src="/lovable-uploads/874b0f8c-856e-42ef-b959-a1393f89478c.png"
                alt="Business networking"
                className="rounded-lg h-48 w-full object-cover"
              />
              <img
                src="/lovable-uploads/9073a767-a689-41cd-9749-71c1f54c69c3.png"
                alt="Office meeting"
                className="rounded-lg h-48 w-full object-cover"
              />
              <img
                src="/lovable-uploads/710d5524-1ea6-450d-a56f-e200a0de134b.png"
                alt="Business conversation"
                className="rounded-lg h-48 w-full object-cover"
              />
              <img
                src="/lovable-uploads/86e1093f-d110-4675-89d5-b99e23c5a312.png"
                alt="Working together"
                className="rounded-lg h-48 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebsiteRedesign;
