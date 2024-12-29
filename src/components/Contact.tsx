import { Mail, Phone } from 'lucide-react';

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
    email: "naters@kmu-verein.ch"
  }
];

const Contact = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          SKV-Sekretariate
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {offices.map((office) => (
            <div key={office.city} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">{office.city}</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Phone size={20} className="mr-2" />
                  <span>{office.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail size={20} className="mr-2" />
                  <a href={`mailto:${office.email}`} className="hover:text-primary">
                    {office.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;