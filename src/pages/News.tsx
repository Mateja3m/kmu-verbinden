import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Newspaper } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

export default function News() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['news-posts'],
    queryFn: async () => {
      console.log('Starting to fetch news posts...');
      const { data, error } = await supabase
        .from('news_posts')
        .select(`
          *,
          author:author_id (
            company_name,
            contact_person
          )
        `)
        .order('published_at', { ascending: false })
        .not('published_at', 'is', null); // Only fetch published posts
      
      if (error) {
        console.error('Error fetching posts:', error);
        throw error;
      }
      
      console.log('Fetched posts:', data);
      console.log('Number of posts:', data?.length || 0);
      return data;
    }
  });

  // Log current state for debugging
  console.log('Current render state:', {
    isLoading,
    error,
    postsCount: posts?.length,
    currentPage,
    postsPerPage
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

  // Log pagination details
  console.log('Pagination details:', {
    totalPages,
    currentPostsCount: currentPosts?.length
  });

  if (error) {
    console.error('Query error:', error);
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow container mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-2xl text-red-600">Error loading news posts</h1>
            <p className="text-gray-600">Please try again later</p>
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
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-swiss-red to-swiss-darkblue">
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
          ) : posts && posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentPosts?.map((post) => (
                  <Link to={`/news/${post.slug}`} key={post.id} className="group">
                    <Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
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
                        <CardDescription className="line-clamp-2">
                          {post.meta_description || post.content.slice(0, 150) + '...'}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-swiss-red group-hover:text-swiss-darkblue transition-colors">
                          <span className="mr-2">Weiterlesen</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
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
          ) : (
            <div className="text-center py-12">
              <Newspaper className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Keine News verfügbar</h2>
              <p className="text-gray-600">Zurzeit sind keine News-Beiträge verfügbar.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}