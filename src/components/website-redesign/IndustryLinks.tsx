
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useIndustryData } from '@/hooks/use-industry-data';
import { supabase } from '@/integrations/supabase/client';

export const IndustryLinks = () => {
  const [industries, setIndustries] = useState<{
    category: string;
    items: Array<{ id: string; slug: string; name: string }>
  }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('industries')
          .select('id, slug, name, category')
          .eq('active', true)
          .order('name');
          
        if (error) {
          console.error('Error fetching industries:', error);
          return;
        }
        
        // Group industries by category
        const categorized = data.reduce((acc: any, industry) => {
          const category = industry.category || 'Sonstige';
          
          if (!acc[category]) {
            acc[category] = { category, items: [] };
          }
          
          acc[category].items.push(industry);
          return acc;
        }, {});
        
        setIndustries(Object.values(categorized));
      } catch (error) {
        console.error('Error fetching industries:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchIndustries();
  }, []);

  // Fallback industries in case the database fetch fails
  const fallbackIndustries = [
    { category: 'Dienstleistung', items: [
      { id: 'rechtsanwalt', slug: 'rechtsanwalt', name: 'Rechtsanwalt' },
      { id: 'steuerberater', slug: 'steuerberater', name: 'Steuerberater' },
      { id: 'versicherung', slug: 'versicherung', name: 'Versicherungsmakler' },
      { id: 'finanzberater', slug: 'finanzberater', name: 'Finanzberater' },
      { id: 'immobilienmakler', slug: 'immobilienmakler', name: 'Immobilienmakler' }
    ]},
    { category: 'Gesundheit', items: [
      { id: 'zahnarzt', slug: 'zahnarzt', name: 'Zahnarzt' },
      { id: 'arzt', slug: 'arzt', name: 'Arztpraxis' },
      { id: 'physiotherapie', slug: 'physiotherapie', name: 'Physiotherapie' },
      { id: 'psychotherapie', slug: 'psychotherapie', name: 'Psychotherapie' },
      { id: 'fitness', slug: 'fitness', name: 'Fitnessstudio' }
    ]},
    { category: 'Handwerk', items: [
      { id: 'schreiner', slug: 'schreiner', name: 'Schreinerei' },
      { id: 'elektriker', slug: 'elektriker', name: 'Elektriker' },
      { id: 'sanitaer', slug: 'sanitaer', name: 'Sanitär & Heizung' },
      { id: 'maler', slug: 'maler', name: 'Malerbetrieb' },
      { id: 'bauunternehmen', slug: 'bauunternehmen', name: 'Bauunternehmen' }
    ]},
    { category: 'Gastronomie', items: [
      { id: 'restaurant', slug: 'restaurant', name: 'Restaurant' },
      { id: 'cafe', slug: 'cafe', name: 'Café' },
      { id: 'baeckerei', slug: 'baeckerei', name: 'Bäckerei' },
      { id: 'metzgerei', slug: 'metzgerei', name: 'Metzgerei' },
      { id: 'hotel', slug: 'hotel', name: 'Hotel' }
    ]},
    { category: 'Einzelhandel', items: [
      { id: 'mode', slug: 'mode', name: 'Modegeschäft' },
      { id: 'moebel', slug: 'moebel', name: 'Möbelhaus' },
      { id: 'elektronik', slug: 'elektronik', name: 'Elektronik' },
      { id: 'spielwaren', slug: 'spielwaren', name: 'Spielwaren' },
      { id: 'buchhandlung', slug: 'buchhandlung', name: 'Buchhandlung' }
    ]},
    { category: 'Bildung', items: [
      { id: 'coaching', slug: 'coaching', name: 'Coaching' },
      { id: 'sprachschule', slug: 'sprachschule', name: 'Sprachschule' },
      { id: 'musikschule', slug: 'musikschule', name: 'Musikschule' },
      { id: 'nachhilfe', slug: 'nachhilfe', name: 'Nachhilfe' },
      { id: 'fahrschule', slug: 'fahrschule', name: 'Fahrschule' }
    ]}
  ];

  return (
    <div className="py-8">
      <h3 className="text-xl font-semibold text-swiss-darkblue/70 mb-8 text-center">
        Alle Branchenlösungen
      </h3>
      
      {loading || industries.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fallbackIndustries.map((category) => (
            <div key={category.category} className="mb-4">
              <h4 className="font-medium text-swiss-darkblue/60 mb-3 text-sm uppercase tracking-wider">
                {category.category}
              </h4>
              <div className="flex flex-col space-y-1.5">
                {category.items.map((industry) => (
                  <Link
                    key={industry.id}
                    to={`/website-redesign/branche/${industry.slug}`}
                    className="text-gray-500 hover:text-swiss-red text-sm py-1 transition-colors duration-200"
                  >
                    {industry.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((category) => (
            <div key={category.category} className="mb-4">
              <h4 className="font-medium text-swiss-darkblue/60 mb-3 text-sm uppercase tracking-wider">
                {category.category}
              </h4>
              <div className="flex flex-col space-y-1.5">
                {category.items.map((industry) => (
                  <Link
                    key={industry.id}
                    to={`/website-redesign/branche/${industry.slug}`}
                    className="text-gray-500 hover:text-swiss-red text-sm py-1 transition-colors duration-200"
                  >
                    {industry.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
