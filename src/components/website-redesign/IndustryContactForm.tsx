
import React from 'react';
import { FormStep1 } from './industry-contact/FormStep1';
import { FormStep2 } from './industry-contact/FormStep2';
import { FormStep3 } from './industry-contact/FormStep3';
import { FormStepIndicator } from './industry-contact/FormStepIndicator';
import { IndustryContactFormHeader } from './industry-contact/IndustryContactFormHeader';
import { useIndustryContactForm } from './industry-contact/useIndustryContactForm';
import { ArrowDown } from 'lucide-react';

interface IndustryContactFormProps {
  industry: string;
  industrySlug: string;
}

export const IndustryContactForm = ({
  industry,
  industrySlug
}: IndustryContactFormProps) => {
  const { 
    step, 
    formData, 
    submitting,
    handleChange, 
    nextStep, 
    prevStep, 
    handleSubmit 
  } = useIndustryContactForm({ industrySlug });

  return (
    <div id="contact-form" className="py-16 bg-white relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -right-64 -top-64 w-96 h-96 rounded-full bg-swiss-red"></div>
        <div className="absolute -left-64 -bottom-64 w-96 h-96 rounded-full bg-swiss-darkblue"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        {/* Highlighted arrow pointing to the form */}
        <div className="hidden lg:block absolute -top-16 right-1/4 transform translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center">
            <div className="text-swiss-red font-medium px-3 py-1 bg-swiss-red/10 rounded-full mb-2">
              Jetzt beraten lassen
            </div>
            <ArrowDown className="h-8 w-8 text-swiss-red" />
          </div>
        </div>
        
        <IndustryContactFormHeader industry={industry} />
        
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mt-8">
          <div className="p-6 md:p-8">
            <FormStepIndicator currentStep={step} />
            
            <form onSubmit={handleSubmit} className="mt-6">
              {step === 1 && (
                <FormStep1 
                  formData={formData}
                  onChange={handleChange}
                  onNext={nextStep}
                />
              )}
              
              {step === 2 && (
                <FormStep2
                  formData={formData}
                  onChange={handleChange}
                  onPrev={prevStep}
                  onNext={nextStep}
                />
              )}
              
              {step === 3 && (
                <FormStep3
                  formData={formData}
                  submitting={submitting}
                  onChange={handleChange}
                  onPrev={prevStep}
                  onSubmit={handleSubmit}
                />
              )}
            </form>
          </div>
        </div>
        
        {/* Limited spots indicator */}
        <div className="mt-6 text-center">
          <span className="inline-block px-4 py-2 bg-yellow-50 text-yellow-800 rounded-full text-sm font-medium">
            🔥 Nur noch wenige Beratungstermine in diesem Monat verfügbar!
          </span>
        </div>
      </div>
    </div>
  );
};
