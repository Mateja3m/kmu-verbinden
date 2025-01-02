import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AdminAuth from "@/components/AdminAuth";

const AdminAuthPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow flex flex-col overflow-y-auto">
        <div className="flex-grow flex items-start justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-32 px-4 sm:px-6 lg:px-8">
          <AdminAuth />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminAuthPage;