import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from './ui/button';

const menuItems = [
  { name: 'PRÄSIDIUM', href: '/presidency' },
  { name: 'MITGLIEDSCHAFT', href: '/membership' },
  { name: 'PARTNER', href: '/partners' },
  { name: 'EXPERTENRAT', href: '/experts' },
  { name: 'KONTAKT', href: '/kontakt' },
  { name: 'KMU-NEWS', href: '/news' },
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
    <div className="md:hidden fixed inset-x-0 top-20 z-50">
      <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-100">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="block px-4 py-3 text-base font-medium text-swiss-darkblue hover:text-swiss-red hover:bg-gray-50 rounded-md transition-colors duration-300"
            onClick={onClose}
          >
            {item.name}
          </Link>
        ))}
        {isLoggedIn && (
          <>
            <Link
              to="/dashboard"
              className="block px-4 py-3 text-base font-medium text-swiss-darkblue hover:text-swiss-red hover:bg-gray-50 rounded-md transition-colors duration-300"
              onClick={onClose}
            >
              UNTERNEHMENSPROFIL
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className="block px-4 py-3 text-base font-medium text-swiss-darkblue hover:text-swiss-red hover:bg-gray-50 rounded-md transition-colors duration-300"
                onClick={onClose}
              >
                ADMIN
              </Link>
            )}
            <Button
              onClick={() => {
                handleLogout();
                onClose();
              }}
              variant="ghost"
              className="w-full justify-start px-4 py-3 text-base font-medium text-swiss-darkblue hover:text-swiss-red hover:bg-gray-50"
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