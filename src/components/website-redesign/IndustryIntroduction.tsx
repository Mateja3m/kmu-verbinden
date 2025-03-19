
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check, ChevronRight } from 'lucide-react';

interface IndustryIntroductionProps {
  title: string;
  paragraphs: string[];
  bulletPoints?: string[];
  conclusion?: string;
  industry: string;
}

export const IndustryIntroduction = ({
  title,
  paragraphs,
  bulletPoints = [],
  conclusion,
  industry
}: IndustryIntroductionProps) => {
  return (
    <section className="py-10 bg-gradient-to-b from-white to-swiss-gray/10">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto border-none shadow-md bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-swiss-darkblue mb-6 text-center">
              {title}
            </h2>
            
            <div className="prose prose-lg mx-auto text-gray-700 space-y-4">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className={index === 0 ? "font-medium text-gray-800" : ""}>
                  {paragraph}
                </p>
              ))}
              
              {bulletPoints.length > 0 && (
                <div className="mt-6 space-y-3">
                  {bulletPoints.map((point, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-swiss-red shrink-0 mt-1 mr-3" />
                      <p className="m-0 text-base">{point}</p>
                    </div>
                  ))}
                </div>
              )}
              
              {conclusion && (
                <div className="mt-6 p-4 bg-swiss-lightblue/10 rounded-lg border border-swiss-lightblue/30">
                  <p className="m-0 text-swiss-darkblue font-medium">
                    {conclusion}
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-8 flex justify-center">
              <a 
                href="#website-check" 
                className="group inline-flex items-center text-swiss-red hover:text-swiss-darkblue font-medium transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('website-check')?.scrollIntoView({behavior: 'smooth'});
                }}
              >
                Website-Analyse für Ihre {industry} starten
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
