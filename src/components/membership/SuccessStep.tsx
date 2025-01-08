import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const SuccessStep = () => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center space-y-4">
      <h3 className="text-2xl font-bold text-swiss-darkblue mb-6">
        Registrierung erfolgreich!
      </h3>
      <p className="text-gray-600">
        Vielen Dank für Ihre Registrierung. Wir werden uns in Kürze bei Ihnen melden.
      </p>
      <Button 
        className="mt-6"
        variant="outline"
        onClick={() => navigate("/")}
      >
        Zur Startseite
      </Button>
    </div>
  );
};