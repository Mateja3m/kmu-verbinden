
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Globe, Smartphone, Code, Calendar, Mail, Bot, Percent, Award, FileSearch } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface IndustryOfferProps {
  industry: string;
}

export const IndustryOffer = ({ industry }: IndustryOfferProps) => {
  return (
    <div className="py-16 bg-swiss-darkblue/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-swiss-darkblue mb-4">
            Unser Angebot für Sie
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ein Komplettpaket speziell für {industry}, das alle wichtigen Funktionen umfasst, die Sie für Ihren erfolgreichen Webauftritt benötigen.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-md border border-gray-100 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-swiss-red text-white px-4 py-2 rounded-bl-lg font-medium text-sm">
              30% günstiger als Marktpreise
            </div>
            
            <h3 className="text-2xl font-bold text-swiss-darkblue mb-6 mt-4">Komplettpaket Website</h3>
            
            <div className="space-y-4">
              <FeatureItem icon={<Globe />} title="Komplette Webseite inkl. SEO" />
              <FeatureItem icon={<Smartphone />} title="Mobile Responsive Design" />
              <FeatureItem icon={<Code />} title="Modernste Frameworks" />
              <FeatureItem icon={<Calendar />} title="Buchungssystem & Kalenderanbindung" />
              <FeatureItem icon={<Mail />} title="E-Mail-Marketingsystem" />
              <FeatureItem icon={<Bot />} title="Automatisierungen & KI-Integration" />
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center mb-2">
                <Percent className="w-5 h-5 text-swiss-red mr-2" />
                <span className="text-swiss-darkblue font-medium">30% günstiger als Marktpreise</span>
              </div>
              <p className="text-sm text-gray-500 ml-7">Durch gebündelte Einkaufsmacht des KMU Vereins</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <Award className="w-8 h-8 text-swiss-red" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-swiss-darkblue mb-2">Gratis Mitgliedschaft im KMU Verein für 1 Jahr</h3>
                  <p className="text-gray-600">
                    Bei Beauftragung eines Website-Projekts erhalten Sie eine kostenlose einjährige Mitgliedschaft im Schweizerischen KMU Verein im Wert von CHF 360.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">Zugang zu allen Vereinsvorteilen</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">Sonderkonditionen bei über 30 Partnern</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">Netzwerk zu anderen Unternehmern</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-swiss-lightblue/10 to-swiss-lightblue/20 p-6 rounded-xl border border-swiss-lightblue/30">
              <div className="flex items-center gap-3 mb-4">
                <FileSearch className="h-6 w-6 text-swiss-red" />
                <h3 className="text-xl font-semibold text-swiss-darkblue">Kostenlose Website-Analyse & Beratung</h3>
              </div>
              
              <p className="text-gray-600">
                Erhalten Sie eine umfassende Analyse Ihrer aktuellen {industry}-Website sowie eine persönliche Beratung zu Verbesserungsmöglichkeiten – <span className="font-semibold">komplett kostenlos und unverbindlich</span>.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ icon, title }: { icon: React.ReactNode, title: string }) => (
  <div className="flex items-center">
    <div className="mr-3 text-swiss-darkblue">
      {icon}
    </div>
    <span className="text-gray-700">{title}</span>
  </div>
);
