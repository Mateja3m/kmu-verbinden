import { useState, useEffect, createElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Gavel, Network, FileText, BadgeCheck, Lightbulb } from 'lucide-react';

const benefits = [
  {
    icon: Users,
    title: "Netzwerk",
    description: "Vernetzen Sie sich mit anderen KMU und profitieren Sie vom Erfahrungsaustausch"
  },
  {
    icon: Gavel,
    title: "Rechtsdienst",
    description: "Kostenlose Rechtsberatung für alle Mitglieder"
  },
  {
    icon: Network,
    title: "Partner",
    description: "Exklusive Partnerangebote und Vergünstigungen"
  },
  {
    icon: FileText,
    title: "Unternehmensblick",
    description: "Unser Magazin mit wertvollen Insights und Neuigkeiten"
  },
  {
    icon: BadgeCheck,
    title: "Zertifizierung",
    description: "Offizielles Mitgliederzertifikat für Ihr Unternehmen"
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Zugang zu den neuesten Trends und Entwicklungen"
  }
];

const InteractiveBenefits = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % benefits.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-16 bg-gradient-to-br from-white to-swiss-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-swiss-darkblue mb-4">
            Ihre Vorteile als Mitglied
          </h2>
          <p className="text-lg text-gray-600">
            Entdecken Sie die exklusiven Vorteile unserer Mitgliedschaft
          </p>
        </div>
        
        <div className="relative h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6 p-4 bg-swiss-red rounded-full text-white"
              >
                {createElement(benefits[currentIndex].icon, { size: 48 })}
              </motion.div>
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-swiss-darkblue mb-4"
              >
                {benefits[currentIndex].title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-600 max-w-md"
              >
                {benefits[currentIndex].description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
          
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 pb-4">
            {benefits.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-swiss-red scale-125' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveBenefits;