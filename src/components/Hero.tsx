import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Hero = () => {
  const headlines = [
    "Multimediale Sichtbarkeit",
    "Redaktionelle Angebote",
    "SKV Partner Angebote",
    "Experten Positionierung",
    "Stärken Sie Ihr Unternehmen"
  ];

  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isTyping) {
      if (displayText.length < headlines[currentIndex].length) {
        timeout = setTimeout(() => {
          setDisplayText(headlines[currentIndex].slice(0, displayText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
      } else {
        setCurrentIndex((prev) => (prev + 1) % headlines.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isTyping, headlines]);

  return (
    <div className="relative bg-gradient-to-br from-white via-white to-[#F0F9FF] min-h-[80vh] flex items-center">
      <div className="absolute inset-0" style={{
        backgroundImage: `url('data:image/svg+xml;base64,${btoa(`
          <svg width="7" height="7" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 7L7 0M7 7L14 0M0 0L-7 7M7 14L0 7" 
                  stroke="#93C5FD" 
                  stroke-width="0.5" 
                  stroke-opacity="0.5" 
                  fill="none"/>
          </svg>
        `)}')`,
        backgroundSize: '7px 7px',
        opacity: '0.7'
      }}></div>
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-swiss-darkblue leading-tight min-h-[1.2em]">
              {displayText}
              <span className="animate-pulse">|</span>
            </h1>
            <p className="text-lg sm:text-xl text-swiss-darkblue/90 leading-relaxed max-w-2xl">
              Nutzen Sie exklusive Vorteile, vernetzen Sie sich mit Branchenführern und treiben Sie Ihr Unternehmen voran.
            </p>
            <div className="pt-4">
              <Button 
                className="w-full sm:w-auto shine-effect text-lg px-6 sm:px-8 py-4 sm:py-6 bg-swiss-red hover:bg-swiss-red/90 text-white border-none shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105"
              >
                Mitglied werden
              </Button>
            </div>
          </div>
          <div className="hidden lg:block lg:w-1/2 lg:pl-12">
            <img
              src="https://static.wixstatic.com/media/0c82d3_2ad093992c9042fbaffe72bf4ea724c9~mv2.png"
              alt="KMU Magazine"
              className="w-full h-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
              loading="eager"
              decoding="async"
              width="600"
              height="400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;