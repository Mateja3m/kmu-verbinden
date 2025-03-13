
import { Link } from 'react-router-dom';

export const IndustryLinks = () => {
  const industries = [
    { id: 'gastgewerbe', name: 'Gastgewerbe' },
    { id: 'handwerk', name: 'Handwerk' },
    { id: 'einzelhandel', name: 'Einzelhandel' },
    { id: 'finanzen', name: 'Finanzen & Versicherung' },
    { id: 'gesundheit', name: 'Gesundheitswesen' },
    { id: 'immobilien', name: 'Immobilien' },
    { id: 'it', name: 'IT & Technologie' },
    { id: 'bildung', name: 'Bildung & Coaching' }
  ];

  return (
    <div className="mt-24">
      <h3 className="text-xl font-semibold text-swiss-darkblue mb-8 text-center">
        Branchenspezifische Lösungen
      </h3>
      <div className="flex flex-wrap justify-center gap-4">
        {industries.map((industry) => (
          <Link
            key={industry.id}
            to={`/website-redesign/branche/${industry.id}`}
            className="px-6 py-3 bg-white border border-gray-200 rounded-full text-sm text-swiss-darkblue hover:bg-swiss-gray hover:border-swiss-darkblue transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
          >
            {industry.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
