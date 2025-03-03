
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Save, ArrowLeft, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useLocation } from "react-router-dom";

export function NewsForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
    logo_url: '',
    meta_description: '',
    meta_keywords: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [postId, setPostId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [permissionError, setPermissionError] = useState(false);

  useEffect(() => {
    // Check if we're in edit mode based on the URL query param
    const searchParams = new URLSearchParams(location.search);
    const editPostId = searchParams.get('edit');
    
    if (editPostId) {
      setEditMode(true);
      setPostId(editPostId);
      fetchPostDetails(editPostId);
    }
  }, [location]);

  const fetchPostDetails = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('news_posts')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      if (data) {
        setFormData({
          title: data.title || '',
          content: data.content || '',
          image_url: data.image_url || '',
          logo_url: data.logo_url || '',
          meta_description: data.meta_description || '',
          meta_keywords: data.meta_keywords || '',
        });
      }
    } catch (error) {
      console.error('Error fetching post details:', error);
      toast({
        title: "Fehler",
        description: "Die Medienmitteilung konnte nicht geladen werden.",
        variant: "destructive"
      });
    }
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (editMode && postId) {
        // Update existing post
        const { error } = await supabase
          .from('news_posts')
          .update({
            ...formData
          })
          .eq('id', postId);

        if (error) {
          if (error.message.includes("row-level security policy")) {
            setPermissionError(true);
            throw new Error("Fehlende Berechtigungen: Sie haben keine Berechtigung, Medienmitteilungen zu bearbeiten. Bitte wenden Sie sich an den Administrator.");
          }
          throw error;
        }

        toast({
          title: "Erfolg",
          description: "Medienmitteilung wurde erfolgreich aktualisiert."
        });
        
        // Navigate back to the posts manager
        navigate('/admin?tab=blog-manager');
      } else {
        // Create new post
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
          if (error.message.includes("row-level security policy")) {
            setPermissionError(true);
            throw new Error("Fehlende Berechtigungen: Sie haben keine Berechtigung, Medienmitteilungen zu erstellen. Bitte wenden Sie sich an den Administrator.");
          }
          throw error;
        }

        toast({
          title: "Erfolg",
          description: "Medienmitteilung wurde erfolgreich erstellt."
        });
        
        // Reset the form for a new post
        setFormData({ 
          title: '', 
          content: '', 
          image_url: '', 
          logo_url: '',
          meta_description: '', 
          meta_keywords: '' 
        });
      }
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: "Fehler",
        description: error instanceof Error ? error.message : `Medienmitteilung konnte nicht ${editMode ? 'aktualisiert' : 'erstellt'} werden.`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin?tab=blog-manager');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {permissionError && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Fehlende Berechtigungen</AlertTitle>
          <AlertDescription>
            Sie haben keine Berechtigung, Medienmitteilungen zu {editMode ? 'bearbeiten' : 'erstellen'}. Bitte melden Sie sich mit einem Administratorkonto an oder wenden Sie sich an Ihren Administrator.
          </AlertDescription>
        </Alert>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Titel</label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="text-lg"
        />
      </div>

      <ImageUrlInputs 
        imageUrl={formData.image_url} 
        logoUrl={formData.logo_url}
        onImageChange={(url) => setFormData({...formData, image_url: url})}
        onLogoChange={(url) => setFormData({...formData, logo_url: url})}
      />

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

      <FormButtons 
        editMode={editMode} 
        isSubmitting={isSubmitting} 
        permissionError={permissionError}
        onCancel={handleCancel}
      />
    </form>
  );
}

interface ImageUrlInputsProps {
  imageUrl: string;
  logoUrl: string;
  onImageChange: (url: string) => void;
  onLogoChange: (url: string) => void;
}

function ImageUrlInputs({ imageUrl, logoUrl, onImageChange, onLogoChange }: ImageUrlInputsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium mb-1">Hauptbild URL</label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Input
              type="url"
              placeholder="https://beispiel.com/bild.jpg"
              value={imageUrl}
              onChange={(e) => onImageChange(e.target.value)}
              className="flex-grow"
            />
          </div>
          
          {imageUrl && (
            <div className="relative">
              <img 
                src={imageUrl} 
                alt="Main Featured Image" 
                className="w-full max-w-md h-48 object-cover border rounded"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://placehold.co/600x400?text=Bild+nicht+verfügbar";
                }}
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-white"
                onClick={() => onImageChange('')}
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Logo URL (optional)</label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Input
              type="url"
              placeholder="https://beispiel.com/logo.png"
              value={logoUrl}
              onChange={(e) => onLogoChange(e.target.value)}
              className="flex-grow"
            />
          </div>
          
          {logoUrl && (
            <div className="relative">
              <img 
                src={logoUrl} 
                alt="Company Logo" 
                className="max-w-[200px] max-h-24 object-contain border rounded bg-white p-2"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://placehold.co/400x200?text=Logo+nicht+verfügbar";
                }}
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-white"
                onClick={() => onLogoChange('')}
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface FormButtonsProps {
  editMode: boolean;
  isSubmitting: boolean;
  permissionError: boolean;
  onCancel: () => void;
}

function FormButtons({ editMode, isSubmitting, permissionError, onCancel }: FormButtonsProps) {
  return (
    <div className="flex space-x-3">
      <Button 
        type="submit" 
        className="flex items-center gap-2"
        disabled={isSubmitting || permissionError}
      >
        <Save size={16} />
        {isSubmitting ? "Wird gespeichert..." : (editMode ? "Medienmitteilung Aktualisieren" : "Medienmitteilung Veröffentlichen")}
      </Button>
      
      {editMode && (
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Abbrechen
        </Button>
      )}
    </div>
  );
}
