import { Link } from 'react-router-dom';

export const NavigationLogo = () => {
  return (
    <div className="flex-shrink-0 flex items-center">
      <Link to="/">
        <img 
          src="https://static.wixstatic.com/media/0c82d3_99a00cf83db144a5ab37dde66cd07e27~mv2.png" 
          alt="SKV Logo" 
          className="h-16 w-auto" // Changed from h-12 to h-16 to make the logo bigger
        />
      </Link>
    </div>
  );
};