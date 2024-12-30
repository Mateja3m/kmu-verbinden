import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Tables } from "@/integrations/supabase/types";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Tables<"profiles"> | null>(null);
  const [services, setServices] = useState<Tables<"services">[]>([]);
  const [claimedServices, setClaimedServices] = useState<Tables<"services">[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      // Fetch profile data
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (profileError) {
        toast({
          title: "Fehler",
          description: "Profildaten konnten nicht geladen werden",
          variant: "destructive",
        });
        return;
      }

      setProfile(profileData);

      // Fetch all services
      const { data: servicesData } = await supabase
        .from("services")
        .select("*");

      setServices(servicesData || []);

      // Fetch claimed services
      const { data: claimedServicesData } = await supabase
        .from("profile_services")
        .select("service_id")
        .eq("profile_id", session.user.id);

      if (claimedServicesData && servicesData) {
        const claimedServiceIds = claimedServicesData.map(cs => cs.service_id);
        const claimedServicesList = servicesData.filter(service => 
          claimedServiceIds.includes(service.id)
        );
        setClaimedServices(claimedServicesList);
      }

      setLoading(false);
    };

    checkAuth();
  }, [navigate, toast]);

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

    // Refresh claimed services
    const updatedClaimedServices = [...services].filter(service => 
      service.id === serviceId || claimedServices.some(cs => cs.id === service.id)
    );
    setClaimedServices(updatedClaimedServices);

    toast({
      title: "Erfolg",
      description: "Service wurde erfolgreich hinzugefügt",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-xl">Laden...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-swiss-darkblue mb-8">
            Mein Profil
          </h1>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Unternehmensdaten</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Firmenname</label>
                <div className="mt-1">{profile?.company_name || "-"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Kontaktperson</label>
                <div className="mt-1">{profile?.contact_person || "-"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Adresse</label>
                <div className="mt-1">{profile?.address || "-"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">PLZ / Ort</label>
                <div className="mt-1">
                  {profile?.postal_code} {profile?.city}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Telefon</label>
                <div className="mt-1">{profile?.phone || "-"}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Meine Services</h2>
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
                        <button
                          onClick={() => handleClaimService(service.id)}
                          className="text-swiss-red hover:text-swiss-darkblue transition-colors"
                        >
                          Aktivieren
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;