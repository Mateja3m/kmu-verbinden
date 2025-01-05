import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface BenefitsSliderProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const benefits = [
  {
    id: 1,
    image: '/lovable-uploads/9073a767-a689-41cd-9749-71c1f54c69c3.png',
    title: 'SKV-Partner Angebote',
    description: 'Profitieren Sie von exklusiven Rabatten und Sonderkonditionen unserer Partner.'
  },
  {
    id: 2,
    image: '/lovable-uploads/710d5524-1ea6-450d-a56f-e200a0de134b.png',
    title: 'Zertifizierung',
    description: 'Stärken Sie Ihre Marktposition mit unserer anerkannten Zertifizierung.'
  },
  {
    id: 3,
    image: '/lovable-uploads/another-image.png',
    title: 'Vorteil 3',
    description: 'Beschreibung für Vorteil 3.'
  },
  {
    id: 4,
    image: '/lovable-uploads/yet-another-image.png',
    title: 'Vorteil 4',
    description: 'Beschreibung für Vorteil 4.'
  },
  {
    id: 5,
    image: '/lovable-uploads/fifth-image.png',
    title: 'Vorteil 5',
    description: 'Beschreibung für Vorteil 5.'
  },
];

const BenefitsSlider = ({ activeIndex, setActiveIndex }: BenefitsSliderProps) => {
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % benefits.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [setActiveIndex]);

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % benefits.length);
  };

  const prevSlide = () => {
    setActiveIndex((current) => (current - 1 + benefits.length) % benefits.length);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="relative overflow-hidden rounded-xl bg-white shadow-lg">
        <div 
          className="aspect-[16/9] w-full relative"
          style={{ minHeight: '300px' }}
        >
          <img
            src={benefits[activeIndex].image}
            alt={benefits[activeIndex].title}
            className="w-full h-full object-cover"
            width={1280}
            height={720}
            loading="lazy"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{benefits[activeIndex].title}</h3>
              <p className="text-lg opacity-90">{benefits[activeIndex].description}</p>
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-lg"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {benefits.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === activeIndex ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BenefitsSlider;