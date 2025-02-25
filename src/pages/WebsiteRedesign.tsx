
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import BackgroundPattern from '@/components/BackgroundPattern';
import Footer from '@/components/Footer';
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { nationalPartners } from "@/data/partners";
import { 
  Clock, 
  Users, 
  Shield, 
  Check, 
  ChevronRight, 
  Globe,
  Smartphone,
  LineChart,
  Palette,
  Zap,
  Award,
  Star
} from 'lucide-react';

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
  const [remainingSpots] = useState(10);
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

      // Simulate analysis
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisStep(2);
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

  const renderAnalysisStep = () => {
    switch (analysisStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Wo steht Ihre Website?</h2>
            <form onSubmit={handleWebsiteCheck} className="flex flex-col md:flex-row gap-4">
              <Input
                type="url"
                placeholder="Ihre Website URL eingeben"
                value={formData.websiteUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, websiteUrl: e.target.value }))}
                className="bg-white text-gray-900 h-12 text-lg flex-1"
                required
              />
              <Button 
                type="submit"
                size="lg"
                disabled={isAnalyzing}
                className="bg-swiss-red hover:bg-swiss-red/90 text-white shine-effect"
              >
                {isAnalyzing ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyse läuft...
                  </span>
                ) : (
                  <>
                    <Globe className="mr-2 h-5 w-5" />
                    Jetzt analysieren
                  </>
                )}
              </Button>
            </form>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Was möchten Sie verbessern?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: Palette, label: 'Design modernisieren', value: 'design' },
                { icon: LineChart, label: 'Conversion Rate steigern', value: 'conversion' },
                { icon: Zap, label: 'Performance optimieren', value: 'performance' },
                { icon: Smartphone, label: 'Mobile Experience verbessern', value: 'mobile' }
              ].map(({ icon: Icon, label, value }) => (
                <button
                  key={value}
                  onClick={() => handleImprovementSelect(value)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.improvements.includes(value)
                      ? 'border-swiss-red bg-swiss-red/10'
                      : 'border-gray-200 hover:border-swiss-red/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-6 w-6 ${formData.improvements.includes(value) ? 'text-swiss-red' : 'text-gray-500'}`} />
                    <span className={formData.improvements.includes(value) ? 'text-swiss-red' : 'text-gray-700'}>{label}</span>
                  </div>
                </button>
              ))}
            </div>
            <Button 
              onClick={startConsultation}
              disabled={formData.improvements.length === 0}
              className="w-full mt-6 bg-swiss-red hover:bg-swiss-red/90 text-white shine-effect"
            >
              Kostenloses Beratungsgespräch vereinbaren
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      case 3:
        return showForm ? (
          <div className="space-y-6">
            <div className="mb-8">
              <Progress value={formData.step * 33.33} className="h-2" />
              <div className="flex justify-between mt-2 text-sm">
                <span className={formData.step >= 1 ? "text-swiss-red font-medium" : ""}>Website & Ziele</span>
                <span className={formData.step >= 2 ? "text-swiss-red font-medium" : ""}>Unternehmen</span>
                <span className={formData.step >= 3 ? "text-swiss-red font-medium" : ""}>Kontakt</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {formData.step === 1 && (
                <div className="space-y-4">
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, platform: value }))}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Aktuelle Platform/CMS" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wordpress">WordPress</SelectItem>
                      <SelectItem value="shopify">Shopify</SelectItem>
                      <SelectItem value="wix">Wix</SelectItem>
                      <SelectItem value="other">Andere</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Grösste Herausforderung"
                    value={formData.challenges}
                    onChange={(e) => setFormData(prev => ({ ...prev, challenges: e.target.value }))}
                    className="bg-white"
                  />
                </div>
              )}

              {formData.step === 2 && (
                <div className="space-y-4">
                  <Input
                    placeholder="Firmenname"
                    value={formData.companyName}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                    className="bg-white"
                    required
                  />
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Branche" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Einzelhandel</SelectItem>
                      <SelectItem value="service">Dienstleistung</SelectItem>
                      <SelectItem value="manufacturing">Produktion</SelectItem>
                      <SelectItem value="other">Andere</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Anzahl Mitarbeiter"
                    value={formData.employeeCount}
                    onChange={(e) => setFormData(prev => ({ ...prev, employeeCount: e.target.value }))}
                    className="bg-white"
                  />
                  <Input
                    placeholder="Monatliche Website Besucher"
                    value={formData.monthlyVisitors}
                    onChange={(e) => setFormData(prev => ({ ...prev, monthlyVisitors: e.target.value }))}
                    className="bg-white"
                  />
                </div>
              )}

              {formData.step === 3 && (
                <div className="space-y-4">
                  <Input
                    placeholder="Ansprechpartner"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                    className="bg-white"
                    required
                  />
                  <Input
                    type="email"
                    placeholder="E-Mail"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-white"
                    required
                  />
                  <Input
                    type="tel"
                    placeholder="Telefon (optional)"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="bg-white"
                  />
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, preferredTime: value }))}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Bevorzugte Kontaktzeit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Vormittag</SelectItem>
                      <SelectItem value="afternoon">Nachmittag</SelectItem>
                      <SelectItem value="evening">Abend</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="newsletter"
                      checked={formData.newsletter}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, newsletter: checked as boolean }))
                      }
                    />
                    <label
                      htmlFor="newsletter"
                      className="text-sm text-gray-300"
                    >
                      Newsletter abonnieren (optional)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="privacy"
                      required
                      checked={formData.privacyAccepted}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, privacyAccepted: checked as boolean }))
                      }
                    />
                    <label
                      htmlFor="privacy"
                      className="text-sm text-gray-300"
                    >
                      Ich akzeptiere die Datenschutzerklärung
                    </label>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-4">
                {formData.step > 1 && (
                  <Button
                    type="button"
                    onClick={prevStep}
                    variant="outline"
                    className="bg-white text-swiss-darkblue"
                  >
                    Zurück
                  </Button>
                )}
                <Button 
                  type="submit"
                  className="ml-auto bg-swiss-red hover:bg-swiss-red/90 text-white shine-effect"
                >
                  {formData.step === 3 ? 'Analyse anfordern' : 'Weiter'}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        ) : null;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white text-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center space-y-6 mb-12">
              <div className="flex items-center justify-center gap-2 text-swiss-red font-medium">
                <Award className="h-5 w-5" />
                <span>{satisfactionRate}% Kundenzufriedenheit</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-swiss-darkblue leading-tight">
                Digitale Präsenz optimieren – Mehr Erfolg für Ihr Unternehmen
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                Professionelle Website-Optimierung mit KI-gestützter Analyse und Expertenberatung
              </p>

              <div className="flex flex-wrap justify-center gap-3 text-sm font-medium text-gray-600">
                <span className="bg-gray-100 px-3 py-1 rounded-full">Performance</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">Design</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">Conversion</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">UX</span>
              </div>

              {/* Analysis Steps */}
              <div className="bg-gradient-to-r from-swiss-darkblue to-swiss-darkblue/90 text-white rounded-xl p-8 shadow-lg mt-8">
                {renderAnalysisStep()}
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mt-6">
                <div className="flex items-center justify-center gap-2">
                  <Shield className="h-5 w-5 text-swiss-red" />
                  <span>Kostenlose Erstanalyse</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Clock className="h-5 w-5 text-swiss-red" />
                  <span>
                    Angebot endet in {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Users className="h-5 w-5 text-swiss-red" />
                  <span>Noch {remainingSpots} Plätze verfügbar</span>
                </div>
              </div>
            </div>

            {/* Trust Section */}
            <div className="text-center space-y-8 mb-12">
              <h2 className="text-2xl font-semibold text-swiss-darkblue">Vertrauen Sie den Experten</h2>
              <div className="flex flex-wrap justify-center gap-8">
                {nationalPartners.slice(0, 3).map((partner) => (
                  <div key={partner.id} className="bg-white shadow-lg p-4 rounded-lg hover:shadow-xl transition-shadow">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-12 object-contain"
                    />
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-center gap-2">
                <Star className="h-5 w-5 text-swiss-red" />
                <p className="text-lg text-gray-600">
                  Über 120 Schweizer Unternehmen profitieren bereits von unserer KI-gestützten Optimierung
                </p>
              </div>
            </div>

            {/* AI Chat Section */}
            <div className="mt-12 bg-gradient-to-r from-swiss-darkblue to-swiss-darkblue/90 text-white rounded-xl p-8">
              <h3 className="text-2xl font-semibold mb-6">Sprechen Sie mit unserem KI-Assistenten</h3>
              <div className="relative w-full aspect-[16/9] md:aspect-[2/1]">
                <iframe 
                  className="absolute inset-0 w-full h-full rounded-lg"
                  src="https://avaia.io/chat/authorize-chat/2705b8b0-276f-4582-a41c-6ff896a461ad/"
                  width="100%"
                  height="600px"
                  frameBorder="0"
                  title="KI-Assistent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WebsiteRedesign;
