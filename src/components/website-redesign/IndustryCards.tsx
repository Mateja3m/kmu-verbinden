
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Building, Store, Stethoscope, Briefcase, BookOpen, ChefHat } from 'lucide-react';

interface IndustryCard {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: 'Building' | 'Store' | 'Stethoscope' | 'Briefcase' | 'BookOpen' | 'ChefHat';
}

interface IndustryCardsProps {
  cards: IndustryCard[];
  onCardClick: (cardId: string) => void;
  activeCardId?: string | null;
}

export const IndustryCards = ({ cards, onCardClick, activeCardId }: IndustryCardsProps) => {
  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'Building': return <Building className="h-6 w-6" />;
      case 'Store': return <Store className="h-6 w-6" />;
      case 'Stethoscope': return <Stethoscope className="h-6 w-6" />;
      case 'Briefcase': return <Briefcase className="h-6 w-6" />;
      case 'BookOpen': return <BookOpen className="h-6 w-6" />;
      case 'ChefHat': return <ChefHat className="h-6 w-6" />;
      default: return <Building className="h-6 w-6" />;
    }
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card) => (
          <div key={card.id} className="space-y-4">
            <motion.div 
              whileHover={{ 
                y: -8,
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              animate={{
                borderColor: activeCardId === card.id ? 'rgb(147, 197, 253)' : 'transparent',
                boxShadow: activeCardId === card.id 
                  ? '0 0 15px 5px rgba(147, 197, 253, 0.3)' 
                  : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
              }}
              className={`relative h-80 rounded-xl overflow-hidden cursor-pointer border-2 transition-colors duration-300
                ${activeCardId === card.id ? 'ring-4 ring-swiss-lightblue/50 shine-effect' : ''}`}
              onClick={() => onCardClick(card.id)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-95`}></div>
              
              {/* Card Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
                <div className="inline-flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    {getIcon(card.icon)}
                  </div>
                  <h3 className="text-2xl font-bold">{card.title}</h3>
                </div>
                
                <div>
                  <p className="mb-6 opacity-90 line-clamp-3">{card.description}</p>
                  <Button 
                    variant="outline" 
                    className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20 transition-all group"
                  >
                    {activeCardId === card.id ? 'Schließen' : 'Jetzt analysieren'}
                    <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};
