import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Presidency from './pages/Presidency';
import Membership from './pages/Membership';
import Partners from './pages/Partners';
import Experts from './pages/Experts';
import ExpertDetail from './pages/ExpertDetail';
import ExpertSubmission from './pages/ExpertSubmission';
import Presse from './pages/Presse';
import NewsDetail from './pages/NewsDetail';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import AdminAuth from './pages/AdminAuth';
import PartnerDashboard from './pages/PartnerDashboard';
import PartnerMeetings from './pages/PartnerMeetings';
import Auth from './pages/Auth';
import Kontakt from './pages/Kontakt';
import Redaktion from './pages/Redaktion';
import Rechtsdienst from './pages/Rechtsdienst';
import AktuelleProjekte from './pages/AktuelleProjekte';
import UnsereAuftrag from './pages/UnsereAuftrag';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import Geschaeftsstelle from './pages/Geschaeftsstelle';
import EventKalender from './pages/EventKalender';
import VersicherungsRechner from './pages/VersicherungsRechner';
import Empfehlen from './pages/Empfehlen';
import Organisation from './pages/Organisation';
import Praxisratgeber from './pages/Praxisratgeber';
import Branchenmagazine from './pages/Branchenmagazine';
import WebsiteRedesign from './pages/WebsiteRedesign';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("[App] Session error:", sessionError);
          return;
        }

        if (!session?.user) {
          setIsLoggedIn(false);
          setIsAdmin(false);
          return;
        }

        setIsLoggedIn(true);
        
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', session.user.id)
          .maybeSingle();

        if (profileError) {
          console.error("[App] Profile fetch error:", profileError);
          return;
        }

        setIsAdmin(!!profile?.is_admin);
      } catch (error) {
        console.error("[App] Auth initialization error:", error);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("[App] Auth state changed:", event);
      
      if (event === 'SIGNED_IN' && session?.user) {
        setIsLoggedIn(true);
        try {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', session.user.id)
            .maybeSingle();

          if (profileError) {
            console.error("[App] Profile fetch error:", profileError);
            return;
          }

          setIsAdmin(!!profile?.is_admin);
        } catch (error) {
          console.error("[App] Error handling auth change:", error);
        }
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navigation />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/presidency" element={<Presidency />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/experts" element={<Experts />} />
          <Route path="/experts/:id" element={<ExpertDetail />} />
          <Route path="/expert-submission" element={<ExpertSubmission />} />
          <Route path="/news" element={<Presse />} />
          <Route path="/news/:slug" element={<NewsDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/auth" element={<AdminAuth />} />
          <Route path="/partner-dashboard" element={<PartnerDashboard />} />
          <Route path="/partner-meetings" element={<PartnerMeetings />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/redaktion" element={<Redaktion />} />
          <Route path="/rechtsdienst" element={<Rechtsdienst />} />
          <Route path="/aktuelle-projekte" element={<AktuelleProjekte />} />
          <Route path="/unsere-auftrag" element={<UnsereAuftrag />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/geschaeftsstelle" element={<Geschaeftsstelle />} />
          <Route path="/events" element={<EventKalender />} />
          <Route path="/versicherungsrechner" element={<VersicherungsRechner />} />
          <Route path="/empfehlen" element={<Empfehlen />} />
          <Route path="/organisation" element={<Organisation />} />
          <Route path="/news/praxisratgeber" element={<Praxisratgeber />} />
          <Route path="/news/branchenmagazine" element={<Branchenmagazine />} />
          <Route path="/website-redesign" element={<WebsiteRedesign />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;