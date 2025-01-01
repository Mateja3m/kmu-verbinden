import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Lead } from "@/types/leads";

interface LeadDetailsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  lead: Lead | null;
  feedbackStatus: Lead['status'];
  setFeedbackStatus: (status: Lead['status']) => void;
  revenue: string;
  setRevenue: (revenue: string) => void;
  lostReason: string;
  setLostReason: (reason: string) => void;
  onSubmit: () => void;
}

export const LeadDetailsModal = ({
  isOpen,
  onOpenChange,
  lead,
  feedbackStatus,
  setFeedbackStatus,
  revenue,
  setRevenue,
  lostReason,
  setLostReason,
  onSubmit
}: LeadDetailsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Lead Details</DialogTitle>
          <DialogDescription>
            Details und Feedback für {lead?.customerName}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="grid gap-2">
            <h3 className="font-semibold">Kontaktinformationen</h3>
            <p>Email: {lead?.email}</p>
            <p>Telefon: {lead?.phone}</p>
          </div>

          <div className="grid gap-2">
            <h3 className="font-semibold">Anfrage</h3>
            <p>{lead?.message}</p>
          </div>

          <div className="grid gap-4">
            <h3 className="font-semibold">Status Update</h3>
            <Select
              value={feedbackStatus}
              onValueChange={(value: Lead['status']) => setFeedbackStatus(value)}
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
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Abbrechen
            </Button>
            <Button onClick={onSubmit}>
              Feedback senden
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};