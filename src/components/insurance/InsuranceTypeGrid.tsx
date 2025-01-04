import React from 'react';

type InsuranceType = {
  title: string;
  description: string;
};

interface InsuranceTypeGridProps {
  insuranceTypes: InsuranceType[];
}

const InsuranceTypeGrid = ({ insuranceTypes }: InsuranceTypeGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {insuranceTypes.map((insurance, index) => (
        <div 
          key={index}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold text-swiss-darkblue mb-2">
            {insurance.title}
          </h3>
          <p className="text-gray-600">
            {insurance.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default InsuranceTypeGrid;