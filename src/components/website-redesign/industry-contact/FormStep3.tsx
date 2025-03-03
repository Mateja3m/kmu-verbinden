
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface FormStep3Props {
  formData: {
    message: string;
  };
  isSubmitting: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onPrev: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const FormStep3 = ({ formData, onChange, onPrev, isSubmitting, onSubmit }: FormStep3Props) => {
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
          onChange={onChange}
          placeholder="Wie können wir Ihnen helfen?"
          rows={4}
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
