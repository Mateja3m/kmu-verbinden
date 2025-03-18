
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  const dataToDisplay = industries.length > 0 ? industries : fallbackIndustries;

  return (
    <div className="py-8">
      <h3 className="text-xl font-semibold text-swiss-darkblue/70 mb-8 text-center">
        Alle Branchenlösungen
      </h3>
      
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-8 h-8 border-4 border-swiss-red/20 border-t-swiss-red rounded-full animate-spin"></div>
        </div>
      ) : (
        <Carousel
          opts={{
            align: "start",
            loop: true
          }}
          className="w-full"
        >
          <CarouselContent>
            {dataToDisplay.map((category) => (
              <CarouselItem key={category.category} className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-4 pr-2">
                <Card className="h-full border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm uppercase tracking-wider text-swiss-darkblue/60 font-medium">
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-1">
                      {category.items.map((industry) => (
                        <motion.div 
                          key={industry.id}
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Link
                            to={`/website-redesign/branche/${industry.slug}`}
                            className="group flex items-center py-1.5 text-gray-500 hover:text-swiss-red transition-colors duration-200"
                          >
                            <ChevronRight className="h-3 w-3 mr-1.5 text-gray-300 group-hover:text-swiss-red transition-colors duration-200" />
                            <span className="text-sm">{industry.name}</span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-4">
              <CarouselPrevious className="relative static left-0 translate-y-0 h-9 w-9" />
              <CarouselNext className="relative static right-0 translate-y-0 h-9 w-9" />
            </div>
          </div>
        </Carousel>
      )}
    </div>
  );
};
