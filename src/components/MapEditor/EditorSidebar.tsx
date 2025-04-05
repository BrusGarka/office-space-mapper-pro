
import React from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { Area, removeArea, updateArea } from '@/store/slices/areasSlice';
import { setCurrentTool } from '@/store/slices/uiSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash, MapPin, Edit } from 'lucide-react';

const EditorSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedAreaId = useAppSelector(state => state.areas.selectedAreaId);
  const areas = useAppSelector(state => state.areas.areas);
  const currentTool = useAppSelector(state => state.ui.currentTool);
  
  // Get selected area if any
  const selectedArea = areas.find(area => area.id === selectedAreaId);
  
  // Handle tool selection
  const handleToolSelect = (tool: string) => {
    dispatch(setCurrentTool(tool as any));
  };
  
  // Handle area name change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedArea) return;
    
    dispatch(updateArea({
      ...selectedArea,
      name: e.target.value
    }));
  };
  
  // Handle area capacity change
  const handleCapacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedArea) return;
    
    const capacity = parseInt(e.target.value, 10) || 1;
    dispatch(updateArea({
      ...selectedArea,
      capacity
    }));
  };
  
  // Handle area type change
  const handleTypeChange = (value: string) => {
    if (!selectedArea) return;
    
    dispatch(updateArea({
      ...selectedArea,
      type: value as Area['type']
    }));
  };
  
  // Handle area color change
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedArea) return;
    
    dispatch(updateArea({
      ...selectedArea,
      color: e.target.value
    }));
  };
  
  // Handle area deletion
  const handleDeleteArea = () => {
    if (!selectedArea) return;
    
    dispatch(removeArea(selectedArea.id));
  };
  
  return (
    <div className="w-80 h-full border-l bg-white p-4">
      <h2 className="text-xl font-bold mb-6">Ferramentas</h2>
      
      <div className="grid grid-cols-2 gap-2 mb-8">
        <Button 
          variant={currentTool === 'select' ? 'default' : 'outline'}
          onClick={() => handleToolSelect('select')}
        >
          Selecionar
        </Button>
        <Button 
          variant={currentTool === 'pan' ? 'default' : 'outline'}
          onClick={() => handleToolSelect('pan')}
        >
          Mover Mapa
        </Button>
        <Button 
          variant={currentTool === 'room' ? 'default' : 'outline'}
          onClick={() => handleToolSelect('room')}
          className="flex items-center space-x-2"
        >
          <MapPin size={16} />
          <span>Nova Sala</span>
        </Button>
        <Button 
          variant={currentTool === 'desk' ? 'default' : 'outline'}
          onClick={() => handleToolSelect('desk')}
          className="flex items-center space-x-2"
        >
          <Edit size={16} />
          <span>Nova Mesa</span>
        </Button>
      </div>
      
      {selectedArea ? (
        <div>
          <h3 className="text-lg font-bold mb-4">Propriedades da Área</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={selectedArea.name}
                onChange={handleNameChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select 
                value={selectedArea.type} 
                onValueChange={handleTypeChange}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="room">Sala de Reunião</SelectItem>
                  <SelectItem value="desk">Mesa de Trabalho</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacidade</Label>
              <Input
                id="capacity"
                type="number"
                min="1"
                value={selectedArea.capacity}
                onChange={handleCapacityChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="color">Cor</Label>
              <div className="flex space-x-2">
                <div 
                  className="w-10 h-10 rounded" 
                  style={{ backgroundColor: selectedArea.color }} 
                />
                <Input
                  id="color"
                  type="text"
                  value={selectedArea.color}
                  onChange={handleColorChange}
                  className="flex-grow"
                />
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                variant="destructive" 
                onClick={handleDeleteArea}
                className="w-full flex items-center justify-center space-x-2"
              >
                <Trash size={16} />
                <span>Excluir Área</span>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-400 mt-12">
          <p className="mb-2">Selecione uma área no mapa</p>
          <p className="text-sm">ou use as ferramentas para criar uma nova</p>
        </div>
      )}
    </div>
  );
};

export default EditorSidebar;
