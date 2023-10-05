import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filterByColor } from "../../../redux/features/slices/productsSlice";

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

  const [filteredColors, setFilteredColors] = useState(colors);

  const updatedColors = [...filteredColors];

  const checkedColor = filteredColors.filter((e) => e.selected === true);

  const singleColor = checkedColor.map((e) => e.name);

  function toggleColor(index) {
    updatedColors[index].selected = !updatedColors[index].selected;
    setFilteredColors(updatedColors);
  }

  console.log("filteredColors", filteredColors);
  console.log("checkedColor", checkedColor);
  console.log("singleColor", singleColor);

  return (
    <div>
      <div>
        <button
          onClick={() =>
            singleColor.length && dispatch(filterByColor(singleColor))
          }
        >
          dispatch
        </button>
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
