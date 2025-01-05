import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Calendar as CalendarIcon, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BackgroundPattern from "@/components/BackgroundPattern";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface Event {
  id: number;
  title: string;
  date: Date;
  endDate?: Date;
  type: "course" | "info";
  description?: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "KITS 2025 - KMU Innovation Technology Summit",
    date: new Date("2025-07-01"),
    type: "course",
    description: "Join us for the biggest Swiss SME innovation event of the year! Featuring keynote speakers, workshops, and networking opportunities focused on digital transformation and sustainable business practices."
  },
  {
    id: 2,
    title: "CAS Corporate Responsibility",
    date: new Date("2024-08-30"),
    endDate: new Date("2025-03-27"),
    type: "course"
  },
  {
    id: 3,
    title: "Info Event CAS Corporate Responsibility (English)",
    date: new Date("2025-01-14"),
    type: "info"
  },
  {
    id: 4,
    title: "Info Event CAS Managing Diversity, Inclusion and Social Sustainability",
    date: new Date("2025-01-21"),
    type: "info"
  },
  {
    id: 5,
    title: "CAS Ökobilanzierung (LCA)",
    date: new Date("2025-02-21"),
    endDate: new Date("2025-06-28"),
    type: "course"
  },
  {
    id: 6,
    title: "CAS Managing Diversity, Inclusion und Social Sustainability 2025",
    date: new Date("2025-02-27"),
    endDate: new Date("2025-06-24"),
    type: "course"
  }
];

const EventKalender = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const selectedDateEvents = events.filter(event => {
    if (!date) return false;
    const eventDate = new Date(event.date);
    return (
      eventDate.getDate() === date.getDate() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getFullYear() === date.getFullYear()
    );
  });

  const upcomingEvents = [...events]
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .filter(event => event.date >= new Date())
    .slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      {/* Header Banner with Background Image */}
      <div className="relative mt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/lovable-uploads/e8fe9475-a9bf-4636-9512-ac9c74ccbf80.png')",
            filter: "brightness(0.7)"
          }}
        />
        <div className="relative bg-gradient-to-b from-swiss-darkblue/80 to-swiss-red/80 py-24 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-6xl font-bold mb-8 text-white drop-shadow-lg">
              KMU Verein SKV Events
            </h1>
            <p className="text-2xl text-white max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Entdecken Sie unsere exklusiven Veranstaltungen für Schweizer KMU - 
              Ihr Partner für Weiterbildung und Networking
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* KITS 2025 Banner */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-swiss-darkblue to-swiss-red opacity-90" />
            <div className="relative p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-white">
                  <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm mb-4">
                    1. Juli 2025
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">KITS 2025</h2>
                  <p className="text-2xl mb-4">KMU Innovation Technology Summit</p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5" />
                      <span>Zürich, Switzerland</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5" />
                      <span>09:00 - 18:00</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5" />
                      <span>500+ Teilnehmer erwartet</span>
                    </div>
                  </div>

                  <p className="text-lg mb-6">
                    Entdecken Sie die Zukunft der KMU-Innovation! Der KITS 2025 bringt führende 
                    Experten, innovative Technologien und zukunftsweisende Lösungen zusammen.
                  </p>

                  <Button 
                    className="bg-white text-swiss-darkblue hover:bg-swiss-gray transition-colors group"
                  >
                    Jetzt Anmelden
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                <div className="space-y-6 text-white">
                  <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-3">Highlights</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-swiss-red rounded-full" />
                        Keynote Speakers aus der Tech-Industrie
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-swiss-red rounded-full" />
                        Networking mit führenden KMU-Innovatoren
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-swiss-red rounded-full" />
                        Hands-on Workshops & Live Demos
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-swiss-red rounded-full" />
                        Startup Pitch Competition
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-swiss-darkblue">KMU Events in der Schweiz</h2>
        
        <BackgroundPattern>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calendar Section */}
            <div className="relative">
              <Card className="p-6 bg-white shadow-lg relative z-10">
                <div className="flex items-center mb-4">
                  <CalendarIcon className="mr-2 h-5 w-5 text-swiss-red" />
                  <h3 className="text-xl font-semibold">Eventkalender</h3>
                </div>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border bg-white"
                />
                
                {selectedDateEvents.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Events an diesem Tag:</h4>
                    {selectedDateEvents.map(event => (
                      <div key={event.id} className="p-2 bg-gray-50 rounded-md mb-2">
                        <p className="font-medium">{event.title}</p>
                        {event.endDate && (
                          <p className="text-sm text-gray-600">
                            Bis: {event.endDate.toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>

            {/* Upcoming Events Section */}
            <div className="relative">
              <Card className="p-6 bg-white shadow-lg relative z-10">
                <h3 className="text-xl font-semibold mb-4">Nächste Events</h3>
                <div className="space-y-4">
                  {upcomingEvents.map(event => (
                    <div
                      key={event.id}
                      className="p-4 rounded-lg border border-gray-200 hover:border-swiss-red transition-colors bg-white"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-gray-600">
                            {event.date.toLocaleDateString()}
                            {event.endDate && ` - ${event.endDate.toLocaleDateString()}`}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          event.type === 'course' 
                            ? 'bg-swiss-red text-white' 
                            : 'bg-swiss-lightblue text-swiss-darkblue'
                        }`}>
                          {event.type === 'course' ? 'Kurs' : 'Info'}
                        </span>
                      </div>
                      {event.description && (
                        <p className="text-sm text-gray-600 mt-2">{event.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </BackgroundPattern>
      </div>
      <Footer />
    </div>
  );
};

export default EventKalender;