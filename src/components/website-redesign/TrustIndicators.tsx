
import { Clock, Users, Shield } from 'lucide-react';

interface TrustIndicatorsProps {
  timeLeft: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  remainingSpots: number;
}

export const TrustIndicators = ({ timeLeft, remainingSpots }: TrustIndicatorsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
      <div className="flex items-center justify-center gap-2">
        <Shield className="h-5 w-5 text-swiss-red" />
        <span>Kostenlose Erstanalyse</span>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Clock className="h-5 w-5 text-swiss-red" />
        <span>
          Angebot endet in {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
        </span>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Users className="h-5 w-5 text-swiss-red" />
        <span>Noch {remainingSpots} Plätze verfügbar</span>
      </div>
    </div>
  );
};
