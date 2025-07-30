
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { CompanyDetailsStep } from "./CompanyDetailsStep";
import { ContactDetailsStep } from "./ContactDetailsStep";
import { SuccessStep } from "./SuccessStep";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "@formspree/react";

const RegistrationForm = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formState, handleSubmit] = useForm("xgvzzelk"); // Updated Formspree form ID
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    address: "",
    postalCode: "",
    city: "",
    email: "",
    phone: "",
    website: "",
    statutesAccepted: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      statutesAccepted: checked
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!formData.statutesAccepted) {
        toast({
          title: "Bitte akzeptieren Sie die Statuten",
          description: "Um fortzufahren, müssen Sie die Statuten akzeptieren.",
          variant: "destructive",
        });
        return;
      }

      try {
        // Submit form data to Formspree
        await handleSubmit(formData);
        
        if (formState.errors) {
          console.error('Formspree submission errors:', formState.errors);
          toast({
            title: "Fehler bei der Registrierung",
            description: "Bitte versuchen Sie es erneut.",
            variant: "destructive",
          });
          return;
        }
        
        // If successful, display success message
        toast({
          title: "Registrierung erfolgreich",
          description: "Ihre Anmeldung wurde erfolgreich übermittelt.",
        });
        
        setStep(3);
      } catch (error: any) {
        console.error('Registration error:', error);
        toast({
          title: "Fehler bei der Registrierung",
          description: "Bitte versuchen Sie es erneut.",
          variant: "destructive",
        });
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

          <form onSubmit={handleFormSubmit}>
            {step === 1 && (
              <CompanyDetailsStep 
                formData={formData} 
                onChange={handleInputChange} 
              />
            )}

            {step === 2 && (
              <ContactDetailsStep 
                formData={formData} 
                onChange={handleInputChange}
                onCheckboxChange={handleCheckboxChange}
              />
            )}

            {step === 3 && <SuccessStep />}

            {step < 3 && (
              <Button 
                type="submit"
                className="w-full bg-swiss-red hover:bg-swiss-red/90 text-white mt-6"
              >
                {step === 1 ? "Weiter" : "Registrieren"}
              </Button>
            )}
          </form>

          <p className="text-sm text-gray-500 text-center mt-4">
            Ihre Daten werden sicher übertragen und nicht an Dritte weitergegeben
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
