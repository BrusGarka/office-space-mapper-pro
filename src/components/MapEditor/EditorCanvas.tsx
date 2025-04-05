
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
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState({ x: 0, y: 0 });
  
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
      
      // Calculate start position in the map coordinates
      const x = (e.clientX - rect.left - plant.position.x) / plant.scale;
      const y = (e.clientY - rect.top - plant.position.y) / plant.scale;
      
      setIsDrawing(true);
      setDrawStart({ x, y });
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      dispatch(setPlantPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      }));
      return;
    }
    
    if (isDrawing) {
      // This is just for visual feedback - actual area creation happens on mouseup
    }
  };
  
  const handleMouseUp = (e: React.MouseEvent) => {
    if (isDragging) {
      setIsDragging(false);
      return;
    }
    
    if (isDrawing && (currentTool === 'room' || currentTool === 'desk')) {
      // Get canvas coordinates
      const rect = mapViewportRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      // Calculate end position in the map coordinates
      const endX = (e.clientX - rect.left - plant.position.x) / plant.scale;
      const endY = (e.clientY - rect.top - plant.position.y) / plant.scale;
      
      // Calculate width and height
      const width = Math.abs(endX - drawStart.x);
      const height = Math.abs(endY - drawStart.y);
      
      // Only create area if it has some size
      if (width > 5 && height > 5) {
        const newArea: Area = {
          id: generateId('area-'),
          type: currentTool === 'room' ? 'room' : 'desk',
          name: currentTool === 'room' ? 'Nova Sala' : 'Nova Mesa',
          capacity: currentTool === 'room' ? 8 : 1,
          position: {
            x: Math.min(drawStart.x, endX),
            y: Math.min(drawStart.y, endY)
          },
          size: { width, height },
          color: currentTool === 'room' 
            ? 'rgba(0, 128, 255, 0.4)' 
            : 'rgba(0, 200, 100, 0.4)'
        };
        
        dispatch(addArea(newArea));
        dispatch(setSelectedAreaId(newArea.id));
      }
      
      setIsDrawing(false);
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
    // Toggle selection
    if (selectedAreaId === areaId && currentTool === 'select') {
      dispatch(setSelectedAreaId(null));
    } else if (currentTool === 'select') {
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
      
      {/* Drawing indicator */}
      {isDrawing && (
        <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-md z-10">
          Desenhando...
        </div>
      )}
      
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
          setIsDrawing(false);
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
        
        {/* Drawing preview */}
        {isDrawing && (
          <div
            className="absolute border-2 border-dashed border-purple-600 bg-purple-200 bg-opacity-30"
            style={{
              left: drawStart.x,
              top: drawStart.y,
              width: '0',
              height: '0'
            }}
          />
        )}
      </div>
    </div>
  );
};

export default EditorCanvas;
