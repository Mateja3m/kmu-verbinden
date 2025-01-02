import Navigation from "@/components/Navigation";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackgroundPattern from "@/components/BackgroundPattern";

const Kontakt = () => {
  return (
    <BackgroundPattern>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <Contact />
        <Footer />
      </div>
    </BackgroundPattern>
  );
};

export default Kontakt;