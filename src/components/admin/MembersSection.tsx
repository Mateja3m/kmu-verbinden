import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

export function MembersSection() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setMembers(data);
      }
      setLoading(false);
    };

    fetchMembers();
  }, []);

  const getMemberTypeLabel = (type: string | null) => {
    switch (type) {
      case 'member':
        return <Badge className="bg-blue-500">Mitglied</Badge>;
      case 'partner':
        return <Badge className="bg-green-500">Partner</Badge>;
      case 'expert':
        return <Badge className="bg-purple-500">Experte</Badge>;
      default:
        return <Badge className="bg-gray-500">Pending</Badge>;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">KMU Verein Mitglieder Verwaltung</h2>
        <Button className="bg-swiss-red hover:bg-swiss-red/90">
          + Neues Mitglied
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Firma</TableHead>
              <TableHead>Kontaktperson</TableHead>
              <TableHead>Stadt</TableHead>
              <TableHead>Telefon</TableHead>
              <TableHead>Mitglied seit</TableHead>
              <TableHead>Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{getMemberTypeLabel(member.member_type)}</TableCell>
                <TableCell className="font-medium">{member.company_name || '-'}</TableCell>
                <TableCell>{member.contact_person || '-'}</TableCell>
                <TableCell>{member.city || '-'}</TableCell>
                <TableCell>{member.phone || '-'}</TableCell>
                <TableCell>
                  {new Date(member.created_at).toLocaleDateString('de-CH')}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Bearbeiten
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