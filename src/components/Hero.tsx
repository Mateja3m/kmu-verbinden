import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import BackgroundPattern from './BackgroundPattern';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <BackgroundPattern className="absolute inset-0 z-0" />
      
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="flex flex-col items-center text-center">
          <div 
            className="w-full aspect-[3/1] max-w-[300px] sm:max-w-[400px] mb-8 relative"
            style={{ minHeight: '100px' }} // Prevent layout shift
          >
            <img
              src="/lovable-uploads/dc322c3e-2a15-42e7-9036-baf2deb11b0b.png"
              alt="SKV Logo"
              className="w-full h-full object-contain"
              width={400}
              height={133}
              loading="eager"
            />
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-swiss-darkblue mb-6">
            Schweizerischer KMU Verein
          </h1>
          
          <p className="text-lg sm:text-xl text-swiss-darkblue/90 leading-relaxed max-w-2xl mb-8">
            Nutzen Sie exklusive Vorteile, vernetzen Sie sich mit Branchenführern und treiben Sie Ihr Unternehmen voran. Werden Sie Teil unserer starken Gemeinschaft!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg" 
              className="bg-swiss-red hover:bg-swiss-red/90 text-white min-w-[200px]"
            >
              <Link to="/membership">
                Jetzt Mitglied werden
              </Link>
            </Button>
            
            <Button 
              asChild
              size="lg" 
              variant="outline"
              className="border-swiss-red text-swiss-red hover:bg-swiss-red/10 min-w-[200px]"
            >
              <Link to="/kontakt">
                Kontakt aufnehmen
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;