import React from 'react';
import { Check, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface LoadingSimulationProps {
  loadingSteps: {
    connecting: boolean;
    analyzing: boolean;
    preparing: boolean;
    ready: boolean;
  };
}

const LoadingSimulation = ({ loadingSteps }: LoadingSimulationProps) => {
  // Calculate progress based on completed steps
  const completedSteps = Object.values(loadingSteps).filter(Boolean).length;
  const progress = (completedSteps / 4) * 100;

  return (
    <div className="space-y-6">
      <Progress value={progress} className="mb-8" />
      
      <div className="grid grid-cols-2 gap-x-12 gap-y-6">
        <div className="flex items-center gap-3">
          {loadingSteps.connecting ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : (
            <Loader2 className="h-5 w-5 animate-spin text-swiss-red" />
          )}
          <span className={loadingSteps.connecting ? 'text-swiss-darkblue' : 'text-gray-400'}>
            Verbindung zum KI-System wird hergestellt...
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          {loadingSteps.analyzing ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : (
            <Loader2 className="h-5 w-5 animate-spin text-swiss-red" />
          )}
          <span className={loadingSteps.analyzing ? 'text-swiss-darkblue' : 'text-gray-400'}>
            Analyse-Module werden initialisiert...
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          {loadingSteps.preparing ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : (
            <Loader2 className="h-5 w-5 animate-spin text-swiss-red" />
          )}
          <span className={loadingSteps.preparing ? 'text-swiss-darkblue' : 'text-gray-400'}>
            Prämienrechner wird vorbereitet...
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          {loadingSteps.ready ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : (
            <Loader2 className="h-5 w-5 animate-spin text-swiss-red" />
          )}
          <span className={loadingSteps.ready ? 'text-swiss-darkblue' : 'text-gray-400'}>
            System ist bereit...
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSimulation;