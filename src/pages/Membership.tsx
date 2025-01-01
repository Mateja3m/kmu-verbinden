import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MembershipHero from "@/components/membership/MembershipHero";
import EnhancedBenefitsGrid from "@/components/membership/EnhancedBenefitsGrid";
import Testimonials from "@/components/membership/Testimonials";

const Membership = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <MembershipHero onGetStartedClick={() => {}} />
      <EnhancedBenefitsGrid />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Membership;