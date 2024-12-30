import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative bg-swiss-darkblue min-h-[80vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-swiss-darkblue via-swiss-darkblue to-swiss-red/60 mix-blend-multiply"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Werden Sie Mitglied im KMU Verein
            </h1>
            <p className="mt-6 text-xl text-white/90 leading-relaxed max-w-2xl">
              Nutzen Sie exklusive Vorteile, vernetzen Sie sich mit Branchenführern und treiben Sie Ihr Unternehmen voran.
            </p>
            <div className="mt-10">
              <Button 
                className="shine-effect text-lg px-8 py-6 bg-gradient-to-r from-swiss-red to-swiss-red/80 hover:from-swiss-red/90 hover:to-swiss-red/70 text-white border-none shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105"
              >
                Mitglied werden
              </Button>
            </div>
          </div>
          <div className="hidden lg:block lg:w-1/2 lg:pl-12 mt-10 lg:mt-0">
            <img
              src="https://static.wixstatic.com/media/0c82d3_2ad093992c9042fbaffe72bf4ea724c9~mv2.png"
              alt="KMU Magazine"
              className="w-full h-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;