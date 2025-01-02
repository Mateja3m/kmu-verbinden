import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ExternalLink } from "lucide-react";

const NavigationMenuDemo = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white via-swiss-lightblue to-swiss-red/20 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NavigationMenu className="mx-auto max-w-full py-4">
          <NavigationMenuList className="flex items-center justify-between w-full">
            {/* Left side menu items */}
            <div className="flex items-center space-x-4">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-white/50 text-swiss-darkblue font-medium">
                  Über uns
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white/95 backdrop-blur-sm shadow-lg rounded-lg border border-gray-100">
                  <ul className="grid gap-3 p-6 w-[400px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/unsere-auftrag"
                          className="block p-3 space-y-1 hover:bg-gray-50 rounded-md transition-colors"
                        >
                          <div className="font-medium text-swiss-darkblue">Unsere Auftrag</div>
                          <p className="text-sm text-gray-600">
                            Erfahren Sie mehr über unseren Auftrag und unsere Vision
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/presidency"
                          className="block p-3 space-y-1 hover:bg-gray-50 rounded-md transition-colors"
                        >
                          <div className="font-medium text-swiss-darkblue">Präsidium</div>
                          <p className="text-sm text-gray-600">
                            Lernen Sie unsere Führung kennen
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-white/50 text-swiss-darkblue font-medium">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white/95 backdrop-blur-sm shadow-lg rounded-lg border border-gray-100">
                  <ul className="grid gap-3 p-6 w-[400px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/redaktion"
                          className="block p-3 space-y-1 hover:bg-gray-50 rounded-md transition-colors"
                        >
                          <div className="font-medium text-swiss-darkblue">Redaktion</div>
                          <p className="text-sm text-gray-600">
                            Professionelle redaktionelle Dienstleistungen
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/rechtsdienst"
                          className="block p-3 space-y-1 hover:bg-gray-50 rounded-md transition-colors"
                        >
                          <div className="font-medium text-swiss-darkblue">Rechtsdienst</div>
                          <p className="text-sm text-gray-600">
                            Rechtliche Unterstützung für Ihr Unternehmen
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
                  className="px-4 py-2 text-swiss-darkblue hover:text-swiss-red transition-colors font-medium"
                >
                  Mitglieder
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link 
                  to="/partners" 
                  className="px-4 py-2 text-swiss-darkblue hover:text-swiss-red transition-colors font-medium"
                >
                  Partner
                </Link>
              </NavigationMenuItem>
            </div>

            {/* Right side menu items */}
            <NavigationMenuItem className="ml-auto">
              <a
                href="https://unternehmensjournal.ch"
                target="_blank"
                rel="noopener noreferrer" 
                className="px-4 py-2 text-swiss-darkblue hover:text-swiss-red transition-colors font-medium inline-flex items-center"
              >
                KMU News
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default NavigationMenuDemo;