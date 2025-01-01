import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload } from "lucide-react";

interface ExpertSubmissionFormData {
  expertise_area: string;
  description: string;
  company_name: string;
  email: string;
  phone: string;
  website?: string;
  address: string;
  postal_code: string;
  city: string;
  services: string[];
  regions: string[];
}

const ExpertSubmissionForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ExpertSubmissionFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();

  const onSubmit = async (data: ExpertSubmissionFormData) => {
    setIsSubmitting(true);
    try {
      // First, create a new profile
      const { data: profileData, error: profileError } = await supabase.auth.signUp({
        email: data.email,
        password: Math.random().toString(36).slice(-8), // Generate a random password
      });

      if (profileError) throw profileError;

      let imageUrl = null;
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('images')
          .upload(`expert-profiles/${fileName}`, imageFile);

        if (uploadError) throw uploadError;
        imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/images/expert-profiles/${fileName}`;
      }

      // Create the expert profile
      const { error: expertError } = await supabase
        .from('experts')
        .insert({
          profile_id: profileData.user?.id,
          expertise_area: data.expertise_area,
          description: data.description,
          company_name: data.company_name,
          email: data.email,
          phone: data.phone,
          website: data.website,
          address: data.address,
          postal_code: data.postal_code,
          city: data.city,
          services: data.services,
          regions: data.regions,
          image_url: imageUrl,
          status: 'pending'
        });

      if (expertError) throw expertError;

      toast({
        title: "Profil erfolgreich eingereicht",
        description: "Wir werden Ihre Anfrage prüfen und uns in Kürze bei Ihnen melden.",
      });
      reset();
      setImageFile(null);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-8 rounded-lg shadow">
      <div className="space-y-4">
        <div>
          <Label htmlFor="expertise_area">Fachgebiet *</Label>
          <Input
            id="expertise_area"
            {...register("expertise_area", { required: true })}
            className={errors.expertise_area ? "border-red-500" : ""}
          />
        </div>

        <div>
          <Label htmlFor="description">Beschreibung *</Label>
          <Textarea
            id="description"
            {...register("description", { required: true })}
            className={errors.description ? "border-red-500" : ""}
          />
        </div>

        <div>
          <Label htmlFor="company_name">Firmenname *</Label>
          <Input
            id="company_name"
            {...register("company_name", { required: true })}
            className={errors.company_name ? "border-red-500" : ""}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">E-Mail *</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: true })}
              className={errors.email ? "border-red-500" : ""}
            />
          </div>

          <div>
            <Label htmlFor="phone">Telefon *</Label>
            <Input
              id="phone"
              {...register("phone", { required: true })}
              className={errors.phone ? "border-red-500" : ""}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            {...register("website")}
          />
        </div>

        <div>
          <Label htmlFor="address">Adresse *</Label>
          <Input
            id="address"
            {...register("address", { required: true })}
            className={errors.address ? "border-red-500" : ""}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="postal_code">PLZ *</Label>
            <Input
              id="postal_code"
              {...register("postal_code", { required: true })}
              className={errors.postal_code ? "border-red-500" : ""}
            />
          </div>

          <div>
            <Label htmlFor="city">Ort *</Label>
            <Input
              id="city"
              {...register("city", { required: true })}
              className={errors.city ? "border-red-500" : ""}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="profile_image">Profilbild</Label>
          <div className="mt-1 flex items-center">
            <label className="block">
              <span className="sr-only">Profilbild auswählen</span>
              <input
                type="file"
                id="profile_image"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-swiss-red file:text-white
                  hover:file:bg-swiss-red/90"
              />
            </label>
          </div>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-swiss-red hover:bg-swiss-red/90"
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
  );
};

export default ExpertSubmissionForm;