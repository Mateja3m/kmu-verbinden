import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormStep2Props {
  formData: {
    contactPerson: string;
    email: string;
    phone: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const FormStep2 = ({ formData, onChange, onNext, onPrev }: FormStep2Props) => {
  const { toast } = useToast();
  
  const validateAndProceed = () => {
    if (!formData.contactPerson || !formData.email) {
      toast({
        title: "Bitte füllen Sie alle Pflichtfelder aus",
        variant: "destructive"
      });
      return;
    }
    
    onNext();
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-1">
          Ansprechpartner <span className="text-red-500">*</span>
        </label>
        <Input
          id="contactPerson"
          name="contactPerson"
          value={formData.contactPerson}
          onChange={onChange}
          placeholder="Vor- und Nachname"
          required
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          E-Mail <span className="text-red-500">*</span>
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          placeholder="beispiel@domain.ch"
          required
        />
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Telefon
        </label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={onChange}
          placeholder="+41 XX XXX XX XX"
        />
      </div>
      
      <div className="flex justify-between pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onPrev}
        >
          Zurück
        </Button>
        <Button 
          type="button" 
          onClick={validateAndProceed}
          className="bg-swiss-red hover:bg-swiss-red/90 text-white"
        >
          Weiter <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
