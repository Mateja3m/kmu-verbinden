
import React from 'react';
import { Loader2 } from 'lucide-react';

export const IndustryLoading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-white to-swiss-gray/10">
      <div className="text-center space-y-6 max-w-xl mx-auto">
        <div className="relative">
          <Loader2 className="h-14 w-14 animate-spin text-swiss-red mx-auto" />
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="h-8 w-8 bg-white rounded-full"></div>
          </div>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-swiss-darkblue">
          Lade branchenspezifische Informationen...
        </h2>
        
        <p className="text-gray-600 max-w-md mx-auto">
          Wir bereiten alle relevanten Informationen und Lösungen für Ihre Branche vor. Dies dauert nur einen Moment.
        </p>
        
        <div className="flex flex-col items-center space-y-3 pt-4">
          <div className="w-full max-w-md h-2 bg-swiss-gray/20 rounded-full overflow-hidden">
            <div className="h-full bg-swiss-red rounded-full animate-pulse" style={{width: '60%'}}></div>
          </div>
          <p className="text-sm text-gray-500">Lädt Branchendaten...</p>
        </div>
      </div>
    </div>
  );
};
