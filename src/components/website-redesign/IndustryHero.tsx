
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { WebsiteOptimizationSimulation } from './WebsiteOptimizationSimulation';
import { ConsultationModal } from './ConsultationModal';

interface IndustryHeroProps {
  headline: string;
  subheadline: string;
  industry: string;
  imagePath?: string;
  showSimulation?: boolean;
}

export const IndustryHero = ({
  headline,
  subheadline,
  industry,
  imagePath = '/placeholder.svg',
  showSimulation = false
}: IndustryHeroProps) => {
  // Define the default image for dentists
  const dentistImage = "https://image.brigitte.de/11752034/t/sd/v3/w1440/r1.5/-/jobprofil-zahnarzt.jpg";
  
  // Use the dentist image for the dental industry, otherwise use the provided image
  const displayImage = industry === "Zahnärzte" ? dentistImage : imagePath;

  // Consultation Button component to be passed to the modal
  const consultationButton = (
    <Button 
      size="lg" 
      variant="outline"
      className="border-swiss-darkblue text-swiss-darkblue hover:bg-swiss-darkblue/5"
      aria-label="Beratungstermin für Ihre Zahnarztpraxis vereinbaren"
    >
      Beratungstermin vereinbaren
    </Button>
  );

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white to-swiss-gray pt-4 md:pt-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-3 md:pr-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-swiss-red/10 text-swiss-red">
              Branchenspezifische Lösung für {industry}
            </div>
            
            {/* Use headline as H1 for proper SEO structure */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-swiss-darkblue leading-tight">
              {headline}
            </h1>
            
            <p className="text-lg text-gray-700">
              {subheadline}
            </p>
            
            <div className="space-y-2 pt-2">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-swiss-red mr-2 mt-0.5" />
                <p className="text-sm">Spezielle Konditionen für Vereinsmitglieder</p>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-swiss-red mr-2 mt-0.5" />
                <p className="text-sm">Optimierte lokale Sichtbarkeit für Ihre Praxis</p>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-swiss-red mr-2 mt-0.5" />
                <p className="text-sm">Persönliche Betreuung durch Branchenexperten</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button 
                size="lg" 
                className="bg-swiss-red hover:bg-swiss-red/90 text-white font-medium"
                onClick={() => document.getElementById('website-check')?.scrollIntoView({behavior: 'smooth'})}
                aria-label="Kostenlose Website-Analyse starten"
              >
                Kostenlose Analyse <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              
              <ConsultationModal 
                triggerComponent={consultationButton}
                industry={industry} 
              />
            </div>
          </div>
          
          <div className="relative rounded-lg shadow-2xl overflow-hidden">
            {showSimulation ? (
              <WebsiteOptimizationSimulation />
            ) : (
              <>
                <img 
                  src={displayImage} 
                  alt={`${industry} Website Beispiel - Professionelle Webpräsenz für Ihre Praxis`} 
                  className="w-full h-auto object-cover aspect-video"
                  loading="eager"
                  width="600"
                  height="400"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-swiss-darkblue/30 to-transparent pointer-events-none"></div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
