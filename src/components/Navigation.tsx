import { useState, useEffect } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Button } from './ui/button';
import { useToast } from "@/hooks/use-toast";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Fehler beim Abmelden",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Erfolgreich abgemeldet",
        description: "Auf Wiedersehen!",
      });
      navigate('/');
    }
  };

  const menuItems = [
    { name: 'START', href: '/' },
    { name: 'PRÄSIDIUM', href: '/presidency' },
    { name: 'GESCHÄFTSSTELLE', href: '#' },
    { name: 'REDAKTION', href: '/redaktion' },
    { name: 'MITGLIEDSCHAFT', href: '/membership' },
    { name: 'PARTNER', href: '/partners' },
    { name: 'KONTAKT', href: '#' },
    { name: 'KMU-NEWS', href: '#' },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <img 
                src="https://static.wixstatic.com/media/0c82d3_99a00cf83db144a5ab37dde66cd07e27~mv2.png" 
                alt="SKV Logo" 
                className="h-12 w-auto"
              />
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-swiss-darkblue hover:text-swiss-red px-3 py-2 text-sm font-medium transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
            {isLoggedIn && (
              <>
                <Link
                  to="/dashboard"
                  className="text-swiss-darkblue hover:text-swiss-red px-3 py-2 text-sm font-medium transition-colors duration-300"
                >
                  UNTERNEHMENSPROFIL
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="text-swiss-darkblue hover:text-swiss-red"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Abmelden
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-swiss-darkblue hover:text-swiss-red transition-colors duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 backdrop-blur-md">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-swiss-darkblue hover:text-swiss-red block px-3 py-2 text-base font-medium transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {isLoggedIn && (
              <>
                <Link
                  to="/dashboard"
                  className="text-swiss-darkblue hover:text-swiss-red block px-3 py-2 text-base font-medium transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  UNTERNEHMENSPROFIL
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="w-full justify-start text-swiss-darkblue hover:text-swiss-red"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Abmelden
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;