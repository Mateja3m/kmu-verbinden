
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface NewsHeaderProps {
  editMode: boolean;
  onCancel: () => void;
}

export function NewsHeader({ editMode, onCancel }: NewsHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">
        {editMode ? "Medienmitteilung Bearbeiten" : "Medienmitteilung Erstellen"}
      </h2>
      {editMode && (
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Zurück zur Übersicht
        </Button>
      )}
    </div>
  );
}
