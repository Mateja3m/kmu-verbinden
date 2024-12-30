import { Mail, MapPin, Phone, Globe, Calendar, Lock } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate('/auth');
  };

  return (
    <footer className="bg-swiss-darkblue text-white mt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6">Schweizerischer KMU Verein (SKV)</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-swiss-red" />
                <span>Dammweg 11D | CH-3904 Naters</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-swiss-red" />
                <a href="tel:+41445852081" className="hover:text-swiss-red transition-colors">
                  044 585 20 81
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-swiss-red" />
                <a href="mailto:info@kmu-verein.ch" className="hover:text-swiss-red transition-colors">
                  info@kmu-verein.ch
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-swiss-red" />
                <a href="https://www.kmu-verein.ch" target="_blank" rel="noopener noreferrer" className="hover:text-swiss-red transition-colors">
                  www.kmu-verein.ch
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <nav className="space-y-3">
              <Link to="/" className="block hover:text-swiss-red transition-colors">Home</Link>
              <Link to="/presidency" className="block hover:text-swiss-red transition-colors">Präsidium</Link>
              <button 
                onClick={handleAdminLogin}
                className="flex items-center gap-2 text-white hover:text-swiss-red transition-colors"
              >
                <Lock className="h-4 w-4" />
                Admin Login
              </button>
            </nav>
          </div>

          {/* Call to Action */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6">Noch Fragen?</h3>
            <Button 
              variant="outline" 
              className="bg-transparent border-swiss-red text-white hover:bg-swiss-red hover:text-white transition-colors"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Termin vereinbaren
            </Button>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm">
          © 2024 KMU Verein. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
};

export default Footer;