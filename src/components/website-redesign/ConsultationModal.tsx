
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
import { Calendar, ArrowRight } from "lucide-react";

declare global {
  interface Window {
    Calendly: any;
  }
}

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

  useEffect(() => {
    if (!isOpen) {
      // Reset to initial state when modal is closed
      setShowCalendly(false);
      return;
    }
    
    // Load Calendly scripts when modal is opened
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [isOpen]);

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/kmuverein-skv/webdesign-besprechung'
      });
      setIsOpen(false);
    } else {
      setShowCalendly(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerComponent}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-swiss-darkblue">
            Kostenlose Beratung für {industry}
          </DialogTitle>
        </DialogHeader>
        
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
                onClick={openCalendly}
                className="w-full bg-swiss-red hover:bg-swiss-red/90 text-white"
              >
                Termin vereinbaren <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-4">
            <p className="mb-4 text-sm text-gray-500">
              Bitte wählen Sie einen Termin in unserem Kalender:
            </p>
            <div 
              className="calendly-inline-widget w-full" 
              data-url="https://calendly.com/kmuverein-skv/webdesign-besprechung?hide_gdpr_banner=1"
              style={{ minWidth: "320px", height: "400px" }}
            ></div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
