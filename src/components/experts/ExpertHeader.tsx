import { Star } from "lucide-react";

interface ExpertHeaderProps {
  companyName: string;
  averageRating: number;
  totalReviews: number;
  description: string;
  imageUrl: string;
}

export function ExpertHeader({ 
  companyName, 
  averageRating, 
  totalReviews, 
  description, 
  imageUrl 
}: ExpertHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/3">
          <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={companyName}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex items-center gap-2 text-yellow-500">
            <Star className="h-6 w-6 fill-current" />
            <span className="text-xl font-medium">{averageRating}</span>
            <span className="text-gray-500 text-sm">
              ({totalReviews} Bewertungen)
            </span>
          </div>
        </div>
        
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold text-swiss-darkblue mb-4">
            {companyName}
          </h1>
          <p className="text-lg text-gray-600 whitespace-pre-wrap">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}