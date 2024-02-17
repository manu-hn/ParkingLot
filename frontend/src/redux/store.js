import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.js";
import ticketReducer from "./slices/ticketSlice.js";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ user: userReducer, ticket: ticketReducer });

const persistConfig = {
    key: "root",
    storage,
    version: 1,
}

const persistedReducers = persistReducer(persistConfig, rootReducer);

export const userStore = configureStore({
    reducer: persistedReducers,
    middleware: (buildGetDefaultMiddleware) => buildGetDefaultMiddleware({ serializableCheck: false })
});

export const persistor = persistStore(userStore);