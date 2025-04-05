
import React from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { format } from 'date-fns';

const InfoSidebar: React.FC = () => {
  const selectedAreaId = useAppSelector(state => state.areas.selectedAreaId);
  const areas = useAppSelector(state => state.areas.areas);
  const bookings = useAppSelector(state => state.bookings.bookings);
  
  // Get selected area if any
  const selectedArea = areas.find(area => area.id === selectedAreaId);
  
  // Get bookings for selected area
  const areaBookings = selectedArea 
    ? bookings.filter(booking => booking.areaId === selectedArea.id)
    : [];
  
  // If no area is selected, show empty state
  if (!selectedArea) {
    return (
      <div className="w-80 h-full border-l bg-white p-4">
        <div className="flex items-center justify-center h-full text-center text-gray-400">
          <div>
            <p className="mb-2">Selecione uma área no mapa</p>
            <p className="text-sm">Clique em uma sala ou mesa para ver suas informações</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-80 h-full border-l bg-white p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-2">{selectedArea.name}</h2>
      
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-1">Tipo</div>
        <div className="font-medium">
          {selectedArea.type === 'room' ? 'Sala de Reunião' : 'Mesa de Trabalho'}
        </div>
      </div>
      
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-1">Capacidade</div>
        <div className="font-medium">{selectedArea.capacity} pessoas</div>
      </div>
      
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-1">Tamanho</div>
        <div className="font-medium">{selectedArea.size.width} x {selectedArea.size.height}</div>
      </div>
      
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-1">Posição</div>
        <div className="font-medium">X: {selectedArea.position.x}, Y: {selectedArea.position.y}</div>
      </div>
      
      <h3 className="text-lg font-bold mt-8 mb-4">Reservas</h3>
      
      {areaBookings.length === 0 ? (
        <div className="text-gray-400 text-center py-4">
          Nenhuma reserva para esta área
        </div>
      ) : (
        <div className="space-y-4">
          {areaBookings.map(booking => (
            <div key={booking.id} className="border rounded-md p-3">
              <div className="font-bold">{booking.title}</div>
              <div className="text-sm text-gray-500">{booking.description}</div>
              <div className="text-sm mt-2">
                <span className="text-gray-500">Reservado por: </span>
                {booking.user}
              </div>
              <div className="text-sm mt-1">
                <span className="text-gray-500">Período: </span>
                {format(new Date(booking.startTime), 'dd/MM/yyyy HH:mm')} - 
                {format(new Date(booking.endTime), 'HH:mm')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InfoSidebar;
