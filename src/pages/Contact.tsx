import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

const offices = [
  {
    city: "Genf",
    phone: "022 / 518 05 09",
    email: "genf@kmu-verein.ch"
  },
  {
    city: "Luzern",
    phone: "041 / 588 22 49",
    email: "luzern@kmu-verein.ch"
  },
  {
    city: "Bern",
    phone: "031 / 528 05 51",
    email: "bern@kmu-verein.ch"
  },
  {
    city: "Naters",
    phone: "044 / 585 20 81",
    email: "naters@kmu-verein.ch",
    address: "Dammweg 11D",
    postal: "CH-3904"
  }
];

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-swiss-darkblue mb-4">Kontakt</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Wir sind für Sie da. Kontaktieren Sie uns für Ihre Anliegen oder vereinbaren Sie einen persönlichen Termin.
          </p>
        </div>

        {/* Main Office Section */}
        <div className="mb-16">
          <Card className="overflow-hidden">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-semibold text-swiss-darkblue mb-6">Hauptsitz Naters</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-600">
                      <MapPin className="h-5 w-5 text-swiss-red" />
                      <span>Dammweg 11D, CH-3904 Naters</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Phone className="h-5 w-5 text-swiss-red" />
                      <a href="tel:044 / 585 20 81" className="hover:text-swiss-red transition-colors">
                        044 / 585 20 81
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Mail className="h-5 w-5 text-swiss-red" />
                      <a href="mailto:naters@kmu-verein.ch" className="hover:text-swiss-red transition-colors">
                        naters@kmu-verein.ch
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-swiss-red hover:bg-swiss-red/90 text-white">
                        <Calendar className="mr-2 h-5 w-5" />
                        Termin vereinbaren
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Terminanfrage</DialogTitle>
                        <DialogDescription>
                          Füllen Sie das Formular aus, um einen Termin zu vereinbaren. Wir werden uns schnellstmöglich bei Ihnen melden.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <p className="text-sm text-gray-500">
                          Bitte kontaktieren Sie uns per Email oder Telefon, um einen Termin zu vereinbaren.
                          Wir freuen uns auf Ihre Anfrage!
                        </p>
                        <div className="flex justify-center">
                          <Button
                            onClick={() => window.location.href = "mailto:naters@kmu-verein.ch"}
                            className="bg-swiss-red hover:bg-swiss-red/90 text-white"
                          >
                            <Mail className="mr-2 h-4 w-4" />
                            Email senden
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Regional Offices Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-swiss-darkblue mb-8 text-center">
            Regionale Geschäftsstellen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offices.filter(office => office.city !== "Naters").map((office) => (
              <Card key={office.city}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-swiss-darkblue mb-4">{office.city}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Phone className="h-5 w-5 text-swiss-red" />
                      <a href={`tel:${office.phone}`} className="hover:text-swiss-red transition-colors">
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Mail className="h-5 w-5 text-swiss-red" />
                      <a href={`mailto:${office.email}`} className="hover:text-swiss-red transition-colors">
                        {office.email}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;