import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Computer, UserPlus, BookOpen, Users } from "lucide-react";

const projects = [
  {
    title: "Digitalisierungsoffensive",
    icon: Computer,
    goal: "Unterstützung von KMUs bei der Digitalisierung ihrer Geschäftsprozesse.",
    activities: "Workshops, Webinare und Beratungsdienste zu Themen wie E-Commerce, digitale Marketingstrategien, IT-Sicherheit und der Einsatz von KI.",
    benefits: "Erhöhung der Effizienz und Wettbewerbsfähigkeit der KMUs.",
    image: "/AdobeStock_104633111.jpeg"
  },
  {
    title: "Talent Scouting",
    icon: UserPlus,
    goal: "Gewinnung von Lehrlingen und Fachpersonal.",
    activities: "Organisation von Talent-Scouting-Events, Zusammenarbeit mit Bildungseinrichtungen, Praktika und Trainee-Programme.",
    benefits: "Zugang zu qualifizierten Nachwuchskräften und Fachpersonal, Sicherstellung einer langfristigen Personalplanung und Förderung der Unternehmensentwicklung.",
    image: "/AdobeStock_85407468.jpeg"
  },
  {
    title: "Erstellung von KMU-Praxisratgeber in Print & eBook",
    icon: BookOpen,
    goal: "Neukundengewinnung durch die Präsentation Ihrer Expertise.",
    activities: "Erstellung und Veröffentlichung von praxisnahen Ratgebern, Durchführung von Interviews mit Experten, und Präsentation von Fallstudien und Best Practices.",
    benefits: "Erhöhung der Sichtbarkeit und Glaubwürdigkeit Ihres Unternehmens, Stärkung Ihrer Position als Experte in Ihrer Branche und Gewinnung neuer Kunden durch die Demonstration Ihres Fachwissens.",
    image: "/AdobeStock_706474685.jpeg"
  },
  {
    title: "Mit dem SKV-Netzwerk mehr Kunden gewinnen",
    icon: Users,
    goal: "Steigerung der Sichtbarkeit und Neukundengewinnung durch das SKV-Netzwerk.",
    activities: "Präsenz in der SKV-Zeitung und im Online-Magazin, proaktive Bewerbung des Expertenratsprofils, Teilnahme an Newsletter-Kampagnen und weiteren Marketinginitiativen.",
    benefits: "Erhöhung der Sichtbarkeit Ihres Unternehmens innerhalb des SKV-Netzwerks, Gewinnung neuer Kunden durch gezielte Marketingmaßnahmen und Stärkung Ihrer Position als vertrauenswürdiger Experte in Ihrer Branche.",
    image: "/AdobeStock_516541753.jpeg"
  }
];

const AktuelleProjekte = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-20">
        <header className="w-full bg-luxury-gradient text-white">
          <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-4">Aktuelle Projekte</h1>
            <p className="text-xl max-w-3xl">
              Entdecken Sie unsere aktuellen Initiativen zur Unterstützung und Förderung von KMUs in der Schweiz
            </p>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-2xl font-bold flex items-center gap-2">
                      <project.icon className="h-6 w-6" />
                      {project.title}
                    </h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-swiss-red mb-2">Ziel</h4>
                      <p className="text-gray-600">{project.goal}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-swiss-red mb-2">Aktivitäten</h4>
                      <p className="text-gray-600">{project.activities}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-swiss-red mb-2">Nutzen</h4>
                      <p className="text-gray-600">{project.benefits}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AktuelleProjekte;