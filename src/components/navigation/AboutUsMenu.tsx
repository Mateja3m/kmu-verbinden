import { Link } from "react-router-dom";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export const AboutUsMenu = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Über uns</NavigationMenuTrigger>
      <NavigationMenuContent className="bg-white">
        <ul className="grid gap-3 p-6 w-[400px] bg-white">
          <li>
            <NavigationMenuLink asChild>
              <Link
                to="/presidency"
                className={cn(
                  "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                )}
              >
                <div className="text-sm font-medium leading-none">Präsidium</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Lernen Sie unseren Präsidenten kennen
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink asChild>
              <Link
                to="/organisation"
                className={cn(
                  "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                )}
              >
                <div className="text-sm font-medium leading-none">Organisation</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Unsere Organisationsstruktur
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink asChild>
              <Link
                to="/geschaeftsstelle"
                className={cn(
                  "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                )}
              >
                <div className="text-sm font-medium leading-none">Geschäftsstelle</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Unsere Standorte und Team
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink asChild>
              <Link
                to="/rechtsdienst"
                className={cn(
                  "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                )}
              >
                <div className="text-sm font-medium leading-none">Rechtsdienst</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Kostenlose Rechtsberatung für Mitglieder
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};