
import React from 'react';
import { Button } from '@/components/ui/button';
import { Award, Check, Gift } from 'lucide-react';

interface MembershipOfferProps {
  industry: string;
}

export const MembershipOffer = ({ industry }: MembershipOfferProps) => {
  return (
    <div className="py-16 bg-gradient-to-b from-swiss-gray/20 to-white">
      <div className="container mx-auto px-4">
        <div className="bg-white border border-swiss-darkblue/10 rounded-xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="md:col-span-3 p-8 md:p-10">
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-6 w-6 text-yellow-500" />
                <span className="text-swiss-darkblue font-medium">Exklusives Angebot</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-swiss-darkblue mb-6">
                Gratis Mitgliedschaft für ein Jahr 
              </h2>
              
              <p className="text-gray-600 mb-8">
                Der Schweizerische KMU Verein bietet allen {industry}, die ein Webdesign-Paket buchen, 
                eine <span className="font-bold">kostenlose Mitgliedschaft für ein volles Jahr</span>. 
                Profitieren Sie von allen exklusiven Vorteilen unserer Mitglieder, während Sie Ihre digitale 
                Präsenz optimieren.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <p>Zugang zu allen Verbands-Veranstaltungen und Netzwerktreffen</p>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <p>Exklusive Rabatte bei allen Verbandspartnern</p>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <p>Kostenloses Erstgespräch bei rechtlichen Fragen</p>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <p>Sichtbarkeit im Mitgliederverzeichnis</p>
                </div>
              </div>
              
              <Button 
                className="bg-swiss-red hover:bg-swiss-red/90 text-white font-medium" 
                size="lg"
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({behavior: 'smooth'})}
              >
                <Gift className="mr-2 h-5 w-5" />
                Jetzt Angebot sichern
              </Button>
            </div>
            
            <div className="md:col-span-2 bg-swiss-darkblue relative hidden md:block">
              <div className="absolute inset-0 bg-cover bg-center opacity-30" 
                   style={{backgroundImage: 'url("/placeholder.svg")'}}></div>
              <div className="relative h-full flex flex-col justify-center p-10">
                <div className="text-white space-y-6">
                  <h3 className="text-2xl font-bold">Warum der Schweizerische KMU Verein?</h3>
                  <p>
                    Als der führende Verband für KMU in der Schweiz verstehen wir die spezifischen 
                    Herausforderungen von {industry}. Unser Ziel ist es, Ihnen den Zugang zu erstklassigen 
                    digitalen Lösungen zu ermöglichen, damit Sie sich auf Ihre Kernkompetenzen konzentrieren können.
                  </p>
                  <p>
                    Mit über 2,000 Mitgliedern bieten wir ein starkes Netzwerk und jahrelange Erfahrung, 
                    von der Sie als Mitglied profitieren können.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
