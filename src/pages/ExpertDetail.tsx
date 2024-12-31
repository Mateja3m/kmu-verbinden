import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Globe, Star, Building2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ExpertReviewForm } from "@/components/experts/ExpertReviewForm";
import { ExpertReviews } from "@/components/experts/ExpertReviews";

export default function ExpertDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: expert, isLoading } = useQuery({
    queryKey: ['expert', id],
    queryFn: async () => {
      console.log('Fetching expert details for ID:', id);
      const { data, error } = await supabase
        .from('experts')
        .select(`
          *,
          profile:profiles(company_name, contact_person),
          reviews:expert_reviews(
            id,
            rating,
            comment,
            is_anonymous,
            created_at,
            reviewer:profiles(company_name, contact_person)
          )
        `)
        .eq('id', id)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching expert:', error);
        throw error;
      }
      
      console.log('Fetched expert data:', data);
      return data;
    }
  });

  const calculateAverageRating = (reviews: any[]) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-64 bg-gray-200 rounded" />
                <div className="h-32 bg-gray-200 rounded" />
              </div>
              <div className="space-y-6">
                <div className="h-48 bg-gray-200 rounded" />
                <div className="h-48 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!expert) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Expert nicht gefunden
            </h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-swiss-darkblue mb-2">
                  {expert.company_name || expert.profile?.company_name}
                </h1>
                <div className="flex items-center gap-2 text-yellow-500 mb-4">
                  <Star className="h-6 w-6 fill-current" />
                  <span className="text-xl font-medium">
                    {calculateAverageRating(expert.reviews)}
                  </span>
                  <span className="text-gray-500 text-sm">
                    ({expert.reviews?.length || 0} Bewertungen)
                  </span>
                </div>
                <p className="text-lg text-gray-600">{expert.description}</p>
              </div>

              <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
                <img
                  src={expert.image_url || "/placeholder.svg"}
                  alt={expert.company_name || expert.profile?.company_name}
                  className="object-cover w-full h-full"
                />
              </div>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Dienstleistungen & Regionen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">Dienstleistungen</h3>
                      <ul className="list-disc list-inside text-gray-600">
                        {expert.services?.map((service: string) => (
                          <li key={service}>{service}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Regionen</h3>
                      <ul className="list-disc list-inside text-gray-600">
                        {expert.regions?.map((region: string) => (
                          <li key={region}>{region}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <ExpertReviews expertId={expert.id} reviews={expert.reviews} />
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Kontaktinformationen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {expert.profile?.contact_person && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Building2 className="h-5 w-5" />
                      <span>{expert.profile.contact_person}</span>
                    </div>
                  )}
                  {expert.address && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-5 w-5" />
                      <div>
                        <div>{expert.address}</div>
                        <div>{expert.postal_code} {expert.city}</div>
                      </div>
                    </div>
                  )}
                  {expert.phone && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="h-5 w-5" />
                      <a href={`tel:${expert.phone}`} className="hover:text-primary">
                        {expert.phone}
                      </a>
                    </div>
                  )}
                  {expert.email && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="h-5 w-5" />
                      <a href={`mailto:${expert.email}`} className="hover:text-primary">
                        {expert.email}
                      </a>
                    </div>
                  )}
                  {expert.website && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Globe className="h-5 w-5" />
                      <a 
                        href={expert.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-primary"
                      >
                        Website besuchen
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>

              <ExpertReviewForm expertId={expert.id} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}