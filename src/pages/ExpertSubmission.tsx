import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ExpertSubmissionForm from "@/components/experts/ExpertSubmissionForm";

const ExpertSubmission = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-swiss-darkblue mb-4">
            Expertenrat - Profilregistrierung
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Werden Sie Teil unseres Expertenrats und unterstützen Sie KMU-Unternehmen mit Ihrer Expertise.
          </p>
          <ExpertSubmissionForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ExpertSubmission;