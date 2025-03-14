
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, ButtonProps } from "@/components/ui/button";
import { Calendar } from "lucide-react";

declare global {
  interface Window {
    Calendly: any;
  }
}

interface AppointmentModalProps {
  buttonProps?: ButtonProps;
  variant?: "default" | "outline";
  showIcon?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function AppointmentModal({
  buttonProps,
  variant = "outline",
  showIcon = true,
  className,
  children,
}: AppointmentModalProps) {
  useEffect(() => {
    // Initialize Calendly scripts when modal is opened
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup is important to prevent memory leaks
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button
            variant={variant}
            className={className}
            {...buttonProps}
          >
            {showIcon && <Calendar className="mr-2 h-4 w-4" />}
            Termin vereinbaren
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl h-[700px] p-4">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Termin mit Geschäftsstelle Zürich</DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex-1 w-full h-[600px]">
          <div 
            className="calendly-inline-widget w-full h-full"
            data-url="https://calendly.com/kmuverein-skv/termin-mit-geschaftsstelle-zurich?hide_gdpr_banner=1"
            style={{ minWidth: "320px", height: "600px" }}
          ></div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
