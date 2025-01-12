import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const OfficeLocations: React.FC = () => {
  const offices = [
    {
      city: 'Naters',
      address: 'Dammweg 11D',
      postalCode: 'CH-3904',
      phone: '+41 27 924 24 24',
      email: 'info@kmu-verein.ch'
    },
    {
      city: 'Zürich',
      address: 'Bahnhofstrasse 21',
      postalCode: 'CH-8001',
      phone: '+41 44 221 08 88',
      email: 'zuerich@kmu-verein.ch'
    }
  ];

  return (
    <div className="space-y-2">
      {offices.map((office, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger className="text-white hover:text-swiss-red transition-colors">
              {office.city}
            </TooltipTrigger>
            <TooltipContent>
              <div className="p-2">
                <p>{office.address}</p>
                <p>{office.postalCode}</p>
                <p>{office.phone}</p>
                <p>{office.email}</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};