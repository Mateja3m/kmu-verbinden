import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Partner {
  id: string;
  name: string;
  logo: string;
  website: string;
  description: string;
  customBackground?: string;
}

interface PartnerCardProps {
  partner: Partner;
}

export const PartnerCard = ({ partner }: PartnerCardProps) => {
  return (
    <a 
      href={partner.website} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block transition-transform hover:scale-105"
    >
      <Card className="h-full">
        <CardHeader className="space-y-4">
          <div className={`flex items-center justify-center h-32 p-4 ${partner.customBackground || 'bg-white'}`}>
            <img
              src={partner.logo}
              alt={`${partner.name} logo`}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <CardTitle className="text-xl">{partner.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm text-muted-foreground">
            {partner.description}
          </CardDescription>
        </CardContent>
      </Card>
    </a>
  );
};