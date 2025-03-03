
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { CalendarIcon, ArrowRightIcon, Search } from "lucide-react";
import type { NewsPost } from "@/types/database/news";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Presse = () => {
  const [news, setNews] = useState<NewsPost[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredNews(news);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = news.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.content.toLowerCase().includes(query) ||
        (post.meta_keywords && post.meta_keywords.toLowerCase().includes(query)) ||
        (post.meta_description && post.meta_description.toLowerCase().includes(query))
      );
      setFilteredNews(filtered);
    }
  }, [searchQuery, news]);

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from("news_posts")
        .select("*")
        .order("published_at", { ascending: false });

      if (error) {
        console.error("Error fetching news:", error);
        toast({
          title: "Fehler",
          description: "Nachrichten konnten nicht geladen werden.",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        setNews(data);
        setFilteredNews(data);
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Fehler",
        description: "Ein unerwarteter Fehler ist aufgetreten.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("de-CH", {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getExcerpt = (content: string, maxLength: number = 150) => {
    try {
      // Try to parse as JSON first (rich content)
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        // Find the first paragraph or heading
        const textBlock = parsed.find(block => 
          block.type === 'paragraph' || block.type === 'heading'
        );
        
        if (textBlock) {
          return textBlock.content.length > maxLength 
            ? textBlock.content.substring(0, maxLength) + '...'
            : textBlock.content;
        }
      }
      
      // Fallback to treating as plain text
      return content.length > maxLength 
        ? content.substring(0, maxLength) + '...'
        : content;
    } catch (e) {
      // If not JSON, treat as plain text
      return content.length > maxLength 
        ? content.substring(0, maxLength) + '...'
        : content;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      
      {/* Hero Banner with Dark Overlay */}
      <div className="relative h-[300px] w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/lovable-uploads/002dc341-7fd5-4d7a-be63-14e368f7abfa.png')",
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center max-w-3xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Blog & Medienmitteilungen</h1>
            <p className="text-xl text-white/90">Aktuelle Nachrichten, Insights und Entwicklungen für Schweizer KMU</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Suche nach Beiträgen..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {filteredNews.length !== news.length && (
            <div className="ml-4">
              <Button variant="ghost" onClick={() => setSearchQuery("")}>
                Filter zurücksetzen
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Blog Content */}
      <div className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-swiss-red"></div>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700 mb-4">Keine Beiträge gefunden</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery 
                ? `Es wurden keine Beiträge zu "${searchQuery}" gefunden.` 
                : "Es sind noch keine Beiträge vorhanden."}
            </p>
            {searchQuery && (
              <Button onClick={() => setSearchQuery("")}>
                Suche zurücksetzen
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((post) => (
              <article
                key={post.id}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
                onClick={() => navigate(`/news/${post.slug}`)}
              >
                {post.image_url && (
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {formatDate(post.published_at || post.created_at)}
                  </div>
                  
                  {post.logo_url && (
                    <div className="mb-3 h-8">
                      <img 
                        src={post.logo_url} 
                        alt="Logo"
                        className="h-full object-contain"
                      />
                    </div>
                  )}
                  
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-swiss-red transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.meta_description || getExcerpt(post.content)}
                  </p>
                  <div className="flex items-center text-swiss-red font-medium group-hover:translate-x-1 transition-transform">
                    Weiterlesen
                    <ArrowRightIcon className="ml-1 w-4 h-4" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Presse;
