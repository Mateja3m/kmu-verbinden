
import { useRef, useState } from "react";
import MembershipHero from "@/components/membership/MembershipHero";
import EnhancedBenefitsGrid from "@/components/membership/EnhancedBenefitsGrid";
import Testimonials from "@/components/membership/Testimonials";
import { Button } from "@/components/ui/button";
import RegistrationForm from "@/components/membership/RegistrationForm";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

const Membership = () => {
  const benefitsRef = useRef<HTMLDivElement>(null);
  const registrationFormRef = useRef<HTMLDivElement>(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const scrollToBenefits = () => {
    benefitsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGetStarted = () => {
    setShowRegistration(true);
    setTimeout(() => {
      registrationFormRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MembershipHero onGetStartedClick={scrollToBenefits} />
      
      {/* Pricing Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-swiss-darkblue mb-4">
              Mitgliedschaft Optionen
            </h2>
            <p className="text-lg text-gray-600">
              Wählen Sie die passende Mitgliedschaft für Ihr Unternehmen
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Individual Membership */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-100 hover:border-swiss-red transition-colors">
              <h3 className="text-xl font-bold text-swiss-darkblue mb-2">Einzelmitgliedschaft</h3>
              <p className="text-gray-600 mb-4">Für Einzelunternehmer und Selbständige</p>
              <div className="text-3xl font-bold text-swiss-red mb-6">CHF 300.-<span className="text-sm text-gray-500 font-normal">/Jahr</span></div>
              <p className="text-sm text-gray-500 mb-6">Passiv-Mitgliedschaft mit allen Grundleistungen</p>
              <Button 
                onClick={handleGetStarted}
                className="w-full bg-swiss-red hover:bg-swiss-red/90"
              >
                Jetzt Mitglied werden
              </Button>
            </div>

            {/* SME Membership */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-swiss-red relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-swiss-red text-white px-4 py-1 rounded-full text-sm">
                Empfohlen
              </div>
              <h3 className="text-xl font-bold text-swiss-darkblue mb-2">KMU Mitgliedschaft</h3>
              <p className="text-gray-600 mb-4">Für kleine und mittlere Unternehmen</p>
              <div className="text-3xl font-bold text-swiss-red mb-6">CHF 550.-<span className="text-sm text-gray-500 font-normal">/Jahr</span></div>
              <p className="text-sm text-gray-500 mb-6">Passiv-Mitgliedschaft inkl. KMU Finanzierung</p>
              <Button 
                onClick={handleGetStarted}
                className="w-full bg-swiss-red hover:bg-swiss-red/90"
              >
                Jetzt Mitglied werden
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Collapsible
            open={isVideoOpen}
            onOpenChange={setIsVideoOpen}
            className="w-full"
          >
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between bg-swiss-darkblue text-white px-6 py-4 rounded-lg hover:bg-swiss-darkblue/90 transition-colors cursor-pointer">
                <span className="text-lg font-semibold">Jetzt Video schauen</span>
                {isVideoOpen ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe 
                  className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                  src="https://www.youtube.com/embed/EEFMXwSKnX0?si=1qHHWSFIRC6Tq2G-" 
                  title="YouTube video player" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                ></iframe>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>

      <div ref={benefitsRef}>
        <EnhancedBenefitsGrid />
      </div>
      <div className="bg-swiss-darkblue py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Werden Sie jetzt Mitglied
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Registrieren Sie sich noch heute und profitieren Sie von allen Vorteilen einer SKV-Mitgliedschaft.
          </p>
          <Button 
            onClick={handleGetStarted}
            className="bg-swiss-red hover:bg-swiss-red/90 text-white px-8 py-6 text-lg"
          >
            Jetzt Mitglied werden
          </Button>
        </div>
      </div>
      {showRegistration && (
        <div ref={registrationFormRef}>
          <RegistrationForm />
        </div>
      )}
      <Testimonials />
    </div>
  );
};

export default Membership;
