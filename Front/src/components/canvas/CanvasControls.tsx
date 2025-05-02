
import React from 'react';
import { PlaneType, ViewMode } from '../../types';
import { Button } from '../../components/ui/button';
import { Undo, Redo, Lock, Unlock } from 'lucide-react';

interface CanvasControlsProps {
  viewMode: ViewMode;
  viewLocked: boolean;
  toggleViewLock: () => void;
  activePlane: PlaneType;
  handlePlaneChange: (plane: PlaneType) => void;
  handleUndo: () => void;
  handleRedo: () => void;
  activeTool: string | null;
  historyIndex: number;
  historyLength: number;
  activeDimension?: 'x' | 'y' | 'z';
}

const CanvasControls: React.FC<CanvasControlsProps> = ({
  viewMode,
  viewLocked,
  toggleViewLock,
  activePlane,
  handlePlaneChange,
  handleUndo,
  handleRedo,
  activeTool,
  historyIndex,
  historyLength,
  activeDimension = 'x'
}) => {
  return (
    <>
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-md z-10">
        {viewMode === '1D' ? 
          `1D Mode: Moving along ${activeDimension.toUpperCase()} axis only` : 
          viewMode === '2D' ? 
            `2D Mode: Moving on ${activePlane.toUpperCase()} plane` : 
            '3D Mode: Free movement'
        }
      </div>
      
      <div className="absolute top-4 right-4 flex space-x-2 z-10">
        <Button 
          variant="secondary"
          size="sm"
          onClick={toggleViewLock}
          className="bg-black/50 hover:bg-black/70 text-white"
        >
          {viewLocked ? <Unlock className="h-4 w-4 mr-1" /> : <Lock className="h-4 w-4 mr-1" />}
          {viewLocked ? 'Unlock View' : 'Lock View'}
        </Button>
      </div>

      {viewMode === '2D' && (
        <div className="absolute top-16 right-4 flex flex-col space-y-2 z-10">
          <Button 
            variant={activePlane === 'xy' ? "default" : "secondary"}
            size="sm"
            onClick={() => handlePlaneChange('xy')}
            className={activePlane === 'xy' ? "bg-primary" : "bg-black/50 hover:bg-black/70 text-white"}
          >
            XY Plane
          </Button>
          <Button 
            variant={activePlane === 'xz' ? "default" : "secondary"}
            size="sm"
            onClick={() => handlePlaneChange('xz')}
            className={activePlane === 'xz' ? "bg-primary" : "bg-black/50 hover:bg-black/70 text-white"}
          >
            XZ Plane
          </Button>
          <Button 
            variant={activePlane === 'yz' ? "default" : "secondary"}
            size="sm"
            onClick={() => handlePlaneChange('yz')}
            className={activePlane === 'yz' ? "bg-primary" : "bg-black/50 hover:bg-black/70 text-white"}
          >
            YZ Plane
          </Button>
        </div>
      )}

      <div className="absolute bottom-4 left-4 flex space-x-2 z-10">
        <Button 
          variant="secondary"
          size="sm"
          onClick={handleUndo}
          disabled={historyIndex <= 0}
          className="bg-black/50 hover:bg-black/70 text-white disabled:opacity-30"
        >
          <Undo className="h-4 w-4 mr-1" />
          Undo (Ctrl+Z)
        </Button>
        <Button 
          variant="secondary"
          size="sm"
          onClick={handleRedo}
          disabled={historyIndex >= historyLength - 1}
          className="bg-black/50 hover:bg-black/70 text-white disabled:opacity-30"
        >
          <Redo className="h-4 w-4 mr-1" />
          Redo (Ctrl+X)
        </Button>
      </div>
      
      {activeTool && (
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-4 py-2 rounded-md z-10">
          Click to add a {activeTool}
        </div>
      )}
    </>
  );
};

export default CanvasControls;
