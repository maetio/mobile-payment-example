import { combineReducers, configureStore, createReducer } from '@reduxjs/toolkit';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './user-slice';
import cartReducer from './cart-slice';
import { productsApi } from 'src/services/products-queries';
import { firebaseAuthApi } from 'src/services/auth-queries';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
};

const reducers = combineReducers({
    user: userReducer,
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [firebaseAuthApi.reducerPath]: firebaseAuthApi.reducer,
});

const persistedReducers = persistReducer(persistConfig, reducers);

/*
  Usage with redux persist: https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
  Helpful tutorial: https://edvins.io/how-to-use-redux-persist-with-redux-toolkit 
*/

export const store = configureStore({
    reducer: persistedReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
            .concat(productsApi.middleware)
            .concat(firebaseAuthApi.middleware),
    // add concat here when I finish services/productsApi
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);
