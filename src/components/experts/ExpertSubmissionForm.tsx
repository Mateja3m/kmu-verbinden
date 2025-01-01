import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Plus, Trash2 } from "lucide-react";
import { ExpertPreview } from "./ExpertPreview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpertFormData } from "@/types/database/experts";

const ExpertSubmissionForm = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ExpertFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [logoImage, setLogoImage] = useState<File | null>(null);
  const [services, setServices] = useState<string[]>([""]);
  const { toast } = useToast();

  const formData = watch();

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

      // Get the current user's profile ID
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Ihr Expertenprofil</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Profilbild</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'profile')}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Firmenlogo</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'logo')}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="contact_person">Name *</Label>
                  <Input
                    id="contact_person"
                    {...register("contact_person", { required: true })}
                    className={errors.contact_person ? "border-red-500" : ""}
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
                    rows={5}
                  />
                </div>

                <div>
                  <Label>Dienstleistungen *</Label>
                  {services.map((service, index) => (
                    <div key={index} className="flex gap-2 mt-2">
                      <Input
                        value={service}
                        onChange={(e) => handleServiceChange(index, e.target.value)}
                        placeholder="z.B. Strategieberatung"
                      />
                      {services.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeService(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addService}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Dienstleistung hinzufügen
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                  <Label htmlFor="linkedin">LinkedIn Profil</Label>
                  <Input
                    id="linkedin"
                    {...register("linkedin")}
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

                <div className="grid grid-cols-2 gap-4">
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
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-4">
                  💡 Tipp: Fügen Sie nach der Freischaltung Ihres Profils den Titel "SKV-Experte" zu Ihrem LinkedIn-Profil hinzu, um Ihre Expertise zu unterstreichen.
                </p>
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
          </CardContent>
        </Card>
      </div>

      <div className="lg:sticky lg:top-4">
        <Card>
          <CardHeader>
            <CardTitle>Vorschau</CardTitle>
          </CardHeader>
          <CardContent>
            <ExpertPreview 
              formData={{
                ...formData,
                image_url: profileImage ? URL.createObjectURL(profileImage) : undefined,
                logo_url: logoImage ? URL.createObjectURL(logoImage) : undefined,
                services: services.filter(Boolean)
              }} 
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );

};

export default ExpertSubmissionForm;
