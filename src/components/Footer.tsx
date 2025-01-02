import { Mail, MapPin, Phone, Globe, Calendar, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { SitemapModal } from "./SitemapModal";
import { OfficeLocations } from "./footer/OfficeLocations";
import { QuickLinks } from "./footer/QuickLinks";
import { LoginButtons } from "./footer/LoginButtons";
import BackgroundPattern from "./BackgroundPattern";

interface FooterProps {
  isLoggedIn?: boolean;
  handleLogout?: () => void;
}

const Footer = ({ isLoggedIn, handleLogout }: FooterProps) => {
  return (
    <BackgroundPattern>
      <footer className="bg-swiss-darkblue text-white relative">
        <div className="container mx-auto px-4 py-12">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6">Schweizerischer KMU Verein (SKV)</h3>
            <OfficeLocations />
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
                  <div className="pl-8">
                    <LoginButtons />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <QuickLinks isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
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
              <span className="text-gray-500">|</span>
              <SitemapModal />
            </div>
          </div>
        </div>
      </footer>
    </BackgroundPattern>
  );
};

export default Footer;
