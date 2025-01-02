import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export const CalendlyModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-transparent border-swiss-red text-white hover:bg-swiss-red hover:text-white transition-colors w-full"
        >
          <Calendar className="mr-2 h-4 w-4" />
          Termin vereinbaren
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] h-[80vh]">
        <iframe
          src="https://calendly.com/kmuverein-skv"
          width="100%"
          height="100%"
          frameBorder="0"
        />
      </DialogContent>
    </Dialog>
  );
};