import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { coopSlice } from "./coopSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    coop: coopSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
