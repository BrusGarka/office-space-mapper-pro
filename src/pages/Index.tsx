
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  const plantName = useAppSelector(state => state.plant.name);
  const hasFloorplan = useAppSelector(state => !!state.plant.imageUrl);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        <div className="flex flex-col md:flex-row items-center mb-12">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="relative w-full max-w-md mx-auto">
              <div className="bg-purple-600 rounded-3xl overflow-hidden shadow-xl transform -rotate-6">
                <div className="p-6 bg-purple-100 bg-opacity-20">
                  <div className="grid grid-cols-6 gap-2">
                    {[...Array(24)].map((_, i) => (
                      <div 
                        key={i} 
                        className="h-6 rounded-md" 
                        style={{ 
                          backgroundColor: i % 3 === 0 
                            ? 'rgba(255,255,255,0.7)' 
                            : 'rgba(255,255,255,0.3)' 
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-yellow-300 rounded-full p-3 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 md:pl-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              Mapa interativo
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Crie um mapa de segurança para seus colaboradores,
              permita o trabalho presencial com o distanciamento social.
            </p>
            
            {hasFloorplan ? (
              <div className="space-y-4">
                <Link to="/map">
                  <Button size="lg" className="w-full md:w-auto text-lg">
                    Visualizar Mapa
                  </Button>
                </Link>
                <Link to="/editor">
                  <Button variant="outline" size="lg" className="w-full md:w-auto text-lg">
                    Editar Configurações
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <Link to="/editor">
                  <Button size="lg" className="w-full md:w-auto text-lg">
                    Quero mapear meu escritório
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="bg-blue-100 text-blue-700 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Desenho Personalizado</h3>
            <p className="text-gray-600">
              Crie mapas personalizados do seu escritório com salas e mesas de trabalho.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="bg-purple-100 text-purple-700 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Reservas Simples</h3>
            <p className="text-gray-600">
              Gerencie reservas de salas e mesas para garantir o distanciamento adequado.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="bg-green-100 text-green-700 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Visualização Intuitiva</h3>
            <p className="text-gray-600">
              Interface interativa que permite visualizar o status das áreas com facilidade.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
