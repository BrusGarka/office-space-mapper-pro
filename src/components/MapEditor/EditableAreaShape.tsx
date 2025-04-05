
import React, { useState } from 'react';
import { Area } from '@/store/slices/areasSlice';

interface AreaShapeProps {
  area: Area;
  isSelected: boolean;
  isEditable: boolean;
  onClick: () => void;
  onMove: (newPosition: { x: number; y: number }) => void;
  onResize: (newSize: { width: number; height: number }) => void;
}

const EditableAreaShape: React.FC<AreaShapeProps> = ({ 
  area, 
  isSelected, 
  isEditable,
  onClick, 
  onMove, 
  onResize 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [initialWidth, setInitialWidth] = useState(0);
  const [initialHeight, setInitialHeight] = useState(0);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Handle click selection separately
    if (!isDragging && !isResizing) {
      onClick();
    }
    
    if (!isEditable || !isSelected) {
      return;
    }
    
    if (e.button === 0) {
      setDragStart({ x: e.clientX, y: e.clientY });
      setOffsetX(e.clientX - area.position.x);
      setOffsetY(e.clientY - area.position.y);
      setIsDragging(true);
    }
  };
  
  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isEditable) return;
    
    setDragStart({ x: e.clientX, y: e.clientY });
    setInitialWidth(area.size.width);
    setInitialHeight(area.size.height);
    setIsResizing(true);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isDragging) {
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;
      onMove({ x: newX, y: newY });
    } else if (isResizing) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      
      onResize({
        width: Math.max(50, initialWidth + dx),
        height: Math.max(50, initialHeight + dy)
      });
    }
  };
  
  const handleMouseUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(false);
    setIsResizing(false);
  };
  
  React.useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleWindowMouseMove);
      window.addEventListener('mouseup', handleWindowMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);
    };
  }, [isDragging, isResizing]);
  
  const handleWindowMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;
      onMove({ x: newX, y: newY });
    } else if (isResizing) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      
      onResize({
        width: Math.max(50, initialWidth + dx),
        height: Math.max(50, initialHeight + dy)
      });
    }
  };
  
  const handleWindowMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };
  
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
        cursor: isEditable && isDragging ? 'grabbing' : isEditable ? 'grab' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontSize: '14px',
        fontWeight: 'bold',
        color: 'rgba(0,0,0,0.7)',
        textShadow: '0px 0px 2px rgba(255,255,255,0.8)',
        zIndex: isSelected ? 2 : 1
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {area.name}
      
      {isSelected && isEditable && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 bg-black cursor-se-resize"
          style={{
            borderTopLeftRadius: '3px',
            zIndex: 3
          }}
          onMouseDown={handleResizeStart}
        />
      )}
    </div>
  );
};

export default EditableAreaShape;
