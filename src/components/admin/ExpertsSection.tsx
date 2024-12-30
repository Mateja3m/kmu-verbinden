import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ExpertsSection() {
  const [formData, setFormData] = useState({
    expertise_area: '',
    description: '',
    image_url: '',
    profile_id: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission will be implemented later
    console.log('Expert form submitted:', formData);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Experten Hinzufügen</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block text-sm font-medium mb-1">Profil ID</label>
          <Input
            value={formData.profile_id}
            onChange={(e) => setFormData({ ...formData, profile_id: e.target.value })}
            required
            placeholder="UUID des Mitgliederprofils"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Fachgebiet</label>
          <Input
            value={formData.expertise_area}
            onChange={(e) => setFormData({ ...formData, expertise_area: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bild URL</label>
          <Input
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Beschreibung</label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            className="min-h-[200px]"
          />
        </div>

        <Button type="submit">Experten Hinzufügen</Button>
      </form>
    </div>
  );
}
