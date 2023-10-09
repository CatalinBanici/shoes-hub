import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByColor,
  resetFilters,
} from "../../../redux/features/slices/productsSlice";

export default function ProductFilters({ products }) {
  const dispatch = useDispatch();
  // creating an array of all the product colors
  const productColors = products.map((product) => {
    const stock = product.stock.map((e) => e);
    const colorsStock = stock[1].colors;
    const colorValues = colorsStock.map((e) => e.colorValue);
    return colorValues;
  });
  const colorsArray = [...new Set(productColors.flat())];
  const colors = colorsArray.map((color) => {
    return { name: color, selected: false };
  });

  // i need to find a way to change this state when i click on a category in the sidebar component
  // so the colors will automatically change when i switch a category type
  // i can try to put a useeffect here and inside it setfilteredcolors and the state.filteredproducts as a dependency arr

  const [filteredColors, setFilteredColors] = useState(colors);
  const [price, setPrice] = useState("");

  useEffect(() => {
    setFilteredColors(colors);
    setPrice("none");
    console.log("effect");
  }, [products]);

  const updatedColors = [...filteredColors];

  const checkedColor = filteredColors.filter((e) => e.selected === true);

  const singleColor = checkedColor.map((e) => e.name);

  function toggleColor(index) {
    updatedColors[index].selected = !updatedColors[index].selected;
    setFilteredColors(updatedColors);
  }

  function priceSort(event) {
    setPrice(event.target.value);
  }

  //   console.log("price", price);

  const filterAndSortValues = {
    filterByColor: singleColor,
    sortByPrice: price,
  };

  //   console.log("filterAndSortValues", filterAndSortValues);

  //   console.log("filteredColors", filteredColors);
  //   console.log("checkedColor", checkedColor);
  //   console.log("singleColor", singleColor);
  //   console.log("colors", colors);

  return (
    <div>
      <div>
        <button onClick={() => dispatch(filterByColor(filterAndSortValues))}>
          dispatch
        </button>
        <hr />
        <button
          onClick={() => {
            dispatch(resetFilters());
            setFilteredColors(colors);
            setPrice("none");
          }}
        >
          reset
        </button>
        <hr />
        <div>
          <select name="priceSorting" onChange={priceSort}>
            <option defaultValue="none" hidden>
              sort by price
            </option>
            <option value="price+">price 0-9</option>
            <option value="price-">price 9-0</option>
          </select>
        </div>
        <hr />
        <button>Select a color</button>
        <div>
          {filteredColors.map((color, index) => (
            <div key={index}>
              <input
                type="checkbox"
                name="color-input"
                id={index}
                value={color.name}
                checked={color.selected}
                onChange={() => toggleColor(index)}
              />
              <label htmlFor={index}>{color.name}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
