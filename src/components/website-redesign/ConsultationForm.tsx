import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronRight } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  step: number;
  platform: string;
  challenges: string;
  companyName: string;
  industry: string;
  employeeCount: string;
  monthlyVisitors: string;
  contactPerson: string;
  email: string;
  phone: string;
  preferredTime: string;
  newsletter: boolean;
  privacyAccepted: boolean;
  improvements: string[];
  websiteUrl: string;
}

interface ConsultationFormProps {
  formData: FormData;
  onFormChange: (updates: Partial<FormData>) => void;
  onPrevStep: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ConsultationForm = ({
  formData,
  onFormChange,
  onPrevStep,
  onSubmit,
}: ConsultationFormProps) => {
  // const [formspreeState, handleFormspreeSubmit] = useForm("xldgyydd");
  // Newly updated Formspree ID
  const [formspreeState, handleFormspreeSubmit] = useForm("myzwpker");

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.step === 2) {
      // On final step, submit to Formspree
      const formspreeData = {
        companyName: formData.companyName,
        industry: formData.industry,
        employeeCount: formData.employeeCount,
        contactPerson: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        preferredTime: formData.preferredTime,
        newsletter: formData.newsletter,
        improvements: formData.improvements,
        websiteUrl: formData.websiteUrl,
      };

      try {
        await handleFormspreeSubmit(formspreeData);

        if (formspreeState.errors) {
          toast({
            title: "Fehler beim Senden",
            description:
              "Bitte überprüfen Sie Ihre Eingaben und versuchen Sie es erneut.",
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Erfolgreich gesendet",
          description: "Wir werden uns in Kürze bei Ihnen melden.",
        });
        onSubmit(e);
      } catch (error) {
        toast({
          title: "Fehler beim Senden",
          description: "Bitte versuchen Sie es später erneut.",
          variant: "destructive",
        });
      }
    } else {
      onSubmit(e);
    }
  };

  return (
    <div className="space-y-8">
      <div className="mb-12">
        <Progress value={formData.step * 50} className="h-3 bg-white/20" />
        <div className="flex justify-between mt-4 text-lg font-medium">
          <span
            className={formData.step >= 1 ? "text-swiss-red" : "text-white/60"}
          >
            Unternehmen
          </span>
          <span
            className={formData.step >= 2 ? "text-swiss-red" : "text-white/60"}
          >
            Kontakt
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {formData.step === 1 && (
          <div className="space-y-6">
            <Input
              placeholder="Firmenname"
              name="companyName"
              value={formData.companyName}
              onChange={(e) => onFormChange({ companyName: e.target.value })}
              className="bg-white border-2 border-white/20 h-14 text-gray-900 text-lg placeholder:text-gray-500"
              required
            />
            <ValidationError
              prefix="Company Name"
              field="companyName"
              errors={formspreeState.errors}
            />

            <Select
              onValueChange={(value) => onFormChange({ industry: value })}
            >
              <SelectTrigger className="bg-white border-2 border-white/20 h-14 text-gray-900 text-lg">
                <SelectValue placeholder="Branche" />
              </SelectTrigger>
              <SelectContent className="bg-white text-gray-900">
                <SelectItem value="handel">Handel</SelectItem>
                <SelectItem value="dienstleistung">Dienstleistung</SelectItem>
                <SelectItem value="handwerk">Handwerk</SelectItem>
                <SelectItem value="other">Andere</SelectItem>
              </SelectContent>
            </Select>
            <ValidationError
              prefix="Industry"
              field="industry"
              errors={formspreeState.errors}
            />

            <Input
              placeholder="Anzahl Mitarbeiter (optional)"
              name="employeeCount"
              value={formData.employeeCount}
              onChange={(e) => onFormChange({ employeeCount: e.target.value })}
              className="bg-white border-2 border-white/20 h-14 text-gray-900 text-lg placeholder:text-gray-500"
            />
          </div>
        )}

        {formData.step === 2 && (
          <div className="space-y-6">
            <Input
              placeholder="Ansprechpartner"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={(e) => onFormChange({ contactPerson: e.target.value })}
              className="bg-white border-2 border-white/20 h-14 text-gray-900 text-lg placeholder:text-gray-500"
              required
            />
            <ValidationError
              prefix="Contact Person"
              field="contactPerson"
              errors={formspreeState.errors}
            />

            <Input
              type="email"
              placeholder="E-Mail"
              name="email"
              value={formData.email}
              onChange={(e) => onFormChange({ email: e.target.value })}
              className="bg-white border-2 border-white/20 h-14 text-gray-900 text-lg placeholder:text-gray-500"
              required
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={formspreeState.errors}
            />

            <Input
              type="tel"
              placeholder="Telefon (optional)"
              name="phone"
              value={formData.phone}
              onChange={(e) => onFormChange({ phone: e.target.value })}
              className="bg-white border-2 border-white/20 h-14 text-gray-900 text-lg placeholder:text-gray-500"
            />

            <Select
              onValueChange={(value) => onFormChange({ preferredTime: value })}
            >
              <SelectTrigger className="bg-white border-2 border-white/20 h-14 text-gray-900 text-lg">
                <SelectValue placeholder="Bevorzugte Kontaktzeit" />
              </SelectTrigger>
              <SelectContent className="bg-white text-gray-900">
                <SelectItem value="morning">Vormittag</SelectItem>
                <SelectItem value="afternoon">Nachmittag</SelectItem>
                <SelectItem value="evening">Abend</SelectItem>
              </SelectContent>
            </Select>

            <div className="space-y-4 mt-8">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="newsletter"
                  name="newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) =>
                    onFormChange({ newsletter: checked as boolean })
                  }
                  className="border-2 border-white/20 data-[state=checked]:bg-swiss-red"
                />
                <label htmlFor="newsletter" className="text-lg text-white/80">
                  Newsletter abonnieren (optional)
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="privacy"
                  name="privacy"
                  required
                  checked={formData.privacyAccepted}
                  onCheckedChange={(checked) =>
                    onFormChange({ privacyAccepted: checked as boolean })
                  }
                  className="border-2 border-white/20 data-[state=checked]:bg-swiss-red"
                />
                <label htmlFor="privacy" className="text-lg text-white/80">
                  Ich akzeptiere die Datenschutzerklärung
                </label>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-8">
          {formData.step > 1 && (
            <Button
              type="button"
              onClick={onPrevStep}
              variant="outline"
              className="h-14 px-8 bg-transparent border-2 border-white hover:bg-white/10 text-white text-lg"
            >
              Zurück
            </Button>
          )}
          <Button
            type="submit"
            disabled={formspreeState.submitting}
            className={`h-14 px-8 bg-swiss-red hover:bg-swiss-red/90 text-white shine-effect text-lg ${
              formData.step === 1 ? "ml-auto" : ""
            }`}
          >
            {formData.step === 2
              ? "Kostenloses Beratungsgespräch vereinbaren"
              : "Weiter"}
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </form>

      <div className="text-center text-white/80 text-sm">
        Unverbindliche Erstberatung • 100% Kostenlos • Keine versteckten Kosten
      </div>
    </div>
  );
};
