import { Button } from "@/components/ui/button";

interface MembershipHeroProps {
  onGetStartedClick: () => void;
}

const MembershipHero = ({ onGetStartedClick }: MembershipHeroProps) => {
  return (
    <div className="relative bg-swiss-red pt-32 pb-20 text-white overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/lovable-uploads/dfba018c-974e-47e2-8d85-33ea428327a1.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          mixBlendMode: 'soft-light'
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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