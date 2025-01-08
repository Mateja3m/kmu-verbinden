import { Input } from "@/components/ui/input";

interface ContactDetailsStepProps {
  formData: {
    email: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ContactDetailsStep = ({ formData, onChange }: ContactDetailsStepProps) => {
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
    </div>
  );
};