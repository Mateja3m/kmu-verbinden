import { Link } from 'react-router-dom';

export const NavigationLogo = () => {
  return (
    <div className="flex-shrink-0 flex items-center">
      <Link to="/">
        <img 
          src="/lovable-uploads/357e0254-2cd2-4767-ba80-3d0272966c39.png" 
          alt="SKV Logo" 
          className="h-16 w-auto"
          style={{ 
            objectFit: 'contain',
            objectPosition: 'center'
          }}
        />
      </Link>
    </div>
  );
};