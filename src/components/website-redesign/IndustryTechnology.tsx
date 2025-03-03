
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Smartphone, Rocket, Zap, PanelLeft } from 'lucide-react';

interface WebDesignPartner {
  name: string;
  logo: string;
  description: string;
}

interface IndustryTechnologyProps {
  industry: string;
}

export const IndustryTechnology = ({ industry }: IndustryTechnologyProps) => {
  // Partners from our partners data
  const webDesignPartners = [
    {
      name: 'hhomepage.ch',
      logo: 'https://res.cloudinary.com/dphbnwjtx/image/upload/v1740493274/hhomepage_Logo-FullColor_bbjtv2.png',
      description: 'Webdesign und professionelle Online-Auftritte für KMU'
    },
    {
      name: 'Webpiranha',
      logo: 'https://res.cloudinary.com/dphbnwjtx/image/upload/v1739987876/WhatsApp_Image_2025-02-19_at_20.15.45_kiostz.jpg',
      description: 'Ihr Schweizer Webentwickler mit langjähriger Erfahrung'
    },
    {
      name: 'Webagentur Forster',
      logo: 'https://www.webagentur-forster.ch/wp-content/uploads/2024/08/webagentur-forster-logo-website-transparent.png.webp',
      description: 'Full-Service-Digitalagentur für KMU'
    }
  ];

  const technologies = [
    {
      icon: <Code className="h-10 w-10 text-swiss-red" />,
      name: 'Modernste Frameworks',
      description: 'Wir nutzen React, Next.js und Tailwind CSS für schnelle, reaktionsschnelle Websites.'
    },
    {
      icon: <Smartphone className="h-10 w-10 text-swiss-red" />,
      name: 'Mobile Optimierung',
      description: 'Perfekte Darstellung auf allen Geräten - vom Desktop bis zum Smartphone.'
    },
    {
      icon: <Rocket className="h-10 w-10 text-swiss-red" />,
      name: 'Performance Optimierung',
      description: 'Schnelle Ladezeiten durch optimierte Bilder und effiziente Code-Strukturen.'
    },
    {
      icon: <Zap className="h-10 w-10 text-swiss-red" />,
      name: 'SEO-Optimierung',
      description: 'Integrierte Suchmaschinenoptimierung für bessere Rankings in Google.'
    },
    {
      icon: <PanelLeft className="h-10 w-10 text-swiss-red" />,
      name: 'Content Management System',
      description: 'Einfache Bearbeitung Ihrer Inhalte ohne technisches Know-how.'
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-swiss-darkblue mb-4">
            Unsere Webdesign-Partner und Technologien
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Der Schweizerische KMU Verein hat sich mit führenden Webdesign-Agenturen zusammengeschlossen, 
            um {industry} erstklassige digitale Lösungen anzubieten.
          </p>
        </div>
        
        {/* Web Design Partners */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-swiss-darkblue mb-6 text-center">
            Unsere zertifizierten Partner
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {webDesignPartners.map((partner, index) => (
              <Card 
                key={index} 
                className="shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-4 h-32 flex items-center justify-center bg-white border-b">
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="max-h-20 max-w-full object-contain"
                  />
                </div>
                <CardContent className="p-5">
                  <h4 className="font-semibold text-lg mb-2">{partner.name}</h4>
                  <p className="text-gray-600">{partner.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Technologies */}
        <div>
          <h3 className="text-xl font-semibold text-swiss-darkblue mb-6 text-center">
            Eingesetzte Technologien
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <div key={index} className="flex items-start p-4 bg-swiss-darkblue/5 rounded-lg">
                <div className="mr-4">{tech.icon}</div>
                <div>
                  <h4 className="font-semibold text-swiss-darkblue mb-1">{tech.name}</h4>
                  <p className="text-sm text-gray-600">{tech.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
