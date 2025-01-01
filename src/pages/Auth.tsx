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
    // Listen for auth errors
    const handleAuthError = (error: any) => {
      console.log("Auth error:", error);
      
      if (error?.message?.includes("User already registered")) {
        toast({
          title: "Benutzer existiert bereits",
          description: "Bitte melden Sie sich mit Ihrem bestehenden Konto an.",
          variant: "destructive",
        });
      } else if (error) {
        toast({
          title: "Fehler",
          description: "Es gab einen Fehler bei der Anmeldung. Bitte versuchen Sie es erneut.",
          variant: "destructive",
        });
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      
      if (event === 'SIGNED_IN' && session) {
        // Check if user has completed registration
        const { data: profile } = await supabase
          .from('profiles')
          .select('company_name, terms_accepted, is_admin')
          .eq('id', session.user.id)
          .single();

        console.log("Profile data:", profile);

        if (!profile?.company_name || !profile?.terms_accepted) {
          // Redirect to registration form if profile is incomplete
          navigate('/membership/register');
        } else if (profile?.is_admin) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }

      if (event === 'USER_UPDATED' && session) {
        toast({
          title: "Erfolgreich",
          description: "Ihre E-Mail wurde bestätigt.",
        });
      }
    });

    // Add error event listener
    window.addEventListener('supabase.auth.error', handleAuthError);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('supabase.auth.error', handleAuthError);
    };
  }, [navigate, toast]);

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