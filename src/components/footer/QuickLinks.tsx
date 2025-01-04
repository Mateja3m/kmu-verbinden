import { User, Users, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

interface QuickLinksProps {
  isLoggedIn?: boolean;
  handleLogout?: () => void;
}

export const QuickLinks = ({ isLoggedIn, handleLogout }: QuickLinksProps) => {
  return (
    <nav className="space-y-3">
      <Link to="/presidency" className="block hover:text-swiss-red transition-colors">Präsidium</Link>
      <Link to="/redaktion" className="block hover:text-swiss-red transition-colors">Redaktion</Link>
      <Link to="/rechtsdienst" className="block hover:text-swiss-red transition-colors">Rechtsdienst</Link>
      <Link to="/aktuelle-projekte" className="block hover:text-swiss-red transition-colors">Aktuelle Projekte</Link>
      <Link to="/empfehlen" className="block hover:text-swiss-red transition-colors">Empfehlen Sie uns weiter</Link>
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
  );
};