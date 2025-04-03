
import { Mail, Phone, Grid, Book, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const Branchenmagazine = () => {
  const magazines = [
    {
      title: "Bau- und Immobilienwirtschaft",
      description: "Trends, Innovationen und Fachwissen für die Bau- und Immobilienbranche."
    },
    {
      title: "Finanz- und Versicherungswesen",
      description: "Aktuelle Themen rund um Finanzstrategien, Versicherungen und Vorsorge."
    },
    {
      title: "Gastronomie und Hotellerie",
      description: "Tipps und Lösungen für Gastronomiebetriebe und Hoteliers."
    },
    {
      title: "Gesundheit und Wellness",
      description: "Fokus auf Gesundheitsmanagement, Prävention und Wellness."
    },
    {
      title: "IT und Digitalisierung",
      description: "Digitalisierungstrends und technologische Innovationen."
    },
    {
      title: "Handel und E-Commerce",
      description: "Strategien für den stationären Handel und Online-Shops."
    },
    {
      title: "Industrie und Produktion",
      description: "Effizienzsteigerung, neue Technologien und Produktionsprozesse."
    },
    {
      title: "Energie und Umwelt",
      description: "Nachhaltigkeit und Energiewende in der KMU-Landschaft."
    },
    {
      title: "Transport und Logistik",
      description: "Lösungen für die Herausforderungen der Logistikbranche."
    },
    {
      title: "Bildung und Weiterbildung",
      description: "Trends und Angebote in der beruflichen und akademischen Weiterbildung."
    },
    {
      title: "Kreativwirtschaft und Medien",
      description: "Inspiration und Tools für kreative Köpfe und Medienschaffende."
    },
    {
      title: "Recht und Consulting",
      description: "Juristische Beratung und Consulting-Themen für KMU."
    }
  ];

  const benefits = [
    "Spezifisches Fachwissen: Jede Branche wird individuell beleuchtet.",
    "Expertentipps: Beiträge von Brancheninsidern bieten echten Mehrwert.",
    "Hohe Reichweite: Unsere Magazine sprechen die Entscheider und Fachleute der jeweiligen Branchen gezielt an.",
    "Professionelles Design: Hochwertig gestaltet, um bei Lesern Eindruck zu hinterlassen."
  ];

  const advantages = [
    "Positionierung als Experte: Bringen Sie Ihr Fachwissen oder Ihre Marke gezielt in Ihrer Branche zur Geltung.",
    "Branchenspezifische Zielgruppenansprache: Maximale Relevanz für Ihre Inhalte.",
    "Flexible Optionen: Ob als Werbepartner, Interviewgast oder Fachautor – wir bieten Ihnen die passende Plattform."
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with new background image and overlay */}
      <div 
        className="relative bg-swiss-darkblue text-white py-24"
        style={{
          backgroundImage: 'url("/lovable-uploads/eada90db-ec8d-4d01-bf85-367d1e5dc79c.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Blue overlay */}
        <div className="absolute inset-0 bg-swiss-darkblue/80" />
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold mb-6">Unsere 12 Branchenmagazine: Kompetenz für jede Branche</h1>
          <p className="text-lg max-w-3xl mx-auto">
            Die Branchenmagazine des Schweizerischen KMU Vereins sind speziell darauf ausgelegt,
            Fachwissen, Trends und praxisnahe Tipps für 12 unterschiedliche Branchen zu liefern. Jedes
            Magazin bietet maßgeschneiderte Inhalte, die auf die spezifischen Bedürfnisse der jeweiligen
            Branche abgestimmt sind.
          </p>
        </div>
      </div>

      {/* Magazines Grid */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-swiss-darkblue">Unsere Branchenmagazine im Überblick:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {magazines.map((magazine, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-swiss-red rounded-full p-2">
                  <Book className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-swiss-darkblue mb-2">
                    {index + 1}. {magazine.title}
                  </h3>
                  <p className="text-gray-600">{magazine.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-swiss-darkblue">Warum unsere Branchenmagazine?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="bg-swiss-red rounded-full p-2 mt-1">
                    <Grid className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-swiss-darkblue">Ihr Vorteil als Inserent oder Autor:</h3>
              <div className="space-y-4">
                {advantages.map((advantage, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-swiss-darkblue rounded-full p-2 mt-1">
                      <FileText className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-gray-700">{advantage}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-swiss-red text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-6">Interesse geweckt?</h2>
          <p className="mb-8">
            Kontaktieren Sie uns und erfahren Sie, wie wir Sie und Ihr Unternehmen mit unseren
            Branchenmagazinen unterstützen können.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <Button
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-swiss-red"
              onClick={() => window.location.href = 'tel:+41445852081'}
            >
              <Phone className="mr-2 h-4 w-4" />
              +41 (0) 44 585 20 81
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-swiss-red"
              onClick={() => window.location.href = 'mailto:redaktion@kmu-verein.ch'}
            >
              <Mail className="mr-2 h-4 w-4" />
              redaktion@kmu-verein.ch
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branchenmagazine;
