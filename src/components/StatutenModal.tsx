
import React from "react";
import { cn } from "@/lib/utils";
import { fetchStatutenPdf } from "@/utils/fetchStatutenPdf";

interface StatutenModalProps {
  className?: string;
  children?: React.ReactNode;
}

export const StatutenModal: React.FC<StatutenModalProps> = ({ className, children }) => {
  const handleOpenPdf = () => {
    // Get the PDF URL and open it in a new tab
    const pdfUrl = fetchStatutenPdf();
    window.open(pdfUrl, '_blank');
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
