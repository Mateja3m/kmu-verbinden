
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface FormData {
  companyName: string;
  address: string;
  contactPerson: string;
  email: string;
  phone: string;
  message: string;
}

interface UseIndustryContactFormProps {
  industrySlug: string;
}

export const useIndustryContactForm = ({ industrySlug }: UseIndustryContactFormProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    address: '',
    contactPerson: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };
  
  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.companyName || !formData.contactPerson || !formData.email) {
      toast({
        title: "Bitte füllen Sie alle Pflichtfelder aus",
        variant: "destructive"
      });
      return;
    }
    
    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('industry_inquiries')
        .insert([
          {
            company_name: formData.companyName,
            contact_person: formData.contactPerson,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            industry: industrySlug
          }
        ]);

      if (error) throw error;

      toast({
        title: "Anfrage erfolgreich gesendet",
        description: "Wir werden uns so schnell wie möglich bei Ihnen melden."
      });
      
      // Reset form after successful submission
      setFormData({
        companyName: '',
        address: '',
        contactPerson: '',
        email: '',
        phone: '',
        message: ''
      });
      setStep(1);
      
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast({
        title: "Fehler beim Senden der Anfrage",
        description: "Bitte versuchen Sie es später erneut.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return {
    step,
    formData,
    submitting,
    handleChange,
    nextStep,
    prevStep,
    handleSubmit
  };
};
