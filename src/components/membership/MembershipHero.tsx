import { Button } from "@/components/ui/button";

interface MembershipHeroProps {
  onGetStartedClick: () => void;
}

const MembershipHero = ({ onGetStartedClick }: MembershipHeroProps) => {
  return (
    <div className="relative bg-luxury-gradient pt-32 pb-20 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-swiss-darkblue/90 to-swiss-red/90 mix-blend-multiply"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl mb-6">
          Werden Sie Mitglied im KMU Verein
        </h1>
        <p className="text-xl mb-8">
          Nutzen Sie exklusive Vorteile, vernetzen Sie sich mit Branchenführern und treiben Sie Ihr Unternehmen voran.
        </p>
        <div className="flex justify-center gap-4">
          <Button 
            className="bg-white text-swiss-darkblue hover:bg-white/90 text-lg px-8 py-6"
            onClick={onGetStartedClick}
          >
            Jetzt Mitglied werden
          </Button>
          <Button
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white/10 text-lg px-8 py-6"
            onClick={() => window.location.href = '/auth'}
          >
            Anmelden
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MembershipHero;