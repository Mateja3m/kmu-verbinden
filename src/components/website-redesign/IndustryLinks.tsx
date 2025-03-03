
import React from 'react';
import { Link } from 'react-router-dom';

export const IndustryLinks = () => {
  const industries = [
    {
      categoryName: "Professional Services",
      branches: [
        { name: "Zahnärzte", slug: "zahnarzt" },
        { name: "Rechtsanwälte", slug: "rechtsanwalt" },
        { name: "Steuerberater", slug: "steuerberater" },
        { name: "Unternehmensberater", slug: "unternehmensberater" },
        { name: "Architekten", slug: "architekt" }
      ]
    },
    {
      categoryName: "Beauty & Wellness",
      branches: [
        { name: "Kosmetiksalons", slug: "kosmetiksalon" },
        { name: "Coiffeure", slug: "coiffeur" },
        { name: "Fitnesscenter", slug: "fitnesscenter" },
        { name: "Spa & Wellness", slug: "spa-wellness" }
      ]
    },
    {
      categoryName: "Hospitality & Gastro",
      branches: [
        { name: "Restaurants", slug: "restaurant" },
        { name: "Hotels", slug: "hotel" },
        { name: "Cafés", slug: "cafe" },
        { name: "Bars", slug: "bar" }
      ]
    },
    {
      categoryName: "Construction & Auto",
      branches: [
        { name: "Bauunternehmen", slug: "bauunternehmen" },
        { name: "Autogaragen", slug: "autogarage" },
        { name: "Handwerker", slug: "handwerker" },
        { name: "Maler", slug: "maler" }
      ]
    },
    {
      categoryName: "Other",
      branches: [
        { name: "Fahrschulen", slug: "fahrschule" },
        { name: "Immobilienmakler", slug: "immobilienmakler" },
        { name: "Versicherungsvermittler", slug: "versicherungsvermittler" },
        { name: "Apotheken", slug: "apotheke" }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6 mt-8 mb-12">
      <p className="text-sm text-gray-400 text-center mb-4">Branchenspezifische Website-Lösungen:</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-y-6 gap-x-4 text-center">
        {industries.map((category, i) => (
          <div key={i} className="space-y-2">
            <p className="text-xs text-gray-500 font-medium mb-1">{category.categoryName}</p>
            <div className="space-y-1.5">
              {category.branches.map((branch, j) => (
                <div key={j}>
                  <Link 
                    to={`/website-redesign/branche/${branch.slug}`}
                    className="text-xs text-gray-400 hover:text-swiss-red transition-colors"
                  >
                    {branch.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
