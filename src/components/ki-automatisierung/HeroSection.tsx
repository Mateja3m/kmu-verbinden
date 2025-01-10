import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="text-center space-y-6 mb-12">
      <div className="flex justify-center mb-8">
        <img 
          src="https://evoya.ai/wp-content/uploads/2020/11/evoya-ai-logo-medium-768x174.png"
          alt="Evoya.ai Logo"
          className="h-16 object-contain bg-white/10 backdrop-blur-sm rounded-xl p-4"
        />
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
        Evoya.ai – Ihre Plattform für smarte KI-Lösungen und Automatisierung
      </h1>
      <p className="text-xl md:text-2xl text-gray-200 mt-4">
        Mit der Evoya-Plattform bringen Sie Ihre Geschäftsprozesse auf das nächste Level: Nutzen Sie modernste KI-Technologien und maßgeschneiderte Automatisierungen, um Ihre Effizienz zu steigern und Kosten zu senken.
      </p>
    </div>
  );
};

export default HeroSection;