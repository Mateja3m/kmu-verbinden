import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkedinIcon, MapPin, Phone, Mail, Globe } from "lucide-react";

interface ExpertPreviewProps {
  formData: {
    expertise_area?: string;
    description?: string;
    company_name?: string;
    email?: string;
    phone?: string;
    website?: string;
    address?: string;
    postal_code?: string;
    city?: string;
    linkedin?: string;
    services?: string[];
    contact_person?: string;
    image_url?: string;
    logo_url?: string;
  };
}

export function ExpertPreview({ formData }: ExpertPreviewProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3 space-y-4">
          {/* Profile Image */}
          <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
            <img
              src={formData.image_url || "/placeholder.svg"}
              alt={formData.contact_person}
              className="object-cover w-full h-full"
            />
          </div>
          {/* Company Logo */}
          <div className="h-24 relative overflow-hidden rounded-lg bg-gray-100">
            <img
              src={formData.logo_url || "/placeholder.svg"}
              alt={formData.company_name}
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold text-swiss-darkblue mb-2">
            {formData.company_name || "Ihr Firmenname"}
          </h1>
          <h2 className="text-xl text-gray-600 mb-4">
            {formData.contact_person || "Ihr Name"}
          </h2>
          
          <div className="bg-luxury-gradient text-white px-4 py-2 rounded-md inline-block mb-4">
            {formData.expertise_area || "Ihr Fachgebiet"}
          </div>

          <p className="text-gray-600 mb-6 whitespace-pre-wrap">
            {formData.description || "Ihre Beschreibung"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dienstleistungen</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside">
                  {(formData.services || ["Ihre Dienstleistungen"]).map((service, index) => (
                    <li key={index} className="text-gray-600">{service}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kontakt</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {(formData.address || formData.city) && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{[formData.address, formData.postal_code, formData.city].filter(Boolean).join(", ")}</span>
                  </div>
                )}
                {formData.phone && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{formData.phone}</span>
                  </div>
                )}
                {formData.email && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{formData.email}</span>
                  </div>
                )}
                {formData.website && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Globe className="h-4 w-4" />
                    <span>{formData.website}</span>
                  </div>
                )}
                {formData.linkedin && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <LinkedinIcon className="h-4 w-4" />
                    <span>{formData.linkedin}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}