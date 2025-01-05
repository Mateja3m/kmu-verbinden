import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const AuthPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log("[Auth] Initial session check:", session);
        if (session) {
          await handleAuthChange('SIGNED_IN', session);
        }
      } catch (error) {
        console.error("[Auth] Error during initialization:", error);
      }
    };
    
    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleAuthChange = async (event: string, session: any) => {
    console.log("[Auth] Auth state changed:", event);
    console.log("[Auth] Session data:", session);
    
    if (event === 'SIGNED_IN' && session) {
      try {
        console.log("[Auth] Checking profile for user:", session.user.id);
        
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error("[Auth] Profile query error:", error);
          throw error;
        }

        console.log("[Auth] Profile data:", profile);

        if (profile?.is_admin) {
          console.log("[Auth] User is admin, redirecting to admin dashboard");
          navigate('/admin');
        } else {
          console.log("[Auth] User is not admin, redirecting to dashboard");
          navigate('/dashboard');
        }
      } catch (error: any) {
        console.error("[Auth] Error in auth change handler:", error);
        toast({
          title: "Fehler",
          description: "Es gab ein Problem beim Überprüfen Ihres Profils. Bitte versuchen Sie es erneut.",
          variant: "destructive",
        });
      }
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
                Anmelden
              </h2>
              <p className="mt-3 text-center text-sm text-gray-600">
                Bitte melden Sie sich mit Ihren Zugangsdaten an
              </p>
            </div>
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#DC2626',
                      brandAccent: '#B91C1C',
                      brandButtonText: 'white',
                    },
                  },
                },
                className: {
                  container: 'w-full',
                  button: 'w-full px-4 py-2.5 rounded-lg font-medium',
                  input: 'w-full px-4 py-2.5 rounded-lg border focus:ring-2',
                  label: 'block text-sm font-medium text-gray-700 mb-2',
                },
              }}
              theme="light"
              providers={[]}
              redirectTo={window.location.origin + '/auth'}
              localization={{
                variables: {
                  sign_in: {
                    email_label: "E-Mail",
                    password_label: "Passwort",
                    button_label: "Anmelden",
                    loading_button_label: "Anmeldung läuft...",
                    password_input_placeholder: "Ihr Passwort",
                    email_input_placeholder: "Ihre E-Mail-Adresse",
                    link_text: "Sie haben noch kein Konto? Registrieren",
                  },
                  sign_up: {
                    email_label: "E-Mail",
                    password_label: "Passwort",
                    button_label: "Registrieren",
                    loading_button_label: "Registrierung läuft...",
                    password_input_placeholder: "Ihr Passwort",
                    email_input_placeholder: "Ihre E-Mail-Adresse",
                    link_text: "Bereits ein Konto? Anmelden",
                  },
                  forgotten_password: {
                    email_label: "E-Mail",
                    password_label: "Passwort",
                    button_label: "Passwort zurücksetzen",
                    loading_button_label: "Senden der Anweisungen...",
                    link_text: "Zurück zur Anmeldung",
                  },
                },
              }}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;
