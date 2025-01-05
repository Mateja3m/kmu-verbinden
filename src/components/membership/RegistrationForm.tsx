import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const RegistrationForm = () => {
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
    phone: "",
    website: "",
    password: "",
  });

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
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });

        if (authError) {
          console.error('Registration error:', authError);
          throw authError;
        }

        if (authData.user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .update({
              company_name: formData.companyName,
              contact_person: formData.contactPerson,
              address: formData.address,
              postal_code: formData.postalCode,
              city: formData.city,
              phone: formData.phone,
              website: formData.website,
            })
            .eq('id', authData.user.id);

          if (profileError) {
            console.error('Profile update error:', profileError);
            throw profileError;
          }

          toast({
            title: "Registrierung erfolgreich",
            description: "Ihre Anmeldung wurde erfolgreich übermittelt.",
          });
          
          setStep(3);
        }
      } catch (error: any) {
        console.error('Registration error:', error);
        toast({
          title: "Fehler bei der Registrierung",
          description: error.message || "Bitte versuchen Sie es erneut.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
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
              <Input 
                placeholder="Telefon" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full" 
              />
              <Input 
                placeholder="Website" 
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full" 
              />
              <Button 
                className="w-full bg-swiss-red hover:bg-swiss-red/90 text-white mt-6"
                onClick={() => setStep(2)}
              >
                Weiter
              </Button>
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
            </div>
          )}

          {step === 3 && (
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-swiss-darkblue mb-6">Registrierung erfolgreich!</h3>
              <p className="text-gray-600">
                Vielen Dank für Ihre Registrierung. Wir werden Ihre Anfrage prüfen und uns in Kürze bei Ihnen melden.
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
  );
};

export default RegistrationForm;