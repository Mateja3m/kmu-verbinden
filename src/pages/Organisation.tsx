import { Mail } from "lucide-react";
import { Card } from "@/components/ui/card";

const Organisation = () => {
  const presidencySection = {
    title: "Präsidium",
    members: [
      {
        name: "Diego Schnydrig",
        role: "Präsident",
        email: "diego.schnydrig@kmu-verein.ch",
        image: "https://www.konsumentenbund.ch/wp-content/uploads/2023/11/Diego-Schnydrig-SD-Treuhand-und-Dienste-GmbH.jpg",
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
        email: "fabian.reinarz@kmu-verein.ch"
      },
      {
        name: "David Schwander-Vogt",
        role: "Leiter Marketing, Mitglieder und Partnerschaften",
        email: "david.schwander@kmu-verein.ch"
      }
    ]
  };

  const advisoryBoard = {
    title: "Beirat",
    members: [
      {
        name: "Dominik Graf",
        role: "Mitglied des Beirats",
        email: "dominik.graf@kmu-verein.ch"
      },
      {
        name: "Timo Seeger",
        role: "Mitglied des Beirats",
        email: "timo.seeger@kmu-verein.ch"
      },
      {
        name: "Rafael Bettio",
        role: "Mitglied des Beirats",
        email: "rafael.bettio@kmu-verein.ch"
      }
    ]
  };

  const officeTeam = {
    title: "Geschäftsstelle",
    members: [
      {
        name: "Sofia Koval",
        role: "Administration",
        email: "sofia.koval@kmu-verein.ch"
      },
      {
        name: "Rauschan Kumar",
        role: "IT",
        email: "rauschan.kumar@kmu-verein.ch"
      },
      {
        name: "Maxim Makendonsky",
        role: "Public Relations",
        email: "maxim.makendonsky@kmu-verein.ch"
      }
    ]
  };

  const extendedTeam = {
    title: "Erweitertes Team",
    members: [
      {
        name: "Alexander Lares",
        role: "Freischaffender Redaktionsmitarbeiter",
        subRole: "Rubrik Wirtschaft / D-A-CH",
        email: "alexander.lares@kmu-verein.ch"
      },
      {
        name: "Dr. Martin Heinemann",
        role: "Finanzierungen",
        email: "martin.heinemann@kmu-verein.ch"
      },
      {
        name: "Igor Velickovic",
        role: "Software Architekt",
        email: "igor.velickovic@kmu-verein.ch"
      },
      {
        name: "Deepal Soneji",
        role: "Redaktionsmitarbeiter / Design",
        subRole: "Ratgeber & eBook",
        email: "deepal.soneji@kmu-verein.ch"
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
              section.title === "Präsidium" ? 'lg:col-span-3' : ''
            }`}
          >
            <div className="flex flex-col h-full">
              {section.title === "Präsidium" && member.image && (
                <div className="mb-6 max-w-[300px] mx-auto">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                </div>
              )}
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-swiss-darkblue mb-2">{member.name}</h3>
                <p className="text-gray-600 mb-2">{member.role}</p>
                {member.subRole && (
                  <p className="text-sm text-gray-500 mb-2">{member.subRole}</p>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center text-swiss-red hover:text-swiss-darkblue transition-colors mt-2"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    {member.email}
                  </a>
                )}
                {member.description && (
                  <p className="mt-4 text-gray-700">{member.description}</p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full h-[400px] relative overflow-hidden">
        <img
          src="/lovable-uploads/2ab9c652-f480-41b0-ac77-07f3a01849f2.png"
          alt="SKV Office"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-white/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white mb-12 text-center max-w-4xl mx-auto px-8 py-6 bg-swiss-darkblue/30 backdrop-blur-sm rounded-lg shadow-lg">
            Organisation des Schweizerischen KMU Vereins (SKV)
          </h1>
        </div>
      </div>
      <main className="flex-grow py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {renderSection(presidencySection)}
          {renderSection(managementSection)}
          {renderSection(advisoryBoard)}
          {renderSection(officeTeam)}
          {renderSection(extendedTeam)}
        </div>
      </main>
    </div>
  );
};

export default Organisation;
