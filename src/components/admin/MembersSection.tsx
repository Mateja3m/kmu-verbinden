import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function MembersSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingMember, setEditingMember] = useState<any>(null);
  const { toast } = useToast();

  const { data: members = [], refetch } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  const filteredMembers = members.filter((member) => {
    const searchString = searchTerm.toLowerCase();
    return (
      member.company_name?.toLowerCase().includes(searchString) ||
      member.contact_person?.toLowerCase().includes(searchString) ||
      member.member_number?.toLowerCase().includes(searchString) ||
      member.city?.toLowerCase().includes(searchString)
    );
  });

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

  const handleUpdateMember = async (updatedData: any) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updatedData)
        .eq('id', editingMember.id);

      if (error) throw error;

      toast({
        title: "Erfolgreich aktualisiert",
        description: "Die Mitgliederdaten wurden erfolgreich aktualisiert.",
      });

      refetch();
      setEditingMember(null);
    } catch (error: any) {
      toast({
        title: "Fehler beim Aktualisieren",
        description: error.message,
        variant: "destructive",
      });
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

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Suche nach Firma, Kontaktperson, Mitgliedernummer oder Stadt..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Mitgliedernr.</TableHead>
              <TableHead>Firma</TableHead>
              <TableHead>Kontaktperson</TableHead>
              <TableHead>Stadt</TableHead>
              <TableHead>Telefon</TableHead>
              <TableHead>Mitglied seit</TableHead>
              <TableHead>Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{getMemberTypeLabel(member.member_type)}</TableCell>
                <TableCell>{member.member_number}</TableCell>
                <TableCell className="font-medium">{member.company_name}</TableCell>
                <TableCell>{member.contact_person}</TableCell>
                <TableCell>{member.city}</TableCell>
                <TableCell>{member.phone}</TableCell>
                <TableCell>
                  {new Date(member.created_at).toLocaleDateString('de-CH')}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setEditingMember(member)}
                        >
                          Bearbeiten
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Mitglied Bearbeiten</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="company" className="text-right">
                              Firma
                            </Label>
                            <Input
                              id="company"
                              defaultValue={member.company_name}
                              className="col-span-3"
                              onChange={(e) => {
                                setEditingMember({
                                  ...editingMember,
                                  company_name: e.target.value
                                });
                              }}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="contact" className="text-right">
                              Kontaktperson
                            </Label>
                            <Input
                              id="contact"
                              defaultValue={member.contact_person}
                              className="col-span-3"
                              onChange={(e) => {
                                setEditingMember({
                                  ...editingMember,
                                  contact_person: e.target.value
                                });
                              }}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">
                              Telefon
                            </Label>
                            <Input
                              id="phone"
                              defaultValue={member.phone}
                              className="col-span-3"
                              onChange={(e) => {
                                setEditingMember({
                                  ...editingMember,
                                  phone: e.target.value
                                });
                              }}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="city" className="text-right">
                              Stadt
                            </Label>
                            <Input
                              id="city"
                              defaultValue={member.city}
                              className="col-span-3"
                              onChange={(e) => {
                                setEditingMember({
                                  ...editingMember,
                                  city: e.target.value
                                });
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setEditingMember(null)}
                          >
                            Abbrechen
                          </Button>
                          <Button
                            onClick={() => handleUpdateMember(editingMember)}
                            className="bg-swiss-red hover:bg-swiss-red/90"
                          >
                            Speichern
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
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