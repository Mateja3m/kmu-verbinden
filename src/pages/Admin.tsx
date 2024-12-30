import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MembersSection } from "@/components/admin/MembersSection";
import { PartnersSection } from "@/components/admin/PartnersSection";
import { NewsSection } from "@/components/admin/NewsSection";
import { ExpertsSection } from "@/components/admin/ExpertsSection";
import { supabase } from "@/integrations/supabase/client";

export default function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();

      if (!profile?.is_admin) {
        navigate('/');
      }
    };

    checkAdmin();
  }, [navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <Tabs defaultValue="members" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="members">Mitglieder</TabsTrigger>
          <TabsTrigger value="partners">Partner</TabsTrigger>
          <TabsTrigger value="experts">Expertenrat</TabsTrigger>
          <TabsTrigger value="news">KMU News</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <MembersSection />
        </TabsContent>

        <TabsContent value="partners" className="space-y-4">
          <PartnersSection />
        </TabsContent>

        <TabsContent value="experts" className="space-y-4">
          <ExpertsSection />
        </TabsContent>

        <TabsContent value="news" className="space-y-4">
          <NewsSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}