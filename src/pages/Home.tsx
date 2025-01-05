import { Suspense, lazy } from "react";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";
import BackgroundPattern from "@/components/BackgroundPattern";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

// Lazy load components that are not immediately visible
const Benefits = lazy(() => import("@/components/Benefits"));
const RandomPartnerShowcase = lazy(() => import("@/components/RandomPartnerShowcase"));

const Home = () => {
  return (
    <>
      <BackgroundPattern>
        <main className="flex-grow">
          <Hero />
          
          {/* Wrap non-critical components in Suspense */}
          <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
            <Benefits />
          </Suspense>
          
          <Stats />
          
          <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
            <RandomPartnerShowcase />
          </Suspense>
          
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
                    <Link to="/rechtsdienst">
                      <Button 
                        variant="outline" 
                        className="bg-transparent border-white text-white hover:bg-white hover:text-swiss-darkblue"
                      >
                        Mehr erfahren
                      </Button>
                    </Link>
                    <Button 
                      className="bg-swiss-red hover:bg-red-700 text-white"
                      onClick={() => window.location.href = 'mailto:termin@meinjurist.ch'}
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      Jetzt Termin vereinbaren
                    </Button>
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