import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ExpertFormData } from "@/types/database/experts";
import { ExpertFormFields } from "./ExpertFormFields";
import { ExpertFileUpload } from "./ExpertFileUpload";

interface ExpertSubmissionFormProps {
  onExpertSubmitted: (expertName: string) => void;
}

const ExpertSubmissionForm = ({ onExpertSubmitted }: ExpertSubmissionFormProps) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ExpertFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [logoImage, setLogoImage] = useState<File | null>(null);
  const [services, setServices] = useState<string[]>([""]);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'logo') => {
    if (e.target.files && e.target.files[0]) {
      if (type === 'profile') {
        setProfileImage(e.target.files[0]);
      } else {
        setLogoImage(e.target.files[0]);
      }
    }
  };

  const addService = () => {
    setServices([...services, ""]);
  };

  const removeService = (index: number) => {
    const newServices = services.filter((_, i) => i !== index);
    setServices(newServices);
  };

  const handleServiceChange = (index: number, value: string) => {
    const newServices = [...services];
    newServices[index] = value;
    setServices(newServices);
    setValue('services', newServices);
  };

  const onSubmit = async (data: ExpertFormData) => {
    setIsSubmitting(true);
    try {
      let profileImageUrl = null;
      let logoImageUrl = null;

      if (profileImage) {
        const fileExt = profileImage.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(`expert-profiles/${fileName}`, profileImage);

        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(`expert-profiles/${fileName}`);
        
        profileImageUrl = publicUrl;
      }

      if (logoImage) {
        const fileExt = logoImage.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(`expert-logos/${fileName}`, logoImage);

        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(`expert-logos/${fileName}`);
        
        logoImageUrl = publicUrl;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error: expertError } = await supabase
        .from('experts')
        .insert({
          profile_id: user.id,
          image_url: profileImageUrl,
          logo_url: logoImageUrl,
          services: services.filter(Boolean),
          status: 'pending',
          expertise_area: data.expertise_area,
          description: data.description,
          company_name: data.company_name,
          contact_person: data.contact_person,
          email: data.email,
          phone: data.phone,
          website: data.website,
          linkedin: data.linkedin,
          address: data.address,
          postal_code: data.postal_code,
          city: data.city
        });

      if (expertError) throw expertError;

      toast({
        title: "Profil erfolgreich eingereicht",
        description: "Wir werden Ihre Anfrage prüfen und uns in Kürze bei Ihnen melden.",
      });
      
      onExpertSubmitted(data.contact_person);
      
      // Reset form
      setValue('expertise_area', '');
      setValue('description', '');
      setValue('company_name', '');
      setValue('contact_person', '');
      setValue('email', '');
      setValue('phone', '');
      setValue('website', '');
      setValue('linkedin', '');
      setValue('address', '');
      setValue('postal_code', '');
      setValue('city', '');
      setProfileImage(null);
      setLogoImage(null);
      setServices(['']);
    } catch (error) {
      console.error('Error submitting expert profile:', error);
      toast({
        title: "Fehler",
        description: "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full transition-all duration-500 hover:shadow-lg">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <ExpertFileUpload
            onProfileImageChange={(e) => handleImageChange(e, 'profile')}
            onLogoImageChange={(e) => handleImageChange(e, 'logo')}
          />

          <ExpertFormFields
            register={register}
            errors={errors}
            services={services}
            onServiceChange={handleServiceChange}
            onAddService={addService}
            onRemoveService={removeService}
          />

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-4">
              💡 Tipp: Fügen Sie nach der Freischaltung Ihres Profils den Titel "SKV-Experte" zu Ihrem LinkedIn-Profil hinzu, um Ihre Expertise zu unterstreichen.
            </p>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-swiss-red hover:bg-swiss-red/90 transition-all duration-300 transform hover:scale-[1.02]"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Wird eingereicht..."
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Profil einreichen
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExpertSubmissionForm;