import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Stats from "@/components/Stats";
import RandomPartnerShowcase from "@/components/RandomPartnerShowcase";
import Footer from "@/components/Footer";
import BackgroundPattern from "@/components/BackgroundPattern";
import { CalendlyButton } from "@/components/CalendlyButton";

const Home = () => {
  return (
    <>
      <BackgroundPattern>
        <main className="flex-grow">
          <Hero />
          <Benefits />
          <Stats />
          <RandomPartnerShowcase />
          
          {/* Legal Consultation Banner */}
          <div className="w-full py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="bg-swiss-darkblue text-white p-8 rounded-lg">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      Kostenlose Rechtsberatung für Mitglieder
                    </h2>
                    <p className="text-lg opacity-90">
                      Jeden Mittwoch Nachmittag - Sichern Sie sich Ihren Termin
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <CalendlyButton 
                      variant="outline"
                      className="bg-transparent border-white text-white hover:bg-white hover:text-swiss-darkblue"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </BackgroundPattern>
      <Footer />
    </>
  );
};

export default Home;