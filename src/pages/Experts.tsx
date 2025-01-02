import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, LoaderCircle, AlertCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Experts() {
  const { data: experts, isLoading, error } = useQuery({
    queryKey: ['experts'],
    queryFn: async () => {
      console.log('Starting experts fetch...');
      try {
        const { data, error } = await supabase
          .from('experts')
          .select(`
            *,
            profile:profiles(company_name, contact_person)
          `)
          .eq('status', 'approved');
        
        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }
        
        console.log('Experts data:', data);
        return data;
      } catch (err) {
        console.error('Error in queryFn:', err);
        throw err;
      }
    }
  });

  console.log('Render state:', { isLoading, error, expertsCount: experts?.length });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-28 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-swiss-darkblue mb-4">
              Expertenrat
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Finden Sie qualifizierte Experten für Ihre geschäftlichen Herausforderungen
            </p>
          </div>

          {error && (
            <div className="text-center text-red-600 mb-8 flex items-center justify-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <span>Ein Fehler ist aufgetreten: {error.message}</span>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <LoaderCircle className="h-8 w-8 animate-spin text-swiss-red" />
            </div>
          ) : experts && experts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experts.map((expert) => (
                <Link key={expert.id} to={`/experts/${expert.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                        <img
                          src={expert.image_url || "/placeholder.svg"}
                          alt={expert.company_name || "Expert"}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <CardTitle className="text-xl mb-2">
                        {expert.company_name || "Unbenanntes Unternehmen"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{expert.expertise_area}</p>
                      <div className="space-y-2 text-sm text-gray-500">
                        {expert.city && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{expert.city}</span>
                          </div>
                        )}
                        {expert.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            <span>{expert.phone}</span>
                          </div>
                        )}
                        {expert.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            <span>{expert.email}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              Keine Experten gefunden. Bitte versuchen Sie es später erneut.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}