const BenefitsSection = () => {
  return (
    <div className="space-y-8 mb-12">
      <h2 className="text-2xl font-semibold">Wie kann das Ihrer KMU helfen?</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <ul className="space-y-3">
            <li>✓ Zeitersparnis: Automatisierung sich wiederholender Aufgaben</li>
            <li>✓ Kostenreduktion: Optimierte Prozesse mit weniger manuellen Eingriffen</li>
            <li>✓ Effizienzsteigerung: KI übernimmt komplexe Aufgaben</li>
            <li>✓ Datenschutzkonformität: Sicherheit durch schweizerische Hosting-Standards</li>
            <li>✓ Skalierbarkeit: Lösungen, die mit Ihrem Unternehmen wachsen</li>
          </ul>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold mb-3">Mögliche Anwendungsbereiche:</h3>
          <ul className="space-y-2">
            <li>• Kundensupport: Intelligente KI-Agenten für 24/7-Support</li>
            <li>• Marketing: Automatische Erstellung und Optimierung von Inhalten</li>
            <li>• Vertrieb: Lead-Generierung durch personalisierte Kommunikation</li>
            <li>• Personalmanagement: Automatisierte Bewerbervorauswahl und Schulungspläne</li>
            <li>• Administration: E-Mail-Automatisierung und Dokumentenmanagement</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;