import { Monitor, Users, Award, Lightbulb } from 'lucide-react';

const benefits = [
  {
    title: "Multimediale Sichtbarkeit",
    icon: Monitor,
    number: "01",
    description: "Erhöhen Sie Ihre Präsenz in der Schweizer KMU-Landschaft"
  },
  {
    title: "Redaktionelle Angebote",
    icon: Users,
    number: "02",
    description: "Profitieren Sie von exklusiven Publikationsmöglichkeiten"
  },
  {
    title: "SKV-Partner Angebote",
    icon: Award,
    number: "03",
    description: "Nutzen Sie attraktive Vergünstigungen unserer Partner"
  },
  {
    title: "Experten-Positionierung",
    icon: Lightbulb,
    number: "04",
    description: "Etablieren Sie sich als Branchenexperte"
  }
];

const Benefits = () => {
  return (
    <div className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-swiss-darkblue mb-4">Ihre Vorteile als Mitglied</h2>
          <p className="text-lg text-gray-600">Entdecken Sie die exklusiven Mehrwerte einer SKV-Mitgliedschaft</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.number}
              className="relative bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-gradient-to-br from-white to-gray-50"
            >
              <div className="absolute -top-4 left-6 bg-gradient-to-r from-swiss-red to-swiss-red/80 text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-lg">
                {benefit.number}
              </div>
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