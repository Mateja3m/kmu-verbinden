
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, BadgePercent } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { nationalPartners } from '@/data/partners';

interface IndustryAssociationProps {
  industry: string;
}

export const IndustryAssociation = ({ industry }: IndustryAssociationProps) => {
  // Select a subset of partners to display
  const selectedPartners = nationalPartners.slice(0, 6);
  
  return (
    <div className="py-16 bg-gradient-to-b from-swiss-gray/20 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-swiss-darkblue mb-4">
            Wieso schreibt mich der KMU Verein an wegen einer Homepage?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Als führender Schweizer KMU Verein setzen wir uns für die Digitalisierung unserer Mitglieder ein.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-swiss-lightblue/10 rounded-lg text-swiss-darkblue">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-swiss-darkblue mb-2">Mehr als 15% unserer 2300 Mitglieder sind {industry}</h3>
                  <p className="text-gray-600">
                    Wir verstehen die spezifischen Anforderungen an die digitale Präsenz von {industry} und haben massgeschneiderte Lösungen entwickelt.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-swiss-lightblue/10 rounded-lg text-swiss-darkblue">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-swiss-darkblue mb-2">Spezialisierte Partner mit Branchenwissen</h3>
                  <p className="text-gray-600">
                    Wir arbeiten mit Webdesign-Partnern zusammen, die sich auf die Erstellung von Websites für {industry} spezialisiert haben und die Branchenanforderungen genau kennen.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-swiss-lightblue/10 rounded-lg text-swiss-darkblue">
                  <BadgePercent className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-swiss-darkblue mb-2">Exklusive Konditionen für {industry}</h3>
                  <p className="text-gray-600">
                    Als Mitglied unseres Vereins profitieren Sie von speziell ausgehandelten Konditionen, die deutlich unter den marktüblichen Preisen liegen.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-sm border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-swiss-darkblue mb-6 text-center">
                Unsere Webdesign-Partner
              </h3>
              
              <Carousel
                opts={{
                  align: "center",
                  loop: true
                }}
                className="w-full"
              >
                <CarouselContent>
                  {selectedPartners.map((partner) => (
                    <CarouselItem key={partner.id} className="basis-1/3 md:basis-1/3 lg:basis-1/3 pl-4">
                      <motion.div 
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-lg p-4 flex items-center justify-center h-24 shadow-sm hover:shadow-md transition-all duration-500 border border-gray-100"
                      >
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="max-h-12 max-w-full object-contain"
                        />
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-4">
                  <CarouselPrevious className="relative static left-0 translate-y-0 mr-2" />
                  <CarouselNext className="relative static right-0 translate-y-0 ml-2" />
                </div>
              </Carousel>
              
              <p className="text-center text-gray-500 text-sm mt-8">
                Alle Partner sind sorgfältig ausgewählt und auf Qualität geprüft
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
