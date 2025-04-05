
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings, Save, Map, LogOut, Home } from 'lucide-react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const NavBar: React.FC = () => {
  const location = useLocation();
  const plantName = useAppSelector((state) => state.plant.name);
  const isEditorPage = location.pathname === '/editor';
  const isMapPage = location.pathname === '/map';
  
  const handleSave = () => {
    // Save data to localStorage
    const state = {
      plant: localStorage.getItem('plant'),
      areas: localStorage.getItem('areas'),
      bookings: localStorage.getItem('bookings')
    };
    
    localStorage.setItem('office-space-mapper-data', JSON.stringify(state));
    
    toast({
      title: "Sucesso!",
      description: "Configurações do mapa salvas com sucesso.",
    });
  };
  
  return (
    <nav className="bg-white border-b shadow-sm py-4 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-purple-700">
          {isEditorPage ? 'Editor de Mapa' : isMapPage ? 'Mapa Interativo' : 'Office Space Mapper'}
        </h1>
        <span className="text-sm text-gray-500">{plantName}</span>
      </div>
      
      <div className="flex items-center space-x-3">
        {isEditorPage && (
          <>
            <Button variant="outline" onClick={handleSave} className="flex items-center space-x-2">
              <Save size={16} />
              <span>Salvar</span>
            </Button>
            
            <Link to="/map">
              <Button variant="outline" className="flex items-center space-x-2">
                <Map size={16} />
                <span>Mapa</span>
              </Button>
            </Link>
            
            <Link to="/">
              <Button variant="outline" className="flex items-center">
                <LogOut size={16} />
              </Button>
            </Link>
          </>
        )}
        
        {isMapPage && (
          <>
            <Link to="/editor">
              <Button variant="outline" className="flex items-center space-x-2">
                <Settings size={16} />
                <span>Editor</span>
              </Button>
            </Link>
            
            <Link to="/">
              <Button variant="outline" className="flex items-center">
                <LogOut size={16} />
              </Button>
            </Link>
          </>
        )}
        
        {!isEditorPage && !isMapPage && (
          // For any other page (like homepage)
          <Link to="/map">
            <Button variant="outline" className="flex items-center space-x-2">
              <Map size={16} />
              <span>Mapa</span>
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
