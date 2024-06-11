
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';


const rootReducer = combineReducers({
  auth: authReducer,
});


const loadState = () => {
  try {
    const serializedState = localStorage.getItem('appState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState); 
  } catch (err) {
    return undefined; 
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('appState', serializedState); 
  } catch (err) {
  }
};

const preloadedState = loadState();


const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export { store };
