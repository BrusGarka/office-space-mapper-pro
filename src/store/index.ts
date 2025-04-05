
import { configureStore } from '@reduxjs/toolkit';
import plantReducer from './slices/plantSlice';
import areasReducer from './slices/areasSlice';
import bookingsReducer from './slices/bookingsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    plant: plantReducer,
    areas: areasReducer,
    bookings: bookingsReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
