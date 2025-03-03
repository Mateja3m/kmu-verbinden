
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { BookingIndicator } from './BookingIndicator';
import { ArrowRight, Check, Send } from 'lucide-react';

interface IndustryContactFormProps {
  industry: string;
  industrySlug: string;
}

export const IndustryContactForm = ({
  industry,
  industrySlug
}: IndustryContactFormProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
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
    if (step === 1 && !formData.companyName) {
      toast({
        title: "Bitte geben Sie Ihren Praxisnamen ein",
        variant: "destructive"
      });
      return;
    }
    
    if (step === 2 && (!formData.contactPerson || !formData.email)) {
      toast({
        title: "Bitte füllen Sie alle Pflichtfelder aus",
        variant: "destructive"
      });
      return;
    }
    
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

  return (
    <div id="contact-form" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-swiss-darkblue mb-4">
              Jetzt unverbindliche und kostenlose Beratung einholen
            </h2>
            <p className="text-gray-600">
              Erfahren Sie, wie wir Ihren Online-Auftritt optimieren können. Füllen Sie das Formular aus, und wir melden uns innerhalb von 24 Stunden bei Ihnen.
            </p>
          </div>
          
          <BookingIndicator />
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex justify-between mb-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${step >= i ? 'bg-swiss-red text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {step > i ? <Check className="h-5 w-5" /> : i}
                  </div>
                  <div className="text-xs mt-2 text-center">
                    {i === 1 ? 'Praxisdaten' : i === 2 ? 'Kontaktdaten' : 'Nachricht'}
                  </div>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Praxisname <span className="text-red-500">*</span></label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="z.B. Zahnärzte am Marktplatz"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Adresse <span className="text-red-500">*</span></label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Straße, PLZ, Ort"
                      required
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      type="button" 
                      onClick={nextStep}
                      className="w-full bg-swiss-red hover:bg-swiss-red/90 text-white"
                    >
                      Weiter <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-1">Ansprechpartner <span className="text-red-500">*</span></label>
                    <Input
                      id="contactPerson"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      placeholder="Vor- und Nachname"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-Mail <span className="text-red-500">*</span></label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="beispiel@domain.ch"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+41 XX XXX XX XX"
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
                      type="button" 
                      onClick={nextStep}
                      className="bg-swiss-red hover:bg-swiss-red/90 text-white"
                    >
                      Weiter <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Nachricht (optional)</label>
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
                      disabled={submitting}
                      className="bg-swiss-red hover:bg-swiss-red/90 text-white"
                    >
                      {submitting ? "Wird gesendet..." : "Beratung anfordern"} <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
