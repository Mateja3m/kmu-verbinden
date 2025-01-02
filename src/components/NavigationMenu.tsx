import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NavigationAuthItems } from "./NavigationAuthItems";

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/" className="text-sm font-medium">
            Home
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Über uns</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 w-[400px]">
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    to="/presidency"
                    className={cn(
                      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    )}
                  >
                    <div className="text-sm font-medium leading-none">
                      Präsidium
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Lernen Sie unseren Präsidenten kennen
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    to="/unsere-auftrag"
                    className={cn(
                      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    )}
                  >
                    <div className="text-sm font-medium leading-none">
                      Unsere Auftrag
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Erfahren Sie mehr über unsere Mission
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 w-[400px]">
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    to="/rechtsdienst"
                    className={cn(
                      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    )}
                  >
                    <div className="text-sm font-medium leading-none">
                      Rechtsdienst
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Rechtliche Unterstützung für KMU
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    to="/experts"
                    className={cn(
                      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    )}
                  >
                    <div className="text-sm font-medium leading-none">
                      Expertenrat
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Fachexperten für Ihre Bedürfnisse
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    to="/expert-submission"
                    className={cn(
                      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    )}
                  >
                    <div className="text-sm font-medium leading-none">
                      Experte werden
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Werden Sie Teil unseres Expertennetzwerks
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/partners" className="text-sm font-medium">
            Partner
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/news" className="text-sm font-medium">
            News
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/kontakt" className="text-sm font-medium">
            Kontakt
          </Link>
        </NavigationMenuItem>

        <NavigationAuthItems />
      </NavigationMenuList>
    </NavigationMenu>
  );
}