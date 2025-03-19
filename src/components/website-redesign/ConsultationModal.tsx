
import { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface ConsultationModalProps {
  triggerComponent: React.ReactNode;
  industry: string;
}

export const ConsultationModal = ({ 
  triggerComponent,
  industry 
}: ConsultationModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const [isCalendlyLoading, setIsCalendlyLoading] = useState(true);
  const calendlyContainerRef = useRef<HTMLDivElement>(null);

  // Load Calendly scripts and initialize widget when showing the calendar view
  useEffect(() => {
    if (!isOpen || !showCalendly) return;

    // Clear any existing scripts to prevent duplicates
    const existingScript = document.getElementById('calendly-js');
    if (existingScript) {
      existingScript.remove();
    }

    setIsCalendlyLoading(true);
    
    // Create and load the Calendly script
    const script = document.createElement('script');
    script.id = 'calendly-js';
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => {
      setIsCalendlyLoading(false);
      
      // Force re-initialization if needed
      if (window.Calendly && calendlyContainerRef.current) {
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/kmuverein-skv/webdesign-besprechung?hide_gdpr_banner=1',
          parentElement: calendlyContainerRef.current,
          prefill: {},
          utm: {}
        });
      }
    };
    
    script.onerror = () => {
      console.error('Failed to load Calendly script');
      setIsCalendlyLoading(false);
      toast({
        title: "Fehler beim Laden des Kalenders",
        description: "Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.",
        variant: "destructive"
      });
    };
    
    document.body.appendChild(script);
    
    // Add CSS for Calendly
    if (!document.getElementById('calendly-css')) {
      const link = document.createElement('link');
      link.id = 'calendly-css';
      link.rel = 'stylesheet';
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(link);
    }

    return () => {
      // Don't remove the script on unmount to avoid reloading issues
    };
  }, [isOpen, showCalendly]);

  // Reset the calendar view when the modal is closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setShowCalendly(false);
        setIsCalendlyLoading(true);
      }, 300); // Delay to allow the modal closing animation
    }
  }, [isOpen]);

  const handleShowCalendly = () => {
    setShowCalendly(true);
    toast({
      title: "Kalender wird geladen",
      description: "Bitte warten Sie einen Moment..."
    });
  };

  // Industry-specific content
  const getIndustrySpecificContent = () => {
    if (industry === "Fahrschulen") {
      return {
        title: "Kostenlose Beratung für Fahrschulen",
        description: "Sichern Sie sich einen Beratungstermin für Ihre Webseite",
        introText: "Vereinbaren Sie einen unverbindlichen und kostenlosen Beratungstermin für Ihre Fahrschule.",
        benefits: [
          "Speziell für Fahrschulen, die ihre Webseite erneuern möchten",
          "Kostenlos und unverbindlich",
          "Persönliche Beratung durch Fahrschul-Branchenexperten"
        ]
      };
    } else if (industry === "Zahnärzte") {
      return {
        title: "Kostenlose Beratung für Zahnärzte",
        description: "Sichern Sie sich einen Beratungstermin für Ihre Webseite",
        introText: "Vereinbaren Sie einen unverbindlichen und kostenlosen Beratungstermin für Ihre Zahnarztpraxis.",
        benefits: [
          "Speziell für Zahnärzte, die ihre Webseite erneuern möchten",
          "Kostenlos und unverbindlich",
          "Persönliche Beratung durch Branchenexperten"
        ]
      };
    } else {
      return {
        title: `Kostenlose Beratung für ${industry}`,
        description: "Sichern Sie sich einen Beratungstermin für Ihre Webseite",
        introText: `Vereinbaren Sie einen unverbindlichen und kostenlosen Beratungstermin für Ihr Unternehmen.`,
        benefits: [
          `Speziell für ${industry}, die ihre Webseite erneuern möchten`,
          "Kostenlos und unverbindlich",
          "Persönliche Beratung durch Branchenexperten"
        ]
      };
    }
  };

  const content = getIndustrySpecificContent();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerComponent}
      </DialogTrigger>
      <DialogContent className={`${showCalendly ? 'sm:max-w-2xl md:max-w-3xl lg:max-w-4xl' : 'sm:max-w-md'}`}>
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-semibold text-swiss-darkblue">
            {content.title}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            {content.description}
          </DialogDescription>
        </DialogHeader>
        
        {!showCalendly ? (
          <div className="space-y-4 py-4">
            <p>
              {content.introText}
            </p>
            
            <div className="space-y-2">
              {content.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-swiss-red/10">
                    <span className="text-xs text-swiss-red">✓</span>
                  </div>
                  <p className="text-sm">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="pt-4">
              <Button
                onClick={handleShowCalendly}
                className="w-full bg-swiss-red hover:bg-swiss-red/90 text-white"
              >
                Termin vereinbaren <Calendar className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-2">
            <p className="mb-4 text-sm text-gray-500">
              Bitte wählen Sie einen Termin in unserem Kalender:
            </p>
            
            {isCalendlyLoading && (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-swiss-red" />
                <p className="text-sm text-gray-500">Kalender wird geladen...</p>
              </div>
            )}
            
            <div 
              ref={calendlyContainerRef}
              style={{ 
                height: "630px",
                visibility: isCalendlyLoading ? 'hidden' : 'visible'
              }}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
