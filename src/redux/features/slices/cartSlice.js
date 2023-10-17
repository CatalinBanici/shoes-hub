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
          product.size === action.payload.size &&
          product.color === action.payload.color
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
          size: action.payload.size,
          color: action.payload.color,
          price: action.payload.price,
          totalPrice: action.payload.totalPrice * action.payload.amount,
          amount: action.payload.amount,
        });
        state.totalProductsAmount += action.payload.amount;
        state.totalProductsPrice +=
          action.payload.price * action.payload.amount;
      }

      // state.cart.push({

      //   // id: action.payload.id,
      //   // price: action.payload.price,
      //   // size: action.payload.size,
      //   // amount: action.payload.amount,
      //   // img: action.payload.img,
      //   // name: action.payload.name,
      //   // color: action.payload.color,
      // });
      // state.totalAmount++;
      // state.totalPrice += action.payload.price;
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
