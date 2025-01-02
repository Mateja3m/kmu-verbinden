import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function News() {
  const [currentPage] = useState(1);

  // Placeholder data
  const placeholderPosts = [
    {
      id: 1,
      title: "KMU Verein lanciert neue Digitalisierungsinitiative",
      description: "Der KMU Verein Schweiz hat heute eine wegweisende Initiative zur Förderung der Digitalisierung vorgestellt...",
      date: "2024-03-15",
      imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Erfolgreicher Networking-Event in Zürich",
      description: "Über 100 Mitglieder des KMU Vereins trafen sich zum halbjährlichen Networking-Event in Zürich...",
      date: "2024-03-13",
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Neue Partnerschaft mit der Bankiervereinigung",
      description: "Der KMU Verein Schweiz freut sich, eine strategische Partnerschaft bekannt zu geben...",
      date: "2024-03-10",
      imageUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80"
    }
  ];

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
      
      <main className="flex-grow container mx-auto px-4 py-24 bg-swiss-gray">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4 text-swiss-darkblue">
              KMU News
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Aktuelle Nachrichten und Insights für Schweizer KMU
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {placeholderPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">
                      {formatDate(post.date)}
                    </span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-swiss-red transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-swiss-red group-hover:text-swiss-darkblue transition-colors">
                    <span className="mr-2">Weiterlesen</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-16">
            <Button variant="outline" className="bg-white">1</Button>
            <Button className="bg-swiss-red hover:bg-swiss-red/90">2</Button>
            <Button variant="outline" className="bg-white">3</Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}