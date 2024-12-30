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
              <p className="text-gray-700 mb-4">
                Als Präsident des Schweizerischen KMU Vereins setzt sich Diego Schnydrig mit grossem Engagement für die Interessen der kleinen und mittleren Unternehmen in der Schweiz ein.
              </p>
              <p className="text-gray-700">
                Mit seiner Erfahrung und seinem Verständnis für die Bedürfnisse von KMUs trägt er massgeblich zur Entwicklung und Stärkung unseres Vereins bei.
              </p>
            </div>
            <img
              src="https://static.wixstatic.com/media/0c82d3_9f38df8ed5b44e02a95e96a5dbeacce3~mv2.png/v1/fill/w_560,h_374,fp_0.34_0.22,lg_1,q_85,enc_avif,quality_auto/0d64f4ef-3056-4a82-aa47-7ab680b7a57a.png"
              alt="Diego Schnydrig"
              className="rounded-lg shadow-lg w-full md:w-[300px] object-cover"
            />
          </div>
        </div>

        <div className="space-y-8 text-gray-700">
          <p>Der Schweizerische KMU Verein (SKV) setzt sich aktiv für die Interessen und Bedürfnisse seiner Mitglieder ein. Unser Präsidium arbeitet eng mit allen Mitgliedern zusammen, um die Ziele des Vereins zu erreichen.</p>
          <p>Wir fördern den Austausch zwischen den Mitgliedern und bieten eine Plattform für Networking und gegenseitige Unterstützung.</p>
          <p>Für weitere Informationen oder bei Fragen stehen wir Ihnen jederzeit gerne zur Verfügung.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Presidency;