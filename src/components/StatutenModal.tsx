import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export function StatutenModal() {
  const [loadError, setLoadError] = useState(false);

  const handleIframeError = () => {
    console.error("Failed to load PDF");
    setLoadError(true);
  };

  return (
    <Dialog>
      <DialogTrigger className="hover:text-swiss-red transition-colors">
        Statuten
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">Statuten des Schweizerischen KMU Vereins (SKV)</DialogTitle>
        </DialogHeader>
        <div className="w-full h-[70vh]">
          {loadError ? (
            <div className="w-full h-full flex items-center justify-center text-red-500">
              PDF konnte nicht geladen werden. Bitte versuchen Sie es später erneut.
            </div>
          ) : (
            <iframe
              src="https://uqxvvjdegwukvvrefkho.supabase.co/storage/v1/object/public/expert-images/statuten%20des%20schweizerischen%20kmu%20verband.pdf#toolbar=0"
              className="w-full h-full"
              title="SKV Statuten"
              onError={handleIframeError}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}