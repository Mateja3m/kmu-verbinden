import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "@/pages/Auth";
import Admin from "@/pages/Admin";
import PartnerDashboard from "@/pages/PartnerDashboard";
import Home from "@/pages/Home"; // Assuming there's a Home page
import NotFound from "@/pages/NotFound"; // Assuming there's a NotFound page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/partner-dashboard" element={<PartnerDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
