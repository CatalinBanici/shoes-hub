import { createSlice } from "@reduxjs/toolkit";
import data from "../../../data/data.json";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    filteredProducts:
      JSON.parse(sessionStorage.getItem("filteredProducts")) || data.products,
  },
  reducers: {
    filterByCategoryMale(state, action) {
      try {
        const categoryFilterMale = data.products.male.filter(
          (product) => product.category === action.payload,
        );
        state.filteredProducts = categoryFilterMale;
        const saveState = JSON.stringify(categoryFilterMale);
        sessionStorage.setItem("filteredProducts", saveState);
      } catch (error) {
        return error;
      }
    },
    filterByCategoryFemale(state, action) {
      try {
        const categoryFilterMale = data.products.female.filter(
          (product) => product.category === action.payload,
        );
        state.filteredProducts = categoryFilterMale;
        const saveState = JSON.stringify(categoryFilterMale);
        sessionStorage.setItem("filteredProducts", saveState);
      } catch (error) {
        return error;
      }
    },
  },
});

export const { filterByCategoryMale, filterByCategoryFemale } =
  productsSlice.actions;
export default productsSlice.reducer;
