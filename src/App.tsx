import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
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

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(true);
  const { toast } = useToast();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("[App] Session error:", sessionError);
          if (isMounted.current) setIsLoading(false);
          return;
        }

        if (!session?.user) {
          if (isMounted.current) {
            setIsLoggedIn(false);
            setIsAdmin(false);
            setIsLoading(false);
          }
          return;
        }

        if (session.user && isMounted.current) {
          setIsLoggedIn(true);
          try {
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('is_admin')
              .eq('id', session.user.id)
              .maybeSingle();

            if (profileError) {
              console.error("[App] Profile fetch error:", profileError);
              if (isMounted.current) setIsLoading(false);
              return;
            }

            if (isMounted.current) {
              setIsAdmin(!!profile?.is_admin);
              setIsLoading(false);
            }
          } catch (error) {
            console.error("[App] Profile check error:", error);
            if (isMounted.current) setIsLoading(false);
          }
        }
      } catch (error) {
        console.error("[App] Auth initialization error:", error);
        if (isMounted.current) setIsLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("[App] Auth state changed:", event);
      
      if (event === 'SIGNED_IN' && session?.user) {
        if (isMounted.current) {
          setIsLoggedIn(true);
          setIsLoading(true);
          try {
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('is_admin')
              .eq('id', session.user.id)
              .maybeSingle();

            if (profileError) {
              console.error("[App] Profile fetch error:", profileError);
              if (isMounted.current) setIsLoading(false);
              return;
            }

            if (isMounted.current) {
              setIsAdmin(!!profile?.is_admin);
              setIsLoading(false);
            }
          } catch (error) {
            console.error("[App] Error handling auth change:", error);
            if (isMounted.current) setIsLoading(false);
          }
        }
      } else if (event === 'SIGNED_OUT') {
        if (isMounted.current) {
          setIsLoggedIn(false);
          setIsAdmin(false);
          setIsLoading(false);
        }
      }
    });

    return () => {
      isMounted.current = false;
      subscription.unsubscribe();
    };
  }, []);

  // Show loading spinner only for a brief moment during initial load
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-swiss-red"></div>
      </div>
    );
  }

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
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;