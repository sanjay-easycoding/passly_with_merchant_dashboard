import { configureStore } from '@reduxjs/toolkit';
import builderReducer from './builderSlice';
import { builderApi } from '@/services/builderApi';

// Add persistence logic
function saveToLocalStorage(state: RootState) {
  try {
    const serializedState = JSON.stringify(state.builder);
    localStorage.setItem('builderState', serializedState);
  } catch (e) {
    console.warn('Could not save state', e);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('builderState');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn('Could not load state', e);
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();

export const store = configureStore({
  reducer: {
    builder: builderReducer,
    [builderApi.reducerPath]: builderApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(builderApi.middleware),
  preloadedState: { builder: persistedState },
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


