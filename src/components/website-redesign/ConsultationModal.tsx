
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  const [isCalendlyScriptLoading, setIsCalendlyScriptLoading] = useState(false);

  // Load Calendly scripts when modal is opened
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    // Only load the script if it's not already loading or loaded
    if (!isCalendlyScriptLoading && !document.getElementById('calendly-css') && !document.getElementById('calendly-js')) {
      setIsCalendlyScriptLoading(true);
      
      // Add Calendly CSS
      const link = document.createElement("link");
      link.id = "calendly-css";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);

      // Add Calendly JS
      const script = document.createElement("script");
      script.id = "calendly-js";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => {
        setIsCalendlyScriptLoading(false);
        console.log("Calendly script loaded");
      };
      document.body.appendChild(script);
    }
    
    // Cleanup function only removes script if modal is closed
    return () => {
      // We don't remove scripts anymore as they can be reused
    };
  }, [isOpen]);

  const handleShowCalendly = () => {
    setShowCalendly(true);
    toast({
      title: "Kalender wird geladen",
      description: "Bitte warten Sie einen Moment..."
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerComponent}
      </DialogTrigger>
      <DialogContent className={`sm:max-w-${showCalendly ? 'xl' : 'md'} max-h-[90vh]`}>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-swiss-darkblue">
            Kostenlose Beratung für {industry}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[80vh] overflow-auto pr-4">
          {!showCalendly ? (
            <div className="space-y-4 py-4">
              <p>
                Vereinbaren Sie einen unverbindlichen und kostenlosen Beratungstermin für Ihre Zahnarztpraxis.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-swiss-red/10">
                    <span className="text-xs text-swiss-red">✓</span>
                  </div>
                  <p className="text-sm">
                    Speziell für Zahnärzte, die ihre Webseite erneuern möchten
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-swiss-red/10">
                    <span className="text-xs text-swiss-red">✓</span>
                  </div>
                  <p className="text-sm">
                    Kostenlos und unverbindlich
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-swiss-red/10">
                    <span className="text-xs text-swiss-red">✓</span>
                  </div>
                  <p className="text-sm">
                    Persönliche Beratung durch Branchenexperten
                  </p>
                </div>
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
            <div className="py-4">
              <p className="mb-4 text-sm text-gray-500">
                Bitte wählen Sie einen Termin in unserem Kalender:
              </p>
              <div 
                className="calendly-inline-widget" 
                data-url="https://calendly.com/kmuverein-skv/webdesign-besprechung?hide_gdpr_banner=1"
                style={{ minWidth: "320px", height: "630px" }}
              ></div>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
