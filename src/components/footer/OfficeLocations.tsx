import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const locations = [
  {
    city: 'Zürich',
    address: 'Bahnhofstrasse 106',
    postalCode: '8001',
    phone: '+41 44 512 21 50'
  },
  {
    city: 'St.Gallen',
    address: 'Spisergasse 41',
    postalCode: '9000',
    phone: '+41 71 571 20 11'
  },
  {
    city: 'Chur',
    address: 'Poststrasse 9',
    postalCode: '7000',
    phone: '+41 81 511 04 11'
  }
];

export const OfficeLocations: React.FC = () => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold mb-4">Geschäftsstellen</h3>
      <TooltipProvider>
        <div className="space-y-2">
          {locations.map((location, index) => (
            <Tooltip key={index}>
              <TooltipTrigger className="block text-left hover:text-swiss-red transition-colors">
                {location.city}
              </TooltipTrigger>
              <TooltipContent side="right" className="p-3 bg-white border shadow-lg">
                <div className="space-y-1">
                  <p className="font-medium">{location.address}</p>
                  <p>{location.postalCode} {location.city}</p>
                  <p className="text-swiss-red">{location.phone}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
};