// redux.js (or store.js)
import { configureStore } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use localStorage for persistence

import { combineReducers } from "redux";

const initialState = {
  user: null, // Store user details
  token: null, // Store token
  isAuthenticated: false, // Track login status
  identity:0,
  name:null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.email;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.name=action.payload.name;
      state.identity=action.payload.identity;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});





export const { loginSuccess, logout } = authSlice.actions;

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});




export const persistor = persistStore(store);
export default store;

