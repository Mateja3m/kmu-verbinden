import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Experts() {
  const { data: experts, isLoading } = useQuery({
    queryKey: ['experts'],
    queryFn: async () => {
      console.log('Fetching experts...');
      const { data, error } = await supabase
        .from('experts')
        .select(`
          id,
          company_name,
          expertise_area,
          description,
          city,
          image_url
        `)
        .eq('status', 'approved');
      
      if (error) {
        console.error('Error fetching experts:', error);
        throw error;
      }
      
      console.log('Experts found:', data);
      return data;
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-28 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-swiss-darkblue mb-8 text-center">
            Expertenrat
          </h1>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <LoaderCircle className="h-8 w-8 animate-spin text-swiss-red" />
            </div>
          ) : experts && experts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experts.map((expert) => (
                <Card key={expert.id} className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-2 text-swiss-darkblue">
                      {expert.company_name || "Unbenanntes Unternehmen"}
                    </h2>
                    <p className="text-gray-600 mb-2 font-medium">
                      {expert.expertise_area}
                    </p>
                    {expert.city && (
                      <p className="text-gray-500 mb-4">{expert.city}</p>
                    )}
                    {expert.image_url && (
                      <div className="mb-4 aspect-video relative overflow-hidden rounded-lg">
                        <img
                          src={expert.image_url}
                          alt={expert.company_name || "Expert"}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <p className="text-gray-600 line-clamp-3">
                      {expert.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              Keine Experten gefunden.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}