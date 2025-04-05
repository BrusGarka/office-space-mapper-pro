
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UIMode = 'view' | 'edit';
export type Tool = 'select' | 'room' | 'desk' | 'pan' | 'none';

interface UIState {
  mode: UIMode;
  currentTool: Tool;
  isDrawing: boolean;
  isMoving: boolean;
  isResizing: boolean;
  isDragging: boolean;
  showSidebar: boolean;
  zoom: number;
}

const initialState: UIState = {
  mode: 'view',
  currentTool: 'select',
  isDrawing: false,
  isMoving: false,
  isResizing: false,
  isDragging: false,
  showSidebar: true,
  zoom: 1,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<UIMode>) => {
      state.mode = action.payload;
    },
    setCurrentTool: (state, action: PayloadAction<Tool>) => {
      state.currentTool = action.payload;
    },
    setIsDrawing: (state, action: PayloadAction<boolean>) => {
      state.isDrawing = action.payload;
    },
    setIsMoving: (state, action: PayloadAction<boolean>) => {
      state.isMoving = action.payload;
    },
    setIsResizing: (state, action: PayloadAction<boolean>) => {
      state.isResizing = action.payload;
    },
    setIsDragging: (state, action: PayloadAction<boolean>) => {
      state.isDragging = action.payload;
    },
    toggleSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
    setZoom: (state, action: PayloadAction<number>) => {
      state.zoom = action.payload;
    },
  },
});

export const {
  setMode,
  setCurrentTool,
  setIsDrawing,
  setIsMoving,
  setIsResizing,
  setIsDragging,
  toggleSidebar,
  setZoom,
} = uiSlice.actions;

export default uiSlice.reducer;
