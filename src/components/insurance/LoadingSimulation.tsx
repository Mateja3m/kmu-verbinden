import React from 'react';
import { Check, Loader2 } from "lucide-react";

interface LoadingSimulationProps {
  loadingSteps: {
    connecting: boolean;
    analyzing: boolean;
    preparing: boolean;
    ready: boolean;
  };
}

const LoadingSimulation = ({ loadingSteps }: LoadingSimulationProps) => {
  return (
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
  );
};

export default LoadingSimulation;