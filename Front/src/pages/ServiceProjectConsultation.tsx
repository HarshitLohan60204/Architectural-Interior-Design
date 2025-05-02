
import { Search } from "lucide-react";

const ServiceProjectConsultation = () => (
  <div className="min-h-screen bg-gradient-to-l from-purple-100 via-white to-purple-50 flex items-center py-16">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center shadow-2xl rounded-3xl overflow-hidden bg-white">
      {/* IMAGE SECTION */}
      <div className="flex-1 min-w-0 w-full md:w-1/2 h-80 md:h-[520px]">
        <img
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
          alt="Project Consultation"
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />
      </div>
      {/* CONTENT SECTION */}
      <div className="flex-1 w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        <div className="flex items-center mb-5">
          <span className="h-14 w-14 mr-5 bg-purple-100 flex items-center justify-center rounded-lg shadow">
            <Search className="h-8 w-8 text-purple-600" />
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Project Consultation</h1>
        </div>
        <h2 className="text-xl text-purple-600 font-semibold mb-4">Trusted Advice at Every Step</h2>
        <p className="text-lg text-gray-700 mb-6">
          Tap into deep expertise for feasibility, costing, material selection, and regulations. Our consultants guide you through planning and execution for projects of any scope.
        </p>
        <ul className="list-disc list-inside text-gray-700 text-base space-y-2 mb-6 pl-2">
          <li>Project feasibility studies</li>
          <li>Material & vendor recommendations</li>
          <li>Cost estimates & regulatory insight</li>
          <li>On-demand expert advice</li>
        </ul>
        <a href="/services" className="inline-block bg-gradient-to-r from-purple-600 to-purple-400 text-white py-2 px-6 rounded-lg font-bold shadow hover:from-purple-700 hover:to-purple-500 transition-all text-md mt-2">
          Back to Services
        </a>
      </div>
    </div>
  </div>
);

export default ServiceProjectConsultation;