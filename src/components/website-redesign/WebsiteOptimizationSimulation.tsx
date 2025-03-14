
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Check, Code, Image, Search, Smartphone, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LoadingAnimationBar } from './LoadingAnimationBar';

export function WebsiteOptimizationSimulation() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationComplete, setOptimizationComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [metrics, setMetrics] = useState({
    performance: 42,
    seo: 58,
    accessibility: 49,
    mobile: 51
  });
  
  const steps = [
    { name: "Code Optimization", icon: Code, color: "from-blue-400 to-blue-600" },
    { name: "Image Compression", icon: Image, color: "from-green-400 to-green-600" },
    { name: "SEO Enhancement", icon: Search, color: "from-amber-400 to-amber-600" },
    { name: "Mobile Responsive", icon: Smartphone, color: "from-purple-400 to-purple-600" },
    { name: "Performance Boost", icon: Zap, color: "from-red-400 to-red-600" }
  ];
  
  // Reset the simulation
  const handleReset = () => {
    setIsOptimizing(false);
    setOptimizationComplete(false);
    setCurrentStep(0);
    setMetrics({
      performance: 42,
      seo: 58,
      accessibility: 49,
      mobile: 51
    });
  };
  
  // Start the optimization process
  const handleStartOptimization = () => {
    setIsOptimizing(true);
    setOptimizationComplete(false);
    
    // Simulate stepping through optimization phases
    let step = 0;
    const interval = setInterval(() => {
      if (step < steps.length) {
        setCurrentStep(step);
        
        // Update metrics as we progress through steps
        setMetrics(prev => {
          const updatedMetrics = { ...prev };
          const keys = Object.keys(updatedMetrics);
          const keyToUpdate = keys[step % keys.length];
          
          // @ts-ignore
          updatedMetrics[keyToUpdate] = Math.min(100, updatedMetrics[keyToUpdate] + 10 + Math.floor(Math.random() * 5));
          return updatedMetrics;
        });
        
        step++;
      } else {
        clearInterval(interval);
        setOptimizationComplete(true);
        
        // Final boost to all metrics
        setMetrics({
          performance: 97,
          seo: 94,
          accessibility: 91,
          mobile: 98
        });
      }
    }, 1500);
    
    return () => clearInterval(interval);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden relative">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Before optimization side */}
        <div className={`p-6 ${optimizationComplete ? 'opacity-50' : ''} transition-opacity duration-500`}>
          <div className="text-sm font-semibold text-gray-500 mb-2">BEFORE</div>
          
          <div className="relative h-[240px] mb-4 overflow-hidden rounded-lg bg-gray-100">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300">
              <div className="absolute top-6 left-0 w-full h-6 bg-gray-400 opacity-40"></div>
              <div className="absolute top-16 left-4 w-1/3 h-8 bg-gray-400 opacity-60 rounded"></div>
              <div className="absolute top-16 right-4 w-1/3 h-8 bg-gray-400 opacity-60 rounded"></div>
              <div className="absolute top-28 left-4 w-2/3 h-4 bg-gray-400 opacity-40 rounded"></div>
              <div className="absolute top-36 left-4 w-5/6 h-4 bg-gray-400 opacity-40 rounded"></div>
              <div className="absolute top-44 left-4 w-3/4 h-4 bg-gray-400 opacity-40 rounded"></div>
              <div className="absolute top-52 left-4 w-1/4 h-8 bg-gray-500 opacity-50 rounded"></div>
            </div>
            <div className="absolute inset-0 bg-gray-900/10"></div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium text-gray-700">Performance</span>
                <span className="text-xs font-medium text-gray-700">{metrics.performance}%</span>
              </div>
              <Progress value={metrics.performance} className="h-2 bg-gray-200" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium text-gray-700">SEO</span>
                <span className="text-xs font-medium text-gray-700">{metrics.seo}%</span>
              </div>
              <Progress value={metrics.seo} className="h-2 bg-gray-200" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium text-gray-700">Accessibility</span>
                <span className="text-xs font-medium text-gray-700">{metrics.accessibility}%</span>
              </div>
              <Progress value={metrics.accessibility} className="h-2 bg-gray-200" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium text-gray-700">Mobile</span>
                <span className="text-xs font-medium text-gray-700">{metrics.mobile}%</span>
              </div>
              <Progress value={metrics.mobile} className="h-2 bg-gray-200" />
            </div>
          </div>
        </div>
        
        {/* After optimization side */}
        <div className={`p-6 ${!optimizationComplete && !isOptimizing ? 'opacity-50' : ''} transition-opacity duration-500 bg-gradient-to-br from-white to-swiss-gray/10`}>
          <div className="text-sm font-semibold text-swiss-red mb-2">AFTER</div>
          
          <div className="relative h-[240px] mb-4 overflow-hidden rounded-lg bg-gray-100 shadow-md">
            {isOptimizing && !optimizationComplete ? (
              <div className="absolute inset-0 flex items-center justify-center bg-swiss-darkblue/90">
                <div className="w-5/6">
                  <LoadingAnimationBar />
                </div>
              </div>
            ) : null}
            
            {/* Optimized website mockup */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${optimizationComplete ? 'opacity-100' : 'opacity-0'}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white to-swiss-gray/30">
                <div className="absolute top-0 left-0 w-full h-12 bg-swiss-darkblue flex items-center px-4">
                  <div className="w-32 h-6 bg-white/20 rounded"></div>
                  <div className="ml-auto flex space-x-4">
                    <div className="w-16 h-6 bg-white/20 rounded"></div>
                    <div className="w-16 h-6 bg-white/20 rounded"></div>
                    <div className="w-16 h-6 bg-white/20 rounded"></div>
                  </div>
                </div>
                <div className="absolute top-16 left-4 w-1/2 h-10 bg-swiss-darkblue/80 rounded"></div>
                <div className="absolute top-16 right-4 w-1/3 h-10 bg-swiss-red rounded shadow-sm"></div>
                <div className="absolute top-32 left-4 w-2/3 h-5 bg-gray-700 rounded"></div>
                <div className="absolute top-40 left-4 w-5/6 h-4 bg-gray-600 rounded"></div>
                <div className="absolute top-48 left-4 w-3/4 h-4 bg-gray-600 rounded"></div>
                <div className="absolute top-56 left-4 w-1/4 h-8 bg-swiss-red rounded shadow-sm"></div>
              </div>
              <div className="absolute inset-0 bg-blue-500/5"></div>
            </div>
            
            {!isOptimizing && !optimizationComplete ? (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <Button 
                  onClick={handleStartOptimization}
                  size="lg"
                  className="bg-swiss-red hover:bg-swiss-red/90 text-white"
                >
                  Start Optimization <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ) : null}
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium text-gray-700">Performance</span>
                <span className="text-xs font-medium text-gray-700">{optimizationComplete ? '97%' : isOptimizing ? `${metrics.performance}%` : '42%'}</span>
              </div>
              <Progress 
                value={optimizationComplete ? 97 : metrics.performance} 
                className={`h-2 ${optimizationComplete ? 'bg-gray-200' : 'bg-gray-200'}`} 
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium text-gray-700">SEO</span>
                <span className="text-xs font-medium text-gray-700">{optimizationComplete ? '94%' : isOptimizing ? `${metrics.seo}%` : '58%'}</span>
              </div>
              <Progress 
                value={optimizationComplete ? 94 : metrics.seo} 
                className={`h-2 ${optimizationComplete ? 'bg-gray-200' : 'bg-gray-200'}`}
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium text-gray-700">Accessibility</span>
                <span className="text-xs font-medium text-gray-700">{optimizationComplete ? '91%' : isOptimizing ? `${metrics.accessibility}%` : '49%'}</span>
              </div>
              <Progress 
                value={optimizationComplete ? 91 : metrics.accessibility} 
                className={`h-2 ${optimizationComplete ? 'bg-gray-200' : 'bg-gray-200'}`}
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium text-gray-700">Mobile</span>
                <span className="text-xs font-medium text-gray-700">{optimizationComplete ? '98%' : isOptimizing ? `${metrics.mobile}%` : '51%'}</span>
              </div>
              <Progress 
                value={optimizationComplete ? 98 : metrics.mobile} 
                className={`h-2 ${optimizationComplete ? 'bg-gray-200' : 'bg-gray-200'}`}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Optimization steps */}
      {isOptimizing && (
        <motion.div 
          className="px-6 py-4 bg-gradient-to-r from-swiss-gray/20 to-swiss-lightblue/10 border-t border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-4 overflow-x-auto pb-2">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isCompleted = index < currentStep;
              const isActive = index === currentStep;
              
              return (
                <div 
                  key={index}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-full
                    ${isCompleted ? 'text-white bg-gradient-to-r from-swiss-darkblue to-swiss-darkblue/80' :
                      isActive ? 'text-white bg-gradient-to-r from-swiss-red to-swiss-red/80 animate-pulse' : 
                      'text-gray-600 bg-white border border-gray-200'} 
                    transition-all duration-300 min-w-max`}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <StepIcon className="h-4 w-4" />
                  )}
                  <span className="text-xs font-medium">{step.name}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
      
      {/* Reset button (only shown when optimization is complete) */}
      {optimizationComplete && (
        <div className="px-6 py-4 bg-gradient-to-r from-swiss-gray/20 to-swiss-lightblue/10 border-t border-gray-200 flex justify-center">
          <Button 
            onClick={handleReset}
            variant="outline" 
            className="border-swiss-darkblue text-swiss-darkblue hover:bg-swiss-darkblue hover:text-white"
          >
            Reset Simulation
          </Button>
        </div>
      )}
    </div>
  );
}
