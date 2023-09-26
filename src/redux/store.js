import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/slices/productsSlice";
import cartReducer from "./features/slices/cartSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});
