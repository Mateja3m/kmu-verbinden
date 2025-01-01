import { ProfileSection } from "./ProfileSection";
import { ServicesSection } from "./ServicesSection";
import { BenefitsMenu } from "./BenefitsMenu";
import { InvoicesSection } from "./InvoicesSection";
import AIChat from "@/components/AIChat";
import FinancingSimulator from "@/components/FinancingSimulator";

// Mock data
const mockProfile = {
  id: "1",
  company_name: "Muster AG",
  contact_person: "Hans Muster",
  address: "Musterstrasse 1",
  postal_code: "3900",
  city: "Brig",
  phone: "+41 79 123 45 67",
};

const mockServices = [
  {
    id: "1",
    name: "Digitale Präsenz",
    description: "Optimieren Sie Ihre Online-Sichtbarkeit",
  },
  {
    id: "2",
    name: "Rechtliche Beratung",
    description: "Professionelle juristische Unterstützung",
  },
  {
    id: "3",
    name: "Marketing Support",
    description: "Strategische Marketingberatung",
  },
];

const mockClaimedServices = [mockServices[0]];

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