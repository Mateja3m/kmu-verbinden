import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 mt-20">
        <DashboardContent />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;