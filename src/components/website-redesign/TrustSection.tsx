
import { nationalPartners, regionalPartners } from "@/data/partners";
import { Star } from 'lucide-react';

interface TrustSectionProps {
  satisfactionRate: number;
}

export const TrustSection = ({ satisfactionRate }: TrustSectionProps) => {
  const websiteExperts = [
    ...nationalPartners.filter(p => 
      ['kensignton', 'webpiranha'].includes(p.id)
    ),
    ...regionalPartners.filter(p => 
      ['webagentur-forster'].includes(p.id)
    )
  ];

  return (
    <div className="text-center space-y-8">
      <h2 className="text-2xl font-semibold text-swiss-darkblue">Vertrauen Sie den Experten</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {websiteExperts.map((partner) => (
          <div 
            key={partner.id} 
            className="bg-white shadow-lg p-6 rounded-lg hover:shadow-xl transition-shadow"
            style={{
              minWidth: '200px',
              maxWidth: '280px'
            }}
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-12 object-contain mx-auto"
            />
            <p className="mt-3 text-sm text-gray-600">{partner.description}</p>
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-center gap-2">
        <Star className="h-5 w-5 text-swiss-red" />
        <p className="text-lg text-gray-600">
          Über {satisfactionRate}% unserer Kunden sind mit dem Redesign zufrieden
        </p>
      </div>
    </div>
  );
};
