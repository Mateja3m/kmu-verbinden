import { useParams } from 'react-router-dom';
import { partnerConfig } from '@/config/partners';

export const PartnerHeader = () => {
  const { partnerType } = useParams();
  const partner = partnerConfig[partnerType as keyof typeof partnerConfig];

  if (!partner) return null;

  return (
    <div className="mb-8 bg-white rounded-lg shadow-sm p-6 border">
      <div className="flex items-center gap-6">
        <img
          src={partner.logo}
          alt={`${partner.name} logo`}
          className="h-16 object-contain"
        />
        <div>
          <h1 className="text-3xl font-bold">{partner.name} Partner Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            {partner.description}
          </p>
        </div>
      </div>
    </div>
  );
};