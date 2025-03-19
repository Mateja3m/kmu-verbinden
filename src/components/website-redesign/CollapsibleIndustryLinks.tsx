
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CollapsibleIndustryLinks = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Define the industry links
  const industryLinks = [
    { label: 'Zahnärzte', url: '/website-redesign/branche/zahnarzt' },
    { label: 'Fahrschulen', url: '/website-redesign/fahrschule' },
    { label: 'Rechtsanwälte', url: '/website-redesign/branche/rechtsanwalt' },
    { label: 'Ärzte', url: '/website-redesign/branche/arzt' },
    { label: 'Restaurants', url: '/website-redesign/branche/restaurant' },
    { label: 'Hotels', url: '/website-redesign/branche/hotel' },
    { label: 'Immobilienmakler', url: '/website-redesign/branche/immobilienmakler' },
    { label: 'Handwerker', url: '/website-redesign/branche/handwerker' },
    { label: 'Finanzberater', url: '/website-redesign/branche/finanzberater' },
    { label: 'Fitnessstudios', url: '/website-redesign/branche/fitnessstudio' },
  ];
  
  return (
    <div className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-left text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          >
            <span>Branchenspezifische Website-Lösungen für KMUs</span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </button>
          
          {isExpanded && (
            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2 px-1 pt-2 pb-1 bg-white border border-gray-200 rounded-lg">
              {industryLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.url}
                  className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
          
          <p className="mt-3 text-xs text-gray-500 text-center">
            Wir bieten spezialisierte Lösungen für verschiedene Branchen. Alle Branchenpakete enthalten SEO-Optimierung und responsive Design.
          </p>
        </div>
      </div>
    </div>
  );
};
