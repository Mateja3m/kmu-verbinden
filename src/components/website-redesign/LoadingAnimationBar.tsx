
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Search, 
  Paintbrush, 
  Users, 
  Gauge, 
  FileText
} from 'lucide-react';

const analysisSteps = [
  { id: 1, label: "Analysiere Homepage...", icon: Globe },
  { id: 2, label: "Analysiere Suchmaschinenresultate...", icon: Search },
  { id: 3, label: "Analysiere Design...", icon: Paintbrush },
  { id: 4, label: "Prüfe Nutzerfreundlichkeit...", icon: Users },
  { id: 5, label: "Teste Performance...", icon: Gauge },
  { id: 6, label: "Erstelle Analysebericht...", icon: FileText }
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
  
  const currentStepData = analysisSteps[currentStep - 1];
  const IconComponent = currentStepData?.icon || Globe;
  
  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500"
          style={{ width: `${progress}%` }}
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      {/* Current step display with icon */}
      <motion.div 
        key={currentStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3"
      >
        <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <IconComponent className="h-6 w-6 text-blue-300" />
          </motion.div>
        </div>
        <div>
          <div className="text-white/80 font-medium text-lg">
            {currentStepData?.label || "Analyse abgeschlossen"}
          </div>
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2 }}
            className="h-1 bg-blue-400/40 rounded-full mt-1"
          />
        </div>
      </motion.div>
      
      {/* Step indicators */}
      <div className="pt-2 grid grid-cols-6 gap-1">
        {analysisSteps.map((step) => (
          <motion.div
            key={step.id}
            className={`relative h-2 rounded-full ${
              step.id <= currentStep ? "bg-blue-400" : "bg-white/20"
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
          >
            {step.id === currentStep && (
              <motion.div
                className="absolute -top-1 left-0 right-0 bottom-0 bg-blue-400 rounded-full opacity-30"
                initial={{ scale: 1 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeOut" 
                }}
              />
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Steps summary */}
      <div className="flex flex-wrap justify-between pt-2 text-xs text-white/50">
        {analysisSteps.map((step) => (
          <div 
            key={step.id}
            className={`flex items-center gap-1 ${
              step.id <= currentStep ? "text-blue-300/80" : "text-white/40"
            }`}
          >
            <step.icon className={`h-3 w-3 ${
              step.id === currentStep ? "text-blue-300" : 
              step.id < currentStep ? "text-blue-400/80" : "text-white/40"
            }`} />
            <span className="hidden sm:inline">{step.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
