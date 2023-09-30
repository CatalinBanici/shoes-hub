import { createSlice } from "@reduxjs/toolkit";
import data from "../../../data/data.json";

const allProducts = data.products.map((product) => product);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    filteredProducts:
      JSON.parse(sessionStorage.getItem("filteredProducts")) || allProducts,
    singleProduct:
      JSON.parse(sessionStorage.getItem("singleProduct")) || allProducts,
  },
  reducers: {
    filterByCategoryMale(state, action) {
      const maleProducts = allProducts.filter(
        (product) => product.gender === "male",
      );

      const categoryFilterMale = maleProducts.filter(
        (product) => product.category === action.payload,
      );
      state.filteredProducts = categoryFilterMale;
      const saveState = JSON.stringify(state.filteredProducts);
      sessionStorage.setItem("filteredProducts", saveState);
    },
    filterByCategoryFemale(state, action) {
      const femaleProducts = allProducts.filter(
        (product) => product.gender === "female",
      );

      const categoryFilterFemale = femaleProducts.filter(
        (product) => product.category === action.payload,
      );
      state.filteredProducts = categoryFilterFemale;
      const saveState = JSON.stringify(state.filteredProducts);
      sessionStorage.setItem("filteredProducts", saveState);
    },
    filterByGender(state, action) {
      const maleProducts = allProducts.filter(
        (product) => product.gender === "male",
      );
      const femaleProducts = allProducts.filter(
        (product) => product.gender === "female",
      );
      switch (action.payload) {
        case "male":
          state.filteredProducts = maleProducts;
          break;
        case "female":
          state.filteredProducts = femaleProducts;
          break;
        default:
          return allProducts;
      }
      const saveState = JSON.stringify(state.filteredProducts);
      sessionStorage.setItem("filteredProducts", saveState);
    },
    filterById(state, action) {
      const oneProduct = state.filteredProducts.filter((product) => {
        return product.id === action.payload;
      });
      state.singleProduct = oneProduct;
      const saveState = JSON.stringify(state.singleProduct);
      sessionStorage.setItem("singleProduct", saveState);
    },
  },
});

export const {
  filterByCategoryMale,
  filterByCategoryFemale,
  filterByGender,
  filterById,
} = productsSlice.actions;
export default productsSlice.reducer;
