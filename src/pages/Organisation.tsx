import { Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Organisation = () => {
  const presidencySection = {
    title: "Präsidium",
    members: [
      {
        name: "Diego Schnydrig",
        role: "Präsident",
        email: "diego.schnydrig@kmu-verein.ch",
        image: "/lovable-uploads/0d64f4ef-3056-4a82-aa47-7ab680b7a57a.png",
        description: "Der Schweizerische KMU Verein (SKV) setzt sich seit seiner Gründung engagiert für die Belange der kleinen und mittleren Unternehmen (KMU) in der Schweiz ein. Wir bieten unseren Mitgliedern praxisnahe Beratung, umfassende Dienstleistungen und ein starkes Netzwerk an Experten. Mit einem engagierten Vorstand, einem erfahrenen Beirat und einer kompetenten Geschäftsstelle in Naters im Wallis vertreten wir die Interessen unserer Mitglieder wirkungsvoll und begleiten sie auf ihrem Weg zum Erfolg."
      }
    ]
  };

  const managementSection = {
    title: "Geschäftsführung",
    members: [
      {
        name: "Fabian Reinarz",
        role: "Redaktionsleitung",
        image: "/lovable-uploads/1613560366192.jpeg"
      },
      {
        name: "Benjamin Wagner",
        role: "Leiter KMU-Versicherungen und AI"
      },
      {
        name: "David Schwander-Vogt",
        role: "Leiter Marketing, Mitglieder und Partnerschaften",
        image: "/lovable-uploads/1628785358205.jpeg"
      }
    ]
  };

  const advisoryBoard = {
    title: "Beirat",
    members: [
      {
        name: "Benjamin Wagner",
        role: "Mitglied des Beirats",
        image: "/lovable-uploads/39df9860-332b-419c-9a05-04bd6938ca6b.png"
      },
      {
        name: "Dominik Graf",
        role: "Mitglied des Beirats",
        image: "/lovable-uploads/e58ea346-1d16-4ce9-a96f-c9c7dea40cb7.png"
      },
      {
        name: "Timo Seeger",
        role: "Mitglied des Beirats",
        image: "/lovable-uploads/b37c9e3d-c0ab-4a8a-a7d1-13616e4aa86e.png"
      },
      {
        name: "Rafael Bettio",
        role: "Mitglied des Beirats"
      }
    ]
  };

  const officeTeam = {
    title: "Geschäftsstelle",
    members: [
      {
        name: "Sofia Koval",
        role: "Administration"
      },
      {
        name: "Maksim Wagner",
        role: "Praktikant Redaktion"
      },
      {
        name: "Rauschan Kumar",
        role: "IT"
      },
      {
        name: "Maxim Makendonsky",
        role: "Public Relations"
      }
    ]
  };

  const extendedTeam = {
    title: "Erweitertes Team",
    members: [
      {
        name: "Karina Ilina",
        role: "Social Media Marketing"
      },
      {
        name: "Alexander Lares",
        role: "Freischaffender Redaktionsmitarbeiter",
        subRole: "Rubrik Wirtschaft / D-A-CH"
      },
      {
        name: "Dr. Martin Heinemann",
        role: "Finanzierungen"
      },
      {
        name: "Igor Velickovic",
        role: "Software Architekt"
      },
      {
        name: "Deepal Soneji",
        role: "Redaktionsmitarbeiter / Design",
        subRole: "Ratgeber & eBook"
      }
    ]
  };

  const renderSection = (section: any) => (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-swiss-darkblue mb-8">{section.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {section.members.map((member: any, index: number) => (
          <Card 
            key={index} 
            className={`p-6 hover:shadow-lg transition-shadow duration-300 ${
              !member.image ? 'bg-gradient-to-br from-white to-swiss-gray' : ''
            }`}
          >
            {member.image && (
              <div className="mb-4 aspect-square relative overflow-hidden rounded-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            {!member.image && (
              <div className="mb-4 text-3xl font-bold text-swiss-darkblue opacity-25">
                {member.name.charAt(0)}
              </div>
            )}
            <h3 className="text-xl font-semibold text-swiss-darkblue mb-2">{member.name}</h3>
            <p className="text-gray-600 mb-2">{member.role}</p>
            {member.subRole && (
              <p className="text-sm text-gray-500 mb-2">{member.subRole}</p>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="inline-flex items-center text-swiss-red hover:text-swiss-darkblue transition-colors"
              >
                <Mail className="h-4 w-4 mr-2" />
                {member.email}
              </a>
            )}
            {member.description && (
              <p className="mt-4 text-gray-700 text-sm">{member.description}</p>
            )}
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-swiss-darkblue mb-12 text-center">
            Organisation des Schweizerischen KMU Vereins (SKV)
          </h1>
          
          {renderSection(presidencySection)}
          {renderSection(managementSection)}
          {renderSection(advisoryBoard)}
          {renderSection(officeTeam)}
          {renderSection(extendedTeam)}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Organisation;