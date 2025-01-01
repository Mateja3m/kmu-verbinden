import { useState } from "react";
import { LeadCard } from "./LeadCard";
import { LeadDetailsModal } from "./LeadDetailsModal";
import { Lead } from "@/types/leads";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BookOpen, Megaphone, Calendar } from "lucide-react";

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
  const [feedbackStatus, setFeedbackStatus] = useState<Lead['status']>('pending');
  const [revenue, setRevenue] = useState<string>("");
  const [lostReason, setLostReason] = useState<string>("");

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setFeedbackStatus(lead.status);
    setRevenue(lead.revenue?.toString() || "");
    setLostReason(lead.lostReason || "");
    setIsModalOpen(true);
  };

  const handleFeedbackSubmit = () => {
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
      {/* Partner Header Section */}
      <div className="mb-8 bg-white rounded-lg shadow-sm p-6 border">
        <div className="flex items-center gap-6">
          <img
            src="https://hhomepage.ch/wp-content/uploads/2021/08/hhomepage_Logo-FullColor_retina.png.webp"
            alt="hhomepage.ch logo"
            className="h-16 object-contain"
          />
          <div>
            <h1 className="text-3xl font-bold">hhomepage.ch Partner Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Webdesign und professionelle Online-Auftritte für KMU
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Aktive Leads</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Aktive Kampagnen</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">2</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Publikationen</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">1</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Lead Kampagnen</CardTitle>
            <Megaphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">1</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Campaigns Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Aktive Kampagnen</h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Web Redesign Frühlingsaktion</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Spezialangebot für KMU: Professionelles Web Redesign mit 15% Rabatt.
                Laufzeit: März - Mai 2024
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>KMU Digitalisierungspaket</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Komplettpaket für digitale Transformation: Website, SEO & Social Media.
                Laufzeit: Januar - Juni 2024
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Publications Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Publikationen & Medien</h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Interview im KMU Journal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                "Digitale Transformation im KMU-Sektor" - Erscheinungsdatum: April 2024
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Leads Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Aktuelle Leads</h2>
        <div className="grid gap-4">
          {mockLeads.map((lead) => (
            <LeadCard 
              key={lead.id}
              lead={lead}
              onClick={handleLeadClick}
            />
          ))}
        </div>
      </div>

      <LeadDetailsModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        lead={selectedLead}
        feedbackStatus={feedbackStatus}
        setFeedbackStatus={setFeedbackStatus}
        revenue={revenue}
        setRevenue={setRevenue}
        lostReason={lostReason}
        setLostReason={setLostReason}
        onSubmit={handleFeedbackSubmit}
      />
    </div>
  );
};