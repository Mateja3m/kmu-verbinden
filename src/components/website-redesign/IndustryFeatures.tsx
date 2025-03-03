
import React from 'react';
import { Monitor, Users, Search, Calendar, ShieldCheck, PieChart } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
}

interface IndustryFeaturesProps {
  features: Feature[];
  industry: string;
}

export const IndustryFeatures = ({
  features,
  industry
}: IndustryFeaturesProps) => {
  // Icon mapping for different feature titles
  const getIconForFeature = (title: string) => {
    if (title.toLowerCase().includes('seo')) return <Search className="h-6 w-6" />;
    if (title.toLowerCase().includes('termin')) return <Calendar className="h-6 w-6" />;
    if (title.toLowerCase().includes('behandlung')) return <ShieldCheck className="h-6 w-6" />;
    if (title.toLowerCase().includes('vertrauen')) return <Users className="h-6 w-6" />;
    if (title.toLowerCase().includes('analyse')) return <PieChart className="h-6 w-6" />;
    return <Monitor className="h-6 w-6" />;
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-swiss-darkblue mb-4">
            Speziell für {industry} entwickelte Funktionen
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Unsere Websites enthalten branchenspezifische Funktionen, die genau auf Ihre Anforderungen zugeschnitten sind.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-6 shadow-md border border-gray-100 hover:border-swiss-red/30 hover:shadow-lg transition-all"
            >
              <div className="h-12 w-12 bg-swiss-darkblue/10 rounded-full flex items-center justify-center mb-4 text-swiss-darkblue">
                {getIconForFeature(feature.title)}
              </div>
              <h3 className="text-lg font-semibold text-swiss-darkblue mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
