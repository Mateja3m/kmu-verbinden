import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { uploadFile } from "@/lib/uploadFile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpertInviteForm } from "./ExpertInviteForm";

export function ExpertsSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    expertise_area: '',
    description: '',
    image_url: '',
    profile_id: ''
  });
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return;
      
      setUploading(true);
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
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase
      .from('experts')
      .insert([formData]);

    if (error) {
      console.error('Error adding expert:', error);
      toast({
        title: "Fehler",
        description: "Experte konnte nicht hinzugefügt werden.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Erfolg",
        description: "Experte wurde erfolgreich hinzugefügt."
      });
      setFormData({ 
        expertise_area: '', 
        description: '', 
        image_url: '', 
        profile_id: '' 
      });
    }
  };

  return (
    <div>
      <Tabs defaultValue="list" className="space-y-6">
        <TabsList>
          <TabsTrigger value="list">Experten Liste</TabsTrigger>
          <TabsTrigger value="add">Experte Hinzufügen</TabsTrigger>
          <TabsTrigger value="invite">Experte Einladen</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <h2 className="text-2xl font-bold mb-4">Experten Verwaltung</h2>
          {/* Expert list implementation will be added in the next iteration */}
        </TabsContent>

        <TabsContent value="add">
          <h2 className="text-2xl font-bold mb-4">Experten Hinzufügen</h2>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
            <div>
              <label className="block text-sm font-medium mb-1">Profil ID</label>
              <Input
                value={formData.profile_id}
                onChange={(e) => setFormData({ ...formData, profile_id: e.target.value })}
                required
                placeholder="UUID des Mitgliederprofils"
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

            <div>
              <label className="block text-sm font-medium mb-1">Bild</label>
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
                {formData.image_url && (
                  <img 
                    src={formData.image_url} 
                    alt="Expert Image Preview" 
                    className="w-32 h-32 object-cover border rounded"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Beschreibung</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                className="min-h-[200px]"
              />
            </div>

            <Button type="submit" disabled={uploading}>Experten Hinzufügen</Button>
          </form>
        </TabsContent>

        <TabsContent value="invite">
          <ExpertInviteForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}