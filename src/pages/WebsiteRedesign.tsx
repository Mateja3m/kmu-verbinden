import { useState, useEffect } from 'react';
import { Award, Building2, Sparkles, Gift } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import BackgroundPattern from '@/components/BackgroundPattern';
import Footer from '@/components/Footer';
import { AnalysisSteps } from '@/components/website-redesign/AnalysisSteps';
import { ConsultationForm } from '@/components/website-redesign/ConsultationForm';
import { TrustIndicators } from '@/components/website-redesign/TrustIndicators';
import { TrustSection } from '@/components/website-redesign/TrustSection';
import confetti from 'canvas-confetti';

interface FormData {
  step: number;
  websiteUrl: string;
  improvements: string[];
  platform: string;
  mainGoals: string[];
  challenges: string;
  companyName: string;
  industry: string;
  employeeCount: string;
  monthlyVisitors: string;
  contactPerson: string;
  email: string;
  phone: string;
  preferredTime: string;
  newsletter: boolean;
  privacyAccepted: boolean;
}

const WebsiteRedesign = () => {
  const [formData, setFormData] = useState<FormData>({
    step: 1,
    websiteUrl: '',
    improvements: [],
    platform: '',
    mainGoals: [],
    challenges: '',
    companyName: '',
    industry: '',
    employeeCount: '',
    monthlyVisitors: '',
    contactPerson: '',
    email: '',
    phone: '',
    preferredTime: '',
    newsletter: false,
    privacyAccepted: false
  });

  const [analysisStep, setAnalysisStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [remainingSpots] = useState(3);
  const [satisfactionRate] = useState(98);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    const notificationInterval = setInterval(() => {
      const cities = ['Zürich', 'Basel', 'Bern', 'Luzern', 'St. Gallen'];
      const names = ['Max M.', 'Sarah K.', 'Thomas R.', 'Lisa B.', 'Peter W.'];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const randomName = names[Math.floor(Math.random() * names.length)];
      
      toast({
        title: "Neue Analyse-Anfrage",
        description: `${randomName} aus ${randomCity} hat gerade seine Website-Analyse angefordert`,
      });
    }, 45000);

    return () => {
      clearInterval(timer);
      clearInterval(notificationInterval);
    };
  }, [toast]);

  const handleWebsiteCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.websiteUrl) {
      setIsAnalyzing(true);
      toast({
        title: "Website wird analysiert",
        description: "Unsere KI analysiert Ihre Website. Bitte haben Sie einen Moment Geduld.",
      });

      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisStep(2);
        // Trigger confetti effect when showing qualification
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 3000);
    }
  };

  const handleImprovementSelect = (improvement: string) => {
    setFormData(prev => ({
      ...prev,
      improvements: prev.improvements.includes(improvement)
        ? prev.improvements.filter(i => i !== improvement)
        : [...prev.improvements, improvement]
    }));
  };

  const startConsultation = () => {
    setShowForm(true);
    setAnalysisStep(3);
  };

  const handleFormChange = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (formData.step < 3) {
      setFormData(prev => ({ ...prev, step: prev.step + 1 }));
    }
  };

  const prevStep = () => {
    if (formData.step > 1) {
      setFormData(prev => ({ ...prev, step: prev.step - 1 }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.step === 3) {
      toast({
        title: "Erfolgreich gesendet",
        description: "Wir werden uns in Kürze bei Ihnen melden.",
      });
      setFormData(prev => ({ ...prev, step: 1 }));
      setShowForm(false);
      setAnalysisStep(1);
    } else {
      nextStep();
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white text-swiss-darkblue pt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto py-8">
            {/* Hero Section */}
            <div className="text-center space-y-8">
              <div className="flex items-center justify-center gap-2 text-yellow-400 font-medium">
                <Gift className="h-5 w-5" />
                <span>Gewinnen Sie ein komplettes Webdesign im Wert von CHF 15'000.-</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Digitale Präsenz optimieren – 
                <span className="text-swiss-red">Mehr Erfolg</span> für Ihr Unternehmen
              </h1>
              
              <p className="text-xl md:text-2xl text-swiss-darkblue/80 max-w-3xl mx-auto">
                Premium Website-Optimierung mit KI-gestützter Analyse und persönlicher Expertenberatung
              </p>

              <div className="flex flex-wrap justify-center gap-3 text-sm font-medium">
                <span className="bg-swiss-darkblue/5 backdrop-blur px-4 py-2 rounded-full border border-swiss-darkblue/10">Performance</span>
                <span className="bg-swiss-darkblue/5 backdrop-blur px-4 py-2 rounded-full border border-swiss-darkblue/10">Design</span>
                <span className="bg-swiss-darkblue/5 backdrop-blur px-4 py-2 rounded-full border border-swiss-darkblue/10">Conversion</span>
                <span className="bg-swiss-darkblue/5 backdrop-blur px-4 py-2 rounded-full border border-swiss-darkblue/10">UX</span>
              </div>

              {/* Prize Draw Notice with Exclusive Member Ribbon */}
              <div className="relative">
                <div className="absolute -top-6 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-semibold px-4 py-1 rounded-full shadow-lg transform rotate-3 animate-pulse whitespace-nowrap">
                  Exklusiv für unsere Mitglieder
                  <span className="text-xs ml-1">(und die, die es werden wollen)</span>
                </div>
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
                  <div className="flex items-start gap-4">
                    <Gift className="h-8 w-8 text-yellow-600 shrink-0 mt-1" />
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                        Exklusive Verlosung für Beratungsanfragen
                      </h3>
                      <p className="text-yellow-700">
                        Jede Beratungsanfrage nimmt automatisch an der Verlosung teil. 
                        Der Gewinner erhält ein komplettes Webdesign-Paket im Wert von CHF 15'000.-.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Analysis Steps */}
              <div className="bg-swiss-darkblue text-white backdrop-blur-lg rounded-xl p-8 shadow-2xl mt-8">
                {analysisStep < 3 ? (
                  <AnalysisSteps
                    step={analysisStep}
                    isAnalyzing={isAnalyzing}
                    websiteUrl={formData.websiteUrl}
                    improvements={formData.improvements}
                    onWebsiteSubmit={handleWebsiteCheck}
                    onWebsiteUrlChange={(url) => setFormData(prev => ({ ...prev, websiteUrl: url }))}
                    onImprovementSelect={handleImprovementSelect}
                    onStartConsultation={startConsultation}
                  />
                ) : showForm ? (
                  <ConsultationForm
                    formData={formData}
                    onFormChange={handleFormChange}
                    onPrevStep={prevStep}
                    onSubmit={handleSubmit}
                  />
                ) : null}
              </div>

              {/* Trust Indicators */}
              <TrustIndicators
                timeLeft={timeLeft}
                remainingSpots={remainingSpots}
              />
            </div>

            {/* Trust Section */}
            <TrustSection satisfactionRate={satisfactionRate} />

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WebsiteRedesign;
