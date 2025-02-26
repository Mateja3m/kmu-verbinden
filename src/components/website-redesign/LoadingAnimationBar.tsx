
import React, { useEffect, useState } from 'react';
import { Code, Search, Layout, LineChart, Gauge, Globe } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface LoadingAnimationBarProps {
  websiteUrl: string;
  isAnalyzing: boolean;
}

export const LoadingAnimationBar = ({ websiteUrl, isAnalyzing }: LoadingAnimationBarProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const analysisTasks = [
    { icon: Layout, text: 'Analysiere Design', duration: 1500 },
    { icon: Search, text: 'Prüfe SEO-Optimierung', duration: 2000 },
    { icon: Code, text: 'Überprüfe Technologie', duration: 1800 },
    { icon: Gauge, text: 'Teste Performance', duration: 1600 },
    { icon: LineChart, text: 'Analysiere UX', duration: 1700 },
    { icon: Globe, text: 'Erstelle Bericht', duration: 1400 }
  ];

  useEffect(() => {
    if (!isAnalyzing) {
      setCurrentStep(0);
      setProgress(0);
      return;
    }

    let stepIndex = 0;
    const progressIncrement = 100 / analysisTasks.length;

    const runAnalysis = () => {
      if (stepIndex < analysisTasks.length) {
        setCurrentStep(stepIndex);
        setProgress((stepIndex + 1) * progressIncrement);
        
        setTimeout(() => {
          stepIndex++;
          runAnalysis();
        }, analysisTasks[stepIndex].duration);
      }
    };

    runAnalysis();
  }, [isAnalyzing]);

  if (!isAnalyzing) return null;

  const CurrentIcon = analysisTasks[currentStep]?.icon || Globe;

  return (
    <div className="space-y-4 animate-fade-in">
      <Progress value={progress} className="h-2" />
      
      <div className="flex items-center gap-3 text-white/90">
        <CurrentIcon className="h-5 w-5 animate-pulse" />
        <span className="text-sm">
          {analysisTasks[currentStep]?.text} von {websiteUrl}...
        </span>
      </div>
    </div>
  );
};
