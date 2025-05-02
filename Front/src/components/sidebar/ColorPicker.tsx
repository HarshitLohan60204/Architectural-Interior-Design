
import React from 'react';
import { toast } from '@/components/ui/sonner';

interface ColorPickerProps {
  activeColor: string;
  setActiveColor: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ activeColor, setActiveColor }) => {
  const COLORS = [
    '#9b87f5', // Primary Purple
    '#7E69AB', // Secondary Purple
    '#FEC6A1', // Soft Orange
    '#F97316', // Bright Orange
    '#33C3F0', // Sky Blue
    '#0EA5E9', // Ocean Blue
    '#D946EF', // Magenta Pink
    '#8E9196', // Neutral Gray
  ];

  const handleColorChange = (color: string) => {
    setActiveColor(color);
    toast("Color updated", {
      description: `Selected color: ${color}`,
    });
  };

  return (
    <div className="sidebar-section">
      <h3>Block Color</h3>
      <div className="color-picker">
        {COLORS.map(color => (
          <button
            key={color}
            className={`color-swatch ${activeColor === color ? 'active' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorChange(color)}
            title={color}
          />
        ))}
      </div>
      <div className="color-input-container">
        <input
          type="color"
          value={activeColor}
          onChange={(e) => handleColorChange(e.target.value)}
          className="color-input"
        />
        <span>Custom color</span>
      </div>
    </div>
  );
};

export default ColorPicker;
