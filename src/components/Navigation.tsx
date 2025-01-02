import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { NavigationMenuDemo } from './NavigationMenu';
import { NavigationMobileMenu } from './NavigationMobileMenu';
import { NavigationLogo } from './NavigationLogo';
import { NavigationAuthItems } from './NavigationAuthItems';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log("[Navigation] Initial session check:", session);
        
        if (session?.user) {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', session.user.id)
            .single();
          
          if (error) {
            console.error("[Navigation] Error fetching profile:", error);
            return;
          }
          
          setIsAdmin(!!profile?.is_admin);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("[Navigation] Error during auth initialization:", error);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("[Navigation] Auth state changed:", event);
      console.log("[Navigation] Session data:", session);
      
      if (event === 'SIGNED_IN' && session?.user) {
        try {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', session.user.id)
            .single();
          
          if (error) {
            console.error("[Navigation] Error fetching profile:", error);
            return;
          }
          
          setIsAdmin(!!profile?.is_admin);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("[Navigation] Error handling auth change:", error);
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

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Erfolgreich abgemeldet",
        description: "Auf Wiedersehen!",
      });
      navigate('/');
    } catch (error: any) {
      console.error("[Navigation] Logout error:", error);
      toast({
        title: "Fehler beim Abmelden",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center relative bg-white z-10">
          <NavigationLogo />
          
          <div className="hidden md:block flex-1 px-4">
            <NavigationMenuDemo 
              isLoggedIn={isLoggedIn} 
              isAdmin={isAdmin} 
              handleLogout={handleLogout} 
            />
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <NavigationAuthItems 
              isLoggedIn={isLoggedIn} 
              isAdmin={isAdmin} 
              handleLogout={handleLogout} 
            />
          </div>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-swiss-darkblue hover:text-swiss-red hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-swiss-red transition-colors duration-200"
            aria-expanded={isOpen}
          >
            <span className="sr-only">
              {isOpen ? 'Close menu' : 'Open menu'}
            </span>
            {isOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <NavigationMobileMenu
          isLoggedIn={isLoggedIn}
          isAdmin={isAdmin}
          handleLogout={handleLogout}
          onClose={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navigation;