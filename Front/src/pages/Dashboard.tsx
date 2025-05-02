
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Upload, ChevronLeft } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      toast.error("Please login to access dashboard");
      navigate('/login');
      return;
    }
    
    try {
      const userData = JSON.parse(user);
      setUserName(userData.name || "User");
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, [navigate]);

  const handleNewProject = () => {
    navigate("/blueprint");
  };

  const handleUploadGLTF = () => {
    // Create a file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.gltf,.glb';
    
    // Listen for file selection
    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Handle the file upload
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            // Store GLTF data in localStorage to be loaded by the blueprint editor
            localStorage.setItem('gltfModelData', e.target.result as string);
            toast.success(`File "${file.name}" uploaded successfully.`);
            
            // Navigate to blueprint editor
            setTimeout(() => {
              navigate("/blueprint");
            }, 1000);
          }
        };
        reader.readAsText(file);
      }
    };
    
    // Trigger the file dialog
    fileInput.click();
  };

  const handleLogout = () => {
    // Remove user from localStorage
    localStorage.removeItem('user');
    toast.success("Logged out successfully");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <span className="text-xl font-bold text-purple-900">Dashboard</span>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-2 ">Welcome, <span className="text-purple-800">{userName}</span>!</h1>
        <p className="text-gray-600 mb-8">Manage your 3D blueprint projects</p>
        
        <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white">
            <h3 className="text-lg font-medium mb-2">New Project</h3>
            <p className="text-gray-600 mb-4">Start a new 3D blueprint project from scratch</p>
            <Button onClick={handleNewProject} className="bg-primary hover:bg-primary/90">Create Project</Button>
          </div>
          
          <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white">
            <h3 className="text-lg font-medium mb-2">Upload Project</h3>
            <p className="text-gray-600 mb-4">Import an existing GLTF file to continue working</p>
            <Button variant="outline" className="flex items-center gap-2" onClick={handleUploadGLTF}>
              <Upload className="h-4 w-4" />
              Upload GLTF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
