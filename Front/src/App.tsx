import { Toaster as ToasterUI } from "@/components/ui/toaster";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import ServiceArchitecturalDesign from "./pages/ServiceArchitecturalDesign";
import Service3DModeling from "./pages/Service3DModeling";
import ServiceBlueprintCreation from "./pages/ServiceBlueprintCreation";
import ServiceInteriorDesign from "./pages/ServiceInteriorDesign";
import ServiceProjectConsultation from "./pages/ServiceProjectConsultation";
import ServiceTechnicalSupport from "./pages/ServiceTechnicalSupport";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ToasterUI />
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blueprint" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/architectural-design" element={<ServiceArchitecturalDesign />} />
          <Route path="/services/3d-modeling" element={<Service3DModeling />} />
          <Route path="/services/blueprint-creation" element={<ServiceBlueprintCreation />} />
          <Route path="/services/interior-design" element={<ServiceInteriorDesign />} />
          <Route path="/services/project-consultation" element={<ServiceProjectConsultation />} />
          <Route path="/services/technical-support" element={<ServiceTechnicalSupport />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
