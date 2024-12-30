import { useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MembershipHero from "@/components/membership/MembershipHero";
import BenefitsGrid from "@/components/membership/BenefitsGrid";
import Testimonials from "@/components/membership/Testimonials";
import RegistrationForm from "@/components/membership/RegistrationForm";

const Membership = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <MembershipHero onGetStartedClick={scrollToForm} />
      <BenefitsGrid />
      <Testimonials />
      <div ref={formRef}>
        <RegistrationForm />
      </div>
      <Footer />
    </div>
  );
};

export default Membership;