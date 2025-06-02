import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { 
    category: 'Über uns',
    items: [
      { name: 'PRÄSIDIUM', href: '/presidency' },
      { name: 'ORGANISATION', href: '/organisation' },
      { name: 'GESCHÄFTSSTELLE', href: '/geschaeftsstelle' },
    ]
  },
  {
    category: 'Services',
    items: [
      { name: 'REDAKTION', href: '/redaktion' },
      { name: 'KMU-VERSICHERUNGSRECHNER', href: '/versicherungsrechner' },
      { name: 'MEDIENMITTEILUNGEN UND PRESSE', href: '/presse' },
      { name: 'EVENTKALENDER', href: '/events' },
    ]
  },
  {
    category: 'KMU-News',
    items: [
      { name: 'KMU-ZEITUNG: UNTERNEHMENSBLICK', href: '/news' },
      { name: 'KMU UNTERNEHMENSJOURNAL', href: 'https://unternehmensjournal.ch', external: true },
      { name: 'KMU PRAXISRATGEBER', href: '/news/praxisratgeber' },
      { name: 'BRANCHENMAGAZINE', href: '/news/branchenmagazine' },
      { name: 'EBOOKS & DIGITALE LEITFÄDEN', href: '/news/ebooks' },
    ]
  },
  {
    category: 'Weitere Links',
    items: [
      { name: 'MITGLIEDSCHAFT', href: '/membership' },
    ]
  },
  {
    category: 'Solidarität mit Blatten (VS)',
    items: [
      { name: 'Solidarität mit Blatten (VS)', href: '/solidaritaet-blatten' },
    ]
  }
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
          className="absolute right-0 h-full w-4/5 max-w-sm bg-white shadow-xl overflow-y-auto"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full">
            <nav className="flex-1 px-4 py-6">
              {menuItems.map((category) => (
                <div key={category.category} className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 px-4 mb-2">
                    {category.category}
                  </h3>
                  {category.items.map((item) => (
                    <motion.div
                      key={item.name}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center w-full px-4 py-3 text-base font-medium text-swiss-darkblue hover:text-swiss-red rounded-lg hover:bg-gray-50 transition-colors duration-200"
                          onClick={onClose}
                        >
                          {item.name}
                        </a>
                      ) : (
                        <Link
                          to={item.href}
                          className="flex items-center w-full px-4 py-3 text-base font-medium text-swiss-darkblue hover:text-swiss-red rounded-lg hover:bg-gray-50 transition-colors duration-200"
                          onClick={onClose}
                        >
                          {item.name}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>
              ))}

              {isLoggedIn && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-500 px-4 mb-2">
                    Account
                  </h3>
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
                </div>
              )}
            </nav>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};