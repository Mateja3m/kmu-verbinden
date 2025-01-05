import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const News = () => {
  const [news, setNews] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from("news_posts")
      .select("*")
      .order("published_at", { ascending: false });

    if (error) {
      console.error("Error fetching news:", error);
      return;
    }

    if (data) {
      setNews(data);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
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
          <h1 className="text-4xl font-bold text-white">KMU News</h1>
        </div>
      </div>

      {/* News Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/news/${post.slug}`)}
            >
              {post.image_url && (
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 line-clamp-3">{post.content}</p>
                <div className="mt-4 text-sm text-gray-500">
                  {new Date(post.published_at).toLocaleDateString("de-CH")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default News;