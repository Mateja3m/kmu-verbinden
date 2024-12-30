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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AIChat from "@/components/AIChat";
import FinancingSimulator from "@/components/FinancingSimulator";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Tables<"profiles"> | null>(null);
  const [services, setServices] = useState<Tables<"services">[]>([]);
  const [claimedServices, setClaimedServices] = useState<Tables<"services">[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<Tables<"profiles">>>({});

  useEffect(() => {
    checkAuth();
  }, [navigate, toast]);

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
    setEditedProfile(profileData);

    // Fetch services data
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

  const handleSaveProfile = async () => {
    if (!profile?.id) return;

    const { error } = await supabase
      .from("profiles")
      .update(editedProfile)
      .eq("id", profile.id);

    if (error) {
      toast({
        title: "Fehler",
        description: "Profil konnte nicht aktualisiert werden",
        variant: "destructive",
      });
      return;
    }

    setProfile(prev => ({ ...prev, ...editedProfile }));
    setIsEditing(false);
    toast({
      title: "Erfolg",
      description: "Profil wurde erfolgreich aktualisiert",
    });
  };

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
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-swiss-darkblue">
                Unternehmensprofil
              </h2>
              <Button
                onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                variant={isEditing ? "default" : "outline"}
              >
                {isEditing ? "Speichern" : "Bearbeiten"}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Firmenname", key: "company_name" },
                { label: "Kontaktperson", key: "contact_person" },
                { label: "Adresse", key: "address" },
                { label: "PLZ", key: "postal_code" },
                { label: "Ort", key: "city" },
                { label: "Telefon", key: "phone" },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    {label}
                  </label>
                  {isEditing ? (
                    <Input
                      value={editedProfile[key as keyof typeof editedProfile] || ""}
                      onChange={(e) => setEditedProfile(prev => ({
                        ...prev,
                        [key]: e.target.value
                      }))}
                      className="w-full"
                    />
                  ) : (
                    <div className="text-swiss-darkblue">
                      {profile?.[key as keyof typeof profile] || "-"}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FinancingSimulator />
            <AIChat />
          </div>

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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;