import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from './reducers/auth';
import global from './reducers/global';
import coops from './reducers/coops';
import circles from './reducers/circles';
import myCircles from './reducers/myCircles';
import trackList from './reducers/trackList';

import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['auth', 'config'],
};

const rootReducer = combineReducers({
  auth,
  global,
  coops,
  circles,
  myCircles,
  trackList,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useCustomDispatch = () => useDispatch<AppDispatch>();

export const useCustomSelector: TypedUseSelectorHook<RootState> = useSelector;
