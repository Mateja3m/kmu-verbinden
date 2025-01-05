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
                      to="/redaktion"
                      className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      )}
                    >
                      <div className="text-sm font-medium leading-none">Redaktion</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Unsere redaktionellen Dienstleistungen
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/versicherungsrechner"
                      className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      )}
                    >
                      <div className="text-sm font-medium leading-none">KMU-Versicherungsrechner</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Berechnen Sie Ihre Versicherungsprämien
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
                      <div className="text-sm font-medium leading-none">Eventkalender</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Aktuelle Veranstaltungen und Events
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>KMU-News</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 w-[400px] bg-white">
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/news"
                      className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      )}
                    >
                      <div className="text-sm font-medium leading-none">KMU-Zeitung: Unternehmensblick</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Unsere Quartalszeitung für KMUs
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <a
                      href="https://unternehmensjournal.ch"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      )}
                    >
                      <div className="text-sm font-medium leading-none flex items-center">
                        KMU Unternehmensjournal
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Tägliche News und Analysen
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/news/praxisratgeber"
                      className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      )}
                    >
                      <div className="text-sm font-medium leading-none">KMU Praxisratgeber</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Praktische Leitfäden für Ihren Geschäftsalltag
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/news/branchenmagazine"
                      className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      )}
                    >
                      <div className="text-sm font-medium leading-none">Branchenmagazine</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Spezifische Publikationen für Ihre Branche
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/news/ebooks"
                      className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      )}
                    >
                      <div className="text-sm font-medium leading-none">eBooks & digitale Leitfäden</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Digitale Ressourcen für Ihr Unternehmen
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
              Mitgliedschaft
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
      </NavigationMenuList>
    </NavigationMenu>
  );
}