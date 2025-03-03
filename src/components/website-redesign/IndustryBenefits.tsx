
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface Benefit {
  title: string;
  description: string;
}

interface IndustryBenefitsProps {
  benefits: Benefit[];
  industry: string;
}

export const IndustryBenefits = ({
  benefits,
  industry
}: IndustryBenefitsProps) => {
  return (
    <div className="py-16 bg-gradient-to-b from-white to-swiss-gray/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-swiss-darkblue mb-4">
            Ihre Vorteile mit einer optimierten Website
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Eine professionelle Website, die auf die Bedürfnisse von {industry} zugeschnitten ist, bietet Ihnen entscheidende Vorteile.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="flex items-start p-6 bg-white rounded-lg shadow-sm border border-gray-100"
            >
              <div className="mr-4 mt-1">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-swiss-darkblue mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
