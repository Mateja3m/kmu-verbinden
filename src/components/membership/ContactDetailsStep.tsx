
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { StatutenModal } from "@/components/StatutenModal";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

interface ContactDetailsStepProps {
  formData: {
    email: string;
    phone: string;
    statutesAccepted?: boolean;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckboxChange?: (checked: boolean) => void;
}

export const ContactDetailsStep = ({ 
  formData, 
  onChange,
  onCheckboxChange 
}: ContactDetailsStepProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-swiss-darkblue mb-6">Kontaktdaten</h3>
      
      <div className="space-y-2">
        <Label htmlFor="email">E-Mail-Adresse *</Label>
        <Input 
          id="email"
          type="email"
          placeholder="E-Mail-Adresse" 
          name="email"
          value={formData.email}
          onChange={onChange}
          className="w-full" 
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Telefonnummer *</Label>
        <Input 
          id="phone"
          type="tel"
          placeholder="Telefonnummer" 
          name="phone"
          value={formData.phone}
          onChange={onChange}
          className="w-full" 
          required
        />
      </div>
      
      <Alert className="bg-gray-50 border-swiss-red/40 mt-6">
        <InfoIcon className="h-4 w-4 text-swiss-red" />
        <AlertDescription className="text-sm text-gray-600">
          Bitte geben Sie eine gültige E-Mail-Adresse und Telefonnummer an, damit wir Sie kontaktieren können.
        </AlertDescription>
      </Alert>
      
      <div className="flex items-start space-x-2 mt-6">
        <Checkbox 
          id="statutes"
          checked={formData.statutesAccepted}
          onCheckedChange={(checked) => onCheckboxChange?.(checked as boolean)}
          className="border-swiss-red data-[state=checked]:bg-swiss-red mt-1"
        />
        <Label 
          htmlFor="statutes" 
          className="text-sm text-gray-600 cursor-pointer"
        >
          Hiermit akzeptiere ich die <StatutenModal className="text-swiss-red hover:underline inline font-medium" /> des Schweizerischen KMU Vereins (SKV)
        </Label>
      </div>
    </div>
  );
};
