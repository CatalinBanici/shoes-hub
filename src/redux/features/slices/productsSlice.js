import { createSlice } from "@reduxjs/toolkit";
import data from "../../../data/data.json";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    filteredProducts:
      JSON.parse(sessionStorage.getItem("filteredProducts")) || data.products,
  },
  reducers: {
    filterByCategory(state, action) {
      try {
        const categoryFilter = data.products.filter(
          (product) => product.category === action.payload,
        );
        state.filteredProducts = categoryFilter;
        const saveState = JSON.stringify(categoryFilter);
        sessionStorage.setItem("filteredProducts", saveState);
      } catch (error) {
        return error;
      }
    },
  },
});

export const { filterByCategory } = productsSlice.actions;
export default productsSlice.reducer;
