import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";
import { CalendarIcon } from "lucide-react";

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
    <div className="min-h-screen bg-white">
      {/* Hero Banner with Dark Overlay */}
      <div className="relative h-[300px] w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/lovable-uploads/002dc341-7fd5-4d7a-be63-14e368f7abfa.png')",
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Blog & Medienmitteilungen</h1>
            <p className="text-xl text-white/90">Aktuelle Nachrichten und Insights für Schweizer KMU</p>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-swiss-red"></div>
          </div>
        ) : (
          <div className="space-y-12">
            {news.map((post) => (
              <article
                key={post.id}
                className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/news/${post.slug}`)}
              >
                <div className="md:flex">
                  {post.image_url && (
                    <div className="md:w-1/3">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 md:w-2/3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        {formatDate(post.published_at)}
                      </div>
                      <h2 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-swiss-red transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 line-clamp-3 mb-4">
                        {post.meta_description || post.content}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-swiss-red font-medium group-hover:translate-x-1 transition-transform">
                      Weiterlesen
                      <svg className="ml-1 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
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