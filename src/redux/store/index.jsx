import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import { authApis } from '../services/authService';
import { mainApis } from '../services/mainService';
import slice from '../slices';

const persistConfig = {
  key: 'persistedData',
  storage: AsyncStorage,
};
const persistedAuthReducer = persistReducer(persistConfig, slice);
export const store = configureStore({
  reducer: {
    persistedData: persistedAuthReducer,
    [authApis.reducerPath]: authApis.reducer,
    [mainApis.reducerPath]: mainApis.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    })
      .concat(authApis.middleware)
      .concat(mainApis.middleware),
});
export const persistor = persistStore(store);
