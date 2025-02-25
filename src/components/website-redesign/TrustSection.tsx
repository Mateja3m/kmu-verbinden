
import { Star } from 'lucide-react';
import { nationalPartners } from "@/data/partners";

interface TrustSectionProps {
  satisfactionRate: number;
}

export const TrustSection = ({ satisfactionRate }: TrustSectionProps) => {
  return (
    <div className="text-center space-y-8">
      <h2 className="text-2xl font-semibold text-swiss-darkblue">Vertrauen Sie den Experten</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {nationalPartners.slice(0, 3).map((partner) => (
          <div key={partner.id} className="bg-white shadow-lg p-4 rounded-lg hover:shadow-xl transition-shadow">
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-12 object-contain"
            />
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-center gap-2">
        <Star className="h-5 w-5 text-swiss-red" />
        <p className="text-lg text-gray-600">
          Über {satisfactionRate}% der Schweizer Unternehmen profitieren bereits von unserer KI-gestützten Optimierung
        </p>
      </div>
    </div>
  );
};
