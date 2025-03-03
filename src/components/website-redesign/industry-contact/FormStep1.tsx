import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormStep1Props {
  formData: {
    companyName: string;
    address: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onNext: () => void;
}

export const FormStep1 = ({ formData, onChange, onNext }: FormStep1Props) => {
  const { toast } = useToast();
  
  const validateAndProceed = () => {
    if (!formData.companyName) {
      toast({
        title: "Bitte geben Sie Ihren Praxisnamen ein",
        variant: "destructive"
      });
      return;
    }
    
    onNext();
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
          Praxisname <span className="text-red-500">*</span>
        </label>
        <Input
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={onChange}
          placeholder="z.B. Zahnärzte am Marktplatz"
          required
        />
      </div>
      
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Adresse <span className="text-red-500">*</span>
        </label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={onChange}
          placeholder="Straße, PLZ, Ort"
          required
        />
      </div>
      
      <div className="pt-4">
        <Button 
          type="button" 
          onClick={validateAndProceed}
          className="w-full bg-swiss-red hover:bg-swiss-red/90 text-white"
        >
          Weiter <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
