import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  onChange: (rating: number) => void;
}

export function StarRating({ onChange }: StarRatingProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-8 w-8 cursor-pointer transition-colors ${
            star <= (hover || rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'
          }`}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => {
            setRating(star);
            onChange(star);
          }}
        />
      ))}
    </div>
  );
}