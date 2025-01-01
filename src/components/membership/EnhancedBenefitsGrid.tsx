import { DollarSign, Bot, Newspaper, Network, TrendingUp, Users, Percent, UserPlus } from 'lucide-react';
import { cn } from "@/lib/utils";

interface BenefitCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  tag?: string;
  tagColor?: string;
}

const BenefitCard = ({ title, description, icon, tag, tagColor }: BenefitCardProps) => (
  <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
    {tag && (
      <span className={cn(
        "inline-block px-3 py-1 rounded-full text-sm font-semibold text-white mb-4",
        tagColor || "bg-swiss-red"
      )}>
        {tag}
      </span>
    )}
    <div className="text-swiss-red mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-swiss-darkblue mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const benefits = [
  {
    title: "KMU Finanzierung",
    description: "10'000 zinslos und laufzeitfrei.",
    icon: <DollarSign size={32} />,
    tag: "NEU",
    tagColor: "bg-green-500"
  },
  {
    title: "Kostenlose KI-Beratung",
    description: "Profitieren Sie 2025 von unserer kostenlosen Beratung zu Automatisierung und künstlicher Intelligenz für Ihr Unternehmen.",
    icon: <Bot size={32} />,
    tag: "Exklusiver Vorteil",
    tagColor: "bg-purple-500"
  },
  {
    title: "Sichtbarkeit im Unternehmensblick",
    description: "Präsentieren Sie Ihr Unternehmen in unserem exklusiven Magazin und erreichen Sie tausende Entscheidungsträger.",
    icon: <Newspaper size={32} />
  },
  {
    title: "Präsenz im Unternehmensjournal",
    description: "Profitieren Sie von redaktionellen Beiträgen und Expertenprofilen in unserem digitalen Journal.",
    icon: <Newspaper size={32} />
  },
  {
    title: "Netzwerkmöglichkeiten",
    description: "Vernetzen Sie sich mit anderen Unternehmern und erweitern Sie Ihr berufliches Netzwerk.",
    icon: <Network size={32} />
  },
  {
    title: "Unternehmenswachstum",
    description: "Profitieren Sie von Expertenwissen und Strategien für nachhaltiges Wachstum.",
    icon: <TrendingUp size={32} />
  },
  {
    title: "Interessenvertretung",
    description: "Starke Stimme für KMUs in der Wirtschaft und Politik.",
    icon: <Users size={32} />
  },
  {
    title: "Rabatte & Angebote",
    description: "Exklusive Vergünstigungen bei ausgewählten Partnern und Dienstleistern.",
    icon: <Percent size={32} />
  },
  {
    title: "Aktiv Neukunden gewinnen",
    description: "Profitieren Sie von aktiver Empfehlung durch den KMU Verein und erschließen Sie neue Geschäftsmöglichkeiten.",
    icon: <UserPlus size={32} />
  }
];

const EnhancedBenefitsGrid = () => {
  return (
    <div className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-swiss-darkblue mb-4">
            Exklusive Vorteile für unsere Mitglieder
          </h2>
          <p className="text-lg text-gray-600">
            Entdecken Sie die vielfältigen Mehrwerte einer SKV-Mitgliedschaft
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedBenefitsGrid;