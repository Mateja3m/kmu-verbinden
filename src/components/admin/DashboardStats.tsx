import { useQuery } from "@tanstack/react-query";
import { format, subMonths } from "date-fns";
import { Users, FileText, Handshake, UserCheck, ChevronUp, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export function DashboardStats() {
  const [timeFilter, setTimeFilter] = useState("all");
  const startDate = timeFilter === "last_month" ? subMonths(new Date(), 1) : null;

  const { data: memberCount } = useQuery({
    queryKey: ['member-count', timeFilter],
    queryFn: async () => {
      let query = supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('member_type', 'member');
      
      if (startDate) {
        query = query.gte('created_at', startDate.toISOString());
      }
      
      const { count } = await query;
      return count || 0;
    }
  });

  const { data: blogPostCount } = useQuery({
    queryKey: ['blog-post-count', timeFilter],
    queryFn: async () => {
      let query = supabase
        .from('news_posts')
        .select('*', { count: 'exact', head: true });
      
      if (startDate) {
        query = query.gte('created_at', startDate.toISOString());
      }
      
      const { count } = await query;
      return count || 0;
    }
  });

  const { data: newPartnersCount } = useQuery({
    queryKey: ['new-partners-count', timeFilter],
    queryFn: async () => {
      let query = supabase
        .from('partners')
        .select('*', { count: 'exact', head: true });
      
      if (startDate) {
        query = query.gte('created_at', startDate.toISOString());
      }
      
      const { count } = await query;
      return count || 0;
    }
  });

  const { data: leadsCount } = useQuery({
    queryKey: ['leads-count', timeFilter],
    queryFn: async () => {
      let query = supabase
        .from('leads')
        .select('*', { count: 'exact', head: true });
      
      if (startDate) {
        query = query.gte('created_at', startDate.toISOString());
      }
      
      const { count } = await query;
      return count || 0;
    }
  });

  const stats = [
    {
      title: "Mitglieder",
      value: memberCount?.toString() || "...",
      icon: Users,
      trend: "+5%",
      trendUp: true
    },
    {
      title: "Blog Posts",
      value: blogPostCount?.toString() || "...",
      icon: FileText,
      trend: "+2%",
      trendUp: true
    },
    {
      title: "Neue Partner",
      value: newPartnersCount?.toString() || "...",
      icon: Handshake,
      trend: "-1%",
      trendUp: false
    },
    {
      title: "Vermittelte Leads",
      value: leadsCount?.toString() || "...",
      icon: UserCheck,
      trend: "+8%",
      trendUp: true
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Zeitraum auswählen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle Zeit</SelectItem>
            <SelectItem value="last_month">Letzter Monat</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card 
            key={stat.title}
            className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="rounded-full p-3 bg-gray-100">
                  <stat.icon className="h-6 w-6 text-gray-600" />
                </div>
                <div className={`flex items-center ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trendUp ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                  <span className="text-sm font-medium">{stat.trend}</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}