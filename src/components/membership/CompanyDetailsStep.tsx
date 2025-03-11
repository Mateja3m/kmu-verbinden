
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      
      <div className="space-y-2">
        <Label htmlFor="companyName">Firmenname *</Label>
        <Input 
          id="companyName"
          placeholder="Firmenname" 
          name="companyName"
          value={formData.companyName}
          onChange={onChange}
          className="w-full"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="contactPerson">Name der verantwortlichen Person *</Label>
        <Input 
          id="contactPerson"
          placeholder="Name der verantwortlichen Person" 
          name="contactPerson"
          value={formData.contactPerson}
          onChange={onChange}
          className="w-full"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">Straße und Hausnummer *</Label>
        <Input 
          id="address"
          placeholder="Straße und Hausnummer" 
          name="address"
          value={formData.address}
          onChange={onChange}
          className="w-full"
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="postalCode">PLZ *</Label>
          <Input 
            id="postalCode"
            placeholder="PLZ" 
            name="postalCode"
            value={formData.postalCode}
            onChange={onChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">Ort *</Label>
          <Input 
            id="city"
            placeholder="Ort" 
            name="city"
            value={formData.city}
            onChange={onChange}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input 
          id="website"
          placeholder="Website" 
          name="website"
          value={formData.website}
          onChange={onChange}
          className="w-full"
        />
      </div>
    </div>
  );
};
