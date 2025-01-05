import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { AboutUsMenu } from "./navigation/AboutUsMenu";
import { ServicesMenu } from "./navigation/ServicesMenu";
import { NewsMenu } from "./navigation/NewsMenu";

interface NavigationMenuDemoProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
  handleLogout: () => void;
}

export function NavigationMenuDemo({ isLoggedIn, isAdmin, handleLogout }: NavigationMenuDemoProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList className="relative w-full justify-between">
        <div className="flex items-center space-x-4">
          <AboutUsMenu />
          <ServicesMenu />
          <NavigationMenuItem>
            <Link 
              to="/membership" 
              className="text-sm font-medium px-3 py-2 rounded-md hover:bg-accent"
            >
              Mitgliedschaft
            </Link>
          </NavigationMenuItem>
          <NewsMenu />
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
}