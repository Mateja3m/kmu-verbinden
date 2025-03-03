
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface FormStep3Props {
  formData: {
    message: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  prevStep: () => void;
  isSubmitting: boolean;
}

export const FormStep3 = ({ formData, handleChange, prevStep, isSubmitting }: FormStep3Props) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Nachricht (optional)
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Wie können wir Ihnen helfen?"
          rows={4}
        />
      </div>
      
      <div className="flex justify-between pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={prevStep}
        >
          Zurück
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-swiss-red hover:bg-swiss-red/90 text-white"
        >
          {isSubmitting ? "Wird gesendet..." : "Beratung anfordern"} <Send className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
