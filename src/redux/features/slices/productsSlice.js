import { createSlice } from "@reduxjs/toolkit";
import data from "../../../data/data.json";

// getting all the products from the local json file
const products = data.products.map((products) => products);
const allProducts = [...products];

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    categoryAndGenderFilteredProducts:
      JSON.parse(sessionStorage.getItem("categoryAndGenderFilteredProducts")) ||
      allProducts,
    colorFilteredAndPriceSortedProducts: [],
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
      state.categoryAndGenderFilteredProducts = categoryFilterMale;

      // saving the state to session storage
      const saveState = JSON.stringify(state.categoryAndGenderFilteredProducts);
      sessionStorage.setItem("categoryAndGenderFilteredProducts", saveState);
    },

    filterByCategoryFemale(state, action) {
      const femaleProducts = allProducts.filter(
        (product) => product.gender === "female",
      );
      const categoryFilterFemale = femaleProducts.filter(
        (product) => product.category === action.payload,
      );
      state.categoryAndGenderFilteredProducts = categoryFilterFemale;

      // saving the state to session storage
      const saveState = JSON.stringify(state.categoryAndGenderFilteredProducts);
      sessionStorage.setItem("categoryAndGenderFilteredProducts", saveState);
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
          state.categoryAndGenderFilteredProducts = maleProducts;
          break;
        case "female":
          state.categoryAndGenderFilteredProducts = femaleProducts;
          break;
        default:
          return allProducts;
      }

      // saving the state to session storage
      const saveState = JSON.stringify(state.categoryAndGenderFilteredProducts);
      sessionStorage.setItem("categoryAndGenderFilteredProducts", saveState);
    },

    filterById(state, action) {
      const oneProduct = state.categoryAndGenderFilteredProducts.filter(
        (product) => {
          return product.id === action.payload;
        },
      );
      state.singleProduct = oneProduct;

      // saving the state to session storage
      const saveState = JSON.stringify(state.singleProduct);
      sessionStorage.setItem("singleProduct", saveState);
    },

    filterByColorAndSortByPrice(state, action) {
      const filteredProductsCopy = [...state.categoryAndGenderFilteredProducts];
      const colorFilterType = action.payload.filterByColor;
      const priceSortType = action.payload.sortByPrice;

      const productColors = filteredProductsCopy.filter((product) => {
        // getting an array with each color from each filtered by category or gender product, storing it in 'colorValues' variable and passing that array as an argument to compareArrays function,
        // the compareArrays function checks if any color from any array passed as 2nd argument matches the color from the action payload as 1st argument
        function compareArrays(array1, array2) {
          return array1.some((element) => array2.includes(element));
        }
        const stock = product.stock.map((e) => e);
        const colorsStock = stock[1].colors;
        const colorValues = colorsStock.map((e) => e.colorValue);
        return compareArrays(colorFilterType, colorValues);
      });

      if (productColors.length === 0) {
        if (priceSortType === "price+") {
          const priceAsc = filteredProductsCopy.sort((a, b) => {
            return a.price.current < b.price.current ? -1 : 1;
          });
          state.colorFilteredAndPriceSortedProducts = priceAsc;
        } else if (priceSortType === "price-") {
          const priceDesc = filteredProductsCopy.sort((a, b) => {
            return a.price.current > b.price.current ? -1 : 1;
          });
          state.colorFilteredAndPriceSortedProducts = priceDesc;
        } else {
          return filteredProductsCopy;
        }
      } else {
        if (priceSortType === "price+") {
          state.colorFilteredAndPriceSortedProducts = productColors.sort(
            (a, b) => {
              return a.price.current < b.price.current ? -1 : 1;
            },
          );
        } else if (priceSortType === "price-") {
          state.colorFilteredAndPriceSortedProducts = productColors.sort(
            (a, b) => {
              return a.price.current > b.price.current ? -1 : 1;
            },
          );
        } else {
          state.colorFilteredAndPriceSortedProducts = productColors;
        }
      }
    },

    resetFilterByColorAndSortByPrice(state) {
      state.colorFilteredAndPriceSortedProducts = [];
    },
  },
});

export const {
  filterByCategoryMale,
  filterByCategoryFemale,
  filterByGender,
  filterById,
  filterByColorAndSortByPrice,
  resetFilterByColorAndSortByPrice,
} = productsSlice.actions;
export default productsSlice.reducer;
