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
        className="md:hidden fixed inset-0 top-20 z-50 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="absolute right-0 h-full w-4/5 max-w-sm bg-white shadow-xl"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full overflow-y-auto">
            <nav className="flex-1 px-4 py-6 space-y-2">
              {menuItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={item.href}
                    className="flex items-center w-full px-4 py-3 text-base font-medium text-swiss-darkblue hover:text-swiss-red rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    onClick={onClose}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              {isLoggedIn && (
                <>
                  <motion.div 
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/dashboard"
                      className="flex items-center w-full px-4 py-3 text-base font-medium text-swiss-darkblue hover:text-swiss-red rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      onClick={onClose}
                    >
                      UNTERNEHMENSPROFIL
                    </Link>
                  </motion.div>

                  {isAdmin && (
                    <motion.div 
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to="/admin"
                        className="flex items-center w-full px-4 py-3 text-base font-medium text-swiss-darkblue hover:text-swiss-red rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        onClick={onClose}
                      >
                        ADMIN
                      </Link>
                    </motion.div>
                  )}

                  <motion.div 
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => {
                        handleLogout();
                        onClose();
                      }}
                      variant="ghost"
                      className="flex items-center w-full px-4 py-3 text-base font-medium text-swiss-darkblue hover:text-swiss-red justify-start"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Abmelden
                    </Button>
                  </motion.div>
                </>
              )}
            </nav>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};