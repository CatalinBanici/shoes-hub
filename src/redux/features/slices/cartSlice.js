import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    amount: 0,
    totalAmount: 0,
    totalPrice: 0,
  },
  reducers: {
    addToCart(state, action) {
      state.cart.push({
        id: action.payload.id,
        price: action.payload.price,
        size: action.payload.size,
        amount: action.payload.amount,
        img: action.payload.img,
        name: action.payload.name,
        color: action.payload.color,
      });
      state.totalAmount++;
      state.totalPrice += action.payload.price;
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
