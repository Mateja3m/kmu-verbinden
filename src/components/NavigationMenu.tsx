import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from './ui/button';

const menuItems = [
  { name: 'PRÄSIDIUM', href: '/presidency' },
  { name: 'MITGLIEDSCHAFT', href: '/membership' },
  { name: 'PARTNER', href: '/partners' },
  { name: 'EXPERTENRAT', href: '/experts' },
  { name: 'KONTAKT', href: '#' },
  { name: 'KMU-NEWS', href: '#' },
];

interface NavigationMenuProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
  handleLogout: () => void;
}

export const NavigationMenu = ({ isLoggedIn, isAdmin, handleLogout }: NavigationMenuProps) => {
  return (
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
          {isAdmin && (
            <Link
              to="/admin"
              className="text-swiss-darkblue hover:text-swiss-red px-3 py-2 text-sm font-medium transition-colors duration-300"
            >
              ADMIN
            </Link>
          )}
          <Link
            to="/dashboard"
            className="text-swiss-darkblue hover:text-swiss-red px-3 py-2 text-sm font-medium transition-colors duration-300"
          >
            UNTERNEHMENSPROFIL
          </Link>
          <Link
            to="/partner-dashboard"
            className="text-swiss-darkblue hover:text-swiss-red px-3 py-2 text-sm font-medium transition-colors duration-300"
          >
            PARTNER DASHBOARD
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
  );
};