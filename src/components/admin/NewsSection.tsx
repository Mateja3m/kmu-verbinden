import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { uploadFile } from "@/lib/uploadFile";

export function NewsSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
    meta_description: '',
    meta_keywords: '',
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
      setFormData({ 
        title: '', 
        content: '', 
        image_url: '', 
        meta_description: '', 
        meta_keywords: '' 
      });
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
                alt="News Image Preview" 
                className="w-full max-w-md h-48 object-cover border rounded"
              />
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Meta Beschreibung (SEO)</label>
          <Textarea
            value={formData.meta_description}
            onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
            placeholder="Kurze Beschreibung für Suchmaschinen (max. 160 Zeichen)"
            maxLength={160}
            className="min-h-[80px]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Meta Keywords (SEO)</label>
          <Input
            value={formData.meta_keywords}
            onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
            placeholder="Schlüsselwörter, durch Kommas getrennt"
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

        <Button type="submit" disabled={uploading}>Beitrag Veröffentlichen</Button>
      </form>
    </div>
  );
}