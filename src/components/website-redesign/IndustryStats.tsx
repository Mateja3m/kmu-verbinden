
import React from 'react';
import { motion } from 'framer-motion';

interface StatItem {
  value: string;
  label: string;
}

interface IndustryStatsProps {
  title: string;
  description?: string;
  stats: StatItem[];
}

export const IndustryStats = ({ 
  title, 
  description, 
  stats 
}: IndustryStatsProps) => {
  return (
    <section className="py-12 bg-swiss-gray/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-xl md:text-2xl font-semibold text-swiss-darkblue">
            {title}
          </h3>
          {description && (
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md border border-gray-50 p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl font-bold text-swiss-red mb-2">
                {stat.value}
              </div>
              <p className="text-gray-700">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
