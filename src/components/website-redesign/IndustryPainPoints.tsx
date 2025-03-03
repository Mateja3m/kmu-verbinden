
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface PainPoint {
  title: string;
  description: string;
}

interface IndustryPainPointsProps {
  painPoints: PainPoint[];
  industry: string;
}

export const IndustryPainPoints = ({
  painPoints,
  industry
}: IndustryPainPointsProps) => {
  return (
    <div className="bg-swiss-darkblue/5 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-swiss-darkblue mb-4">
            Typische Herausforderungen für {industry}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Die meisten {industry} kämpfen mit diesen Problemen bei ihrer digitalen Präsenz, die potenzielle Kunden abschrecken können.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {painPoints.map((point, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-swiss-red" />
              </div>
              <h3 className="text-lg font-semibold text-swiss-darkblue mb-2">{point.title}</h3>
              <p className="text-gray-600">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
