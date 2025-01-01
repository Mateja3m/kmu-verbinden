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
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log("[Auth] Initial session check:", session);
      if (session) {
        handleAuthChange('SIGNED_IN', session);
      }
    };
    
    checkUser();

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
          .select('company_name, terms_accepted, membership_status')
          .eq('id', session.user.id)
          .single();

        console.log("[Auth] Profile query result:", { profile, error });

        if (error) {
          console.error("[Auth] Profile query error:", error);
          throw error;
        }

        // If profile exists and has required fields, redirect to dashboard
        if (profile && profile.company_name && profile.terms_accepted) {
          console.log("[Auth] User profile complete, redirecting to dashboard");
          navigate('/dashboard');
          return;
        }

        // If profile is incomplete, redirect to registration
        console.log("[Auth] Profile incomplete, redirecting to registration");
        navigate('/membership/register');

      } catch (error) {
        console.error("[Auth] Error in profile check:", error);
        toast({
          title: "Fehler",
          description: "Es gab einen Fehler beim Überprüfen Ihres Profils.",
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
          <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-xl border border-gray-100 my-8">
            <div>
              <h2 className="mt-2 text-center text-3xl font-extrabold text-swiss-darkblue">
                Anmelden
              </h2>
              <p className="mt-3 text-center text-sm text-gray-600">
                Melden Sie sich an oder erstellen Sie ein neues Konto
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
                    borderWidths: {
                      buttonBorderWidth: '1px',
                      inputBorderWidth: '1px',
                    },
                    radii: {
                      borderRadiusButton: '0.5rem',
                      buttonBorderRadius: '0.5rem',
                      inputBorderRadius: '0.5rem',
                    },
                  },
                },
                className: {
                  container: 'w-full',
                  button: 'w-full px-4 py-2.5 rounded-lg font-medium transition-colors duration-200',
                  input: 'w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-swiss-red focus:border-transparent transition-shadow duration-200',
                  label: 'block text-sm font-medium text-gray-700 mb-2',
                  anchor: 'text-swiss-red hover:text-swiss-darkblue transition-colors duration-200',
                },
              }}
              theme="light"
              providers={[]}
              redirectTo={window.location.origin + '/auth'}
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
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;