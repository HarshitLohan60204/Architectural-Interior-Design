
import React from 'react';
import BlueprintTools from './sidebar/BlueprintTools';
import ColorPicker from './sidebar/ColorPicker';
import DimensionsControl from './sidebar/DimensionsControl';
import HelpText from './sidebar/HelpText';
import { BlockDimensions, BlockType, ViewMode } from '../types';

interface SidebarProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  activeTool: BlockType | null;
  setActiveTool: (tool: BlockType | null) => void;
  blockDimensions: BlockDimensions;
  setBlockDimensions: (dimensions: BlockDimensions) => void;
  activeDimension: 'x' | 'y' | 'z';
  setActiveDimension: (dimension: 'x' | 'y' | 'z') => void;
  activeColor: string;
  setActiveColor: (color: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  viewMode,
  setViewMode,
  activeTool,
  setActiveTool,
  blockDimensions,
  setBlockDimensions,
  activeDimension,
  setActiveDimension,
  activeColor,
  setActiveColor
}) => {
  return (
    <div className="sidebar">
      <BlueprintTools 
        viewMode={viewMode}
        setViewMode={setViewMode}
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        activeDimension={activeDimension}
        setActiveDimension={setActiveDimension}
      />
      <ColorPicker 
        activeColor={activeColor}
        setActiveColor={setActiveColor}
      />
      <DimensionsControl
        blockDimensions={blockDimensions}
        setBlockDimensions={setBlockDimensions}
      />
      <HelpText />
    </div>
  );
};

export default Sidebar;
