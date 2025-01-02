import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { LoaderCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Experts() {
  console.log('Experts component rendered');
  
  const { data: experts, isLoading, error } = useQuery({
    queryKey: ['experts'],
    queryFn: async () => {
      console.log('Starting experts fetch...');
      const { data, error } = await supabase
        .from('experts')
        .select('id, company_name, expertise_area, description')
        .eq('status', 'approved');
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Experts fetch successful:', data);
      return data;
    }
  });

  console.log('Current state:', { isLoading, error, expertsCount: experts?.length });

  if (error) {
    console.error('Query error:', error);
    return <div>Error loading experts. Please try again later.</div>;
  }

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
                <Card key={expert.id}>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-2">
                      {expert.company_name || "Unbenanntes Unternehmen"}
                    </h2>
                    <p className="text-gray-600 mb-2">
                      {expert.expertise_area}
                    </p>
                    <p className="text-gray-600">
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