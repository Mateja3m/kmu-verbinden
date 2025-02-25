
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronRight } from 'lucide-react';

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
  onSubmit
}: ConsultationFormProps) => {
  const renderStep = () => {
    if (formData.step === 1) {
      return (
        <div className="space-y-4">
          <Select onValueChange={(value) => onFormChange({ platform: value })}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Aktuelle Platform/CMS" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wordpress">WordPress</SelectItem>
              <SelectItem value="shopify">Shopify</SelectItem>
              <SelectItem value="wix">Wix</SelectItem>
              <SelectItem value="other">Andere</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Grösste Herausforderung"
            value={formData.challenges}
            onChange={(e) => onFormChange({ challenges: e.target.value })}
            className="bg-white"
          />
        </div>
      );
    }

    if (formData.step === 2) {
      return (
        <div className="space-y-4">
          <Input
            placeholder="Firmenname"
            value={formData.companyName}
            onChange={(e) => onFormChange({ companyName: e.target.value })}
            className="bg-white"
            required
          />
          <Select onValueChange={(value) => onFormChange({ industry: value })}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Branche" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="retail">Einzelhandel</SelectItem>
              <SelectItem value="service">Dienstleistung</SelectItem>
              <SelectItem value="manufacturing">Produktion</SelectItem>
              <SelectItem value="other">Andere</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Anzahl Mitarbeiter"
            value={formData.employeeCount}
            onChange={(e) => onFormChange({ employeeCount: e.target.value })}
            className="bg-white"
          />
          <Input
            placeholder="Monatliche Website Besucher"
            value={formData.monthlyVisitors}
            onChange={(e) => onFormChange({ monthlyVisitors: e.target.value })}
            className="bg-white"
          />
        </div>
      );
    }

    if (formData.step === 3) {
      return (
        <div className="space-y-4">
          <Input
            placeholder="Ansprechpartner"
            value={formData.contactPerson}
            onChange={(e) => onFormChange({ contactPerson: e.target.value })}
            className="bg-white"
            required
          />
          <Input
            type="email"
            placeholder="E-Mail"
            value={formData.email}
            onChange={(e) => onFormChange({ email: e.target.value })}
            className="bg-white"
            required
          />
          <Input
            type="tel"
            placeholder="Telefon (optional)"
            value={formData.phone}
            onChange={(e) => onFormChange({ phone: e.target.value })}
            className="bg-white"
          />
          <Select onValueChange={(value) => onFormChange({ preferredTime: value })}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Bevorzugte Kontaktzeit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Vormittag</SelectItem>
              <SelectItem value="afternoon">Nachmittag</SelectItem>
              <SelectItem value="evening">Abend</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="newsletter"
              checked={formData.newsletter}
              onCheckedChange={(checked) => 
                onFormChange({ newsletter: checked as boolean })
              }
            />
            <label
              htmlFor="newsletter"
              className="text-sm text-gray-300"
            >
              Newsletter abonnieren (optional)
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="privacy"
              required
              checked={formData.privacyAccepted}
              onCheckedChange={(checked) => 
                onFormChange({ privacyAccepted: checked as boolean })
              }
            />
            <label
              htmlFor="privacy"
              className="text-sm text-gray-300"
            >
              Ich akzeptiere die Datenschutzerklärung
            </label>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <Progress value={formData.step * 33.33} className="h-2" />
        <div className="flex justify-between mt-2 text-sm">
          <span className={formData.step >= 1 ? "text-swiss-red font-medium" : ""}>Website & Ziele</span>
          <span className={formData.step >= 2 ? "text-swiss-red font-medium" : ""}>Unternehmen</span>
          <span className={formData.step >= 3 ? "text-swiss-red font-medium" : ""}>Kontakt</span>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {renderStep()}

        <div className="flex justify-between pt-4">
          {formData.step > 1 && (
            <Button
              type="button"
              onClick={onPrevStep}
              variant="outline"
              className="bg-white text-swiss-darkblue"
            >
              Zurück
            </Button>
          )}
          <Button 
            type="submit"
            className="ml-auto bg-swiss-red hover:bg-swiss-red/90 text-white shine-effect"
          >
            {formData.step === 3 ? 'Analyse anfordern' : 'Weiter'}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};
