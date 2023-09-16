import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/slices/productsSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});
