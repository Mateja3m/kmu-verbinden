import { Check } from "lucide-react";

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

const BenefitsGrid = () => {
  return (
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
  );
};

export default BenefitsGrid;