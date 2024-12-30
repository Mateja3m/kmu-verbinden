import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

export default function News() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const { data: posts, isLoading } = useQuery({
    queryKey: ['news-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news_posts')
        .select('*')
        .order('published_at', { ascending: false })
        .not('published_at', 'is', null);
      
      if (error) throw error;
      return data;
    }
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-CH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const totalPages = posts ? Math.ceil(posts.length / postsPerPage) : 0;
  const currentPosts = posts?.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-swiss-darkblue mb-4 bg-clip-text text-transparent bg-luxury-gradient">
              KMU News
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Aktuelle Nachrichten und Insights für Schweizer KMU
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-lg" />
                  <CardHeader>
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2 mt-2" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-20 bg-gray-200 rounded" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentPosts?.map((post) => (
                  <Link to={`/news/${post.slug}`} key={post.id} className="group">
                    <Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                      {post.image_url && (
                        <div className="h-48 overflow-hidden">
                          <img
                            src={post.image_url}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-center gap-2 text-gray-500 mb-2">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">
                            {formatDate(post.published_at || post.created_at)}
                          </span>
                        </div>
                        <CardTitle className="text-xl group-hover:text-swiss-red transition-colors">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 line-clamp-3 mb-4">
                          {post.meta_description || post.content.slice(0, 150) + '...'}
                        </p>
                        <Button 
                          variant="link" 
                          className="p-0 text-swiss-red group-hover:text-swiss-darkblue transition-colors"
                        >
                          Weiterlesen <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-16">
                  {[...Array(totalPages)].map((_, i) => (
                    <Button
                      key={i}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      onClick={() => setCurrentPage(i + 1)}
                      className={currentPage === i + 1 ? "bg-swiss-red hover:bg-swiss-red/90" : ""}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}