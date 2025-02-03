import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { StatutenModal } from "@/components/StatutenModal";

interface ContactDetailsStepProps {
  formData: {
    email: string;
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
      <Input 
        type="email"
        placeholder="E-Mail-Adresse" 
        name="email"
        value={formData.email}
        onChange={onChange}
        className="w-full" 
      />
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="statutes"
          checked={formData.statutesAccepted}
          onCheckedChange={(checked) => onCheckboxChange?.(checked as boolean)}
          className="border-swiss-red data-[state=checked]:bg-swiss-red"
        />
        <label 
          htmlFor="statutes" 
          className="text-sm text-gray-600 cursor-pointer flex items-center gap-1"
        >
          Hiermit akzeptiere ich die Statuten des Schweizerischen KMU Vereins (SKV) <StatutenModal />
        </label>
      </div>
    </div>
  );
};