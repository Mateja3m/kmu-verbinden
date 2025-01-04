import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { format } from "date-fns";
import { de } from "date-fns/locale";

const events = [
  {
    id: 1,
    title: "CAS Corporate Responsibility",
    date: "30.08.2024 - 27.03.2025",
    type: "course"
  },
  {
    id: 2,
    title: "Info Event CAS Corporate Responsibility (English)",
    date: "14.01.2025",
    type: "info"
  },
  {
    id: 3,
    title: "Info Event CAS Managing Diversity, Inclusion and Social Sustainability",
    date: "21.01.2025",
    type: "info"
  },
  {
    id: 4,
    title: "CAS Ökobilanzierung (LCA)",
    date: "21.02.2025 - 28.06.2025",
    type: "course"
  },
  {
    id: 5,
    title: "CAS Managing Diversity, Inclusion und Social Sustainability 2025",
    date: "27.02.2025 - 24.06.2025",
    type: "course"
  }
];

const EventKalender = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Featured Event Banner */}
      <div className="bg-gradient-to-r from-swiss-darkblue to-swiss-lightblue text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block bg-swiss-red text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
              Featured Event
            </span>
            <h1 className="text-4xl font-bold mb-4">KITS 2025</h1>
            <p className="text-xl mb-4">KMU Innovation Technology Summit</p>
            <div className="flex justify-center items-center space-x-4 mb-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span>01. Juli 2025</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>Technopark Zürich</span>
              </div>
            </div>
            <p className="max-w-2xl mx-auto text-lg">
              Join us for Switzerland's premier innovation summit focused on digital transformation and sustainability in SMEs. 
              Featuring keynote speakers, workshops, and networking opportunities.
            </p>
          </div>
        </div>
      </div>

      {/* Calendar and Events Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Calendar */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Kalender</h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              locale={de}
              className="rounded-md border shadow"
            />
          </div>

          {/* Events List */}
          <div>
            <h2 className="text-2xl font-bold mb-6">KMU Events</h2>
            <div className="space-y-4">
              {events.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <CardDescription>
                          {event.date}
                        </CardDescription>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        event.type === 'course' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {event.type === 'course' ? 'Kurs' : 'Info'}
                      </span>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventKalender;