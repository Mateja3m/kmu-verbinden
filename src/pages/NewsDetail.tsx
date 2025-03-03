
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Share2, Linkedin, ArrowLeft, Calendar } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { NewsPost } from "@/types/database/news";
import { BlogRenderer } from "@/components/blog/BlogRenderer";
import { useToast } from "@/hooks/use-toast";

export default function NewsDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [post, setPost] = useState<NewsPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('news_posts')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) {
        console.error('Error fetching post:', error);
        toast({
          title: "Fehler",
          description: "Die Medienmitteilung konnte nicht geladen werden.",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }
      
      setPost(data);
      setLoading(false);
    };
    
    if (slug) {
      fetchPost();
    }
  }, [slug, toast]);

  const handleShare = (platform: 'linkedin' | 'general') => {
    const url = window.location.href;
    const title = post?.title || '';
    
    if (platform === 'linkedin') {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        '_blank'
      );
    } else {
      if (navigator.share) {
        navigator.share({
          title,
          url,
        });
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-CH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow container mx-auto px-4 py-24 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-swiss-red"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Medienmitteilung nicht gefunden</h1>
            <p className="mb-8">Die gesuchte Medienmitteilung existiert nicht oder wurde entfernt.</p>
            <Button onClick={() => navigate('/news')}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Zurück zur Übersicht
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-24">
        <article className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate('/news')}
            className="mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Zurück zur Übersicht
          </Button>

          <h1 className="text-4xl font-bold text-swiss-darkblue mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between mb-8">
            <div className="text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.published_at || post.created_at)}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleShare('linkedin')}
                title="Auf LinkedIn teilen"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleShare('general')}
                title="Teilen"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {post.logo_url && (
            <div className="mb-10 flex justify-start">
              <img 
                src={post.logo_url} 
                alt="Company Logo" 
                className="max-h-16 object-contain"
              />
            </div>
          )}

          {post.image_url && (
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-[400px] object-cover rounded-lg mb-8"
            />
          )}

          <div className="prose-container">
            <BlogRenderer content={post.content} />
          </div>

          {post.meta_keywords && (
            <div className="mt-12 pt-8 border-t">
              <p className="text-sm text-gray-500">
                Tags: {post.meta_keywords}
              </p>
            </div>
          )}
        </article>
      </main>
      
      <Footer />
    </div>
  );
};
