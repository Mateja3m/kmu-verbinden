
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MembersSection } from "@/components/admin/MembersSection";
import { PartnersSection } from "@/components/admin/PartnersSection";
import { NewsSection } from "@/components/admin/NewsSection";
import { ExpertsSection } from "@/components/admin/ExpertsSection";
import { LeadsSection } from "@/components/admin/LeadsSection";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { BlogPostsManager } from "@/components/admin/BlogPostsManager";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Users, UserCircle, GraduationCap, MessageSquare, BookOpen, FileText } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Admin() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("members");
  
  // Check for admin session
  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      navigate('/admin/auth');
      return;
    }
    
    try {
      const session = JSON.parse(adminSession);
      const timestamp = new Date(session.timestamp);
      const now = new Date();
      
      // Session expires after 24 hours
      if (now.getTime() - timestamp.getTime() > 24 * 60 * 60 * 1000) {
        localStorage.removeItem('adminSession');
        navigate('/admin/auth');
      }
    } catch (error) {
      localStorage.removeItem('adminSession');
      navigate('/admin/auth');
    }
  }, [navigate]);

  // Set active tab based on URL query parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [location]);

  const handleTabChange = (value: string) => {
    // Keep the edit parameter if it exists and we're staying on the news tab
    if (value === 'news' && activeTab === 'news') {
      const searchParams = new URLSearchParams(location.search);
      const editParam = searchParams.get('edit');
      if (editParam) {
        navigate(`/admin?tab=${value}&edit=${editParam}`);
        return;
      }
    }
    
    setActiveTab(value);
    navigate(`/admin?tab=${value}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Removed Navigation component since it's already in App.tsx */}
      <main className="flex-grow container mx-auto px-4 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-light text-swiss-darkblue">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Hier finden Sie eine Übersicht aller wichtigen Kennzahlen und Verwaltungsfunktionen.
              </p>
            </div>
            <Link to="/admin/auth">
              <Button variant="outline" onClick={() => localStorage.removeItem('adminSession')}>
                Abmelden
              </Button>
            </Link>
          </div>
          
          <DashboardStats />
          
          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 gap-4 bg-white p-1 rounded-t-lg border-b border-gray-100 relative">
              <TabsTrigger 
                value="members" 
                className="data-[state=active]:bg-gradient-to-br from-swiss-darkblue/5 to-swiss-darkblue/10 data-[state=active]:text-swiss-darkblue flex items-center gap-2 text-lg py-3 px-4 rounded-t-lg transition-all duration-200 hover:bg-gray-50"
              >
                <Users className="h-5 w-5" />
                Mitglieder
              </TabsTrigger>
              <TabsTrigger 
                value="partners" 
                className="data-[state=active]:bg-gradient-to-br from-swiss-darkblue/5 to-swiss-darkblue/10 data-[state=active]:text-swiss-darkblue flex items-center gap-2 text-lg py-3 px-4 rounded-t-lg transition-all duration-200 hover:bg-gray-50"
              >
                <UserCircle className="h-5 w-5" />
                Partner
              </TabsTrigger>
              <TabsTrigger 
                value="experts" 
                className="data-[state=active]:bg-gradient-to-br from-swiss-darkblue/5 to-swiss-darkblue/10 data-[state=active]:text-swiss-darkblue flex items-center gap-2 text-lg py-3 px-4 rounded-t-lg transition-all duration-200 hover:bg-gray-50"
              >
                <GraduationCap className="h-5 w-5" />
                Expertenrat
              </TabsTrigger>
              <TabsTrigger 
                value="leads" 
                className="data-[state=active]:bg-gradient-to-br from-swiss-darkblue/5 to-swiss-darkblue/10 data-[state=active]:text-swiss-darkblue flex items-center gap-2 text-lg py-3 px-4 rounded-t-lg transition-all duration-200 hover:bg-gray-50"
              >
                <MessageSquare className="h-5 w-5" />
                Leads
              </TabsTrigger>
              <TabsTrigger 
                value="news" 
                className="data-[state=active]:bg-gradient-to-br from-swiss-darkblue/5 to-swiss-darkblue/10 data-[state=active]:text-swiss-darkblue flex items-center gap-2 text-lg py-3 px-4 rounded-t-lg transition-all duration-200 hover:bg-gray-50"
              >
                <BookOpen className="h-5 w-5" />
                Neuer Beitrag
              </TabsTrigger>
              <TabsTrigger 
                value="blog-manager" 
                className="data-[state=active]:bg-gradient-to-br from-swiss-darkblue/5 to-swiss-darkblue/10 data-[state=active]:text-swiss-darkblue flex items-center gap-2 text-lg py-3 px-4 rounded-t-lg transition-all duration-200 hover:bg-gray-50"
              >
                <FileText className="h-5 w-5" />
                Beiträge Verwalten
              </TabsTrigger>
            </TabsList>

            <TabsContent value="members" className="bg-white p-6 rounded-b-lg shadow-sm border border-gray-100">
              <MembersSection />
            </TabsContent>

            <TabsContent value="partners" className="bg-white p-6 rounded-b-lg shadow-sm border border-gray-100">
              <PartnersSection />
            </TabsContent>

            <TabsContent value="experts" className="bg-white p-6 rounded-b-lg shadow-sm border border-gray-100">
              <ExpertsSection />
            </TabsContent>

            <TabsContent value="leads" className="bg-white p-6 rounded-b-lg shadow-sm border border-gray-100">
              <LeadsSection />
            </TabsContent>

            <TabsContent value="news" className="bg-white p-6 rounded-b-lg shadow-sm border border-gray-100">
              <NewsSection />
            </TabsContent>

            <TabsContent value="blog-manager" className="bg-white p-6 rounded-b-lg shadow-sm border border-gray-100">
              <BlogPostsManager />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      {/* No Footer here since it's already in App.tsx */}
    </div>
  );
}
