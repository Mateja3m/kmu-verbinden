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
      <h1 className="text-3xl font-bold text-swiss-darkblue mb-2">
        {companyName}
      </h1>
      <div className="flex items-center gap-2 text-yellow-500 mb-4">
        <Star className="h-6 w-6 fill-current" />
        <span className="text-xl font-medium">{averageRating}</span>
        <span className="text-gray-500 text-sm">
          ({totalReviews} Bewertungen)
        </span>
      </div>
      <p className="text-lg text-gray-600 mb-8">{description}</p>
      <div className="aspect-video relative overflow-hidden rounded-lg">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={companyName}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}