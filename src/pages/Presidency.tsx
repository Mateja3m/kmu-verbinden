import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Presidency = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-swiss-darkblue mb-8">
          Präsidium des Schweizerischen KMU Vereins (SKV)
        </h1>
        
        <div className="bg-gradient-to-br from-swiss-darkblue/5 to-swiss-red/5 rounded-2xl p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-swiss-darkblue mb-2">
                DIEGO SCHNYDRIG
              </h2>
              <h3 className="text-xl text-swiss-red mb-6">
                PRÄSIDENT & AKTUAR
              </h3>
              <p className="text-gray-700 mb-4">
                Vorstellung unseres Präsidenten und Aktuars: Herr Diego Schnydrig
              </p>
              <div className="mt-6 space-y-4">
                <p className="text-gray-700">
                  Die Motivation von Herrn Schnydrig entspringt seinem tiefen Verständnis für die Herausforderungen und Bedürfnisse der KMU. Als Treuhänder kennt er die betriebswirtschaftlichen und administrativen Hürden, die viele Unternehmen überwinden müssen, und arbeitet konsequent daran, praxisnahe Lösungen und Unterstützung anzubieten.
                </p>
                <p className="text-gray-700">
                  Sein Ziel ist es, die Wettbewerbsfähigkeit und Innovationskraft der Schweizer KMU zu stärken und ihnen eine starke Stimme auf nationaler Ebene zu geben.
                </p>
              </div>
            </div>
            <img
              src="https://static.wixstatic.com/media/0c82d3_9f38df8ed5b44e02a95e96a5dbeacce3~mv2.png/v1/fill/w_560,h_374,fp_0.34_0.22,lg_1,q_85,enc_avif,quality_auto/0d64f4ef-3056-4a82-aa47-7ab680b7a57a.png"
              alt="Diego Schnydrig"
              className="rounded-lg shadow-lg w-full md:w-[300px] object-cover"
            />
          </div>
        </div>

        <div className="space-y-8 text-gray-700">
          <p>
            Unter der Leitung von Herrn Schnydrig verfolgt der SKV eine klare Ausrichtung: die Förderung der Digitalisierung, die Unterstützung bei der Lehrlingsausbildung durch Talentscouting, die Bereitstellung umfassender Finanzberatung, die Etablierung von Mentoring-Programmen sowie redaktionelle Dienstleistungen. Der Schweizerische KMU Verein (SKV) hat den klaren Auftrag, die multimediale Sichtbarkeit aller KMU in der Schweiz zu fördern.
          </p>
          <p>
            Dies gelingt durch die Konzentration auf unser breites Netzwerk, sowohl digital als auch in Print.
          </p>
          <p>
            Unsere Projekte und Initiativen sollen den Mitgliedern und auch Nichtmitgliedern helfen, ihr volles Potenzial auszuschöpfen und erfolgreich zu wachsen. Wir operieren ausschließlich national und sind stolz darauf, unsere Mitglieder durch verschiedene Medienformate zu unterstützen.
          </p>
          <p>
            Herr Schnydrig lädt alle Mitglieder, Nichtmitglieder und Interessierten ein, sich aktiv an den vielfältigen Projekten des Vereins zu beteiligen und die zahlreichen Angebote zu nutzen. Für weitere Informationen oder Fragen steht Ihnen unsere Geschäftsstelle jederzeit gerne zur Verfügung.
          </p>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="font-bold text-swiss-darkblue mb-4">Ihr Präsident: Diego Schnydrig</p>
            <p className="text-gray-700">diego.schydrig@kmu-verein.ch</p>
            <p className="text-gray-700">079 579 64 17</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Presidency;