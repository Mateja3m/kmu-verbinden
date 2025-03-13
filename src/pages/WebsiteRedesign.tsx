
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { nationalPartners } from '@/data/partners';
import { IndustryLinks } from '@/components/website-redesign/IndustryLinks';

const WebsiteRedesign = () => {
  const [selectedPartners, setSelectedPartners] = useState(() => {
    // Get 6 partners for the showcase
    return nationalPartners.slice(0, 6);
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-swiss-darkblue leading-tight">
                Optimieren Sie Ihre digitale Präsenz.
              </h1>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-xl">
                Wir vernetzen Kompetenz. Websites bauen geht einfach, doch nur mit der richtigen Expertise entsteht eine gute Onlinepräsenz.
              </p>
              <Button 
                className="bg-swiss-darkblue hover:bg-swiss-darkblue/90 text-white px-8 py-6 mt-4 text-lg flex items-center gap-3 rounded-md transition-all duration-300 shadow-sm hover:shadow-md"
                asChild
              >
                <Link to="/partners">
                  Unsere Partner kennenlernen
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
              <img
                src="/lovable-uploads/19cbbc4e-2aa2-407e-9b31-d950e577c9cb.png"
                alt="Digital workspace"
                className="w-full h-auto object-cover"
                style={{ maxHeight: "480px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Website/Brand Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col items-center mb-16 text-center">
            <Link to="#" className="text-indigo-600 text-lg mb-5 font-medium hover:underline transition-all">Web-Auftritt optimieren</Link>
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-darkblue mb-8">
              Website Redesign oder Brand Refresh?
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl">
              Die Entscheidung zwischen einer kompletten Überarbeitung Ihrer Website oder einer Auffrischung Ihrer Marke hängt von Ihren spezifischen Geschäftszielen ab.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="space-y-4 p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-2xl font-semibold text-swiss-darkblue">Website Redesign</h3>
                <p className="text-gray-700 leading-relaxed">
                  Eine komplette Überarbeitung Ihrer Website verbessert nicht nur das Design, sondern optimiert auch die Benutzerführung, Ladezeiten und Conversion-Raten. Ideal wenn Ihre aktuelle Website veraltet ist oder nicht die gewünschten Ergebnisse erzielt.
                </p>
              </div>
              
              <div className="space-y-4 p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-2xl font-semibold text-swiss-darkblue">Brand Refresh</h3>
                <p className="text-gray-700 leading-relaxed">
                  Eine Markenauffrischung modernisiert Ihr visuelles Erscheinungsbild und Ihre Kommunikation, ohne die Kernidentität zu verändern. Perfekt, wenn Ihre Marke solide ist, aber ein zeitgemäßeres Auftreten benötigt.
                </p>
              </div>
              
              <Button className="bg-swiss-red hover:bg-swiss-red/90 text-white px-8 py-6 text-lg shadow-sm hover:shadow-md transition-all duration-300">
                Kostenlose Beratung erhalten
              </Button>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
              <img
                src="/lovable-uploads/e8fe9475-a9bf-4636-9512-ac9c74ccbf80.png"
                alt="Website analytics"
                className="w-full h-auto object-cover"
                style={{ maxHeight: "480px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partners Logo Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-swiss-darkblue mb-6">
              Für den optimalen Webauftritt verbinden wir Sie mit diesen Experten
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
            {selectedPartners.map((partner) => (
              <div 
                key={partner.id} 
                className="bg-white rounded-lg p-8 flex items-center justify-center h-32 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-12 max-w-full object-contain"
                />
              </div>
            ))}
          </div>

          <IndustryLinks />
        </div>
      </section>

      {/* Membership Section */}
      <section className="py-24 bg-swiss-gray">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-swiss-darkblue">
                Werden Sie Mitglied des KMU-Vereins
              </h2>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Profitieren Sie von einem starken Netzwerk, exklusiven Angeboten und wertvollen Geschäftskontakten. Als Mitglied des Schweizerischen KMU Vereins erhalten Sie Zugang zu erstklassigen Dienstleistern und attraktiven Sonderkonditionen.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <Button 
                  variant="outline" 
                  className="border-swiss-darkblue text-swiss-darkblue hover:bg-swiss-darkblue hover:text-white px-8 py-6 text-lg transition-all duration-300 shadow-sm hover:shadow-md"
                  asChild
                >
                  <Link to="/membership">
                    Mehr erfahren
                  </Link>
                </Button>
                <Button 
                  className="bg-swiss-red hover:bg-swiss-red/90 text-white px-8 py-6 text-lg transition-all duration-300 shadow-sm hover:shadow-md"
                  asChild
                >
                  <Link to="/membership">
                    Jetzt Mitglied werden
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <img
                src="/lovable-uploads/874b0f8c-856e-42ef-b959-a1393f89478c.png"
                alt="Business networking"
                className="rounded-lg h-64 w-full object-cover shadow-md hover:shadow-lg transition-shadow duration-300"
              />
              <img
                src="/lovable-uploads/9073a767-a689-41cd-9749-71c1f54c69c3.png"
                alt="Office meeting"
                className="rounded-lg h-64 w-full object-cover shadow-md hover:shadow-lg transition-shadow duration-300"
              />
              <img
                src="/lovable-uploads/710d5524-1ea6-450d-a56f-e200a0de134b.png"
                alt="Business conversation"
                className="rounded-lg h-64 w-full object-cover shadow-md hover:shadow-lg transition-shadow duration-300"
              />
              <img
                src="/lovable-uploads/86e1093f-d110-4675-89d5-b99e23c5a312.png"
                alt="Working together"
                className="rounded-lg h-64 w-full object-cover shadow-md hover:shadow-lg transition-shadow duration-300"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebsiteRedesign;
