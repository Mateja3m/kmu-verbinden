import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExpertSubmission from "@/pages/ExpertSubmission";
import Home from "@/pages/Home";
import Kontakt from "@/pages/Kontakt";
import Partners from "@/pages/Partners";
import Membership from "@/pages/Membership";
import Redaktion from "@/pages/Redaktion";
import Dashboard from "@/pages/Dashboard";
import PartnerDashboard from "@/pages/PartnerDashboard";
import Admin from "@/pages/Admin";
import Presidency from "@/pages/Presidency";
import Rechtsdienst from "@/pages/Rechtsdienst";
import AktuelleProjekte from "@/pages/AktuelleProjekte";
import News from "@/pages/News";
import NewsDetail from "@/pages/NewsDetail";
import Experts from "@/pages/Experts";
import ExpertDetail from "@/pages/ExpertDetail";
import Auth from "@/pages/Auth";
import AGB from "@/pages/AGB";
import Impressum from "@/pages/Impressum";
import Datenschutz from "@/pages/Datenschutz";
import UnsereAuftrag from "@/pages/UnsereAuftrag";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/expert-submission" element={<ExpertSubmission />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/redaktion" element={<Redaktion />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/partner-dashboard" element={<PartnerDashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/presidency" element={<Presidency />} />
        <Route path="/rechtsdienst" element={<Rechtsdienst />} />
        <Route path="/aktuelle-projekte" element={<AktuelleProjekte />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:slug" element={<NewsDetail />} />
        <Route path="/experts" element={<Experts />} />
        <Route path="/experts/:id" element={<ExpertDetail />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/agb" element={<AGB />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="/unsere-auftrag" element={<UnsereAuftrag />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;