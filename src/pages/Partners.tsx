import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PartnerSection } from "@/components/PartnerSection";

const Partners = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-swiss-darkblue mb-8">Unsere Partner</h1>
          <PartnerSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Partners;