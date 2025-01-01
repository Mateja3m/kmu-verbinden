import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExpertSubmission from "@/pages/ExpertSubmission";
import Home from "@/pages/Home";
import Kontakt from "@/pages/Kontakt";
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