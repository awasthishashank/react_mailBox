// src/redux/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import mailReducer from './mailReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  mail: mailReducer,
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
    // Handle write errors if necessary
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
