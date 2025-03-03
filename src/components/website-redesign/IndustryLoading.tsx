
import React from 'react';
import { Loader2 } from 'lucide-react';

export const IndustryLoading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-swiss-red mx-auto" />
        <h2 className="text-2xl font-semibold text-swiss-darkblue">
          Lade branchenspezifische Informationen...
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Wir bereiten alle relevanten Informationen und Lösungen für Ihre Branche vor.
        </p>
      </div>
    </div>
  );
};
