
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export const SuccessStep = () => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center space-y-6 py-8">
      <div className="flex justify-center">
        <CheckCircle className="h-20 w-20 text-green-500" />
      </div>
      
      <h3 className="text-2xl font-bold text-swiss-darkblue">
        Registrierung erfolgreich!
      </h3>
      
      <p className="text-gray-600 max-w-md mx-auto">
        Vielen Dank für Ihre Registrierung beim Schweizerischen KMU Verein. Wir werden Ihre Anmeldung prüfen und uns in Kürze per E-Mail bei Ihnen melden.
      </p>
      
      <div className="pt-4">
        <Button 
          className="bg-swiss-red hover:bg-swiss-red/90 text-white"
          onClick={() => navigate("/")}
        >
          Zur Startseite
        </Button>
      </div>
    </div>
  );
};
