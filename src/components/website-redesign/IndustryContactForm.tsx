
import React from 'react';
import { FormStep1 } from './industry-contact/FormStep1';
import { FormStep2 } from './industry-contact/FormStep2';
import { FormStep3 } from './industry-contact/FormStep3';
import { FormStepIndicator } from './industry-contact/FormStepIndicator';
import { IndustryContactFormHeader } from './industry-contact/IndustryContactFormHeader';
import { useIndustryContactForm } from './industry-contact/useIndustryContactForm';

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
    <div id="contact-form" className="py-16 bg-white">
      <div className="container mx-auto px-4">
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
      </div>
    </div>
  );
};
