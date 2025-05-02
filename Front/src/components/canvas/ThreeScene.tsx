import React, { useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import Block from '../Block';
import { BlockObject, ViewMode } from '../../types';
import * as THREE from 'three';

declare global {
  interface Window {
    scene: THREE.Scene;
  }
}

// Helper component to get scene and camera references
const SceneSetup = ({ setSceneRefs }: { setSceneRefs: (scene: THREE.Scene, camera: THREE.Camera) => void }) => {
  const { scene, camera } = useThree();
  
  useEffect(() => {
    setSceneRefs(scene, camera);
  }, [scene, camera, setSceneRefs]);
  
  return null;
};

interface ThreeSceneProps {
  blocks: BlockObject[];
  selectedBlockId: string | null;
  viewMode: ViewMode;
  viewLocked: boolean;
  activeDimension: 'x' | 'y' | 'z';
  onBlockSelect: (id: string) => void;
  onUpdatePosition: (id: string, position: [number, number, number]) => void;
  onDeleteBlock: (id: string) => void;
  controlsRef: React.RefObject<any>;
  setSceneRefs?: (scene: THREE.Scene, camera: THREE.Camera) => void;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({
  blocks,
  selectedBlockId,
  viewMode,
  viewLocked,
  activeDimension,
  onBlockSelect,
  onUpdatePosition,
  onDeleteBlock,
  controlsRef,
  setSceneRefs
}) => {
  useEffect(() => {
    if (setSceneRefs) {
      return () => {
        window.scene = null;
      };
    }
  }, []);

  return (
    <Canvas 
      camera={{ position: [10, 10, 10], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
      onCreated={({ scene }) => {
        window.scene = scene;
      }}
    >
      {setSceneRefs && <SceneSetup setSceneRefs={setSceneRefs} />}
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      
      <Grid 
        infiniteGrid 
        cellSize={1} 
        sectionSize={3} 
        fadeDistance={30}
      />
      
      {blocks.map(block => (
        <Block
          key={block.id}
          block={block}
          isSelected={selectedBlockId === block.id}
          onSelect={onBlockSelect}
          onUpdatePosition={onUpdatePosition}
          allBlocks={blocks}
          viewMode={viewMode}
          activeDimension={activeDimension}
          onDelete={onDeleteBlock}
        />
      ))}
      
      <OrbitControls 
        ref={controlsRef}
        makeDefault 
        enablePan={!viewLocked}
        enableZoom={!viewLocked}
        enableRotate={!viewLocked}
      />
    </Canvas>
  );
};

export default ThreeScene;
