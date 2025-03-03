
import React from 'react';
import { BookingIndicator } from './BookingIndicator';
import { IndustryContactFormHeader } from './industry-contact/IndustryContactFormHeader';
import { FormStepIndicator } from './industry-contact/FormStepIndicator';
import { FormStep1 } from './industry-contact/FormStep1';
import { FormStep2 } from './industry-contact/FormStep2';
import { FormStep3 } from './industry-contact/FormStep3';
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
        <div className="max-w-2xl mx-auto">
          <IndustryContactFormHeader />
          
          <BookingIndicator />
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <FormStepIndicator currentStep={step} />
            
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <FormStep1 
                  formData={formData} 
                  handleChange={handleChange} 
                  nextStep={nextStep} 
                />
              )}
              
              {step === 2 && (
                <FormStep2 
                  formData={formData} 
                  handleChange={handleChange} 
                  nextStep={nextStep} 
                  prevStep={prevStep} 
                />
              )}
              
              {step === 3 && (
                <FormStep3 
                  formData={formData} 
                  handleChange={handleChange} 
                  prevStep={prevStep} 
                  isSubmitting={submitting} 
                />
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
