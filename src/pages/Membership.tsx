import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Membership = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    address: "",
    postalCode: "",
    city: "",
    email: "",
    password: "",
  });

  const benefits = [
    {
      tag: "NEU",
      title: "KMU Finanzierung",
      description: "10'000 zinslos und laufzeitfrei.",
    },
    {
      tag: "Exklusiver Vorteil",
      title: "Kostenlose KI-Beratung",
      description: "Profitieren Sie 2025 von unserer kostenlosen Beratung zu Automatisierung und künstlicher Intelligenz für Ihr Unternehmen.",
    },
    {
      tag: "Sichtbarkeit",
      title: "Unternehmensblick",
      description: "Präsentieren Sie Ihr Unternehmen in unserem exklusiven Magazin und erreichen Sie tausende Entscheidungsträger.",
    },
  ];

  const testimonials = [
    {
      quote: "Die Mitgliedschaft im SKV hat uns Zugang zu einem starken Netzwerk und exklusiven Vorteilen verschafft. Die Investition hat sich mehrfach ausgezahlt – absolut empfehlenswert!",
      author: "Dominik Graf",
      company: "Pawex AG",
    },
    {
      quote: "Unterstützend durch den SKV konnten wir unser Netzwerk erheblich erweitern und neue Kunden gewinnen. Der direkte Zugang zu relevanten Kontakten war entscheidend für unseren Erfolg.",
      author: "Hussam Zaghloul",
      company: "Architekt FH",
    },
    {
      quote: "Der SKV hat uns mit gezielten Marketingstrategien, wertvollen Netzwerkkontakten und effektiven Werbemöglichkeiten geholfen, unsere Reichweite zu erhöhen.",
      author: "Timo Seger",
      company: "Umzug Schweiz AG",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }

    if (step === 2) {
      setLoading(true);
      try {
        // Register the user
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });

        if (authError) throw authError;

        if (authData.user) {
          // Update the profile with company information
          const { error: profileError } = await supabase
            .from('profiles')
            .update({
              company_name: formData.companyName,
              contact_person: formData.contactPerson,
              address: formData.address,
              postal_code: formData.postalCode,
              city: formData.city,
            })
            .eq('id', authData.user.id);

          if (profileError) throw profileError;

          toast({
            title: "Registrierung erfolgreich",
            description: "Bitte bestätigen Sie Ihre E-Mail-Adresse.",
          });
          
          setStep(3);
        }
      } catch (error) {
        console.error('Registration error:', error);
        toast({
          title: "Fehler bei der Registrierung",
          description: "Bitte versuchen Sie es erneut.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      toast({
        title: "Erfolgreich eingeloggt",
        description: "Willkommen zurück!",
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login fehlgeschlagen",
        description: "Bitte überprüfen Sie Ihre Anmeldedaten.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative bg-luxury-gradient pt-32 pb-20 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-swiss-darkblue/90 to-swiss-red/90 mix-blend-multiply"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl mb-6">
            Werden Sie Mitglied im KMU Verein
          </h1>
          <p className="text-xl mb-8">
            Nutzen Sie exklusive Vorteile, vernetzen Sie sich mit Branchenführern und treiben Sie Ihr Unternehmen voran.
          </p>
          <Button 
            className="bg-white text-swiss-darkblue hover:bg-white/90 text-lg px-8 py-6"
            onClick={() => document.getElementById('membership-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Jetzt Mitglied werden
          </Button>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105">
                <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-swiss-red text-white mb-4">
                  {benefit.tag}
                </span>
                <h3 className="text-xl font-bold mb-2 text-swiss-darkblue">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-swiss-darkblue">
            Vertrauen von führenden Unternehmen
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                <div className="font-semibold text-swiss-darkblue">{testimonial.author}</div>
                <div className="text-sm text-gray-500">{testimonial.company}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Membership Form */}
      <div id="membership-form" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="flex justify-between mb-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`flex items-center ${i !== 3 ? 'flex-1' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= i ? 'bg-swiss-red text-white' : 'bg-gray-200'
                    }`}
                  >
                    {step > i ? <Check size={16} /> : i}
                  </div>
                  {i !== 3 && (
                    <div
                      className={`h-1 flex-1 mx-2 ${
                        step > i ? 'bg-swiss-red' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-swiss-darkblue mb-6">Unternehmensdaten</h3>
                <Input 
                  placeholder="Firmenname" 
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full" 
                />
                <Input 
                  placeholder="Name der verantwortlichen Person" 
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  className="w-full" 
                />
                <Input 
                  placeholder="Straße und Hausnummer" 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full" 
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    placeholder="PLZ" 
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                  />
                  <Input 
                    placeholder="Ort" 
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
                <Button 
                  className="w-full bg-swiss-red hover:bg-swiss-red/90 text-white mt-6"
                  onClick={() => setStep(2)}
                >
                  Weiter
                </Button>
                <p className="text-sm text-gray-500 text-center mt-4">
                  Ihre Daten werden sicher übertragen und nicht an Dritte weitergegeben
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-swiss-darkblue mb-6">Zugangsdaten erstellen</h3>
                <Input 
                  type="email"
                  placeholder="E-Mail-Adresse" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full" 
                />
                <Input 
                  type="password"
                  placeholder="Passwort" 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full" 
                />
                <Button 
                  className="w-full bg-swiss-red hover:bg-swiss-red/90 text-white mt-6"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Wird verarbeitet..." : "Registrieren"}
                </Button>
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    Bereits Mitglied?{" "}
                    <button
                      onClick={handleLogin}
                      className="text-swiss-red hover:text-swiss-darkblue"
                      disabled={loading}
                    >
                      Hier einloggen
                    </button>
                  </p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-swiss-darkblue mb-6">Registrierung erfolgreich!</h3>
                <p className="text-gray-600">
                  Bitte überprüfen Sie Ihre E-Mail-Adresse und bestätigen Sie Ihre Registrierung.
                </p>
                <Button 
                  className="mt-6"
                  variant="outline"
                  onClick={() => navigate("/auth")}
                >
                  Zum Login
                </Button>
              </div>
            )}

            <p className="text-sm text-gray-500 text-center mt-4">
              Ihre Daten werden sicher übertragen und nicht an Dritte weitergegeben
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Membership;
