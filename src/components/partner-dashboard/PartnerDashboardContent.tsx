import { useState } from "react";
import { LeadCard } from "./LeadCard";
import { LeadDetailsModal } from "./LeadDetailsModal";
import { Lead } from "@/types/leads";
import { PartnerHeader } from "./PartnerHeader";
import { PartnerStats } from "./PartnerStats";
import { ActiveCampaigns } from "./ActiveCampaigns";
import { Publications } from "./Publications";

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
      <PartnerHeader />
      <PartnerStats />
      <ActiveCampaigns />
      <Publications />

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