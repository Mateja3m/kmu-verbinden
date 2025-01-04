import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Stats from "@/components/Stats";
import RandomPartnerShowcase from "@/components/RandomPartnerShowcase";
import Footer from "@/components/Footer";
import BackgroundPattern from "@/components/BackgroundPattern";

const Home = () => {
  return (
    <BackgroundPattern>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <Hero />
        <Benefits />
        <Stats />
        <RandomPartnerShowcase />
        <Footer />
      </div>
    </BackgroundPattern>
  );
};

export default Home;