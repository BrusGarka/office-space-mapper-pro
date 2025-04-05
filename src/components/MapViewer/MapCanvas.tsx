
import React, { useRef, useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setSelectedAreaId } from '@/store/slices/areasSlice';
import { setPlantPosition, setPlantScale } from '@/store/slices/plantSlice';
import AreaShape from './AreaShape';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MapCanvas: React.FC = () => {
  const dispatch = useAppDispatch();
  const plant = useAppSelector((state) => state.plant);
  const areas = useAppSelector((state) => state.areas.areas);
  const selectedAreaId = useAppSelector((state) => state.areas.selectedAreaId);
  const bookings = useAppSelector((state) => state.bookings.bookings);
  
  const mapViewportRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Handle map panning
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only start dragging if middle button or spacebar + left button
    if (e.button === 1 || e.button === 0) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - plant.position.x,
        y: e.clientY - plant.position.y
      });
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
    setIsDragging(false);
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
    if (selectedAreaId === areaId) {
      dispatch(setSelectedAreaId(null));
    } else {
      dispatch(setSelectedAreaId(areaId));
    }
  };
  
  // Handle background click to deselect
  const handleBackgroundClick = () => {
    dispatch(setSelectedAreaId(null));
  };
  
  // Check if area is reserved
  const isAreaReserved = (areaId: string) => {
    return bookings.some(booking => booking.areaId === areaId);
  };
  
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const scaleFactor = e.deltaY > 0 ? 0.9 : 1.1;
      const newScale = Math.max(0.2, Math.min(3, plant.scale * scaleFactor));
      dispatch(setPlantScale(newScale));
    };
    
    const mapViewport = mapViewportRef.current;
    if (mapViewport) {
      mapViewport.addEventListener('wheel', handleWheel, { passive: false });
    }
    
    return () => {
      if (mapViewport) {
        mapViewport.removeEventListener('wheel', handleWheel);
      }
    };
  }, [dispatch, plant.scale]);
  
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
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
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
        
        {/* Area shapes */}
        {areas.map((area) => {
          const reserved = isAreaReserved(area.id);
          const areaColor = reserved ? 'rgba(239, 68, 68, 0.4)' : 'rgba(34, 197, 94, 0.4)';
          
          return (
            <AreaShape
              key={area.id}
              area={{...area, color: areaColor}}
              isSelected={area.id === selectedAreaId}
              onClick={() => handleAreaClick(area.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MapCanvas;
