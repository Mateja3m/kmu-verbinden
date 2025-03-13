
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
}

export const FAQSection = ({ items }: FAQSectionProps) => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-swiss-gray/10 relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <div className="bg-swiss-lightblue/20 p-3 rounded-full">
              <HelpCircle className="h-8 w-8 text-swiss-darkblue" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-swiss-darkblue mb-6">
            Häufige Fragen
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Antworten auf die häufigsten Fragen zum Thema Website-Redesign
          </p>
        </motion.div>
        
        <Accordion type="single" collapsible className="bg-white rounded-xl shadow-md p-6">
          {items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 last:border-b-0">
              <AccordionTrigger className="text-lg font-medium text-swiss-darkblue hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
