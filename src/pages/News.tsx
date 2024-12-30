import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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

  // Calculate pagination
  const totalPages = posts ? Math.ceil(posts.length / postsPerPage) : 0;
  const currentPosts = posts?.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-24">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-swiss-darkblue mb-2">KMU News</h1>
          <p className="text-lg text-gray-600 mb-12">
            Aktuelle Nachrichten und Insights für Schweizer KMU
          </p>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPosts?.map((post) => (
                  <Link to={`/news/${post.slug}`} key={post.id}>
                    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                      {post.image_url && (
                        <div className="h-48 overflow-hidden">
                          <img
                            src={post.image_url}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="text-xl">{post.title}</CardTitle>
                        <CardDescription>
                          {formatDate(post.published_at || post.created_at)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 line-clamp-3">
                          {post.meta_description || post.content.slice(0, 150) + '...'}
                        </p>
                        <Button variant="link" className="mt-4 p-0">
                          Weiterlesen <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  {[...Array(totalPages)].map((_, i) => (
                    <Button
                      key={i}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      onClick={() => setCurrentPage(i + 1)}
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