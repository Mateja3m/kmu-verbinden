import { Link } from 'react-router-dom';

export const NavigationLogo = () => {
  return (
    <div className="flex-shrink-0 flex items-center">
      <Link to="/">
        <img 
          src="/lovable-uploads/67e619d1-963c-4da7-8284-26ef2cfe6da6.png" 
          alt="SKV Logo" 
          className="h-16 w-auto"
        />
      </Link>
    </div>
  );
};