
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { uploadFile } from "@/lib/uploadFile";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Image, Upload } from "lucide-react";

export function NewsSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
    logo_url: '',
    meta_description: '',
    meta_keywords: '',
  });
  const [uploading, setUploading] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'logo') => {
    try {
      if (!e.target.files || e.target.files.length === 0) return;
      
      if (type === 'image') {
        setUploading(true);
      } else {
        setUploadingLogo(true);
      }
      
      const file = e.target.files[0];
      const publicUrl = await uploadFile(file);
      
      if (type === 'image') {
        setFormData(prev => ({ ...prev, image_url: publicUrl }));
      } else {
        setFormData(prev => ({ ...prev, logo_url: publicUrl }));
      }
      
      toast({
        title: "Erfolg",
        description: `${type === 'image' ? 'Bild' : 'Logo'} wurde erfolgreich hochgeladen.`
      });
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
      toast({
        title: "Fehler",
        description: `${type === 'image' ? 'Bild' : 'Logo'} konnte nicht hochgeladen werden.`,
        variant: "destructive"
      });
    } finally {
      if (type === 'image') {
        setUploading(false);
      } else {
        setUploadingLogo(false);
      }
    }
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple password authentication
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const { error } = await supabase
      .from('news_posts')
      .insert([{
        ...formData,
        slug,
        published_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Error creating post:', error);
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
        logo_url: '',
        meta_description: '', 
        meta_keywords: '' 
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">KMU News Erstellen</h2>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <div>
          <label className="block text-sm font-medium mb-1">Titel</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="text-lg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Hauptbild</label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'image')}
                  disabled={uploading}
                  id="image-upload"
                  className="hidden"
                />
                <label 
                  htmlFor="image-upload"
                  className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {uploading ? "Uploading..." : "Bild auswählen"}
                </label>
              </div>
              
              {formData.image_url && (
                <div className="relative">
                  <img 
                    src={formData.image_url} 
                    alt="Main Featured Image" 
                    className="w-full max-w-md h-48 object-cover border rounded"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-white"
                    onClick={() => setFormData({ ...formData, image_url: '' })}
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Logo (optional)</label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'logo')}
                  disabled={uploadingLogo}
                  id="logo-upload"
                  className="hidden"
                />
                <label 
                  htmlFor="logo-upload"
                  className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer"
                >
                  <Image className="h-4 w-4 mr-2" />
                  {uploadingLogo ? "Uploading..." : "Logo auswählen"}
                </label>
              </div>
              
              {formData.logo_url && (
                <div className="relative">
                  <img 
                    src={formData.logo_url} 
                    alt="Company Logo" 
                    className="max-w-[200px] max-h-24 object-contain border rounded bg-white p-2"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-white"
                    onClick={() => setFormData({ ...formData, logo_url: '' })}
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
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
          <RichTextEditor initialContent={formData.content} onChange={handleContentChange} />
        </div>

        <Button type="submit" disabled={uploading || uploadingLogo}>Beitrag Veröffentlichen</Button>
      </form>
    </div>
  );
}
