import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export const LoginButtons = () => {
  return (
    <div className="flex flex-col space-y-2">
      <Link to="/auth?type=member">
        <Button 
          variant="outline" 
          className="w-full bg-transparent border-swiss-red text-white hover:bg-swiss-red hover:text-white transition-colors"
        >
          <LogIn className="mr-2 h-4 w-4" />
          Mitglieder Login
        </Button>
      </Link>
      <Link to="/auth?type=partner">
        <Button 
          variant="outline" 
          className="w-full bg-transparent border-swiss-red text-white hover:bg-swiss-red hover:text-white transition-colors"
        >
          <LogIn className="mr-2 h-4 w-4" />
          Partner Login
        </Button>
      </Link>
      <Link to="/auth?type=admin">
        <Button 
          variant="outline" 
          className="w-full bg-transparent border-swiss-red text-white hover:bg-swiss-red hover:text-white transition-colors"
        >
          <LogIn className="mr-2 h-4 w-4" />
          Admin Login
        </Button>
      </Link>
    </div>
  );
};