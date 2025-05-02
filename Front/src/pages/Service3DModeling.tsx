
import { Compass } from "lucide-react";

const Service3DModeling = () => (
  <div className="min-h-screen bg-gradient-to-tr from-purple-100 via-white to-purple-50 flex items-center py-16">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center shadow-2xl rounded-3xl overflow-hidden bg-white">
      {/* IMAGE SECTION */}
      <div className="flex-1 min-w-0 w-full md:w-1/2 h-80 md:h-[520px]">
        <img
          src="https://images.unsplash.com/photo-1646142745218-debe66bc645f?auto=format&fit=crop&w=800&q=80"
          alt="3D modeling visualization"
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />
      </div>
      {/* CONTENT SECTION */}
      <div className="flex-1 w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        <div className="flex items-center mb-5">
          <span className="h-14 w-14 mr-5 bg-purple-100 flex items-center justify-center rounded-lg shadow">
            <Compass className="h-8 w-8 text-purple-600" />
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">3D Modeling</h1>
        </div>
        <h2 className="text-xl text-purple-600 font-semibold mb-4">Bring Ideas to Life in 3D</h2>
        <p className="text-lg text-gray-700 mb-6">
          Transform your ideas into vivid 3D models and realistic renderings for presentations, marketing, design validation, or construction planning. We blend creativity and precision for compelling visual results.
        </p>
        <ul className="list-disc list-inside text-gray-700 text-base space-y-2 mb-6 pl-2">
          <li>Realistic architectural & interior modeling</li>
          <li>Photorealistic rendering & animation</li>
          <li>Fast turnaround and collaboration</li>
          <li>Support for all design stages</li>
        </ul>
        <a href="/services" className="inline-block bg-gradient-to-r from-purple-600 to-purple-400 text-white py-2 px-6 rounded-lg font-bold shadow hover:from-purple-700 hover:to-purple-500 transition-all text-md mt-2">
          Back to Services
        </a>
      </div>
    </div>
  </div>
);

export default Service3DModeling;