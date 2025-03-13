
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const analysisSteps = [
  { id: 1, label: "Analysiere Design..." },
  { id: 2, label: "Prüfe SEO-Optimierung..." },
  { id: 3, label: "Bewerte Technologie..." },
  { id: 4, label: "Teste Performance..." },
  { id: 5, label: "Analysiere Benutzerführung..." },
  { id: 6, label: "Erstelle Bericht..." }
];

export const LoadingAnimationBar = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Change steps for simulation
    const stepInterval = setInterval(() => {
      if (currentStep < analysisSteps.length) {
        setCurrentStep(prev => prev + 1);
      } else {
        clearInterval(stepInterval);
      }
    }, 1600);
    
    // Update progress continuously
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const targetProgress = (currentStep / analysisSteps.length) * 100;
        const nextProgress = Math.min(prev + 2, targetProgress);
        
        if (nextProgress >= 100) {
          clearInterval(progressInterval);
        }
        
        return nextProgress;
      });
    }, 100);
    
    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [currentStep]);
  
  return (
    <div className="space-y-4">
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-swiss-lightblue to-swiss-red"
          style={{ width: `${progress}%` }}
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      <div className="text-white/80 text-sm">
        {analysisSteps[currentStep - 1]?.label || "Analyse abgeschlossen"}
      </div>
      
      <div className="pt-2 grid grid-cols-6 gap-1">
        {analysisSteps.map((step) => (
          <motion.div
            key={step.id}
            className={`h-1 rounded-full ${
              step.id <= currentStep ? "bg-swiss-lightblue" : "bg-white/20"
            }`}
            initial={{ opacity: 0.4 }}
            animate={{ 
              opacity: step.id === currentStep ? 1 : 0.4,
              scale: step.id === currentStep ? [1, 1.2, 1] : 1
            }}
            transition={{ 
              duration: 0.5,
              repeat: step.id === currentStep ? Infinity : 0,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>
    </div>
  );
};
