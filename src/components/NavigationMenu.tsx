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
import { ExternalLink } from "lucide-react";

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
              <ul className="grid gap-3 p-6 w-[400px] bg-white">
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
            <Link 
              to="/membership" 
              className="text-sm font-medium px-3 py-2 rounded-md hover:bg-accent"
            >
              Mitglieder
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link 
              to="/partners" 
              className="text-sm font-medium px-3 py-2 rounded-md hover:bg-accent"
            >
              Partner
            </Link>
          </NavigationMenuItem>
        </div>

        <NavigationMenuItem>
          <a 
            href="https://unternehmensjournal.ch" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm font-medium inline-flex items-center hover:text-swiss-red transition-colors"
          >
            KMU News
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}