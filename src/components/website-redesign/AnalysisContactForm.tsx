
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@formspree/react";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface AnalysisContactFormProps {
  companyName?: string;
  email?: string;
  phone?: string;
  websiteUrl?: string;
}

export const AnalysisContactForm = ({
  companyName = "",
  email = "",
  phone = "",
  websiteUrl = "",
}: AnalysisContactFormProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formState, handleSubmit] = useForm("xldgyydd"); // Using existing Formspree form ID
  const [formData, setFormData] = useState({
    companyName: companyName || "",
    contactPerson: "",
    email: email || "",
    phone: phone || "",
    message: "",
    websiteUrl: websiteUrl || "",
    preferredTime: "vormittag",
    newsletter: false,
    privacyAccepted: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const nextStep = () => {
    // Basic validation for step 1
    if (step === 1) {
      if (!formData.companyName || !formData.contactPerson) {
        toast({
          title: "Bitte füllen Sie alle Pflichtfelder aus",
          description: "Firmenname und Ansprechpartner sind erforderlich",
          variant: "destructive",
        });
        return;
      }
    }
    
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 2) {
      if (!formData.email) {
        toast({
          title: "Bitte geben Sie Ihre E-Mail-Adresse ein",
          description: "Die E-Mail-Adresse ist erforderlich",
          variant: "destructive",
        });
        return;
      }
      
      if (!formData.privacyAccepted) {
        toast({
          title: "Bitte akzeptieren Sie die Datenschutzerklärung",
          description: "Sie müssen die Datenschutzerklärung akzeptieren, um fortzufahren",
          variant: "destructive",
        });
        return;
      }

      try {
        // Submit form data to Formspree
        await handleSubmit({
          "Firmenname": formData.companyName,
          "Ansprechpartner": formData.contactPerson,
          "E-Mail": formData.email,
          "Telefon": formData.phone,
          "Nachricht": formData.message,
          "Website URL": formData.websiteUrl,
          "Bevorzugte Kontaktzeit": formData.preferredTime,
          "Newsletter": formData.newsletter ? "Ja" : "Nein",
          "Website-Analyse": "Ja",
        });
        
        if (formState.errors) {
          console.error('Formspree submission errors:', formState.errors);
          toast({
            title: "Fehler beim Senden",
            description: "Bitte versuchen Sie es später erneut",
            variant: "destructive",
          });
          return;
        }
        
        toast({
          title: "Anfrage erfolgreich gesendet",
          description: "Wir werden uns in Kürze bei Ihnen melden",
        });
        
        setStep(3); // Move to success step
      } catch (error) {
        console.error('Form submission error:', error);
        toast({
          title: "Fehler beim Senden",
          description: "Bitte versuchen Sie es später erneut",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-swiss-darkblue mb-8 text-center">
        {step === 3 
          ? "Vielen Dank für Ihre Anfrage!" 
          : "Beratungsgespräch vereinbaren"}
      </h2>

      {step < 3 && (
        <div className="mb-8">
          <Progress value={step * 50} className="h-2" />
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span className={step >= 1 ? "font-medium text-swiss-red" : ""}>
              Unternehmensdaten
            </span>
            <span className={step >= 2 ? "font-medium text-swiss-red" : ""}>
              Kontaktdaten
            </span>
          </div>
        </div>
      )}

      {step === 1 && (
        <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-4">
          <div className="space-y-4">
            <FormItem>
              <FormLabel>Firmenname *</FormLabel>
              <FormControl>
                <Input
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  placeholder="Ihre Firma GmbH"
                />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel>Ansprechpartner *</FormLabel>
              <FormControl>
                <Input
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  required
                  placeholder="Vor- und Nachname"
                />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel>Website URL</FormLabel>
              <FormControl>
                <Input
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleChange}
                  placeholder="https://ihre-website.ch"
                  type="url"
                />
              </FormControl>
              <FormDescription>Die URL der analysierten Website</FormDescription>
            </FormItem>
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full bg-swiss-red hover:bg-swiss-red/90"
            >
              Weiter
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormItem>
              <FormLabel>E-Mail-Adresse *</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="ihre-email@beispiel.ch"
                />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel>Telefon</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+41 XX XXX XX XX"
                />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel>Bevorzugte Kontaktzeit</FormLabel>
              <select
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="vormittag">Vormittag</option>
                <option value="nachmittag">Nachmittag</option>
                <option value="abend">Abend</option>
              </select>
            </FormItem>

            <FormItem>
              <FormLabel>Nachricht</FormLabel>
              <FormControl>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Ihre Nachricht an uns (optional)"
                  rows={4}
                />
              </FormControl>
            </FormItem>

            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange("newsletter", checked as boolean)
                  }
                />
                <label
                  htmlFor="newsletter"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Ich möchte den Newsletter erhalten (optional)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="privacy"
                  checked={formData.privacyAccepted}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange("privacyAccepted", checked as boolean)
                  }
                  required
                />
                <label
                  htmlFor="privacy"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Ich akzeptiere die Datenschutzerklärung *
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={prevStep}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück
            </Button>
            <Button 
              type="submit" 
              className="bg-swiss-red hover:bg-swiss-red/90"
              disabled={formState.submitting}
            >
              {formState.submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Wird gesendet...
                </>
              ) : (
                <>
                  Anfrage senden
                </>
              )}
            </Button>
          </div>
        </form>
      )}

      {step === 3 && (
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          
          <h3 className="text-xl font-medium text-gray-900">
            Ihre Anfrage wurde erfolgreich übermittelt!
          </h3>
          
          <p className="text-gray-600">
            Vielen Dank für Ihr Interesse. Unser Team wird sich in Kürze mit Ihnen in Verbindung setzen.
          </p>
          
          <div className="pt-4">
            <Button 
              className="bg-swiss-red hover:bg-swiss-red/90"
              onClick={() => {
                // Reset form for a new consultation
                setFormData({
                  companyName: "",
                  contactPerson: "",
                  email: "",
                  phone: "",
                  message: "",
                  websiteUrl: "",
                  preferredTime: "vormittag",
                  newsletter: false,
                  privacyAccepted: false,
                });
                setStep(1);
              }}
            >
              Neue Anfrage stellen
            </Button>
          </div>
        </div>
      )}

      <div className="text-center text-xs text-gray-500 mt-6">
        Alle mit * markierten Felder sind Pflichtfelder
      </div>
    </div>
  );
};
