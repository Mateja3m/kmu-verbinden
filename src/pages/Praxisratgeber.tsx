import { Button } from "@/components/ui/button";
import { Phone, Calendar, BookOpen, Globe, Award, Target } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Praxisratgeber = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section with Background Image */}
      <section className="relative pt-32 pb-24 text-white">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/lovable-uploads/874b0f8c-856e-42ef-b959-a1393f89478c.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-swiss-red/90 to-swiss-darkblue/90" />
        </div>

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
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">KMU-Praxisratgeber: Ihre klare Positionierung als Branchenexperte</h1>
            <p className="text-lg max-w-3xl mx-auto">
              Unsere KMU-Praxisratgeber bieten Ihnen die ideale Möglichkeit, sich als führender Experte Ihrer
              Branche zu positionieren. Mit Ihrem Fachwissen auf dem Cover und gezielten Expertentipps in
              beiden Formaten – Print und eBook – heben Sie sich sichtbar und glaubwürdig von der Konkurrenz
              ab.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-swiss-darkblue mb-12">Was macht unsere Praxisratgeber aus?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <BookOpen className="h-12 w-12 text-swiss-red mb-4" />
              <h3 className="text-xl font-semibold text-swiss-darkblue mb-3">Professionelle Gestaltung</h3>
              <p className="text-gray-600">50–60 Seiten im hochwertigen Buchformat, gedruckt mit ISBN-Nummer.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Globe className="h-12 w-12 text-swiss-red mb-4" />
              <h3 className="text-xl font-semibold text-swiss-darkblue mb-3">Digitale Verfügbarkeit</h3>
              <p className="text-gray-600">Eine kompakte eBook-Version mit ISBN, perfekt für den digitalen Einsatz.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Target className="h-12 w-12 text-swiss-red mb-4" />
              <h3 className="text-xl font-semibold text-swiss-darkblue mb-3">Gezielte Expertentipps</h3>
              <p className="text-gray-600">Ihre Fachbeiträge rücken Ihre Kompetenz ins Zentrum.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-swiss-darkblue mb-12">Warum ein KMU-Praxisratgeber?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Award className="h-12 w-12 text-swiss-red mb-4" />
              <h3 className="text-xl font-semibold text-swiss-darkblue mb-3">Expertenstatus sichern</h3>
              <p className="text-gray-600">Positionieren Sie sich authentisch und vertrauenswürdig.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Target className="h-12 w-12 text-swiss-red mb-4" />
              <h3 className="text-xl font-semibold text-swiss-darkblue mb-3">Mehrwert schaffen</h3>
              <p className="text-gray-600">Nutzen Sie die Publikation für Marketing, Vertrieb und Kundenbindung.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Award className="h-12 w-12 text-swiss-red mb-4" />
              <h3 className="text-xl font-semibold text-swiss-darkblue mb-3">Nachhaltiger Eindruck</h3>
              <p className="text-gray-600">Hinterlassen Sie bei Kunden und Partnern einen bleibenden Eindruck.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-swiss-darkblue mb-6">Jetzt Experte werden!</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Vereinbaren Sie direkt einen Termin mit unserer Redaktion, um Ihre individuelle Publikation zu
            besprechen. Alternativ können Sie uns auch telefonisch erreichen, um weitere
            Informationen zu erhalten.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              className="bg-swiss-red hover:bg-swiss-red/90 text-white flex items-center gap-2"
              onClick={() => window.open('https://calendly.com/your-link', '_blank')}
            >
              <Calendar className="h-4 w-4" />
              Termin vereinbaren
            </Button>
            <Button 
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => window.location.href = 'tel:+41445852081'}
            >
              <Phone className="h-4 w-4" />
              +41 (0) 44 585 20 81
            </Button>
          </div>
          <p className="mt-8 text-gray-600">
            Setzen Sie Ihre Expertise perfekt in Szene – wir unterstützen Sie dabei!
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Praxisratgeber;