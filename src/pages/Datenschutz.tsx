
import BackgroundPattern from "@/components/BackgroundPattern";

const Datenschutz = () => {
  return (
    <BackgroundPattern>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow container mx-auto px-4 pt-32">
          <h1 className="text-4xl font-bold text-swiss-darkblue mb-8">Datenschutzerklärung</h1>
          <div className="prose max-w-none">
            <p>Die Datenschutzerklärung des Schweizerischen KMU Vereins wird hier aufgeführt...</p>
          </div>
        </main>
      </div>
    </BackgroundPattern>
  );
};

export default Datenschutz;
