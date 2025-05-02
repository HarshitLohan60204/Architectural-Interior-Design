
import React from 'react';
import BlueprintTools from './sidebar/BlueprintTools';
import ColorPicker from './sidebar/ColorPicker';
import DimensionsControl from './sidebar/DimensionsControl';
import HelpText from './sidebar/HelpText';

const Sidebar = ({
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
