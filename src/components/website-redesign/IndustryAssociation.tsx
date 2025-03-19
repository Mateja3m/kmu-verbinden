
import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Award, Building, CreditCard, Users, Gift } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface IndustryAssociationProps {
  industry: string;
}

export const IndustryAssociation = ({ industry }: IndustryAssociationProps) => {
  // Check if the industry is a driving school to show specific content
  const isDrivingSchool = industry === "Fahrschulen";
  
  return (
    <div className="py-16 bg-swiss-darkblue/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-swiss-darkblue mb-4">
            {isDrivingSchool ? 
              "Der Schweizer KMU Verein unterstützt Fahrschulen" : 
              "Der Schweizer KMU Verein hilft Ihnen weiter"}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {isDrivingSchool ?
              "Als führender Verband für KMUs in der Schweiz verstehen wir die spezifischen Herausforderungen von Fahrschulen und Fahrlehrern." :
              "Als führender Verband für KMUs in der Schweiz verstehen wir die spezifischen Herausforderungen von " + industry + "."}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 space-y-8">
              <div className="flex items-start">
                <div className="mr-4 p-3 bg-swiss-lightblue/10 rounded-full">
                  <BadgeCheck className="h-6 w-6 text-swiss-darkblue" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-swiss-darkblue mb-2">Zertifizierte Partner</h3>
                  <p className="text-gray-600">
                    {isDrivingSchool ?
                      "Unsere sorgfältig ausgewählten Webdesign-Partner verstehen die spezifischen Anforderungen von Fahrschulen und bringen Erfahrung in der Entwicklung von Buchungssystemen mit." :
                      "Unsere sorgfältig ausgewählten Partner durchlaufen einen strengen Zertifizierungsprozess, um sicherzustellen, dass sie höchste Qualitätsstandards erfüllen."}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 p-3 bg-swiss-lightblue/10 rounded-full">
                  <Award className="h-6 w-6 text-swiss-darkblue" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-swiss-darkblue mb-2">Exklusive Konditionen</h3>
                  <p className="text-gray-600">
                    {isDrivingSchool ?
                      "Als Mitglied des KMU Vereins profitieren Sie von Sonderkonditionen für Website-Erstellung, Bewertungsmanagement und Buchungssysteme speziell für Fahrschulen." :
                      "Als Mitglied des KMU Vereins profitieren Sie von exklusiven Konditionen und Rabatten bei unseren Partnern, die nicht öffentlich verfügbar sind."}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 p-3 bg-swiss-lightblue/10 rounded-full">
                  <Users className="h-6 w-6 text-swiss-darkblue" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-swiss-darkblue mb-2">Starkes Netzwerk</h3>
                  <p className="text-gray-600">
                    {isDrivingSchool ?
                      "Tauschen Sie sich mit anderen Fahrschulen aus und nutzen Sie das umfangreiche Netzwerk des KMU Vereins für Empfehlungen und Kooperationsmöglichkeiten." :
                      "Profitieren Sie von einem starken Netzwerk aus Gleichgesinnten und knüpfen Sie wertvolle Geschäftskontakte innerhalb des Verbands."}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-swiss-lightblue/10 to-swiss-lightblue/20 p-6 rounded-xl border border-swiss-lightblue/30">
              <div className="flex items-center gap-3 mb-4">
                <Gift className="h-6 w-6 text-swiss-red" />
                <h3 className="text-xl font-semibold text-swiss-darkblue">
                  {isDrivingSchool ?
                    "Spezielles Angebot für Fahrschulen" :
                    "Sonderangebot für Neumitglieder"}
                </h3>
              </div>
              
              <p className="text-gray-600 mb-4">
                {isDrivingSchool ?
                  "Werden Sie jetzt Mitglied und erhalten Sie eine kostenlose Website-Analyse sowie ein Erstgespräch mit einem auf Fahrschulen spezialisierten Digitalexperten." :
                  "Werden Sie jetzt Mitglied und erhalten Sie eine kostenlose Website-Analyse sowie ein Erstgespräch mit einem auf Ihre Branche spezialisierten Digitalexperten."}
              </p>
              
              <Button 
                variant="default" 
                className="w-full bg-swiss-red hover:bg-swiss-red/90 text-white"
                onClick={() => document.getElementById('website-check')?.scrollIntoView({behavior: 'smooth'})}
              >
                Kostenlose Analyse starten
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="text-center max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-swiss-darkblue mb-4">Wir vertreten die Interessen von KMUs in der Schweiz</h3>
                <div className="flex justify-center flex-wrap gap-6 mb-4">
                  <div className="flex flex-col items-center">
                    <Building className="h-8 w-8 text-swiss-red mb-2" />
                    <span className="text-sm">2000+ Mitglieder</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <CreditCard className="h-8 w-8 text-swiss-red mb-2" />
                    <span className="text-sm">30+ Partner</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Seit über 10 Jahren setzen wir uns für die Interessen von Kleinunternehmen und die Stärkung des Schweizer Wirtschaftsstandorts ein.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
