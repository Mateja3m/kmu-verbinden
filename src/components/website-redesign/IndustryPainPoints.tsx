
import React from 'react';
import { AlertTriangle, X, CheckCircle2 } from 'lucide-react';

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
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100 group"
            >
              <div className="bg-red-50 p-4 relative">
                <div className="absolute top-2 right-2">
                  <X className="h-5 w-5 text-red-500" />
                </div>
                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mb-1">
                  <AlertTriangle className="h-6 w-6 text-swiss-red" />
                </div>
                <h3 className="text-lg font-semibold text-swiss-darkblue">{point.title}</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-600">{point.description}</p>
                
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center text-sm text-swiss-red opacity-0 group-hover:opacity-100 transition-opacity">
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  <span>Wir haben die Lösung</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
