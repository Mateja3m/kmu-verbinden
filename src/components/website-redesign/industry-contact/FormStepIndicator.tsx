
import React from 'react';
import { Check } from 'lucide-react';

interface FormStepIndicatorProps {
  currentStep: number;
}

export const FormStepIndicator = ({ currentStep }: FormStepIndicatorProps) => {
  const steps = [
    { number: 1, label: 'Praxisdaten' },
    { number: 2, label: 'Kontaktdaten' },
    { number: 3, label: 'Nachricht' }
  ];

  return (
    <div className="flex justify-between mb-8">
      {steps.map(step => (
        <div key={step.number} className="flex flex-col items-center">
          <div 
            className={`h-10 w-10 rounded-full flex items-center justify-center ${
              currentStep >= step.number ? 'bg-swiss-red text-white' : 'bg-gray-200 text-gray-500'
            }`}
          >
            {currentStep > step.number ? <Check className="h-5 w-5" /> : step.number}
          </div>
          <div className="text-xs mt-2 text-center">
            {step.label}
          </div>
        </div>
      ))}
    </div>
  );
};
