
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

interface CaseStudy {
  title: string;
  description: string;
  image: string;
}

interface IndustryCaseStudiesProps {
  caseStudies: CaseStudy[];
  industry: string;
}

export const IndustryCaseStudies = ({
  caseStudies,
  industry
}: IndustryCaseStudiesProps) => {
  return (
    <div className="py-16 bg-swiss-darkblue/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-swiss-darkblue mb-4">
            Erfolgsgeschichten von {industry}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sehen Sie, wie andere {industry} von unseren Website-Lösungen profitiert haben.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {caseStudies.map((study, index) => (
            <Card 
              key={index} 
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="h-48 overflow-hidden bg-swiss-gray/20">
                <img 
                  src={study.image} 
                  alt={study.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-swiss-darkblue mb-2">{study.title}</h3>
                <p className="text-gray-600 mb-4">{study.description}</p>
                <div className="flex items-center text-swiss-red font-medium group-hover:translate-x-1 transition-transform">
                  Case Study lesen <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
