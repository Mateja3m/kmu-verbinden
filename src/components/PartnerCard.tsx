import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface Partner {
  id: string;
  name: string;
  logo: string;
  website: string;
  description: string;
  customBackground?: string;
  requiresRedBackground?: boolean;
}

interface PartnerCardProps {
  partner: Partner;
}

export const PartnerCard = ({ partner }: PartnerCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getLogoBackgroundClass = () => {
    if (partner.requiresRedBackground) return 'bg-swiss-red';
    if (partner.customBackground) return partner.customBackground;
    return 'bg-white';
  };

  return (
    <>
      <Card 
        className="h-full cursor-pointer transition-transform hover:scale-105 bg-white border shadow-sm"
        onClick={() => setIsOpen(true)}
      >
        <CardHeader className="space-y-4">
          <div className={`flex items-center justify-center h-32 p-4 ${getLogoBackgroundClass()}`}>
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

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-4">{partner.name}</DialogTitle>
          </DialogHeader>
          <div className={`flex items-center justify-center h-40 p-4 mb-4 rounded-lg ${getLogoBackgroundClass()}`}>
            <img
              src={partner.logo}
              alt={`${partner.name} logo`}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <DialogDescription className="text-base mb-6">
            {partner.description}
          </DialogDescription>
          <div className="flex justify-end">
            <Button asChild>
              <a 
                href={partner.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Website besuchen
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};