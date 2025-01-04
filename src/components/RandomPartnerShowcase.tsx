import { useEffect, useState } from 'react';
import { PartnerCard } from './PartnerCard';
import { nationalPartners, regionalPartners, cooperationPartners } from '@/data/partners';

const RandomPartnerShowcase = () => {
  const [randomPartners, setRandomPartners] = useState<any[]>([]);

  const getAllPartners = () => {
    return [...nationalPartners, ...regionalPartners, ...cooperationPartners];
  };

  const getRandomPartners = () => {
    const allPartners = getAllPartners();
    const shuffled = [...allPartners].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  };

  useEffect(() => {
    setRandomPartners(getRandomPartners());

    // Refresh partners every 10 seconds
    const interval = setInterval(() => {
      setRandomPartners(getRandomPartners());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Unsere Partner</h2>
        <p className="text-lg text-muted-foreground text-center mb-12">
          Entdecken Sie unsere vertrauenswürdigen Partner, die den Schweizerischen KMU Verein unterstützen
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {randomPartners.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RandomPartnerShowcase;