
import React from 'react';
import { ArrowUp, Calendar, Search, Users } from 'lucide-react';

interface IndustryQuickStatsProps {
  industry: string;
}

export const IndustryQuickStats = ({ industry }: IndustryQuickStatsProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      <h3 className="text-lg font-semibold text-swiss-darkblue mb-3">
        Vorteile für {industry}
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-start gap-2">
          <div className="bg-green-50 p-2 rounded-lg">
            <ArrowUp className="h-4 w-4 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium">+35%</p>
            <p className="text-xs text-gray-500">mehr Patienten</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <div className="bg-blue-50 p-2 rounded-lg">
            <Calendar className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium">Online Buchung</p>
            <p className="text-xs text-gray-500">rund um die Uhr</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <div className="bg-amber-50 p-2 rounded-lg">
            <Search className="h-4 w-4 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-medium">Top SEO</p>
            <p className="text-xs text-gray-500">für lokale Suchen</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <div className="bg-purple-50 p-2 rounded-lg">
            <Users className="h-4 w-4 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium">Spezial Design</p>
            <p className="text-xs text-gray-500">für {industry}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
