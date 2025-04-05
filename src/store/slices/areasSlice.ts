
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Area {
  id: string;
  type: 'room' | 'desk';
  name: string;
  capacity: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  color: string;
}

interface AreasState {
  areas: Area[];
  selectedAreaId: string | null;
}

const initialState: AreasState = {
  areas: [],
  selectedAreaId: null,
};

export const areasSlice = createSlice({
  name: 'areas',
  initialState,
  reducers: {
    addArea: (state, action: PayloadAction<Area>) => {
      state.areas.push(action.payload);
    },
    updateArea: (state, action: PayloadAction<Area>) => {
      const index = state.areas.findIndex((area) => area.id === action.payload.id);
      if (index !== -1) {
        state.areas[index] = action.payload;
      }
    },
    removeArea: (state, action: PayloadAction<string>) => {
      state.areas = state.areas.filter((area) => area.id !== action.payload);
    },
    setSelectedAreaId: (state, action: PayloadAction<string | null>) => {
      state.selectedAreaId = action.payload;
    },
    updateAreaPosition: (
      state,
      action: PayloadAction<{ id: string; position: { x: number; y: number } }>
    ) => {
      const { id, position } = action.payload;
      const area = state.areas.find((a) => a.id === id);
      if (area) {
        area.position = position;
      }
    },
    updateAreaSize: (
      state,
      action: PayloadAction<{ id: string; size: { width: number; height: number } }>
    ) => {
      const { id, size } = action.payload;
      const area = state.areas.find((a) => a.id === id);
      if (area) {
        area.size = size;
      }
    },
  },
});

export const {
  addArea,
  updateArea,
  removeArea,
  setSelectedAreaId,
  updateAreaPosition,
  updateAreaSize,
} = areasSlice.actions;

export default areasSlice.reducer;
