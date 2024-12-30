import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Users, Calendar, Handshake, ChartBar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";

export function DashboardStats() {
  const { data: memberCount } = useQuery({
    queryKey: ['member-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('member_type', 'member');
      return count || 0;
    }
  });

  const { data: latestPost } = useQuery({
    queryKey: ['latest-post'],
    queryFn: async () => {
      const { data } = await supabase
        .from('news_posts')
        .select('published_at')
        .order('published_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      return data?.published_at;
    }
  });

  const { data: newPartnersCount } = useQuery({
    queryKey: ['new-partners-count'],
    queryFn: async () => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { count } = await supabase
        .from('partners')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', thirtyDaysAgo.toISOString());
      return count || 0;
    }
  });

  const stats = [
    {
      title: "Mitglieder",
      value: memberCount?.toString() || "...",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Letzter Blogpost",
      value: latestPost ? format(new Date(latestPost), 'dd.MM.yyyy') : "Keine Posts",
      icon: Calendar,
      color: "text-green-600"
    },
    {
      title: "Neue Partner (30 Tage)",
      value: newPartnersCount?.toString() || "...",
      icon: Handshake,
      color: "text-purple-600"
    },
    {
      title: "Aktive Services",
      value: "5",
      icon: ChartBar,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="flex items-center p-6">
            <div className={`rounded-full p-3 mr-4 ${stat.color} bg-opacity-10`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}