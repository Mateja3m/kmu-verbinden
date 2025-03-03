
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface IndustryContactFormProps {
  industry: string;
  industrySlug: string;
}

export const IndustryContactForm = ({
  industry,
  industrySlug
}: IndustryContactFormProps) => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    message: '',
    privacyAccepted: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.privacyAccepted) {
      toast({
        title: "Datenschutz-Bestätigung erforderlich",
        description: "Bitte akzeptieren Sie die Datenschutzbestimmungen.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Use a simple INSERT operation rather than referencing a specific table type
      const { error } = await supabase
        .from('industry_inquiries')
        .insert({
          company_name: formData.companyName,
          contact_person: formData.contactPerson,
          email: formData.email,
          phone: formData.phone,
          website: formData.website,
          message: formData.message,
          industry: industrySlug
        });
      
      if (error) throw error;
      
      toast({
        title: "Anfrage erfolgreich gesendet",
        description: "Wir werden uns in Kürze bei Ihnen melden.",
      });
      
      // Reset form
      setFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        website: '',
        message: '',
        privacyAccepted: false
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Fehler beim Senden",
        description: "Bitte versuchen Sie es später erneut oder kontaktieren Sie uns telefonisch.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact-form" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-swiss-darkblue mb-4">
              Kostenlose Beratung für Ihre {industry}-Website
            </h2>
            <p className="text-gray-600">
              Füllen Sie das Formular aus und erhalten Sie eine unverbindliche Einschätzung und Beratung von unseren Experten.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Firmenname *</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    placeholder="Ihre Firma"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Ansprechpartner *</Label>
                  <Input
                    id="contactPerson"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    required
                    placeholder="Vor- und Nachname"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="ihre-email@beispiel.ch"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Optional"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Aktuelle Website (falls vorhanden)</Label>
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://www.ihre-website.ch"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Ihre Nachricht</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Beschreiben Sie kurz Ihre Anforderungen oder Fragen"
                  rows={4}
                />
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="privacyAccepted"
                    name="privacyAccepted"
                    type="checkbox"
                    checked={formData.privacyAccepted}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-swiss-red focus:ring-swiss-red"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="privacyAccepted" className="text-gray-600">
                    Ich akzeptiere die <a href="/datenschutz" className="text-swiss-red hover:underline" target="_blank">Datenschutzbestimmungen</a> *
                  </label>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-swiss-red hover:bg-swiss-red/90 text-white font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Wird gesendet...</>
                ) : (
                  <>Anfrage senden <Send className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
