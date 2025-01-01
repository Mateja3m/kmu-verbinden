import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, X, AlertCircle, MessageSquare } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Lead {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: 'pending' | 'success' | 'lost';
  createdAt: string;
  revenue?: number;
  lostReason?: string;
}

const mockLeads: Lead[] = [
  {
    id: "1",
    customerName: "Müller AG",
    email: "kontakt@mueller-ag.ch",
    phone: "+41 44 123 45 67",
    service: "Web Redesign",
    message: "Wir möchten unseren Webauftritt modernisieren und suchen professionelle Unterstützung.",
    status: "pending",
    createdAt: "2024-03-15T10:30:00Z"
  },
  {
    id: "2",
    customerName: "Schmidt GmbH",
    email: "info@schmidt-gmbh.ch",
    phone: "+41 44 234 56 78",
    service: "Web Redesign",
    message: "Komplette Überarbeitung unserer Website benötigt.",
    status: "success",
    revenue: 15000,
    createdAt: "2024-03-10T14:20:00Z"
  },
  {
    id: "3",
    customerName: "Weber & Co",
    email: "kontakt@weber-co.ch",
    phone: "+41 44 345 67 89",
    service: "Web Redesign",
    message: "Interesse an einer neuen Website mit Online-Shop.",
    status: "lost",
    lostReason: "Budget zu hoch",
    createdAt: "2024-03-05T09:15:00Z"
  }
];

export const PartnerDashboardContent = () => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState<'pending' | 'success' | 'lost'>('pending');
  const [revenue, setRevenue] = useState<string>("");
  const [lostReason, setLostReason] = useState<string>("");

  const getStatusIcon = (status: Lead['status']) => {
    switch (status) {
      case 'success':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'lost':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-CH', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setFeedbackStatus(lead.status);
    setRevenue(lead.revenue?.toString() || "");
    setLostReason(lead.lostReason || "");
    setIsModalOpen(true);
  };

  const handleFeedbackSubmit = () => {
    // This would be connected to Supabase later
    console.log("Feedback submitted:", {
      leadId: selectedLead?.id,
      status: feedbackStatus,
      revenue: revenue ? parseFloat(revenue) : undefined,
      lostReason: lostReason
    });
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Lead Management</h1>
        <p className="text-muted-foreground mt-2">
          Übersicht Ihrer Web Redesign Leads
        </p>
      </div>

      <div className="grid gap-4">
        {mockLeads.map((lead) => (
          <Card 
            key={lead.id}
            className="cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => handleLeadClick(lead)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold">{lead.customerName}</CardTitle>
              {getStatusIcon(lead.status)}
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Kontakt</p>
                  <p>{lead.email}</p>
                  <p>{lead.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Details</p>
                  <p>Service: {lead.service}</p>
                  <p>Datum: {formatDate(lead.createdAt)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
            <DialogDescription>
              Details und Feedback für {selectedLead?.customerName}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div className="grid gap-2">
              <h3 className="font-semibold">Kontaktinformationen</h3>
              <p>Email: {selectedLead?.email}</p>
              <p>Telefon: {selectedLead?.phone}</p>
            </div>

            <div className="grid gap-2">
              <h3 className="font-semibold">Anfrage</h3>
              <p>{selectedLead?.message}</p>
            </div>

            <div className="grid gap-4">
              <h3 className="font-semibold">Status Update</h3>
              <Select
                value={feedbackStatus}
                onValueChange={(value: 'pending' | 'success' | 'lost') => setFeedbackStatus(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">In Bearbeitung</SelectItem>
                  <SelectItem value="success">Erfolgreich</SelectItem>
                  <SelectItem value="lost">Verloren</SelectItem>
                </SelectContent>
              </Select>

              {feedbackStatus === 'success' && (
                <div className="grid gap-2">
                  <label htmlFor="revenue">Umsatz (CHF)</label>
                  <Input
                    id="revenue"
                    type="number"
                    value={revenue}
                    onChange={(e) => setRevenue(e.target.value)}
                    placeholder="15000"
                  />
                </div>
              )}

              {feedbackStatus === 'lost' && (
                <div className="grid gap-2">
                  <label htmlFor="lostReason">Grund</label>
                  <Textarea
                    id="lostReason"
                    value={lostReason}
                    onChange={(e) => setLostReason(e.target.value)}
                    placeholder="Warum wurde der Lead nicht gewonnen?"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Abbrechen
              </Button>
              <Button onClick={handleFeedbackSubmit}>
                Feedback senden
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};