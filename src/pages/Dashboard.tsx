import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import AIChat from "@/components/AIChat";
import FinancingSimulator from "@/components/FinancingSimulator";
import { ProfileSection } from "@/components/dashboard/ProfileSection";
import { ServicesSection } from "@/components/dashboard/ServicesSection";
import { BenefitsMenu } from "@/components/dashboard/BenefitsMenu";
import { InvoicesSection } from "@/components/dashboard/InvoicesSection";
import { Tables } from "@/integrations/supabase/types";
import { Skeleton } from "@/components/ui/skeleton";

type Profile = Tables<"profiles">;
type Service = Tables<"services">;

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [claimedServices, setClaimedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching session...");
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.log("No session found, redirecting to auth");
          navigate("/auth");
          return;
        }

        console.log("Fetching profile data...");
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profileError) {
          console.error("Profile fetch error:", profileError);
          throw profileError;
        }

        console.log("Profile data:", profileData);
        setProfile(profileData);

        console.log("Fetching services...");
        const { data: servicesData, error: servicesError } = await supabase
          .from("services")
          .select("*");

        if (servicesError) {
          console.error("Services fetch error:", servicesError);
          throw servicesError;
        }

        console.log("Services data:", servicesData);
        setServices(servicesData || []);

        console.log("Fetching claimed services...");
        const { data: claimedServicesData, error: claimedError } = await supabase
          .from("profile_services")
          .select("service_id")
          .eq("profile_id", session.user.id);

        if (claimedError) {
          console.error("Claimed services fetch error:", claimedError);
          throw claimedError;
        }

        if (claimedServicesData && servicesData) {
          const claimedServiceIds = claimedServicesData.map(cs => cs.service_id);
          const claimedServicesList = servicesData.filter(service => 
            claimedServiceIds.includes(service.id)
          );
          console.log("Claimed services:", claimedServicesList);
          setClaimedServices(claimedServicesList);
        }
      } catch (error) {
        console.error("Dashboard error:", error);
        setError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
        toast({
          title: "Fehler",
          description: "Daten konnten nicht geladen werden",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, toast]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-xl text-red-600">{error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 mt-20">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="bg-white rounded-lg shadow p-6">
              <Skeleton className="h-8 w-1/3 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <Skeleton className="h-8 w-1/4 mb-4" />
              <div className="space-y-4">
                <Skeleton className="h-20" />
                <Skeleton className="h-20" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 mt-20">
        <div className="max-w-7xl mx-auto space-y-8">
          <ProfileSection 
            profile={profile} 
            setProfile={setProfile}
          />
          
          <BenefitsMenu
            services={services}
            claimedServices={claimedServices}
            onClaimService={async (serviceId) => {
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
                  description: "Service konnte nicht aktiviert werden",
                  variant: "destructive",
                });
                return;
              }

              const updatedClaimedServices = services.filter(
                (service) =>
                  service.id === serviceId ||
                  claimedServices.some((cs) => cs.id === service.id)
              );
              setClaimedServices(updatedClaimedServices);

              toast({
                title: "Erfolg",
                description: "Service wurde erfolgreich aktiviert",
              });
            }}
          />

          <InvoicesSection profile={profile} />

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