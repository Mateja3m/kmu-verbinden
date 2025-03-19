
import React from 'react';
import { motion } from 'framer-motion';
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
              }}
              className="flex flex-col p-6 bg-white rounded-xl shadow-sm border border-gray-100 transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-swiss-darkblue">{benefit.title}</h3>
              </div>
              <p className="text-gray-600 mt-2">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
