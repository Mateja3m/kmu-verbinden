import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ExpertHeader } from "@/components/experts/ExpertHeader";
import { ExpertServices } from "@/components/experts/ExpertServices";
import { ExpertContact } from "@/components/experts/ExpertContact";
import { ExpertReviews } from "@/components/experts/ExpertReviews";

// Using the same static data from Experts.tsx
const staticExperts = [
  {
    id: "1",
    company_name: "Digital Solutions AG",
    contact_person: "Maria Schmidt",
    expertise_area: "Digitale Transformation",
    description: "Spezialisiert auf die digitale Transformation von KMU mit über 15 Jahren Erfahrung. Wir bieten massgeschneiderte Lösungen für die Digitalisierung Ihres Unternehmens.",
    services: ["Digitalisierung", "Prozessoptimierung", "Cloud Migration", "IT-Beratung"],
    regions: ["Zürich", "Basel", "Bern"],
    email: "contact@digitalsolutions.ch",
    phone: "+41 44 123 45 67",
    website: "www.digitalsolutions.ch",
    address: "Technikstrasse 123",
    postal_code: "8000",
    city: "Zürich",
    linkedin: "linkedin.com/company/digital-solutions",
    image_url: "/placeholder.svg",
    logo_url: "/placeholder.svg",
    reviews: [
      {
        id: "r1",
        rating: 5,
        comment: "Ausgezeichnete Beratung und professionelle Umsetzung",
        reviewer: { company_name: "Sample AG", contact_person: "John Doe" },
        created_at: "2024-01-15T10:00:00Z",
        is_anonymous: false
      }
    ]
  },
  {
    id: "2",
    company_name: "KMU Consulting GmbH",
    contact_person: "Thomas Weber",
    expertise_area: "Unternehmensberatung",
    description: "Ganzheitliche Beratung für KMU mit Fokus auf nachhaltigem Wachstum. Wir unterstützen Sie bei der strategischen Entwicklung Ihres Unternehmens.",
    services: ["Strategieberatung", "Finanzplanung", "Organisationsentwicklung", "Prozessoptimierung"],
    regions: ["Winterthur", "St. Gallen", "Schaffhausen"],
    email: "info@kmu-consulting.ch",
    phone: "+41 44 987 65 43",
    website: "www.kmu-consulting.ch",
    address: "Businessplatz 45",
    postal_code: "8400",
    city: "Winterthur",
    linkedin: "linkedin.com/company/kmu-consulting",
    image_url: "/placeholder.svg",
    logo_url: "/placeholder.svg",
    reviews: []
  },
  {
    id: "3",
    company_name: "Innovation Labs AG",
    contact_person: "Sarah Müller",
    expertise_area: "Innovationsmanagement",
    description: "Ihr Partner für Innovation und Zukunftsfähigkeit. Wir helfen Ihnen dabei, neue Geschäftsmodelle zu entwickeln und Ihre Innovationskraft zu stärken.",
    services: ["Innovationsworkshops", "Design Thinking", "Geschäftsmodellentwicklung", "Trendanalysen"],
    regions: ["Zug", "Luzern", "Zürich"],
    email: "hello@innovation-labs.ch",
    phone: "+41 44 333 22 11",
    website: "www.innovation-labs.ch",
    address: "Innovationsweg 78",
    postal_code: "6300",
    city: "Zug",
    linkedin: "linkedin.com/company/innovation-labs",
    image_url: "/placeholder.svg",
    logo_url: "/placeholder.svg",
    reviews: [
      {
        id: "r2",
        rating: 4,
        comment: "Sehr innovative Ansätze und gute Zusammenarbeit",
        reviewer: { company_name: "Tech Start-up", contact_person: "Jane Smith" },
        created_at: "2024-02-20T14:30:00Z",
        is_anonymous: false
      }
    ]
  }
];

export default function ExpertDetail() {
  const { id } = useParams<{ id: string }>();
  const expert = staticExperts.find(e => e.id === id);

  if (!expert) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow py-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Expert nicht gefunden
            </h1>
            <p className="text-gray-600">
              Der gesuchte Expert konnte nicht gefunden werden.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <ExpertHeader
                companyName={expert.company_name}
                averageRating={expert.reviews?.length ? expert.reviews.reduce((acc, rev) => acc + rev.rating, 0) / expert.reviews.length : 0}
                totalReviews={expert.reviews?.length || 0}
                description={expert.description}
                imageUrl={expert.image_url}
              />

              <ExpertServices
                services={expert.services || []}
                regions={expert.regions || []}
              />

              <ExpertReviews 
                expertId={expert.id} 
                reviews={expert.reviews || []} 
              />
            </div>

            <div className="lg:sticky lg:top-24 space-y-6 self-start">
              <ExpertContact
                contactPerson={expert.contact_person}
                address={expert.address}
                postalCode={expert.postal_code}
                city={expert.city}
                phone={expert.phone}
                email={expert.email}
                website={expert.website}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}