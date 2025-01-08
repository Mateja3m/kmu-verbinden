import { Input } from "@/components/ui/input";

interface CompanyDetailsStepProps {
  formData: {
    companyName: string;
    contactPerson: string;
    address: string;
    postalCode: string;
    city: string;
    phone: string;
    website: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CompanyDetailsStep = ({ formData, onChange }: CompanyDetailsStepProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-swiss-darkblue mb-6">Unternehmensdaten</h3>
      <Input 
        placeholder="Firmenname" 
        name="companyName"
        value={formData.companyName}
        onChange={onChange}
        className="w-full" 
      />
      <Input 
        placeholder="Name der verantwortlichen Person" 
        name="contactPerson"
        value={formData.contactPerson}
        onChange={onChange}
        className="w-full" 
      />
      <Input 
        placeholder="Straße und Hausnummer" 
        name="address"
        value={formData.address}
        onChange={onChange}
        className="w-full" 
      />
      <div className="grid grid-cols-2 gap-4">
        <Input 
          placeholder="PLZ" 
          name="postalCode"
          value={formData.postalCode}
          onChange={onChange}
        />
        <Input 
          placeholder="Ort" 
          name="city"
          value={formData.city}
          onChange={onChange}
        />
      </div>
      <Input 
        placeholder="Telefon" 
        name="phone"
        value={formData.phone}
        onChange={onChange}
        className="w-full" 
      />
      <Input 
        placeholder="Website" 
        name="website"
        value={formData.website}
        onChange={onChange}
        className="w-full" 
      />
    </div>
  );
};