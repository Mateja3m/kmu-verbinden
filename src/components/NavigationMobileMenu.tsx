import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from './ui/button';

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

interface NavigationMobileMenuProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
  handleLogout: () => void;
  onClose: () => void;
}

export const NavigationMobileMenu = ({
  isLoggedIn,
  isAdmin,
  handleLogout,
  onClose,
}: NavigationMobileMenuProps) => {
  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 backdrop-blur-md">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="text-swiss-darkblue hover:text-swiss-red block px-3 py-2 text-base font-medium transition-colors duration-300"
            onClick={onClose}
          >
            {item.name}
          </Link>
        ))}
        {isLoggedIn && (
          <>
            {isAdmin && (
              <Link
                to="/admin"
                className="text-swiss-darkblue hover:text-swiss-red block px-3 py-2 text-base font-medium transition-colors duration-300"
                onClick={onClose}
              >
                ADMIN
              </Link>
            )}
            <Link
              to="/dashboard"
              className="text-swiss-darkblue hover:text-swiss-red block px-3 py-2 text-base font-medium transition-colors duration-300"
              onClick={onClose}
            >
              UNTERNEHMENSPROFIL
            </Link>
            <Button
              onClick={() => {
                handleLogout();
                onClose();
              }}
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
  );
};