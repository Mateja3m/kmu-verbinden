
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Lock } from "lucide-react";

const AdminAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email === "info@kmu-verein.ch" && password === "superlogin") {
      // Store admin session in localStorage
      localStorage.setItem('adminSession', JSON.stringify({
        authenticated: true,
        email: email,
        timestamp: new Date().toISOString()
      }));
      
      toast({
        title: "Erfolgreich eingeloggt",
        description: "Willkommen im Admin-Bereich",
      });
      navigate('/admin');
    } else {
      toast({
        title: "Fehler bei der Anmeldung",
        description: "Falsche E-Mail oder Passwort. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-xl border border-gray-100">
          <div>
            <div className="mx-auto flex justify-center">
              <div className="bg-swiss-red/10 p-3 rounded-full">
                <Lock className="h-8 w-8 text-swiss-red" />
              </div>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-swiss-darkblue">
              Admin Anmeldung
            </h2>
            <p className="mt-3 text-center text-sm text-gray-600">
              Medienmitteilungen verwalten
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-Mail
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-swiss-red focus:border-transparent"
                  placeholder="info@kmu-verein.ch"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Passwort
                </label>
                <Input
                  id="password"
                  type="password"
                  required
                  className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-swiss-red focus:border-transparent"
                  placeholder="Ihr Passwort"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-swiss-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-swiss-red disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                "Anmelden"
              )}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdminAuth;
