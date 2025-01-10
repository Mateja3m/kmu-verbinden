const PlatformFeatures = () => {
  return (
    <div className="space-y-8 mb-12">
      <h2 className="text-2xl font-semibold">Was bietet die Evoya-Plattform?</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* LLM Hub */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold mb-3">LLM Hub</h3>
          <ul className="space-y-2">
            <li>• Zugriff auf führende KI-Modelle von OpenAI, Anthropic, Meta, Google und mehr</li>
            <li>• Immer die besten Technologien für Ihre Anforderungen</li>
          </ul>
        </div>

        {/* Privacy Shield */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold mb-3">Privacy Shield</h3>
          <ul className="space-y-2">
            <li>• Datenschutzkonforme Anonymisierung sensibler Daten</li>
            <li>• Gehostet in der Schweiz – Ihre Daten bleiben sicher</li>
          </ul>
        </div>

        {/* Semantische Wissensbasis */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold mb-3">Semantische Wissensbasis</h3>
          <ul className="space-y-2">
            <li>• Präzise Verarbeitung und Informationsextraktion aus Dokumenten und Webinhalten</li>
            <li>• Erleichtert die Arbeit mit großen Datenmengen</li>
          </ul>
        </div>

        {/* Universelle Webintegration */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold mb-3">Universelle Webintegration</h3>
          <ul className="space-y-2">
            <li>• KI-Agenten-Chats nahtlos in Websites, Intranets, Shops oder Firmenportale integrieren</li>
            <li>• Kein Programmieraufwand erforderlich</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlatformFeatures;