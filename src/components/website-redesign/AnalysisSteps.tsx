
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from 'framer-motion';
import { LoadingAnimationBar } from './LoadingAnimationBar';
import { Search, ArrowRight, Check } from 'lucide-react';

interface AnalysisStepsProps {
  step: number;
  isAnalyzing: boolean;
  websiteUrl: string;
  improvements: string[];
  onWebsiteSubmit: (e: React.FormEvent) => void;
  onWebsiteUrlChange: (url: string) => void;
  onImprovementSelect: (improvement: string) => void;
  onStartConsultation: () => void;
  industryId?: string;
}

export const AnalysisSteps = ({
  step,
  isAnalyzing,
  websiteUrl,
  improvements,
  onWebsiteSubmit,
  onWebsiteUrlChange,
  onImprovementSelect,
  onStartConsultation,
  industryId
}: AnalysisStepsProps) => {
  const [selectedImprovements, setSelectedImprovements] = useState<string[]>([]);

  const handleImprovementToggle = (improvement: string) => {
    if (selectedImprovements.includes(improvement)) {
      setSelectedImprovements(selectedImprovements.filter(item => item !== improvement));
    } else {
      setSelectedImprovements([...selectedImprovements, improvement]);
    }
    
    onImprovementSelect(improvement);
  };

  return (
    <div className="space-y-10">
      {step === 1 && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Website-Analyse starten</h3>
            <p className="text-lg text-white/80">
              Geben Sie Ihre Website-URL ein und erhalten Sie eine kostenlose Analyse.
              {industryId && " Speziell auf Ihre Branche zugeschnitten."}
            </p>
          </div>
          
          <form onSubmit={onWebsiteSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="url"
                placeholder="www.ihre-website.ch"
                value={websiteUrl}
                onChange={(e) => onWebsiteUrlChange(e.target.value)}
                className="pl-10 py-6 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-swiss-lightblue focus:border-swiss-lightblue"
                required
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full py-6 text-lg bg-swiss-red hover:bg-swiss-red/90 text-white"
              disabled={isAnalyzing || !websiteUrl}
            >
              {isAnalyzing ? "Analysiere..." : "Website jetzt analysieren"}
            </Button>
          </form>
          
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <LoadingAnimationBar />
            </motion.div>
          )}
        </div>
      )}
      
      {step === 2 && (
        <div className="space-y-8">
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 text-white mb-4"
            >
              <Check className="h-8 w-8" />
            </motion.div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Analyse abgeschlossen!</h3>
            <p className="text-lg text-white/80">
              Wir haben folgende Verbesserungspotenziale für Ihre Website identifiziert:
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {improvements.map((improvement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div
                  className={`p-4 rounded-lg border border-white/30 cursor-pointer transition-all ${
                    selectedImprovements.includes(improvement)
                      ? "bg-white/20 border-white"
                      : "bg-white/10 hover:bg-white/15"
                  }`}
                  onClick={() => handleImprovementToggle(improvement)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full border ${
                      selectedImprovements.includes(improvement)
                        ? "bg-swiss-red border-swiss-red"
                        : "border-white/50"
                    } flex items-center justify-center mt-0.5`}>
                      {selectedImprovements.includes(improvement) && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <span className="text-white">{improvement}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="pt-6">
            <Button
              onClick={onStartConsultation}
              className="w-full py-6 text-lg bg-swiss-red hover:bg-swiss-red/90 text-white group"
            >
              Kostenlose Beratung vereinbaren
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
