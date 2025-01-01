import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Linkedin } from "lucide-react";

interface Expert {
  name: string;
  title: string;
  expertise: string[];
  description: string;
  image: string;
  contact: {
    email?: string;
    phone?: string;
    linkedin?: string;
  };
}

const experts: Expert[] = [
  {
    name: "Dr. Sarah Weber",
    title: "Digitalisierungsexpertin",
    expertise: ["Digital Transformation", "Process Automation", "Change Management"],
    description: "Dr. Weber unterstützt KMUs bei der digitalen Transformation und Prozessoptimierung. Mit über 15 Jahren Erfahrung in der Beratung hilft sie Unternehmen, ihre digitale Präsenz zu stärken und interne Prozesse zu optimieren.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    contact: {
      email: "s.weber@skv-experts.ch",
      linkedin: "linkedin.com/in/sarahweber"
    }
  },
  {
    name: "Marco Bernasconi",
    title: "Finanzexperte",
    expertise: ["Financial Planning", "Risk Management", "Investment Strategy"],
    description: "Als erfahrener Finanzexperte berät Marco KMUs in allen Fragen der Unternehmensfinanzierung und des Risikomanagements. Seine Expertise hilft Unternehmen, ihre finanzielle Zukunft nachhaltig zu gestalten.",
    image: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    contact: {
      email: "m.bernasconi@skv-experts.ch",
      phone: "+41 44 123 45 67"
    }
  },
  {
    name: "Lisa Müller",
    title: "Marketing Strategin",
    expertise: ["Digital Marketing", "Brand Development", "Social Media"],
    description: "Lisa ist spezialisiert auf digitales Marketing und Markenentwicklung für KMUs. Sie hilft Unternehmen dabei, ihre Online-Präsenz zu optimieren und effektive Marketing-Strategien zu entwickeln.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    contact: {
      email: "l.mueller@skv-experts.ch",
      linkedin: "linkedin.com/in/lisamueller"
    }
  }
];

const ExpertCard = ({ expert }: { expert: Expert }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img
        src={expert.image}
        alt={expert.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-swiss-darkblue mb-2">{expert.name}</h3>
        <p className="text-swiss-red font-semibold mb-3">{expert.title}</p>
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {expert.expertise.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <p className="text-gray-600 mb-6">{expert.description}</p>
        <div className="flex flex-wrap gap-3">
          {expert.contact.email && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = `mailto:${expert.contact.email}`}
            >
              <Mail className="mr-2 h-4 w-4" />
              Email
            </Button>
          )}
          {expert.contact.phone && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = `tel:${expert.contact.phone}`}
            >
              <Phone className="mr-2 h-4 w-4" />
              Anrufen
            </Button>
          )}
          {expert.contact.linkedin && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`https://${expert.contact.linkedin}`, '_blank')}
            >
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const Experts = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-swiss-darkblue mb-4">
              Unser Expertenrat
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Profitieren Sie von der Erfahrung und dem Fachwissen unserer Experten. 
              Unsere Spezialisten unterstützen Sie in verschiedenen Bereichen Ihres Unternehmens.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experts.map((expert, index) => (
              <ExpertCard key={index} expert={expert} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Experts;