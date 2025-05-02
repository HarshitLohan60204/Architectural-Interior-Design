
import { Link } from "react-router-dom";


import {
  Building,
  Compass,
  Layers,
  Star,
  Search,
  Settings,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    icon: Building,
    title: "Architectural Design",
    description: "Custom architectural designs tailored to your vision and requirements.",
    to: "/services/architectural-design",
  },
  {
    icon: Compass,
    title: "3D Modeling",
    description: "Advanced 3D modeling and visualization services for your projects.",
    to: "/services/3d-modeling",
  },
  {
    icon: Layers,
    title: "Blueprint Creation",
    description: "Professional blueprint creation and documentation services.",
    to: "/services/blueprint-creation",
  },
  {
    icon: Star,
    title: "Interior Design",
    description: "Innovative interior design solutions for all spaces.",
    to: "/services/interior-design",
  },
  {
    icon: Search,
    title: "Project Consultation",
    description: "Expert consultation for architectural projects of any scale.",
    to: "/services/project-consultation",
  },
  {
    icon: Settings,
    title: "Technical Support",
    description: "Comprehensive technical support for our 3D architecture software.",
    to: "/services/Technical-Support",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-center-800 ma-16 mb-8 tracking-tight">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of architectural services and solutions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link to={service.to} key={service.to} className="group">
              <Card className="h-full group hover:shadow-2xl transition-all duration-300 border-0">
                <CardHeader>
                  <div className="h-14 w-14 rounded-xl bg-purple-100 flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                    <service.icon className="h-7 w-7 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl mb-2 font-bold group-hover:text-purple-700 transition">
                    {service.title}
                  </CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-purple-600 group-hover:text-purple-800 font-semibold text-sm mt-2 transition">
                    Learn more &rarr;
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Services;
