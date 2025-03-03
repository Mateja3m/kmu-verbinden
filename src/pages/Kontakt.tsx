
import Navigation from "@/components/Navigation";
import Contact from "@/components/Contact";
import BackgroundPattern from "@/components/BackgroundPattern";

const Kontakt = () => {
  return (
    <BackgroundPattern>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <Contact />
      </div>
    </BackgroundPattern>
  );
};

export default Kontakt;
