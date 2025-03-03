
import Contact from "@/components/Contact";
import BackgroundPattern from "@/components/BackgroundPattern";

const Kontakt = () => {
  return (
    <BackgroundPattern>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <Contact />
        </main>
      </div>
    </BackgroundPattern>
  );
};

export default Kontakt;
