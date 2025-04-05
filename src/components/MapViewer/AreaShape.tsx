
import React from 'react';
import { Area } from '@/store/slices/areasSlice';

interface AreaShapeProps {
  area: Area;
  isSelected: boolean;
  onClick: () => void;
}

const AreaShape: React.FC<AreaShapeProps> = ({ area, isSelected, onClick }) => {
  return (
    <div
      className={`shape absolute ${isSelected ? 'selected' : ''}`}
      style={{
        left: area.position.x,
        top: area.position.y,
        width: area.size.width,
        height: area.size.height,
        backgroundColor: area.color,
        borderRadius: '4px',
        position: 'absolute',
        boxSizing: 'border-box',
        border: isSelected ? '2px solid #000' : '1px solid rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontSize: '14px',
        fontWeight: 'bold',
        color: 'rgba(0,0,0,0.7)',
        textShadow: '0px 0px 2px rgba(255,255,255,0.8)',
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {area.name}
    </div>
  );
};

export default AreaShape;
