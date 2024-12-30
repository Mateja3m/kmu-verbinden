import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Presidency from "@/pages/Presidency";
import Partners from "@/pages/Partners";
import Membership from "@/pages/Membership";
import Redaktion from "@/pages/Redaktion";
import Auth from "@/pages/Auth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/presidency" element={<Presidency />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/redaktion" element={<Redaktion />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;