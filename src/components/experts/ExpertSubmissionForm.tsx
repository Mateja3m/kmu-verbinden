import React, { useState } from "react";
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
  const [services, setServices] = useState<string[]>([""]);
  const { toast } = useToast();

  const handleImageUpload = async (file: File, type: 'profile' | 'logo') => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('expert-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('expert-images')
        .getPublicUrl(filePath);

      if (type === 'profile') {
        setValue('image_url', publicUrl);
      } else {
        setValue('logo_url', publicUrl);
      }

      toast({
        title: "Erfolg",
        description: `${type === 'profile' ? 'Profilbild' : 'Logo'} wurde erfolgreich hochgeladen.`
      });

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Fehler",
        description: `${type === 'profile' ? 'Profilbild' : 'Logo'} konnte nicht hochgeladen werden.`,
        variant: "destructive"
      });
      return null;
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
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error: expertError } = await supabase
        .from('experts')
        .insert({
          profile_id: user.id,
          services: services.filter(Boolean),
          status: 'pending',
          ...data
        });

      if (expertError) throw expertError;

      toast({
        title: "Profil erfolgreich eingereicht",
        description: "Wir werden Ihre Anfrage prüfen und uns in Kürze bei Ihnen melden.",
      });
      
      onExpertSubmitted(data.contact_person);
      
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
            onProfileImageChange={(e) => {
              if (e.target.files?.[0]) {
                handleImageUpload(e.target.files[0], 'profile');
              }
            }}
            onLogoImageChange={(e) => {
              if (e.target.files?.[0]) {
                handleImageUpload(e.target.files[0], 'logo');
              }
            }}
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