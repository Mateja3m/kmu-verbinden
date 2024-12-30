import { Button } from "@/components/ui/button";
import { Tables } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Service = Tables<"services">;

export const ServicesSection = ({
  profile,
  services,
  claimedServices,
  setClaimedServices,
}: {
  profile: Tables<"profiles"> | null;
  services: Service[];
  claimedServices: Service[];
  setClaimedServices: (services: Service[]) => void;
}) => {
  const { toast } = useToast();

  const handleClaimService = async (serviceId: string) => {
    if (!profile) return;

    const { error } = await supabase
      .from("profile_services")
      .insert({
        profile_id: profile.id,
        service_id: serviceId,
      });

    if (error) {
      toast({
        title: "Fehler",
        description: "Service konnte nicht hinzugefügt werden",
        variant: "destructive",
      });
      return;
    }

    const updatedClaimedServices = [...services].filter(service => 
      service.id === serviceId || claimedServices.some(cs => cs.id === service.id)
    );
    setClaimedServices(updatedClaimedServices);

    toast({
      title: "Erfolg",
      description: "Service wurde erfolgreich hinzugefügt",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-swiss-darkblue mb-6">
        Verfügbare Services
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>Beschreibung</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell className="font-medium">{service.name}</TableCell>
              <TableCell>{service.description}</TableCell>
              <TableCell>
                {claimedServices.some(cs => cs.id === service.id) ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Aktiviert
                  </span>
                ) : (
                  <Button
                    onClick={() => handleClaimService(service.id)}
                    variant="outline"
                    size="sm"
                    className="text-swiss-red hover:text-swiss-darkblue transition-colors"
                  >
                    Aktivieren
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};