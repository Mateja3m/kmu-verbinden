
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface IndustryLandingLayoutProps {
  children: React.ReactNode;
  metaTitle?: string;
  metaDescription?: string;
}

export const IndustryLandingLayout = ({ 
  children,
  metaTitle,
  metaDescription 
}: IndustryLandingLayoutProps) => {
  // Update document title and meta description for SEO
  React.useEffect(() => {
    if (metaTitle) document.title = metaTitle;
    
    // Update meta description
    if (metaDescription) {
      let metaDescElement = document.querySelector('meta[name="description"]');
      if (metaDescElement) {
        metaDescElement.setAttribute('content', metaDescription);
      } else {
        metaDescElement = document.createElement('meta');
        metaDescElement.setAttribute('name', 'description');
        metaDescElement.setAttribute('content', metaDescription);
        document.head.appendChild(metaDescElement);
      }
    }
  }, [metaTitle, metaDescription]);

  const { industry } = useParams<{ industry: string }>();

  return (
    <div className="min-h-screen bg-white pt-14">
      {/* Back button */}
      <div className="container mx-auto px-4 py-2">
        <Link 
          to="/website-redesign" 
          className="inline-flex items-center text-sm text-gray-500 hover:text-swiss-red transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Zurück zur Übersicht
        </Link>
      </div>
      
      {/* Main content */}
      {children}
    </div>
  );
};
