import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export const NewsMenu = () => {
  return (
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
  );
};