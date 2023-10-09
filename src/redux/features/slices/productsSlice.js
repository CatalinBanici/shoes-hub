import { createSlice } from "@reduxjs/toolkit";
import data from "../../../data/data.json";
import { useEffect } from "react";

const allProducts = data.products.map((product) => product);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    filteredProducts:
      JSON.parse(sessionStorage.getItem("filteredProducts")) || allProducts,
    colorFilteredProducts: [],
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
    filterByColor(state, action) {
      function compareArrays(arr1, arr2) {
        return arr1.some((element) => arr2.includes(element));
      }
      const colors = action.payload.filterByColor;
      const priceSortType = action.payload.sortByPrice;

      const productColors = state.filteredProducts.filter((product) => {
        const stock = product.stock.map((e) => e);
        const colorsStock = stock[1].colors;
        const colorValues = colorsStock.map((e) => e.colorValue);
        return compareArrays(colors, colorValues);
      });

      console.log(priceSortType);

      // console.log("colors", colors);
      console.log("productColors", productColors);

      // state.colorFilteredProducts = productColors;

      if (productColors.length === 0) {
        if (priceSortType === "price+") {
          const priceAsc = state.filteredProducts.sort((a, b) => {
            return a.price.current < b.price.current ? -1 : 1;
          });
          state.filteredProducts = priceAsc;
        } else if (priceSortType === "price-") {
          const priceDesc = state.filteredProducts.sort((a, b) => {
            return a.price.current > b.price.current ? -1 : 1;
          });
          state.filteredProducts = priceDesc;
        } else {
          state.filteredProducts;
        }
      } else {
        if (priceSortType === "price+") {
          state.colorFilteredProducts = productColors.sort((a, b) => {
            return a.price.current < b.price.current ? -1 : 1;
          });
        } else if (priceSortType === "price-") {
          state.colorFilteredProducts = productColors.sort((a, b) => {
            return a.price.current > b.price.current ? -1 : 1;
          });
        } else {
          state.colorFilteredProducts = productColors;
        }
      }

      // if (priceSortType === "price+") {
      //   state.colorFilteredProducts = productColors.sort((a, b) => {
      //     return a.price.current < b.price.current ? -1 : 1;
      //   });
      // } else if (priceSortType === "price-") {
      //   state.colorFilteredProducts = productColors.sort((a, b) => {
      //     return a.price.current > b.price.current ? -1 : 1;
      //   });
      // } else {
      //   state.colorFilteredProducts = productColors;
      // }

      // const productColors = state.filteredProducts.map((product) => {
      //   const stock = product.stock.map((e) => e);
      //   const colorsStock = stock[1].colors;
      //   const colorValues = colorsStock.map((e) => e.colorValue);
      //   return colorValues;
      // });

      // const colorFilteredProduct = productColors.filter((product) => {
      //   product.includes(action.payload);
      // });
      // state.filteredProducts = colorFilteredProduct;
      // console.log("colorFilteredProduct", colorFilteredProduct);
    },
    resetFilters(state) {
      // to rework on this so when i click reset the filteredproducts state should reset
      state.colorFilteredProducts = [];
    },
  },
});

export const {
  filterByCategoryMale,
  filterByCategoryFemale,
  filterByGender,
  filterById,
  filterByColor,
  resetFilters,
} = productsSlice.actions;
export default productsSlice.reducer;
