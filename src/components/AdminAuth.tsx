import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AdminAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        handleAuthChange('SIGNED_IN', session);
      }
    };
    
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);
    return () => subscription.unsubscribe();
  }, []);

  const handleAuthChange = async (event: string, session: any) => {
    if (event === 'SIGNED_IN' && session) {
      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', session.user.id)
          .single();

        if (error) throw error;

        if (profile?.is_admin) {
          navigate('/admin');
        } else {
          toast({
            title: "Zugriff verweigert",
            description: "Sie haben keine Administratorrechte.",
            variant: "destructive",
          });
          await supabase.auth.signOut();
        }
      } catch (error) {
        toast({
          title: "Fehler",
          description: "Bitte überprüfen Sie Ihre Anmeldedaten und versuchen Sie es erneut.",
          variant: "destructive",
        });
      }
    }
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
        redirectTo={window.location.origin + '/admin-auth'}
        localization={{
          variables: {
            sign_in: {
              email_label: "E-Mail",
              password_label: "Passwort",
              button_label: "Anmelden",
            },
          },
        }}
      />
    </div>
  );
};

export default AdminAuth;