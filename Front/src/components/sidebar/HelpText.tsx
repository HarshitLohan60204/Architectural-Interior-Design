
import React from 'react';

const HelpText: React.FC = () => {
  return (
    <div className="sidebar-section">
      <small>
        Click to add shapes to the scene.<br />
        Drag to move objects.<br />
        Objects snap together when close.<br />
        Right-click to delete.<br />
        Ctrl+Z to undo, Ctrl+Y to redo.<br />
        Download button exports your model.
      </small>
    </div>
  );
};

export default HelpText;
