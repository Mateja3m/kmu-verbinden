import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-8 mb-12">
      <h2 className="text-2xl font-semibold mb-4">Starten Sie Ihre Reise in die KI-gestützte Zukunft!</h2>
      <p className="mb-6">
        Vereinbaren Sie jetzt Ihre kostenlose Beratung und lassen Sie sich von unseren Experten zeigen, wie die Evoya-Plattform Ihrem Unternehmen helfen kann.
      </p>
      <div className="space-y-4">
        <p className="text-lg">➡ Chatten Sie mit unserer KI oder fordern Sie direkt Ihre persönliche Offerte an.</p>
        <p className="text-lg">➡ Effizient, modern, sicher – mit Evoya.ai</p>
      </div>
    </div>
  );
};

export default CTASection;