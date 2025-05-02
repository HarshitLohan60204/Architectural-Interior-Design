import React from 'react';
import { Square, PanelRight, Download, Cone, Circle } from 'lucide-react';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { toast } from '@/components/ui/sonner';

const BlueprintTools = ({
  viewMode,
  setViewMode,
  activeTool,
  setActiveTool,
  activeDimension,
  setActiveDimension
}) => {
  const handleDownload = () => {
    if (window.scene) {
      const exporter = new GLTFExporter();
      exporter.parse(
        window.scene,
        (gltf) => {
          const jsonString = JSON.stringify(gltf);
          const blob = new Blob([jsonString], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'scene.gltf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          toast("Model downloaded successfully!");
        },
        (error) => {
          console.error('An error happened during export:', error);
          toast("Failed to download model", {
            description: "There was an error exporting your model.",
          });
        }
      );
    } else {
      toast("No scene to export", {
        description: "Please add some shapes to the canvas first.",
      });
    }
  };

  return (
    <div className="sidebar-section">
      <h2>Blueprint Tools</h2>
      
      <div className="sidebar-section">
        <h3>View Mode</h3>
        <div className="view-modes">
          <button
            className={`view-mode-button ${viewMode === '1D' ? 'active' : ''}`}
            onClick={() => setViewMode('1D')}
          >
            1D
          </button>
          <button
            className={`view-mode-button ${viewMode === '2D' ? 'active' : ''}`}
            onClick={() => setViewMode('2D')}
          >
            2D
          </button>
          <button
            className={`view-mode-button ${viewMode === '3D' ? 'active' : ''}`}
            onClick={() => setViewMode('3D')}
          >
            3D
          </button>
        </div>
      </div>
      
      {viewMode === '1D' && (
        <div className="sidebar-section">
          <h3>Active Dimension</h3>
          <div className="view-modes">
            <button
              className={`view-mode-button ${activeDimension === 'x' ? 'active' : ''}`}
              onClick={() => setActiveDimension('x')}
            >
              X
            </button>
            <button
              className={`view-mode-button ${activeDimension === 'y' ? 'active' : ''}`}
              onClick={() => setActiveDimension('y')}
            >
              Y
            </button>
            <button
              className={`view-mode-button ${activeDimension === 'z' ? 'active' : ''}`}
              onClick={() => setActiveDimension('z')}
            >
              Z
            </button>
          </div>
        </div>
      )}

      <div className="sidebar-section">
        <h3>Shapes</h3>
        <button
          className={`tool-button ${activeTool === 'wall' ? 'active' : ''}`}
          onClick={() => setActiveTool(activeTool === 'wall' ? null : 'wall')}
        >
          <Square className="h-4 w-4 mr-1" />
          Wall
        </button>
        <button
          className={`tool-button ${activeTool === 'pillar' ? 'active' : ''}`}
          onClick={() => setActiveTool(activeTool === 'pillar' ? null : 'pillar')}
        >
          <PanelRight className="h-4 w-4 mr-1" />
          Pillar
        </button>
        <button
          className={`tool-button ${activeTool === 'cone' ? 'active' : ''}`}
          onClick={() => setActiveTool(activeTool === 'cone' ? null : 'cone')}
        >
          <Cone className="h-4 w-4 mr-1" />
          Cone
        </button>
        <button
          className={`tool-button ${activeTool === 'sphere' ? 'active' : ''}`}
          onClick={() => setActiveTool(activeTool === 'sphere' ? null : 'sphere')}
        >
          <Circle className="h-4 w-4 mr-1" />
          Sphere
        </button>
      </div>

      <div className="sidebar-section">
        <button
          className="tool-button"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4 mr-1" />
          Download Model
        </button>
      </div>
    </div>
  );
};

export default BlueprintTools;
