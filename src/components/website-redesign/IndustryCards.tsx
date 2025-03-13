
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

interface IndustryCard {
  id: string;
  title: string;
  description: string;
  color: string;
}

interface IndustryCardsProps {
  cards: IndustryCard[];
  onCardClick: (cardId: string) => void;
}

export const IndustryCards = ({ cards, onCardClick }: IndustryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cards.map((card) => (
        <motion.div 
          key={card.id}
          whileHover={{ 
            y: -8,
            scale: 1.02,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
          className="relative h-80 rounded-xl overflow-hidden cursor-pointer"
          onClick={() => onCardClick(card.id)}
        >
          <div className={`absolute inset-0 bg-gradient-to-b ${card.color} opacity-90`}></div>
          <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
            <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
            <p className="mb-6 opacity-90">{card.description}</p>
            <Button variant="outline" className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20">
              Jetzt analysieren
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
