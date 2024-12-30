import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function PartnersSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    website: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // First get the current user's profile to check if they're an admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Fehler",
        description: "Sie müssen eingeloggt sein.",
        variant: "destructive"
      });
      return;
    }

    const { error } = await supabase
      .from('partners')
      .insert([{
        ...formData,
        profile_id: user.id
      }]);

    if (error) {
      console.error('Error adding partner:', error);
      toast({
        title: "Fehler",
        description: "Partner konnte nicht hinzugefügt werden.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Erfolg",
        description: "Partner wurde erfolgreich hinzugefügt."
      });
      setFormData({ name: '', logo: '', website: '', description: '' });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Partner Hinzufügen</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Logo URL</label>
          <Input
            value={formData.logo}
            onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Website</label>
          <Input
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Beschreibung</label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="min-h-[100px]"
          />
        </div>

        <Button type="submit">Partner Hinzufügen</Button>
      </form>
    </div>
  );
}