import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import InteractiveBenefits from "@/components/InteractiveBenefits";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";
import BackgroundPattern from "@/components/BackgroundPattern";

const Home = () => {
  return (
    <BackgroundPattern>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <Hero />
        <InteractiveBenefits />
        <Stats />
        <Footer />
      </div>
    </BackgroundPattern>
  );
};

export default Home;