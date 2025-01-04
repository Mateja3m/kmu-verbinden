import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import BackgroundPattern from '@/components/BackgroundPattern';

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
    <BackgroundPattern>
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-swiss-darkblue mb-4">
            KMU-Versicherungsrechner
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Optimieren Sie Ihre Versicherungslösungen mit unserem KI-gestützten Prämienrechner
          </p>
        </div>

        {/* Insurance Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {insuranceTypes.map((insurance, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-swiss-darkblue mb-2">
                {insurance.title}
              </h3>
              <p className="text-gray-600">
                {insurance.description}
              </p>
            </div>
          ))}
        </div>

        {/* AI Tool Explanation */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-2xl font-bold text-swiss-darkblue mb-6">
            Unser KI-Prämienrechner
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Wie funktioniert es?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-swiss-red rounded-full p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span>Analysiert Ihr Unternehmensprofil mit modernster KI-Technologie</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-swiss-red rounded-full p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span>Vergleicht Angebote führender Versicherungsanbieter</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-swiss-red rounded-full p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span>Erstellt massgeschneiderte Versicherungslösungen</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Ihre Vorteile</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-swiss-red rounded-full p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span>Zeitersparnis durch automatisierte Analyse</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-swiss-red rounded-full p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span>Optimierte Prämien durch KI-gestützten Vergleich</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-swiss-red rounded-full p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span>Bedarfsgerechte Versicherungslösungen</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Calculator Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-swiss-darkblue mb-6 text-center">
            Premium-Rechner
          </h2>
          
          {isLoading ? (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Loader2 className={`h-5 w-5 ${loadingSteps.connecting ? 'animate-spin text-swiss-red' : 'text-gray-300'}`} />
                <span className={loadingSteps.connecting ? 'text-swiss-darkblue' : 'text-gray-400'}>
                  Verbindung zum KI-System wird hergestellt...
                </span>
                {loadingSteps.connecting && <Check className="h-5 w-5 text-green-500" />}
              </div>
              
              <div className="flex items-center gap-3">
                <Loader2 className={`h-5 w-5 ${loadingSteps.analyzing ? 'animate-spin text-swiss-red' : 'text-gray-300'}`} />
                <span className={loadingSteps.analyzing ? 'text-swiss-darkblue' : 'text-gray-400'}>
                  Analyse-Module werden initialisiert...
                </span>
                {loadingSteps.analyzing && <Check className="h-5 w-5 text-green-500" />}
              </div>
              
              <div className="flex items-center gap-3">
                <Loader2 className={`h-5 w-5 ${loadingSteps.preparing ? 'animate-spin text-swiss-red' : 'text-gray-300'}`} />
                <span className={loadingSteps.preparing ? 'text-swiss-darkblue' : 'text-gray-400'}>
                  Prämienrechner wird vorbereitet...
                </span>
                {loadingSteps.preparing && <Check className="h-5 w-5 text-green-500" />}
              </div>
              
              <div className="flex items-center gap-3">
                <Loader2 className={`h-5 w-5 ${loadingSteps.ready ? 'animate-spin text-swiss-red' : 'text-gray-300'}`} />
                <span className={loadingSteps.ready ? 'text-swiss-darkblue' : 'text-gray-400'}>
                  System ist bereit...
                </span>
                {loadingSteps.ready && <Check className="h-5 w-5 text-green-500" />}
              </div>
            </div>
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
      </div>
    </BackgroundPattern>
  );
};

export default VersicherungsRechner;