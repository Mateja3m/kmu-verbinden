import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import BackgroundPattern from '@/components/BackgroundPattern';
import InsuranceTypeGrid from '@/components/insurance/InsuranceTypeGrid';
import AIExplanation from '@/components/insurance/AIExplanation';
import LoadingSimulation from '@/components/insurance/LoadingSimulation';
import Footer from '@/components/Footer';

const VersicherungsRechner = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingSteps, setLoadingSteps] = useState({
    connecting: false,
    analyzing: false,
    preparing: false,
    ready: false
  });

  useEffect(() => {
    const simulateLoading = async () => {
      setLoadingSteps(prev => ({ ...prev, connecting: true }));
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setLoadingSteps(prev => ({ ...prev, analyzing: true }));
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setLoadingSteps(prev => ({ ...prev, preparing: true }));
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setLoadingSteps(prev => ({ ...prev, ready: true }));
      setIsLoading(false);
    };

    simulateLoading();
  }, []);

  const insuranceTypes = [
    {
      title: "Betriebshaftpflichtversicherung",
      description: "Schützt Ihr Unternehmen vor Schadenersatzansprüchen Dritter"
    },
    {
      title: "Gebäudeversicherung",
      description: "Absicherung von Geschäftsgebäuden gegen Elementarschäden"
    },
    {
      title: "Krankentaggeldversicherung",
      description: "Lohnfortzahlung bei krankheitsbedingten Ausfällen"
    },
    {
      title: "Unfallversicherung",
      description: "Obligatorische und freiwillige Unfallversicherung für Mitarbeitende"
    },
    {
      title: "Sachversicherung",
      description: "Schutz von Geschäftsinventar und Waren"
    },
    {
      title: "Cyberversicherung",
      description: "Absicherung gegen digitale Risiken und Datenverlust"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <BackgroundPattern>
        <div className="container mx-auto px-4 py-24">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-swiss-darkblue mb-4">
              Versicherungs Rechner & KI Beratung
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Optimieren Sie Ihre Versicherungslösungen mit unserem KI-gestützten Prämienrechner
            </p>
          </div>

          {/* Calculator Section with Loading Simulation */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-16">
            <h2 className="text-2xl font-bold text-swiss-darkblue mb-6 text-center">
              Premium-Rechner
            </h2>
            
            {isLoading ? (
              <LoadingSimulation loadingSteps={loadingSteps} />
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-swiss-red hover:bg-red-700 text-white">
                    Premium-Rechner starten
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[85vw] h-[85vh] max-w-none">
                  <iframe 
                    className="chatBot w-full h-full"
                    src="https://avaia.io/chat/authorize-chat/84bf5794-983e-4d57-8377-1ad6aaddd4d2/"
                    title="KMU Versicherungsrechner"
                  />
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Insurance Types Grid */}
          <div className="mb-16">
            <InsuranceTypeGrid insuranceTypes={insuranceTypes} />
          </div>

          {/* AI Tool Explanation */}
          <AIExplanation />
        </div>
      </BackgroundPattern>
      <Footer />
    </div>
  );
};

export default VersicherungsRechner;