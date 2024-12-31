import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Globe, Building2 } from "lucide-react";

interface ExpertContactProps {
  contactPerson?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  phone?: string;
  email?: string;
  website?: string;
}

export function ExpertContact({
  contactPerson,
  address,
  postalCode,
  city,
  phone,
  email,
  website,
}: ExpertContactProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kontaktinformationen</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {contactPerson && (
          <div className="flex items-center gap-2 text-gray-600">
            <Building2 className="h-5 w-5" />
            <span>{contactPerson}</span>
          </div>
        )}
        {(address || postalCode || city) && (
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-5 w-5" />
            <div>
              {address && <div>{address}</div>}
              {(postalCode || city) && (
                <div>{postalCode} {city}</div>
              )}
            </div>
          </div>
        )}
        {phone && (
          <div className="flex items-center gap-2 text-gray-600">
            <Phone className="h-5 w-5" />
            <a href={`tel:${phone}`} className="hover:text-primary">
              {phone}
            </a>
          </div>
        )}
        {email && (
          <div className="flex items-center gap-2 text-gray-600">
            <Mail className="h-5 w-5" />
            <a href={`mailto:${email}`} className="hover:text-primary">
              {email}
            </a>
          </div>
        )}
        {website && (
          <div className="flex items-center gap-2 text-gray-600">
            <Globe className="h-5 w-5" />
            <a 
              href={website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              Website besuchen
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}