import { configureStore } from '@reduxjs/toolkit';

import { builderApi } from '@/services/builderApi';

import builderReducer from './builderSlice';

// Add persistence logic
function saveToLocalStorage(state: RootState) {
  try {
    // Only save to localStorage on the client side
    if (typeof window !== 'undefined') {
      console.log('Saving to localStorage:', state.builder);
      const serializedState = JSON.stringify(state.builder);
      localStorage.setItem('builderState', serializedState);
      console.log('Saved to localStorage successfully');
    }
  } catch (e) {
    console.warn('Could not save state', e);
  }
}

function loadFromLocalStorage() {
  try {
    // Only access localStorage on the client side
    if (typeof window !== 'undefined') {
      const serializedState = localStorage.getItem('builderState');
      console.log('Loading from localStorage:', serializedState);
      if (serializedState === null) {
        console.log('No data in localStorage, using default state');
        return undefined;
      }
      const parsed = JSON.parse(serializedState);
      console.log('Parsed localStorage data:', parsed);
      return parsed;
    }
    return undefined;
  } catch (e) {
    console.warn('Could not load state', e);
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();
console.log('Initial persisted state:', persistedState);

export const store = configureStore({
  reducer: {
    builder: builderReducer,
    [builderApi.reducerPath]: builderApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(builderApi.middleware),
  preloadedState: { builder: persistedState },
});

store.subscribe(() => {
  console.log('Store state changed, saving to localStorage');
  saveToLocalStorage(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


