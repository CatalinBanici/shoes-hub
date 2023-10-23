import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totalProductsAmount: 0,
    totalProductsPrice: 0,
  },
  reducers: {
    addToCart(state, action) {
      const productAlreadyExists = state.cart.find((product) => {
        return (
          product.id === action.payload.id &&
          product.sizeNumber === action.payload.sizeNumber &&
          product.colorName === action.payload.colorName
        );
      });

      if (productAlreadyExists) {
        productAlreadyExists.amount += action.payload.amount;
        productAlreadyExists.totalPrice +=
          action.payload.price * action.payload.amount;
        state.totalProductsAmount += action.payload.amount;
        state.totalProductsPrice +=
          action.payload.price * action.payload.amount;
      } else {
        state.cart.push({
          id: action.payload.id,
          name: action.payload.name,
          img: action.payload.img,
          sizeNumber: action.payload.sizeNumber,
          colorName: action.payload.colorName,
          colorValue: action.payload.colorValue,
          price: action.payload.price,
          totalPrice: action.payload.totalPrice * action.payload.amount,
          amount: action.payload.amount,
        });
        state.totalProductsAmount += action.payload.amount;
        state.totalProductsPrice +=
          action.payload.price * action.payload.amount;
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
