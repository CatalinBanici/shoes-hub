import { createSlice } from "@reduxjs/toolkit";
import data from "../../../data/data.json";

let randomisedData = data.products.male
  .concat(data.products.female)
  .sort((a, b) => {
    if (a.id < b.id) {
      return -1;
    }
    return null;
  });
randomisedData.sort(() => (Math.random() > 0.5 ? 1 : -1));

// console.log("randomisedData", randomisedData);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    filteredProducts:
      JSON.parse(sessionStorage.getItem("filteredProducts")) || randomisedData,
    singleProduct:
      JSON.parse(sessionStorage.getItem("singleProduct")) || randomisedData,
  },
  reducers: {
    filterByCategoryMale(state, action) {
      try {
        const categoryFilterMale = data.products.male.filter(
          (product) => product.category === action.payload,
        );
        state.filteredProducts = categoryFilterMale;
        const saveState = JSON.stringify(state.filteredProducts);
        sessionStorage.setItem("filteredProducts", saveState);
      } catch (error) {
        return error;
      }
    },
    filterByCategoryFemale(state, action) {
      try {
        const categoryFilterFemale = data.products.female.filter(
          (product) => product.category === action.payload,
        );
        state.filteredProducts = categoryFilterFemale;
        const saveState = JSON.stringify(state.filteredProducts);
        sessionStorage.setItem("filteredProducts", saveState);
      } catch (error) {
        return error;
      }
    },
    filterByGender(state, action) {
      try {
        const maleProducts = data.products.male;
        const femaleProducts = data.products.female;
        switch (action.payload) {
          case "male":
            state.filteredProducts = maleProducts;
            break;
          case "female":
            state.filteredProducts = femaleProducts;
            break;
          default:
            return maleProducts.concat(femaleProducts);
        }
        const saveState = JSON.stringify(state.filteredProducts);
        sessionStorage.setItem("filteredProducts", saveState);
      } catch (error) {
        return error;
      }
    },
    filterById(state, action) {
      try {
        const oneProduct = state.filteredProducts.filter((product) => {
          return product.id === action.payload;
        });
        state.singleProduct = oneProduct;
        const saveState = JSON.stringify(state.singleProduct);
        sessionStorage.setItem("singleProduct", saveState);
      } catch (error) {
        return error;
      }
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
