import React from 'react';
import { Check } from "lucide-react";

const AIExplanation = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
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
  );
};

export default AIExplanation;