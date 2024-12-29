import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PartnerSection } from "@/components/PartnerSection";
import { 
  nationalPartners, 
  regionalPartners, 
  cooperationPartners, 
  patronagePartners 
} from "@/data/partners";

const Partners = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <div className="bg-luxury-gradient text-white py-16">
          <div className="container">
            <h1 className="text-4xl font-bold mb-4">Unsere Partner</h1>
            <p className="text-xl">
              Entdecken Sie unser Netzwerk von vertrauenswürdigen Partnern, die den Schweizerischen KMU Verein unterstützen
            </p>
          </div>
        </div>

        <PartnerSection
          title="Nationale Partner"
          description="Größere Unternehmen mit landesweiter Präsenz, die Dienstleistungen in der ganzen Schweiz anbieten"
          partners={nationalPartners}
        />

        <PartnerSection
          title="Regionale Partner"
          description="Lokale Unternehmen, die spezifische Regionen bedienen und personalisierte, standortbezogene Dienstleistungen anbieten"
          partners={regionalPartners}
        />

        <PartnerSection
          title="Kooperationspartner"
          description="Strategische Geschäftspartnerschaften mit gegenseitigen Dienstleistungsangeboten"
          partners={cooperationPartners}
        />

        <PartnerSection
          title="Patronatspartner"
          description="Unterstützende Organisationen, Branchenführer und Verbände"
          partners={patronagePartners}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Partners;