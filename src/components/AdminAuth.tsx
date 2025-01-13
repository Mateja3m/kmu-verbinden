import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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

    if (password === "superlogin") {
      toast({
        title: "Erfolgreich eingeloggt",
        description: "Willkommen im Admin-Bereich",
      });
      navigate('/admin');
    } else {
      toast({
        title: "Fehler bei der Anmeldung",
        description: "Falsches Passwort. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-xl border border-gray-100">
      <div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-swiss-darkblue">
          Admin Anmeldung
        </h2>
        <p className="mt-3 text-center text-sm text-gray-600">
          Bitte melden Sie sich mit Ihren Admin-Zugangsdaten an
        </p>
      </div>
      
      <form onSubmit={handleLogin} className="mt-8 space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-Mail
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-swiss-red focus:border-transparent"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Passwort
            </label>
            <input
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

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-swiss-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-swiss-red disabled:opacity-50"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            "Anmelden"
          )}
        </button>
      </form>
    </div>
  );
};

export default AdminAuth;