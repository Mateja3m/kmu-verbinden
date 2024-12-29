import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'START', href: '/' },
    { name: 'PRÄSIDIUM', href: '/presidency' },
    { name: 'GESCHÄFTSSTELLE', href: '#' },
    { name: 'REDAKTION', href: '#' },
    { name: 'MITGLIEDSCHAFT', href: '#' },
    { name: 'KONTAKT', href: '#' },
    { name: 'KMU-NEWS', href: '#' },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <img 
                src="https://static.wixstatic.com/media/0c82d3_99a00cf83db144a5ab37dde66cd07e27~mv2.png" 
                alt="SKV Logo" 
                className="h-12 w-auto"
              />
            </Link>
          </div>
          
          {/* Desktop menu */}
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
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-swiss-darkblue hover:text-swiss-red transition-colors duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 backdrop-blur-md">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-swiss-darkblue hover:text-swiss-red block px-3 py-2 text-base font-medium transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;