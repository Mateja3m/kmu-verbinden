import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ExpertSubmissionForm from "@/components/experts/ExpertSubmissionForm";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

const ExpertSubmission = () => {
  const [submittedExperts, setSubmittedExperts] = useState<string[]>([]);

  const handleExpertSubmitted = (expertName: string) => {
    setSubmittedExperts([...submittedExperts, expertName]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-grow bg-gray-50 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h1 className="text-5xl font-bold text-swiss-darkblue mb-8">
              Werden Sie SKV-Experte
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Sie sind eingeladen, sich als Experte in unserem Expertenrat zu positionieren. 
              Als Partner können Sie so viele Experten wie Sie möchten einfügen.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-8 pb-6">
                <div className="text-5xl mb-6">🎯</div>
                <h3 className="text-xl font-semibold mb-4 text-swiss-darkblue">Reichweite</h3>
                <p className="text-gray-600">Erreichen Sie hunderte von KMUs in der Schweiz und bauen Sie Ihr Netzwerk aus.</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-8 pb-6">
                <div className="text-5xl mb-6">💼</div>
                <h3 className="text-xl font-semibold mb-4 text-swiss-darkblue">Expertise</h3>
                <p className="text-gray-600">Positionieren Sie sich als Experte in Ihrem Fachgebiet und teilen Sie Ihr Wissen.</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-8 pb-6">
                <div className="text-5xl mb-6">🤝</div>
                <h3 className="text-xl font-semibold mb-4 text-swiss-darkblue">Vertrauen</h3>
                <p className="text-gray-600">Profitieren Sie vom Vertrauen und der Reputation des Schweizer KMU-Vereins.</p>
              </CardContent>
            </Card>
          </div>

          {submittedExperts.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Eingereichte Experten:</h2>
              <div className="space-y-2">
                {submittedExperts.map((expert, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg shadow">
                    {expert}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-8">
            {submittedExperts.map((_, index) => (
              <div key={index} className="collapse">
                <ExpertSubmissionForm onExpertSubmitted={handleExpertSubmitted} />
              </div>
            ))}
            <ExpertSubmissionForm onExpertSubmitted={handleExpertSubmitted} />
            
            <div className="text-center">
              <Button 
                onClick={() => setSubmittedExperts([...submittedExperts, ""])}
                className="bg-swiss-red hover:bg-swiss-red/90"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Weiteren Experten hinzufügen
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ExpertSubmission;