import { Link } from "react-router-dom";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export const ServicesMenu = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Services</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-6 w-[400px] bg-white">
          <li>
            <NavigationMenuLink asChild>
              <Link
                to="/redaktion"
                className={cn(
                  "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                )}
              >
                <div className="text-sm font-medium leading-none">
                  Redaktion
                </div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Unsere redaktionellen Dienstleistungen
                </p>
              </Link>
            </NavigationMenuLink>
          </li>

          <li>
            <NavigationMenuLink asChild>
              <Link
                to="/presse"
                className={cn(
                  "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                )}
              >
                <div className="text-sm font-medium leading-none">
                  Medienmitteilungen
                </div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Aktuelle Medienmitteilungen
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink asChild>
              <Link
                to="/events"
                className={cn(
                  "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                )}
              >
                <div className="text-sm font-medium leading-none">
                  Eventkalender
                </div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Aktuelle Veranstaltungen und Events
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
