
import { RootState } from '../store';

// Keys for localStorage
const STORAGE_KEY = 'office-space-mapper-data';

// Save state to localStorage
export const saveToLocalStorage = (state: RootState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (error) {
    console.error('Could not save state to localStorage:', error);
  }
};

// Load state from localStorage
export const loadFromLocalStorage = (): Partial<RootState> | undefined => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Could not load state from localStorage:', error);
    return undefined;
  }
};

// Clear state from localStorage
export const clearLocalStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Could not clear localStorage:', error);
  }
};
