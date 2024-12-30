import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";

interface Review {
  id: string;
  rating: number;
  comment: string;
  is_anonymous: boolean;
  created_at: string;
  reviewer: {
    company_name: string;
    contact_person: string;
  };
}

interface ExpertReviewsProps {
  expertId: string;
  reviews: Review[];
}

export function ExpertReviews({ reviews }: ExpertReviewsProps) {
  const publicReviews = reviews?.filter(review => !review.is_anonymous) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bewertungen</CardTitle>
      </CardHeader>
      <CardContent>
        {publicReviews.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            Noch keine Bewertungen vorhanden
          </p>
        ) : (
          <div className="space-y-6">
            {publicReviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < review.rating ? 'fill-current' : ''}`}
                        />
                      ))}
                    </div>
                    <span className="font-medium">
                      {review.is_anonymous ? 'Anonym' : review.reviewer?.company_name}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {format(new Date(review.created_at), 'PP', { locale: de })}
                  </span>
                </div>
                {review.comment && (
                  <p className="text-gray-600">{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}