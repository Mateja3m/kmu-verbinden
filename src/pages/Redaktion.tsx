import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Redaktion = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-swiss-darkblue mb-8">
              Redaktion SKV
            </h1>
            <img
              src="https://static.wixstatic.com/media/0c82d3_2ad093992c9042fbaffe72bf4ea724c9~mv2.png"
              alt="Redaktion SKV"
              className="max-w-full h-auto mx-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Redaktion;