import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MembersSection } from "@/components/admin/MembersSection";
import { PartnersSection } from "@/components/admin/PartnersSection";
import { NewsSection } from "@/components/admin/NewsSection";
import { ExpertsSection } from "@/components/admin/ExpertsSection";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function Admin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Current session:", session);

        if (!session?.user) {
          console.log("No session found, redirecting to auth");
          navigate('/auth');
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', session.user.id)
          .maybeSingle();

        console.log("Profile data:", profile, "Profile error:", profileError);

        if (profileError) {
          console.error("Error fetching profile:", profileError);
          setError("Error loading profile data");
          toast({
            title: "Error",
            description: "Failed to load profile data",
            variant: "destructive",
          });
          return;
        }

        if (!profile?.is_admin) {
          console.log("User is not an admin, redirecting");
          toast({
            title: "Access Denied",
            description: "You do not have administrator privileges",
            variant: "destructive",
          });
          navigate('/');
          return;
        }

        console.log("Admin access granted");
        setIsAdmin(true);
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred");
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkAdmin();
  }, [navigate, toast]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center text-red-600">
            <p className="text-lg">{error}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-swiss-red mx-auto mb-4" />
            <p className="text-lg text-gray-600">Loading admin dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-24">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-swiss-darkblue mb-8">Admin Dashboard</h1>
          
          <Tabs defaultValue="members" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 gap-4">
              <TabsTrigger value="members" className="text-lg">Mitglieder</TabsTrigger>
              <TabsTrigger value="partners" className="text-lg">Partner</TabsTrigger>
              <TabsTrigger value="experts" className="text-lg">Expertenrat</TabsTrigger>
              <TabsTrigger value="news" className="text-lg">KMU News</TabsTrigger>
            </TabsList>

            <TabsContent value="members" className="bg-white p-6 rounded-lg shadow-lg">
              <MembersSection />
            </TabsContent>

            <TabsContent value="partners" className="bg-white p-6 rounded-lg shadow-lg">
              <PartnersSection />
            </TabsContent>

            <TabsContent value="experts" className="bg-white p-6 rounded-lg shadow-lg">
              <ExpertsSection />
            </TabsContent>

            <TabsContent value="news" className="bg-white p-6 rounded-lg shadow-lg">
              <NewsSection />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}