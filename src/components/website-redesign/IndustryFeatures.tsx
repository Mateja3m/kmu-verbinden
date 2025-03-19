
import React from 'react';
import { motion } from 'framer-motion';
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-swiss-darkblue mb-4">
            Speziell für {industry} entwickelte Funktionen
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Unsere Websites enthalten branchenspezifische Funktionen, die genau auf Ihre Anforderungen zugeschnitten sind.
          </p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
              }}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:border-swiss-lightblue/50 transition-all duration-300"
            >
              <div className="h-12 w-12 bg-swiss-lightblue/10 rounded-full flex items-center justify-center mb-4 text-swiss-darkblue">
                {getIconForFeature(feature.title)}
              </div>
              <h3 className="text-lg font-semibold text-swiss-darkblue mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
