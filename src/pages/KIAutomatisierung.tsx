import BackgroundPattern from '@/components/BackgroundPattern';
import Footer from '@/components/Footer';
import HeroSection from '@/components/ki-automatisierung/HeroSection';
import IntroSection from '@/components/ki-automatisierung/IntroSection';
import PlatformFeatures from '@/components/ki-automatisierung/PlatformFeatures';
import BenefitsSection from '@/components/ki-automatisierung/BenefitsSection';
import CTASection from '@/components/ki-automatisierung/CTASection';

const KIAutomatisierung = () => {
  return (
    <>
      <BackgroundPattern>
        <div className="min-h-screen bg-gradient-to-b from-swiss-darkblue to-swiss-darkblue/90 text-white">
          <div className="container mx-auto px-4 py-32">
            <div className="max-w-4xl mx-auto space-y-12">
              <HeroSection />
              <IntroSection />
              <PlatformFeatures />
              <BenefitsSection />
              
              {/* Chat Integration */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 mb-12">
                <h2 className="text-2xl font-semibold mb-4">Sprechen Sie mit unserem KI-Experten von Evoya.ai</h2>
                <p className="mb-6">
                  Unser Partner Evoya.ai analysiert Ihre Anforderungen und erstellt einen massgeschneiderten Vorschlag für Ihr Unternehmen.
                </p>
                <div className="relative w-full aspect-[16/9] md:aspect-[2/1]">
                  <iframe 
                    className="absolute inset-0 w-full h-full rounded-lg"
                    src="https://avaia.io/chat/authorize-chat/2705b8b0-276f-4582-a41c-6ff896a461ad/"
                    width="100%"
                    height="600px"
                    frameBorder="0"
                    title="KI-Experte"
                  />
                </div>
              </div>
              
              <CTASection />
            </div>
          </div>
        </div>
      </BackgroundPattern>
      <Footer />
    </>
  );
};

export default KIAutomatisierung;