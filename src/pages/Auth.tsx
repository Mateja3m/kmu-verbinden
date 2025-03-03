import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const AuthPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const loginType = searchParams.get('type') || 'member'; // Default to member login
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // If admin login type, redirect to dedicated admin auth page
    if (loginType === 'admin') {
      navigate('/admin/auth');
    }
  }, [loginType, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call with 1 second delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (loginType === 'partner' && password === "superlogin") {
      toast({
        title: "Erfolgreich angemeldet",
        description: `Willkommen zurück!`,
      });
      navigate('/partner-dashboard');
    } else if (loginType === 'admin') {
      // Redirect to the dedicated admin auth page
      navigate('/admin/auth');
    } else if (loginType === 'member' && password.endsWith('2025!')) {
      toast({
        title: "Erfolgreich angemeldet",
        description: `Willkommen zurück!`,
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Fehler",
        description: "Ungültige Anmeldeinformationen",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  // Don't do immediate navigation, let the useEffect handle it
  if (loginType === 'admin') {
    return null; // Return null while redirecting
  }

  const getTitle = () => {
    switch(loginType) {
      case 'partner':
        return 'Partner Login';
      case 'admin':
        return 'Admin Login';
      default:
        return 'Mitglieder Login';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow flex flex-col overflow-y-auto">
        <div className="flex-grow flex items-start justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-xl border border-gray-100">
            <div>
              <h2 className="mt-2 text-center text-3xl font-extrabold text-swiss-darkblue">
                {getTitle()}
              </h2>
              <p className="mt-3 text-center text-sm text-gray-600">
                Bitte melden Sie sich mit Ihren Zugangsdaten an
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-Mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-swiss-red focus:border-swiss-red focus:z-10 sm:text-sm"
                    placeholder="ihre@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Passwort
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-swiss-red focus:border-swiss-red focus:z-10 sm:text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-swiss-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-swiss-red transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    'Anmelden'
                  )}
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-swiss-red hover:text-red-700 transition-colors"
                  onClick={() => {/* Password reset functionality would go here */}}
                >
                  Passwort vergessen?
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;
