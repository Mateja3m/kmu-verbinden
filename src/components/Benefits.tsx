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
    <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.number}
              className="relative bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="absolute -top-4 left-6 bg-swiss-darkblue text-white text-sm font-bold px-3 py-1.5 rounded-lg">
                {benefit.number}
              </div>
              <div className="h-12 w-12 text-swiss-red mb-6">
                <benefit.icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-swiss-darkblue mb-2">
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