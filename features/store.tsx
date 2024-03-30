import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import { setupListeners } from "@reduxjs/toolkit/query";
import { orderSlice } from "./ApiSlice/orderSlice";
import { ingredientSlice } from "./ApiSlice/ingredientSlice";
import { candyTypeSlice } from "./ApiSlice/candyTypeSlice";
import { assemblyLineSlice } from "./ApiSlice/assemblyLineSlice";
import { addSettingsSlice } from "./ApiSlice/addSettings";
import storage from "redux-persist/lib/storage"
import {persistReducer, persistStore} from "redux-persist"

const persistConfig = {
  key : 'root',
  storage,
  blacklist : [''],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      // logger,
      orderSlice.middleware,
      ingredientSlice.middleware,
      candyTypeSlice.middleware,
      assemblyLineSlice.middleware,
      addSettingsSlice.middleware,
      
    ]),
});

export const persistor = persistStore(store)

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>