import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function ExpertInviteForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    expertise: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.admin.inviteUserByEmail(formData.email, {
        data: {
          name: formData.name,
          expertise: formData.expertise,
          invited_as: 'expert'
        }
      });

      if (error) throw error;

      toast({
        title: "Einladung versendet",
        description: "Der Experte wurde erfolgreich eingeladen.",
      });

      setFormData({
        email: '',
        name: '',
        expertise: '',
        message: ''
      });
    } catch (error) {
      console.error('Error inviting expert:', error);
      toast({
        title: "Fehler",
        description: "Die Einladung konnte nicht versendet werden.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Experten einladen</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">E-Mail</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Fachgebiet</label>
          <Input
            value={formData.expertise}
            onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Einladungsnachricht</label>
          <Textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="min-h-[100px]"
          />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Wird versendet..." : "Einladung senden"}
        </Button>
      </form>
    </div>
  );
}