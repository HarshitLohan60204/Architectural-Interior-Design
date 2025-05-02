import { Link } from "react-router-dom";

import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#202020] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 py-12">
          {/* Company Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Arkitektur</h3>
            <p className="text-gray-300 mb-6">
              Creating innovative spaces that inspire and transform lives through thoughtful and sustainable design.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
            <li>
                <Link to="/services/architectural-design" className="text-gray-300 hover:text-white transition-colors">
                Architectural Design
                
                </Link>
              </li>
              <li>
                <Link to="/services/3d-modeling" className="text-gray-300 hover:text-white transition-colors">
                3D Modeling
                </Link>
              </li>
              <li>
                <Link to="/services/blueprint-creation" className="text-gray-300 hover:text-white transition-colors">
                Blueprint Creation
                </Link>
              </li>
              <li>
                <Link to="/services/interior-design" className="text-gray-300 hover:text-white transition-colors">
                Interior Design
                </Link>
              </li>
              <li>
                <Link to="/services/project-consultation" className="text-gray-300 hover:text-white transition-colors">
                Project Consultation
                </Link>
              </li>
              <li>
                <Link to="/services/Technical-Support" className="text-gray-300 hover:text-white transition-colors">
                Technical Support
                </Link>
              </li>
              
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-gray-300">
              <p className="mb-2">123 Nekralisk</p>
              <p className="mb-2">Cambian Drift, DM 94103</p>
              <p className="mb-2">Email: info@arkitektur.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 py-6">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Arkitektur. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;