import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PartnerSection } from "@/components/PartnerSection";
import BackgroundPattern from "@/components/BackgroundPattern";
import { 
  nationalPartners, 
  regionalPartners, 
  cooperationPartners, 
  patronagePartners 
} from "@/data/partners";

const Partners = () => {
  return (
    <BackgroundPattern>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow pt-20">
          <header 
            className="w-full relative bg-swiss-darkblue text-white"
            style={{
              minHeight: '300px'
            }}
          >
            {/* Background image with overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: 'url("/lovable-uploads/5170d096-dbb1-4435-8771-6cf135d8192a.png")',
              }}
            >
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-swiss-darkblue/75"></div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-16 relative z-10">
              <h1 className="text-4xl font-bold mb-4">Unsere Partner</h1>
              <p className="text-xl max-w-3xl">
                Entdecken Sie unser Netzwerk von vertrauenswürdigen Partnern, die den Schweizerischen KMU Verein unterstützen
              </p>
            </div>
          </header>

          <div className="container mx-auto px-4 py-8 bg-white/90">
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
          </div>
        </main>
        <Footer />
      </div>
    </BackgroundPattern>
  );
};

export default Partners;