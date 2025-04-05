
import React, { useEffect } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { saveToLocalStorage, loadFromLocalStorage } from '@/utils/localStorage';
import NavBar from '@/components/common/NavBar';
import MapCanvas from '@/components/MapViewer/MapCanvas';
import InfoSidebar from '@/components/MapViewer/InfoSidebar';

const MapPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state);
  
  useEffect(() => {
    // Load data from localStorage on initial render
    const savedState = loadFromLocalStorage();
    if (savedState) {
      // You would normally dispatch actions to restore the state
      // This is more complex and would require multiple actions
      // For now, we'll just log that we found saved data
      console.log('Loaded saved data from localStorage', savedState);
    }
  }, [dispatch]);
  
  // Save to localStorage whenever state changes
  useEffect(() => {
    saveToLocalStorage(state);
  }, [state]);
  
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1">
          <MapCanvas />
        </div>
        <InfoSidebar />
      </div>
    </div>
  );
};

export default MapPage;
