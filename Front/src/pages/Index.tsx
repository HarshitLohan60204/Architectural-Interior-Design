import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronLeft } from 'lucide-react';
import { toast } from "sonner";
import Sidebar from '../components/Sidebar';
import BlueprintCanvas from '../components/BlueprintCanvas';
import { BlockType, ViewMode } from '../types';
import '../styles.css';

const Index = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('3D');
  const [activeTool, setActiveTool] = useState<BlockType | null>(null);
  const [blockDimensions, setBlockDimensions] = useState({
    width: 2,
    height: 3,
    depth: 1
  });
  const [activeDimension, setActiveDimension] = useState<'x' | 'y' | 'z'>('x');
  const [activeColor, setActiveColor] = useState('#9b87f5');

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      toast.error("Please login to access the blueprint editor");
      navigate('/login');
    }
    
    // Check if there's GLTF data to load
    const gltfData = localStorage.getItem('gltfModelData');
    if (gltfData) {
      console.log("Found GLTF data to load", gltfData.substring(0, 100) + "...");
      // Note: The actual loading of the GLTF data would need to be implemented
      // in the BlueprintCanvas component
      localStorage.removeItem('gltfModelData'); // Clear after loading
    }
  }, [navigate]);

  // Handle block placed to reset the active tool
  const handleBlockPlaced = () => {
    setActiveTool(null);
  };

  return (
    <div className="app-container relative">
      <div className="absolute top-4 left-4 z-50 flex gap-2">
        <Button
          variant="secondary"
          className="flex items-center gap-1"
          onClick={() => navigate('/dashboard')}
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
      
      <Sidebar
        viewMode={viewMode}
        setViewMode={setViewMode}
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        blockDimensions={blockDimensions}
        setBlockDimensions={setBlockDimensions}
        activeDimension={activeDimension}
        setActiveDimension={setActiveDimension}
        activeColor={activeColor}
        setActiveColor={setActiveColor}
      />
      <BlueprintCanvas
        viewMode={viewMode}
        activeTool={activeTool}
        blockDimensions={blockDimensions}
        activeDimension={activeDimension}
        activeColor={activeColor}
        onBlockPlaced={handleBlockPlaced}
      />
    </div>
  );
};

export default Index;
