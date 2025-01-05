import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";
import { CalendarIcon, ArrowRightIcon } from "lucide-react";

const Presse = () => {
  const [news, setNews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchNews();
  }, []);

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

  return (
    <div className="min-h-screen bg-gray-50">
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

      {/* Blog Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-swiss-red"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((post) => (
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
                    {formatDate(post.published_at)}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-swiss-red transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.meta_description || post.content}
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