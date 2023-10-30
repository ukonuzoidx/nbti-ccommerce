import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import cart from "./Cart";
import compareProduct from "./compareProduct";
import websiteSetup from "./websiteSetup";
import wishlistData from "./wishlistData";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, cart);

export const store = configureStore({
  reducer: {
    websiteSetup: websiteSetup,
    wishlistData: wishlistData,
    cart: persistedReducer,
    compareProducts: compareProduct,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
