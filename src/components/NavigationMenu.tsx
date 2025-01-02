import { Link } from 'react-router-dom';

const menuItems = [
  { name: 'PRÄSIDIUM', href: '/presidency' },
  { name: 'MITGLIEDSCHAFT', href: '/membership' },
  { name: 'PARTNER', href: '/partners' },
  { name: 'EXPERTENRAT', href: '/experts' },
  { name: 'KMU-NEWS', href: '/news' },
];

interface NavigationMenuProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
  handleLogout: () => void;
}

export const NavigationMenu = ({ isLoggedIn, isAdmin }: NavigationMenuProps) => {
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
      {isLoggedIn && isAdmin && (
        <Link
          to="/admin"
          className="text-swiss-darkblue hover:text-swiss-red px-3 py-2 text-sm font-medium transition-colors duration-300"
        >
          ADMIN
        </Link>
      )}
    </div>
  );
};