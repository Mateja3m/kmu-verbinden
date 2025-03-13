
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AnalysisSteps } from './AnalysisSteps';
import { ConsultationForm } from './ConsultationForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Globe } from 'lucide-react';

interface WebsiteCheckSectionProps {
  industryId?: string;
}

export const WebsiteCheckSection = ({ industryId }: WebsiteCheckSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(!!industryId);
  const [currentStep, setCurrentStep] = useState(1);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [improvements, setImprovements] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    step: 1,
    platform: '',
    challenges: '',
    companyName: '',
    industry: industryId || '',
    employeeCount: '',
    monthlyVisitors: '',
    contactPerson: '',
    email: '',
    phone: '',
    preferredTime: '',
    newsletter: false,
    privacyAccepted: false,
    improvements: [] as string[],
    websiteUrl: ''
  });

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleWebsiteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!websiteUrl) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      
      // Sample improvements
      setImprovements([
        'Responsive Design optimieren',
        'Ladezeiten verbessern',
        'SEO-Optimierung',
        'Benutzerführung verbessern',
        'Call-to-Actions optimieren'
      ]);
      
      // Trigger confetti effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      // Move to next step
      setCurrentStep(2);
    }, 10000); // 10 seconds simulation
  };

  const handleWebsiteUrlChange = (url: string) => {
    setWebsiteUrl(url);
  };

  const handleImprovementSelect = (improvement: string) => {
    const updatedImprovements = formData.improvements.includes(improvement)
      ? formData.improvements.filter(item => item !== improvement)
      : [...formData.improvements, improvement];
      
    setFormData({
      ...formData,
      improvements: updatedImprovements
    });
  };

  const handleStartConsultation = () => {
    setFormData({
      ...formData,
      websiteUrl,
      improvements
    });
    setCurrentStep(3);
  };

  const handleFormChange = (updates: Partial<typeof formData>) => {
    setFormData({
      ...formData,
      ...updates
    });
  };

  const handlePrevStep = () => {
    if (formData.step > 1) {
      setFormData({
        ...formData,
        step: formData.step - 1
      });
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormSubmit = () => {
    if (formData.step < 2) {
      setFormData({
        ...formData,
        step: formData.step + 1
      });
    } else {
      // Form is complete - show success
      setCurrentStep(4);
      
      // Trigger success animation
      setTimeout(() => {
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.6 }
        });
      }, 300);
    }
  };

  // If rendered directly in an industry expansion panel
  if (industryId) {
    return (
      <div className="bg-swiss-darkblue text-white p-8 rounded-xl shadow-xl my-8">
        <div className="max-w-4xl mx-auto">
          {currentStep < 3 ? (
            <AnalysisSteps
              step={currentStep}
              isAnalyzing={isAnalyzing}
              websiteUrl={websiteUrl}
              improvements={improvements}
              onWebsiteSubmit={handleWebsiteSubmit}
              onWebsiteUrlChange={handleWebsiteUrlChange}
              onImprovementSelect={handleImprovementSelect}
              onStartConsultation={handleStartConsultation}
              industryId={industryId}
            />
          ) : currentStep === 3 ? (
            <ConsultationForm
              formData={formData}
              onFormChange={handleFormChange}
              onPrevStep={handlePrevStep}
              onSubmit={handleFormSubmit}
            />
          ) : (
            <div className="text-center py-10 space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 text-white mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              
              <h2 className="text-3xl font-bold">Vielen Dank!</h2>
              <p className="text-lg text-white/80 max-w-md mx-auto">
                Wir haben Ihre Anfrage erhalten und werden uns innerhalb von 24 Stunden bei Ihnen melden.
              </p>
              
              <Button 
                onClick={() => setCurrentStep(1)} 
                className="mt-8 bg-swiss-red hover:bg-swiss-red/90 text-white"
              >
                Zurück zur Analyse
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Original full standalone section with collapsible
  return (
    <section className="py-24 relative">
      <Collapsible
        open={isExpanded}
        onOpenChange={setIsExpanded}
        className="w-full"
      >
        <CollapsibleTrigger asChild>
          <Card 
            className="max-w-4xl mx-auto cursor-pointer transform hover:scale-[1.01] transition-all duration-300 shadow-md hover:shadow-lg mb-8"
            onClick={handleExpand}
          >
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl font-bold text-swiss-darkblue flex justify-center items-center gap-3">
                <Globe className="h-6 w-6 text-swiss-red" />
                Steht Ihre Website auf dem neuesten Stand?
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
                Lassen Sie Ihre Website kostenlos analysieren und erhalten Sie eine professionelle Einschätzung.
              </CardDescription>
            </CardHeader>
          </Card>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isExpanded ? 1 : 0,
              height: isExpanded ? 'auto' : 0
            }}
            transition={{ duration: 0.5 }}
            className="rounded-xl bg-swiss-darkblue text-white p-8 max-w-4xl mx-auto shadow-xl"
          >
            {currentStep < 3 ? (
              <AnalysisSteps
                step={currentStep}
                isAnalyzing={isAnalyzing}
                websiteUrl={websiteUrl}
                improvements={improvements}
                onWebsiteSubmit={handleWebsiteSubmit}
                onWebsiteUrlChange={handleWebsiteUrlChange}
                onImprovementSelect={handleImprovementSelect}
                onStartConsultation={handleStartConsultation}
              />
            ) : currentStep === 3 ? (
              <ConsultationForm
                formData={formData}
                onFormChange={handleFormChange}
                onPrevStep={handlePrevStep}
                onSubmit={handleFormSubmit}
              />
            ) : (
              <div className="text-center py-10 space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 text-white mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                
                <h2 className="text-3xl font-bold">Vielen Dank!</h2>
                <p className="text-lg text-white/80 max-w-md mx-auto">
                  Wir haben Ihre Anfrage erhalten und werden uns innerhalb von 24 Stunden bei Ihnen melden.
                </p>
                
                <Button 
                  onClick={() => setCurrentStep(1)} 
                  className="mt-8 bg-swiss-red hover:bg-swiss-red/90 text-white"
                >
                  Zurück zur Analyse
                </Button>
              </div>
            )}
          </motion.div>
        </CollapsibleContent>
      </Collapsible>
    </section>
  );
};
