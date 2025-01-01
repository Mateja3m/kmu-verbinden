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
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-lg p-8 border border-gray-100">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 space-y-6">
          {/* Profile Image */}
          <div className="aspect-square relative overflow-hidden rounded-xl bg-gray-100 shadow-md ring-1 ring-gray-200">
            <img
              src={formData.image_url || "/placeholder.svg"}
              alt={formData.contact_person}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </div>
          {/* Company Logo */}
          <div className="h-24 relative overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-200 p-4">
            <img
              src={formData.logo_url || "/placeholder.svg"}
              alt={formData.company_name}
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold text-swiss-darkblue mb-2 font-sans">
            {formData.company_name || "Ihr Firmenname"}
          </h1>
          <h2 className="text-xl text-gray-600 mb-6 font-sans">
            {formData.contact_person || "Ihr Name"}
          </h2>
          
          <div className="bg-luxury-gradient text-white px-6 py-3 rounded-lg inline-block mb-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            {formData.expertise_area || "Ihr Fachgebiet"}
          </div>

          <p className="text-gray-600 mb-8 whitespace-pre-wrap leading-relaxed">
            {formData.description || "Ihre Beschreibung"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-swiss-darkblue">
                  Dienstleistungen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {(formData.services || ["Ihre Dienstleistungen"]).map((service, index) => (
                    <li key={index} className="flex items-center text-gray-600 hover:text-swiss-darkblue transition-colors">
                      <span className="mr-2">•</span>
                      {service}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-swiss-darkblue">
                  Kontakt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {(formData.address || formData.city) && (
                  <div className="flex items-center gap-3 text-gray-600 hover:text-swiss-darkblue transition-colors group">
                    <MapPin className="h-5 w-5 text-swiss-red group-hover:scale-110 transition-transform" />
                    <span>{[formData.address, formData.postal_code, formData.city].filter(Boolean).join(", ")}</span>
                  </div>
                )}
                {formData.phone && (
                  <div className="flex items-center gap-3 text-gray-600 hover:text-swiss-darkblue transition-colors group">
                    <Phone className="h-5 w-5 text-swiss-red group-hover:scale-110 transition-transform" />
                    <span>{formData.phone}</span>
                  </div>
                )}
                {formData.email && (
                  <div className="flex items-center gap-3 text-gray-600 hover:text-swiss-darkblue transition-colors group">
                    <Mail className="h-5 w-5 text-swiss-red group-hover:scale-110 transition-transform" />
                    <span>{formData.email}</span>
                  </div>
                )}
                {formData.website && (
                  <div className="flex items-center gap-3 text-gray-600 hover:text-swiss-darkblue transition-colors group">
                    <Globe className="h-5 w-5 text-swiss-red group-hover:scale-110 transition-transform" />
                    <span>{formData.website}</span>
                  </div>
                )}
                {formData.linkedin && (
                  <div className="flex items-center gap-3 text-gray-600 hover:text-swiss-darkblue transition-colors group">
                    <LinkedinIcon className="h-5 w-5 text-swiss-red group-hover:scale-110 transition-transform" />
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