import { ProfileSection } from "./ProfileSection";
import { ServicesSection } from "./ServicesSection";
import { BenefitsMenu } from "./BenefitsMenu";
import { InvoicesSection } from "./InvoicesSection";
import AIChat from "@/components/AIChat";
import FinancingSimulator from "@/components/FinancingSimulator";
import { Tables } from "@/integrations/supabase/types";

// Mock data with all required fields
const mockProfile: Tables<"profiles"> = {
  id: "1",
  company_name: "Muster AG",
  contact_person: "Hans Muster",
  address: "Musterstrasse 1",
  postal_code: "3900",
  city: "Brig",
  phone: "+41 79 123 45 67",
  created_at: new Date().toISOString(),
  is_admin: false,
  member_type: "member",
  membership_status: "active",
  terms_accepted: true,
  website: "www.muster-ag.ch"
};

const mockServices: Tables<"services">[] = [
  {
    id: "1",
    name: "Digitale Präsenz",
    description: "Optimieren Sie Ihre Online-Sichtbarkeit",
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    name: "Rechtliche Beratung",
    description: "Professionelle juristische Unterstützung",
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    name: "Marketing Support",
    description: "Strategische Marketingberatung",
    created_at: new Date().toISOString()
  },
];

const mockClaimedServices: Tables<"services">[] = [mockServices[0]];

export const DashboardContent = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <ProfileSection 
            profile={mockProfile} 
            setProfile={() => {}} 
          />
        </div>
        <div>
          <BenefitsMenu
            services={mockServices}
            claimedServices={mockClaimedServices}
            onClaimService={() => {}}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FinancingSimulator />
        <AIChat />
      </div>

      <InvoicesSection profile={mockProfile} />

      <ServicesSection 
        profile={mockProfile}
        services={mockServices}
        claimedServices={mockClaimedServices}
        setClaimedServices={() => {}}
      />
    </div>
  );
};