import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ExpertPreview } from "@/components/experts/ExpertPreview";
import { LoaderCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Fallback data in case no experts are found
const fallbackExperts = [
  {
    id: "fallback-1",
    company_name: "Digital Solutions AG",
    contact_person: "Maria Schmidt",
    expertise_area: "Digitale Transformation",
    description: "Spezialisiert auf die digitale Transformation von KMU mit über 15 Jahren Erfahrung.",
    services: ["Digitalisierung", "Prozessoptimierung", "Cloud Migration"],
    image_url: "/placeholder.svg",
    logo_url: "/placeholder.svg"
  },
  {
    id: "fallback-2",
    company_name: "KMU Consulting GmbH",
    contact_person: "Thomas Weber",
    expertise_area: "Unternehmensberatung",
    description: "Ganzheitliche Beratung für KMU mit Fokus auf nachhaltigem Wachstum.",
    services: ["Strategieberatung", "Finanzplanung", "Organisationsentwicklung"],
    image_url: "/placeholder.svg",
    logo_url: "/placeholder.svg"
  }
];

export default function Experts() {
  console.log('Experts component rendered');
  
  const { data: experts, isLoading } = useQuery({
    queryKey: ['experts'],
    queryFn: async () => {
      console.log('Starting experts fetch...');
      const { data, error } = await supabase
        .from('experts')
        .select('*')
        .eq('status', 'approved');
      
      if (error) {
        console.error('Supabase error:', error);
        return fallbackExperts; // Use fallback data if there's an error
      }
      
      console.log('Experts fetch successful:', data);
      return data?.length > 0 ? data : fallbackExperts; // Use fallback if no data
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
          ) : experts ? (
            <div className="grid grid-cols-1 gap-8">
              {experts.map((expert) => (
                <ExpertPreview key={expert.id} formData={expert} />
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