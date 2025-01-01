import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export function LeadsSection() {
  const { data: leads, isLoading } = useQuery({
    queryKey: ['leads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select(`
          *,
          member:profiles!leads_member_id_fkey(company_name),
          partner:profiles!leads_partner_id_fkey(company_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500">Ausstehend</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-500">In Bearbeitung</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Abgeschlossen</Badge>;
      default:
        return <Badge className="bg-gray-500">Unbekannt</Badge>;
    }
  };

  if (isLoading) {
    return <div>Lädt...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Leads Verwaltung</h2>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
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
              <TableRow key={lead.id}>
                <TableCell>{getStatusBadge(lead.status)}</TableCell>
                <TableCell>{lead.member?.company_name || 'Unbekannt'}</TableCell>
                <TableCell>{lead.partner?.company_name || 'Nicht zugewiesen'}</TableCell>
                <TableCell>{lead.service_name}</TableCell>
                <TableCell>
                  {new Date(lead.created_at).toLocaleDateString('de-CH')}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                    <Button variant="outline" size="sm" className="text-swiss-red">
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