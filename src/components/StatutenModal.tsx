
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { fetchStatutenPdf } from "@/utils/fetchStatutenPdf";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";

interface StatutenModalProps {
  className?: string;
  children?: React.ReactNode;
  pdfUrl?: string;
}

export const StatutenModal: React.FC<StatutenModalProps> = ({ className, children, pdfUrl }) => {
  const [open, setOpen] = useState(false);
  const documentUrl = pdfUrl || fetchStatutenPdf();

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(documentUrl, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <button 
            type="button" 
            className={cn("hover:text-swiss-red transition-colors", className)}
          >
            Statuten
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh] p-0 flex flex-col bg-white">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Statuten</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-0 h-8 w-8 rounded-full"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>
        <div className="flex-1 w-full">
          <iframe
            src={documentUrl}
            title="Statuten PDF"
            className="w-full h-full border-0"
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
};
