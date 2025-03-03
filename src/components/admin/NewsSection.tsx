import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Save, ArrowLeft, Link } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export function NewsSection() {
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
  const [hasInitializedSamples, setHasInitializedSamples] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [postId, setPostId] = useState<string | null>(null);

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

  useEffect(() => {
    const checkAndCreateSamplePosts = async () => {
      if (hasInitializedSamples) return;
      
      try {
        const { data: existingPosts, error: checkError } = await supabase
          .from('news_posts')
          .select('id')
          .limit(1);
        
        if (checkError) throw checkError;
        
        if (!existingPosts || existingPosts.length === 0) {
          await createSamplePosts();
          setHasInitializedSamples(true);
          toast({
            title: "Beispiel-Medienmitteilungen erstellt",
            description: "Einige Beispiel-Medienmitteilungen wurden für Sie erstellt."
          });
        }
      } catch (error) {
        console.error("Error checking or creating sample posts:", error);
      }
    };
    
    if (!editMode) {
      checkAndCreateSamplePosts();
    }
  }, [toast, hasInitializedSamples, editMode]);

  const createSamplePosts = async () => {
    const samplePosts = [
      {
        title: "KMU Finanzierungshilfen 2024: Neue Förderprogramme vorgestellt",
        content: JSON.stringify([
          {
            type: "paragraph",
            content: "Der Schweizer KMU Verband freut sich, neue Finanzierungshilfen für kleine und mittlere Unternehmen vorzustellen, die ab Januar 2024 verfügbar sein werden. Die Programme umfassen zinsgünstige Darlehen, Bürgschaften und Zuschüsse für digitale Transformation."
          },
          {
            type: "paragraph",
            content: "Die neuen Förderprogramme wurden in Zusammenarbeit mit dem Staatssekretariat für Wirtschaft (SECO) und kantonalen Wirtschaftsförderungen entwickelt und sollen insbesondere KMU in strukturschwachen Regionen unterstützen."
          }
        ]),
        slug: "kmu-finanzierungshilfen-2024",
        image_url: "https://uqxvvjdegwukvvrefkho.supabase.co/storage/v1/object/public/images/kmu-financing.jpg",
        meta_description: "Neue Finanzierungshilfen und Förderprogramme für Schweizer KMU ab 2024 vorgestellt.",
        meta_keywords: "KMU, Finanzierung, Förderprogramme, Darlehen, Schweiz",
        published_at: new Date().toISOString()
      },
      {
        title: "Schweizer KMU und die Digitalisierung: Neuer Trend-Report veröffentlicht",
        content: JSON.stringify([
          {
            type: "paragraph",
            content: "Der Schweizer KMU Verband hat heute seinen jährlichen Digitalisierungs-Report veröffentlicht. Die Studie zeigt, dass immer mehr kleine und mittlere Unternehmen digitale Technologien einsetzen, um ihre Geschäftsprozesse zu optimieren und ihre Wettbewerbsfähigkeit zu stärken."
          },
          {
            type: "paragraph",
            content: "Besonders auffällig ist der Anstieg bei der Nutzung von Cloud-Diensten und digitalen Marketingstrategien. Dennoch gibt es nach wie vor Herausforderungen, insbesondere im Bereich der IT-Sicherheit und des Fachkräftemangels."
          }
        ]),
        slug: "schweizer-kmu-digitalisierung-report",
        image_url: "https://uqxvvjdegwukvvrefkho.supabase.co/storage/v1/object/public/images/digital-transformation.jpg",
        logo_url: "https://uqxvvjdegwukvvrefkho.supabase.co/storage/v1/object/public/images/kmu-logo.png",
        meta_description: "Neuer Report zur Digitalisierung in Schweizer KMU zeigt aktuelle Trends und Herausforderungen.",
        meta_keywords: "KMU, Digitalisierung, Cloud, IT-Sicherheit, Digitale Transformation",
        published_at: new Date(Date.now() - 86400000).toISOString() // Yesterday
      },
      {
        title: "Nachhaltigkeit im KMU-Sektor: Neue Zertifizierung für umweltfreundliche Unternehmen",
        content: JSON.stringify([
          {
            type: "paragraph",
            content: "Der Schweizer KMU Verband lanciert in Zusammenarbeit mit dem Bundesamt für Umwelt (BAFU) eine neue Zertifizierung für nachhaltig wirtschaftende KMU. Das Zertifikat 'GreenBusiness Switzerland' würdigt Unternehmen, die besondere Anstrengungen im Bereich Umweltschutz und Ressourceneffizienz unternehmen."
          },
          {
            type: "paragraph",
            content: "Die Zertifizierung berücksichtigt verschiedene Faktoren wie Energieverbrauch, Abfallmanagement, nachhaltige Beschaffung und CO2-Fußabdruck. Zertifizierte Unternehmen profitieren von einem verbesserten Image, Kosteneinsparungen und Zugang zu speziellen Fördermitteln."
          }
        ]),
        slug: "nachhaltigkeit-kmu-zertifizierung",
        image_url: "https://uqxvvjdegwukvvrefkho.supabase.co/storage/v1/object/public/images/sustainability.jpg",
        meta_description: "Neue 'GreenBusiness Switzerland' Zertifizierung für nachhaltig wirtschaftende KMU in der Schweiz.",
        meta_keywords: "KMU, Nachhaltigkeit, Zertifizierung, Umweltschutz, GreenBusiness",
        published_at: new Date(Date.now() - 172800000).toISOString() // 2 days ago
      }
    ];

    for (const post of samplePosts) {
      const { error } = await supabase
        .from('news_posts')
        .insert([post]);
      
      if (error) {
        console.error('Error creating sample post:', error);
      }
    }
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editMode && postId) {
        // Update existing post
        const { error } = await supabase
          .from('news_posts')
          .update({
            ...formData
          })
          .eq('id', postId);

        if (error) throw error;

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

        if (error) throw error;

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
        description: `Medienmitteilung konnte nicht ${editMode ? 'aktualisiert' : 'erstellt'} werden.`,
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    navigate('/admin?tab=blog-manager');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {editMode ? "Medienmitteilung Bearbeiten" : "Medienmitteilung Erstellen"}
        </h2>
        {editMode && (
          <Button 
            variant="outline" 
            onClick={handleCancel}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Zurück zur Übersicht
          </Button>
        )}
      </div>

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
            <label className="block text-sm font-medium mb-1">Hauptbild URL</label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="url"
                  placeholder="https://beispiel.com/bild.jpg"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="flex-grow"
                />
              </div>
              
              {formData.image_url && (
                <div className="relative">
                  <img 
                    src={formData.image_url} 
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
                    onClick={() => setFormData({ ...formData, image_url: '' })}
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
                  value={formData.logo_url}
                  onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                  className="flex-grow"
                />
              </div>
              
              {formData.logo_url && (
                <div className="relative">
                  <img 
                    src={formData.logo_url} 
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

        <div className="flex space-x-3">
          <Button 
            type="submit" 
            className="flex items-center gap-2"
          >
            <Save size={16} />
            {editMode ? "Medienmitteilung Aktualisieren" : "Medienmitteilung Veröffentlichen"}
          </Button>
          
          {editMode && (
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
            >
              Abbrechen
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
