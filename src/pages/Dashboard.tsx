import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Tables } from "@/integrations/supabase/types";
import { useToast } from "@/components/ui/use-toast";
import AIChat from "@/components/AIChat";
import FinancingSimulator from "@/components/FinancingSimulator";
import { ProfileSection } from "@/components/dashboard/ProfileSection";
import { ServicesSection } from "@/components/dashboard/ServicesSection";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Tables<"profiles"> | null>(null);
  const [services, setServices] = useState<Tables<"services">[]>([]);
  const [claimedServices, setClaimedServices] = useState<Tables<"services">[]>([]);
  const [loading, setLoading] = useState(true);

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
          <ProfileSection profile={profile} setProfile={setProfile} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FinancingSimulator />
            <AIChat />
          </div>

          <ServicesSection 
            profile={profile}
            services={services}
            claimedServices={claimedServices}
            setClaimedServices={setClaimedServices}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;