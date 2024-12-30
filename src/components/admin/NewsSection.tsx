import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function NewsSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const { error } = await supabase
      .from('news_posts')
      .insert([{
        ...formData,
        author_id: user.id,
        slug,
        published_at: new Date().toISOString()
      }]);

    if (error) {
      toast({
        title: "Fehler",
        description: "Beitrag konnte nicht erstellt werden.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Erfolg",
        description: "Beitrag wurde erfolgreich erstellt."
      });
      setFormData({ title: '', content: '', image_url: '' });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">KMU News Erstellen</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block text-sm font-medium mb-1">Titel</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bild URL</label>
          <Input
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Inhalt</label>
          <Textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
            className="min-h-[200px]"
          />
        </div>

        <Button type="submit">Beitrag Veröffentlichen</Button>
      </form>
    </div>
  );
}
