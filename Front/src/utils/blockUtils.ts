import * as THREE from 'three';
import { BlockObject, BlockType } from '../types';

// Generate a random ID for new blocks
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Default colors for different block types
export const getDefaultColor = (type: BlockType): string => {
  switch (type) {
    case 'wall':
      return '#9b87f5';
    case 'pillar':
      return '#7E69AB';
    case 'stair':
      return '#FEC6A1';
    case 'cone':
      return '#33C3F0';
    case 'sphere':
      return '#0EA5E9';
    default:
      return '#9b87f5';
  }
};

// Check if two blocks are close enough to snap
export const shouldSnapBlocks = (
  block1: BlockObject,
  block2: BlockObject,
  threshold: number = 0.8
): boolean => {
  // Calculate distances between block faces
  const block1Box = new THREE.Box3().setFromCenterAndSize(
    new THREE.Vector3(...block1.position),
    new THREE.Vector3(block1.dimensions.width, block1.dimensions.height, block1.dimensions.depth)
  );
  
  const block2Box = new THREE.Box3().setFromCenterAndSize(
    new THREE.Vector3(...block2.position),
    new THREE.Vector3(block2.dimensions.width, block2.dimensions.height, block2.dimensions.depth)
  );
  
  // Check if blocks are close on any axis
  const expandedBox1 = block1Box.clone().expandByScalar(threshold);
  
  return expandedBox1.intersectsBox(block2Box) && !block1Box.intersectsBox(block2Box);
};

// Get snapping position for a block relative to another block
export const getSnappingPosition = (
  movingBlock: BlockObject,
  targetBlock: BlockObject
): [number, number, number] => {
  // Create boxes for the blocks
  const movingBox = new THREE.Box3().setFromCenterAndSize(
    new THREE.Vector3(...movingBlock.position),
    new THREE.Vector3(movingBlock.dimensions.width, movingBlock.dimensions.height, movingBlock.dimensions.depth)
  );
  
  const targetBox = new THREE.Box3().setFromCenterAndSize(
    new THREE.Vector3(...targetBlock.position),
    new THREE.Vector3(targetBlock.dimensions.width, targetBlock.dimensions.height, targetBlock.dimensions.depth)
  );
  
  // Find the closest faces
  const movingCenter = new THREE.Vector3(...movingBlock.position);
  const targetCenter = new THREE.Vector3(...targetBlock.position);
  const direction = new THREE.Vector3().subVectors(movingCenter, targetCenter).normalize();
  
  // Determine which axis has the strongest component
  const absX = Math.abs(direction.x);
  const absY = Math.abs(direction.y);
  const absZ = Math.abs(direction.z);
  
  let newPosition: [number, number, number] = [...movingBlock.position];
  
  if (absX > absY && absX > absZ) {
    // X-axis alignment
    if (direction.x > 0) {
      // Moving block is to the right of target
      newPosition[0] = targetBox.max.x + movingBlock.dimensions.width / 2;
    } else {
      // Moving block is to the left of target
      newPosition[0] = targetBox.min.x - movingBlock.dimensions.width / 2;
    }
  } else if (absY > absX && absY > absZ) {
    // Y-axis alignment
    if (direction.y > 0) {
      // Moving block is above target
      newPosition[1] = targetBox.max.y + movingBlock.dimensions.height / 2;
    } else {
      // Moving block is below target
      newPosition[1] = targetBox.min.y - movingBlock.dimensions.height / 2;
    }
  } else {
    // Z-axis alignment
    if (direction.z > 0) {
      // Moving block is in front of target
      newPosition[2] = targetBox.max.z + movingBlock.dimensions.depth / 2;
    } else {
      // Moving block is behind target
      newPosition[2] = targetBox.min.z - movingBlock.dimensions.depth / 2;
    }
  }
  
  return newPosition;
};

// Constrain movement based on view mode
export const constrainMovement = (
  position: [number, number, number],
  originalPosition: [number, number, number],
  viewMode: '1D' | '2D' | '3D',
  activeDimension: 'x' | 'y' | 'z' = 'x'
): [number, number, number] => {
  if (viewMode === '3D') {
    // Allow movement in all directions
    return position;
  } else if (viewMode === '2D') {
    // Allow movement only in X and Z (horizontal plane)
    return [position[0], originalPosition[1], position[2]];
  } else {
    // 1D mode: only move along the active dimension
    const result: [number, number, number] = [...originalPosition];
    if (activeDimension === 'x') {
      result[0] = position[0];
    } else if (activeDimension === 'y') {
      result[1] = position[1];
    } else {
      result[2] = position[2];
    }
    return result;
  }
};
