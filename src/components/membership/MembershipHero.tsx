import { Button } from "@/components/ui/button";

interface MembershipHeroProps {
  onGetStartedClick: () => void;
}

const MembershipHero = ({ onGetStartedClick }: MembershipHeroProps) => {
  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Background Image with dark overlay */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/lovable-uploads/b0a3550a-eec4-4b1d-aae6-f47df4bb6168.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Content positioned lower */}
      <div className="absolute bottom-8 left-0 right-0 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl mb-6 text-white">
            Werden Sie Mitglied im KMU Verein
          </h1>
          <p className="text-xl mb-8 text-white">
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
    </div>
  );
};

export default MembershipHero;