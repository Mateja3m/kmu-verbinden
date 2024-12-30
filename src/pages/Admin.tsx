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

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Current session:", session); // Debug log

        if (!session?.user) {
          console.log("No session, redirecting to auth"); // Debug log
          navigate('/auth');
          return;
        }

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', session.user.id)
          .maybeSingle();

        console.log("Profile data:", profile, "Error:", error); // Debug log

        if (error) {
          console.error("Error fetching profile:", error);
          toast({
            title: "Fehler",
            description: "Fehler beim Laden des Profils.",
            variant: "destructive",
          });
          navigate('/');
          return;
        }

        if (!profile?.is_admin) {
          console.log("Not an admin, redirecting"); // Debug log
          toast({
            title: "Zugriff verweigert",
            description: "Sie haben keine Administratorrechte.",
            variant: "destructive",
          });
          navigate('/');
          return;
        }

        setIsAdmin(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Error in checkAdmin:", error);
        toast({
          title: "Fehler",
          description: "Ein unerwarteter Fehler ist aufgetreten.",
          variant: "destructive",
        });
        navigate('/');
      }
    };

    checkAdmin();
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-swiss-red mx-auto mb-4" />
            <p className="text-lg text-gray-600">Lade Admin-Bereich...</p>
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