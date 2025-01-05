import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Monitor, Users, Award, Lightbulb, Network, FileText, BadgeCheck, Bot } from 'lucide-react';
import { benefits } from './Benefits';
import { cn } from '@/lib/utils';

export const BenefitsSlider = ({ activeIndex, setActiveIndex }: { 
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}) => {
  const [api, setApi] = useState<any>();

  useEffect(() => {
    if (!api) return;
    api.scrollTo(activeIndex);
  }, [activeIndex, api]);

  const renderIcon = (IconComponent: React.ElementType) => {
    return <IconComponent size={48} className="text-white" />;
  };

  // Map benefits to their corresponding background images
  const benefitBackgrounds = {
    "Multimediale Sichtbarkeit": "/lovable-uploads/0acf33a2-7fab-4e4c-8c4a-07c6053ae67b.png",
    "Redaktionelle Angebote": "/lovable-uploads/9073a767-a689-41cd-9749-71c1f54c69c3.png",
    "SKV-Partner Angebote": "/lovable-uploads/9073a767-a689-41cd-9749-71c1f54c69c3.png",
    "Experten-Positionierung": "/lovable-uploads/9073a767-a689-41cd-9749-71c1f54c69c3.png",
    "Netzwerk": "/lovable-uploads/9073a767-a689-41cd-9749-71c1f54c69c3.png",
    "KI-Beratung": "/lovable-uploads/9073a767-a689-41cd-9749-71c1f54c69c3.png",
    "Zertifizierung": "/lovable-uploads/9073a767-a689-41cd-9749-71c1f54c69c3.png",
    "Community": "/lovable-uploads/9073a767-a689-41cd-9749-71c1f54c69c3.png",
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
        setApi={setApi}
      >
        <CarouselContent>
          {benefits.map((benefit, index) => (
            <CarouselItem key={index} className="md:basis-1/1">
              <div className="relative h-[400px] w-full overflow-hidden rounded-xl">
                <img 
                  src={benefitBackgrounds[benefit.title] || "/lovable-uploads/9073a767-a689-41cd-9749-71c1f54c69c3.png"}
                  alt={benefit.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                  <div className={cn(
                    "mb-6 p-4 rounded-full bg-white/10 backdrop-blur-sm",
                    activeIndex === index ? "ring-2 ring-white" : ""
                  )}>
                    {renderIcon(benefit.icon)}
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-center">{benefit.title}</h3>
                  <p className="text-lg text-center max-w-2xl">{benefit.description}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-end gap-2 mt-4">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
};
