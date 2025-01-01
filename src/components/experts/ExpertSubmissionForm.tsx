import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { uploadFile } from "@/lib/uploadFile";

export function ExpertSubmissionForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    company_name: '',
    contact_person: '',
    expertise_area: '',
    description: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    postal_code: '',
    city: '',
    image_url: ''
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return;
      
      const file = e.target.files[0];
      const publicUrl = await uploadFile(file);
      
      setFormData(prev => ({ ...prev, image_url: publicUrl }));
      toast({
        title: "Erfolg",
        description: "Bild wurde erfolgreich hochgeladen."
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Fehler",
        description: "Bild konnte nicht hochgeladen werden.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // First create a profile
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: crypto.randomUUID(), // Generate a random password
        options: {
          data: {
            company_name: formData.company_name,
            contact_person: formData.contact_person,
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Then create the expert profile
        const { error: expertError } = await supabase
          .from('experts')
          .insert({
            profile_id: authData.user.id,
            expertise_area: formData.expertise_area,
            description: formData.description,
            image_url: formData.image_url,
            company_name: formData.company_name,
            email: formData.email,
            phone: formData.phone,
            website: formData.website,
            address: formData.address,
            postal_code: formData.postal_code,
            city: formData.city,
            status: 'pending'
          });

        if (expertError) throw expertError;

        toast({
          title: "Erfolg",
          description: "Ihre Bewerbung wurde erfolgreich eingereicht. Wir werden Sie kontaktieren, sobald Ihr Profil überprüft wurde."
        });

        // Reset form
        setFormData({
          company_name: '',
          contact_person: '',
          expertise_area: '',
          description: '',
          email: '',
          phone: '',
          website: '',
          address: '',
          postal_code: '',
          city: '',
          image_url: ''
        });
      }
    } catch (error) {
      console.error('Error submitting expert profile:', error);
      toast({
        title: "Fehler",
        description: "Ihre Bewerbung konnte nicht eingereicht werden. Bitte versuchen Sie es später erneut.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Firmenname</label>
          <Input
            value={formData.company_name}
            onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Kontaktperson</label>
          <Input
            value={formData.contact_person}
            onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">E-Mail</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Telefon</label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Website</label>
          <Input
            type="url"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Fachgebiet</label>
          <Input
            value={formData.expertise_area}
            onChange={(e) => setFormData({ ...formData, expertise_area: e.target.value })}
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Adresse</label>
          <Input
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">PLZ</label>
          <Input
            value={formData.postal_code}
            onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ort</label>
          <Input
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Profilbild</label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-2"
          />
          {formData.image_url && (
            <img 
              src={formData.image_url} 
              alt="Profile Preview" 
              className="w-32 h-32 object-cover rounded-lg"
            />
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Beschreibung Ihrer Expertise</label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            className="min-h-[150px]"
            placeholder="Beschreiben Sie Ihre Expertise und wie Sie KMUs unterstützen können..."
          />
        </div>
      </div>

      <div className="pt-4">
        <Button 
          type="submit" 
          className="w-full bg-swiss-red hover:bg-swiss-red/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Wird eingereicht..." : "Bewerbung einreichen"}
        </Button>
      </div>
    </form>
  );
}