import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, AlertCircle } from "lucide-react";
import { Lead } from "@/types/leads";

interface LeadCardProps {
  lead: Lead;
  onClick: (lead: Lead) => void;
}

export const LeadCard = ({ lead, onClick }: LeadCardProps) => {
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

  return (
    <Card 
      className="cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => onClick(lead)}
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
  );
};