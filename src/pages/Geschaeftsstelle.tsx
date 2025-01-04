import { Building, MapPin, Mail, Phone, Clock, Calendar } from "lucide-react";
import BackgroundPattern from "@/components/BackgroundPattern";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const offices = [
  {
    city: "Bern",
    address: "Bundesgasse 20",
    postal: "3001 Bern",
    phone: "031 / 528 05 51",
    email: "bern@kmu-verein.ch"
  },
  {
    city: "Luzern",
    address: "Pilatusstrasse 35",
    postal: "6003 Luzern",
    phone: "041 / 588 22 49",
    email: "luzern@kmu-verein.ch"
  },
  {
    city: "Genf",
    address: "Rue du Rhône 14",
    postal: "1204 Genève",
    phone: "022 / 518 05 09",
    email: "genf@kmu-verein.ch"
  }
];

const Geschaeftsstelle = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      {/* Hero Section */}
      <BackgroundPattern>
        <div className="bg-swiss-red text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Unsere Geschäftsstelle</h1>
          </div>
        </div>
      </BackgroundPattern>

      <div className="container mx-auto px-4 py-12">
        {/* Main Office Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-swiss-darkblue mb-6">
            Zentralsekretariat Naters
          </h2>
          <p className="text-gray-700 mb-8">
            Die Geschäftsstelle in Naters ist das Herzstück des Schweizerischen KMU Vereins (SKV). Von hier
            aus koordinieren wir sämtliche strategischen Aktivitäten, unterstützen unsere Mitglieder und Partner,
            und stellen sicher, dass unsere Publikationen und Angebote höchsten Ansprüchen gerecht werden.
            Hier laufen alle Fäden zusammen – sei es bei der Organisation von Events, der Planung von
            Publikationen oder der Betreuung unserer Mitglieder.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <MapPin className="h-6 w-6 text-swiss-red flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Adresse:</h3>
                  <p>Dammweg 11D, 3904 Naters</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-6 w-6 text-swiss-red flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">E-Mail:</h3>
                  <p>info@kmu-verein.ch (Erreichbar rund um die Uhr)</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="h-6 w-6 text-swiss-red flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Telefon:</h3>
                  <p>+41 (0) 27 585 20 81</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-6 w-6 text-swiss-red flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Öffnungszeiten:</h3>
                  <p>Mo-Fr: 8:00–12:00 Uhr</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-swiss-darkblue mb-4">Was wir bieten</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <span className="text-swiss-red">•</span>
                  <span>Unterstützung bei Publikationen und Medienpräsenz</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-swiss-red">•</span>
                  <span>Organisation und Betreuung von Events und Netzwerkanlässen</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-swiss-red">•</span>
                  <span>Allgemeine Anfragen zu Mitgliedschaft, Partnerangeboten und weiteren Dienstleistungen</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Other Offices Section */}
        <div>
          <h2 className="text-2xl font-bold text-swiss-darkblue mb-6">
            Weitere Geschäftsstellen
          </h2>
          <p className="text-gray-700 mb-8">
            Neben unserem Zentralsekretariat in Naters haben wir weitere Geschäftsstellen in der Schweiz
            eingerichtet, um unseren Mitgliedern schweizweit persönlichen Service zu bieten.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {offices.map((office) => (
              <HoverCard key={office.city}>
                <HoverCardTrigger>
                  <div className="bg-gray-100 p-6 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                    <div className="flex items-center space-x-2 text-swiss-darkblue">
                      <MapPin className="h-5 w-5 text-swiss-red" />
                      <span className="font-semibold">{office.city}</span>
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 bg-white p-4">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-swiss-red flex-shrink-0 mt-1" />
                      <div>
                        <p>{office.address}</p>
                        <p>{office.postal}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-swiss-red" />
                      <a 
                        href={`tel:${office.phone.replace(/\s/g, '')}`}
                        className="hover:text-swiss-red transition-colors"
                      >
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-swiss-red" />
                      <a 
                        href={`mailto:${office.email}`}
                        className="hover:text-swiss-red transition-colors"
                      >
                        {office.email}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-swiss-red" />
                      <span>Mo-Fr: 8:00–12:00 Uhr</span>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-700 mb-4">
            Ob telefonisch, per E-Mail oder vor Ort – wir stehen Ihnen tatkräftig zur Seite und arbeiten mit Ihnen
            daran, Ihre Ziele zu erreichen.
          </p>
          <p className="text-swiss-darkblue font-semibold">
            Wir freuen uns, Sie in einer unserer Geschäftsstellen willkommen zu heißen! 
            Kontaktieren Sie uns jederzeit, wir sind für Sie da.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Geschaeftsstelle;
