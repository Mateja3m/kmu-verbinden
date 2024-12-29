import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative bg-luxury-gradient pt-32 pb-20 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-swiss-darkblue/90 to-swiss-red/90 mix-blend-multiply"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-bold sm:text-5xl md:text-6xl">
            <span className="block">Verbindungen schaffen für</span>
            <span className="block text-white/90 mt-2">Schweizer Unternehmen</span>
          </h1>
          <p className="mt-6 max-w-md mx-auto text-lg text-white/80 sm:text-xl md:mt-8 md:max-w-3xl">
            Stärken Sie Ihr Unternehmen mit dem SKV! Wir bieten innovative Lösungen für mehr Reichweite und neue Kunden.
          </p>
          <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-10">
            <Button className="rounded-md shadow-lg px-8 py-3 bg-white text-swiss-darkblue hover:bg-white/90 transition-colors duration-300 font-semibold">
              ZUR MITGLIEDSCHAFT →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;