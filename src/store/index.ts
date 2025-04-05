
import { configureStore } from '@reduxjs/toolkit';
import plantReducer from './slices/plantSlice';
import areasReducer from './slices/areasSlice';
import bookingsReducer from './slices/bookingsSlice';
import uiReducer from './slices/uiSlice';

// Create the store
const store = configureStore({
  reducer: {
    plant: plantReducer,
    areas: areasReducer,
    bookings: bookingsReducer,
    ui: uiReducer,
  },
});

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
