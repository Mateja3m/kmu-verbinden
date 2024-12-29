import { Monitor, Users, Award, Lightbulb } from 'lucide-react';

const benefits = [
  {
    title: "Multimediale Sichtbarkeit",
    icon: Monitor,
    number: "01"
  },
  {
    title: "Redaktionelle Angebote",
    icon: Users,
    number: "02"
  },
  {
    title: "SKV-Partner Angebote",
    icon: Award,
    number: "03"
  },
  {
    title: "Experten-Positionierung",
    icon: Lightbulb,
    number: "04"
  }
];

const Benefits = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.number}
              className="relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="absolute -top-4 left-6 bg-primary text-white text-sm font-bold px-2 py-1 rounded">
                {benefit.number}
              </div>
              <div className="h-12 w-12 text-primary mb-4">
                <benefit.icon size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Benefits;