import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const AGB = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 pt-32">
        <h1 className="text-4xl font-bold text-swiss-darkblue mb-8">Allgemeine Geschäftsbedingungen</h1>
        <div className="prose max-w-none">
          <p>Die Allgemeinen Geschäftsbedingungen des Schweizerischen KMU Vereins werden hier aufgeführt...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AGB;