import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";

export function SitemapModal() {
  const sitemapLinks = [
    { name: "Home", path: "/" },
    { name: "Präsidium", path: "/presidency" },
    { name: "Mitgliedschaft", path: "/membership" },
    { name: "Partner", path: "/partners" },
    { name: "Expertenrat", path: "/experts" },
    { name: "Kontakt", path: "/kontakt" },
    { name: "KMU-News", path: "/news" },
    { name: "Redaktion", path: "/redaktion" },
    { name: "Rechtsdienst", path: "/rechtsdienst" },
    { name: "Aktuelle Projekte", path: "/aktuelle-projekte" },
    { name: "Unser Auftrag", path: "/unsere-auftrag" },
    { name: "AGB", path: "/agb" },
    { name: "Impressum", path: "/impressum" },
    { name: "Datenschutz", path: "/datenschutz" },
  ];

  return (
    <Dialog>
      <DialogTrigger className="hover:text-swiss-red transition-colors">
        Sitemap
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">Sitemap</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          {sitemapLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-swiss-darkblue hover:text-swiss-red transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}