
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface CaseStudy {
  title: string;
  quote: string;
  personName: string;
  position: string;
  initials: string;
}

interface IndustryCaseStudiesProps {
  title: string;
  caseStudies: CaseStudy[];
}

export const IndustryCaseStudies = ({
  title,
  caseStudies
}: IndustryCaseStudiesProps) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl md:text-3xl font-bold text-swiss-darkblue mb-10 text-center">
          {title}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-swiss-gray/10">
                <CardContent className="p-6 relative">
                  <Quote className="absolute top-6 right-6 h-10 w-10 text-swiss-lightblue/20" />
                  
                  <h4 className="text-xl font-semibold text-swiss-darkblue mb-3">
                    {study.title}
                  </h4>
                  
                  <p className="text-gray-700 mb-6 italic">
                    "{study.quote}"
                  </p>
                  
                  <div className="flex items-center mt-auto">
                    <div className="w-10 h-10 bg-swiss-lightblue/20 rounded-full flex items-center justify-center text-swiss-darkblue font-bold">
                      {study.initials}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium">{study.personName}</div>
                      <div className="text-xs text-gray-500">{study.position}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
