
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PlantState {
  id: string;
  name: string;
  imageUrl: string | null;
  width: number;
  height: number;
  position: { x: number; y: number };
  scale: number;
}

const initialState: PlantState = {
  id: 'plant-001',
  name: 'Escritório Principal',
  imageUrl: null,
  width: 1200,
  height: 800,
  position: { x: 0, y: 0 },
  scale: 1,
};

export const plantSlice = createSlice({
  name: 'plant',
  initialState,
  reducers: {
    setPlantImage: (state, action: PayloadAction<string>) => {
      state.imageUrl = action.payload;
    },
    setPlantSize: (state, action: PayloadAction<{ width: number; height: number }>) => {
      state.width = action.payload.width;
      state.height = action.payload.height;
    },
    setPlantPosition: (state, action: PayloadAction<{ x: number; y: number }>) => {
      state.position = action.payload;
    },
    setPlantScale: (state, action: PayloadAction<number>) => {
      state.scale = action.payload;
    },
    setPlantName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    resetPlant: (state) => {
      return initialState;
    },
  },
});

export const {
  setPlantImage,
  setPlantSize,
  setPlantPosition,
  setPlantScale,
  setPlantName,
  resetPlant,
} = plantSlice.actions;

export default plantSlice.reducer;
