import { useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MembershipHero from "@/components/membership/MembershipHero";
import EnhancedBenefitsGrid from "@/components/membership/EnhancedBenefitsGrid";
import Testimonials from "@/components/membership/Testimonials";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Membership = () => {
  const navigate = useNavigate();
  const benefitsRef = useRef<HTMLDivElement>(null);

  const scrollToBenefits = () => {
    benefitsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <MembershipHero onGetStartedClick={scrollToBenefits} />
      <div ref={benefitsRef}>
        <EnhancedBenefitsGrid />
      </div>
      <div className="bg-swiss-darkblue py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Werden Sie jetzt Mitglied
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Registrieren Sie sich noch heute und profitieren Sie von allen Vorteilen einer SKV-Mitgliedschaft.
          </p>
          <Button 
            onClick={handleGetStarted}
            className="bg-swiss-red hover:bg-swiss-red/90 text-white px-8 py-6 text-lg"
          >
            Jetzt Mitglied werden
          </Button>
        </div>
      </div>
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Membership;