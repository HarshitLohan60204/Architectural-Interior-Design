import React, { useRef, useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ThreeEvent } from '@react-three/fiber';
import { BlockObject } from '../types';

interface BlockProps {
  block: BlockObject;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onUpdatePosition: (id: string, position: [number, number, number]) => void;
  allBlocks: BlockObject[];
  viewMode: '1D' | '2D' | '3D';
  activeDimension: 'x' | 'y' | 'z';
  onDelete?: (id: string) => void;
}

const Block: React.FC<BlockProps> = ({
  block,
  isSelected,
  onSelect,
  onUpdatePosition,
  allBlocks,
  viewMode,
  activeDimension,
  onDelete
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera, raycaster, pointer, gl } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<THREE.Vector3 | null>(null);
  const [originalPosition, setOriginalPosition] = useState<[number, number, number]>(block.position);
  const dragPlane = useRef<THREE.Plane>(new THREE.Plane());
  const [mouseMoveOffset, setMouseMoveOffset] = useState<THREE.Vector3 | null>(null);

  useEffect(() => {
    if (isDragging) {
      const handleGlobalPointerMove = (e: PointerEvent) => {
        const rect = gl.domElement.getBoundingClientRect();
        pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        if (dragStart && meshRef.current) {
          dragObject();
        }
      };

      window.addEventListener('pointermove', handleGlobalPointerMove);

      return () => {
        window.removeEventListener('pointermove', handleGlobalPointerMove);
      };
    }
  }, [isDragging, dragStart, gl.domElement]);

  const dragObject = () => {
    if (!dragStart || !meshRef.current) return;

    raycaster.setFromCamera(pointer, camera);

    const intersection = new THREE.Vector3();
    raycaster.ray.intersectPlane(dragPlane.current, intersection);

    if (mouseMoveOffset) {
      intersection.sub(mouseMoveOffset);
    }

    let newPosition: [number, number, number];

    if (viewMode === '3D') {
      newPosition = [intersection.x, intersection.y, intersection.z];
    } else if (viewMode === '2D') {
      const activePlane = window.activePlane || 'xz';

      if (activePlane === 'xy') {
        newPosition = [intersection.x, intersection.y, originalPosition[2]];
      } else if (activePlane === 'xz') {
        newPosition = [intersection.x, originalPosition[1], intersection.z];
      } else if (activePlane === 'yz') {
        newPosition = [originalPosition[0], intersection.y, intersection.z];
      }
    } else {
      newPosition = [...originalPosition] as [number, number, number];
      if (activeDimension === 'x') {
        newPosition[0] = intersection.x;
      } else if (activeDimension === 'y') {
        newPosition[1] = intersection.y;
      } else {
        newPosition[2] = intersection.z;
      }
    }

    onUpdatePosition(block.id, newPosition);
  };

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    
    if (e.button === 2 && onDelete) {
      onDelete(block.id);
      return;
    }
    
    onSelect(block.id);
    setIsDragging(true);
    setOriginalPosition([...block.position]);

    const worldPos = new THREE.Vector3();
    meshRef.current?.getWorldPosition(worldPos);
    setDragStart(worldPos.clone());

    const normal = new THREE.Vector3();
    camera.getWorldDirection(normal);
    dragPlane.current.setFromNormalAndCoplanarPoint(
      normal,
      worldPos
    );

    const raycasterTemp = new THREE.Raycaster();
    const pointerTemp = new THREE.Vector2(
      ((e.nativeEvent.clientX - gl.domElement.getBoundingClientRect().left) / gl.domElement.clientWidth) * 2 - 1,
      -(((e.nativeEvent.clientY - gl.domElement.getBoundingClientRect().top) / gl.domElement.clientHeight) * 2 - 1)
    );
    
    raycasterTemp.setFromCamera(pointerTemp, camera);
    
    const intersectionPoint = new THREE.Vector3();
    if (raycasterTemp.ray.intersectPlane(dragPlane.current, intersectionPoint)) {
      const objectPosition = new THREE.Vector3(...block.position);
      const offset = new THREE.Vector3().subVectors(intersectionPoint, objectPosition);
      setMouseMoveOffset(offset);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    setDragStart(null);
    setMouseMoveOffset(null);
  };

  useEffect(() => {
    if (isDragging) {
      document.body.style.cursor = 'grabbing';
    } else {
      document.body.style.cursor = 'auto';
    }

    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [isDragging]);

  const getGeometry = () => {
    switch (block.type) {
      case 'wall':
        return (
          <boxGeometry 
            args={[block.dimensions.width, block.dimensions.height, block.dimensions.depth]} 
          />
        );
      case 'pillar':
        return (
          <cylinderGeometry 
            args={[
              block.dimensions.width / 2, 
              block.dimensions.width / 2, 
              block.dimensions.height, 
              16
            ]} 
          />
        );
      case 'stair':
        return (
          <boxGeometry 
            args={[block.dimensions.width, block.dimensions.height, block.dimensions.depth]} 
          />
        );
      case 'cone':
        return (
          <coneGeometry 
            args={[
              block.dimensions.width / 2,
              block.dimensions.height,
              16
            ]} 
          />
        );
      case 'sphere':
        return (
          <sphereGeometry 
            args={[
              Math.min(
                block.dimensions.width,
                block.dimensions.height,
                block.dimensions.depth
              ) / 2,
              32,
              32
            ]} 
          />
        );
      default:
        return (
          <boxGeometry 
            args={[block.dimensions.width, block.dimensions.height, block.dimensions.depth]} 
          />
        );
    }
  };

  const getMaterialColor = () => {
    if (isDragging) {
      return '#33C3F0';
    } else if (isSelected) {
      return '#F97316';
    } else {
      return block.color;
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={[block.position[0], block.position[1], block.position[2]]}
      rotation={[block.rotation[0], block.rotation[1], block.rotation[2]]}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerOut={handlePointerUp}
      onContextMenu={(e) => e.stopPropagation()}
    >
      {getGeometry()}
      <meshStandardMaterial 
        color={getMaterialColor()} 
        transparent={true}
        opacity={0.8}
      />
    </mesh>
  );
};

export default Block;
