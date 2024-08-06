
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducer';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2 // Automatically merges the incoming state and persisted state
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//   getDefaultMiddleware(
//     {
//       serializableCheck: false
//     }

//   ).concat(fetchadminDataMiddleware),
});

// Create persistor
export const persistor = persistStore(store);

export default store; // Export the store as default
