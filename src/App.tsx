
import { Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import IndustryLanding from "@/pages/IndustryLanding";
import WebsiteRedesign from "@/pages/WebsiteRedesign";
import FahrschuleLanding from "@/pages/FahrschuleLanding";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<div>Home</div>} />
        <Route path="/website-redesign" element={<WebsiteRedesign />} />
        <Route path="/website-redesign/branche/:industry" element={<IndustryLanding />} />
        <Route path="/website-redesign/fahrschule" element={<FahrschuleLanding />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
