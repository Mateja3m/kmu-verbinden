import { Mail, MapPin, Phone, Globe, Calendar, Lock, Users, User, LogOut, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const offices = [
  {
    city: "Genf",
    phone: "022 / 518 05 09",
    email: "genf@kmu-verein.ch"
  },
  {
    city: "Luzern",
    phone: "041 / 588 22 49",
    email: "luzern@kmu-verein.ch"
  },
  {
    city: "Bern",
    phone: "031 / 528 05 51",
    email: "bern@kmu-verein.ch"
  },
  {
    city: "Naters",
    phone: "044 / 585 20 81",
    email: "naters@kmu-verein.ch"
  }
];

interface FooterProps {
  isLoggedIn?: boolean;
  handleLogout?: () => void;
}

const Footer = ({ isLoggedIn, handleLogout }: FooterProps) => {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate('/auth');
  };

  const handlePartnerLogin = () => {
    navigate('/auth?type=partner');
  };

  return (
    <footer className="bg-swiss-darkblue text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6">Schweizerischer KMU Verein (SKV)</h3>
            <div className="flex flex-wrap gap-4 text-sm text-gray-300">
              <TooltipProvider>
                {offices.map((office) => (
                  <Tooltip key={office.city}>
                    <TooltipTrigger className="hover:text-swiss-red transition-colors">
                      {office.city}
                    </TooltipTrigger>
                    <TooltipContent className="bg-swiss-darkblue border-swiss-red p-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-swiss-red" />
                          <span>{office.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-swiss-red" />
                          <a href={`mailto:${office.email}`} className="hover:text-swiss-red">
                            {office.email}
                          </a>
                        </div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
            <div className="space-y-3 mt-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-swiss-red" />
                <span>Dammweg 11D | CH-3904 Naters</span>
              </div>
              <div className="flex flex-col space-y-3">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-swiss-red" />
                  <a href="https://www.kmu-verein.ch" target="_blank" rel="noopener noreferrer" className="hover:text-swiss-red transition-colors">
                    www.kmu-verein.ch
                  </a>
                </div>
                {!isLoggedIn && (
                  <div className="flex flex-col space-y-2 pl-8">
                    <button 
                      onClick={handleAdminLogin}
                      className="flex items-center gap-2 text-white hover:text-swiss-red transition-colors text-sm"
                    >
                      <Lock className="h-4 w-4" />
                      Admin Login
                    </button>
                    <button 
                      onClick={handlePartnerLogin}
                      className="flex items-center gap-2 text-white hover:text-swiss-red transition-colors text-sm"
                    >
                      <Users className="h-4 w-4" />
                      Partner Login
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <nav className="space-y-3">
              <Link to="/presidency" className="block hover:text-swiss-red transition-colors">Präsidium</Link>
              <Link to="/redaktion" className="block hover:text-swiss-red transition-colors">Redaktion</Link>
              <Link to="/rechtsdienst" className="block hover:text-swiss-red transition-colors">Rechtsdienst</Link>
              <Link to="/aktuelle-projekte" className="block hover:text-swiss-red transition-colors">Aktuelle Projekte</Link>
              {isLoggedIn && (
                <>
                  <Link to="/dashboard" className="flex items-center gap-2 text-white hover:text-swiss-red transition-colors">
                    <User className="h-4 w-4" />
                    Unternehmensprofil
                  </Link>
                  <Link to="/partner-dashboard" className="flex items-center gap-2 text-white hover:text-swiss-red transition-colors">
                    <Users className="h-4 w-4" />
                    Partner Dashboard
                  </Link>
                  {handleLogout && (
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-white hover:text-swiss-red transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Abmelden
                    </button>
                  )}
                </>
              )}
            </nav>
          </div>

          {/* Services & Projects */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6">Services & Projekte</h3>
            <nav className="space-y-3">
              <Link to="/experts" className="block hover:text-swiss-red transition-colors">Expertenrat</Link>
              <Link to="/membership" className="block hover:text-swiss-red transition-colors">Mitgliedschaft</Link>
              <Link to="/partners" className="block hover:text-swiss-red transition-colors">Partner</Link>
              <Link to="/news" className="block hover:text-swiss-red transition-colors">KMU-News</Link>
              <Link to="/unsere-auftrag" className="block hover:text-swiss-red transition-colors">Unser Auftrag</Link>
            </nav>
          </div>

          {/* Call to Action */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6">Noch Fragen?</h3>
            <Button 
              variant="outline" 
              className="bg-transparent border-swiss-red text-white hover:bg-swiss-red hover:text-white transition-colors w-full"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Termin vereinbaren
            </Button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col items-center space-y-4">
            {/* Made with Love */}
            <div className="flex items-center justify-center text-sm">
              <span className="flex items-center gap-1">
                Made with <Heart className="h-4 w-4 text-swiss-red" /> in Switzerland
              </span>
            </div>
            {/* Legal Links */}
            <div className="flex flex-wrap gap-4 text-sm justify-center">
              <Link to="/agb" className="hover:text-swiss-red transition-colors">AGB</Link>
              <span className="text-gray-500">|</span>
              <Link to="/impressum" className="hover:text-swiss-red transition-colors">Impressum</Link>
              <span className="text-gray-500">|</span>
              <Link to="/datenschutz" className="hover:text-swiss-red transition-colors">Datenschutz</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;