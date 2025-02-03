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
            src={`https://res.cloudinary.com/dphbnwjtx/image/upload/v1738572898/Statuten_des_Schweizerischen_KMU_Vereins_SKV_.docx_sxi85a.pdf`}
            className="w-full h-full"
            title="SKV Statuten"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}