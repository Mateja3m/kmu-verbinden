import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ExpertFormData } from "@/types/database/experts";

interface ExpertFormFieldsProps {
  register: UseFormRegister<ExpertFormData>;
  errors: FieldErrors<ExpertFormData>;
  services: string[];
  onServiceChange: (index: number, value: string) => void;
  onAddService: () => void;
  onRemoveService: (index: number) => void;
}

export const ExpertFormFields = ({
  register,
  errors,
  services,
  onServiceChange,
  onAddService,
  onRemoveService,
}: ExpertFormFieldsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="group transition-all duration-300 hover:scale-[1.02]">
            <Label htmlFor="contact_person" className="text-lg font-medium text-swiss-darkblue">Name *</Label>
            <Input
              id="contact_person"
              {...register("contact_person", { required: true })}
              className={`mt-2 transition-all duration-300 ${errors.contact_person ? "border-red-500 shake-animation" : "focus:ring-2 focus:ring-swiss-red"}`}
              placeholder="Ihr vollständiger Name"
            />
          </div>

          <div className="group transition-all duration-300 hover:scale-[1.02]">
            <Label htmlFor="company_name" className="text-lg font-medium text-swiss-darkblue">Firmenname *</Label>
            <Input
              id="company_name"
              {...register("company_name", { required: true })}
              className={`mt-2 transition-all duration-300 ${errors.company_name ? "border-red-500 shake-animation" : "focus:ring-2 focus:ring-swiss-red"}`}
              placeholder="Name Ihres Unternehmens"
            />
          </div>

          <div className="group transition-all duration-300 hover:scale-[1.02]">
            <Label htmlFor="expertise_area" className="text-lg font-medium text-swiss-darkblue">Fachgebiet *</Label>
            <Input
              id="expertise_area"
              {...register("expertise_area", { required: true })}
              className={`mt-2 transition-all duration-300 ${errors.expertise_area ? "border-red-500 shake-animation" : "focus:ring-2 focus:ring-swiss-red"}`}
              placeholder="z.B. Digitalisierung, Recht, Finanzen"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="group transition-all duration-300 hover:scale-[1.02]">
            <Label htmlFor="description" className="text-lg font-medium text-swiss-darkblue">Beschreibung *</Label>
            <Textarea
              id="description"
              {...register("description", { required: true })}
              className={`mt-2 min-h-[150px] transition-all duration-300 ${errors.description ? "border-red-500 shake-animation" : "focus:ring-2 focus:ring-swiss-red"}`}
              placeholder="Beschreiben Sie Ihre Expertise und Erfahrung"
            />
          </div>

          <div className="group transition-all duration-300 hover:scale-[1.02]">
            <Label className="text-lg font-medium text-swiss-darkblue">Dienstleistungen *</Label>
            {services.map((service, index) => (
              <div key={index} className="flex gap-2 mt-2 items-center">
                <Input
                  value={service}
                  onChange={(e) => onServiceChange(index, e.target.value)}
                  placeholder="z.B. Strategieberatung"
                  className="transition-all duration-300 focus:ring-2 focus:ring-swiss-red"
                />
                {services.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => onRemoveService(index)}
                    className="hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={onAddService}
              className="mt-2 w-full hover:bg-swiss-red/10 hover:text-swiss-red transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Dienstleistung hinzufügen
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="group transition-all duration-300 hover:scale-[1.02]">
          <Label htmlFor="email" className="text-lg font-medium text-swiss-darkblue">E-Mail *</Label>
          <Input
            id="email"
            type="email"
            {...register("email", { required: true })}
            className={`mt-2 transition-all duration-300 ${errors.email ? "border-red-500 shake-animation" : "focus:ring-2 focus:ring-swiss-red"}`}
            placeholder="ihre.email@beispiel.ch"
          />
        </div>

        <div className="group transition-all duration-300 hover:scale-[1.02]">
          <Label htmlFor="phone" className="text-lg font-medium text-swiss-darkblue">Telefon *</Label>
          <Input
            id="phone"
            {...register("phone", { required: true })}
            className={`mt-2 transition-all duration-300 ${errors.phone ? "border-red-500 shake-animation" : "focus:ring-2 focus:ring-swiss-red"}`}
            placeholder="+41 XX XXX XX XX"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="group transition-all duration-300 hover:scale-[1.02]">
          <Label htmlFor="website" className="text-lg font-medium text-swiss-darkblue">Website</Label>
          <Input
            id="website"
            {...register("website")}
            className="mt-2 transition-all duration-300 focus:ring-2 focus:ring-swiss-red"
            placeholder="www.ihre-website.ch"
          />
        </div>

        <div className="group transition-all duration-300 hover:scale-[1.02]">
          <Label htmlFor="linkedin" className="text-lg font-medium text-swiss-darkblue">LinkedIn Profil</Label>
          <Input
            id="linkedin"
            {...register("linkedin")}
            className="mt-2 transition-all duration-300 focus:ring-2 focus:ring-swiss-red"
            placeholder="linkedin.com/in/ihr-profil"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="group transition-all duration-300 hover:scale-[1.02]">
          <Label htmlFor="address" className="text-lg font-medium text-swiss-darkblue">Adresse *</Label>
          <Input
            id="address"
            {...register("address", { required: true })}
            className={`mt-2 transition-all duration-300 ${errors.address ? "border-red-500 shake-animation" : "focus:ring-2 focus:ring-swiss-red"}`}
            placeholder="Straße und Hausnummer"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="group transition-all duration-300 hover:scale-[1.02]">
            <Label htmlFor="postal_code" className="text-lg font-medium text-swiss-darkblue">PLZ *</Label>
            <Input
              id="postal_code"
              {...register("postal_code", { required: true })}
              className={`mt-2 transition-all duration-300 ${errors.postal_code ? "border-red-500 shake-animation" : "focus:ring-2 focus:ring-swiss-red"}`}
              placeholder="1234"
            />
          </div>

          <div className="group transition-all duration-300 hover:scale-[1.02]">
            <Label htmlFor="city" className="text-lg font-medium text-swiss-darkblue">Ort *</Label>
            <Input
              id="city"
              {...register("city", { required: true })}
              className={`mt-2 transition-all duration-300 ${errors.city ? "border-red-500 shake-animation" : "focus:ring-2 focus:ring-swiss-red"}`}
              placeholder="Ihre Stadt"
            />
          </div>
        </div>
      </div>
    </div>
  );
};