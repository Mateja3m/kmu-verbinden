import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";

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
    <div className="min-h-screen">
      {/* KITS 2025 Banner */}
      <div className="bg-swiss-red py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-white">KITS 2025</h1>
          <p className="text-xl mb-2 text-white">KMU Innovation Technology Summit</p>
          <p className="mb-4 text-white">1. Juli 2025 | Zürich</p>
          <p className="max-w-2xl text-white">
            Entdecken Sie die Zukunft der KMU-Innovation! Der KITS 2025 bringt führende Experten, 
            innovative Technologien und zukunftsweisende Lösungen zusammen. Seien Sie dabei, wenn 
            die Schweizer KMU-Landschaft die digitale Transformation gestaltet.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-swiss-darkblue">KMU Events in der Schweiz</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <Card className="p-6 bg-white shadow-lg">
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

          {/* Upcoming Events Section */}
          <Card className="p-6 bg-white shadow-lg">
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
    </div>
  );
};

export default EventKalender;