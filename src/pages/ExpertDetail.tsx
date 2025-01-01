import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ExpertHeader } from "@/components/experts/ExpertHeader";
import { ExpertServices } from "@/components/experts/ExpertServices";
import { ExpertContact } from "@/components/experts/ExpertContact";
import { ExpertReviews } from "@/components/experts/ExpertReviews";
import { ExpertReviewForm } from "@/components/experts/ExpertReviewForm";
import { Loader } from "lucide-react";

export default function ExpertDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: expert, isLoading } = useQuery({
    queryKey: ['expert', id],
    queryFn: async () => {
      console.log('Fetching expert details for ID:', id);
      if (!id) throw new Error('Expert ID is required');
      
      const { data: expertData, error: expertError } = await supabase
        .from('experts')
        .select(`
          *,
          profile:profiles(
            company_name,
            contact_person
          ),
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
        .single();
      
      if (expertError) {
        console.error('Error fetching expert:', expertError);
        throw expertError;
      }
      
      console.log('Fetched expert data:', expertData);
      return expertData;
    },
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow flex items-center justify-center">
          <Loader className="h-8 w-8 animate-spin text-swiss-red" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!expert) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow py-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Expert nicht gefunden
            </h1>
            <p className="text-gray-600">
              Der gesuchte Expert konnte nicht gefunden werden.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const calculateAverageRating = (reviews: any[]) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Number((sum / reviews.length).toFixed(1));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ExpertHeader
                companyName={expert.company_name || expert.profile?.company_name}
                averageRating={calculateAverageRating(expert.reviews)}
                totalReviews={expert.reviews?.length || 0}
                description={expert.description}
                imageUrl={expert.image_url}
              />

              <ExpertServices
                services={expert.services || []}
                regions={expert.regions || []}
              />

              <ExpertReviews 
                expertId={expert.id} 
                reviews={expert.reviews || []} 
              />
            </div>

            <div className="space-y-6">
              <ExpertContact
                contactPerson={expert.profile?.contact_person}
                address={expert.address}
                postalCode={expert.postal_code}
                city={expert.city}
                phone={expert.phone}
                email={expert.email}
                website={expert.website}
              />

              <ExpertReviewForm expertId={expert.id} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}