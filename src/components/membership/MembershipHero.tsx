import { Button } from "@/components/ui/button";

interface MembershipHeroProps {
  onGetStartedClick: () => void;
}

const MembershipHero = ({ onGetStartedClick }: MembershipHeroProps) => {
  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/lovable-uploads/dfba018c-974e-47e2-8d85-33ea428327a1.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Content positioned in lower third with semi-transparent background */}
      <div className="absolute bottom-16 left-0 right-0 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg py-8 px-6">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl mb-6 text-swiss-darkblue">
              Werden Sie Mitglied im KMU Verein
            </h1>
            <p className="text-xl mb-8 text-swiss-darkblue">
              Nutzen Sie exklusive Vorteile, vernetzen Sie sich mit Branchenführern und treiben Sie Ihr Unternehmen voran.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                className="bg-swiss-darkblue text-white hover:bg-swiss-darkblue/90 text-lg px-8 py-6"
                onClick={onGetStartedClick}
              >
                Jetzt Mitglied werden
              </Button>
              <Button
                variant="outline"
                className="border-swiss-darkblue text-swiss-darkblue hover:bg-swiss-darkblue/10 text-lg px-8 py-6"
                onClick={() => window.location.href = '/auth'}
              >
                Anmelden
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipHero;