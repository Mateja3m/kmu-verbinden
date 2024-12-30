import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Share2, Linkedin, ArrowLeft, Calendar } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function NewsDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Placeholder data for development
  const post = {
    title: "KMU Verein lanciert neue Digitalisierungsinitiative",
    content: `<p>Der KMU Verein Schweiz hat heute eine wegweisende Initiative zur Förderung der Digitalisierung in kleinen und mittleren Unternehmen vorgestellt. Das Programm zielt darauf ab, die digitale Transformation in Schweizer KMUs zu beschleunigen und ihre Wettbewerbsfähigkeit zu stärken.</p>
              <p>Die Initiative umfasst verschiedene Massnahmen, darunter:</p>
              <ul>
                <li>Kostenlose Digitalberatungen für Mitglieder</li>
                <li>Workshops und Seminare zu digitalen Themen</li>
                <li>Zugang zu einem Netzwerk von IT-Experten</li>
              </ul>`,
    published_at: "2024-03-15",
    author: {
      company_name: "KMU Verein Schweiz",
      contact_person: "Dr. Maria Weber"
    },
    meta_keywords: "Digitalisierung, KMU, Schweiz, Innovation",
    image_url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80"
  };

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
                <span>{formatDate(post.published_at)}</span>
              </div>
              <p className="mt-1">
                {post.author.contact_person || post.author.company_name}
              </p>
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
            className="prose prose-lg max-w-none prose-headings:text-swiss-darkblue prose-a:text-swiss-red hover:prose-a:text-swiss-red/80"
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