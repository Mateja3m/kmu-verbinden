import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function MembersSection() {
  const [members] = useState([
    {
      id: '1',
      member_type: 'member',
      company_name: 'Example AG',
      contact_person: 'John Doe',
      city: 'Zürich',
      phone: '+41 123 456 789',
      created_at: '2024-01-01'
    },
    // Add more mock data as needed
  ]);

  const getMemberTypeLabel = (type: string) => {
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
                <TableCell className="font-medium">{member.company_name}</TableCell>
                <TableCell>{member.contact_person}</TableCell>
                <TableCell>{member.city}</TableCell>
                <TableCell>{member.phone}</TableCell>
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