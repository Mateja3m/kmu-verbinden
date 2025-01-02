import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Award, Newspaper, Briefcase, Download } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const UnsereAuftrag = () => {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Hero Section - Updated with Swiss red background */}
        <div className="bg-swiss-red text-white pt-32 pb-20 px-4 relative">
          <div className="absolute inset-0" style={{
            backgroundImage: `url('data:image/svg+xml;base64,${btoa(`
              <svg width="7" height="7" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 7L7 0M7 7L14 0M0 0L-7 7M7 14L0 7" 
                      stroke="#FFFFFF" 
                      stroke-width="0.5" 
                      stroke-opacity="0.5" 
                      fill="none"/>
              </svg>
            `)}')`,
            backgroundSize: '7px 7px',
            opacity: '0.7'
          }}></div>
          <div className="container mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">PORTRAIT</h1>
            <p className="text-2xl md:text-3xl mb-8">IM DIENST DER KMU.</p>
            <p className="text-xl mb-8">EIN PORTRAIT ÜBER DEN SKV.</p>
            <a 
              href="https://www.kmu-verein.ch/_files/ugd/0c82d3_583ea574bbdd4608819de77609838408.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                <Download className="mr-2 h-4 w-4" />
                PDF Portrait herunterladen
              </Button>
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Auftrag Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-6 w-6 text-swiss-red" />
                  AUFTRAG
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Der SKV ist bestrebt, allen KMUs die größtmögliche multimediale Sichtbarkeit zu verschaffen. Unsere Mission ist es, Unternehmen durch hochwertige redaktionelle Services und maßgeschneiderte Lösungen zu unterstützen.
                </p>
                <Button variant="link" className="mt-4 text-swiss-red">
                  Mehr erfahren
                </Button>
              </CardContent>
            </Card>

            {/* Werte Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-6 w-6 text-swiss-red" />
                  WERTE
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Beim SKV stehen die traditionellen Schweizer Werte wie Qualität, Verlässlichkeit und Gemeinschaftssinn im Mittelpunkt unserer Arbeit.
                </p>
                <Button variant="link" className="mt-4 text-swiss-red">
                  Mehr erfahren
                </Button>
              </CardContent>
            </Card>

            {/* Expertenrat Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-swiss-red" />
                  EXPERTENRAT
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Ein weiteres wichtiges Projekt des SKV ist die Schaffung des Expertenrats, einer digitalen Plattform, die Mitglieder und Nichtmitglieder digital positioniert.
                </p>
                <Button variant="link" className="mt-4 text-swiss-red">
                  Mehr erfahren
                </Button>
              </CardContent>
            </Card>

            {/* Redaktionelle Services Card */}
            <Card className="hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="h-6 w-6 text-swiss-red" />
                  REDAKTIONELLE-SERVICES
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">KMU-Praxisratgeber</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Wertvolle Praxistipps und Fachwissen</li>
                    <li>Kundengewinnung und Expertenpositionierung</li>
                    <li>E-Book Kurzfassungen</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Interviews und Artikel</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Geführte Interviews mit Experten</li>
                    <li>Online-Veröffentlichung</li>
                    <li>Erhöhte Branchensichtbarkeit</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Unternehmensprofile</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Vorstellung von Mitgliedsunternehmen</li>
                    <li>Dienstleistungen und Erfolgsstories</li>
                    <li>Stärkung der Markenbekanntheit</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Projects Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Projekte</h2>
            <div className="prose max-w-none">
              <p className="text-gray-600">
                Alle Unternehmen, unabhängig von ihrer Mitgliedschaft, können an den vielfältigen Projekten des Schweizerischen KMU Vereins (SKV) teilnehmen. Unsere aktuellen Projekte umfassen die Digitaloffensive, Talentscouting zur Rekrutierung neuer Lehrlinge für Betriebe, Finanzberatung und Mentoring-Programme.
              </p>
            </div>
            <Button variant="link" className="mt-4 text-swiss-red">
              Mehr erfahren
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UnsereAuftrag;