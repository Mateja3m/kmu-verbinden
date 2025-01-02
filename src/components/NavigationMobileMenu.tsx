import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { name: 'PRÄSIDIUM', href: '/presidency' },
  { name: 'MITGLIEDSCHAFT', href: '/membership' },
  { name: 'PARTNER', href: '/partners' },
  { name: 'EXPERTENRAT', href: '/experts' },
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
    <AnimatePresence>
      <motion.div 
        className="md:hidden fixed inset-0 top-20 z-50 bg-black bg-opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="px-2 pt-2 pb-3 h-full bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-100 overflow-y-auto"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-1">
            {menuItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={item.href}
                  className="block px-4 py-3 text-base font-medium text-swiss-darkblue hover:text-swiss-red hover:bg-gray-50 rounded-md transition-colors duration-300"
                  onClick={onClose}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            {isLoggedIn && (
              <>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-3 text-base font-medium text-swiss-darkblue hover:text-swiss-red hover:bg-gray-50 rounded-md transition-colors duration-300"
                    onClick={onClose}
                  >
                    UNTERNEHMENSPROFIL
                  </Link>
                </motion.div>
                {isAdmin && (
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to="/admin"
                      className="block px-4 py-3 text-base font-medium text-swiss-darkblue hover:text-swiss-red hover:bg-gray-50 rounded-md transition-colors duration-300"
                      onClick={onClose}
                    >
                      ADMIN
                    </Link>
                  </motion.div>
                )}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
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
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};