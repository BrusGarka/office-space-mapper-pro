
import React, { useState, useRef } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { setPlantImage, setPlantName, setPlantSize } from '@/store/slices/plantSlice';
import { fileToBase64, loadImage } from '@/utils/fileUtils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ImageUploader: React.FC = () => {
  const dispatch = useAppDispatch();
  const plant = useAppSelector(state => state.plant);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsLoading(true);
    
    try {
      // Convert file to base64
      const base64Image = await fileToBase64(file);
      
      // Load image to get dimensions
      const img = await loadImage(base64Image);
      
      // Update plant state
      dispatch(setPlantImage(base64Image));
      dispatch(setPlantSize({
        width: img.width,
        height: img.height
      }));
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPlantName(e.target.value));
  };
  
  return (
    <div className="border-b pb-4 mb-6">
      <h3 className="text-lg font-bold mb-4">Configurar Planta</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="plant-name">Nome do Escritório</Label>
          <Input
            id="plant-name"
            value={plant.name}
            onChange={handleNameChange}
          />
        </div>
        
        <div>
          <Label htmlFor="plant-image" className="mb-2 block">Planta do Escritório</Label>
          
          <div className="flex items-center space-x-2">
            <Input
              id="plant-image"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              ref={fileInputRef}
              disabled={isLoading}
            />
          </div>
          
          {isLoading && (
            <div className="mt-2 text-sm text-gray-500">Carregando imagem...</div>
          )}
          
          {plant.imageUrl && (
            <div className="mt-4 relative border inline-block max-w-full">
              <img
                src={plant.imageUrl}
                alt="Planta carregada"
                className="max-w-full max-h-40 object-contain"
              />
              <div className="absolute bottom-0 right-0 bg-black bg-opacity-60 text-white text-xs px-2 py-1">
                {plant.width} x {plant.height}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
