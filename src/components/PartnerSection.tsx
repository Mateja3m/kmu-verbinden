import { PartnerCard } from "./PartnerCard";

interface Partner {
  id: string;
  name: string;
  logo: string;
  website: string;
  description: string;
  customBackground?: string;
}

interface PartnerSectionProps {
  title: string;
  description: string;
  partners: Partner[];
}

export const PartnerSection = ({ title, description, partners }: PartnerSectionProps) => {
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-lg text-muted-foreground mb-8">{description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
};