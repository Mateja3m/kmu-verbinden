import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type Service = Tables<"services">;

export const BenefitsMenu = ({
  services,
  claimedServices,
  onClaimService,
}: {
  services: Service[];
  claimedServices: Service[];
  onClaimService: (serviceId: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h3 className="text-xl font-semibold text-swiss-darkblue">Ihre Vorteile</h3>
          <ChevronDown
            className={`h-5 w-5 transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-3">
          {services.map((service) => {
            const isClaimed = claimedServices.some((cs) => cs.id === service.id);
            return (
              <div
                key={service.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-swiss-darkblue">
                    {service.name}
                  </h4>
                  {service.description && (
                    <p className="text-sm text-gray-600">{service.description}</p>
                  )}
                </div>
                {isClaimed ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Aktiviert
                  </span>
                ) : (
                  <Button
                    onClick={() => onClaimService(service.id)}
                    variant="outline"
                    size="sm"
                    className="text-swiss-red hover:text-swiss-darkblue transition-colors"
                  >
                    Aktivieren
                  </Button>
                )}
              </div>
            );
          })}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};