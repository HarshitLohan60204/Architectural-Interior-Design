
import React from 'react';
import { BlockDimensions } from '../../types';

interface DimensionsControlProps {
  blockDimensions: BlockDimensions;
  setBlockDimensions: (dimensions: BlockDimensions) => void;
}

const DimensionsControl: React.FC<DimensionsControlProps> = ({ 
  blockDimensions, 
  setBlockDimensions 
}) => {
  const handleDimensionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    dimension: keyof BlockDimensions
  ) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setBlockDimensions({
        ...blockDimensions,
        [dimension]: value
      });
    }
  };

  return (
    <div className="sidebar-section">
      <h3>Dimensions</h3>
      <div className="dimension-control">
        <label htmlFor="width">Width</label>
        <input
          type="number"
          id="width"
          min="0.1"
          step="0.1"
          value={blockDimensions.width}
          onChange={(e) => handleDimensionChange(e, 'width')}
        />
      </div>
      <div className="dimension-control">
        <label htmlFor="height">Height</label>
        <input
          type="number"
          id="height"
          min="0.1"
          step="0.1"
          value={blockDimensions.height}
          onChange={(e) => handleDimensionChange(e, 'height')}
        />
      </div>
      <div className="dimension-control">
        <label htmlFor="depth">Depth</label>
        <input
          type="number"
          id="depth"
          min="0.1"
          step="0.1"
          value={blockDimensions.depth}
          onChange={(e) => handleDimensionChange(e, 'depth')}
        />
      </div>
    </div>
  );
};

export default DimensionsControl;
