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
          <div className="aspect-square relative overflow-hidden rounded-lg mb-4 bg-gray-100">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={companyName}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(averageRating) ? "fill-current" : ""
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-medium">{averageRating}</span>
            <span className="text-gray-500 text-sm">
              ({totalReviews} {totalReviews === 1 ? 'Bewertung' : 'Bewertungen'})
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