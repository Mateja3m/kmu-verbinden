import { Mail, Phone, MapPin, Calendar, Users, Gavel } from 'lucide-react';
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { useToast } from "./ui/use-toast";

const offices = [
  {
    city: "Genf",
    phone: "022 / 518 05 09",
    email: "genf@kmu-verein.ch",
    address: "Rue du Rhône 14",
    postal: "1204"
  },
  {
    city: "Luzern",
    phone: "041 / 588 22 49",
    email: "luzern@kmu-verein.ch",
    address: "Bundesstrasse 3",
    postal: "6003"
  },
  {
    city: "Bern",
    phone: "031 / 528 05 51",
    email: "bern@kmu-verein.ch",
    address: "Spitalgasse 4",
    postal: "3011"
  },
  {
    city: "Naters",
    phone: "044 / 585 20 81",
    email: "naters@kmu-verein.ch",
    address: "Dammweg 11D",
    postal: "3904"
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast({
      title: "Nachricht gesendet",
      description: "Wir werden uns in Kürze bei Ihnen melden.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-swiss-darkblue mb-4">
          Kontaktieren Sie uns
        </h1>
        <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto">
          Der Schweizerische KMU Verein ist für Sie da. Wählen Sie die passende Kontaktmöglichkeit.
        </p>
      </div>

      {/* Member & Partner Notice */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-swiss-darkblue text-white p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Users className="h-6 w-6 mr-2" />
            <h2 className="text-xl font-semibold">Für Mitglieder & Partner</h2>
          </div>
          <p className="mb-4">
            Als Mitglied oder Partner haben Sie Zugang zu Ihrem persönlichen Dashboard, wo Sie direkt mit Ihrem Ansprechpartner Termine vereinbaren können.
          </p>
          <Button 
            variant="outline" 
            className="bg-transparent text-white hover:bg-white hover:text-swiss-darkblue"
            onClick={() => window.location.href = '/dashboard'}
          >
            Zum Dashboard
          </Button>
        </div>
      </div>

      {/* Legal Service Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center mb-4">
            <Gavel className="h-6 w-6 mr-2 text-swiss-red" />
            <h2 className="text-xl font-semibold text-swiss-darkblue">Rechtsdienst - Kostenlose Beratung</h2>
          </div>
          <p className="mb-4 text-gray-600">
            Für unsere Mitglieder bieten wir jeden Mittwoch kostenlose Rechtsberatungen an. 
            Vereinbaren Sie einen Online-Termin mit unserem Rechtsdienst.
          </p>
          <Button 
            className="bg-swiss-red hover:bg-swiss-red/90 text-white"
            onClick={() => window.location.href = 'mailto:termin@meinjurist.ch'}
          >
            <Calendar className="mr-2 h-5 w-5" />
            Rechtsberatung vereinbaren
          </Button>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white p-8 rounded-lg shadow-sm border">
          <h2 className="text-2xl font-bold text-swiss-darkblue mb-6">Kontaktformular</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-Mail
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Telefon
              </label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Nachricht
              </label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="min-h-[120px]"
              />
            </div>
            <Button type="submit" className="w-full bg-swiss-darkblue hover:bg-swiss-darkblue/90">
              Nachricht senden
            </Button>
          </form>
        </div>
      </div>

      {/* Offices Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold text-swiss-darkblue mb-8">Unsere Standorte</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {offices.map((office) => (
            <div 
              key={office.city}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-swiss-darkblue mb-4">{office.city}</h3>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 text-swiss-red mr-3 flex-shrink-0" />
                    <div>
                      <p>{office.address}</p>
                      <p>{office.postal} {office.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-5 w-5 text-swiss-red mr-3 flex-shrink-0" />
                    <a 
                      href={`tel:${office.phone.replace(/\s/g, '')}`}
                      className="hover:text-swiss-red transition-colors"
                    >
                      {office.phone}
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-5 w-5 text-swiss-red mr-3 flex-shrink-0" />
                    <a 
                      href={`mailto:${office.email}`}
                      className="hover:text-swiss-red transition-colors"
                    >
                      {office.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Schedule Meeting Button */}
        <div className="mt-16 text-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className="bg-swiss-red hover:bg-swiss-red/90 text-white"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Termin vereinbaren
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Terminanfrage</DialogTitle>
                <DialogDescription>
                  Bitte kontaktieren Sie uns per E-Mail an info@kmu-verein.ch oder rufen Sie uns an, um einen Termin zu vereinbaren.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 mt-4">
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = "mailto:info@kmu-verein.ch"}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  E-Mail senden
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = "tel:+41445852081"}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Anrufen
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Contact;