import { Monitor, Users, Award, Lightbulb, Network, FileText, BadgeCheck, Bot } from 'lucide-react';

const benefits = [
  {
    title: "Multimediale Sichtbarkeit",
    icon: Monitor,
    description: "Erhöhen Sie Ihre Präsenz in der Schweizer KMU-Landschaft"
  },
  {
    title: "Redaktionelle Angebote",
    icon: FileText,
    description: "Profitieren Sie von exklusiven Publikationsmöglichkeiten"
  },
  {
    title: "SKV-Partner Angebote",
    icon: Award,
    description: "Nutzen Sie attraktive Vergünstigungen unserer Partner"
  },
  {
    title: "Experten-Positionierung",
    icon: Lightbulb,
    description: "Etablieren Sie sich als Branchenexperte"
  },
  {
    title: "Netzwerk",
    icon: Network,
    description: "Vernetzen Sie sich mit anderen KMU und profitieren Sie vom Erfahrungsaustausch"
  },
  {
    title: "KI-Beratung",
    icon: Bot,
    description: "Kostenlose Beratung zu Automatisierung und künstlicher Intelligenz"
  },
  {
    title: "Zertifizierung",
    icon: BadgeCheck,
    description: "Offizielles Mitgliederzertifikat für Ihr Unternehmen"
  },
  {
    title: "Community",
    icon: Users,
    description: "Werden Sie Teil einer starken Gemeinschaft von Unternehmern"
  }
];

const Benefits = () => {
  return (
    <div className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-swiss-darkblue mb-4">
            Ihre Vorteile als Mitglied
          </h2>
          <p className="text-lg text-gray-600">
            Entdecken Sie die exklusiven Mehrwerte einer SKV-Mitgliedschaft
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="relative bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-gradient-to-br from-white to-swiss-gray"
            >
              <div className="h-12 w-12 text-swiss-red mb-6">
                <benefit.icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-swiss-darkblue mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Benefits;