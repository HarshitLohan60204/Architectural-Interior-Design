
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">About Arkitektur</h1>
            
            <div className="prose prose-lg mx-auto">
              <p className="text-gray-600 mb-6">
                We are dedicated to providing powerful 3D modeling tools for professionals and enthusiasts alike. 
                Our mission is to make 3D design accessible to everyone, regardless of their technical expertise.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">Our Story</h2>
              <p className="text-gray-600 mb-6">
              Arkitektur started as a passion project by a group of 3D modeling enthusiasts who wanted to create a more intuitive and user-friendly 
                modeling tool. What began as a simple prototype has evolved into a comprehensive 3D modeling platform used by designers, 
                architects, and creators worldwide.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">Our Technology</h2>
              <p className="text-gray-600 mb-6">
                Built on cutting-edge web technologies, Arkitektur leverages the power of WebGL and modern JavaScript frameworks to provide a 
                smooth, responsive 3D modeling experience directly in your browser. No downloads or installations necessary.
              </p>
              
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-100 my-8">
                <h3 className="text-xl font-semibold text-purple-800 mb-2">Key Features</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Intuitive 3D modeling interface with real-time preview</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Support for industry-standard file formats (GLTF, GLB)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Cloud storage for your projects with secure access</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Collaboration tools for team projects</span>
                  </li>
                </ul>
              </div>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">Our Vision</h2>
              <p className="text-gray-600">
                We envision a future where 3D modeling is as common and accessible as word processing or image editing. 
                Our goal is to continue innovating and expanding our platform to empower creators around the world to bring 
                their ideas to life in three dimensions.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default About;
