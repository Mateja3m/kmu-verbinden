import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { Tables } from "@/integrations/supabase/types";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

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
        console.log("Dashboard - Fetching session...");
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.log("Dashboard - No session found, redirecting to auth");
          navigate("/auth");
          return;
        }

        console.log("Dashboard - Fetching profile data...");
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profileError) {
          console.error("Dashboard - Profile fetch error:", profileError);
          throw profileError;
        }

        console.log("Dashboard - Profile data:", profileData);
        setProfile(profileData);

        console.log("Dashboard - Fetching services...");
        const { data: servicesData, error: servicesError } = await supabase
          .from("services")
          .select("*");

        if (servicesError) {
          console.error("Dashboard - Services fetch error:", servicesError);
          throw servicesError;
        }

        console.log("Dashboard - Services data:", servicesData);
        setServices(servicesData || []);

        console.log("Dashboard - Fetching claimed services...");
        const { data: claimedServicesData, error: claimedError } = await supabase
          .from("profile_services")
          .select("service_id")
          .eq("profile_id", session.user.id);

        if (claimedError) {
          console.error("Dashboard - Claimed services fetch error:", claimedError);
          throw claimedError;
        }

        if (claimedServicesData && servicesData) {
          const claimedServiceIds = claimedServicesData.map(cs => cs.service_id);
          const claimedServicesList = servicesData.filter(service => 
            claimedServiceIds.includes(service.id)
          );
          console.log("Dashboard - Claimed services:", claimedServicesList);
          setClaimedServices(claimedServicesList);
        }
      } catch (error) {
        console.error("Dashboard - Error:", error);
        setError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
        toast({
          title: "Fehler",
          description: "Daten konnten nicht geladen werden",
          variant: "destructive",
        });
      } finally {
        console.log("Dashboard - Setting loading to false");
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 mt-20">
        {loading ? (
          <DashboardSkeleton />
        ) : (
          <DashboardContent
            profile={profile}
            services={services}
            claimedServices={claimedServices}
            setProfile={setProfile}
            setClaimedServices={setClaimedServices}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;