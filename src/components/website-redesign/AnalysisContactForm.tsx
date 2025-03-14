
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm as useFormspree } from "@formspree/react";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
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

type FormData = {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  message: string;
  websiteUrl: string;
  preferredTime: "vormittag" | "nachmittag" | "abend";
  newsletter: boolean;
  privacyAccepted: boolean;
}

export const AnalysisContactForm = ({
  companyName = "",
  email = "",
  phone = "",
  websiteUrl = "",
}: AnalysisContactFormProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formspreeState, handleFormspreeSubmit] = useFormspree("xldgyydd"); // Using existing Formspree form ID
  
  // Initialize react-hook-form
  const form = useForm<FormData>({
    defaultValues: {
      companyName: companyName || "",
      contactPerson: "",
      email: email || "",
      phone: phone || "",
      message: "",
      websiteUrl: websiteUrl || "",
      preferredTime: "vormittag",
      newsletter: false,
      privacyAccepted: false,
    }
  });

  const nextStep = () => {
    // Basic validation for step 1
    if (step === 1) {
      const { companyName, contactPerson } = form.getValues();
      if (!companyName || !contactPerson) {
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

  const onSubmit = async (formData: FormData) => {
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
        await handleFormspreeSubmit({
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
        
        if (formspreeState.errors) {
          console.error('Formspree submission errors:', formspreeState.errors);
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
        <Form {...form}>
          <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firmenname *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        required
                        placeholder="Ihre Firma GmbH"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactPerson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ansprechpartner *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        required
                        placeholder="Vor- und Nachname"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="websiteUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://ihre-website.ch"
                        type="url"
                      />
                    </FormControl>
                    <FormDescription>Die URL der analysierten Website</FormDescription>
                  </FormItem>
                )}
              />
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
        </Form>
      )}

      {step === 2 && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-Mail-Adresse *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        required
                        placeholder="ihre-email@beispiel.ch"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefon</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        {...field}
                        placeholder="+41 XX XXX XX XX"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferredTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bevorzugte Kontaktzeit</FormLabel>
                    <select
                      {...field}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="vormittag">Vormittag</option>
                      <option value="nachmittag">Nachmittag</option>
                      <option value="abend">Abend</option>
                    </select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nachricht</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Ihre Nachricht an uns (optional)"
                        rows={4}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="space-y-2 pt-2">
                <FormField
                  control={form.control}
                  name="newsletter"
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <label
                        htmlFor="newsletter"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Ich möchte den Newsletter erhalten (optional)
                      </label>
                    </div>
                  )}
                />

                <FormField
                  control={form.control}
                  name="privacyAccepted"
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="privacy"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        required
                      />
                      <label
                        htmlFor="privacy"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Ich akzeptiere die Datenschutzerklärung *
                      </label>
                    </div>
                  )}
                />
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
                disabled={formspreeState.submitting}
              >
                {formspreeState.submitting ? (
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
        </Form>
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
                form.reset({
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
