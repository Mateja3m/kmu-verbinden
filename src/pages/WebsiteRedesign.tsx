
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import BackgroundPattern from '@/components/BackgroundPattern';
import Footer from '@/components/Footer';
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { nationalPartners } from "@/data/partners";
import { Clock, Users, Shield, Check, ChevronRight, ChevronDown, ChevronUp, Globe } from 'lucide-react';

interface FormData {
  step: number;
  websiteUrl: string;
  platform: string;
  mainProblem: string;
  companyName: string;
  industry: string;
  employeeCount: string;
  revenue: string;
  contactPerson: string;
  email: string;
  phone: string;
  preferredTime: string;
  privacyAccepted: boolean;
}

const WebsiteRedesign = () => {
  const [formData, setFormData] = useState<FormData>({
    step: 1,
    websiteUrl: '',
    platform: '',
    mainProblem: '',
    companyName: '',
    industry: '',
    employeeCount: '',
    revenue: '',
    contactPerson: '',
    email: '',
    phone: '',
    preferredTime: '',
    privacyAccepted: false
  });
  const [recentRequests, setRecentRequests] = useState(38);
  const [remainingSpots, setRemainingSpots] = useState(7);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const [websiteToCheck, setWebsiteToCheck] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Update countdown timer
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

    // Simulate real-time notifications
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

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleWebsiteCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (websiteToCheck) {
      toast({
        title: "Website wird analysiert",
        description: "Die Analyse Ihrer Website wird durchgeführt. Bitte haben Sie einen Moment Geduld.",
      });
      // Here you would typically send the website URL to your backend
      setTimeout(() => {
        setIsFormExpanded(true);
        handleInputChange('websiteUrl', websiteToCheck);
      }, 2000);
    }
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
      try {
        // Here you would typically send the data to your backend
        toast({
          title: "Erfolgreich gesendet",
          description: "Wir werden uns in Kürze bei Ihnen melden.",
        });
        
        // Reset form
        setFormData(prev => ({ ...prev, step: 1 }));
        setIsFormExpanded(false);
      } catch (error) {
        toast({
          title: "Fehler",
          description: "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
          variant: "destructive",
        });
      }
    } else {
      nextStep();
    }
  };

  const renderStep = () => {
    switch (formData.step) {
      case 1:
        return (
          <div className="space-y-4">
            <Input
              type="url"
              placeholder="Website URL"
              value={formData.websiteUrl}
              onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
              className="bg-white"
              required
            />
            <Select onValueChange={(value) => handleInputChange('platform', value)}>
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
            <Select onValueChange={(value) => handleInputChange('mainProblem', value)}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Hauptproblem" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conversion">Conversion Rate</SelectItem>
                <SelectItem value="design">Veraltetes Design</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="other">Anderes Problem</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <Input
              placeholder="Firmenname"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              className="bg-white"
              required
            />
            <Select onValueChange={(value) => handleInputChange('industry', value)}>
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
              onChange={(e) => handleInputChange('employeeCount', e.target.value)}
              className="bg-white"
            />
            <Input
              placeholder="Aktueller monatlicher Umsatz (optional)"
              value={formData.revenue}
              onChange={(e) => handleInputChange('revenue', e.target.value)}
              className="bg-white"
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <Input
              placeholder="Ansprechpartner"
              value={formData.contactPerson}
              onChange={(e) => handleInputChange('contactPerson', e.target.value)}
              className="bg-white"
              required
            />
            <Input
              type="email"
              placeholder="E-Mail"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="bg-white"
              required
            />
            <Input
              type="tel"
              placeholder="Telefon (optional)"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="bg-white"
            />
            <Select onValueChange={(value) => handleInputChange('preferredTime', value)}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Bevorzugte Kontaktzeit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Vormittag</SelectItem>
                <SelectItem value="afternoon">Nachmittag</SelectItem>
                <SelectItem value="evening">Abend</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white text-gray-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Website Checker Section */}
            <div className="text-center space-y-6 mb-12">
              <div className="flex items-center justify-center gap-2 text-swiss-red font-medium">
                <Users className="h-5 w-5" />
                <span>{recentRequests} Unternehmen haben die kostenlose Analyse in den letzten 24 Stunden angefordert</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-swiss-darkblue">
                Steigern Sie Ihre Conversion Rate
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                Website-Analyse durch unsere Digital-Experten (Wert: CHF 890)
              </p>

              <div className="bg-gradient-to-r from-swiss-darkblue to-swiss-darkblue/90 text-white rounded-xl p-8 shadow-lg">
                <form onSubmit={handleWebsiteCheck} className="flex flex-col md:flex-row gap-4 items-center justify-center">
                  <div className="flex-1 w-full">
                    <Input
                      type="url"
                      placeholder="Ihre Website URL"
                      value={websiteToCheck}
                      onChange={(e) => setWebsiteToCheck(e.target.value)}
                      className="bg-white text-gray-900"
                      required
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="bg-swiss-red hover:bg-swiss-red/90 text-white shine-effect whitespace-nowrap"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Website analysieren
                  </Button>
                </form>
              </div>

              <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-swiss-red" />
                  <span>34 Jahre Erfahrung</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-swiss-red" />
                  <span>
                    Vorqualifizierung endet in {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-swiss-red" />
                  <span>Noch {remainingSpots} Plätze für März verfügbar</span>
                </div>
              </div>
            </div>

            {/* Expandable Form Section */}
            <div className={`transition-all duration-500 ease-in-out ${isFormExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              <div className="bg-gradient-to-r from-swiss-darkblue to-swiss-darkblue/90 text-white rounded-xl p-6 md:p-8 mb-12">
                <div className="mb-8">
                  <Progress value={formData.step * 33.33} className="h-2" />
                  <div className="flex justify-between mt-2 text-sm">
                    <span className={formData.step >= 1 ? "text-swiss-red" : ""}>Website Details</span>
                    <span className={formData.step >= 2 ? "text-swiss-red" : ""}>Unternehmen</span>
                    <span className={formData.step >= 3 ? "text-swiss-red" : ""}>Kontakt</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {renderStep()}
                  
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
                      {formData.step === 3 ? 'Jetzt analysieren' : 'Weiter'}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-r from-swiss-darkblue to-swiss-darkblue/90 text-white rounded-xl p-6">
                <div className="text-swiss-red mb-4">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Website-Analyse</h3>
                <p className="text-gray-300">Professionelle Analyse durch Digital-Experten (Wert: CHF 890)</p>
              </div>
              <div className="bg-gradient-to-r from-swiss-darkblue to-swiss-darkblue/90 text-white rounded-xl p-6">
                <div className="text-swiss-red mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Strategieberatung</h3>
                <p className="text-gray-300">Entwicklung einer Strategie für messbares Wachstum</p>
              </div>
              <div className="bg-gradient-to-r from-swiss-darkblue to-swiss-darkblue/90 text-white rounded-xl p-6">
                <div className="text-swiss-red mb-4">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Design</h3>
                <p className="text-gray-300">Exklusives Webdesign zu KMU-Vorzugskonditionen</p>
              </div>
            </div>

            {/* Trust Section */}
            <div className="text-center space-y-8 mb-12">
              <h2 className="text-2xl font-semibold text-swiss-darkblue">Unsere Premium Partner</h2>
              <div className="flex flex-wrap justify-center gap-8">
                {nationalPartners.slice(0, 3).map((partner) => (
                  <div key={partner.id} className="bg-white shadow-lg p-4 rounded-lg">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-12 object-contain"
                    />
                  </div>
                ))}
              </div>
              
              <p className="text-lg text-gray-600">
                Bereits über 120 Schweizer KMUs haben durch unser Programm ihre digitale Präsenz optimiert
              </p>
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
