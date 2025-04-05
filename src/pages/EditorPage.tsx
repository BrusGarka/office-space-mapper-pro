
import React from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setCurrentTool } from '@/store/slices/uiSlice';
import NavBar from '@/components/common/NavBar';
import EditorCanvas from '@/components/MapEditor/EditorCanvas';
import EditorSidebar from '@/components/MapEditor/EditorSidebar';
import ImageUploader from '@/components/MapEditor/ImageUploader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const EditorPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTool = useAppSelector(state => state.ui.currentTool);
  
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1">
          <EditorCanvas currentTool={currentTool} />
        </div>
        <div className="w-80 border-l bg-white">
          <Tabs defaultValue="tools" className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="tools">Ferramentas</TabsTrigger>
              <TabsTrigger value="config">Configuração</TabsTrigger>
            </TabsList>
            <TabsContent value="tools" className="p-4">
              <EditorSidebar />
            </TabsContent>
            <TabsContent value="config" className="p-4">
              <ImageUploader />
              
              {/* Additional config options could go here */}
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-4">Exportar/Importar</h3>
                <div className="space-y-3">
                  <button
                    className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded"
                    onClick={() => {
                      const dataStr = localStorage.getItem('office-space-mapper-data');
                      if (dataStr) {
                        const blob = new Blob([dataStr], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'office-map.json';
                        a.click();
                      }
                    }}
                  >
                    Exportar Dados (JSON)
                  </button>
                  
                  <button
                    className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded"
                    onClick={() => {
                      alert('Funcionalidade de importação será implementada em breve!');
                    }}
                  >
                    Importar Dados (JSON)
                  </button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
