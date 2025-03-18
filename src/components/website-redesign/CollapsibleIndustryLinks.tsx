
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { IndustryLinks } from './IndustryLinks';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { motion } from 'framer-motion';

export const CollapsibleIndustryLinks = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 pb-16">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full mx-auto"
      >
        <div className="flex justify-center">
          <CollapsibleTrigger asChild>
            <button 
              className="group relative w-full max-w-[200px] h-3 bg-swiss-red/80 hover:bg-swiss-red rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
              aria-label="Branchenspezifische Lösungen anzeigen oder ausblenden"
            >
              <span className="sr-only">
                {isOpen ? 'Branchenlinks ausblenden' : 'Branchenlinks anzeigen'}
              </span>
              
              <motion.div 
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute -bottom-4 bg-white rounded-full p-1 shadow-sm"
              >
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 text-swiss-red" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-swiss-red" />
                )}
              </motion.div>
            </button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="mt-12 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <IndustryLinks />
          </motion.div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
