import { Mail, MapPin, Phone, Globe, Calendar, Heart, Linkedin } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { SitemapModal } from "./SitemapModal";
import { OfficeLocations } from "./footer/OfficeLocations";
import { QuickLinks } from "./footer/QuickLinks";
import { LoginButtons } from "./footer/LoginButtons";
import { NewsletterSignup } from "./footer/NewsletterSignup";
import BackgroundPattern from "./BackgroundPattern";
import { DatenschutzModal } from "./DatenschutzModal";
import { AGBModal } from "./AGBModal";

interface FooterProps {
  isLoggedIn?: boolean;
  handleLogout?: () => void;
}

const Footer = ({ isLoggedIn, handleLogout }: FooterProps) => {
  return (
    <BackgroundPattern>
      <footer className="bg-swiss-darkblue text-white relative">
        <div className="container mx-auto px-4 py-6">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold mb-4 whitespace-nowrap">Schweizerischer KMU Verein (SKV)</h3>
              <OfficeLocations />
              <div className="space-y-3 mt-4">
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
                  <div className="flex items-center gap-3">
                    <Linkedin className="h-5 w-5 text-swiss-red" />
                    <a href="https://www.linkedin.com/company/schweizerischer-kmu-verein-skv" target="_blank" rel="noopener noreferrer" className="hover:text-swiss-red transition-colors">
                      LinkedIn
                    </a>
                  </div>
                  {!isLoggedIn && (
                    <div className="pl-8">
                      <LoginButtons />
                    </div>
                  )}
                  {/* Noch Fragen section */}
                  <div className="pl-8 pt-2">
                    <h4 className="text-lg font-semibold mb-2">Noch Fragen?</h4>
                    <Button 
                      variant="outline" 
                      className="bg-transparent border-swiss-red text-white hover:bg-swiss-red hover:text-white transition-colors w-full"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Termin vereinbaren
                    </Button>
                  </div>
                  {/* Newsletter Signup */}
                  <div className="pl-8 pt-2">
                    <NewsletterSignup />
                  </div>
                </div>
              </div>
            </div>

            {/* Über uns */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold mb-4">Über uns</h3>
              <nav className="space-y-2">
                <Link to="/presidency" className="block hover:text-swiss-red transition-colors">Präsidium</Link>
                <Link to="/organisation" className="block hover:text-swiss-red transition-colors">Organisation</Link>
                <Link to="/geschaeftsstelle" className="block hover:text-swiss-red transition-colors">Geschäftsstellen</Link>
                <Link to="/unsere-auftrag" className="block hover:text-swiss-red transition-colors">Unser Auftrag</Link>
                <Link to="/empfehlen" className="block hover:text-swiss-red transition-colors">Empfehlen Sie den SKV weiter</Link>
              </nav>
            </div>

            {/* Angebote und Projekte */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold mb-4">Angebote und Projekte</h3>
              <nav className="space-y-2">
                <Link to="/rechtsdienst" className="block hover:text-swiss-red transition-colors">Rechtsdienst</Link>
                <Link to="/redaktion" className="block hover:text-swiss-red transition-colors">Redaktion</Link>
                <Link to="/experts" className="block hover:text-swiss-red transition-colors">Expertenrat</Link>
                <Link to="/membership" className="block hover:text-swiss-red transition-colors">Mitgliedschaft</Link>
                <Link to="/partners" className="block hover:text-swiss-red transition-colors">SKV-Partner</Link>
                <Link to="/versicherungsrechner" className="block hover:text-swiss-red transition-colors">KMU-Versicherungsrechner</Link>
                <Link to="/presse" className="block hover:text-swiss-red transition-colors">Medienmitteilungen und Presse</Link>
                <Link to="/events" className="block hover:text-swiss-red transition-colors">Eventkalender</Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="container mx-auto px-4 pb-6">
            <div className="flex flex-col items-center space-y-3">
              {/* Made with Love */}
              <div className="flex items-center justify-center text-sm">
                <span className="flex items-center gap-1">
                  Made with <Heart className="h-4 w-4 text-swiss-red" /> in Switzerland
                </span>
              </div>
              {/* Legal Links */}
              <div className="flex flex-wrap gap-4 text-sm justify-center">
                <AGBModal>
                  <button className="hover:text-swiss-red transition-colors">AGB</button>
                </AGBModal>
                <span className="text-gray-500">|</span>
                <Link to="/impressum" className="hover:text-swiss-red transition-colors">Impressum</Link>
                <span className="text-gray-500">|</span>
                <DatenschutzModal />
                <span className="text-gray-500">|</span>
                <SitemapModal />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </BackgroundPattern>
  );
};

export default Footer;