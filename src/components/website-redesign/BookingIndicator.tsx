
import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

export const BookingIndicator = () => {
  const [bookingCount, setBookingCount] = useState(0);
  
  useEffect(() => {
    // Function to generate a random number between 4 and 9
    const generateRandomBookings = () => {
      return Math.floor(Math.random() * 6) + 4; // Random number between 4 and 9
    };
    
    // Set initial value
    setBookingCount(generateRandomBookings());
    
    // Update the value every hour
    const intervalId = setInterval(() => {
      setBookingCount(generateRandomBookings());
    }, 60 * 60 * 1000); // Update every hour (60 min * 60 sec * 1000 ms)
    
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <div className="flex items-center bg-swiss-darkblue/5 rounded-lg p-3 mb-6">
      <Users className="h-5 w-5 text-swiss-red mr-2" />
      <p className="text-sm text-gray-700">
        <span className="font-bold">{bookingCount} Zahnärzte</span> haben in den letzten 24 Stunden eine Beratung angefragt
      </p>
    </div>
  );
};
