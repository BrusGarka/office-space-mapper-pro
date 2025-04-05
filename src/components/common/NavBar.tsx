
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Button } from '@/components/ui/button';

const NavBar: React.FC = () => {
  const location = useLocation();
  const plantName = useAppSelector((state) => state.plant.name);
  
  return (
    <nav className="bg-white border-b shadow-sm py-4 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-purple-700">
          {location.pathname === '/editor' ? 'Editor de Mapa' : 'Mapa Interativo'}
        </h1>
        <span className="text-sm text-gray-500">{plantName}</span>
      </div>
      
      <div>
        {location.pathname === '/' ? (
          <Link to="/editor">
            <Button variant="outline" className="flex items-center space-x-2">
              <Settings size={16} />
              <span>Editor</span>
            </Button>
          </Link>
        ) : (
          <Link to="/">
            <Button variant="outline">Voltar ao Mapa</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
