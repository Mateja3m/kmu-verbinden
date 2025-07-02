import { Link } from 'react-router-dom';

export const NavigationLogo = () => {
  return (
    <div className="flex-shrink-0 flex items-center">
      <Link to="/">
        <img 
          src="/lovable-uploads/skv-logo.jpeg"
          alt="KMU Verein Logo" 
          className="w-40"
        />
      </Link>
    </div>
  );
};