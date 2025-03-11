
import React from "react";
import { cn } from "@/lib/utils";
import { fetchStatutenPdf } from "@/utils/fetchStatutenPdf";

interface StatutenModalProps {
  className?: string;
  children?: React.ReactNode;
  pdfUrl?: string;
}

export const StatutenModal: React.FC<StatutenModalProps> = ({ className, children, pdfUrl }) => {
  const handleOpenPdf = () => {
    // Get the PDF URL and open it in a new tab
    const url = pdfUrl || fetchStatutenPdf();
    window.open(url, '_blank');
  };

  return (
    <>
      {children || (
        <button 
          type="button" 
          className={cn("hover:text-swiss-red transition-colors", className)}
          onClick={handleOpenPdf}
        >
          Statuten
        </button>
      )}
    </>
  );
};
