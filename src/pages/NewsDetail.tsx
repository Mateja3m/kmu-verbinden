import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Share2, Linkedin, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

export default function NewsDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: post, isLoading } = useQuery({
    queryKey: ['news-post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news_posts')
        .select(`
          *,
          author:author_id (
            company_name,
            contact_person
          )
        `)
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8" />
            <div className="h-96 bg-gray-200 rounded mb-8" />
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          </div>
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
            <h1 className="text-2xl font-bold mb-4">Artikel nicht gefunden</h1>
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
              <p>
                {post.author?.contact_person || post.author?.company_name || 'KMU Verein'}
              </p>
              <p>{formatDate(post.published_at || post.created_at)}</p>
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

          {post.image_url && (
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-[400px] object-cover rounded-lg mb-8"
            />
          )}

          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

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
}