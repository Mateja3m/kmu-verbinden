
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { DocumentUpload } from "@/components/admin/DocumentUpload";

const DocumentsAdmin = () => {
  const navigate = useNavigate();
  
  // Check for admin session
  useEffect(() => {
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      navigate('/admin/auth');
      return;
    }
    
    try {
      const session = JSON.parse(adminSession);
      const timestamp = new Date(session.timestamp);
      const now = new Date();
      
      // Session expires after 24 hours
      if (now.getTime() - timestamp.getTime() > 24 * 60 * 60 * 1000) {
        localStorage.removeItem('adminSession');
        navigate('/admin/auth');
      }
    } catch (error) {
      localStorage.removeItem('adminSession');
      navigate('/admin/auth');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div className="space-y-2">
                <h1 className="text-3xl font-light text-swiss-darkblue">
                  Dokumente Verwaltung
                </h1>
                <p className="text-gray-600">
                  Hier können Sie Dokumente hochladen und verwalten.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <DocumentUpload />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DocumentsAdmin;
