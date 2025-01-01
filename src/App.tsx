import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ExpertSubmission from "@/pages/ExpertSubmission";
import Home from "@/pages/Home"; // Example of an existing route
import Kontakt from "@/pages/Kontakt"; // Example of an existing route
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/expert-submission" element={<ExpertSubmission />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
