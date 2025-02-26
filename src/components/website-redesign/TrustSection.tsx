
import { Star, Award, Users } from 'lucide-react';
import { nationalPartners } from "@/data/partners";

interface TrustSectionProps {
  satisfactionRate: number;
}

export const TrustSection = ({ satisfactionRate }: TrustSectionProps) => {
  const selectedPartners = nationalPartners.filter(partner => 
    ['hhomepage', 'artemia', 'kensignton'].includes(partner.id)
  );

  return (
    <div className="text-center space-y-8 mt-16">
      <h2 className="text-2xl font-semibold text-swiss-darkblue">Vertrauen Sie den Experten</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-2">
          <Star className="h-8 w-8 text-swiss-red mx-auto" />
          <p className="text-xl font-semibold">{satisfactionRate}%</p>
          <p className="text-gray-600">Kundenzufriedenheit</p>
        </div>
        <div className="space-y-2">
          <Award className="h-8 w-8 text-swiss-red mx-auto" />
          <p className="text-xl font-semibold">15+ Jahre</p>
          <p className="text-gray-600">Branchenerfahrung</p>
        </div>
        <div className="space-y-2">
          <Users className="h-8 w-8 text-swiss-red mx-auto" />
          <p className="text-xl font-semibold">500+</p>
          <p className="text-gray-600">Zufriedene Kunden</p>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-8 mt-12">
        {selectedPartners.map((partner) => (
          <div 
            key={partner.id} 
            className="bg-white shadow-lg p-6 rounded-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-12 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
