import {
  AnyAction,
  Middleware,
  configureStore,
  ThunkDispatch,
  Store,
} from '@reduxjs/toolkit';
import {appReducers} from './reducer.redux';
import logger from 'redux-logger';
import {
  persistStore,
  FLUSH,
  PERSIST,
  REGISTER,
  PAUSE,
  PURGE,
  REHYDRATE,
  persistReducer,
} from 'redux-persist';
import {reduxStorage} from './persist.redux';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import thunkMiddleware from 'redux-thunk';

const middleware: Middleware[] = [thunkMiddleware];
if (__DEV__) {
  middleware.push(logger);
}

export const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  stateReconciler: autoMergeLevel2,
  debug: __DEV__,
};

const persistedReducer = persistReducer<ReturnType<typeof appReducers>>(
  persistConfig,
  appReducers,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }).concat(middleware),
});

export const persistor = persistStore(store);
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export type AppStore = Omit<Store<RootState, AnyAction>, 'dispatch'> & {
  dispatch: AppThunkDispatch;
};
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
