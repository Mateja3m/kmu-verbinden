import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { subMonths } from "date-fns";

export function LeadsSection() {
  const [timeFilter, setTimeFilter] = useState("all");
  const startDate = timeFilter === "last_month" ? subMonths(new Date(), 1) : null;

  const { data: leads, isLoading } = useQuery({
    queryKey: ['leads', timeFilter],
    queryFn: async () => {
      let query = supabase
        .from('leads')
        .select(`
          *,
          member:profiles!leads_member_id_fkey(company_name),
          partner:profiles!leads_partner_id_fkey(company_name)
        `)
        .order('created_at', { ascending: false });

      if (startDate) {
        query = query.gte('created_at', startDate.toISOString());
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Ausstehend</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">In Bearbeitung</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Abgeschlossen</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Unbekannt</Badge>;
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Leads Verwaltung</h2>
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

      <div className="bg-white rounded-lg shadow-sm border">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Status</TableHead>
              <TableHead>Mitglied</TableHead>
              <TableHead>Partner</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Erstellt am</TableHead>
              <TableHead>Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads?.map((lead) => (
              <TableRow key={lead.id} className="hover:bg-gray-50 transition-colors">
                <TableCell>{getStatusBadge(lead.status)}</TableCell>
                <TableCell className="font-medium">{lead.member?.company_name || 'Unbekannt'}</TableCell>
                <TableCell>{lead.partner?.company_name || 'Nicht zugewiesen'}</TableCell>
                <TableCell>{lead.service_name}</TableCell>
                <TableCell>
                  {new Date(lead.created_at).toLocaleDateString('de-CH')}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="hover:bg-gray-100"
                    >
                      Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      Löschen
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}