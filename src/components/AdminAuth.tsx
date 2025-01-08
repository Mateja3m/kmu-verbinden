import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AuthError } from "@supabase/supabase-js";

const AdminAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    console.log("[AdminAuth] Component mounted");
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log("[AdminAuth] Current session:", session);
        
        if (session?.user) {
          await checkAdminAndRedirect(session.user.id);
        } else {
          setShowAuth(true);
        }
      } catch (error) {
        console.error("[AdminAuth] Session check error:", error);
        handleError(error as AuthError);
        setShowAuth(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("[AdminAuth] Auth state changed:", event, session?.user?.id);
      
      if (event === 'SIGNED_IN' && session?.user) {
        setIsLoading(true);
        setShowAuth(false);
        await checkAdminAndRedirect(session.user.id);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const checkAdminAndRedirect = async (userId: string) => {
    try {
      console.log("[AdminAuth] Checking admin status for user:", userId);
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.error("[AdminAuth] Profile query error:", profileError);
        throw profileError;
      }

      console.log("[AdminAuth] Profile data:", profile);

      if (profile?.is_admin) {
        console.log("[AdminAuth] Admin access confirmed, redirecting");
        navigate('/admin');
      } else {
        console.log("[AdminAuth] User is not an admin, signing out");
        await supabase.auth.signOut();
        toast({
          title: "Zugriff verweigert",
          description: "Sie haben keine Administratorrechte.",
          variant: "destructive",
        });
        setShowAuth(true);
      }
    } catch (error) {
      console.error("[AdminAuth] Admin check error:", error);
      handleError(error as AuthError);
      setShowAuth(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (error: AuthError | Error) => {
    console.error("[AdminAuth] Error:", error);
    toast({
      title: "Fehler bei der Anmeldung",
      description: error.message,
      variant: "destructive",
    });
    setIsLoading(false);
    setShowAuth(true);
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
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-swiss-red"></div>
        </div>
      ) : showAuth ? (
        <Auth
          supabaseClient={supabase}
          view="sign_in"
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
          redirectTo={window.location.origin + '/admin/auth'}
          showLinks={false}
          magicLink={false}
          localization={{
            variables: {
              sign_in: {
                email_label: "E-Mail",
                password_label: "Passwort",
                button_label: "Anmelden",
                email_input_placeholder: "Ihre E-Mail-Adresse",
                password_input_placeholder: "Ihr Passwort",
              },
            },
          }}
        />
      ) : null}
    </div>
  );
};

export default AdminAuth;