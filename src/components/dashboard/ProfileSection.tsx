import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Tables } from "@/integrations/supabase/types";

type Profile = Tables<"profiles">;

export const ProfileSection = ({ 
  profile, 
  setProfile 
}: { 
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
}) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<Profile>>(profile || {});

  const handleSaveProfile = async () => {
    if (!profile?.id) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        company_name: editedProfile.company_name,
        contact_person: editedProfile.contact_person,
        address: editedProfile.address,
        postal_code: editedProfile.postal_code,
        city: editedProfile.city,
        phone: editedProfile.phone
      })
      .eq("id", profile.id);

    if (error) {
      toast({
        title: "Fehler",
        description: "Profil konnte nicht aktualisiert werden",
        variant: "destructive",
      });
      return;
    }

    setProfile({ ...profile, ...editedProfile });
    setIsEditing(false);
    toast({
      title: "Erfolg",
      description: "Profil wurde erfolgreich aktualisiert",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-swiss-darkblue">
          Unternehmensprofil
        </h2>
        <Button
          onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
          variant={isEditing ? "default" : "outline"}
        >
          {isEditing ? "Speichern" : "Bearbeiten"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "Firmenname", key: "company_name" },
          { label: "Kontaktperson", key: "contact_person" },
          { label: "Adresse", key: "address" },
          { label: "PLZ", key: "postal_code" },
          { label: "Ort", key: "city" },
          { label: "Telefon", key: "phone" },
        ].map(({ label, key }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              {label}
            </label>
            {isEditing ? (
              <Input
                value={(editedProfile[key as keyof typeof editedProfile] as string) || ""}
                onChange={(e) => setEditedProfile(prev => ({
                  ...prev,
                  [key]: e.target.value
                }))}
                className="w-full"
              />
            ) : (
              <div className="text-swiss-darkblue">
                {(profile?.[key as keyof typeof profile] as string) || "-"}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};