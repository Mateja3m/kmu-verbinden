
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const LoginButtons = () => {
  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full bg-transparent border-swiss-red text-white hover:bg-swiss-red hover:text-white transition-colors"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Login
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-48 bg-white border border-swiss-red"
          align="end"
        >
          <Link to="/auth?type=member">
            <DropdownMenuItem className="cursor-pointer hover:bg-swiss-red hover:text-white transition-colors">
              <LogIn className="mr-2 h-4 w-4" />
              Mitglieder Login
            </DropdownMenuItem>
          </Link>
          <Link to="/auth?type=partner">
            <DropdownMenuItem className="cursor-pointer hover:bg-swiss-red hover:text-white transition-colors">
              <LogIn className="mr-2 h-4 w-4" />
              Partner Login
            </DropdownMenuItem>
          </Link>
          <Link to="/admin/auth">
            <DropdownMenuItem className="cursor-pointer hover:bg-swiss-red hover:text-white transition-colors">
              <LogIn className="mr-2 h-4 w-4" />
              Admin Login
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
