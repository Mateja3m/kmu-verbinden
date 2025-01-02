import { ExpertPreview } from "@/components/experts/ExpertPreview";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Static expert data
const staticExperts = [
  {
    id: "1",
    company_name: "Digital Solutions AG",
    contact_person: "Maria Schmidt",
    expertise_area: "Digitale Transformation",
    description: "Spezialisiert auf die digitale Transformation von KMU mit über 15 Jahren Erfahrung. Wir bieten massgeschneiderte Lösungen für die Digitalisierung Ihres Unternehmens.",
    services: ["Digitalisierung", "Prozessoptimierung", "Cloud Migration", "IT-Beratung"],
    email: "contact@digitalsolutions.ch",
    phone: "+41 44 123 45 67",
    website: "www.digitalsolutions.ch",
    address: "Technikstrasse 123",
    postal_code: "8000",
    city: "Zürich",
    linkedin: "linkedin.com/company/digital-solutions",
    image_url: "/placeholder.svg",
    logo_url: "/placeholder.svg"
  },
  {
    id: "2",
    company_name: "KMU Consulting GmbH",
    contact_person: "Thomas Weber",
    expertise_area: "Unternehmensberatung",
    description: "Ganzheitliche Beratung für KMU mit Fokus auf nachhaltigem Wachstum. Wir unterstützen Sie bei der strategischen Entwicklung Ihres Unternehmens.",
    services: ["Strategieberatung", "Finanzplanung", "Organisationsentwicklung", "Prozessoptimierung"],
    email: "info@kmu-consulting.ch",
    phone: "+41 44 987 65 43",
    website: "www.kmu-consulting.ch",
    address: "Businessplatz 45",
    postal_code: "8400",
    city: "Winterthur",
    linkedin: "linkedin.com/company/kmu-consulting",
    image_url: "/placeholder.svg",
    logo_url: "/placeholder.svg"
  },
  {
    id: "3",
    company_name: "Innovation Labs AG",
    contact_person: "Sarah Müller",
    expertise_area: "Innovationsmanagement",
    description: "Ihr Partner für Innovation und Zukunftsfähigkeit. Wir helfen Ihnen dabei, neue Geschäftsmodelle zu entwickeln und Ihre Innovationskraft zu stärken.",
    services: ["Innovationsworkshops", "Design Thinking", "Geschäftsmodellentwicklung", "Trendanalysen"],
    email: "hello@innovation-labs.ch",
    phone: "+41 44 333 22 11",
    website: "www.innovation-labs.ch",
    address: "Innovationsweg 78",
    postal_code: "6300",
    city: "Zug",
    linkedin: "linkedin.com/company/innovation-labs",
    image_url: "/placeholder.svg",
    logo_url: "/placeholder.svg"
  }
];

export default function Experts() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-28 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-swiss-darkblue mb-8 text-center">
            Expertenrat
          </h1>

          <div className="grid grid-cols-1 gap-8">
            {staticExperts.map((expert) => (
              <ExpertPreview key={expert.id} formData={expert} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}