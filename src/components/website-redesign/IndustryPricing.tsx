
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface IndustryPricingProps {
  pricingDeals: string;
  industry: string;
}

export const IndustryPricing = ({
  pricingDeals,
  industry
}: IndustryPricingProps) => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-swiss-darkblue mb-4">
            Exklusive Angebote für {industry}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Als Mitglied profitieren Sie von besonders attraktiven Konditionen für Ihre neue Website.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
          <div className="bg-swiss-darkblue text-white p-6">
            <h3 className="text-xl font-semibold mb-2">Mitgliedervorteile</h3>
            <p>Die folgenden Angebote gelten exklusiv für Verbandsmitglieder</p>
          </div>
          
          <div className="p-8">
            <div className="p-6 bg-swiss-darkblue/5 rounded-lg mb-6">
              <p className="text-lg font-medium text-swiss-darkblue">{pricingDeals}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-swiss-red mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm">Keine versteckten Kosten oder Zusatzgebühren</p>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-swiss-red mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm">Inkl. 12 Monate kostenloser technischer Support</p>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-swiss-red mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm">Auf Wunsch inkl. Domain & E-Mail-Adressen</p>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-swiss-red mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm">Schnelle Umsetzung in 4-6 Wochen</p>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-swiss-red mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm">SSL-Zertifikat für sichere Datenübertragung</p>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-swiss-red mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm">Kostenlose Ersteinrichtung Ihres Google Business Profils</p>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                size="lg" 
                className="bg-swiss-red hover:bg-swiss-red/90 text-white font-medium px-8"
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({behavior: 'smooth'})}
              >
                Unverbindliches Angebot anfordern
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
