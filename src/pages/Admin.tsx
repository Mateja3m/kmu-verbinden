import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MembersSection } from "@/components/admin/MembersSection";
import { PartnersSection } from "@/components/admin/PartnersSection";
import { NewsSection } from "@/components/admin/NewsSection";
import { ExpertsSection } from "@/components/admin/ExpertsSection";
import { LeadsSection } from "@/components/admin/LeadsSection";
import { DashboardStats } from "@/components/admin/DashboardStats";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Users, UserCircle, GraduationCap, MessageSquare, BookOpen } from "lucide-react";

export default function Admin() {
  const { data: profile } = useQuery({
    queryKey: ['admin-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('contact_person')
        .eq('id', user.id)
        .single();
      
      return profile;
    }
  });

  const firstName = profile?.contact_person?.split(' ')[0] || 'Admin';

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4 mb-8">
            <h1 className="text-3xl font-bold text-swiss-darkblue">
              Willkommen {firstName}
            </h1>
            <p className="text-gray-600">
              Hier finden Sie eine Übersicht aller wichtigen Kennzahlen und Verwaltungsfunktionen.
            </p>
          </div>
          
          <DashboardStats />
          
          <Tabs defaultValue="members" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 gap-4 bg-white p-1 rounded-lg shadow-sm">
              <TabsTrigger 
                value="members" 
                className="data-[state=active]:bg-swiss-red data-[state=active]:text-white flex items-center gap-2 text-lg py-3"
              >
                <Users className="h-5 w-5" />
                Mitglieder
              </TabsTrigger>
              <TabsTrigger 
                value="partners" 
                className="data-[state=active]:bg-swiss-red data-[state=active]:text-white flex items-center gap-2 text-lg py-3"
              >
                <UserCircle className="h-5 w-5" />
                Partner
              </TabsTrigger>
              <TabsTrigger 
                value="experts" 
                className="data-[state=active]:bg-swiss-red data-[state=active]:text-white flex items-center gap-2 text-lg py-3"
              >
                <GraduationCap className="h-5 w-5" />
                Expertenrat
              </TabsTrigger>
              <TabsTrigger 
                value="leads" 
                className="data-[state=active]:bg-swiss-red data-[state=active]:text-white flex items-center gap-2 text-lg py-3"
              >
                <MessageSquare className="h-5 w-5" />
                Leads
              </TabsTrigger>
              <TabsTrigger 
                value="news" 
                className="data-[state=active]:bg-swiss-red data-[state=active]:text-white flex items-center gap-2 text-lg py-3"
              >
                <BookOpen className="h-5 w-5" />
                KMU News
              </TabsTrigger>
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

            <TabsContent value="leads" className="bg-white p-6 rounded-lg shadow-lg">
              <LeadsSection />
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