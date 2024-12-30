import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from './ui/button';

interface NavigationAuthItemsProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
  handleLogout: () => void;
}

export const NavigationAuthItems = ({
  isLoggedIn,
  isAdmin,
  handleLogout,
}: NavigationAuthItemsProps) => {
  if (!isLoggedIn) return null;

  return (
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
      <Button
        onClick={handleLogout}
        variant="ghost"
        className="text-swiss-darkblue hover:text-swiss-red"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Abmelden
      </Button>
    </>
  );
};