import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, MessageSquare, Newspaper, Mic } from "lucide-react";

const Redaktion = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-luxury-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold">Mehr Wissen. Mehr Erreichen!</h1>
              <p className="text-lg">
                Entdecken Sie im Unternehmensblick exklusive Berichte, tiefgehende Interviews und 
                wertvolle Tipps für die KMU-Welt – jetzt auch als verkürzte Online-Ausgabe.
              </p>
              <Button 
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-swiss-darkblue"
              >
                Zur Online-Ausgabe
              </Button>
            </div>
            <div className="relative">
              <img
                src="https://static.wixstatic.com/media/0c82d3_dffa67a695014dfb9df38a1ec31083a8~mv2.png"
                alt="Unternehmensblick Magazine"
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Magazine Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-swiss-darkblue mb-4">
              Rubriken im Unternehmensblick
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Der Unternehmensblick erscheint viermal jährlich, mit einer Sonderausgabe im Dezember. 
              Jede Ausgabe enthält feste Rubriken wie Editorial, Treuhand, Büroservice, Informatik, 
              KI, Marketing, Strategie, Rechtsberatung, Finanzierung, Versicherungen, Leadership, 
              Fach- und Expertenbeiträge, Interviews, Werbung und Impressum.
            </p>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Interviews Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-swiss-red">
                <Mic className="h-6 w-6" />
                <h3 className="text-2xl font-bold text-swiss-darkblue">INTERVIEWS</h3>
              </div>
              <p className="text-gray-600">
                Im Unternehmensblick bieten Interviews spannende Einblicke in die Gedankenwelt 
                und Erfahrungen von Branchenexperten, erfolgreichen Unternehmern und Vordenkern. 
                Diese Gespräche decken aktuelle Themen und Trends ab, bieten wertvolle Tipps und 
                Inspirationen und beleuchten die Herausforderungen und Erfolge der Interviewpartner.
              </p>
              <p className="text-gray-600">
                Die Interviews sind eine wertvolle Ressource für unsere Leser, um von den 
                Erfahrungen und Einsichten anderer zu lernen und neue Perspektiven zu gewinnen.
              </p>
            </div>
            <div>
              <img
                src="https://static.wixstatic.com/media/0c82d3_bab25c7359704ae491f88cec40357b2c~mv2.png"
                alt="Interview Page"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Expert Articles Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div className="order-2 md:order-1">
              <img
                src="https://static.wixstatic.com/media/0c82d3_f5739d4597ea43d39f7fbf39948b662f~mv2.png"
                alt="Expert Article"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <div className="flex items-center gap-3 text-swiss-red">
                <BookOpen className="h-6 w-6" />
                <h3 className="text-2xl font-bold text-swiss-darkblue">Experten- und Fachbeiträge</h3>
              </div>
              <p className="text-gray-600">
                Im Unternehmensblick bieten Experten- und Fachbeiträge tiefgehende Analysen und 
                fundiertes Wissen zu verschiedenen Themenbereichen. Verfasst von Fachleuten und 
                Branchenexperten, liefern diese Artikel wertvolle Einblicke und praxisnahe 
                Lösungen für aktuelle Herausforderungen, die KMUs betreffen.
              </p>
              <p className="text-gray-600">
                Die Beiträge decken ein breites Spektrum an Themen ab und helfen unseren Lesern, 
                ihre Kenntnisse zu erweitern und informierte Entscheidungen zu treffen.
              </p>
            </div>
          </div>

          {/* Member Communications Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-swiss-red">
                <MessageSquare className="h-6 w-6" />
                <h3 className="text-2xl font-bold text-swiss-darkblue">
                  Mitteilungen für SKV-Mitglieder
                </h3>
              </div>
              <p className="text-gray-600">
                Im Unternehmensblick finden SKV-Mitglieder exklusive Mitteilungen und Updates, 
                die speziell auf ihre Interessen und Bedürfnisse zugeschnitten sind. Diese 
                Mitteilungen informieren über neue Projekte, Veranstaltungen, Mitgliedervorteile 
                und wichtige Entwicklungen im Verein.
              </p>
              <p className="text-gray-600">
                Sie bieten eine Plattform für den Austausch und die Vernetzung innerhalb der 
                SKV-Community und halten die Mitglieder über relevante Themen auf dem Laufenden.
              </p>
            </div>
            <div>
              <img
                src="https://static.wixstatic.com/media/0c82d3_2da4db47c0734c6092506969dd256f2f~mv2.png"
                alt="Member Communications"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Redaktion;