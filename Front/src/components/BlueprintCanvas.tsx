
import React, { useState, useRef, useEffect } from 'react';
import { BlockObject, BlockType, ViewMode, PlaneType } from '../types';
import { useBlockHistory } from '../hooks/useBlockHistory';
import ThreeScene from './canvas/ThreeScene';
import CanvasControls from './canvas/CanvasControls';
import { generateId, getDefaultColor, shouldSnapBlocks, getSnappingPosition } from '../utils/blockUtils';
import * as THREE from 'three';

// Declare this to make TypeScript happy with our global property
declare global {
  interface Window {
    activePlane: PlaneType;
  }
}

// Set default active plane
window.activePlane = 'xz';

interface BlueprintCanvasProps {
  viewMode: ViewMode;
  activeTool: BlockType | null;
  blockDimensions: { width: number; height: number; depth: number };
  activeDimension: 'x' | 'y' | 'z';
  activeColor?: string;
  onBlockPlaced?: () => void;
}

const BlueprintCanvas: React.FC<BlueprintCanvasProps> = ({
  viewMode,
  activeTool,
  blockDimensions,
  activeDimension,
  activeColor,
  onBlockPlaced
}) => {
  const [blocks, setBlocks] = useState<BlockObject[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [viewLocked, setViewLocked] = useState(false);
  const [activePlane, setActivePlane] = useState<PlaneType>('xz');
  const controlsRef = useRef<any>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.Camera | null>(null);
  
  const { historyIndex, historyLength, handleUndo, handleRedo } = useBlockHistory(blocks);

  // Update window.activePlane whenever activePlane changes
  useEffect(() => {
    window.activePlane = activePlane;
  }, [activePlane]);

  // Handle keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Z for undo
      if (e.ctrlKey && e.key === 'z') {
        const newBlocks = handleUndo();
        if (newBlocks) setBlocks(newBlocks);
      }
      // Ctrl+X for redo (changed from Ctrl+Y as requested)
      if (e.ctrlKey && e.key === 'x') {
        const newBlocks = handleRedo();
        if (newBlocks) setBlocks(newBlocks);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleUndo, handleRedo]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Only spawn blocks if activeTool is set
    if (!activeTool || !canvasRef.current) return;
    
    // Get canvas dimensions
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Calculate normalized device coordinates
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    // Create raycaster and set from camera
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(x, y);
    
    // Use the actual camera from the scene if available
    if (cameraRef.current) {
      raycaster.setFromCamera(mouse, cameraRef.current);
      
      // Create a plane based on the active plane
      const plane = new THREE.Plane();
      
      if (activePlane === 'xy') {
        plane.setFromNormalAndCoplanarPoint(
          new THREE.Vector3(0, 0, 1),
          new THREE.Vector3(0, 0, 0)
        );
      } else if (activePlane === 'xz') {
        plane.setFromNormalAndCoplanarPoint(
          new THREE.Vector3(0, 1, 0),
          new THREE.Vector3(0, 0, 0)
        );
      } else if (activePlane === 'yz') {
        plane.setFromNormalAndCoplanarPoint(
          new THREE.Vector3(1, 0, 0),
          new THREE.Vector3(0, 0, 0)
        );
      }
      
      const intersection = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, intersection);
      
      // Set position based on the active plane
      let position: [number, number, number];
      
      if (activePlane === 'xy') {
        position = [intersection.x, intersection.y, 0];
      } else if (activePlane === 'xz') {
        position = [intersection.x, blockDimensions.height / 2, intersection.z];
      } else {
        position = [0, intersection.y, intersection.z];
      }
      
      // Create a new block at the clicked position
      const newBlock: BlockObject = {
        id: generateId(),
        type: activeTool,
        position: position,
        dimensions: {...blockDimensions},
        rotation: [0, 0, 0],
        color: activeColor || getDefaultColor(activeTool)
      };
      
      const newBlocks = [...blocks, newBlock];
      setBlocks(newBlocks);
      setSelectedBlockId(newBlock.id);
      
      // Notify parent that a block was placed
      if (onBlockPlaced) {
        onBlockPlaced();
      }
    } else {
      console.warn("Camera not available for raycasting");
    }
  };

  const handleBlockSelect = (id: string) => {
    setSelectedBlockId(id);
  };

  const handleUpdatePosition = (id: string, newPosition: [number, number, number]) => {
    const updatedBlocks = [...blocks];
    const blockIndex = updatedBlocks.findIndex(block => block.id === id);
    if (blockIndex === -1) return;

    const movingBlock = updatedBlocks[blockIndex];
    let finalPosition = [...newPosition] as [number, number, number];
    
    // Check for snapping with other blocks
    const otherBlocks = updatedBlocks.filter(block => block.id !== id);
    for (const otherBlock of otherBlocks) {
      // Create a temporary block with the new position to check for snapping
      const tempBlock = {
        ...movingBlock,
        position: newPosition
      };
      
      if (shouldSnapBlocks(tempBlock, otherBlock)) {
        finalPosition = getSnappingPosition(tempBlock, otherBlock);
        break;
      }
    }
    
    updatedBlocks[blockIndex] = {
      ...movingBlock,
      position: finalPosition
    };
    
    setBlocks(updatedBlocks);
  };

  const handleDeleteBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id));
    if (selectedBlockId === id) {
      setSelectedBlockId(null);
    }
  };

  const toggleViewLock = () => {
    setViewLocked(!viewLocked);
  };

  const handlePlaneChange = (plane: PlaneType) => {
    setActivePlane(plane);
  };

  const handleUndoClick = () => {
    const newBlocks = handleUndo();
    if (newBlocks) setBlocks(newBlocks);
  };

  const handleRedoClick = () => {
    const newBlocks = handleRedo();
    if (newBlocks) setBlocks(newBlocks);
  };

  // Prevent context menu on right-click
  useEffect(() => {
    const preventContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };
    
    document.addEventListener('contextmenu', preventContextMenu);
    
    return () => {
      document.removeEventListener('contextmenu', preventContextMenu);
    };
  }, []);

  const setSceneRefs = (scene: THREE.Scene, camera: THREE.Camera) => {
    sceneRef.current = scene;
    cameraRef.current = camera;
  };

  return (
    <div className="canvas-container relative w-full h-full" 
         onClick={handleCanvasClick} 
         ref={canvasRef}>
      <ThreeScene
        blocks={blocks}
        selectedBlockId={selectedBlockId}
        viewMode={viewMode}
        viewLocked={viewLocked}
        activeDimension={activeDimension}
        onBlockSelect={handleBlockSelect}
        onUpdatePosition={handleUpdatePosition}
        onDeleteBlock={handleDeleteBlock}
        controlsRef={controlsRef}
        setSceneRefs={setSceneRefs}
      />
      
      <CanvasControls
        viewMode={viewMode}
        viewLocked={viewLocked}
        toggleViewLock={toggleViewLock}
        activePlane={activePlane}
        handlePlaneChange={handlePlaneChange}
        handleUndo={handleUndoClick}
        handleRedo={handleRedoClick}
        activeTool={activeTool}
        historyIndex={historyIndex}
        historyLength={historyLength}
      />
    </div>
  );
};

export default BlueprintCanvas;
