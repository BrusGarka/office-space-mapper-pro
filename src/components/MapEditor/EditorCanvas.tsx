
import React, { useRef, useState } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { Area, addArea, setSelectedAreaId, updateAreaPosition, updateAreaSize } from '@/store/slices/areasSlice';
import { setPlantPosition, setPlantScale } from '@/store/slices/plantSlice';
import { Tool } from '@/store/slices/uiSlice';
import { generateId } from '@/utils/uuid';
import AreaShape from './EditableAreaShape';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EditorCanvasProps {
  currentTool: Tool;
}

const EditorCanvas: React.FC<EditorCanvasProps> = ({ currentTool }) => {
  const dispatch = useAppDispatch();
  const plant = useAppSelector((state) => state.plant);
  const areas = useAppSelector((state) => state.areas.areas);
  const selectedAreaId = useAppSelector((state) => state.areas.selectedAreaId);
  
  const mapViewportRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Constants for predefined shapes
  const DESK_SIZE = { width: 40, height: 40 }; // Circle for desk
  const ROOM_SIZE = { width: 120, height: 120 }; // Square for room (3x larger than desk)
  const DESK_COLOR = 'rgba(168, 85, 247, 0.4)'; // Purple translucent for desk
  const ROOM_COLOR = 'rgba(168, 85, 247, 0.4)'; // Purple translucent for room
  
  // Handle map panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (currentTool === 'pan' || e.button === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - plant.position.x,
        y: e.clientY - plant.position.y
      });
      return;
    }
    
    if ((currentTool === 'room' || currentTool === 'desk') && e.button === 0) {
      // Get canvas coordinates
      const rect = mapViewportRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      // Calculate position in the map coordinates
      const x = (e.clientX - rect.left - plant.position.x) / plant.scale;
      const y = (e.clientY - rect.top - plant.position.y) / plant.scale;
      
      // Create area with predefined size based on type
      const isRoom = currentTool === 'room';
      const size = isRoom ? ROOM_SIZE : DESK_SIZE;
      const color = isRoom ? ROOM_COLOR : DESK_COLOR;
      const capacity = isRoom ? 8 : 1;
      
      const newArea: Area = {
        id: generateId('area-'),
        type: isRoom ? 'room' : 'desk',
        name: isRoom ? 'Nova Sala' : 'Nova Mesa',
        capacity,
        position: {
          x: x - size.width / 2,  // Center the shape where the user clicked
          y: y - size.height / 2
        },
        size,
        color
      };
      
      dispatch(addArea(newArea));
      dispatch(setSelectedAreaId(newArea.id));
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      dispatch(setPlantPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      }));
    }
  };
  
  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };
  
  // Handle zoom operations
  const handleZoomIn = () => {
    dispatch(setPlantScale(Math.min(plant.scale * 1.2, 3)));
  };
  
  const handleZoomOut = () => {
    dispatch(setPlantScale(Math.max(plant.scale * 0.8, 0.2)));
  };
  
  // Handle area selection
  const handleAreaClick = (areaId: string) => {
    if (currentTool === 'select') {
      dispatch(setSelectedAreaId(areaId));
    }
  };
  
  // Handle background click to deselect
  const handleBackgroundClick = () => {
    if (currentTool === 'select') {
      dispatch(setSelectedAreaId(null));
    }
  };
  
  // Handle area movement
  const handleAreaMove = (id: string, newPosition: { x: number; y: number }) => {
    dispatch(updateAreaPosition({ id, position: newPosition }));
  };
  
  // Handle area resize
  const handleAreaResize = (id: string, newSize: { width: number; height: number }) => {
    dispatch(updateAreaSize({ id, size: newSize }));
  };
  
  return (
    <div className="map-container w-full h-full relative overflow-hidden bg-gray-50">
      {/* Zoom controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
        <Button variant="secondary" size="icon" onClick={handleZoomIn}>
          <ZoomIn size={20} />
        </Button>
        <Button variant="secondary" size="icon" onClick={handleZoomOut}>
          <ZoomOut size={20} />
        </Button>
      </div>
      
      {/* Map viewport with transform */}
      <div
        ref={mapViewportRef}
        className="map-viewport"
        style={{
          transform: `translate(${plant.position.x}px, ${plant.position.y}px) scale(${plant.scale})`,
          transformOrigin: '0 0',
          cursor: isDragging 
            ? 'grabbing' 
            : currentTool === 'pan' 
              ? 'grab' 
              : currentTool === 'select' 
                ? 'default' 
                : 'crosshair'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          setIsDragging(false);
        }}
        onClick={handleBackgroundClick}
      >
        {/* Background floorplan image */}
        {plant.imageUrl && (
          <img
            src={plant.imageUrl}
            alt="Planta do escritório"
            style={{
              width: plant.width,
              height: plant.height,
              pointerEvents: 'none',
              userSelect: 'none'
            }}
            draggable={false}
          />
        )}
        
        {/* Area shapes - only using editable shapes in editor mode */}
        {areas.map((area) => (
          <AreaShape
            key={area.id}
            area={area}
            isSelected={area.id === selectedAreaId}
            onClick={() => handleAreaClick(area.id)}
            onMove={(newPosition) => handleAreaMove(area.id, newPosition)}
            onResize={(newSize) => handleAreaResize(area.id, newSize)}
            isEditable={currentTool === 'select'}
          />
        ))}
      </div>
    </div>
  );
};

export default EditorCanvas;
