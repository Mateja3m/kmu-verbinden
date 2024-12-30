import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const AuthPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
      navigate("/");
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Mitglied werden
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Erstellen Sie ein Konto oder melden Sie sich an
            </p>
          </div>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#1E3A8A',
                    brandAccent: '#2563EB',
                  },
                },
              },
            }}
            theme="light"
            providers={[]}
            redirectTo={window.location.origin}
            localization={{
              variables: {
                sign_up: {
                  email_label: "E-Mail Adresse",
                  password_label: "Passwort",
                  button_label: "Registrieren",
                  loading_button_label: "Registrierung...",
                  social_provider_text: "Anmelden mit {{provider}}",
                  link_text: "Noch kein Konto? Registrieren",
                },
                sign_in: {
                  email_label: "E-Mail Adresse",
                  password_label: "Passwort",
                  button_label: "Anmelden",
                  loading_button_label: "Anmeldung...",
                  social_provider_text: "Anmelden mit {{provider}}",
                  link_text: "Bereits ein Konto? Anmelden",
                },
              },
            }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthPage;