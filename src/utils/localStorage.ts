
import { RootState } from '../store';

export const saveToLocalStorage = (state: RootState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('office-space-mapper-data', serializedState);
  } catch (e) {
    console.error('Could not save state to localStorage', e);
  }
};

export const loadFromLocalStorage = (): RootState | undefined => {
  try {
    const serializedState = localStorage.getItem('office-space-mapper-data');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error('Could not load state from localStorage', e);
    return undefined;
  }
};
