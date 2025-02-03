import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function StatutenModal() {
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
          <iframe
            src="https://uqxvvjdegwukvvrefkho.supabase.co/storage/v1/object/public/expert-images/statuten.pdf#toolbar=0"
            className="w-full h-full"
            title="SKV Statuten"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}