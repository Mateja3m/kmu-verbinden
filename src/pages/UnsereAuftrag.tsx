import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Award, Newspaper, Briefcase, Download, Network, Target, Rocket } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BackgroundPattern from "@/components/BackgroundPattern";
import { Link } from "react-router-dom";

const UnsereAuftrag = () => {
  return (
    <>
      <Navigation />
      <BackgroundPattern>
        <div className="min-h-screen">
          {/* Hero Section */}
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">UNSER AUFTRAG</h1>
              <p className="text-2xl md:text-3xl mb-4">Ihr Erfolg ist unser Ziel</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-16">
            {/* Mission Statement */}
            <div className="prose max-w-none mb-16">
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Der Schweizerische KMU Verein (SKV) hat es sich zur Aufgabe gemacht, kleinen und mittleren
                Unternehmen in der Schweiz eine schweizweite Medienpräsenz zu ermöglichen – durch unsere
                vielseitigen Publikationsformate und unsere gezielte Zusammenarbeit mit Partnern und
                Kooperationspartnern aus allen Regionen des Landes.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Unsere Mission geht jedoch weit über die Medienarbeit hinaus: Wir fördern unsere Mitglieder nicht
                nur redaktionell, sondern auch durch gezielte externe Kommunikation, die ihnen einen zusätzlichen
                Mehrwert bietet. Unser Fokus liegt darauf, sowohl Neugründer als auch bestehende KMUs auf ihrem
                Weg zu begleiten und sie aktiv in ihrer Entwicklung zu unterstützen.
              </p>
            </div>

            {/* How We Do It Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-swiss-darkblue mb-8">Wie wir das machen</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Newspaper className="h-6 w-6 text-swiss-red" />
                      Medienpräsenz und Sichtbarkeit
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Durch unsere eigenen Publikationsformate wie das Unternehmensjournal, Unternehmensblick und weitere Branchenmagazine sorgen wir für die verdiente Aufmerksamkeit.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-6 w-6 text-swiss-red" />
                      Externe Kommunikation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Über gezielte Kampagnen und Promotionsmaßnahmen in Kooperation mit unseren Partnern bringen wir die Botschaften unserer Mitglieder in die Öffentlichkeit.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Network className="h-6 w-6 text-swiss-red" />
                      Netzwerkgedanke
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>Der Schweizerische KMU Innovationstag (SKIT)</li>
                      <li>Partnerevents für Vernetzung</li>
                      <li>Webinare und digitale Angebote</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Why We Do It Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-swiss-darkblue mb-8">Warum wir das machen</h2>
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Target className="h-8 w-8 text-swiss-red flex-shrink-0 mt-1" />
                    <p className="text-gray-700 leading-relaxed">
                      Unser Ziel ist es, Schweizer KMUs nicht nur sichtbarer zu machen, sondern auch nachhaltige
                      Geschäftschancen zu schaffen. Wir möchten dazu beitragen, dass unsere Mitglieder und Partner
                      durch redaktionelle Exponierung, gezielte Kommunikation und Netzwerkveranstaltungen neue
                      Kunden gewinnen und ihre Unternehmen erfolgreich ausbauen können.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* What Drives Us Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-swiss-darkblue mb-8">Was uns antreibt</h2>
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Rocket className="h-8 w-8 text-swiss-red flex-shrink-0 mt-1" />
                    <p className="text-gray-700 leading-relaxed">
                      Der SKV steht für Innovation, Austausch und Wachstum. Wir glauben an die Stärke von KMUs und
                      daran, dass Zusammenarbeit der Schlüssel zum Erfolg ist. Deshalb fördern wir aktiv den Austausch
                      zwischen Unternehmen, Branchen und Regionen und schaffen so ein starkes Fundament für die
                      Zukunft der Schweizer Wirtschaft.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Call to Action Section */}
            <div className="text-center bg-gray-50 rounded-lg p-8 mb-16">
              <h2 className="text-3xl font-bold text-swiss-darkblue mb-4">Starten Sie Ihre Erfolgsgeschichte jetzt!</h2>
              <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
                Werden Sie Teil unseres einzigartigen Netzwerks und profitieren Sie von den zahlreichen Vorteilen
                einer Mitgliedschaft beim Schweizerischen KMU Verein.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/membership">
                  <Button className="bg-swiss-red hover:bg-swiss-red/90">
                    Mitglied werden
                  </Button>
                </Link>
                <Link to="/kontakt">
                  <Button variant="outline">
                    Kontaktieren Sie uns
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </BackgroundPattern>
      <Footer />
    </>
  );
};

export default UnsereAuftrag;